const fs = require('fs');
const path = require('path');

function cleanAuthFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const badBlock = `function clearSession() {
  try {
    localStorage.removeItem('esagrada_session_v1');
    sessionStorage.removeItem('esagrada_session_v1');
    localStorage.removeItem('esagrada_user_session');
    sessionStorage.removeItem('esagrada_user_session');
  } catch(e){}
  AUTH_USER = null;
  PREVIEW_ROLE = null;
} catch(e){}
  AUTH_USER = null;
}`;

  const cleanBlock = `function clearSession() {
  try {
    localStorage.removeItem('esagrada_session_v1');
    sessionStorage.removeItem('esagrada_session_v1');
    localStorage.removeItem('esagrada_user_session');
    sessionStorage.removeItem('esagrada_user_session');
  } catch(e){}
  AUTH_USER = null;
  PREVIEW_ROLE = null;
}`;

  content = content.replace(badBlock, cleanBlock);
  fs.writeFileSync(filePath, content, 'utf8');
}

const rootDir = path.join(__dirname, '..');
cleanAuthFile(path.join(rootDir, 'app.js'));
cleanAuthFile(path.join(rootDir, 'public', 'app.js'));

console.log('Cleaned up clearSession syntax cleanly!');
