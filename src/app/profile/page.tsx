'use client';

import React from 'react';
import { useAppState } from '@/lib/store';
import { ShieldCheck, MapPin, Phone, Mail, Award, Star, Building2 } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser } = useAppState();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-2xl border-2 border-emerald-400 overflow-hidden shrink-0">
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              currentUser.name.charAt(0)
            )}
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{currentUser.verificationBadge || 'Verified User'}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">{currentUser.name}</h1>
            <p className="text-xs text-slate-500">{currentUser.organization || currentUser.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{currentUser.address}, {currentUser.city}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{currentUser.phone || '+91 98765 43210'}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{currentUser.email}</span>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">Ratings & Partner Feedback</h3>
          <span className="text-amber-600 font-extrabold text-sm flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            <span>{currentUser.rating.toFixed(1)} / 5.0 (48 Reviews)</span>
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
            <div className="flex justify-between font-bold text-slate-800">
              <span>GreenCycle Recyclers</span>
              <span className="text-amber-500">★★★★★ 5.0</span>
            </div>
            <p className="text-slate-600">Prompt loading dock access and accurate component inventory documentation.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
            <div className="flex justify-between font-bold text-slate-800">
              <span>Rameshwar Organic Farming</span>
              <span className="text-amber-500">★★★★★ 5.0</span>
            </div>
            <p className="text-slate-600">Extremely clean source segregation. No plastic contamination in vegetable waste batch.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
