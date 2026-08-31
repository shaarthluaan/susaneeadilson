const fs = require('fs');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const jpegData = fs.readFileSync('assets/caju_header_top.jpg');
const rawImage = jpeg.decode(jpegData, { useTArray: true });

const width = rawImage.width;
const height = rawImage.height;
const png = new PNG({ width, height });

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    const r = rawImage.data[idx];
    const g = rawImage.data[idx + 1];
    const b = rawImage.data[idx + 2];

    png.data[idx] = r;
    png.data[idx + 1] = g;
    png.data[idx + 2] = b;

    // Calculate brightness / distance from pure white
    const brightness = (r + g + b) / 3;

    if (brightness > 245) {
      // Pure white -> fully transparent
      png.data[idx + 3] = 0;
    } else if (brightness > 220) {
      // Near white -> gradual alpha transition for anti-aliasing
      const alpha = Math.round(255 * (1 - (brightness - 220) / 25));
      png.data[idx + 3] = Math.max(0, Math.min(255, alpha));
    } else {
      // Opaque artwork
      png.data[idx + 3] = 255;
    }
  }
}

const buffer = PNG.sync.write(png);
fs.writeFileSync('assets/caju_header_top.png', buffer);
console.log(`Created assets/caju_header_top.png (${width}x${height}) with transparency!`);
