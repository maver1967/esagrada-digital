const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const appJsPath = path.join(rootDir, 'app.js');
const publicAppJsPath = path.join(rootDir, 'public', 'app.js');

function updateSmoothDisplay(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');

  // 1. Update renderLoginScreen to properly hide app container and clear active masks/modals
  const renderLoginFn = `function renderLoginScreen() {
  let el = $('#loginScreen');
  if (!el) {
    el = document.createElement('div');
    el.id = 'loginScreen';
    el.className = 'login-screen';
    document.body.appendChild(el);
  }
  
  const app = $('#app');
  if (app) app.style.display = 'none';
  el.style.display = 'flex';
  
  // Close any open modals or active masks
  const mask = $('#mask');
  if (mask) mask.classList.remove('on');

  let logo = (DB && DB.settings && DB.settings.logo) ? DB.settings.logo : DEFAULT_LOGO;
  if (logo && logo.startsWith('/assets/')) logo = '.' + logo;`;

  code = code.replace(/function renderLoginScreen\(\)\s*\{[\s\S]*?let logo =/, renderLoginFn);

  // 2. Update handleLoginFormSubmit to smoothly hide login screen and display app
  const submitFn = `window.handleLoginFormSubmit = function(e) {
  if (e) e.preventDefault();
  const id = $('#loginId') ? $('#loginId').value : '';
  const pass = $('#loginPass') ? $('#loginPass').value : '';
  const errEl = $('#loginError');
  if (errEl) errEl.style.display = 'none';

  const res = doLogin(id, pass);
  if (!res.ok) {
    if (errEl) {
      errEl.textContent = res.msg;
      errEl.style.display = 'block';
    } else {
      toast(res.msg, true);
    }
    return;
  }

  const loginSc = $('#loginScreen');
  if (loginSc) loginSc.style.display = 'none';
  const app = $('#app');
  if (app) app.style.display = '';
  buildNav();
  if (res.user && (res.user.role === 'portaria' || res.user.id === 'portaria')) {
    window._portariaLocked = true;
    go('portaria');
  } else {
    go('dash');
  }
  toast('Bem-vindo, ' + res.user.nome + '! ✓');
};`;

  code = code.replace(/window\.handleLoginFormSubmit\s*=\s*function\(e\)\s*\{[\s\S]*?\};/, submitFn);

  fs.writeFileSync(filePath, code, 'utf8');
}

updateSmoothDisplay(appJsPath);
updateSmoothDisplay(publicAppJsPath);

console.log('Successfully updated smooth login display transition!');
