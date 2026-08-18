const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const appJsPath = path.join(rootDir, 'app.js');
const publicAppJsPath = path.join(rootDir, 'public', 'app.js');

let code = fs.readFileSync(appJsPath, 'utf8');

// Restore valid template literal for VIEWS.assign header
const targetBadStr = `r.innerHTML=\`<div class="vhead" style="display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap;">
    <div><h1>Atribuições</h1><p>Atribuição de docentes a disciplinas, turmas e <b>Directores de Turma (DT)</b>. Gerido pela Direção.</p></div>
    <div style="display:flex;gap:10px;align-items:center;">
      <button class="btn pri" id="saveAssignBtn" onclick="saveAssignmentsPermanently()" style="background:#10b981!important;color:#ffffff!important;font-weight:bold!important;font-size:13px!important;padding:9px 16px!important;border-radius:8px!important;border:none!important;cursor:pointer!important;display:inline-flex!important;align-items:center!important;gap:6px!important;box-shadow:0 4px 12px rgba(16,185,129,0.3)!important;">
        💾 Guardar Alterações Definitivas
      </button>
      <button class="btn pri" id="addA">\${I.plus} Nova atribuição</button>
    </div>
  </div>\`;`;

const targetGoodStr = `r.innerHTML=\`<div class="vhead" style="display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap;">
    <div><h1>Atribuições</h1><p>Atribuição de docentes a disciplinas, turmas e <b>Directores de Turma (DT)</b>. Gerido pela Direção.</p></div>
    <div style="display:flex;gap:10px;align-items:center;">
      <button class="btn pri" id="saveAssignBtn" onclick="saveAssignmentsPermanently()" style="background:#10b981!important;color:#ffffff!important;font-weight:bold!important;font-size:13px!important;padding:9px 16px!important;border-radius:8px!important;border:none!important;cursor:pointer!important;display:inline-flex!important;align-items:center!important;gap:6px!important;box-shadow:0 4px 12px rgba(16,185,129,0.3)!important;">
        💾 Guardar Alterações Definitivas
      </button>
      <button class="btn pri" id="addA">\${I.plus} Nova atribuição</button>
    </div>
  </div>
  \${renderDirectoresTurmaCard()}
  \${DB.teachers.length?cards:\`<div class="card"><div class="empty">\${I.teach}<div>Crie primeiro um professor.</div></div></div>\`}
  <div class="help">\${I.info}<div>Exemplo: <b>Pe. Fausto Ghiradelli</b> → Director de Turma da 10ªA, lecciona Filosofia (10-2, 3h). Crie atribuições por disciplina/turma; ajuste as horas no campo à direita.</div></div>\`;`;

code = code.replace(targetBadStr, targetGoodStr);

fs.writeFileSync(appJsPath, code, 'utf8');
fs.writeFileSync(publicAppJsPath, code, 'utf8');

console.log('Fixed header button syntax in app.js!');
