"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, Clock, Grid, Edit3, Trash2, Copy, 
  Github, Globe, MessageSquare, Zap, Smartphone 
} from 'lucide-react';

export default function UnifiedPage() {
  const [memo, setMemo] = useState("");
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  // マウント時に時計を開始
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black text-black dark:text-white antialiased font-sans pb-10">
      
      {/* --- ヘッダー（iOSステータスバー風） --- */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-slate-200 dark:border-white/10 px-6 py-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-black tracking-tighter text-xl">
            <Zap className="fill-current text-yellow-400" size={20} />
            <span>CORE</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-sm font-bold opacity-50">
            <Clock size={14} />
            {time || "00:00"}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-5 space-y-6">
        
        {/* --- 検索セクション --- */}
        <section className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter') window.open(`https://www.google.com/search?q=${e.currentTarget.value}`, '_blank');
            }}
          />
        </section>

        {/* --- クイックリンク集 --- */}
        <section className="grid grid-cols-2 gap-3">
          {[
            { name: "GitHub", url: "https://github.com", icon: <Github />, color: "bg-slate-900" },
            { name: "ChatGPT", url: "https://chat.openai.com", icon: <MessageSquare />, color: "bg-emerald-600" },
            { name: "Google", url: "https://google.com", icon: <Globe />, color: "bg-blue-500" },
            { name: "Settings", url: "#", icon: <Grid />, color: "bg-indigo-500" },
          ].map((item) => (
            <a 
              key={item.name} 
              href={item.url} 
              target="_blank"
              className="flex items-center gap-3 p-4 bg-white dark:bg-[#1C1C1E] rounded-2xl active:scale-95 transition-transform border border-transparent dark:border-white/5"
            >
              <div className={`${item.color} p-2 rounded-xl text-white shadow-lg`}>
                {React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
              </div>
              <span className="font-bold text-sm">{item.name}</span>
            </a>
          ))}
        </section>

        {/* --- 実用メモ帳 --- */}
        <section className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 shadow-sm border border-transparent dark:border-white/5">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 font-bold opacity-80">
              <Edit3 size={18} />
              <h2>Scratchpad</h2>
            </div>
            <span className="text-[10px] font-mono opacity-40 bg-slate-100 dark:bg-white/10 px-2 py-1 rounded">
              LEN: {memo.length}
            </span>
          </div>
          <textarea 
            className="w-full h-48 bg-transparent resize-none outline-none text-lg leading-relaxed"
            placeholder="Type your ideas here..."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-50 dark:border-white/5">
            <button onClick={() => setMemo("")} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
              <Trash2 size={20} />
            </button>
            <button 
              onClick={() => {navigator.clipboard.writeText(memo); alert("Copied!");}}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-md active:scale-90 transition-transform"
            >
              <Copy size={16} />
              Copy
            </button>
          </div>
        </section>

        {/* --- フッター（iPhone 15 Info） --- */}
        <footer className="text-center space-y-2 py-6 opacity-30">
          <div className="flex justify-center gap-2 items-center text-[10px] font-black uppercase tracking-widest">
            <Smartphone size={12} />
            <span>Optimized for iPhone 15 / iOS 26</span>
          </div>
          <p className="text-[10px] font-mono">v1.0.4-production</p>
        </footer>

      </main>
    </div>
  );
}
