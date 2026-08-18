const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Update index.html version tags
const indexHtmlPath = path.join(rootDir, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
indexHtml = indexHtml.replace(/style\.css\?v=[\d\.]+/g, 'style.css?v=5.2.0');
indexHtml = indexHtml.replace(/premium\.css\?v=[\d\.]+/g, 'premium.css?v=5.2.0');
indexHtml = indexHtml.replace(/app\.js\?v=[\d\.]+/g, 'app.js?v=5.2.0');
indexHtml = indexHtml.replace(/v5\.1\.0/g, 'v5.2.0');
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');

// Copy index.html to public/
fs.writeFileSync(path.join(rootDir, 'public', 'index.html'), indexHtml, 'utf8');

// 2. Update sw.js to delete all old caches
const unregisterSwCode = `self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() {
      return self.registration.unregister();
    })
  );
});
`;
fs.writeFileSync(path.join(rootDir, 'sw.js'), unregisterSwCode, 'utf8');
fs.writeFileSync(path.join(rootDir, 'public', 'sw.js'), unregisterSwCode, 'utf8');

// 3. Update app.js and public/app.js to force migration v5.2.0 on init
function updateAppVersion(filePath) {
  let appJs = fs.readFileSync(filePath, 'utf8');
  appJs = appJs.replace(/v5\.1\.0/g, 'v5.2.0');

  // Insert v5.2.0 migration check in init()
  const vCheckOld = /try\s*\{\s*if\s*\(\s*typeof\s*localStorage\s*!==\s*"undefined"[\s\S]*?\}\s*\}\s*catch\s*\(e\)\s*\{\}/;
  const vCheckNew = `try{ if(typeof localStorage !== "undefined" && localStorage.getItem("esagrada_db_ver_v520") !== "true"){ localStorage.removeItem("esagrada_horarios_v3"); localStorage.removeItem("esagrada_db_v4"); localStorage.setItem("esagrada_db_ver_v520", "true"); } }catch(e){}`;

  if (vCheckOld.test(appJs)) {
    appJs = appJs.replace(vCheckOld, vCheckNew);
  } else {
    appJs = appJs.replace('(async function init(){', `(async function init(){\n  ${vCheckNew}`);
  }

  fs.writeFileSync(filePath, appJs, 'utf8');
}

updateAppVersion(path.join(rootDir, 'app.js'));
updateAppVersion(path.join(rootDir, 'public', 'app.js'));

console.log('Successfully updated GitHub Pages version tags & cache invalidation to v5.2.0!');
