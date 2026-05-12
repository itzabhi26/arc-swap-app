'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState('');

  return (
    <main className="min-h-screen bg-[#050508] text-white flex flex-col items-center pb-24">
      {/* Top Header - Sticky like an App */}
      <nav className="w-full bg-[#0a0a12]/80 backdrop-blur-md sticky top-0 z-50 p-4 flex justify-between items-center border-b border-white/5">
        <h1 className="text-xl font-black tracking-tighter text-[#9f7aea]" style={{ fontFamily: 'Orbitron' }}>
          ARC PAY
        </h1>
        <ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
      </nav>

      {/* Main Content Area */}
      <div className="w-full max-w-md px-4 mt-8 flex flex-col gap-6">
        
        {/* Payment Card Section */}
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="flex flex-col gap-1 mb-6">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Quick Payment</span>
            <h2 className="text-2xl font-bold">Buy with Fiat</h2>
          </div>

          <div className="bg-[#131320] p-4 rounded-2xl border border-white/5 mb-4">
            <label className="text-[10px] text-gray-500 uppercase font-black">Amount in USD</label>
            <div className="flex justify-between items-center mt-2">
              <input 
                type="number" 
                placeholder="0.00" 
                className="bg-transparent text-3xl outline-none w-full font-bold"
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="text-lg font-bold text-gray-300">$</span>
            </div>
          </div>

          <button className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] py-4 rounded-2xl font-black text-sm tracking-[0.2em] uppercase shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
            Proceed to Pay
          </button>
        </div>

        {/* Swap Box (Updated for Mobile) */}
        <div className="bg-[#0f0f1a] p-6 rounded-[2.5rem] border border-white/5 shadow-xl">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Swap Asset</h2>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          
          <div className="space-y-2">
            <div className="bg-[#131320] p-4 rounded-2xl border border-white/5">
              <input type="number" placeholder="0.0" className="bg-transparent text-2xl outline-none w-full font-bold" />
            </div>
            <div className="flex justify-center -my-4 relative z-10">
              <div className="bg-[#7c3aed] p-2 rounded-full border-4 border-[#0f0f1a]">
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>
              </div>
            </div>
            <div className="bg-[#131320] p-4 rounded-2xl border border-white/5">
              <input type="number" placeholder="0.0" className="bg-transparent text-2xl outline-none w-full font-bold" readOnly />
            </div>
          </div>

          <button className="w-full mt-6 bg-white/5 hover:bg-white/10 py-4 rounded-2xl font-bold text-sm border border-white/10 transition-all uppercase tracking-widest">
            Select Token
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar - Makes it feel like an App */}
      <div className="fixed bottom-0 w-full max-w-md bg-[#0a0a12]/90 backdrop-blur-xl border-t border-white/10 px-8 py-4 flex justify-between items-center rounded-t-[2rem]">
        <div className="flex flex-col items-center gap-1 text-[#7c3aed]">
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-bold uppercase">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors cursor-pointer">
          <span className="text-xl">🔄</span>
          <span className="text-[10px] font-bold uppercase">Swap</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors cursor-pointer">
          <span className="text-xl">💳</span>
          <span className="text-[10px] font-bold uppercase">Pay</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors cursor-pointer">
          <span className="text-xl">⚙️</span>
          <span className="text-[10px] font-bold uppercase">Settings</span>
        </div>
      </div>
    </main>
  );
}