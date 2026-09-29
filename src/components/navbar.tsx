'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { useAppState } from '@/lib/store';
import { 
  PlusCircle, 
  Bell, 
  MessageSquare, 
  LayoutDashboard, 
  User as UserIcon, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  Cpu, 
  Leaf, 
  ShieldAlert,
  GraduationCap
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { currentUser, notifications, messages } = useAppState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadNotifsCount = notifications.filter((n) => n.userId === currentUser.id && !n.read).length;
  const unreadMsgCount = messages.filter((m) => m.receiverId === currentUser.id && !m.read).length;

  const navLinks = [
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/e-waste', label: 'E-Waste', icon: <Cpu className="w-3.5 h-3.5 text-blue-500" /> },
    { href: '/organic-waste', label: 'Organic Waste', icon: <Leaf className="w-3.5 h-3.5 text-emerald-500" /> },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/sustainability', label: 'Impact' },
    { href: '/business-model', label: 'Business Model' },
    { href: '/research-demo', label: 'Research Demo', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Logo size="md" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  link.highlight
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    : isActive
                    ? 'bg-slate-100 text-[#0F382C]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.icon}
                {link.highlight && <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Create Listing CTA */}
          <Link
            href="/listings/create"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0F382C] hover:bg-[#154a3b] text-white text-xs font-semibold shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4 text-[#10B981]" />
            <span className="hidden sm:inline">List Waste</span>
          </Link>

          {/* Notifications Dropdown link */}
          <Link
            href="/notifications"
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {unreadNotifsCount}
              </span>
            )}
          </Link>

          {/* Direct Messages link */}
          <Link
            href="/messages"
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors hidden sm:flex"
            title="Messages"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadMsgCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadMsgCount}
              </span>
            )}
          </Link>

          {/* Dashboard / Admin button */}
          <Link
            href={currentUser.role === 'ADMIN' ? '/admin' : '/dashboard'}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs font-semibold transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-700" />
            <span className="hidden md:inline">
              {currentUser.role === 'ADMIN' ? 'Admin Panel' : 'Dashboard'}
            </span>
          </Link>

          {/* Profile link */}
          <Link
            href="/profile"
            className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-all"
            title="My Profile"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs overflow-hidden border border-emerald-300">
              {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                currentUser.name.charAt(0)
              )}
            </div>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/listings/create"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#0F382C] text-white text-sm font-semibold"
            >
              + Create Waste Listing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
