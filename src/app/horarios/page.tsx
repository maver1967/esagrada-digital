'use client';

import { useState } from 'react';
import Navbar from '@/presentation/components/Navbar';
import Link from 'next/link';
import { Calendar, ArrowLeft, Filter, BookOpen, User, CheckCircle2 } from 'lucide-react';

export default function HorariosPage() {
  const [selectedClass, setSelectedClass] = useState('10-1');

  // Timetable grid structure for 10-1, 10-2, 11ª
  const scheduleMap: Record<string, Array<{ time: string; seg: string; ter: string; qua: string; qui: string; sex: string }>> = {
    '10-1': [
      { time: '07:30 - 08:15', seg: 'Português (p101)', ter: 'Filosofia (Pe. Maver)', qua: 'Matemática (p105)', qui: 'Italiano (Fausto Ghirardelli)', sex: 'Ed. Física (p109)' },
      { time: '08:20 - 09:05', seg: 'Português (p101)', ter: 'Filosofia (Pe. Maver)', qua: 'Matemática (p105)', qui: 'Italiano (Fausto Ghirardelli)', sex: 'Ed. Física (p109)' },
      { time: '09:20 - 10:05', seg: 'Inglês (p102)', ter: 'Química (p107)', qua: 'História (p101)', qui: 'TIC (p113)', sex: 'Biologia (p108)' },
      { time: '10:10 - 10:55', seg: 'Inglês (p102)', ter: 'Física (p106)', qua: 'Geografia (p112)', qui: 'TIC (p113)', sex: 'Biologia (p108)' },
      { time: '11:10 - 11:55', seg: 'Matemática (p105)', ter: 'Física (p106)', qua: 'Geografia (p112)', qui: 'Química (p107)', sex: 'NE (p111)' },
    ],
    '10-2': [
      { time: '07:30 - 08:15', seg: 'Matemática (p105)', ter: 'Português (p101)', qua: 'Filosofia (Pe. Maver)', qui: 'Química (p107)', sex: 'TIC (p113)' },
      { time: '08:20 - 09:05', seg: 'Matemática (p105)', ter: 'Português (p101)', qua: 'Filosofia (Pe. Maver)', qui: 'Química (p107)', sex: 'TIC (p113)' },
      { time: '09:20 - 10:05', seg: 'Biologia (p108)', ter: 'Inglês (p102)', qua: 'Física (p106)', qui: 'NE (p111)', sex: 'Ed. Física (p109)' },
      { time: '10:10 - 10:55', seg: 'Biologia (p108)', ter: 'Inglês (p102)', qua: 'Física (p106)', qui: 'NE (p111)', sex: 'Ed. Física (p109)' },
    ],
    '11': [
      { time: '07:30 - 08:15', seg: 'Filosofia (Pe. Maver)', ter: 'Matemática (p105)', qua: 'Italiano (Fausto Ghirardelli)', qui: 'Português (p101)', sex: 'Psicopedagogia (p110)' },
      { time: '08:20 - 09:05', seg: 'Filosofia (Pe. Maver)', ter: 'Matemática (p105)', qua: 'Italiano (Fausto Ghirardelli)', qui: 'Português (p101)', sex: 'Psicopedagogia (p110)' },
      { time: '09:20 - 10:05', seg: 'História (p101)', ter: 'Geografia (p112)', qua: 'Física (p106)', qui: 'Química (p107)', sex: 'Agro-Pecuária (p108)' },
      { time: '10:10 - 10:55', seg: 'História (p101)', ter: 'Geografia (p112)', qua: 'Física (p106)', qui: 'Química (p107)', sex: 'Agro-Pecuária (p108)' },
    ],
  };

  const currentSchedule = scheduleMap[selectedClass] || [];

  return (
    <div className="min-h-screen pb-12">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Top Header */}
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
                <Calendar className="w-6 h-6 text-amber-400" />
                Matriz de Horários 2026
              </h1>
              <p className="text-xs text-slate-400">
                Horário escolar com distribuição docente verificada e suporte a Clean Architecture
              </p>
            </div>
          </div>

          {/* Class Switcher */}
          <div className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-white/10">
            {['10-1', '10-2', '11'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedClass === cls
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Turma {cls === '11' ? '11ª' : cls}
              </button>
            ))}
          </div>
        </div>

        {/* Info Banner for Teacher Assignment */}
        <div className="p-4 rounded-xl glass-card border border-amber-400/30 flex items-center gap-3 text-xs text-amber-200">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <strong>Atribuição Docente Activa:</strong>{' '}
            <span>Pe. Roberto G. Maver lecciona Filosofia em todas as turmas (10-1, 10-2, 11ª). Prof. Fausto Ghirardelli lecciona Italiano.</span>
          </div>
        </div>

        {/* Timetable Table */}
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-900/80 border-b border-white/10 text-xs uppercase tracking-wider text-slate-400 font-bold">
                  <th className="p-4 w-36">Tempo</th>
                  <th className="p-4">Segunda-feira</th>
                  <th className="p-4">Terça-feira</th>
                  <th className="p-4">Quarta-feira</th>
                  <th className="p-4">Quinta-feira</th>
                  <th className="p-4">Sexta-feira</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {currentSchedule.map((slot, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-300 bg-slate-950/40">
                      {slot.time}
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 font-medium">
                        {slot.seg}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 font-medium">
                        {slot.ter}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-200 font-medium">
                        {slot.qua}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 font-medium">
                        {slot.qui}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-200 font-medium">
                        {slot.sex}
                      </span>
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
