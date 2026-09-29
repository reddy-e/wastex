'use client';

import React from 'react';
import { useAppState } from '@/lib/store';
import { calculateSmartMatches } from '@/lib/match-engine';
import { SmartMatchCard } from '@/components/smart-match-card';
import { Zap, Sparkles } from 'lucide-react';

export default function MatchesPage() {
  const { listings, users } = useAppState();

  // Aggregate matches across listings
  const allMatches = listings.flatMap((l) => calculateSmartMatches(l, users));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Zap className="w-3.5 h-3.5 fill-current text-emerald-600" />
          <span>Rule-Based Match Engine v1.0</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Recommended Smart Matches</h1>
        <p className="text-xs text-slate-600">
          Optimal compatibility scores calculated across proximity, waste category capabilities, batch volume thresholds, and supplier trust verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allMatches.map((match, idx) => (
          <SmartMatchCard key={idx} match={match} />
        ))}
      </div>

    </div>
  );
}
