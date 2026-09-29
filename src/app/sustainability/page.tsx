import React from 'react';
import { Leaf, BarChart3, Globe, ShieldCheck, Cpu, Recycle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SustainabilityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">Circular Economy Impact</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Sustainability & Resource Recovery
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Closing the material loop by redirecting valuable post-consumer and industrial waste back into productive economic use.
        </p>
      </div>

      {/* Sustainable Development Goals Alignment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-3">
          <span className="text-xs font-black text-amber-700 uppercase tracking-widest block">UN SDG Goal 11</span>
          <h3 className="text-lg font-bold text-slate-900">Sustainable Cities & Communities</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Reduces municipal waste overburden by enabling direct localized exchanges between hotel kitchens, vegetable markets, and regional farming co-ops.
          </p>
        </div>

        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 space-y-3">
          <span className="text-xs font-black text-emerald-800 uppercase tracking-widest block">UN SDG Goal 12</span>
          <h3 className="text-lg font-bold text-slate-900">Responsible Consumption & Production</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Prevents e-waste from accumulating in non-regulated dumpsites, extracting high-purity copper, silver, and gold while avoiding toxic heavy metal leaching.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 space-y-3">
          <span className="text-xs font-black text-blue-800 uppercase tracking-widest block">UN SDG Goal 13</span>
          <h3 className="text-lg font-bold text-slate-900">Climate Action & Carbon Offset</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Mitigates methane emissions by diverting organic food waste into anaerobic biogas digesters and rapid vermicomposting.
          </p>
        </div>
      </div>

      {/* Impact Counters */}
      <div className="bg-[#0F382C] text-white p-8 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-lg border border-emerald-500/30">
        <div>
          <span className="text-3xl font-black text-emerald-400">42,100 kg</span>
          <span className="text-xs font-bold text-slate-300 block uppercase mt-1">Total Waste Diverted</span>
        </div>
        <div>
          <span className="text-3xl font-black text-blue-400">18.4 Tons</span>
          <span className="text-xs font-bold text-slate-300 block uppercase mt-1">E-Waste Recycled</span>
        </div>
        <div>
          <span className="text-3xl font-black text-amber-400">23.7 Tons</span>
          <span className="text-xs font-bold text-slate-300 block uppercase mt-1">Organic Scrap Composted</span>
        </div>
        <div>
          <span className="text-3xl font-black text-emerald-300">54.2 MT</span>
          <span className="text-xs font-bold text-slate-300 block uppercase mt-1">CO₂ Equivalent Offset</span>
        </div>
      </div>

    </div>
  );
}
