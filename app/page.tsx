'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';

export default function Home() {
  // 1. Navigation State: ये तय करेगा कि अभी कौन सी स्क्रीन दिखेगी
  const [activeTab, setActiveTab] = useState('home');
  const [fiatAmount, setFiatAmount] = useState('');

  // 2. Payment Logic: असली पेमेंट गेटवे खोलना
  const handlePayment = () => {
    if (!fiatAmount || parseFloat(fiatAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    // यहाँ हम Transak जैसे गेटवे का लिंक खोल सकते हैं
    const transakUrl = `https://global.transak.com/?apiKey=YOUR_API_KEY&fiatAmount=${fiatAmount}&defaultCryptoCurrency=ETH`;
    window.open(transakUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#050508] text-white flex flex-col items-center pb-28">
      {/* Header */}
      <nav className="w-full bg-[#0a0a12]/80 backdrop-blur-md sticky top-0 z-50 p-4 flex justify-between items-center border-b border-white/5">
        <h1 className="text-xl font-black tracking-tighter text-[#9f7aea]">ARC PAY</h1>
        <ConnectButton showBalance={false} chainStatus="icon" />
      </nav>

      {/* Dynamic Content: बटन के हिसाब से बदलेगा */}
      <div className="w-full max-w-md px-4 mt-6">
        
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>
              <p className="text-gray-400 text-sm">Aapka Web3 wallet connected hai. Niche diye gaye options se transactions karein.</p>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
               <div onClick={() => setActiveTab('pay')} className="bg-[#0f0f1a] p-4 rounded-3xl border border-white/5 text-center cursor-pointer active:scale-95 transition-all">
                  <span className="text-2xl">💳</span>
                  <p className="text-xs font-bold mt-2">ADD CASH</p>
               </div>
               <div onClick={() => setActiveTab('swap')} className="bg-[#0f0f1a] p-4 rounded-3xl border border-white/5 text-center cursor-pointer active:scale-95 transition-all">
                  <span className="text-2xl">🔄</span>
                  <p className="text-xs font-bold mt-2">EXCHANGE</p>
               </div>
            </div>
          </div>
        )}

        {/* PAY VIEW */}
        {activeTab === 'pay' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#0f0f1a] p-6 rounded-[2.5rem] border border-white/10">
              <h2 className="text-xl font-bold mb-6">Buy with Fiat</h2>
              <div className="bg-[#131320] p-4 rounded-2xl border border-white/5 mb-6">
                <label className="text-[10px] text-gray-500 font-black">AMOUNT IN USD</label>
                <input 
                  type="number" 
                  value={fiatAmount}
                  onChange={(e) => setFiatAmount(e.target.value)}
                  className="bg-transparent text-3xl outline-none w-full font-bold mt-2" 
                  placeholder="0.00" 
                />
              </div>
              <button 
                onClick={handlePayment}
                className="w-full bg-[#7c3aed] py-4 rounded-2xl font-black shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
              >
                PROCEED TO PAY
              </button>
            </div>
          </div>
        )}

        {/* SWAP VIEW */}
        {activeTab === 'swap' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
             <div className="bg-[#0f0f1a] p-6 rounded-[2.5rem] border border-white/10">
                <h2 className="text-xl font-bold mb-6">Swap Asset</h2>
                {/* Swap logic UI here */}
                <p className="text-center text-gray-500 text-sm">Swap functionality connecting to Smart Contract...</p>
                <button className="w-full mt-6 bg-white/5 py-4 rounded-2xl font-bold border border-white/10 active:scale-95 transition-all">
                  EXECUTE SWAP
                </button>
             </div>
          </div>
        )}

      </div>

      {/* Bottom Nav Bar - Isse Options Real Kaam Karenge */}
      <div className="fixed bottom-0 w-full max-w-md bg-[#0a0a12]/90 backdrop-blur-xl border-t border-white/10 px-8 py-4 flex justify-between items-center rounded-t-[2rem] z-50">
        <NavBtn label="Home" icon="🏠" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavBtn label="Swap" icon="🔄" active={activeTab === 'swap'} onClick={() => setActiveTab('swap')} />
        <NavBtn label="Pay" icon="💳" active={activeTab === 'pay'} onClick={() => setActiveTab('pay')} />
        <NavBtn label="Settings" icon="⚙️" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </div>
    </main>
  );
}

// Reusable Navigation Button Component
function NavBtn({ label, icon, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${active ? 'text-[#7c3aed] scale-110' : 'text-gray-500'}`}>
      <span className="text-xl">{icon}</span>
      <span className="text-[10px] font-bold uppercase">{label}</span>
    </div>
  );
}