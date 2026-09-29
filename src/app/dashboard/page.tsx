'use client';

import React from 'react';
import Link from 'next/link';
import { useAppState } from '@/lib/store';
import { ListingCard } from '@/components/listing-card';
import { PickupTracker } from '@/components/pickup-tracker';
import { SmartMatchCard } from '@/components/smart-match-card';
import { calculateSmartMatches } from '@/lib/match-engine';
import { 
  Building2, 
  Factory, 
  Sprout, 
  ShieldCheck, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  PlusCircle,
  Bell,
  MessageSquare,
  TrendingUp,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function UserDashboardPage() {
  const { currentUser, listings, bids, claims, pickups, notifications, updatePickupStatus, users } = useAppState();

  const isProducer = currentUser.role === 'WASTE_PRODUCER';
  const isRecycler = currentUser.role === 'RECYCLER_INDUSTRY';
  const isFarmer = currentUser.role === 'FARMER_ORGANIC_USER';

  // User specific items
  const userListings = listings.filter((l) => l.producerId === currentUser.id);
  const userPickups = pickups.filter(
    (p) => p.producerId === currentUser.id || p.collectorId === currentUser.id
  );
  const userNotifications = notifications.filter((n) => n.userId === currentUser.id).slice(0, 4);

  // Recommendations
  const sampleMatches = calculateSmartMatches(listings[0], users).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Role Header Banner */}
      <div className="bg-gradient-to-r from-[#0F382C] via-emerald-900 to-slate-900 text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-500/30 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            {isProducer && <Building2 className="w-7 h-7" />}
            {isRecycler && <Factory className="w-7 h-7" />}
            {isFarmer && <Sprout className="w-7 h-7" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                {currentUser.role.replace('_', ' ')} DASHBOARD
              </span>
              {currentUser.verificationBadge && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentUser.verificationBadge}</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">Welcome back, {currentUser.name}</h1>
            <p className="text-xs text-slate-300 mt-0.5">{currentUser.organization || currentUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isProducer && (
            <Link
              href="/listings/create"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0F382C] text-xs font-bold transition-all shadow flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Waste Listing</span>
            </Link>
          )}
          <Link
            href="/matches"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-md transition-all flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Recommended Matches</span>
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs font-semibold">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Active Listings</span>
          <span className="text-2xl font-black text-slate-900">{userListings.length}</span>
          <span className="text-[10px] text-emerald-600 font-bold block">Market Visible</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Pending Bids / Claims</span>
          <span className="text-2xl font-black text-blue-600">{bids.length + claims.length}</span>
          <span className="text-[10px] text-blue-600 font-bold block">Offers Active</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Scheduled Pickups</span>
          <span className="text-2xl font-black text-purple-600">{userPickups.length}</span>
          <span className="text-[10px] text-purple-600 font-bold block">Logistics Active</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Completed Exchanges</span>
          <span className="text-2xl font-black text-emerald-600">{currentUser.completedExchangesCount}</span>
          <span className="text-[10px] text-emerald-600 font-bold block">Recovered Items</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1 col-span-2 md:col-span-1">
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Trust Rating</span>
          <span className="text-2xl font-black text-amber-500">★ {currentUser.rating.toFixed(1)}</span>
          <span className="text-[10px] text-slate-500 block">Verified Profile</span>
        </div>
      </div>

      {/* Main Grid: Active Pickups & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Scheduled Pickups & Active Listings */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Pickups */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Active Logistics & Pickup Tracking</h3>
                <p className="text-xs text-slate-500">Step-by-step progress tracking for scheduled waste collection</p>
              </div>
              <Link href="/pickups" className="text-xs font-bold text-emerald-700 hover:text-emerald-800">
                View All Pickups ({pickups.length})
              </Link>
            </div>

            {userPickups.length > 0 ? (
              <div className="space-y-4">
                {userPickups.map((p) => (
                  <PickupTracker
                    key={p.id}
                    pickup={p}
                    onStatusChange={(id, status) => updatePickupStatus(id, status)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                No active pickups scheduled. Explore marketplace listings to connect.
              </div>
            )}
          </div>

          {/* User's My Listings */}
          {isProducer && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Your Active Waste Listings</h3>
                <Link href="/listings/create" className="text-xs font-bold text-emerald-700 hover:text-emerald-800">
                  + Add New Listing
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userListings.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Notifications & Smart Insights */}
        <div className="space-y-6">
          
          {/* Notifications Panel */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Recent Notifications</h3>
              </div>
              <Link href="/notifications" className="text-[11px] font-bold text-slate-500 hover:text-slate-800">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {userNotifications.map((n) => (
                <Link
                  key={n.id}
                  href={n.link || '/notifications'}
                  className="block p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{n.title}</span>
                    <span className="text-[9px] text-slate-400">Just now</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{n.message}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Smart AI Recommendations Panel */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Smart Match Recommendations</h3>
            </div>
            <div className="space-y-3">
              {sampleMatches.map((m, idx) => (
                <div key={idx} className="bg-slate-800 p-3 rounded-lg space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-400">{m.matchScore}% Match Index</span>
                    <span className="text-[10px] text-slate-400">{m.distanceKm} km away</span>
                  </div>
                  <p className="text-slate-300 line-clamp-1">{m.listing.title}</p>
                  <Link
                    href={`/listings/${m.listing.id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 hover:text-white"
                  >
                    <span>Connect & Bid</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
