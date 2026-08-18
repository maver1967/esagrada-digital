const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const appJsPath = path.join(rootDir, 'app.js');
const publicAppJsPath = path.join(rootDir, 'public', 'app.js');

let code = fs.readFileSync(appJsPath, 'utf8');

// 1. Add saveAssignmentsPermanently function
const saveFunc = `
window.saveAssignmentsPermanently = async function() {
  if (!DB || !Array.isArray(DB.assignments)) return;
  DB._userAssignmentsLocked = true;
  if (typeof persist === 'function') await persist();
  toast('💾 Alterações guardadas e fixadas com sucesso! ✓');
  if (typeof render === 'function') render();
};
`;

if (!code.includes('window.saveAssignmentsPermanently')) {
  code = code + saveFunc;
}

// 2. Add "Guardar Alterações Definitivas" button to VIEWS.assign header
const oldHeader = `r.innerHTML=\`<div class="vhead" style="display:flex;justify-content:space-between;align-items:flex-end;gap:14px">
    <div><h1>Atribuições</h1><p>Atribuição de docentes a disciplinas, turmas e <b>Directores de Turma (DT)</b>. Gerido pela Direção.</p></div>
    <button class="btn pri" id="addA">\${I.plus} Nova atribuição de disciplina</button></div>`;

const newHeader = `r.innerHTML=\`<div class="vhead" style="display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap;">
    <div><h1>Atribuições</h1><p>Atribuição de docentes a disciplinas, turmas e <b>Directores de Turma (DT)</b>. Gerido pela Direção.</p></div>
    <div style="display:flex;gap:10px;align-items:center;">
      <button class="btn pri" id="saveAssignBtn" onclick="saveAssignmentsPermanently()" style="background:#10b981!important;color:#ffffff!important;font-weight:bold!important;font-size:13px!important;padding:9px 16px!important;border-radius:8px!important;border:none!important;cursor:pointer!important;display:inline-flex!important;align-items:center!important;gap:6px!important;box-shadow:0 4px 12px rgba(16,185,129,0.3)!important;">
        💾 Guardar Alterações Definitivas
      </button>
      <button class="btn pri" id="addA">\${I.plus} Nova atribuição</button>
    </div>
  </div>\`;`;

code = code.replace(oldHeader, newHeader);

// 3. Ensure ensureTeacherAssignmentsFix removes Filosofia from class 11 permanently
const oldEnsureFixPattern = /function ensureTeacherAssignmentsFix\(db\)\{[\s\S]*?\n\}/;
const newEnsureFix = `function ensureTeacherAssignmentsFix(db){
  if(!db) return;

  const subjTeacherMap = {
    'Português': 'p101', 'História': 'p101', 'Inglês': 'p102', 'Francês': 'p103',
    'Italiano': 'p104', 'Matemática': 'p105', 'Física': 'p106', 'Química': 'p107',
    'Biologia': 'p108', 'Agro-pecuária': 'p108', 'Agro-Pecuária': 'p108',
    'Educação Física': 'p109', 'Ed. Física': 'p109', 'Psicopedagogia': 'p110',
    'Noções de Empreend.': 'p111', 'NE': 'p111', 'Geografia': 'p112', 'TIC': 'p113',
    "TIC's": 'p113', 'Informática Avançada': 'p113', 'Inf. Avançada': 'p113',
    'Filosofia': 'p114', 'Intr. à Filosofia': 'p114', 'Introdução à Filosofia': 'p114',
    'Inglês Integral': 'p115'
  };

  const sidToTid = {};
  if (Array.isArray(db.subjects)) {
    db.subjects.forEach(s => {
      const expectedTid = subjTeacherMap[s.name];
      if (expectedTid) sidToTid[s.id] = expectedTid;
    });
  }

  function getTeacherForSubjAndClass(sid, cid) {
    const sj = (db.subjects || []).find(s => s.id === sid);
    const sName = sj ? sj.name : sid;
    if (sName === 'Filosofia' || sName === 'Intr. à Filosofia' || sName === 'Introdução à Filosofia' || sid === 'FIL' || sid === 'IFIC') {
      return 'p114';
    }
    if (sName === 'Italiano' || sid === 'ITA') {
      return 'p104';
    }
    return sidToTid[sid] || null;
  }

  db._assignmentsFixed_v20 = true;

  if (!Array.isArray(db.assignments)) db.assignments = [];

  // Remove generic 'Filosofia' (FIL) for 11ª class permanently
  db.assignments = db.assignments.filter(a => {
    const cid = String(a.cid || '');
    const is11 = cid === '11' || cid === '11ª' || cid.includes('11');
    const sj = (db.subjects || []).find(s => s.id === a.sid);
    const sName = sj ? sj.name : a.sid;
    if (is11 && (sName === 'Filosofia' || a.sid === 'FIL')) return false;
    return true;
  });

  // Only auto-generate missing default assignments if user has not explicitly locked assignments
  if (!db._userAssignmentsLocked) {
    db.assignments.forEach(a => {
      if (a.sid) {
        const t = getTeacherForSubjAndClass(a.sid, a.cid);
        if (t) a.tid = t;
      }
    });

    if (Array.isArray(db.classes) && Array.isArray(db.subjects)) {
      const filSubj = db.subjects.find(s => s.name === 'Filosofia' || s.id === 'FIL');
      const ificSubj = db.subjects.find(s => s.name === 'Intr. à Filosofia' || s.name === 'Introdução à Filosofia' || s.id === 'IFIC');
      const itaSubj = db.subjects.find(s => s.name === 'Italiano' || s.id === 'ITA');

      db.classes.forEach(c => {
        const cid = c.id;
        const is11 = c.name.includes('11') || cid === '11';

        if (is11 && (ificSubj || filSubj)) {
          const targetSubj = ificSubj || filSubj;
          let ificAsg = db.assignments.find(a => (a.cid === cid || a.cid === c.name) && (a.sid === targetSubj.id || a.sid === 'IFIC'));
          if (ificAsg) {
            ificAsg.tid = 'p114';
          } else {
            db.assignments.push({
              id: typeof uid === 'function' ? uid() : 'asg_' + Math.random().toString(36).substr(2,9),
              tid: 'p114',
              sid: targetSubj.id,
              cid: cid,
              groups: [],
              hours: 3
            });
          }
        } else if (!is11 && filSubj) {
          let filAsg = db.assignments.find(a => (a.cid === cid || a.cid === c.name) && (a.sid === filSubj.id || a.sid === 'FIL'));
          if (filAsg) {
            filAsg.tid = 'p114';
          } else {
            db.assignments.push({
              id: typeof uid === 'function' ? uid() : 'asg_' + Math.random().toString(36).substr(2,9),
              tid: 'p114',
              sid: filSubj.id,
              cid: cid,
              groups: [],
              hours: 3
            });
          }
        }

        if (itaSubj && (c.name.includes('10-1') || c.name.includes('11') || cid === '10-1' || cid === '11')) {
          let itaAsg = db.assignments.find(a => (a.cid === cid || a.cid === c.name) && (a.sid === itaSubj.id || a.sid === 'ITA'));
          if (itaAsg) {
            itaAsg.tid = 'p104';
          } else {
            db.assignments.push({
              id: typeof uid === 'function' ? uid() : 'asg_' + Math.random().toString(36).substr(2,9),
              tid: 'p104',
              sid: itaSubj.id,
              cid: cid,
              groups: [],
              hours: 2
            });
          }
        }
      });
    }
  }

  // Update teacher status labels
  if (Array.isArray(db.teachers)) {
    const maver = db.teachers.find(t => t.id === 'p114' || (t.name || '').includes('Maver'));
    if (maver) maver.disciplinas = 'Filosofia, Intr. à Filosofia, Ética e Cidadania';
    const fausto = db.teachers.find(t => t.id === 'p104' || (t.name || '').includes('Fausto'));
    if (fausto) fausto.disciplinas = 'Italiano';
  }
}`;

code = code.replace(oldEnsureFixPattern, newEnsureFix);

// Force v20 cache refresh in init
code = code.replace(
  `localStorage.setItem("esagrada_db_ver_v19", "true");`,
  `localStorage.setItem("esagrada_db_ver_v20", "true");`
);
code = code.replace(
  `localStorage.getItem("esagrada_db_ver_v19") !== "true"`,
  `localStorage.getItem("esagrada_db_ver_v20") !== "true"`
);

fs.writeFileSync(appJsPath, code, 'utf8');
fs.writeFileSync(publicAppJsPath, code, 'utf8');

console.log('Added Guardar Alterações Definitivas button and fixed assignments logic!');
