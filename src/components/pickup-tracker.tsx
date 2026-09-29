'use client';

import React from 'react';
import { Pickup, PickupStatus } from '@/lib/types';
import { CheckCircle2, Clock, Truck, PackageCheck, AlertCircle } from 'lucide-react';

interface PickupTrackerProps {
  pickup: Pickup;
  onStatusChange?: (pickupId: string, newStatus: PickupStatus) => void;
}

export function PickupTracker({ pickup, onStatusChange }: PickupTrackerProps) {
  const steps: { status: PickupStatus; label: string; description: string }[] = [
    { status: 'REQUESTED', label: 'Requested', description: 'Pickup slot requested by buyer/collector' },
    { status: 'CONFIRMED', label: 'Confirmed', description: 'Producer accepted collection schedule' },
    { status: 'SCHEDULED', label: 'Scheduled', description: 'Logistics team dispatched' },
    { status: 'PICKED_UP', label: 'Picked Up', description: 'Material physically loaded at source' },
    { status: 'COMPLETED', label: 'Completed', description: 'Exchange finalized & verified' },
  ];

  const getStepIndex = (status: PickupStatus) => {
    switch (status) {
      case 'REQUESTED': return 0;
      case 'CONFIRMED': return 1;
      case 'SCHEDULED': return 2;
      case 'PICKED_UP': return 3;
      case 'COMPLETED': return 4;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(pickup.status);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#0F382C]">
            Pickup Reference #{pickup.id}
          </span>
          <h4 className="text-lg font-bold text-slate-900">{pickup.listingTitle}</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
            {pickup.status}
          </span>
        </div>
      </div>

      {/* Visual Timeline Bar */}
      <div className="relative pt-2 pb-6">
        <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-slate-100">
          <div
            style={{ width: `${(currentIndex / 4) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#0F382C] to-[#10B981] transition-all duration-500"
          />
        </div>

        <div className="grid grid-cols-5 text-center gap-1">
          {steps.map((step, idx) => {
            const isDone = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <div key={step.status} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isDone
                      ? 'bg-[#0F382C] text-white shadow'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  } ${isCurrent ? 'ring-4 ring-emerald-100 scale-110' : ''}`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> : idx + 1}
                </div>
                <span className={`text-xs font-semibold mt-2 ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step.label}
                </span>
                <span className="text-[10px] text-slate-400 hidden md:block max-w-[90px] line-clamp-1 mt-0.5">
                  {step.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-lg text-xs border border-slate-100">
        <div>
          <span className="text-slate-400 block font-semibold">Scheduled Window</span>
          <span className="font-bold text-slate-800">{pickup.scheduledDate} ({pickup.timeSlot})</span>
        </div>
        <div>
          <span className="text-slate-400 block font-semibold">Producer / Address</span>
          <span className="font-semibold text-slate-800">{pickup.producerName} — {pickup.pickupAddress}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-semibold">Contact</span>
          <span className="font-semibold text-slate-800">{pickup.contactPerson} ({pickup.contactPhone})</span>
        </div>
      </div>

      {/* Interactive Status Transition Controls */}
      {onStatusChange && currentIndex < 4 && (
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium mr-2">Advance Logistics Status:</span>
          {currentIndex === 0 && (
            <button
              onClick={() => onStatusChange(pickup.id, 'CONFIRMED')}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
            >
              Confirm Pickup
            </button>
          )}
          {currentIndex === 1 && (
            <button
              onClick={() => onStatusChange(pickup.id, 'SCHEDULED')}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
            >
              Schedule Logistics
            </button>
          )}
          {currentIndex === 2 && (
            <button
              onClick={() => onStatusChange(pickup.id, 'PICKED_UP')}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all"
            >
              Mark Picked Up
            </button>
          )}
          {currentIndex === 3 && (
            <button
              onClick={() => onStatusChange(pickup.id, 'COMPLETED')}
              className="px-3 py-1.5 rounded-lg bg-[#0F382C] hover:bg-[#154a3b] text-white text-xs font-bold transition-all"
            >
              Complete Exchange
            </button>
          )}
        </div>
      )}
    </div>
  );
}
