'use client';

import { useState } from 'react';

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export default function LiveChat({ classId }: { classId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'Instructor Alex', text: 'Welcome everyone! Today we cover advanced system design.', timestamp: '10:00' },
    { id: '2', sender: 'Priya S.', text: 'Excited for this class!', timestamp: '10:01' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: 'You',
        text: input.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInput('');
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="font-semibold text-slate-800 text-sm">Live Class Chat</h3>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        {messages.map((msg) => (
          <div key={msg.id} className="rounded-lg bg-slate-50 p-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium text-slate-700">{msg.sender}</span>
              <span>{msg.timestamp}</span>
            </div>
            <p className="mt-1 text-slate-800">{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="border-t border-slate-200 p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
