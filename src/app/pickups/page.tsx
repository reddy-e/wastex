'use client';

import React from 'react';
import { useAppState } from '@/lib/store';
import { PickupTracker } from '@/components/pickup-tracker';
import { Truck } from 'lucide-react';

export default function PickupsPage() {
  const { pickups, updatePickupStatus } = useAppState();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
          <Truck className="w-3.5 h-3.5 text-purple-600" />
          <span>Collection & Transport Logistics</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Pickup Scheduling & Tracking</h1>
        <p className="text-xs text-slate-600">
          Track collection transport progress across the 5-stage lifecycle: Requested → Confirmed → Scheduled → Picked Up → Completed.
        </p>
      </div>

      <div className="space-y-6">
        {pickups.map((p) => (
          <PickupTracker
            key={p.id}
            pickup={p}
            onStatusChange={(id, status) => updatePickupStatus(id, status)}
          />
        ))}
      </div>
    </div>
  );
}
