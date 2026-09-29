'use client';

import React from 'react';
import Link from 'next/link';
import { useAppState } from '@/lib/store';
import { Bell, CheckCircle2, Zap } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, currentUser, markNotificationRead } = useAppState();

  const userNotifications = notifications.filter((n) => n.userId === currentUser.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900">Notifications Center</h1>
        <p className="text-xs text-slate-500">Alerts for bids, organic claims, match suggestions, and pickup status updates</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {userNotifications.length > 0 ? (
          userNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 flex items-start justify-between gap-4 transition-colors cursor-pointer ${
                n.read ? 'bg-white' : 'bg-emerald-50/50 font-medium'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{n.title}</span>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                </div>
                <p className="text-xs text-slate-600">{n.message}</p>
                <span className="text-[10px] text-slate-400 block pt-1">{n.createdAt}</span>
              </div>

              {n.link && (
                <Link
                  href={n.link}
                  className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold shrink-0"
                >
                  View
                </Link>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs text-slate-500">No notifications found.</div>
        )}
      </div>
    </div>
  );
}
