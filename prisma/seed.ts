import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 A iniciar a migração completa (v4.2.3 -> Next.js 16 + Prisma MariaDB)...');

  const hashedPassword = await bcrypt.hash('123456', 10);

  // 1. Escola Metadata
  await prisma.school.upsert({
    where: { id: 'escola-main' },
    update: {
      nome: 'Escola Pré-Universitária Sagrada Família de Maxixe',
      sigla: 'EPUSF',
      pais: 'República de Moçambique',
      provincia: 'Inhambane',
      distrito: 'Maxixe',
      ano: 2026,
      director: 'Pe. Roberto Giuseppe Maver',
      adjunto: 'André Feniosse Nhabique',
    },
    create: {
      id: 'escola-main',
      nome: 'Escola Pré-Universitária Sagrada Família de Maxixe',
      sigla: 'EPUSF',
      pais: 'República de Moçambique',
      provincia: 'Inhambane',
      distrito: 'Maxixe',
      ano: 2026,
      director: 'Pe. Roberto Giuseppe Maver',
      adjunto: 'André Feniosse Nhabique',
    },
  });

  // 2. Utilizadores de Direção e Administração
  await prisma.user.upsert({
    where: { code: 'direcao' },
    update: { password: hashedPassword },
    create: {
      code: 'direcao',
      email: 'direcao@esagrada.mz',
      password: hashedPassword,
      name: 'Pe. Roberto Giuseppe Maver (Direção Geral)',
      role: Role.DIRECAO,
    },
  });

  // 3. Tabela Completa de Docentes (p101 .. p115 conforme ESAGRADA_MIGRATION_V423_SPEC.md)
  const teachersData = [
    { id: 'p101', code: 'p101', name: 'Edilson Chissano', email: 'p101@esagrada.mz', disciplinas: 'Português, História' },
    { id: 'p102', code: 'p102', name: 'Filipe J. Majone', email: 'p102@esagrada.mz', disciplinas: 'Inglês' },
    { id: 'p103', code: 'p103', name: 'Kyambezi K. Félix', email: 'p103@esagrada.mz', disciplinas: 'Francês' },
    { id: 'p104', code: 'p104', name: 'Fausto Ghirardelli', email: 'fausto@esagrada.mz', disciplinas: 'Italiano' },
    { id: 'p105', code: 'p105', name: 'Luís Ngoca', email: 'p105@esagrada.mz', disciplinas: 'Matemática' },
    { id: 'p106', code: 'p106', name: 'Marcelo Bota Júnior', email: 'p106@esagrada.mz', disciplinas: 'Física' },
    { id: 'p107', code: 'p107', name: 'Gabriel Caetano', email: 'p107@esagrada.mz', disciplinas: 'Química' },
    { id: 'p108', code: 'p108', name: 'Lencínio Vilanculo', email: 'p108@esagrada.mz', disciplinas: 'Biologia, Agro-Pecuária' },
    { id: 'p109', code: 'p109', name: 'Mércia L. Cuamba', email: 'p109@esagrada.mz', disciplinas: 'Ed. Física' },
    { id: 'p110', code: 'p110', name: 'Milton', email: 'p110@esagrada.mz', disciplinas: 'Psicopedagogia' },
    { id: 'p111', code: 'p111', name: 'Tomás Joanninha', email: 'p111@esagrada.mz', disciplinas: 'Noções de Empreendedorismo (NE)' },
    { id: 'p112', code: 'p112', name: 'Daniel Zameia', email: 'p112@esagrada.mz', disciplinas: 'Geografia' },
    { id: 'p113', code: 'p113', name: 'Salvado', email: 'p113@esagrada.mz', disciplinas: 'TIC, Informática Avançada' },
    { id: 'p114', code: 'p114', name: 'Pe. Roberto Giuseppe Maver', email: 'maver@esagrada.mz', disciplinas: 'Filosofia, Intr. à Filosofia, Ética e Cidadania' },
    { id: 'p115', code: 'p115', name: 'Cheila Naife', email: 'p115@esagrada.mz', disciplinas: 'Inglês Integral' },
  ];

  for (const t of teachersData) {
    const user = await prisma.user.upsert({
      where: { code: t.code },
      update: { name: t.name, email: t.email, password: hashedPassword },
      create: {
        code: t.code,
        email: t.email,
        password: hashedPassword,
        name: t.name,
        role: Role.PROFESSOR,
      },
    });

    await prisma.teacher.upsert({
      where: { id: t.id },
      update: { name: t.name, disciplinas: t.disciplinas, userId: user.id },
      create: {
        id: t.id,
        code: t.code,
        name: t.name,
        disciplinas: t.disciplinas,
        userId: user.id,
      },
    });
  }

  // 4. Turmas (Classes)
  const classesData = [
    { id: '10-1', code: '10A', name: '10-1', classe: '10ª', turma: '1', tipo: 'Mista A / B1 / B2' },
    { id: '10-2', code: '10B', name: '10-2', classe: '10ª', turma: '2', tipo: 'Pura B2' },
    { id: '11', code: '11', name: '11ª', classe: '11ª', turma: '1', tipo: 'Mista A / B1 / B2' },
  ];

  for (const c of classesData) {
    await prisma.class.upsert({
      where: { id: c.id },
      update: { name: c.name, code: c.code, tipo: c.tipo },
      create: c,
    });
  }

  // 5. Disciplinas (Subjects)
  const subjectsData = [
    { id: 'POR', name: 'Português', category: 'Tronco Comum' },
    { id: 'ING', name: 'Inglês', category: 'Tronco Comum' },
    { id: 'FIL', name: 'Filosofia', category: 'Tronco Comum' },
    { id: 'MAT', name: 'Matemática', category: 'Tronco Comum' },
    { id: 'TIC', name: 'TIC', category: 'Tronco Comum' },
    { id: 'EDF', name: 'Ed. Física', category: 'Tronco Comum' },
    { id: 'FRA', name: 'Francês', category: 'Específico' },
    { id: 'HIS', name: 'História', category: 'Específico' },
    { id: 'GEO', name: 'Geografia', category: 'Específico' },
    { id: 'BIO', name: 'Biologia', category: 'Específico' },
    { id: 'QUI', name: 'Química', category: 'Específico' },
    { id: 'FIS', name: 'Física', category: 'Específico' },
    { id: 'NE', name: 'NE', category: 'Profissionalizante' },
    { id: 'AGR', name: 'Agro-Pecuária', category: 'Profissionalizante' },
    { id: 'PSI', name: 'Psicopedagogia', category: 'Específico' },
    { id: 'IFA', name: 'Inf. Avançada', category: 'Currículo Interno' },
    { id: 'INI', name: 'Inglês Integral', category: 'Currículo Interno' },
    { id: 'ITA', name: 'Italiano', category: 'Currículo Interno' },
  ];

  for (const s of subjectsData) {
    await prisma.subject.upsert({
      where: { id: s.id },
      update: { name: s.name, category: s.category },
      create: s,
    });
  }

  // 6. Assegnazioni Docente (Assignments conforme tabela de especificações)
  const assignments = [
    // Pe. Roberto Giuseppe Maver (p114) -> Filosofia em 10-1, 10-2, 11ª
    { classId: '10-1', subjectId: 'FIL', teacherId: 'p114' },
    { classId: '10-2', subjectId: 'FIL', teacherId: 'p114' },
    { classId: '11', subjectId: 'FIL', teacherId: 'p114' },

    // Fausto Ghirardelli (p104) -> Italiano em 10-1, 11ª
    { classId: '10-1', subjectId: 'ITA', teacherId: 'p104' },
    { classId: '11', subjectId: 'ITA', teacherId: 'p104' },

    // Edilson Chissano (p101) -> Português & História
    { classId: '10-1', subjectId: 'POR', teacherId: 'p101' },
    { classId: '10-2', subjectId: 'POR', teacherId: 'p101' },
    { classId: '11', subjectId: 'POR', teacherId: 'p101' },
    { classId: '10-1', subjectId: 'HIS', teacherId: 'p101' },
    { classId: '11', subjectId: 'HIS', teacherId: 'p101' },

    // Filipe Majone (p102) -> Inglês
    { classId: '10-1', subjectId: 'ING', teacherId: 'p102' },
    { classId: '10-2', subjectId: 'ING', teacherId: 'p102' },
    { classId: '11', subjectId: 'ING', teacherId: 'p102' },

    // Kyambezi Félix (p103) -> Francês
    { classId: '10-1', subjectId: 'FRA', teacherId: 'p103' },
    { classId: '11', subjectId: 'FRA', teacherId: 'p103' },

    // Luís Ngoca (p105) -> Matemática
    { classId: '10-1', subjectId: 'MAT', teacherId: 'p105' },
    { classId: '10-2', subjectId: 'MAT', teacherId: 'p105' },
    { classId: '11', subjectId: 'MAT', teacherId: 'p105' },

    // Marcelo Bota Júnior (p106) -> Física
    { classId: '10-1', subjectId: 'FIS', teacherId: 'p106' },
    { classId: '10-2', subjectId: 'FIS', teacherId: 'p106' },
    { classId: '11', subjectId: 'FIS', teacherId: 'p106' },

    // Gabriel Caetano (p107) -> Química
    { classId: '10-1', subjectId: 'QUI', teacherId: 'p107' },
    { classId: '10-2', subjectId: 'QUI', teacherId: 'p107' },
    { classId: '11', subjectId: 'QUI', teacherId: 'p107' },

    // Lencínio Vilanculo (p108) -> Biologia & Agro-Pecuária
    { classId: '10-1', subjectId: 'BIO', teacherId: 'p108' },
    { classId: '10-2', subjectId: 'BIO', teacherId: 'p108' },
    { classId: '11', subjectId: 'BIO', teacherId: 'p108' },
    { classId: '11', subjectId: 'AGR', teacherId: 'p108' },

    // Mércia Cuamba (p109) -> Ed. Física
    { classId: '10-1', subjectId: 'EDF', teacherId: 'p109' },
    { classId: '10-2', subjectId: 'EDF', teacherId: 'p109' },
    { classId: '11', subjectId: 'EDF', teacherId: 'p109' },

    // Milton (p110) -> Psicopedagogia
    { classId: '11', subjectId: 'PSI', teacherId: 'p110' },

    // Tomás Joanninha (p111) -> NE
    { classId: '10-1', subjectId: 'NE', teacherId: 'p111' },
    { classId: '10-2', subjectId: 'NE', teacherId: 'p111' },
    { classId: '11', subjectId: 'NE', teacherId: 'p111' },

    // Daniel Zameia (p112) -> Geografia
    { classId: '10-1', subjectId: 'GEO', teacherId: 'p112' },
    { classId: '11', subjectId: 'GEO', teacherId: 'p112' },

    // Salvado (p113) -> TIC & Inf. Avançada
    { classId: '10-1', subjectId: 'TIC', teacherId: 'p113' },
    { classId: '10-2', subjectId: 'TIC', teacherId: 'p113' },
    { classId: '11', subjectId: 'TIC', teacherId: 'p113' },
    { classId: '10-1', subjectId: 'IFA', teacherId: 'p113' },
    { classId: '10-2', subjectId: 'IFA', teacherId: 'p113' },
    { classId: '11', subjectId: 'IFA', teacherId: 'p113' },

    // Cheila Naife (p115) -> Inglês Integral
    { classId: '10-1', subjectId: 'INI', teacherId: 'p115' },
    { classId: '10-2', subjectId: 'INI', teacherId: 'p115' },
    { classId: '11', subjectId: 'INI', teacherId: 'p115' },
  ];

  for (const a of assignments) {
    await prisma.assignment.upsert({
      where: {
        classId_subjectId_teacherId: {
          classId: a.classId,
          subjectId: a.subjectId,
          teacherId: a.teacherId,
        },
      },
      update: {},
      create: a,
    });
  }

  // 7. Roster Alunos (10-1, 10-2 e 11ª)
  const rosterData = [
    // 10-1
    { code: 'ESF000009', num: 1, name: 'Adilson Pedro', gender: 'H', classId: '10-1' },
    { code: 'ESF000109', num: 2, name: 'Ailton de Eusébio André Geraldo Muhurube', gender: 'H', classId: '10-1' },
    { code: 'ESF000067', num: 3, name: 'Akicha Júlio Luciano Malige', gender: 'M', classId: '10-1' },
    { code: 'ESF000108', num: 4, name: 'Alexandre Romão Alexandre Júnior', gender: 'H', classId: '10-1' },
    { code: 'ESF000019', num: 5, name: 'Aliana Patrício Nhanombe', gender: 'M', classId: '10-1' },
    { code: 'ESF000104', num: 6, name: 'Allan de Jesus Guilherme', gender: 'H', classId: '10-1' },
    { code: 'ESF000068', num: 7, name: 'Anderson Gervásio Baptista Neto', gender: 'H', classId: '10-1' },
    { code: 'ESF000010', num: 8, name: 'Antónia Pedro Horácio', gender: 'M', classId: '10-1' },
    { code: 'ESF000045', num: 9, name: 'Arthur Vieira Rios Lage', gender: 'H', classId: '10-1' },
    { code: 'ESF000099', num: 10, name: 'Chéldio Lázaro Nhaguilunguane', gender: 'H', classId: '10-1' },

    // 10-2
    { code: 'ESF000063', num: 1, name: 'Agnes Sérgio Mavécua', gender: 'M', classId: '10-2' },
    { code: 'ESF000038', num: 2, name: 'António Vieira Falusso', gender: 'H', classId: '10-2' },
    { code: 'ESF000017', num: 3, name: 'Calton Gilberto Mavie', gender: 'H', classId: '10-2' },
    { code: 'ESF000037', num: 4, name: 'Chaira Icra Faustino Rafael', gender: 'M', classId: '10-2' },
    { code: 'ESF000064', num: 5, name: 'Cleiton dos Anjos Uaquene', gender: 'H', classId: '10-2' },

    // 11ª
    { code: 'ESF000097', num: 1, name: 'Abdul Rachide Ussene Omar Júnior', gender: 'H', classId: '11' },
    { code: 'ESF000035', num: 2, name: 'Allan Wesly Nhamuenda', gender: 'H', classId: '11' },
    { code: 'ESF000022', num: 3, name: 'Amid dos Salmos Nhavotso', gender: 'H', classId: '11' },
    { code: 'ESF000111', num: 4, name: 'Aurea Shena João Uache', gender: 'M', classId: '11' },
    { code: 'ESF000026', num: 5, name: 'Clayton Eduardo Amaral', gender: 'H', classId: '11' },
  ];

  for (const st of rosterData) {
    const user = await prisma.user.upsert({
      where: { code: st.code },
      update: { name: st.name, password: hashedPassword },
      create: {
        code: st.code,
        password: hashedPassword,
        name: st.name,
        role: Role.ALUNO,
      },
    });

    await prisma.student.upsert({
      where: { code: st.code },
      update: { name: st.name, classId: st.classId, num: st.num, userId: user.id },
      create: {
        id: st.code,
        code: st.code,
        num: st.num,
        name: st.name,
        gender: st.gender,
        classId: st.classId,
        userId: user.id,
      },
    });
  }

  console.log('✅ Migração e SEED de v4.2.3 concluídos com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o SEED:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
