import React from 'react';
import Link from 'next/link';
import { Logo } from './logo';
import { ShieldCheck, Leaf, Cpu, Award, Globe, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0b241c] text-slate-300 pt-14 pb-8 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Brand Vision Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" className="text-white" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Smart Waste Exchange transforms waste into a valuable reusable resource by connecting waste producers with recyclers, industries, farmers, and communities.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Circular Economy Platform</span>
              </div>
            </div>
          </div>

          {/* Core Categories Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/e-waste" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>Electronic Waste (E-Waste)</span>
                </Link>
              </li>
              <li>
                <Link href="/organic-waste" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Organic / Vegetable Waste</span>
                </Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-emerald-400 transition-colors">
                  Smart Match Engine
                </Link>
              </li>
              <li>
                <Link href="/listings/create" className="hover:text-emerald-400 transition-colors">
                  Create Listing
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Smart Waste Exchange
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-emerald-400 transition-colors">
                  Sustainability & SDG Goals
                </Link>
              </li>
              <li>
                <Link href="/business-model" className="hover:text-emerald-400 transition-colors">
                  Business Model & Pitch
                </Link>
              </li>
              <li>
                <Link href="/research-demo" className="hover:text-emerald-400 transition-colors font-medium text-emerald-300">
                  Academic Research Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* UN SDG Goals Alignment Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">UN SDG Alignment</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded bg-emerald-950/80 border border-emerald-800/80">
                <span className="font-bold text-amber-400">SDG 11:</span> Sustainable Cities & Communities
              </div>
              <div className="p-2 rounded bg-emerald-950/80 border border-emerald-800/80">
                <span className="font-bold text-emerald-400">SDG 12:</span> Responsible Consumption & Production
              </div>
              <div className="p-2 rounded bg-emerald-950/80 border border-emerald-800/80">
                <span className="font-bold text-blue-400">SDG 13:</span> Climate Action
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Smart Waste Exchange. All rights reserved. Turn Waste Into Value.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact Support</Link>
            <Link href="/login" className="hover:text-slate-300 transition-colors">Sign In</Link>
            <Link href="/register" className="hover:text-slate-300 transition-colors">Register</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
