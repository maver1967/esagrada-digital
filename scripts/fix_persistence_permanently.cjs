const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const appJsPath = path.join(rootDir, 'app.js');
const publicAppJsPath = path.join(rootDir, 'public', 'app.js');

function processCode(code) {
  // 1. Remove cache clearing logic in init()
  const oldInitPattern = /\(async function init\(\)\{[\s\S]*?const saved = await loadDB\(\);/;
  const cleanInit = `(async function init(){\n  const saved = await loadDB();`;
  code = code.replace(oldInitPattern, cleanInit);

  // 2. Update ensureTeacherAssignmentsFix so it NEVER overwrites existing db.assignments if loaded from storage
  const oldFixPattern = /function ensureTeacherAssignmentsFix\(db\)\{[\s\S]*?\n\}/;
  const newFix = `function ensureTeacherAssignmentsFix(db){
  if (!db) return;

  // 1. Update teacher status labels
  if (Array.isArray(db.teachers)) {
    const maver = db.teachers.find(t => t.id === 'p114' || (t.name || '').includes('Maver'));
    if (maver) maver.disciplinas = 'Filosofia, Intr. à Filosofia, Ética e Cidadania';
    const fausto = db.teachers.find(t => t.id === 'p104' || (t.name || '').includes('Fausto'));
    if (fausto) fausto.disciplinas = 'Italiano';
  }

  // STOP HERE if assignments have already been initialized or locked by user!
  // Do NOT auto-insert or revert user modifications on page refresh!
  if (db._assignmentsFixed_vMAX || db._userAssignmentsLocked || (Array.isArray(db.assignments) && db.assignments.length > 0)) {
    db._assignmentsFixed_vMAX = true;
    return;
  }

  db._assignmentsFixed_vMAX = true;
  if (!Array.isArray(db.assignments)) db.assignments = [];

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

  if (Array.isArray(db.classes) && Array.isArray(db.subjects)) {
    const filSubj = db.subjects.find(s => s.name === 'Filosofia' || s.id === 'FIL');
    const ificSubj = db.subjects.find(s => s.name === 'Intr. à Filosofia' || s.name === 'Introdução à Filosofia' || s.id === 'IFIC');
    const itaSubj = db.subjects.find(s => s.name === 'Italiano' || s.id === 'ITA');

    db.classes.forEach(c => {
      const cid = c.id;
      const is11 = c.name.includes('11') || cid === '11';

      if (is11 && (ificSubj || filSubj)) {
        const targetSubj = ificSubj || filSubj;
        db.assignments.push({
          id: typeof uid === 'function' ? uid() : 'asg_' + Math.random().toString(36).substr(2,9),
          tid: 'p114', sid: targetSubj.id, cid: cid, groups: [], hours: 3
        });
      } else if (!is11 && filSubj) {
        db.assignments.push({
          id: typeof uid === 'function' ? uid() : 'asg_' + Math.random().toString(36).substr(2,9),
          tid: 'p114', sid: filSubj.id, cid: cid, groups: [], hours: 3
        });
      }

      if (itaSubj && (c.name.includes('10-1') || c.name.includes('11') || cid === '10-1' || cid === '11')) {
        db.assignments.push({
          id: typeof uid === 'function' ? uid() : 'asg_' + Math.random().toString(36).substr(2,9),
          tid: 'p104', sid: itaSubj.id, cid: cid, groups: [], hours: 2
        });
      }
    });
  }
}`;

  code = code.replace(oldFixPattern, newFix);

  // 3. Update saveAssignmentsPermanently to lock and persist immediately
  const saveFn = `\nwindow.saveAssignmentsPermanently = async function() {
  if (!DB || !Array.isArray(DB.assignments)) return;
  DB._userAssignmentsLocked = true;
  DB._assignmentsFixed_vMAX = true;
  if (typeof persist === 'function') await persist();
  toast('💾 Alterações guardadas e fixadas com sucesso! ✓');
  if (typeof render === 'function') render();
};\n`;

  if (code.includes('window.saveAssignmentsPermanently =')) {
    const oldSavePattern = /window\.saveAssignmentsPermanently =[\s\S]*?\};/;
    code = code.replace(oldSavePattern, saveFn.trim());
  } else {
    code += saveFn;
  }

  // 4. Update setAssignHours and editAssign to lock assignments whenever user makes changes
  code = code.replace(
    'function setAssignHours(id,val){ const a=DB.assignments.find(x=>x.id===id); if(!a)return; a.hours=Math.max(0,Math.min(25,parseInt(val)||0)); persist(); render(); }',
    'function setAssignHours(id,val){ const a=DB.assignments.find(x=>x.id===id); if(!a)return; a.hours=Math.max(0,Math.min(25,parseInt(val)||0)); DB._userAssignmentsLocked=true; persist(); render(); }'
  );

  return code;
}

let appJsCode = fs.readFileSync(appJsPath, 'utf8');
appJsCode = processCode(appJsCode);
fs.writeFileSync(appJsPath, appJsCode, 'utf8');
fs.writeFileSync(publicAppJsPath, appJsCode, 'utf8');

console.log('Permanently fixed assignment persistence in app.js and public/app.js!');
