'use client';

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { MessageSquare, Send, User as UserIcon } from 'lucide-react';

export default function MessagesPage() {
  const { messages, currentUser, users, sendMessage } = useAppState();
  const [activeReceiverId, setActiveReceiverId] = useState<string>(
    users.find((u) => u.id !== currentUser.id)?.id || 'usr-recycler-1'
  );
  const [content, setContent] = useState('');

  const activeReceiver = users.find((u) => u.id === activeReceiverId);
  const conversation = messages.filter(
    (m) =>
      (m.senderId === currentUser.id && m.receiverId === activeReceiverId) ||
      (m.senderId === activeReceiverId && m.receiverId === currentUser.id)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    sendMessage(activeReceiverId, content);
    setContent('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900">Direct Buyer-Seller Messages</h1>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 min-h-[450px] overflow-hidden">
        
        {/* Sidebar Users */}
        <div className="border-r border-slate-200 p-4 space-y-2 bg-slate-50">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Contacts</span>
          {users
            .filter((u) => u.id !== currentUser.id)
            .map((u) => (
              <button
                key={u.id}
                onClick={() => setActiveReceiverId(u.id)}
                className={`w-full p-3 rounded-xl text-left transition-all flex items-center gap-2.5 ${
                  activeReceiverId === u.id
                    ? 'bg-[#0F382C] text-white shadow'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  {u.name.charAt(0)}
                </div>
                <div className="overflow-hidden text-xs">
                  <h4 className="font-bold truncate">{u.name}</h4>
                  <span className={`text-[10px] block truncate ${activeReceiverId === u.id ? 'text-emerald-200' : 'text-slate-500'}`}>
                    {u.role}
                  </span>
                </div>
              </button>
            ))}
        </div>

        {/* Chat Area */}
        <div className="md:col-span-2 flex flex-col justify-between p-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">{activeReceiver?.name}</h3>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded">
              {activeReceiver?.verificationBadge || 'Verified User'}
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 py-4 space-y-3 overflow-y-auto max-h-[300px]">
            {conversation.length > 0 ? (
              conversation.map((m) => {
                const isMe = m.senderId === currentUser.id;
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                        isMe
                          ? 'bg-[#0F382C] text-white rounded-br-none'
                          : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-xs text-slate-400 py-12">
                No previous message history. Start the conversation below.
              </div>
            )}
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="pt-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="Type message regarding waste listing or pickup..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#0F382C] hover:bg-[#154a3b] text-white text-xs font-bold transition-all flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
