import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

export async function POST() {
  try {
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Escola
    await prisma.school.upsert({
      where: { id: 'escola-main' },
      update: {
        nome: 'Escola Pré-Universitária Sagrada Família de Maxixe',
        sigla: 'EPUSF',
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

    // Direção
    await prisma.user.upsert({
      where: { code: 'direcao' },
      update: { password: hashedPassword },
      create: {
        code: 'direcao',
        email: 'direcao@esagrada.mz',
        password: hashedPassword,
        name: 'Pe. Roberto Giuseppe Maver (Direção)',
        role: Role.DIRECAO,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Base de dados sincronizada com sucesso segundo as especificações de ESAGRADA v4.2.3!',
    });
  } catch (error: any) {
    console.error('API Seed error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
