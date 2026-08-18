const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const appJsPath = path.join(rootDir, 'app.js');
const publicAppJsPath = path.join(rootDir, 'public', 'app.js');
const indexHtmlPath = path.join(rootDir, 'index.html');
const publicIndexHtmlPath = path.join(rootDir, 'public', 'index.html');

// 1. Update index.html version tag to v5.3.0
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
indexHtml = indexHtml.replace(/style\.css\?v=[\d\.]+/g, 'style.css?v=5.3.0');
indexHtml = indexHtml.replace(/premium\.css\?v=[\d\.]+/g, 'premium.css?v=5.3.0');
indexHtml = indexHtml.replace(/app\.js\?v=[\d\.]+/g, 'app.js?v=5.3.0');
indexHtml = indexHtml.replace(/v5\.[0-9]\.[0-9]/g, 'v5.3.0');
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
fs.writeFileSync(publicIndexHtmlPath, indexHtml, 'utf8');

// 2. Update app.js and public/app.js
function updateAppCode(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/v5\.[0-9]\.[0-9]/g, 'v5.3.0');

  // Replace clearSession to ensure thorough cleanup
  const oldClearSession = /function clearSession\(\)\s*\{[\s\S]*?\}/;
  const newClearSession = `function clearSession() {
  try {
    localStorage.removeItem('esagrada_session_v1');
    sessionStorage.removeItem('esagrada_session_v1');
    localStorage.removeItem('esagrada_user_session');
    sessionStorage.removeItem('esagrada_user_session');
  } catch(e){}
  AUTH_USER = null;
  PREVIEW_ROLE = null;
}`;
  code = code.replace(oldClearSession, newClearSession);

  // Replace doLogout to clear session, hide app, and show login screen
  const oldDoLogout = /function doLogout\(\)\s*\{[\s\S]*?\}/;
  const newDoLogout = `function doLogout() {
  clearSession();
  const app = $('#app');
  if (app) app.style.display = 'none';
  renderLoginScreen();
  toast('Sessão terminada. Por favor introduza as suas credenciais.');
}`;
  code = code.replace(oldDoLogout, newDoLogout);

  // Replace init() session check to strictly render login screen on missing session
  const oldInitSession = /if\s*\(!loadSession\(\)\)\s*\{[\s\S]*?\}/;
  const newInitSession = `if (!loadSession()) {
    const app = $('#app');
    if (app) app.style.display = 'none';
    renderLoginScreen();
    return;
  }`;
  code = code.replace(oldInitSession, newInitSession);

  // Add migration check v530 to clear stale sessions once
  const oldVCheck = /try\s*\{\s*if\s*\(\s*typeof\s*localStorage\s*!==\s*"undefined"[\s\S]*?\}\s*\}\s*catch\s*\(e\)\s*\{\}/;
  const newVCheck = `try{ if(typeof localStorage !== "undefined" && localStorage.getItem("esagrada_db_ver_v530") !== "true"){ localStorage.removeItem("esagrada_session_v1"); localStorage.setItem("esagrada_db_ver_v530", "true"); } }catch(e){}`;
  code = code.replace(oldVCheck, newVCheck);

  fs.writeFileSync(filePath, code, 'utf8');
}

updateAppCode(appJsPath);
updateAppCode(publicAppJsPath);

console.log('Successfully updated logout & login session handling to v5.3.0!');
