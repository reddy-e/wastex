'use client';

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { ListingCard } from '@/components/listing-card';
import { Cpu, ShieldCheck, Zap, ArrowRight, Layers, DollarSign, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function EWastePage() {
  const { listings } = useAppState();
  const eWasteListings = listings.filter((l) => l.type === 'E_WASTE');

  const categories = [
    { title: 'Server Motherboards', count: '12 Listings', desc: 'High-grade PCBs with precious metal traces' },
    { title: 'Laptops & Screens', count: '18 Listings', desc: 'Working displays, RAM, heatsinks & batteries' },
    { title: 'Power Supplies & Cables', count: '24 Listings', desc: 'Copper wiring, transformers & SMPS units' },
    { title: 'Smartphones & Components', count: '15 Listings', desc: 'Display assemblies & IC chips' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-[#0F382C] text-white p-8 md:p-12 rounded-3xl space-y-6 relative overflow-hidden border border-blue-500/30">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Certified Electronic Waste Marketplace</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            E-Waste Recycling & Urban Mining Hub
          </h1>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Connect corporate IT departments and electronic waste producers with authorized recyclers, refurbishers, and component extractors.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/listings/create"
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow"
            >
              List Commercial E-Waste
            </Link>
            <Link
              href="/matches"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-md transition-all"
            >
              Match Engine
            </Link>
          </div>
        </div>
      </div>

      {/* Subcategory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">{cat.title}</h3>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{cat.count}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{cat.desc}</p>
          </div>
        ))}
      </div>

      {/* Active Listings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Available E-Waste Batches</h2>
            <p className="text-xs text-slate-500">Biddable lots from corporate IT & industrial producers</p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {eWasteListings.length} Batches Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eWasteListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>

    </div>
  );
}
