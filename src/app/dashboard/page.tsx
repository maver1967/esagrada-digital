'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/presentation/components/Navbar';
import Link from 'next/link';
import { 
  CalendarDays, 
  GraduationCap, 
  BookCheck, 
  Users, 
  Database, 
  ShieldCheck, 
  Sparkles, 
  Server, 
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [seeding, setSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <span className="animate-spin text-amber-400 text-2xl font-bold">↻</span>
          <span className="font-semibold text-sm">A carregar sessão ESAGRADA...</span>
        </div>
      </div>
    );
  }

  const user = session?.user as any;

  const triggerSeed = async () => {
    setSeeding(true);
    setSeedStatus('A semear base de dados MariaDB...');
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSeedStatus('✅ Base de dados inicializada com sucesso!');
      } else {
        setSeedStatus(`❌ Erro: ${data.error}`);
      }
    } catch (e: any) {
      setSeedStatus(`❌ Erro de ligação: ${e.message}`);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Welcome Header */}
        <div className="glass-panel p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Ano Lectivo 2026 · MariaDB Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Bem-vindo, <span className="gradient-text">{user?.name}</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Painel principal de gestão académica e leccionação · EPUSF Maxixe
            </p>
          </div>

          {user?.role === 'DIRECAO' && (
            <button
              onClick={triggerSeed}
              disabled={seeding}
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-300 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
            >
              <Database className="w-4 h-4" />
              {seeding ? 'A Semear MariaDB...' : 'Inicializar / Semear MariaDB'}
            </button>
          )}
        </div>

        {seedStatus && (
          <div className="p-4 rounded-xl glass-card text-xs font-semibold text-amber-300 border border-amber-400/30">
            {seedStatus}
          </div>
        )}

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/horarios" className="glass-card p-6 block group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Horários de Aulas
              </h2>
              <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Matriz completa de horários por turma (10-1, 10-2, 11ª) e atribuições de professores.
            </p>
          </Link>

          <Link href="/pautas" className="glass-card p-6 block group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Pautas & Cadernetas
              </h2>
              <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Lançamento de notas (ACS, ACP, Média), cadernetas de avaliação e estatísticas do trimestre.
            </p>
          </Link>

          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Server className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">Infraestrutura Synology</h2>
            <p className="text-xs text-slate-400 mt-2">
              Contêineres Docker activos com capacidade de 5.000 acessos/dia em MariaDB relacional.
            </p>
          </div>
        </div>

        {/* Teacher Assignments Overview */}
        <div className="glass-panel p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Atribuição Docente Atualizada</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Conforme Novo Regulamento</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Pe. Maver */}
            <div className="glass-card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Pe. Roberto G. Maver</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">p114</span>
              </div>
              <p className="text-xs text-slate-300">
                <strong className="text-amber-400">Filosofia:</strong> Exclusivamente na <span className="text-white font-bold">11ª Classe</span>
              </p>
              <div className="text-[11px] text-slate-500 border-t border-white/5 pt-2">
                Rinuncia às turmas 10-1 e 10-2.
              </div>
            </div>

            {/* Prof. Fausto Ghirardelli */}
            <div className="glass-card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Prof. Fausto Ghirardelli</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">p104</span>
              </div>
              <p className="text-xs text-slate-300">
                <strong className="text-amber-400">Filosofia:</strong> Turmas <span className="text-white font-bold">10ª 1 (10-1)</span> e <span className="text-white font-bold">10ª 2 (10-2)</span>
              </p>
              <p className="text-xs text-slate-300">
                <strong className="text-blue-400">Italiano:</strong> Turmas 10-1 e 11ª
              </p>
            </div>

            {/* Outros Docentes */}
            <div className="glass-card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Corpo Docente EPUSF</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">15 Profs</span>
              </div>
              <p className="text-xs text-slate-400">
                Português, Matemática, Inglês, TIC, Física, Química, Biologia, Geografia, História, etc.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
