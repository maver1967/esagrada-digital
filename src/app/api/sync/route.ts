import { NextResponse } from 'next/server';

// Server-side persistent state store for sync
let serverSyncState = {
  acessos: [],
  diario: [],
  avisos: [],
  diretoresTurma: {},
  deletedAvisos: [],
  ts: Date.now(),
};

export async function GET() {
  return NextResponse.json(serverSyncState, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();
    if (payload && typeof payload === 'object') {
      serverSyncState = {
        acessos: Array.isArray(payload.acessos) ? payload.acessos : serverSyncState.acessos,
        diario: Array.isArray(payload.diario) ? payload.diario : serverSyncState.diario,
        avisos: Array.isArray(payload.avisos) ? payload.avisos : serverSyncState.avisos,
        diretoresTurma: payload.diretoresTurma || serverSyncState.diretoresTurma,
        deletedAvisos: Array.isArray(payload.deletedAvisos) ? payload.deletedAvisos : serverSyncState.deletedAvisos,
        ts: Date.now(),
      };
    }
    return NextResponse.json({ ok: true, ts: serverSyncState.ts }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
