'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { useAppState } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentRole } = useAppState();
  const [email, setEmail] = useState('techcorp@wastexchange.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default login directs to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <Logo size="lg" className="justify-center" />
        <h1 className="text-2xl font-extrabold text-slate-900">Sign In to Smart Waste Exchange</h1>
        <p className="text-xs text-slate-500">Access your waste listings, bids, claims, and pickup logistics</p>
      </div>

      <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-[#0F382C] hover:bg-[#154a3b] text-white font-extrabold text-xs transition-all shadow"
        >
          Sign In to Portal
        </button>

        <div className="text-center text-slate-500 text-[11px]">
          Don't have an account?{' '}
          <Link href="/register" className="font-bold text-emerald-700 hover:underline">
            Register New Organization
          </Link>
        </div>
      </form>
    </div>
  );
}
