'use client';

import React from 'react';
import Link from 'next/link';
import { WasteListing } from '@/lib/types';
import { 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Tag, 
  Cpu, 
  Leaf, 
  Sparkles, 
  ArrowRight, 
  DollarSign, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';

interface ListingCardProps {
  listing: WasteListing;
  onBidClick?: (listing: WasteListing) => void;
  onClaimClick?: (listing: WasteListing) => void;
}

export function ListingCard({ listing, onBidClick, onClaimClick }: ListingCardProps) {
  const isEWaste = listing.type === 'E_WASTE';

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group hover:-translate-y-1">
      
      {/* Listing Image Container */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={listing.images[0] || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80'}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
              isEWaste
                ? 'bg-blue-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {isEWaste ? <Cpu className="w-3.5 h-3.5" /> : <Leaf className="w-3.5 h-3.5" />}
            {isEWaste ? 'E-WASTE' : 'ORGANIC WASTE'}
          </span>
        </div>

        {/* Price / Free Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${
              listing.isFree
                ? 'bg-amber-500 text-white'
                : 'bg-[#0F382C] text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {listing.isFree ? 'FREE EXCHANGE' : `₹${listing.expectedPrice?.toLocaleString()}`}
          </span>
        </div>

        {/* Distance Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
          <MapPin className="w-3 h-3 text-emerald-400" />
          <span>{listing.distanceKm} km away</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Seller & Verification Badge */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 truncate max-w-[65%]">
              {listing.producerName}
            </span>
            {listing.producerBadge && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>{listing.producerBadge}</span>
              </span>
            )}
          </div>

          {/* Listing Title */}
          <Link href={`/listings/${listing.id}`}>
            <h3 className="text-base font-bold text-slate-900 line-clamp-2 hover:text-emerald-700 transition-colors">
              {listing.title}
            </h3>
          </Link>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <div className="bg-slate-50 p-2 rounded border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Quantity</span>
              <span className="font-bold text-slate-800">{listing.quantity} {listing.unit}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Condition</span>
              <span className="font-semibold text-slate-800 truncate block">{listing.condition}</span>
            </div>
          </div>

          {/* Organic specific safety usage tag */}
          {!isEWaste && listing.suitableUse && (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded border border-emerald-200/80">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Suitable for: <strong className="font-bold">{listing.suitableUse}</strong></span>
            </div>
          )}
        </div>

        {/* Location & Action Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="text-xs text-slate-500 flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{listing.area}, {listing.city}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/listings/${listing.id}`}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Details
            </Link>

            {isEWaste ? (
              <button
                onClick={() => onBidClick ? onBidClick(listing) : null}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>Bid / Buy</span>
              </button>
            ) : (
              <button
                onClick={() => onClaimClick ? onClaimClick(listing) : null}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>Claim</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
