'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090f] text-white flex flex-col items-center p-10">
      {/* Header / Navbar */}
      <nav className="w-full max-w-6xl flex justify-between items-center mb-16">
        <h1 className="text-2xl font-bold text-[#9f7aea] tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          ARC SWAP
        </h1>
        <ConnectButton />
      </nav>

      {/* Main Swap Card */}
      <div className="bg-[#0f0f1a] border border-white/10 p-8 rounded-[32px] w-full max-w-[460px] shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold tracking-tight">Swap Tokens</h2>
          <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-1 rounded-full border border-purple-500/20 uppercase tracking-widest font-black">Arc Testnet</span>
        </div>

        {/* Input: From Token */}
        <div className="bg-[#131320] p-5 rounded-2xl mb-2 border border-white/5 hover:border-purple-500/30 transition-all">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-gray-500 font-medium">You Pay</span>
            <span className="text-xs text-gray-500">Balance: 0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <input type="number" placeholder="0" className="bg-transparent text-3xl outline-none w-full font-bold placeholder:text-gray-700" />
            <button className="bg-[#1c1c2d] flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 hover:bg-[#252538] transition-colors">
              <span className="font-bold text-sm">ETH</span>
            </button>
          </div>
        </div>

        {/* Switch Icon */}
        <div className="flex justify-center -my-4 relative z-10">
          <div className="bg-[#0f0f1a] p-2.5 rounded-xl border border-white/10 text-purple-500 cursor-pointer hover:rotate-180 transition-all duration-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
          </div>
        </div>

        {/* Input: To Token */}
        <div className="bg-[#131320] p-5 rounded-2xl mb-8 border border-white/5 hover:border-purple-500/30 transition-all">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-gray-500 font-medium">You Receive</span>
            <span className="text-xs text-gray-500">Balance: 0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <input type="number" placeholder="0" className="bg-transparent text-3xl outline-none w-full font-bold placeholder:text-gray-700" readOnly />
            <button className="bg-purple-600 flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-purple-500 transition-colors">
              <span className="font-bold text-sm">USDC</span>
            </button>
          </div>
        </div>

        {/* Swap Button */}
        <button className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] py-5 rounded-[20px] font-black text-lg tracking-widest shadow-lg shadow-purple-500/20 active:scale-[0.97] transition-all uppercase">
          Enter Amount
        </button>
      </div>

      <footer className="mt-20 text-gray-600 text-[10px] uppercase tracking-[0.3em] font-bold">
        Powered by Arc Network • ItzAbhi Labs
      </footer>
    </main>
  );
}