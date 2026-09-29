'use client';

import React from 'react';
import Link from 'next/link';
import { SmartMatchResult } from '@/lib/types';
import { Sparkles, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface SmartMatchCardProps {
  match: SmartMatchResult;
  onConnectClick?: (match: SmartMatchResult) => void;
}

export function SmartMatchCard({ match, onConnectClick }: SmartMatchCardProps) {
  const { listing, matchScore, matchedUser, distanceKm, reasons } = match;

  // Determine score color badge
  const scoreColor =
    matchScore >= 90
      ? 'bg-emerald-600 text-white border-emerald-500'
      : matchScore >= 80
      ? 'bg-blue-600 text-white border-blue-500'
      : 'bg-amber-600 text-white border-amber-500';

  return (
    <div className="bg-white rounded-xl border border-emerald-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden flex flex-col justify-between">
      {/* Top Match Score Pill */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-black border shadow-sm flex items-center gap-1.5 ${scoreColor}`}>
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{matchScore}% MATCH SCORE</span>
          </div>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{distanceKm} km away</span>
          </span>
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
          {listing.type === 'E_WASTE' ? 'E-WASTE MATCH' : 'ORGANIC MATCH'}
        </span>
      </div>

      {/* Listing details */}
      <div className="space-y-2 mb-4">
        <h4 className="text-base font-bold text-slate-900 line-clamp-1">
          {listing.title}
        </h4>
        <p className="text-xs text-slate-600 line-clamp-2">
          {listing.description}
        </p>

        {/* Reasons breakdown list */}
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1.5 my-3">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
            Smart Engine Logic Match Criteria
          </span>
          {reasons.map((reason, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer & Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="text-xs">
          <span className="text-slate-400 text-[10px] block font-semibold uppercase">Interested Party</span>
          <span className="font-bold text-slate-800">{matchedUser}</span>
        </div>

        <Link
          href={`/listings/${listing.id}`}
          className="px-4 py-2 rounded-lg bg-[#0F382C] hover:bg-[#154a3b] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
        >
          <span>Connect & View</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
        </Link>
      </div>
    </div>
  );
}
