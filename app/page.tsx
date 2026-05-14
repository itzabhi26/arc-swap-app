'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address: address });
  
  const [activeTab, setActiveTab] = useState('home');
  const [view, setView] = useState('main'); // 'main' or 'send'
  const [pin, setPin] = useState('');

  const displayBalance = isConnected && balance 
    ? (Number(balance.value) / 10 ** balance.decimals).toFixed(4) 
    : '0.00';

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center font-sans">
      
      {/* HEADER - photo_2026-05-14_10-34-24.jpg जैसा */}
      <nav className="w-full p-4 flex justify-between items-center sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden border">
              <span className="flex items-center justify-center h-full text-xs">👤</span>
           </div>
           <h1 className="font-bold text-lg">Home</h1>
        </div>
        <div className="flex gap-4 text-xl items-center">
          <span>🔍</span> <span>🔳</span> <span>💬</span>
        </div>
      </nav>

      <div className="w-full max-w-md px-4 space-y-6">
        
        {view === 'main' ? (
          <>
            {/* MAIN BALANCE AREA */}
            <div className="py-8 flex justify-between items-start">
              <h2 className="text-5xl font-black tracking-tight">₹{isConnected ? '281.21' : '0.00'}</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                🎁 Earn
              </button>
            </div>

            {/* QUICK ACTIONS - Icons Like your photo */}
            <div className="grid grid-cols-4 gap-2">
              <NavSquare label="Deposit" icon="S" color="bg-gray-100" />
              <NavSquare label="Trade" icon="⇅" color="bg-gray-100" />
              <NavSquare label="Send" icon="↗" color="bg-gray-100" onClick={() => setView('send')} />
              <NavIcon label="Request" icon="👤" color="bg-gray-100" />
            </div>

            {/* TOKEN LIST - photo_2026-05-14_10-34-24.jpg जैसा */}
            <div className="pt-6 space-y-6">
              <div className="flex gap-6 border-b text-sm font-bold text-gray-400">
                <span className="text-black border-b-2 border-black pb-2">Coins</span>
                <span>Collectibles</span>
                <span>Activity</span>
              </div>
              
              <div className="space-y-5 pb-24">
                <TokenRow name="Ethereum" symbol="ETH" balance={displayBalance} price="₹143.66" change="-3.32%" color="bg-blue-600" />
                <TokenRow name="BNB" symbol="BNB" balance="0.00195" price="₹124.81" change="-100%" color="bg-yellow-500" />
                <TokenRow name="Tether" symbol="USDT" balance="0.095" price="₹9.17" change="-0.08%" color="bg-green-500" />
                <TokenRow name="Arc Token" symbol="ARC" balance="100.0" price="₹50.00" change="+2.40%" color="bg-purple-600" />
              </div>
            </div>
          </>
        ) : (
          /* SEND SCREEN - photo_2026-05-14_10-34-22.jpg जैसा */
          <div className="animate-in slide-in-from-bottom duration-300 flex flex-col h-[85vh]">
            <div className="flex justify-between items-center mb-8">
               <button onClick={() => setView('main')} className="text-2xl">←</button>
               <h2 className="font-serif italic text-xl">Send</h2>
               <div className="w-6"></div>
            </div>

            <div className="bg-gray-50 p-3 rounded-full flex items-center gap-3 mb-10">
               <span className="text-gray-400 pl-2">To</span>
               <div className="flex items-center gap-2 bg-white pr-4 py-1 rounded-full border shadow-sm">
                  <div className="w-5 h-5 bg-orange-400 rounded-full"></div>
                  <span className="text-xs font-bold">0x587...4cC3</span>
               </div>
            </div>

            <div className="text-center space-y-2 mb-8">
               <h2 className="text-6xl font-black">₹{pin || '0'}</h2>
               <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">↓ 0 ETH</p>
            </div>

            {/* NUMBER PAD */}
            <div className="grid grid-cols-3 gap-y-8 text-center text-2xl font-bold mt-auto pb-10">
               {[1,2,3,4,5,6,7,8,9,'.',0].map(n => (
                 <div key={n} onClick={() => setPin(pin + n)} className="py-4 active:bg-gray-100 rounded-full cursor-pointer">{n}</div>
               ))}
               <div onClick={() => setPin(pin.slice(0, -1))} className="py-4 active:bg-gray-100 rounded-full cursor-pointer">⌫</div>
            </div>

            {/* SWIPE TO SEND BUTTON - photo_2026-05-14_10-34-22.jpg की जान */}
            <div className="relative w-full bg-blue-700 h-16 rounded-full flex items-center justify-center overflow-hidden mb-6">
                <p className="text-white font-bold text-sm">Slide to Send</p>
                <div className="absolute left-1 w-14 h-14 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-black">»</div>
                </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      {view === 'main' && (
        <div className="fixed bottom-0 w-full max-w-md bg-white border-t p-4 flex justify-between px-10">
          <span className="text-2xl">🏠</span>
          <span className="text-2xl opacity-30">🔍</span>
          <span className="text-2xl opacity-30">⇅</span>
          <span className="text-2xl opacity-30">🌐</span>
          <span className="text-2xl opacity-30">🕒</span>
        </div>
      )}
    </main>
  );
}

// UI HELPERS
function NavSquare({ label, icon, onClick }: any) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer">
      <div className="bg-gray-100 w-16 h-16 rounded-[2rem] flex items-center justify-center text-2xl font-bold active:scale-95 transition-all">
        {icon}
      </div>
      <span className="text-xs font-bold">{label}</span>
    </div>
  );
}

function TokenRow({ name, symbol, balance, price, change, color }: any) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white font-bold`}>
          {symbol[0]}
        </div>
        <div>
          <p className="font-bold text-sm">{name}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase">{balance} {symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-sm">{price}</p>
        <p className={`text-[10px] font-bold ${change.includes('-') ? 'text-red-500' : 'text-green-500'}`}>{change}</p>
      </div>
    </div>
  );
}