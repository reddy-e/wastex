'use client';

import React from 'react';
import Link from 'next/link';
import { useAppState } from '@/lib/store';
import { ListingCard } from '@/components/listing-card';
import { SmartMatchCard } from '@/components/smart-match-card';
import { AIClassifier } from '@/components/ai-classifier';
import { calculateSmartMatches } from '@/lib/match-engine';
import { 
  ArrowRight, 
  Cpu, 
  Leaf, 
  Recycle, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Sparkles,
  GraduationCap,
  Building2,
  Factory,
  Sprout
} from 'lucide-react';

export default function LandingPage() {
  const { listings, users } = useAppState();

  const eWasteListings = listings.filter((l) => l.type === 'E_WASTE').slice(0, 3);
  const organicListings = listings.filter((l) => l.type === 'ORGANIC_WASTE').slice(0, 3);

  // Generate sample smart matches
  const sampleMatches = calculateSmartMatches(listings[0], users).slice(0, 2);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#0F382C] via-[#134637] to-[#0A261E] text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="relative max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Smart Circular Economy Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Turn Waste Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">Value.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              A smart digital marketplace connecting waste producers with recyclers, industries, farmers, and communities for productive reuse and responsible recovery.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/marketplace"
                className="px-6 py-3.5 rounded-xl bg-[#10B981] hover:bg-[#0ea572] text-[#0F382C] font-extrabold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>Explore Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/listings/create"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all hover:-translate-y-0.5"
              >
                List Your Waste
              </Link>
            </div>
          </div>

          {/* Conceptual Flow Diagram */}
          <div className="bg-slate-950/60 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-6 md:p-8 max-w-5xl mx-auto shadow-2xl">
            <div className="text-center text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">
              Intelligent Closed-Loop Ecosystem Flow
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/80">
                <div className="w-10 h-10 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center font-bold mb-2">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-white">Waste Producer</span>
                <span className="text-[10px] text-slate-400 mt-1">IT Offices, Hotels, Markets</span>
              </div>

              <div className="hidden lg:flex justify-center text-emerald-400 font-bold">➔</div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-blue-950/80 border border-blue-800/80">
                <div className="w-10 h-10 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center font-bold mb-2">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-white">Smart Matching</span>
                <span className="text-[10px] text-slate-400 mt-1">Proximity & Requirements</span>
              </div>

              <div className="hidden lg:flex justify-center text-emerald-400 font-bold">➔</div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-amber-950/80 border border-amber-800/80">
                <div className="w-10 h-10 rounded-full bg-amber-900 text-amber-300 flex items-center justify-center font-bold mb-2">
                  <Factory className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-white">Recycler / Farmer</span>
                <span className="text-[10px] text-slate-400 mt-1">Certified Bidders & Claimants</span>
              </div>

              <div className="hidden lg:flex justify-center text-emerald-400 font-bold">➔</div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-purple-950/80 border border-purple-800/80">
                <div className="w-10 h-10 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center font-bold mb-2">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-white">Pickup Logistics</span>
                <span className="text-[10px] text-slate-400 mt-1">Tracked Collection Slot</span>
              </div>

              <div className="hidden lg:flex justify-center text-emerald-400 font-bold">➔</div>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-teal-950/80 border border-teal-800/80">
                <div className="w-10 h-10 rounded-full bg-teal-900 text-teal-300 flex items-center justify-center font-bold mb-2">
                  <Recycle className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-white">Reuse & Recovery</span>
                <span className="text-[10px] text-slate-400 mt-1">Urban Mining & Composting</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. IMPACT STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Platform Recovery Impact Metrics</h2>
              <p className="text-xs text-slate-500">Real-time aggregated circular economy exchange statistics</p>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded">
              Demo System Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-2xl font-black text-[#0F382C]">48,500+</span>
              <span className="text-[11px] font-bold text-slate-500 block uppercase mt-1">Waste Listed (kg)</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-2xl font-black text-emerald-600">42,100+</span>
              <span className="text-[11px] font-bold text-slate-500 block uppercase mt-1">Waste Recovered (kg)</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-2xl font-black text-blue-600">480+</span>
              <span className="text-[11px] font-bold text-slate-500 block uppercase mt-1">Exchanges Done</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-2xl font-black text-slate-800">1,250+</span>
              <span className="text-[11px] font-bold text-slate-500 block uppercase mt-1">Active Users</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-2xl font-black text-amber-600">85+</span>
              <span className="text-[11px] font-bold text-slate-500 block uppercase mt-1">Recycling Partners</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-2xl font-black text-purple-600">32+</span>
              <span className="text-[11px] font-bold text-slate-500 block uppercase mt-1">Communities</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">Simple & Verified Process</span>
          <h2 className="text-3xl font-extrabold text-slate-900">How Smart Waste Exchange Works</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            A 5-step digital lifecycle ensuring raw materials move efficiently from producers to productive users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'List Your Waste',
              desc: 'Specify material type, quantity, condition, location, and collection preferences.',
              icon: <Building2 className="w-5 h-5 text-emerald-600" />,
            },
            {
              step: '02',
              title: 'Smart Matching',
              desc: 'Platform identifies optimal recyclers or farmers based on distance and material specifications.',
              icon: <Zap className="w-5 h-5 text-blue-600" />,
            },
            {
              step: '03',
              title: 'Connect & Deal',
              desc: 'Buyers place competitive bids (E-Waste) or submit usage claims (Organic Waste).',
              icon: <CheckCircle2 className="w-5 h-5 text-amber-600" />,
            },
            {
              step: '04',
              title: 'Schedule Pickup',
              desc: 'Coordinate exact transport date, time slot, and loading details via interactive tracker.',
              icon: <Truck className="w-5 h-5 text-purple-600" />,
            },
            {
              step: '05',
              title: 'Reuse & Recover',
              desc: 'Material enters recycling, urban mining, vermicomposting, or biogas conversion.',
              icon: <Recycle className="w-5 h-5 text-teal-600" />,
            },
          ].map((item) => (
            <div key={item.step} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 relative">
              <span className="text-2xl font-black text-slate-200 block">{item.step}</span>
              <div className="p-2.5 rounded-lg bg-slate-50 w-fit border border-slate-100">{item.icon}</div>
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TWO MAIN MARKETPLACE CATEGORIES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">Marketplace Categories</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Explore Active Listings</h2>
          </div>
          <Link href="/marketplace" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
            <span>View All Listings ({listings.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* E-Waste Spotlight */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Electronic Waste (E-Waste)</h3>
            <span className="text-xs text-slate-500 ml-auto">Computers, Laptops, Motherboards, Cables</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eWasteListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>

        {/* Organic Waste Spotlight */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">Organic & Vegetable Waste</h3>
            <span className="text-xs text-slate-500 ml-auto">Composting, Biogas & Agricultural Enrichment</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {organicListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SMART MATCH ENGINE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 border border-emerald-500/30 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Smart Match Engine</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Intelligent Buyer-Supplier Matching</h2>
              <p className="text-xs text-slate-300 max-w-xl mt-1">
                Automated rule-based algorithm evaluating proximity, quantity compatibility, availability windows, and verified recovery capabilities.
              </p>
            </div>
            <Link
              href="/matches"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0F382C] font-extrabold text-xs shadow transition-all self-start md:self-auto"
            >
              Test Match Engine
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {sampleMatches.map((match, idx) => (
              <SmartMatchCard key={idx} match={match} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI CLASSIFIER WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AIClassifier />
      </section>

      {/* 7. RESEARCH & ACADEMIC DEMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-[#0F382C] text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/30 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl border border-white/20 text-emerald-300">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">B.Tech Final Year & Research Paper Presentation</h3>
              <p className="text-xs text-emerald-200 mt-1 max-w-xl">
                Explore complete system architecture, mathematical matching formula, technology stack, and UN SDG alignment metrics.
              </p>
            </div>
          </div>
          <Link
            href="/research-demo"
            className="px-6 py-3 rounded-xl bg-white text-[#0F382C] font-extrabold text-xs hover:bg-emerald-50 transition-all shadow shrink-0"
          >
            Open Academic Demo Mode
          </Link>
        </div>
      </section>

    </div>
  );
}
