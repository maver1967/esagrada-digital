const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const appJsPath = path.join(rootDir, 'app.js');
const publicAppJsPath = path.join(rootDir, 'public', 'app.js');

function updateAuthLogout(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');

  // 1. Update doLogout to clear session, hide app, and show login screen cleanly
  const oldLogout = /function doLogout\(\)\s*\{[\s\S]*?\}/;
  const newLogout = `function doLogout() {
  clearSession();
  const app = $('#app');
  if (app) app.style.display = 'none';
  renderLoginScreen();
  toast('Sessão terminada. Por favor seleccione o seu perfil.');
}`;
  code = code.replace(oldLogout, newLogout);

  // 2. Update init() so that if loadSession() returns false, it renders the login screen instead of auto-login
  const oldInitSessionCheck = /if\s*\(!loadSession\(\)\)\s*\{[\s\S]*?saveSession\(AUTH_USER\.id\);\s*\}\s*\}/;
  const newInitSessionCheck = `if (!loadSession()) {
    renderLoginScreen();
    return;
  }`;

  code = code.replace(oldInitSessionCheck, newInitSessionCheck);

  fs.writeFileSync(filePath, code, 'utf8');
}

updateAuthLogout(appJsPath);
updateAuthLogout(publicAppJsPath);

console.log('Successfully updated authentication logout and login screen initialization!');
