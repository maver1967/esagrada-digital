const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace from r.innerHTML=`<div class="vhead" down to $('#addA').onclick
  const startMarker = '  r.innerHTML=`<div class="vhead"';
  const endMarker = "  $('#addA').onclick=()=>editAssign(null);";

  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex !== -1 && endIndex !== -1) {
    const replacement = `  r.innerHTML=\`<div class="vhead" style="display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap;">
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
  <div class="help">\${I.info}<div>Exemplo: <b>Pe. Fausto Ghiradelli</b> → Director de Turma da 10ªA, lecciona Filosofia (10-2, 3h). Crie atribuições por disciplina/turma; ajuste as horas no campo à direita.</div></div>\`;\n`;

    content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

const rootDir = path.join(__dirname, '..');
fixFile(path.join(rootDir, 'app.js'));
fixFile(path.join(rootDir, 'public', 'app.js'));

console.log('Fixed assign view cleanly!');
