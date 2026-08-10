'use client';

import { useState } from 'react';
import Navbar from '@/presentation/components/Navbar';
import Link from 'next/link';
import { BookOpen, ArrowLeft, Calendar, CheckCircle, XCircle, Clock, UserCheck, Plus } from 'lucide-react';

export default function DiarioPage() {
  const [selectedClass, setSelectedClass] = useState('10-1');
  const [selectedDate, setSelectedDate] = useState('2026-08-10');
  const [sumario, setSumario] = useState('Introdução à Filosofia Moçambicana e Análise do Pensamento Ético.');

  const sampleAttendance = [
    { num: 1, code: 'ESF000009', name: 'Adilson Pedro', status: 'PRESENTE' },
    { num: 2, code: 'ESF000109', name: 'Ailton Muhurube', status: 'FALTA' },
    { num: 3, code: 'ESF000067', name: 'Akicha Malige', status: 'PRESENTE' },
    { num: 4, code: 'ESF000108', name: 'Alexandre Júnior', status: 'JUSTIFICADA' },
    { num: 5, code: 'ESF000019', name: 'Aliana Nhanombe', status: 'PRESENTE' },
  ];

  return (
    <div className="min-h-screen pb-12">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl glass-card text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-400" />
                Diário de Aula & Presenças
              </h1>
              <p className="text-xs text-slate-400">
                Registo diário de sumários e controlo de faltas por turma (EPUSF Maxixe)
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Turma</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-white font-medium focus:outline-none focus:border-amber-400"
              >
                <option value="10-1">Turma 10-1</option>
                <option value="10-2">Turma 10-2</option>
                <option value="11">Turma 11ª</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Data</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-white font-medium focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Sumário Entry */}
        <div className="glass-panel p-6 space-y-3">
          <label className="block text-xs uppercase font-bold text-amber-400">Sumário da Aula</label>
          <textarea
            rows={3}
            value={sumario}
            onChange={(e) => setSumario(e.target.value)}
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Attendance Roster Table */}
        <div className="glass-panel overflow-hidden">
          <div className="p-4 border-b border-white/10 font-bold text-xs text-white uppercase tracking-wider">
            Registo de Faltas — Turma {selectedClass}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/80 text-slate-400 border-b border-white/10 font-bold uppercase">
                  <th className="p-3.5 w-12 text-center">Nº</th>
                  <th className="p-3.5 w-28">Código</th>
                  <th className="p-3.5">Nome do Aluno</th>
                  <th className="p-3.5 w-40 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {sampleAttendance.map((st) => (
                  <tr key={st.code} className="hover:bg-white/[0.02]">
                    <td className="p-3.5 text-center text-slate-400">{st.num}</td>
                    <td className="p-3.5 font-mono text-amber-300/80">{st.code}</td>
                    <td className="p-3.5 text-white font-semibold">{st.name}</td>
                    <td className="p-3.5 text-center">
                      {st.status === 'PRESENTE' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                          <CheckCircle className="w-3 h-3" /> Presente
                        </span>
                      )}
                      {st.status === 'FALTA' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold">
                          <XCircle className="w-3 h-3" /> Falta
                        </span>
                      )}
                      {st.status === 'JUSTIFICADA' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                          <Clock className="w-3 h-3" /> Justificada
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
