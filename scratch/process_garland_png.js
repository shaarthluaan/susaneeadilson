const fs = require('fs');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const jpegData = fs.readFileSync('scratch/caju_garland_raw.jpg');
const rawImage = jpeg.decode(jpegData, { useTArray: true });

const srcW = rawImage.width;
const srcH = rawImage.height;

// Find bounding box of artwork vertically (top to bottom)
let minY = srcH, maxY = 0;

for (let y = 0; y < srcH; y++) {
  let rowHasArtwork = false;
  for (let x = 0; x < srcW; x++) {
    const idx = (srcW * y + x) << 2;
    const r = rawImage.data[idx];
    const g = rawImage.data[idx + 1];
    const b = rawImage.data[idx + 2];
    const brightness = (r + g + b) / 3;
    if (brightness < 242) {
      rowHasArtwork = true;
      break;
    }
  }
  if (rowHasArtwork) {
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}

// Trim top and bottom white padding while preserving full width
minY = Math.max(0, minY - 2);
maxY = Math.min(srcH - 1, maxY + 2);
const croppedH = maxY - minY + 1;

const png = new PNG({ width: srcW, height: croppedH });

for (let y = 0; y < croppedH; y++) {
  const srcY = minY + y;
  for (let x = 0; x < srcW; x++) {
    const srcIdx = (srcW * srcY + x) << 2;
    const dstIdx = (srcW * y + x) << 2;

    const r = rawImage.data[srcIdx];
    const g = rawImage.data[srcIdx + 1];
    const b = rawImage.data[srcIdx + 2];

    png.data[dstIdx] = r;
    png.data[dstIdx + 1] = g;
    png.data[dstIdx + 2] = b;

    const brightness = (r + g + b) / 3;

    if (brightness > 244) {
      png.data[dstIdx + 3] = 0; // Pure white background -> 100% transparent
    } else if (brightness > 218) {
      // Smooth gradient transition for soft anti-aliased watercolor edges
      const alpha = Math.round(255 * (1 - (brightness - 218) / 26));
      png.data[dstIdx + 3] = Math.max(0, Math.min(255, alpha));
    } else {
      png.data[dstIdx + 3] = 255;
    }
  }
}

const buffer = PNG.sync.write(png);
fs.writeFileSync('assets/caju_header_top.png', buffer);
console.log(`Created assets/caju_header_top.png (${srcW}x${croppedH}) with transparent background!`);
