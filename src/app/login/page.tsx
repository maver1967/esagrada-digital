'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, User, KeyRound, ArrowRight, Sparkles, Building2, BookOpen } from 'lucide-react';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      identifier: identifier.trim(),
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Credenciais inválidas. Verifique o código/email ou a palavra-passe.');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  const fillQuickLogin = (code: string) => {
    setIdentifier(code);
    setPassword('123456');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-900 to-amber-500/30 border border-white/10 mb-4 shadow-xl">
            <Building2 className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight gradient-text mb-2 font-serif">
            ESAGRADA
          </h1>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Plataforma Digital · EPUSF Maxixe
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center font-medium animate-shake">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Código ou E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Ex: p104, p114 ou fausto@esagrada.mz"
                className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Palavra-passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl gradient-btn text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block animate-spin font-bold">↻</span>
            ) : (
              <>
                Entrar no Sistema
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Credentials Switcher */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-slate-400 text-center mb-3 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Acesso Rápido (Demonstração / Teste):
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => fillQuickLogin('p104')}
              className="px-3 py-2 glass-card text-left text-slate-300 hover:text-white flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-amber-400">Prof. Fausto</span>
                <span className="block text-[10px] text-slate-400">p104 (Filos. 10ª)</span>
              </div>
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => fillQuickLogin('p114')}
              className="px-3 py-2 glass-card text-left text-slate-300 hover:text-white flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-amber-400">Pe. Maver</span>
                <span className="block text-[10px] text-slate-400">p114 (Filos. 11ª)</span>
              </div>
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => fillQuickLogin('direcao')}
              className="px-3 py-2 glass-card text-left text-slate-300 hover:text-white flex items-center justify-between col-span-2"
            >
              <div>
                <span className="font-bold text-emerald-400">Direção Geral</span>
                <span className="block text-[10px] text-slate-400">direcao (Acesso Total)</span>
              </div>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
