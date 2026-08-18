const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// 1. Docentes
const docentes = [
  { id: 'p101', title: '', name: 'Edilson Arlindo Chissano', email: 'chissano@esagrada.mz', disciplinas: ['Português', 'História'] },
  { id: 'p102', title: '', name: 'Filipe João Majone', email: 'majone@esagrada.mz', disciplinas: ['Inglês'] },
  { id: 'p103', title: '', name: 'Kyambesi Kabulo Felix', email: 'felix@esagrada.mz', disciplinas: ['Francês'] },
  { id: 'p104', title: '', name: 'Fausto Ghirardelli', email: 'fausto@esagrada.mz', disciplinas: ['Italiano'] },
  { id: 'p105', title: '', name: 'Luís Adelino Ngoca', email: 'ngoca@esagrada.mz', disciplinas: ['Matemática'] },
  { id: 'p106', title: '', name: 'Marcelo da Glória Joaquim Bota Júnior', email: 'bota@esagrada.mz', disciplinas: ['Física'] },
  { id: 'p107', title: '', name: 'Gabriel Zacarias Caetano', email: 'caetano@esagrada.mz', disciplinas: ['Química'] },
  { id: 'p108', title: '', name: 'Lencinio Zacarias Vilanculo', email: 'vilanculo@esagrada.mz', disciplinas: ['Biologia', 'Agro-Pecuária'] },
  { id: 'p109', title: '', name: 'Mércia Luciano Cuamba', email: 'cuamba@esagrada.mz', disciplinas: ['Ed. Física'] },
  { id: 'p110', title: '', name: 'Milton Tomás Taela Guilima', email: 'guilima@esagrada.mz', disciplinas: ['Psicopedagogia'] },
  { id: 'p111', title: '', name: 'Tomás da Conceição Joanninha', email: 'joanninha@esagrada.mz', disciplinas: ['Noções de Empreendedorismo (NE)'] },
  { id: 'p112', title: '', name: 'Daniel Zameia', email: 'zameia@esagrada.mz', disciplinas: ['Geografia'] },
  { id: 'p113', title: '', name: 'Salvado Mário Machava', email: 'machava@esagrada.mz', disciplinas: ['TIC', 'Informática Avançada'] },
  { id: 'p114', title: 'Pe.', name: 'Roberto Giuseppe Maver', email: 'maver@esagrada.mz', disciplinas: ['Filosofia', 'Intr. à Filosofia', 'Ética e Cidadania'] },
  { id: 'p115', title: '', name: 'Cheila Francisco Naife', email: 'naife@esagrada.mz', disciplinas: ['Inglês Integral'] }
];

// 2. Disciplinas
const disciplinas = [
  { id: 'POR', name: 'Português', category: 'Tronco Comum', code: 'PT' },
  { id: 'ING', name: 'Inglês', category: 'Tronco Comum', code: 'ING' },
  { id: 'FIL', name: 'Filosofia', category: 'Tronco Comum', code: 'FIL' },
  { id: 'IFIC', name: 'Intr. à Filosofia', category: 'Tronco Comum', code: 'IFIC' },
  { id: 'MAT', name: 'Matemática', category: 'Tronco Comum', code: 'MAT' },
  { id: 'TIC', name: 'TICs', category: 'Tronco Comum', code: 'TICS' },
  { id: 'EDF', name: 'Educação Física', category: 'Tronco Comum', code: 'EDF' },
  { id: 'FRA', name: 'Francês', category: 'Específico', code: 'FRA' },
  { id: 'HIS', name: 'História', category: 'Específico', code: 'HIS' },
  { id: 'GEO', name: 'Geografia', category: 'Específico', code: 'GEO' },
  { id: 'QUI', name: 'Química', category: 'Específico', code: 'QUI' },
  { id: 'FIS', name: 'Física', category: 'Específico', code: 'FIS' },
  { id: 'BIO', name: 'Biologia', category: 'Específico', code: 'BIO' },
  { id: 'PSI', name: 'Psicopedagogia', category: 'Profissionalizante', code: 'PSI' },
  { id: 'AGRO', name: 'Agro-Pecuária', category: 'Profissionalizante', code: 'AGRO' },
  { id: 'NE', name: 'Noções de Empreend.', category: 'Profissionalizante', code: 'NE' },
  { id: 'ITA', name: 'Italiano', category: 'Currículo Interno', code: 'ITA' },
  { id: 'IINT', name: 'Inglês Integral', category: 'Currículo Interno', code: 'IINT' },
  { id: 'INFAV', name: 'Informática Avançada', category: 'Currículo Interno', code: 'INFAV' }
];

// 3. Turmas
const turmas = [
  { id: '10-1', name: '10ª 1', classe: '10ª', tipo: 'Mista A / B1 / B2', totalAlunos: 32 },
  { id: '10-2', name: '10ª 2', classe: '10ª', tipo: 'Pura B2', totalAlunos: 30 },
  { id: '11', name: '11ª 1', classe: '11ª', tipo: 'Mista A / B1 / B2', totalAlunos: 42 }
];

// 4. Atribuições
const atribuicoes = [
  { id: 'asg_fil_101', teacherId: 'p114', teacherName: 'Pe. Roberto Giuseppe Maver', subjectId: 'FIL', subjectName: 'Filosofia', classId: '10-1', className: '10ª 1', hoursPerWeek: 2 },
  { id: 'asg_fil_102', teacherId: 'p114', teacherName: 'Pe. Roberto Giuseppe Maver', subjectId: 'FIL', subjectName: 'Filosofia', classId: '10-2', className: '10ª 2', hoursPerWeek: 2 },
  { id: 'asg_fil_11', teacherId: 'p114', teacherName: 'Pe. Roberto Giuseppe Maver', subjectId: 'FIL', subjectName: 'Introdução à Filosofia', classId: '11', className: '11ª 1', hoursPerWeek: 2 },
  { id: 'asg_ita_101', teacherId: 'p104', teacherName: 'Fausto Ghirardelli', subjectId: 'ITA', subjectName: 'Italiano', classId: '10-1', className: '10ª 1', hoursPerWeek: 2 },
  { id: 'asg_ita_11', teacherId: 'p104', teacherName: 'Fausto Ghirardelli', subjectId: 'ITA', subjectName: 'Italiano', classId: '11', className: '11ª 1', hoursPerWeek: 2 },
  { id: 'asg_iint_101', teacherId: 'p115', teacherName: 'Cheila Francisco Naife', subjectId: 'IINT', subjectName: 'Inglês Integral', classId: '10-1', className: '10ª 1', hoursPerWeek: 2 },
  { id: 'asg_iint_102', teacherId: 'p115', teacherName: 'Cheila Francisco Naife', subjectId: 'IINT', subjectName: 'Inglês Integral', classId: '10-2', className: '10ª 2', hoursPerWeek: 2 },
  { id: 'asg_iint_11', teacherId: 'p115', teacherName: 'Cheila Francisco Naife', subjectId: 'IINT', subjectName: 'Inglês Integral', classId: '11', className: '11ª 1', hoursPerWeek: 2 }
];

fs.writeFileSync(path.join(dataDir, 'docentes.json'), JSON.stringify(docentes, null, 2));
fs.writeFileSync(path.join(dataDir, 'disciplinas.json'), JSON.stringify(disciplinas, null, 2));
fs.writeFileSync(path.join(dataDir, 'turmas.json'), JSON.stringify(turmas, null, 2));
fs.writeFileSync(path.join(dataDir, 'atribuicoes.json'), JSON.stringify(atribuicoes, null, 2));

console.log('Structured JSON data directory created successfully in data/');
