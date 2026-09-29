'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { UserRole } from '@/lib/types';
import { Building2, Factory, Sprout } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('WASTE_PRODUCER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <Logo size="lg" className="justify-center" />
        <h1 className="text-2xl font-extrabold text-slate-900">Create Smart Waste Exchange Account</h1>
        <p className="text-xs text-slate-500">Join the circular waste recovery network</p>
      </div>

      <form onSubmit={handleRegister} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <div className="space-y-1">
          <label className="font-bold text-slate-700 block">Select Account Role</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setRole('WASTE_PRODUCER')}
              className={`p-2.5 rounded-lg border text-center font-bold text-[11px] flex flex-col items-center gap-1 ${
                role === 'WASTE_PRODUCER' ? 'border-[#0F382C] bg-emerald-50 text-[#0F382C]' : 'border-slate-200 text-slate-600'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Producer</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('RECYCLER_INDUSTRY')}
              className={`p-2.5 rounded-lg border text-center font-bold text-[11px] flex flex-col items-center gap-1 ${
                role === 'RECYCLER_INDUSTRY' ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 text-slate-600'
              }`}
            >
              <Factory className="w-4 h-4" />
              <span>Recycler</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('FARMER_ORGANIC_USER')}
              className={`p-2.5 rounded-lg border text-center font-bold text-[11px] flex flex-col items-center gap-1 ${
                role === 'FARMER_ORGANIC_USER' ? 'border-amber-600 bg-amber-50 text-amber-800' : 'border-slate-200 text-slate-600'
              }`}
            >
              <Sprout className="w-4 h-4" />
              <span>Farmer</span>
            </button>
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Company / Organization Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Apex Infotech Solutions"
            className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Official Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-[#0F382C] hover:bg-[#154a3b] text-white font-extrabold text-xs transition-all shadow"
        >
          Register & Request Verification
        </button>

        <div className="text-center text-slate-500 text-[11px]">
          Already registered?{' '}
          <Link href="/login" className="font-bold text-emerald-700 hover:underline">
            Sign In Here
          </Link>
        </div>
      </form>
    </div>
  );
}
