const fs = require('fs');
const svg2gif = require('svg2gif');
const sharp = require('sharp');

async function createFavicon() {
  // Convert SVG to GIF
  const svgBuffer = fs.readFileSync('./public/q-animation.svg');
  const gifBuffer = await svg2gif(svgBuffer, { duration: 2000 });
  fs.writeFileSync('./public/favicon.gif', gifBuffer);

  // Create static ICO
  await sharp('./public/q-animation.svg')
    .resize(32, 32)
    .toFile('./public/favicon.ico');
}

createFavicon().catch(console.error);