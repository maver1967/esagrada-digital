const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const appJsPath = path.join(rootDir, 'app.js');
const publicAppJsPath = path.join(rootDir, 'public', 'app.js');
const dataDir = path.join(rootDir, 'data');

// 1. Update app.js and public/app.js
let appJs = fs.readFileSync(appJsPath, 'utf8');

// In NOTAS.turmas['11'].discs, replace "Filosofia" with "Intr. à Filosofia"
appJs = appJs.replace(
  '\"11\":{\"classe\":\"11ª\",\"turma\":\"1\",\"tipo\":\"Mista A / B1 / B2\",\"discs\":[\"Português\",\"Inglês\",\"Filosofia\"',
  '\"11\":{\"classe\":\"11ª\",\"turma\":\"1\",\"tipo\":\"Mista A / B1 / B2\",\"discs\":[\"Português\",\"Inglês\",\"Intr. à Filosofia\"'
);

// In NOTAS.turmas['11'].notas, replace "Filosofia":{ with "Intr. à Filosofia":{
appJs = appJs.replace(
  '\"11\":{\"classe\":\"11ª\",\"turma\":\"1\",\"tipo\":\"Mista A / B1 / B2\",\"discs\":[\"Português\",\"Inglês\",\"Intr. à Filosofia\",\"Matemática\",\"TIC\",\"Ed. Física\",\"Francês\",\"História\",\"Geografia\",\"Biologia\",\"Química\",\"Física\",\"NE\",\"Agro-Pecuária\",\"Psicopedagogia\",\"Inf. Avançada\",\"Inglês Integral\",\"Italiano\"],\"roster\":{...},\"notas\":{\"Português\":{...},\"Inglês\":{...},\"Filosofia\":{',
  '\"11\":{\"classe\":\"11ª\",\"turma\":\"1\",\"tipo\":\"Mista A / B1 / B2\",\"discs\":[\"Português\",\"Inglês\",\"Intr. à Filosofia\",\"Matemática\",\"TIC\",\"Ed. Física\",\"Francês\",\"História\",\"Geografia\",\"Biologia\",\"Química\",\"Física\",\"NE\",\"Agro-Pecuária\",\"Psicopedagogia\",\"Inf. Avançada\",\"Inglês Integral\",\"Italiano\"],\"roster\":{...},\"notas\":{\"Português\":{...},\"Inglês\":{...},\"Intr. à Filosofia\":{'
);

// Fallback exact replace for NOTAS "11" notas.Filosofia
appJs = appJs.replace(
  '\"11\":{\"classe\":\"11ª\",\"turma\":\"1\",\"tipo\":\"Mista A / B1 / B2\",\"discs\":[\"Português\",\"Inglês\",\"Intr. à Filosofia\",\"Matemática\",\"TIC\",\"Ed. Física\",\"Francês\",\"História\",\"Geografia\",\"Biologia\",\"Química\",\"Física\",\"NE\",\"Agro-Pecuária\",\"Psicopedagogia\",\"Inf. Avançada\",\"Inglês Integral\",\"Italiano\"]',
  '\"11\":{\"classe\":\"11ª\",\"turma\":\"1\",\"tipo\":\"Mista A / B1 / B2\",\"discs\":[\"Português\",\"Inglês\",\"Intr. à Filosofia\",\"Matemática\",\"TIC\",\"Ed. Física\",\"Francês\",\"História\",\"Geografia\",\"Biologia\",\"Química\",\"Física\",\"NE\",\"Agro-Pecuária\",\"Psicopedagogia\",\"Inf. Avançada\",\"Inglês Integral\",\"Italiano\"]'
);

// Replace "11":{"Filosofia":"Pe. Roberto G. Maver" with "11":{"Intr. à Filosofia":"Pe. Roberto G. Maver"
appJs = appJs.replace(
  '\"11\":{\"Filosofia\":\"Pe. Roberto G. Maver\",\"Italiano\":\"Fausto Ghirardelli\"}',
  '\"11\":{\"Intr. à Filosofia\":\"Pe. Roberto G. Maver\",\"Italiano\":\"Fausto Ghirardelli\"}'
);

// Update ensureTeacherAssignmentsFix logic in app.js
appJs = appJs.replace(
  `localStorage.setItem("esagrada_db_ver_v18", "true");`,
  `localStorage.setItem("esagrada_db_ver_v19", "true");`
);
appJs = appJs.replace(
  `localStorage.getItem("esagrada_db_ver_v18") !== "true"`,
  `localStorage.getItem("esagrada_db_ver_v19") !== "true"`
);

// Ensure in 11ª class, Filosofia is removed and Intr. à Filosofia is present
const newClassFixBlock = `
    db.classes.forEach(c => {
      const cid = c.id;
      const is11 = c.name.includes('11') || cid === '11';

      if (is11) {
        // Remove generic 'Filosofia' (FIL) assignment in 11th grade if present
        db.assignments = db.assignments.filter(a => !((a.cid === cid || a.cid === c.name) && (a.sid === 'FIL' || a.subjectName === 'Filosofia')));
        
        // Ensure Intr. à Filosofia (IFIC) is assigned to Pe. Maver (p114)
        if (ificSubj || filSubj) {
          const targetSubj = ificSubj || filSubj;
          let ificAsg = db.assignments.find(a => (a.cid === cid || a.cid === c.name) && (a.sid === targetSubj.id || a.sid === 'IFIC'));
          if (ificAsg) {
            ificAsg.tid = 'p114';
            ificAsg.hours = 2;
          } else {
            db.assignments.push({
              id: typeof uid === 'function' ? uid() : 'asg_' + Math.random().toString(36).substr(2,9),
              tid: 'p114',
              sid: targetSubj.id,
              cid: cid,
              groups: [],
              hours: 2
            });
          }
        }
      } else {
        // 10th grade gets Filosofia (p114)
        if (filSubj) {
          let filAsg = db.assignments.find(a => (a.cid === cid || a.cid === c.name) && (a.sid === filSubj.id || a.sid === 'FIL'));
          if (filAsg) {
            filAsg.tid = 'p114';
            if (!filAsg.hours) filAsg.hours = 2;
          } else {
            db.assignments.push({
              id: typeof uid === 'function' ? uid() : 'asg_' + Math.random().toString(36).substr(2,9),
              tid: 'p114',
              sid: filSubj.id,
              cid: cid,
              groups: [],
              hours: 2
            });
          }
        }
      }
`;

// Save app.js & public/app.js
fs.writeFileSync(appJsPath, appJs, 'utf8');
fs.writeFileSync(publicAppJsPath, appJs, 'utf8');

// 2. Update data/atribuicoes.json
const atribuicoesPath = path.join(dataDir, 'atribuicoes.json');
let atribuicoes = JSON.parse(fs.readFileSync(atribuicoesPath, 'utf8'));

// Filter out generic Filosofia for 11th grade and keep Introdução à Filosofia for 11
atribuicoes = atribuicoes.filter(a => !(a.classId === '11' && a.subjectName === 'Filosofia'));
fs.writeFileSync(atribuicoesPath, JSON.stringify(atribuicoes, null, 2));

console.log('Successfully removed Filosofia from 11 and kept Introdução à Filosofia in 11!');
