'use client';

import { useState } from 'react';
import Navbar from '@/presentation/components/Navbar';
import Link from 'next/link';
import { FileText, ArrowLeft, Printer, Download, Award, FileSpreadsheet, Building } from 'lucide-react';

export default function DocumentosPage() {
  const [docType, setDocType] = useState('pauta_geral');
  const [selectedClass, setSelectedClass] = useState('10-1');

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
                <FileText className="w-6 h-6 text-amber-400" />
                Documentos Uspeciais & Impressão
              </h1>
              <p className="text-xs text-slate-400">
                Emissão de Pautas, Certificados, Boletins e Fichas de Aluno com chancela oficial da EPUSF
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl gradient-btn text-white text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <Printer className="w-4 h-4" />
            Imprimir Documento
          </button>
        </div>

        {/* Controls */}
        <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Tipo de Documento</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-white font-medium focus:outline-none focus:border-amber-400"
              >
                <option value="pauta_geral">Pauta Trimestral / Geral (A4/A3)</option>
                <option value="boletim">Boletim de Notas do Aluno</option>
                <option value="ficha">Ficha Individual do Aluno</option>
                <option value="certificado">Certificado de Aproveitamento</option>
              </select>
            </div>

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
          </div>
        </div>

        {/* Official Document Preview Area (Printable Format) */}
        <div className="glass-panel p-8 md:p-12 text-slate-900 bg-white rounded-2xl shadow-2xl space-y-8 font-serif print:shadow-none print:p-0 print:m-0 print:border-none">
          {/* Header Office Stamp */}
          <div className="text-center space-y-1.5 border-b-2 border-slate-900 pb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700">República de Moçambique</h2>
            <h3 className="text-xs font-semibold text-slate-600">Ministério da Educação e Desenvolvimento Humano</h3>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              Escola Pré-Universitária Sagrada Família de Maxixe
            </h1>
            <p className="text-xs italic text-slate-600">Província de Inhambane · Distrito de Maxixe · Ano Lectivo 2026</p>
          </div>

          {/* Document Title */}
          <div className="text-center py-2">
            <span className="text-base font-extrabold uppercase tracking-wider underline underline-offset-8">
              {docType === 'pauta_geral' && `Pauta Geral de Avaliação — Turma ${selectedClass}`}
              {docType === 'boletim' && 'Boletim de Notas Trimestral'}
              {docType === 'ficha' && 'Ficha Individual do Estudante'}
              {docType === 'certificado' && 'Certificado de Aproveitamento Académico'}
            </span>
          </div>

          {/* Document Body Sample Table */}
          <div className="space-y-4 font-sans text-xs">
            <table className="w-full border-collapse border border-slate-900 text-left">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-900 font-bold uppercase text-[10px]">
                  <th className="border border-slate-900 p-2 text-center w-10">Nº</th>
                  <th className="border border-slate-900 p-2 w-24">Código</th>
                  <th className="border border-slate-900 p-2">Nome Completo</th>
                  <th className="border border-slate-900 p-2 text-center w-12">Sexo</th>
                  <th className="border border-slate-900 p-2 text-center w-16">Filosofia</th>
                  <th className="border border-slate-900 p-2 text-center w-16">Português</th>
                  <th className="border border-slate-900 p-2 text-center w-16">Matemática</th>
                  <th className="border border-slate-900 p-2 text-center w-20">Média Final</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-900 p-2 text-center font-bold">1</td>
                  <td className="border border-slate-900 p-2 font-mono">ESF000009</td>
                  <td className="border border-slate-900 p-2 font-bold">Adilson Pedro</td>
                  <td className="border border-slate-900 p-2 text-center">H</td>
                  <td className="border border-slate-900 p-2 text-center">15</td>
                  <td className="border border-slate-900 p-2 text-center">15</td>
                  <td className="border border-slate-900 p-2 text-center">13</td>
                  <td className="border border-slate-900 p-2 text-center font-bold bg-slate-100">14.3</td>
                </tr>
                <tr>
                  <td className="border border-slate-900 p-2 text-center font-bold">2</td>
                  <td className="border border-slate-900 p-2 font-mono">ESF000109</td>
                  <td className="border border-slate-900 p-2 font-bold">Ailton Muhurube</td>
                  <td className="border border-slate-900 p-2 text-center">H</td>
                  <td className="border border-slate-900 p-2 text-center">13</td>
                  <td className="border border-slate-900 p-2 text-center">13</td>
                  <td className="border border-slate-900 p-2 text-center">14</td>
                  <td className="border border-slate-900 p-2 text-center font-bold bg-slate-100">13.3</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Official Signatures Section */}
          <div className="pt-12 grid grid-cols-2 gap-8 text-center text-xs font-serif pt-8 border-t border-slate-300">
            <div>
              <p className="font-bold text-slate-800">O Diretor Adjunto</p>
              <div className="h-16 flex items-end justify-center">
                <span className="font-mono text-slate-400 italic text-[10px]">[Assinatura Digital Chancela]</span>
              </div>
              <p className="font-bold border-t border-slate-900 pt-1 mt-2 inline-block px-8">André Feniosse Nhabique</p>
            </div>

            <div>
              <p className="font-bold text-slate-800">O Diretor Geral da Escola</p>
              <div className="h-16 flex items-end justify-center">
                <span className="font-mono text-slate-400 italic text-[10px]">[Assinatura Digital Chancela]</span>
              </div>
              <p className="font-bold border-t border-slate-900 pt-1 mt-2 inline-block px-8">Pe. Roberto Giuseppe Maver</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
