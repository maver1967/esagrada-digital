'use client';

import { useState } from 'react';
import Navbar from '@/presentation/components/Navbar';
import Link from 'next/link';
import { GraduationCap, ArrowLeft, Download, Search, CheckCircle, AlertCircle } from 'lucide-react';

export default function PautasPage() {
  const [selectedClass, setSelectedClass] = useState('10-1');
  const [selectedSubject, setSelectedSubject] = useState('Filosofia');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample roster student data with grades
  const sampleStudents = [
    { code: 'ESF000009', num: 1, name: 'Adilson Pedro', gender: 'H', a1: 15, a2: 16, a3: 14, media: 15 },
    { code: 'ESF000109', num: 2, name: 'Ailton de Eusébio André Geraldo Muhurube', gender: 'H', a1: 13, a2: 14, a3: 13, media: 13.3 },
    { code: 'ESF000067', num: 3, name: 'Akicha Júlio Luciano Malige', gender: 'M', a1: 15, a2: 15, a3: 16, media: 15.3 },
    { code: 'ESF000108', num: 4, name: 'Alexandre Romão Alexandre Júnior', gender: 'H', a1: 15, a2: 14, a3: 14, media: 14.3 },
    { code: 'ESF000019', num: 5, name: 'Aliana Patrício Nhanombe', gender: 'M', a1: 12, a2: 13, a3: 13, media: 12.7 },
  ];

  const filteredStudents = sampleStudents.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <GraduationCap className="w-6 h-6 text-amber-400" />
                Pauta Trimestral de Avaliação
              </h1>
              <p className="text-xs text-slate-400">
                Lançamento e cálculo automático de médias (1º Trimestre 2026)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl glass-card text-xs font-bold text-slate-300 hover:text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-amber-400" />
              Exportar PDF / Excel
            </button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
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
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Disciplina</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-white font-medium focus:outline-none focus:border-amber-400"
              >
                <option value="Filosofia">Filosofia</option>
                <option value="Italiano">Italiano</option>
                <option value="Português">Português</option>
                <option value="Matemática">Matemática</option>
                <option value="Inglês">Inglês</option>
              </select>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar aluno..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900/80 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Pauta Table */}
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/90 border-b border-white/10 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="p-3.5 w-12 text-center">Nº</th>
                  <th className="p-3.5 w-28">Código</th>
                  <th className="p-3.5">Nome Completo</th>
                  <th className="p-3.5 w-16 text-center">Sexo</th>
                  <th className="p-3.5 w-20 text-center">ACS 1</th>
                  <th className="p-3.5 w-20 text-center">ACS 2</th>
                  <th className="p-3.5 w-20 text-center">ACP</th>
                  <th className="p-3.5 w-24 text-center font-extrabold text-amber-400">Média</th>
                  <th className="p-3.5 w-28 text-center">Resultado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {filteredStudents.map((s) => (
                  <tr key={s.code} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 text-center font-bold text-slate-400">{s.num}</td>
                    <td className="p-3.5 font-mono text-amber-300/80">{s.code}</td>
                    <td className="p-3.5 text-white font-semibold">{s.name}</td>
                    <td className="p-3.5 text-center text-slate-400">{s.gender}</td>
                    <td className="p-3.5 text-center">{s.a1}</td>
                    <td className="p-3.5 text-center">{s.a2}</td>
                    <td className="p-3.5 text-center">{s.a3}</td>
                    <td className="p-3.5 text-center font-extrabold text-amber-400 bg-amber-400/5">
                      {s.media.toFixed(1)}
                    </td>
                    <td className="p-3.5 text-center">
                      {s.media >= 10 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                          <CheckCircle className="w-3 h-3" /> Aprovado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold">
                          <AlertCircle className="w-3 h-3" /> Reprovado
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
