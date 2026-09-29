'use client';

import React from 'react';
import { useAppState } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { Shield, Factory, Sprout, Building2, Eye, Sparkles } from 'lucide-react';

export function RoleSwitcher() {
  const { currentUser, setCurrentRole } = useAppState();

  const roles: { role: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
    {
      role: 'WASTE_PRODUCER',
      label: 'Waste Producer',
      icon: <Building2 className="w-4 h-4" />,
      color: 'bg-emerald-600 text-white',
    },
    {
      role: 'RECYCLER_INDUSTRY',
      label: 'E-Waste Recycler',
      icon: <Factory className="w-4 h-4" />,
      color: 'bg-blue-600 text-white',
    },
    {
      role: 'FARMER_ORGANIC_USER',
      label: 'Farmer / Organic User',
      icon: <Sprout className="w-4 h-4" />,
      color: 'bg-amber-600 text-white',
    },
    {
      role: 'ADMIN',
      label: 'Administrator',
      icon: <Shield className="w-4 h-4" />,
      color: 'bg-purple-600 text-white',
    },
  ];

  return (
    <div className="bg-[#0F382C] text-white py-2 px-4 border-b border-emerald-800 text-xs shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-medium text-emerald-200">
          <Eye className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-semibold text-white">Demo Role Mode:</span>
          <span className="hidden md:inline text-emerald-300">Switch user role to test workflow perspectives</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {roles.map((r) => {
            const isActive = currentUser.role === r.role;
            return (
              <button
                key={r.role}
                onClick={() => setCurrentRole(r.role)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                  isActive
                    ? `${r.color} shadow-sm ring-2 ring-white/30 scale-105`
                    : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/80 hover:text-white'
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping ml-1" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
