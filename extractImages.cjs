const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const assetsDir = path.join(publicDir, 'assets');
const appJsPath = path.join(publicDir, 'app.js');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

let appJsContent = fs.readFileSync(appJsPath, 'utf8');

const regex = /(const|let|var)\s+([A-Za-z0-9_]+)\s*=\s*(['"])data:image\/(png|jpeg|jpg);base64,([^'"]+)\3;/g;

let match;
let newAppJsContent = appJsContent;
let count = 0;

while ((match = regex.exec(appJsContent)) !== null) {
    const varKeyword = match[1];
    const varName = match[2];
    const quote = match[3];
    const ext = match[4] === 'jpeg' ? 'jpg' : match[4];
    const base64Data = match[5];
    
    const fileName = `${varName.toLowerCase()}.${ext}`;
    const filePath = path.join(assetsDir, fileName);
    
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    console.log(`Saved ${fileName}`);
    
    const replacement = `${varKeyword} ${varName} = ${quote}/assets/${fileName}${quote};`;
    newAppJsContent = newAppJsContent.replace(match[0], replacement);
    count++;
}

if (count > 0) {
    fs.writeFileSync(appJsPath, newAppJsContent, 'utf8');
    console.log(`Updated app.js with ${count} image paths.`);
} else {
    console.log('No base64 images found.');
}
