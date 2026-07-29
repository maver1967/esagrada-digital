const fs = require('fs');
const path = require('path');

const srcPath = '/Users/roberto67/Library/CloudStorage/Dropbox/Moçambique/Antigravity/Esagrada.html';
const lines = fs.readFileSync(srcPath, 'utf8').split('\n');

const css = lines.slice(17, 382).join('\n');
const qrcode = lines.slice(419, 2719).join('\n');
const app = lines.slice(2721, 8742).join('\n');

const indexHtml = [
  ...lines.slice(0, 16),
  '  <link rel="stylesheet" href="./style.css">',
  '  <link rel="stylesheet" href="./premium.css">',
  ...lines.slice(383, 415),
  ...lines.slice(415, 418), 
  '  <script src="./qrcode.js"></script>',
  '  <script src="./app.js"></script>',
  ...lines.slice(8743, 8746)
].join('\n');

fs.writeFileSync('style.css', css);
fs.writeFileSync('qrcode.js', qrcode);
fs.writeFileSync('app.js', app);
fs.writeFileSync('index.html', indexHtml);

console.log('Split completed successfully!');
