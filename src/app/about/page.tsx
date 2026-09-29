import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ShieldCheck, Recycle, Cpu, Leaf, GraduationCap, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Logo size="lg" className="justify-center" />
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Product Vision & Mission
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Smart Waste Exchange is a modern digital marketplace designed to bridge the gap between waste generators and productive recyclers, transforming potential waste into valuable reusable resources.
        </p>
      </div>

      {/* Core Categories Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
            <Cpu className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Electronic Waste (E-Waste) Stream</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Targeting corporate IT infrastructure, decommissioned servers, dual-core laptops, circuit boards, and industrial copper cabling. Facilitating precious metal recovery and urban mining through certified recyclers.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
            <Leaf className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Organic & Vegetable Stream</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Source-segregated raw vegetable peelings, hotel kitchen prep scrap, overripe market produce, and spent coffee grounds diverted directly to vermicomposting and anaerobic biogas energy systems.
          </p>
        </div>
      </div>

      {/* Academic & Startup Pitch Banner */}
      <div className="bg-[#0F382C] text-white p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-500/30 shadow-lg">
        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Academic & Project Credence</span>
          <h3 className="text-xl font-bold text-white">B.Tech Research Project & Startup Prototype</h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Built as a state-of-the-art demonstration combining circular economy logic, mathematical matching algorithms, and modern web software engineering.
          </p>
        </div>
        <Link
          href="/research-demo"
          className="px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#0ea572] text-[#0F382C] font-extrabold text-xs transition-all shadow shrink-0"
        >
          View System Architecture
        </Link>
      </div>

    </div>
  );
}
