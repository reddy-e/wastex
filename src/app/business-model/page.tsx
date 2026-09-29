import React from 'react';
import { DollarSign, TrendingUp, Building2, ShieldCheck, Layers, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BusinessModelPage() {
  const streams = [
    {
      title: '1. Transaction Commissions',
      desc: '2.5% to 5.0% commission fee charged on successful commercial e-waste auction settlements.',
      badge: 'Proposed Commercial Stream',
    },
    {
      title: '2. Premium Enterprise Accounts',
      desc: 'Monthly SaaS subscription for corporate IT departments requiring automated ESG waste audit reports.',
      badge: 'Proposed Commercial Stream',
    },
    {
      title: '3. Priority Listing Promotion',
      desc: 'Featured placement in search results for urgent organic waste pickup before material spoilage.',
      badge: 'Proposed Commercial Stream',
    },
    {
      title: '4. Logistics Partner Network Fee',
      desc: 'Revenue share with certified transport partners for routed pickup scheduling.',
      badge: 'Proposed Logistics Stream',
    },
    {
      title: '5. Industry Analytics & ESG Insights',
      desc: 'Aggregated regional waste volume forecasts provided to municipality waste planners.',
      badge: 'Proposed Data Stream',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">Startup Monetization Strategy</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Commercial Business Model Canvas
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          How Smart Waste Exchange builds a scalable, self-sustaining circular economy startup.
        </p>
      </div>

      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 text-xs text-center font-semibold max-w-2xl mx-auto">
        Note: The revenue channels outlined below represent proposed commercial startup monetization streams for evaluation.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {streams.map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
              {s.badge}
            </span>
            <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <Link
          href="/research-demo"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F382C] text-white text-xs font-bold hover:bg-[#154a3b] transition-all"
        >
          <span>View Full Research & Pitch Demo</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </Link>
      </div>
    </div>
  );
}
