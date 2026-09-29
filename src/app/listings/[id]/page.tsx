'use client';

import React, { useState, use } from 'react';
import { useAppState } from '@/lib/store';
import { calculateSmartMatches } from '@/lib/match-engine';
import { SmartMatchCard } from '@/components/smart-match-card';
import { 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Cpu, 
  Leaf, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Calendar,
  Building2,
  DollarSign,
  Zap,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { listings, users, currentUser, addBid, addClaim, schedulePickup } = useAppState();

  const listing = listings.find((l) => l.id === resolvedParams.id) || listings[0];
  const isEWaste = listing.type === 'E_WASTE';

  // State for interactive modals/actions
  const [bidAmount, setBidAmount] = useState<string>(listing.expectedPrice ? listing.expectedPrice.toString() : '15000');
  const [bidNotes, setBidNotes] = useState<string>('');
  const [bidSubmitted, setBidSubmitted] = useState<boolean>(false);

  const [claimUse, setClaimUse] = useState<string>('Composting');
  const [claimNotes, setClaimNotes] = useState<string>('');
  const [claimSubmitted, setClaimSubmitted] = useState<boolean>(false);

  // Pickup scheduling state
  const [showPickupForm, setShowPickupForm] = useState<boolean>(false);
  const [pickupDate, setPickupDate] = useState<string>('2026-09-06');
  const [pickupSlot, setPickupSlot] = useState<string>('10:00 AM - 12:00 PM');
  const [contactPerson, setContactPerson] = useState<string>(currentUser.name);
  const [contactPhone, setContactPhone] = useState<string>('+91 98765 43210');
  const [pickupSubmitted, setPickupSubmitted] = useState<boolean>(false);

  const matches = calculateSmartMatches(listing, users).slice(0, 2);

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    addBid(listing.id, parseFloat(bidAmount) || 0, bidNotes);
    setBidSubmitted(true);
  };

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    addClaim(listing.id, claimUse, claimNotes);
    setClaimSubmitted(true);
  };

  const handleSchedulePickup = (e: React.FormEvent) => {
    e.preventDefault();
    schedulePickup({
      listingId: listing.id,
      listingTitle: listing.title,
      wasteType: listing.type,
      producerId: listing.producerId,
      producerName: listing.producerName,
      collectorId: currentUser.id,
      collectorName: currentUser.name,
      scheduledDate: pickupDate,
      timeSlot: pickupSlot,
      pickupAddress: listing.address,
      contactPerson,
      contactPhone,
    });
    setPickupSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <Link href="/marketplace" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Marketplace</span>
      </Link>

      {/* Main Listing Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Images & Specs */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-6">
            <div className="h-80 md:h-96 w-full bg-slate-100 relative">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-white shadow ${
                isEWaste ? 'bg-blue-600' : 'bg-emerald-600'
              }`}>
                {isEWaste ? 'ELECTRONIC WASTE' : 'ORGANIC WASTE'}
              </span>
            </div>

            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{listing.categoryName}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{listing.distanceKm} km from your location</span>
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
                {listing.title}
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed">
                {listing.description}
              </p>

              {/* Specifications table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Quantity</span>
                  <span className="font-extrabold text-slate-900 text-sm">{listing.quantity} {listing.unit}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Condition</span>
                  <span className="font-bold text-slate-900">{listing.condition}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Source Origin</span>
                  <span className="font-bold text-slate-900">{listing.source}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Collection</span>
                  <span className="font-bold text-slate-900">{listing.preferredCollection}</span>
                </div>
              </div>

              {/* Organic Safety Callout */}
              {!isEWaste && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <span className="font-bold block">Verified Suitable Use Classification: {listing.suitableUse || 'Composting'}</span>
                  <p className="text-emerald-800 text-[11px]">Source verified clean. Contamination level: {listing.contaminationStatus || 'None'}.</p>
                </div>
              )}
            </div>
          </div>

          {/* Smart Matches for this listing */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Smart Match Recommendations</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map((m, idx) => (
                <SmartMatchCard key={idx} match={m} />
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Seller info & Action Card */}
        <div className="space-y-6">
          
          {/* Seller Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-base border border-emerald-300">
                {listing.producerName.charAt(0)}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">{listing.producerName}</h4>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{listing.producerBadge || 'Verified Supplier'}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-bold text-slate-800">{listing.area}, {listing.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rating:</span>
                <span className="font-bold text-amber-600">★ 4.9 (48 Exchanges)</span>
              </div>
            </div>
          </div>

          {/* Action Box: Bid or Claim */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Marketplace Value</span>
              <div className="text-2xl font-black text-[#0F382C]">
                {listing.isFree ? 'FREE EXCHANGE' : `₹${listing.expectedPrice?.toLocaleString()}`}
              </div>
            </div>

            {isEWaste ? (
              <div className="space-y-3">
                {bidSubmitted ? (
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center text-xs font-bold border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    Bid Submitted to Seller!
                  </div>
                ) : (
                  <form onSubmit={handleBid} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Your Bid Amount (₹)</label>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Logistics Note</label>
                      <textarea
                        rows={2}
                        value={bidNotes}
                        onChange={(e) => setBidNotes(e.target.value)}
                        placeholder="Offer pickup schedule..."
                        className="w-full p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow"
                    >
                      Place Official Bid
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {claimSubmitted ? (
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center text-xs font-bold border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    Material Claimed Successfully!
                  </div>
                ) : (
                  <form onSubmit={handleClaim} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Intended Use</label>
                      <select
                        value={claimUse}
                        onChange={(e) => setClaimUse(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
                      >
                        <option value="Composting">Vermicomposting</option>
                        <option value="Biogas">Biogas Energy</option>
                        <option value="Soil Conditioning">Soil Conditioning</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow"
                    >
                      Claim Organic Material
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Schedule Pickup CTA */}
            <div className="pt-3 border-t border-slate-100">
              {pickupSubmitted ? (
                <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-xs font-bold text-center border border-blue-200">
                  Pickup Requested! View in Pickup Tracker.
                </div>
              ) : (
                <button
                  onClick={() => setShowPickupForm(!showPickupForm)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>{showPickupForm ? 'Close Pickup Form' : 'Schedule Pickup Transport'}</span>
                </button>
              )}
            </div>

            {/* Pickup Form Accordion */}
            {showPickupForm && !pickupSubmitted && (
              <form onSubmit={handleSchedulePickup} className="p-4 bg-slate-50 rounded-xl space-y-3 text-xs border border-slate-200 animate-fadeIn">
                <span className="font-bold text-slate-900 block">Pickup Logistics Request</span>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block">Preferred Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block">Time Slot</label>
                  <select
                    value={pickupSlot}
                    onChange={(e) => setPickupSlot(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 font-medium"
                  >
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded bg-[#0F382C] text-white font-bold text-xs"
                >
                  Confirm Transport Request
                </button>
              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
