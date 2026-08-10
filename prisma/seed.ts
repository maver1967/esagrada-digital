import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting ESAGRADA database seeding...');

  // Default hashed password for initial setup
  const hashedPassword = await bcrypt.hash('123456', 10);

  // 1. Create School Metadata
  await prisma.school.upsert({
    where: { id: 'escola-main' },
    update: {},
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

  // 2. Create Users & Teachers
  const teachersData = [
    { id: 'p101', code: 'p101', name: 'Edilson Chissano', email: 'p101@esagrada.mz', disciplinas: 'Português, História' },
    { id: 'p102', code: 'p102', name: 'Filipe J. Majone', email: 'p102@esagrada.mz', disciplinas: 'Inglês' },
    { id: 'p103', code: 'p103', name: 'Kyambezi K. Félix', email: 'p103@esagrada.mz', disciplinas: 'Francês' },
    { id: 'p104', code: 'p104', name: 'Fausto Ghirardelli', email: 'fausto@esagrada.mz', disciplinas: 'Italiano, Filosofia (10ª)' },
    { id: 'p105', code: 'p105', name: 'Luís Ngoca', email: 'p105@esagrada.mz', disciplinas: 'Matemática' },
    { id: 'p106', code: 'p106', name: 'Marcelo Bota Júnior', email: 'p106@esagrada.mz', disciplinas: 'Física' },
    { id: 'p107', code: 'p107', name: 'Gabriel Caetano', email: 'p107@esagrada.mz', disciplinas: 'Química' },
    { id: 'p108', code: 'p108', name: 'Lencínio Vilanculo', email: 'p108@esagrada.mz', disciplinas: 'Biologia, Agro-Pecuária' },
    { id: 'p109', code: 'p109', name: 'Mércia L. Cuamba', email: 'p109@esagrada.mz', disciplinas: 'Ed. Física' },
    { id: 'p110', code: 'p110', name: 'Milton', email: 'p110@esagrada.mz', disciplinas: 'Psicopedagogia' },
    { id: 'p111', code: 'p111', name: 'Tomás Joanninha', email: 'p111@esagrada.mz', disciplinas: 'Noções de Empreend. (NE)' },
    { id: 'p112', code: 'p112', name: 'Daniel Zameia', email: 'p112@esagrada.mz', disciplinas: 'Geografia' },
    { id: 'p113', code: 'p113', name: 'Salvado Mário Machava', email: 'p113@esagrada.mz', disciplinas: 'TIC, Inf. Avançada' },
    { id: 'p114', code: 'p114', name: 'Pe. Roberto G. Maver', email: 'maver@esagrada.mz', disciplinas: 'Filosofia (11ª)' },
    { id: 'p115', code: 'p115', name: 'Cheila Francisco Naife', email: 'p115@esagrada.mz', disciplinas: 'Inglês Integral' },
  ];

  // Direção User
  await prisma.user.upsert({
    where: { code: 'direcao' },
    update: {},
    create: {
      code: 'direcao',
      email: 'direcao@esagrada.mz',
      password: hashedPassword,
      name: 'Pe. Roberto Giuseppe Maver (Direção)',
      role: Role.DIRECAO,
    },
  });

  for (const t of teachersData) {
    const user = await prisma.user.upsert({
      where: { code: t.code },
      update: { name: t.name, email: t.email },
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

  // 3. Create Classes
  const classesData = [
    { id: '10-1', code: '10A', name: '10-1', classe: '10ª', turma: '1', tipo: 'Mista A / B1 / B2' },
    { id: '10-2', code: '10B', name: '10-2', classe: '10ª', turma: '2', tipo: 'Pura B2' },
    { id: '11', code: '11', name: '11ª', classe: '11ª', turma: '1', tipo: 'Mista A / B1 / B2' },
  ];

  for (const c of classesData) {
    await prisma.class.upsert({
      where: { id: c.id },
      update: { name: c.name, code: c.code },
      create: c,
    });
  }

  // 4. Create Subjects
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

  // 5. Create Teacher Assignments (Including Pe. Maver for 11a Filosofia, and Fausto Ghirardelli for 10a Filosofia & 10a/11a Italiano)
  const assignments = [
    // 10-1
    { classId: '10-1', subjectId: 'FIL', teacherId: 'p104' }, // Fausto Ghirardelli
    { classId: '10-1', subjectId: 'ITA', teacherId: 'p104' }, // Fausto Ghirardelli
    { classId: '10-1', subjectId: 'POR', teacherId: 'p101' },
    { classId: '10-1', subjectId: 'MAT', teacherId: 'p105' },
    { classId: '10-1', subjectId: 'ING', teacherId: 'p102' },

    // 10-2
    { classId: '10-2', subjectId: 'FIL', teacherId: 'p104' }, // Fausto Ghirardelli
    { classId: '10-2', subjectId: 'POR', teacherId: 'p101' },
    { classId: '10-2', subjectId: 'MAT', teacherId: 'p105' },

    // 11ª
    { classId: '11', subjectId: 'FIL', teacherId: 'p114' }, // Pe. Maver
    { classId: '11', subjectId: 'ITA', teacherId: 'p104' }, // Fausto Ghirardelli
    { classId: '11', subjectId: 'POR', teacherId: 'p101' },
    { classId: '11', subjectId: 'MAT', teacherId: 'p105' },
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

  console.log('✅ ESAGRADA database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
