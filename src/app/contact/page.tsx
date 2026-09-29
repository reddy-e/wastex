import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Contact Support & Enterprise Partnerships</h1>
        <p className="text-xs text-slate-500">Reach out for bulk e-waste recycling audits, agricultural composting partnerships, or platform inquiries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h3 className="text-base font-bold text-slate-900">Platform Headquarters</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-700">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tower 3, Innovation Tech Hub, HITEC City, Hyderabad</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>+91 80000 11223</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>support@smartwasteexchange.com</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
          <h3 className="text-base font-bold text-slate-900">Send Inquiry Message</h3>
          <input type="text" placeholder="Your Full Name" className="w-full p-2.5 rounded-lg border border-slate-300" />
          <input type="email" placeholder="Organization Email" className="w-full p-2.5 rounded-lg border border-slate-300" />
          <textarea rows={3} placeholder="Describe your waste generation volume or recycling capability..." className="w-full p-2.5 rounded-lg border border-slate-300" />
          <button className="w-full py-2.5 rounded-xl bg-[#0F382C] text-white font-bold text-xs flex items-center justify-center gap-1.5">
            <Send className="w-3.5 h-3.5" />
            <span>Submit Message</span>
          </button>
        </div>
      </div>
    </div>
  );
}
