import React from 'react';
import Link from 'next/link';
import { Building2, Zap, CheckCircle2, Truck, Recycle, ArrowRight } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Step 1: List Your Waste',
      desc: 'Producers fill out the multi-step listing wizard specifying material description, weight/quantity, condition, pickup location, and availability dates.',
      icon: <Building2 className="w-8 h-8 text-emerald-600" />,
    },
    {
      num: '02',
      title: 'Step 2: Smart Matching',
      desc: 'The Smart Match Engine calculates compatibility scores considering proximity, batch volume, recycler capabilities, and verified status.',
      icon: <Zap className="w-8 h-8 text-blue-600" />,
    },
    {
      num: '03',
      title: 'Step 3: Connect & Deal',
      desc: 'Recyclers submit competitive bids for E-Waste lots, while farmers and composting operators submit usage claims for organic scrap.',
      icon: <CheckCircle2 className="w-8 h-8 text-amber-600" />,
    },
    {
      num: '04',
      title: 'Step 4: Schedule Pickup',
      desc: 'Both parties coordinate transport date, loading dock instructions, contact personnel, and time window with real-time status tracking.',
      icon: <Truck className="w-8 h-8 text-purple-600" />,
    },
    {
      num: '05',
      title: 'Step 5: Reuse & Recover',
      desc: 'Materials physically move into urban mining refineries (precious metal extraction) or agricultural vermicomposting and biogas generation.',
      icon: <Recycle className="w-8 h-8 text-teal-600" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">Platform Workflow Guide</span>
        <h1 className="text-3xl font-extrabold text-slate-900">How Smart Waste Exchange Works</h1>
        <p className="text-sm text-slate-600">
          A seamless digital exchange transforming waste management into a transparent resource marketplace.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {steps.map((s) => (
          <div key={s.num} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
              {s.icon}
            </div>
            <div className="space-y-2">
              <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">{s.num}</span>
              <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0F382C] text-white text-xs font-extrabold shadow-md hover:bg-[#154a3b] transition-all"
        >
          <span>Explore Marketplace Listings</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </Link>
      </div>
    </div>
  );
}
