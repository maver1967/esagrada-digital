'use client';

import { useState } from 'react';
import Navbar from '@/presentation/components/Navbar';
import Link from 'next/link';
import { BookOpen, ArrowLeft, Plus, FileText, Send, CheckCircle2, MessageSquare, Download } from 'lucide-react';

export default function LMSPage() {
  const [selectedSubject, setSelectedSubject] = useState('Filosofia');
  const [selectedClass, setSelectedClass] = useState('10-1');

  const posts = [
    {
      id: 1,
      author: 'Pe. Roberto Giuseppe Maver',
      role: 'Professor / Direção',
      title: 'Trabalho Prático: Ética e Filosofia Moçambicana',
      content: 'Estimados estudantes da 10ª e 11ª Classe, por favor façam a leitura do Capítulo 3 e enviem os resumos até a próxima Segunda-feira.',
      date: '10 de Agosto de 2026',
      files: ['Ficha_Apoio_Filosofia_Cap3.pdf'],
    },
    {
      id: 2,
      author: 'Prof. Fausto Ghirardelli',
      role: 'Professor',
      title: 'Esercizi di Lingua Italiana — 10ª Classe',
      content: 'Cari studenti della classe 10-1, completate gli esercizi a pagina 45 del libro di testo.',
      date: '08 de Agosto de 2026',
      files: ['Esercizi_Italiano_10-1.pdf'],
    },
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
                Sala Virtual / LMS ESAGRADA
              </h1>
              <p className="text-xs text-slate-400">
                Espaço de aprendizagem, publicação de tarefas e recursos de estudo
              </p>
            </div>
          </div>

          <button className="px-4 py-2 rounded-xl gradient-btn text-white text-xs font-bold flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Nova Tarefa / Publicação
          </button>
        </div>

        {/* Posts feed */}
        <div className="space-y-4">
          {posts.map((p) => (
            <div key={p.id} className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center font-bold text-amber-300 text-sm">
                    {p.author.substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{p.author}</h3>
                    <span className="text-[10px] text-amber-400 font-semibold">{p.role}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-mono">{p.date}</span>
              </div>

              <div>
                <h4 className="font-bold text-lg text-white mb-1">{p.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p.content}</p>
              </div>

              {p.files.length > 0 && (
                <div className="pt-2">
                  {p.files.map((f, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card text-xs text-amber-300 border border-amber-400/20 hover:bg-white/10 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
