'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/presentation/components/Navbar';
import Link from 'next/link';
import {
  Calendar,
  ArrowLeft,
  BookOpen,
  User,
  CheckCircle2,
  Settings2,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  Users,
  Check,
  SlidersHorizontal
} from 'lucide-react';

// Master Teacher Registry
const TEACHERS = [
  { id: 'p114', name: 'Pe. Roberto G. Maver', code: 'p114' },
  { id: 'p104', name: 'Prof. Fausto Ghirardelli', code: 'p104' },
  { id: 'p101', name: 'Prof. Edilson Chissano', code: 'p101' },
  { id: 'p102', name: 'Prof. Filipe J. Majone', code: 'p102' },
  { id: 'p103', name: 'Prof. Kyambezi K. Félix', code: 'p103' },
  { id: 'p105', name: 'Prof. Luís Ngoca', code: 'p105' },
  { id: 'p106', name: 'Prof. Marcelo Bota Júnior', code: 'p106' },
  { id: 'p107', name: 'Prof. Gabriel Caetano', code: 'p107' },
  { id: 'p108', name: 'Prof. Lencínio Vilanculo', code: 'p108' },
  { id: 'p109', name: 'Profª. Mércia L. Cuamba', code: 'p109' },
  { id: 'p110', name: 'Prof. Milton', code: 'p110' },
  { id: 'p111', name: 'Prof. Tomás Joanninha', code: 'p111' },
  { id: 'p112', name: 'Prof. Daniel Zameia', code: 'p112' },
  { id: 'p113', name: 'Prof. Salvado', code: 'p113' },
  { id: 'p115', name: 'Profª. Cheila Naife', code: 'p115' },
];

const DISCIPLINES = [
  'Filosofia',
  'Italiano',
  'Português',
  'Inglês',
  'Matemática',
  'Física',
  'Química',
  'Biologia',
  'Geografia',
  'História',
  'TIC',
  'Ed. Física',
  'NE',
  'Psicopedagogia',
  'Agro-Pecuária',
];

const INITIAL_ASSIGNMENTS: Record<string, Record<string, string>> = {
  '10-1': {
    Filosofia: 'p114',
    Italiano: 'p104',
    Português: 'p101',
    Inglês: 'p102',
    Matemática: 'p105',
    Química: 'p107',
    Física: 'p106',
    Biologia: 'p108',
    Geografia: 'p112',
    História: 'p101',
    TIC: 'p113',
    'Ed. Física': 'p109',
    NE: 'p111',
  },
  '10-2': {
    Filosofia: 'p114',
    Italiano: 'p104',
    Português: 'p101',
    Inglês: 'p102',
    Matemática: 'p105',
    Química: 'p107',
    Física: 'p106',
    Biologia: 'p108',
    Geografia: 'p112',
    História: 'p101',
    TIC: 'p113',
    'Ed. Física': 'p109',
    NE: 'p111',
  },
  '11': {
    Filosofia: 'p114',
    Italiano: 'p104',
    Português: 'p101',
    Inglês: 'p102',
    Matemática: 'p105',
    Química: 'p107',
    Física: 'p106',
    Biologia: 'p108',
    Geografia: 'p112',
    História: 'p101',
    TIC: 'p113',
    'Ed. Física': 'p109',
    Psicopedagogia: 'p110',
    'Agro-Pecuária': 'p108',
  },
};

export default function HorariosPage() {
  const [selectedClass, setSelectedClass] = useState('10-1');
  const [activeTab, setActiveTab] = useState<'matriz' | 'gestao'>('matriz');
  const [assignments, setAssignments] = useState<Record<string, Record<string, string>>>(INITIAL_ASSIGNMENTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load assignments from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('esagrada_teacher_assignments_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setAssignments((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Change single assignment
  const handleAssignmentChange = (turma: string, disc: string, teacherId: string) => {
    const next = {
      ...assignments,
      [turma]: {
        ...(assignments[turma] || {}),
        [disc]: teacherId,
      },
    };
    setAssignments(next);
    try {
      localStorage.setItem('esagrada_teacher_assignments_v2', JSON.stringify(next));
    } catch (e) {}

    const tObj = TEACHERS.find((t) => t.id === teacherId);
    showToast(`Turma ${turma}: ${disc} atribuída a ${tObj?.name || teacherId}`);
  };

  // Quick Preset: Assign Prof. Fausto to Filosofia in all classes
  const applyPresetFaustoFilosofia = () => {
    const next = {
      ...assignments,
      '10-1': { ...(assignments['10-1'] || {}), Filosofia: 'p104', Italiano: 'p104' },
      '10-2': { ...(assignments['10-2'] || {}), Filosofia: 'p104', Italiano: 'p104' },
      '11': { ...(assignments['11'] || {}), Filosofia: 'p104', Italiano: 'p104' },
    };
    setAssignments(next);
    try {
      localStorage.setItem('esagrada_teacher_assignments_v2', JSON.stringify(next));
    } catch (e) {}
    showToast('⚡ Sucesso! Filosofia e Italiano atribuídos a Prof. Fausto em 10-1, 10-2 e 11ª.');
  };

  // Helper to format slot text
  const getSlotText = (disc: string, defaultCode: string) => {
    const tid = assignments[selectedClass]?.[disc] || defaultCode;
    const tObj = TEACHERS.find((t) => t.id === tid);
    if (!tObj) return `${disc} (${tid})`;
    if (tid === 'p114') return `${disc} (Pe. Maver)`;
    if (tid === 'p104') return `${disc} (Fausto Ghirardelli)`;
    return `${disc} (${tObj.code})`;
  };

  // Timetable grid structure dynamically using current assignments
  const getScheduleForClass = (cls: string) => {
    if (cls === '10-1') {
      return [
        { time: '07:30 - 08:15', seg: getSlotText('Português', 'p101'), ter: getSlotText('Filosofia', 'p104'), qua: getSlotText('Matemática', 'p105'), qui: getSlotText('Italiano', 'p104'), sex: getSlotText('Ed. Física', 'p109') },
        { time: '08:20 - 09:05', seg: getSlotText('Português', 'p101'), ter: getSlotText('Filosofia', 'p104'), qua: getSlotText('Matemática', 'p105'), qui: getSlotText('Italiano', 'p104'), sex: getSlotText('Ed. Física', 'p109') },
        { time: '09:20 - 10:05', seg: getSlotText('Inglês', 'p102'), ter: getSlotText('Química', 'p107'), qua: getSlotText('História', 'p101'), qui: getSlotText('TIC', 'p113'), sex: getSlotText('Biologia', 'p108') },
        { time: '10:10 - 10:55', seg: getSlotText('Inglês', 'p102'), ter: getSlotText('Física', 'p106'), qua: getSlotText('Geografia', 'p112'), qui: getSlotText('TIC', 'p113'), sex: getSlotText('Biologia', 'p108') },
        { time: '11:10 - 11:55', seg: getSlotText('Matemática', 'p105'), ter: getSlotText('Física', 'p106'), qua: getSlotText('Geografia', 'p112'), qui: getSlotText('Química', 'p107'), sex: getSlotText('NE', 'p111') },
      ];
    }
    if (cls === '10-2') {
      return [
        { time: '07:30 - 08:15', seg: getSlotText('Matemática', 'p105'), ter: getSlotText('Português', 'p101'), qua: getSlotText('Filosofia', 'p104'), qui: getSlotText('Química', 'p107'), sex: getSlotText('TIC', 'p113') },
        { time: '08:20 - 09:05', seg: getSlotText('Matemática', 'p105'), ter: getSlotText('Português', 'p101'), qua: getSlotText('Filosofia', 'p104'), qui: getSlotText('Química', 'p107'), sex: getSlotText('TIC', 'p113') },
        { time: '09:20 - 10:05', seg: getSlotText('Biologia', 'p108'), ter: getSlotText('Inglês', 'p102'), qua: getSlotText('Física', 'p106'), qui: getSlotText('NE', 'p111'), sex: getSlotText('Ed. Física', 'p109') },
        { time: '10:10 - 10:55', seg: getSlotText('Biologia', 'p108'), ter: getSlotText('Inglês', 'p102'), qua: getSlotText('Física', 'p106'), qui: getSlotText('NE', 'p111'), sex: getSlotText('Ed. Física', 'p109') },
      ];
    }
    return [
      { time: '07:30 - 08:15', seg: getSlotText('Filosofia', 'p104'), ter: getSlotText('Matemática', 'p105'), qua: getSlotText('Italiano', 'p104'), qui: getSlotText('Português', 'p101'), sex: getSlotText('Psicopedagogia', 'p110') },
      { time: '08:20 - 09:05', seg: getSlotText('Filosofia', 'p104'), ter: getSlotText('Matemática', 'p105'), qua: getSlotText('Italiano', 'p104'), qui: getSlotText('Português', 'p101'), sex: getSlotText('Psicopedagogia', 'p110') },
      { time: '09:20 - 10:05', seg: getSlotText('História', 'p101'), ter: getSlotText('Geografia', 'p112'), qua: getSlotText('Física', 'p106'), qui: getSlotText('Química', 'p107'), sex: getSlotText('Agro-Pecuária', 'p108') },
      { time: '10:10 - 10:55', seg: getSlotText('História', 'p101'), ter: getSlotText('Geografia', 'p112'), qua: getSlotText('Física', 'p106'), qui: getSlotText('Química', 'p107'), sex: getSlotText('Agro-Pecuária', 'p108') },
    ];
  };

  const currentSchedule = getScheduleForClass(selectedClass);
  const filTeacherId = assignments[selectedClass]?.['Filosofia'] || 'p114';
  const filTeacherName = TEACHERS.find((t) => t.id === filTeacherId)?.name || 'Pe. Roberto G. Maver';

  return (
    <div className="min-h-screen pb-12 bg-slate-950 text-slate-100">
      <Navbar />

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl glass-card text-slate-400 hover:text-white transition-colors border border-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Calendar className="w-6 h-6 text-amber-400" />
                Matriz de Horários & Gestão Docente
              </h1>
              <p className="text-xs text-slate-400">
                Horário escolar e Painel de Atribuição de Professores (Direção EPUSF Maxixe)
              </p>
            </div>
          </div>

          {/* View Switcher Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('matriz')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'matriz'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Matriz de Horários
            </button>
            <button
              onClick={() => setActiveTab('gestao')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'gestao'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Gestão de Atribuições
            </button>
          </div>
        </div>

        {/* Action Preset Banner */}
        <div className="p-4 rounded-2xl glass-card border border-amber-400/30 bg-amber-400/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-0.5">
                Painel Direto do Director
              </span>
              <p className="text-xs text-slate-300">
                Atribuição Actual da Turma <strong>{selectedClass}</strong>: Filosofia leccionada por{' '}
                <span className="text-amber-400 font-bold">{filTeacherName}</span>.
              </p>
            </div>
          </div>

          <button
            onClick={applyPresetFaustoFilosofia}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Atribuir Prof. Fausto (Filosofia em 10ª 1, 10ª 2 e 11ª)
          </button>
        </div>

        {/* Tab 1: Matriz de Horários */}
        {activeTab === 'matriz' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Seleccione a Turma para visualizar o horário:
              </span>
              <div className="flex items-center gap-2 bg-slate-900/60 p-1 rounded-xl border border-white/10">
                {['10-1', '10-2', '11'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedClass === cls
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Turma {cls === '11' ? '11ª' : cls}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-panel overflow-hidden border border-white/10 rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-slate-900/90 border-b border-white/10 text-xs uppercase tracking-wider text-slate-400 font-bold">
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
                        <td className="p-4 font-mono font-bold text-slate-300 bg-slate-950/60">
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
          </div>
        )}

        {/* Tab 2: Gestão Interactiva de Atribuições */}
        {activeTab === 'gestao' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                Editor de Atribuição Docente por Disciplina e Turma
              </h3>
              <p className="text-xs text-slate-400">
                Altere directamente qual professor lecciona cada disciplina em cada turma. As alterações são guardadas instantaneamente no sistema.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['10-1', '10-2', '11'].map((turma) => (
                <div
                  key={turma}
                  className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4 bg-slate-900/40"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h4 className="font-bold text-white text-base">
                      Turma {turma === '11' ? '11ª Classe' : turma}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold">
                      {Object.keys(assignments[turma] || {}).length} Disciplinas
                    </span>
                  </div>

                  <div className="space-y-3">
                    {DISCIPLINES.filter((d) => assignments[turma]?.[d] !== undefined || d === 'Filosofia' || d === 'Italiano').map((disc) => {
                      const currentTid = assignments[turma]?.[disc] || (disc === 'Filosofia' ? 'p104' : disc === 'Italiano' ? 'p104' : 'p101');
                      return (
                        <div
                          key={disc}
                          className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-950/60 border border-white/5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-300">{disc}</span>
                            {currentTid === 'p104' && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                                Prof. Fausto
                              </span>
                            )}
                          </div>
                          <select
                            value={currentTid}
                            onChange={(e) => handleAssignmentChange(turma, disc, e.target.value)}
                            className="bg-slate-900 text-xs font-medium text-slate-100 rounded-lg px-2.5 py-1.5 border border-white/10 focus:outline-none focus:border-amber-400"
                          >
                            {TEACHERS.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name} ({t.code})
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
