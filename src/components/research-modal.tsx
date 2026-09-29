'use client';

import React, { useState } from 'react';
import { GraduationCap, Layers, Cpu, Code, BarChart, ShieldCheck, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export function ResearchModal() {
  const [activeTab, setActiveTab] = useState<'arch' | 'algo' | 'stack' | 'sdg' | 'bmc'>('arch');

  return (
    <div className="bg-white rounded-2xl border border-emerald-200 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-[#0F382C] text-white p-6 border-b border-emerald-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-emerald-400">
              <span>B.Tech Final Year / Academic Research Paper Mode</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              System Architecture & Methodology Demonstration
            </h2>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 px-4">
        {[
          { id: 'arch', label: 'System Architecture', icon: <Layers className="w-4 h-4" /> },
          { id: 'algo', label: 'Matching Algorithm', icon: <Cpu className="w-4 h-4" /> },
          { id: 'stack', label: 'Technology Stack', icon: <Code className="w-4 h-4" /> },
          { id: 'sdg', label: 'SDG & Circular Economy', icon: <BarChart className="w-4 h-4" /> },
          { id: 'bmc', label: 'Business Model Canvas', icon: <FileText className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-[#10B981] text-[#0F382C] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      <div className="p-6 md:p-8 space-y-6">
        
        {/* 1. ARCHITECTURE */}
        {activeTab === 'arch' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Multi-Tier Digital Marketplace Architecture</h3>
              <p className="text-xs text-slate-600 mt-1">
                High-level system topology illustrating real-time data flow from waste creation to physical material recovery.
              </p>
            </div>

            <div className="bg-slate-900 text-slate-100 p-6 rounded-xl space-y-4 text-xs font-mono border border-slate-800">
              <div className="text-emerald-400 font-bold text-sm">// SYSTEM WORKFLOW & ARCHITECTURE DIAGRAM</div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
                <div className="p-3 bg-slate-800 rounded border border-emerald-500/30">
                  <span className="font-bold text-emerald-400 block mb-1">1. WASTE PRODUCER</span>
                  <p className="text-[10px] text-slate-300">IT Offices, Hotels, Markets list E-Waste & Organic scrap</p>
                </div>
                <div className="flex items-center justify-center text-emerald-400 font-bold hidden md:flex">➔</div>
                <div className="p-3 bg-slate-800 rounded border border-blue-500/30">
                  <span className="font-bold text-blue-400 block mb-1">2. SMART MATCH ENGINE</span>
                  <p className="text-[10px] text-slate-300">Proximity scoring, category filtering & rule matching</p>
                </div>
                <div className="flex items-center justify-center text-emerald-400 font-bold hidden md:flex">➔</div>
                <div className="p-3 bg-slate-800 rounded border border-amber-500/30">
                  <span className="font-bold text-amber-400 block mb-1">3. RECYCLER / FARMER</span>
                  <p className="text-[10px] text-slate-300">Bid (E-Waste) or Claim (Organic) with safety checks</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-950 rounded">
                  <span className="text-emerald-400 font-bold block mb-1">E-Waste Stream:</span>
                  <p className="text-slate-300">Supplier ➔ Verification ➔ Marketplace Listing ➔ Bidding ➔ Accepted Bid ➔ Certified Pick-up ➔ Precious Metal Extraction / Recycling</p>
                </div>
                <div className="p-3 bg-slate-950 rounded">
                  <span className="text-emerald-400 font-bold block mb-1">Organic Stream:</span>
                  <p className="text-slate-300">Supplier ➔ Safety & Contamination Audit ➔ Local Discovery ➔ Claim ➔ Scheduled Transport ➔ Composting / Biogas Energy</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MATCHING ALGORITHM */}
        {activeTab === 'algo' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Mathematical Matching Function & Scoring</h3>
              <p className="text-xs text-slate-600 mt-1">
                Formalized scoring algorithm used by the Smart Match Engine for optimizing logistics and recovery probability.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
                <span className="text-[#0F382C] font-bold">MatchScore(L, U) = W_cat · C(L, U) + W_dist · D(L, U) + W_vol · V(L) + W_trust · T(U)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Category Compatibility C(L, U): 40% Weight</span>
                  <p className="text-slate-600">Evaluates whether recycler equipment or farm composting capability aligns with waste material category.</p>
                </div>
                <div className="bg-white p-3.5 rounded border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Proximity Penalty D(L, U): 30% Weight</span>
                  <p className="text-slate-600">Applies an exponential decay function based on physical distance (km) to minimize transport carbon emissions.</p>
                </div>
                <div className="bg-white p-3.5 rounded border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Batch Volume Feasibility V(L): 20% Weight</span>
                  <p className="text-slate-600">Compares listing quantity against the buyer's minimum processing capacity thresholds.</p>
                </div>
                <div className="bg-white p-3.5 rounded border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Verification Index T(U): 10% Weight</span>
                  <p className="text-slate-600">Incorporates platform ratings, document verification status, and historical completion rate.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. TECH STACK */}
        {activeTab === 'stack' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Production Technical Architecture</h3>
              <p className="text-xs text-slate-600 mt-1">
                Full-stack component breakdown engineered for scalability, high performance, and Vercel cloud deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px] block">Frontend Framework</span>
                <h4 className="text-sm font-bold text-slate-900">Next.js 15 (App Router)</h4>
                <p className="text-slate-600">Server-rendered React 19 architecture with seamless TypeScript static type safety.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px] block">Design System</span>
                <h4 className="text-sm font-bold text-slate-900">Tailwind CSS v4 & Lucide</h4>
                <p className="text-slate-600">Custom theme tokens, deep green palette, dark mode ready, responsive SaaS components.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px] block">Database & ORM</span>
                <h4 className="text-sm font-bold text-slate-900">PostgreSQL + Prisma ORM</h4>
                <p className="text-slate-600">Relational schema with 15 normalized models covering users, listings, bids, claims, pickups & messaging.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px] block">Analytics & Charts</span>
                <h4 className="text-sm font-bold text-slate-900">Recharts Visualization</h4>
                <p className="text-slate-600">Dynamic waste category distribution, recovery trends, and platform KPIs.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px] block">Matching & AI Ready</span>
                <h4 className="text-sm font-bold text-slate-900">Rule-Based Match Engine</h4>
                <p className="text-slate-600">Structured modular design allowing plug-and-play TensorFlow / PyTorch ML model integration.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px] block">Deployment Readiness</span>
                <h4 className="text-sm font-bold text-slate-900">Vercel & Docker Container</h4>
                <p className="text-slate-600">Environment variable support, zero hardcoded secrets, instant continuous integration.</p>
              </div>
            </div>
          </div>
        )}

        {/* 4. SDG & CIRCULAR ECONOMY */}
        {activeTab === 'sdg' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-slate-900">UN Sustainable Development Goals (SDG) Alignment</h3>
              <p className="text-xs text-slate-600 mt-1">
                Methodological framework connecting digital waste exchange with quantifiable global sustainability indicators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 space-y-2">
                <span className="text-xs font-black text-amber-700 block">SDG 11: Sustainable Cities</span>
                <p className="text-slate-700 leading-relaxed">
                  Reduces urban municipal waste pressure by establishing direct local business-to-business recovery pipelines.
                </p>
              </div>

              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 space-y-2">
                <span className="text-xs font-black text-emerald-800 block">SDG 12: Responsible Consumption</span>
                <p className="text-slate-700 leading-relaxed">
                  Diverts electronic scrap and organic food waste from landfills into closed-loop industrial and agricultural recycling.
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 space-y-2">
                <span className="text-xs font-black text-blue-800 block">SDG 13: Climate Action</span>
                <p className="text-slate-700 leading-relaxed">
                  Mitigates methane emissions from decomposing organic waste in landfills and reduces greenhouse gases from virgin metal mining.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. BUSINESS MODEL CANVAS */}
        {activeTab === 'bmc' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Commercial Business Model Canvas</h3>
              <p className="text-xs text-slate-600 mt-1">
                Startup monetization strategy and revenue channels for long-term platform self-sustainability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-1">
                <span className="font-bold text-[#0F382C] block">1. Transaction Fee</span>
                <p className="text-slate-600 text-[11px]">2.5% to 5% commission fee on successful high-value E-Waste auction settlements.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-1">
                <span className="font-bold text-[#0F382C] block">2. Verified Subscriptions</span>
                <p className="text-slate-600 text-[11px]">Monthly SaaS tier for bulk corporate waste producers and certified recycling plants.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-1">
                <span className="font-bold text-[#0F382C] block">3. Listing Promotion</span>
                <p className="text-slate-600 text-[11px]">Featured priority placement in search results for rapid organic waste pickup.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-1">
                <span className="font-bold text-[#0F382C] block">4. Analytics Reports</span>
                <p className="text-slate-600 text-[11px]">ESG sustainability compliance reporting provided to corporate enterprise clients.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
