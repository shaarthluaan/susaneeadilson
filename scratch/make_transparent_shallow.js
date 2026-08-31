const fs = require('fs');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const jpegData = fs.readFileSync('scratch/caju_shallow_raw.jpg');
const rawImage = jpeg.decode(jpegData, { useTArray: true });

const srcW = rawImage.width;
const srcH = rawImage.height;

// Find bounding box of artwork (non-white pixels)
let minY = srcH, maxY = 0;

for (let y = 0; y < srcH; y++) {
  let rowHasArtwork = false;
  for (let x = 0; x < srcW; x++) {
    const idx = (srcW * y + x) << 2;
    const r = rawImage.data[idx];
    const g = rawImage.data[idx + 1];
    const b = rawImage.data[idx + 2];
    const brightness = (r + g + b) / 3;
    if (brightness < 240) {
      rowHasArtwork = true;
      break;
    }
  }
  if (rowHasArtwork) {
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}

// Add tiny padding if needed
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

    if (brightness > 242) {
      png.data[dstIdx + 3] = 0;
    } else if (brightness > 215) {
      const alpha = Math.round(255 * (1 - (brightness - 215) / 27));
      png.data[dstIdx + 3] = Math.max(0, Math.min(255, alpha));
    } else {
      png.data[dstIdx + 3] = 255;
    }
  }
}

// Re-install pngjs temporarily if needed
const buffer = PNG.sync.write(png);
fs.writeFileSync('assets/caju_header_top.png', buffer);
console.log(`Created cropped transparent PNG assets/caju_header_top.png (${srcW}x${croppedH})!`);
