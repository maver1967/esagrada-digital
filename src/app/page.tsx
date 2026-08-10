import Link from 'next/link';
import { Building2, ArrowRight, ShieldCheck, Database, Smartphone, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-amber-500/30 border border-white/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-amber-400" />
          </div>
          <span className="font-serif font-bold text-xl text-white tracking-tight">ESAGRADA</span>
        </div>

        <Link
          href="/login"
          className="px-5 py-2.5 rounded-xl gradient-btn text-white font-bold text-xs tracking-wide shadow-lg flex items-center gap-2"
        >
          Entrar no Sistema
          <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      {/* Main Hero */}
      <main className="max-w-4xl mx-auto w-full text-center space-y-8 z-10 py-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          Clean Architecture · Next.js 15 & MariaDB (Prisma)
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-serif leading-tight">
          Plataforma Digital de Gestão Escolar <span className="gradient-text">ESAGRADA</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Sistema de alta performance preparado para <strong className="text-amber-400">5.000 acessos diários</strong> em servidores NAS Synology via Docker. Gestão integrada de Horários, Pautas e Diários de Classe.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/login"
            className="px-8 py-4 rounded-xl gradient-btn text-white font-extrabold text-sm tracking-wide shadow-xl flex items-center gap-3"
          >
            Aceder ao Portal
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Features Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 text-left">
          <div className="glass-card p-5 space-y-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h2 className="font-bold text-white text-sm">Autenticação Dupla</h2>
            <p className="text-xs text-slate-400">
              Acesso seguro permitindo tanto o Código de utilizador (`p104`, `direcao`) como E-mail institucional.
            </p>
          </div>

          <div className="glass-card p-5 space-y-2">
            <Database className="w-6 h-6 text-blue-400" />
            <h2 className="font-bold text-white text-sm">MariaDB & Synology</h2>
            <p className="text-xs text-slate-400">
              Base de dados relacional com Prisma ORM e phpMyAdmin orquestrada via Docker Compose.
            </p>
          </div>

          <div className="glass-card p-5 space-y-2">
            <Smartphone className="w-6 h-6 text-emerald-400" />
            <h2 className="font-bold text-white text-sm">Suporte PWA Completo</h2>
            <p className="text-xs text-slate-400">
              Instalável em telemóveis e computadores com suporte para operação offline e Service Worker.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full text-center text-xs text-slate-500 border-t border-white/5 pt-6 z-10">
        Escola Pré-Universitária Sagrada Família · Maxixe, Moçambique © 2026 · Versão 5.0.0
      </footer>
    </div>
  );
}
