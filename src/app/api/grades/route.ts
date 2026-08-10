import { NextResponse } from 'next/server';

export interface CalculateGradeInput {
  a1: number;
  a2: number;
  a3: number;
  at?: number; // Avaliação Trimestral (Exam)
}

export function calculateGrade(input: CalculateGradeInput) {
  const { a1, a2, a3, at = 0 } = input;
  const mac = (a1 + a2 + a3) / 3;
  const finalMedia = at > 0 ? (mac * 0.4) + (at * 0.6) : mac;

  let status: 'Aprovado' | 'Exame' | 'Reprovado';
  if (finalMedia >= 10) {
    status = 'Aprovado';
  } else if (finalMedia >= 9.5) {
    status = 'Exame';
  } else {
    status = 'Reprovado';
  }

  return {
    mac: Number(mac.toFixed(1)),
    media: Number(finalMedia.toFixed(1)),
    status,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = calculateGrade(body);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
