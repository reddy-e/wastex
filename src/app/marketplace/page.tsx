'use client';

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { ListingCard } from '@/components/listing-card';
import { WasteCategoryType, WasteListing } from '@/lib/types';
import { Search, Filter, Cpu, Leaf, SlidersHorizontal, CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function MarketplacePage() {
  const { listings, currentUser, addBid, addClaim } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WasteCategoryType | 'ALL'>('ALL');
  const [selectedCondition, setSelectedCondition] = useState<string>('ALL');
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'distance' | 'newest' | 'price'>('distance');

  // Modal state
  const [activeBidListing, setActiveBidListing] = useState<WasteListing | null>(null);
  const [bidAmount, setBidAmount] = useState<string>('');
  const [bidNotes, setBidNotes] = useState<string>('');
  const [bidSuccess, setBidSuccess] = useState<boolean>(false);

  const [activeClaimListing, setActiveClaimListing] = useState<WasteListing | null>(null);
  const [claimUse, setClaimUse] = useState<string>('Composting');
  const [claimNotes, setClaimNotes] = useState<string>('');
  const [claimSuccess, setClaimSuccess] = useState<boolean>(false);

  // Filter listings
  const filteredListings = listings
    .filter((listing) => {
      // Category filter
      if (selectedCategory !== 'ALL' && listing.type !== selectedCategory) return false;
      // Search query
      if (
        searchQuery &&
        !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !listing.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !listing.city.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Verified filter
      if (onlyVerified && listing.producerVerification !== 'VERIFIED') return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'price') return (b.expectedPrice || 0) - (a.expectedPrice || 0);
      return 0;
    });

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBidListing || !bidAmount) return;
    addBid(activeBidListing.id, parseFloat(bidAmount), bidNotes);
    setBidSuccess(true);
    setTimeout(() => {
      setBidSuccess(false);
      setActiveBidListing(null);
      setBidAmount('');
      setBidNotes('');
    }, 1500);
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeClaimListing) return;
    addClaim(activeClaimListing.id, claimUse, claimNotes);
    setClaimSuccess(true);
    setTimeout(() => {
      setClaimSuccess(false);
      setActiveClaimListing(null);
      setClaimNotes('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Smart Waste Exchange Marketplace</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Browse verified e-waste scrap batches and organic waste listings for recycling, composting, and industrial recovery.
        </p>
      </div>

      {/* Controls Bar: Search & Quick Tabs */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by keyword, material, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-[#0F382C] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories ({listings.length})
            </button>
            <button
              onClick={() => setSelectedCategory('E_WASTE')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'E_WASTE'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>E-Waste</span>
            </button>
            <button
              onClick={() => setSelectedCategory('ORGANIC_WASTE')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'ORGANIC_WASTE'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Organic Waste</span>
            </button>
          </div>
        </div>

        {/* Secondary Filters Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>Verified Suppliers Only</span>
            </label>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-slate-500 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="distance">Proximity (Nearest First)</option>
              <option value="newest">Newest Listed</option>
              <option value="price">Highest Value</option>
            </select>
          </div>

        </div>

      </div>

      {/* Listings Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onBidClick={(l) => {
                setActiveBidListing(l);
                setBidAmount(l.expectedPrice ? l.expectedPrice.toString() : '5000');
              }}
              onClaimClick={(l) => {
                setActiveClaimListing(l);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No matching waste listings found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or category filter to view available materials.
          </p>
        </div>
      )}

      {/* BID / PURCHASE MODAL */}
      {activeBidListing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setActiveBidListing(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">E-Waste Bid Submission</span>
              <h3 className="text-lg font-bold text-slate-900">{activeBidListing.title}</h3>
              <p className="text-xs text-slate-500">Offered by: {activeBidListing.producerName}</p>
            </div>

            {bidSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center space-y-2 border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
                <p className="text-sm font-bold">Bid Placed Successfully!</p>
                <p className="text-xs text-emerald-700">The supplier has been notified of your offer.</p>
              </div>
            ) : (
              <form onSubmit={handleBidSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Offer Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                  />
                  <span className="text-[10px] text-slate-400">Suggested guide price: ₹{activeBidListing.expectedPrice?.toLocaleString()}</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Notes / Logistics Proposal</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Pickup timeline, recycling license details..."
                    value={bidNotes}
                    onChange={(e) => setBidNotes(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow"
                >
                  Submit Official Bid
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CLAIM ORGANIC WASTE MODAL */}
      {activeClaimListing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setActiveClaimListing(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Organic Waste Claim</span>
              <h3 className="text-lg font-bold text-slate-900">{activeClaimListing.title}</h3>
              <p className="text-xs text-slate-500">Supplier: {activeClaimListing.producerName}</p>
            </div>

            {claimSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center space-y-2 border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
                <p className="text-sm font-bold">Material Claim Submitted!</p>
                <p className="text-xs text-emerald-700">The supplier will confirm your pickup slot.</p>
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Intended Productive Use</label>
                  <select
                    value={claimUse}
                    onChange={(e) => setClaimUse(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
                  >
                    <option value="Composting">Farm Vermicomposting</option>
                    <option value="Biogas">Anaerobic Biogas Digestor</option>
                    <option value="Agricultural Soil Conditioning">Soil Structure Conditioning</option>
                    <option value="Industrial Recovery">Industrial Organic Processing</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Collection Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Specify transport vehicle type and requested pickup hour..."
                    value={claimNotes}
                    onChange={(e) => setClaimNotes(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div className="p-3 bg-amber-50 rounded-lg text-[11px] text-amber-800 border border-amber-200">
                  <span className="font-bold">Safety Compliance:</span> I confirm this material will be processed according to verified organic safety guidelines.
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow"
                >
                  Confirm Claim & Schedule Pickup
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
