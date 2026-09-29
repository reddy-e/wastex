'use client';

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { 
  Shield, 
  Users, 
  Package, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3, 
  TrendingUp, 
  Check, 
  X,
  Filter,
  FileCheck,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';

export default function AdminDashboardPage() {
  const { users, listings, pickups, verifyUser } = useAppState();

  const [activeTab, setActiveTab] = useState<'kpis' | 'users' | 'verifications' | 'reports'>('kpis');

  // Chart Mock Datasets
  const categoryData = [
    { name: 'E-Waste (Scrap PCBs & Tech)', value: 65, color: '#3B82F6' },
    { name: 'Organic (Market & Food)', value: 85, color: '#10B981' },
  ];

  const monthlyRecoveryData = [
    { month: 'Apr', ewaste: 3400, organic: 8200 },
    { month: 'May', ewaste: 4200, organic: 9800 },
    { month: 'Jun', ewaste: 5100, organic: 11200 },
    { month: 'Jul', ewaste: 6800, organic: 12500 },
    { month: 'Aug', ewaste: 7900, organic: 14800 },
    { month: 'Sep', ewaste: 9500, organic: 16500 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-[#0F382C] text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-purple-500/30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-purple-300">
              <span>Platform Control Console</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">Administrator Dashboard</h1>
          </div>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-white/10 text-xs font-semibold">
          {[
            { id: 'kpis', label: 'Analytics & KPIs' },
            { id: 'verifications', label: 'Verifications' },
            { id: 'users', label: 'User Directory' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === t.id ? 'bg-purple-600 text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-xs font-semibold">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Users</span>
          <span className="text-xl font-black text-slate-900">{users.length + 1240}</span>
          <span className="text-[9px] text-emerald-600 font-bold block">+14% this month</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Active Listings</span>
          <span className="text-xl font-black text-[#0F382C]">{listings.length + 42}</span>
          <span className="text-[9px] text-emerald-600 font-bold block">Live on Exchange</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Completed Exchanges</span>
          <span className="text-xl font-black text-blue-600">482</span>
          <span className="text-[9px] text-blue-600 font-bold block">Verified Handled</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Waste Recovered</span>
          <span className="text-xl font-black text-emerald-600">42.1 Tons</span>
          <span className="text-[9px] text-emerald-600 font-bold block">Recycled / Composted</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Pending Verify</span>
          <span className="text-xl font-black text-amber-600">3 Requests</span>
          <span className="text-[9px] text-amber-600 font-bold block">Requires Audit</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Reported Items</span>
          <span className="text-xl font-black text-red-600">0 Items</span>
          <span className="text-[9px] text-emerald-600 font-bold block">Clean Status</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">System Health</span>
          <span className="text-xl font-black text-purple-600">99.9%</span>
          <span className="text-[9px] text-purple-600 font-bold block">Vercel Ready</span>
        </div>
      </div>

      {/* ANALYTICS & CHARTS TAB */}
      {activeTab === 'kpis' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Monthly Recovery Trend Bar Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Waste Recovery Trends (kg per Month)</h3>
                  <p className="text-xs text-slate-500">Comparison of E-Waste recovery vs Organic composting conversion</p>
                </div>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded font-bold">
                  2026 Monthly Data
                </span>
              </div>

              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRecoveryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="ewaste" name="E-Waste Scrap (kg)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="organic" name="Organic Material (kg)" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Waste Stream Category Distribution Pie */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Category Proportion</h3>
                <p className="text-xs text-slate-500">Active marketplace volume share</p>
              </div>

              <div className="h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs pt-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>Electronic Waste</span>
                  </span>
                  <span className="font-bold text-slate-900">43.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span>Organic & Vegetable Scrap</span>
                  </span>
                  <span className="font-bold text-slate-900">56.7%</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* VERIFICATIONS MANAGEMENT TAB */}
      {activeTab === 'verifications' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Supplier & Recycler Verification Requests</h3>
            <p className="text-xs text-slate-500">Review business license documents and issue trust badges</p>
          </div>

          <div className="space-y-4">
            {users.map((u) => (
              <div key={u.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{u.name}</h4>
                    <span className="text-slate-500">{u.organization || u.email} — {u.city}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    {u.verificationBadge || 'Pending Badge'}
                  </span>

                  <button
                    onClick={() => verifyUser(u.id, u.role === 'RECYCLER_INDUSTRY' ? 'Verified E-Recycler' : 'Verified Partner')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve & Issue Badge</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USER DIRECTORY TAB */}
      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Registered Platform Users</h3>
            <p className="text-xs text-slate-500">Role-based access management and audit trail</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Verification Badge</th>
                  <th className="p-3">Exchanges</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-900">{u.name}</td>
                    <td className="p-3 font-semibold text-slate-700">{u.role}</td>
                    <td className="p-3 text-slate-600">{u.city}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {u.verificationBadge}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-900">{u.completedExchangesCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
