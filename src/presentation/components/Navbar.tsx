'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { LogOut, UserCheck, Sparkles, Building2 } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user as any;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-amber-500/30 border border-white/10 flex items-center justify-center shadow-md">
            <Building2 className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-white tracking-tight">ESAGRADA</span>
              <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono text-[11px] font-extrabold border border-sky-500/30">
                v4.2.3
              </span>
            </div>
            <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
              Plataforma Digital · EPUSF
            </span>
          </div>
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-slate-200">{user.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[10px] uppercase">
                {user.role}
              </span>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-xs font-semibold flex items-center gap-1.5"
              title="Terminar Sessão"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
