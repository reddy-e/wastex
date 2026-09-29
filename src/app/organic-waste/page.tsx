'use client';

import React from 'react';
import { useAppState } from '@/lib/store';
import { ListingCard } from '@/components/listing-card';
import { Leaf, ShieldAlert, Sprout, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OrganicWastePage() {
  const { listings } = useAppState();
  const organicListings = listings.filter((l) => l.type === 'ORGANIC_WASTE');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#0F382C] via-emerald-900 to-[#0A261E] text-white p-8 md:p-12 rounded-3xl space-y-6 relative overflow-hidden border border-emerald-500/30">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Organic & Vegetable Resource Exchange</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Vegetable & Market Scrap Recovery
          </h1>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Connecting hotels, vegetable markets, and food processors directly with agricultural users, vermicomposting facilities, and anaerobic biogas operators.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/listings/create"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0F382C] text-xs font-bold transition-all shadow"
            >
              List Organic Scrap
            </Link>
            <Link
              href="/sustainability"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-md transition-all"
            >
              Compost & Biogas Impact
            </Link>
          </div>
        </div>
      </div>

      {/* Safety & Verification Requirement Callout */}
      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 text-amber-900 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-amber-800">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <h3 className="text-base font-bold">Organic Waste Safety & Verification Protocol</h3>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Important Safety Notice:</strong> Not all organic waste is suitable for animal feed. All listings on Smart Waste Exchange undergo strict source classification (Composting, Biogas Generation, Soil Structure Conditioning) and explicit contamination auditing to prevent cross-contamination.
        </p>
      </div>

      {/* Active Organic Listings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Available Organic Scrap Batches</h2>
            <p className="text-xs text-slate-500">Source-segregated vegetable peelings, overripe market produce & spent coffee</p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {organicListings.length} Free Batches Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {organicListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>

    </div>
  );
}
