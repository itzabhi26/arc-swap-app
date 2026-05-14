'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useAccount, useBalance, useSendTransaction, usePrepareSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {
  const { address, isConnected } = useAccount();
  
  // ARC Chain Native Token (USDC) Balance
  const { data: balance } = useBalance({ 
    address: address,
    watch: true // रियल टाइम अपडेट के लिए
  });

  const [view, setView] = useState('main'); 
  const [activeTab, setActiveTab] = useState('coins');
  const [recipient, setRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');

  // 1. Transaction Logic (Only for EVM Address)
  const isAddressValid = recipient.startsWith('0x') && recipient.length === 42;
  
  const { config } = usePrepareSendTransaction({
    to: isAddressValid ? recipient : undefined,
    value: sendAmount ? parseEther(sendAmount) : undefined,
    enabled: isAddressValid && !!sendAmount,
  });
  
  const { sendTransaction, isLoading: isSending } = useSendTransaction(config);

  const displayBalance = isConnected && balance 
    ? (Number(balance.value) / 10 ** balance.decimals).toFixed(4) 
    : '0.00';

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center font-sans select-none">
      
      {/* HEADER */}
      <nav className="w-full p-4 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
           <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-600 overflow-hidden">
              <span className="font-bold text-purple-700 text-sm">AB</span>
           </div>
           <h1 className="font-black text-xl tracking-tight italic">ArcPay</h1>
        </div>
        <ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
      </nav>

      <div className="w-full max-w-md px-5">
        
        {view === 'main' ? (
          <div className="animate-in fade-in duration-500">
            {/* PORTFOLIO AREA */}
            <div className="py-10">
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">Total Balance (ARC Chain)</p>
              <div className="flex justify-between items-end">
                <h2 className="text-5xl font-black tracking-tighter">
                  ₹{(Number(displayBalance) * 83.5).toLocaleString('en-IN')}
                </h2>
                <span className="text-green-500 font-bold text-sm mb-1">+2.45%</span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-4 gap-3 mb-10">
              <QuickBtn label="Deposit" icon="🏦" />
              <QuickBtn label="Swap" icon="⇄" onClick={() => setView('swap')} />
              <QuickBtn label="Send" icon="↗" onClick={() => setView('send')} />
              <QuickBtn label="Receive" icon="📥" onClick={() => setView('receive')} />
            </div>

            {/* ASSET TABS */}
            <div className="flex gap-8 border-b border-gray-100 text-xs font-black text-gray-400 mb-6">
              <button onClick={() => setActiveTab('coins')} className={`${activeTab === 'coins' ? 'text-black border-b-2 border-black' : ''} pb-3`}>COINS</button>
              <button onClick={() => setActiveTab('activity')} className={`${activeTab === 'activity' ? 'text-black border-b-2 border-black' : ''} pb-3`}>ACTIVITY</button>
            </div>

            {/* TOKEN LIST */}
            <div className="space-y-6 pb-28">
              <TokenItem name="ARC USDC" symbol="USDC" balance={displayBalance} price="₹83.50" logo="🟣" />
              <TokenItem name="Ethereum" symbol="ETH" balance="0.000" price="₹2,45,000" logo="🔹" />
              {/* आपका खुद का टोकन यहाँ लोड होगा */}
              <TokenItem name="Abhi Token" symbol="ABHI" balance="500.0" price="₹1.20" logo="🔥" />
            </div>
          </div>
        ) : view === 'send' ? (
          /* SEND SCREEN (photo_2026-05-14_10-34-22.jpg Inspired) */
          <div className="animate-in slide-in-from-bottom duration-300">
            <header className="flex justify-between items-center py-6">
               <button onClick={() => setView('main')} className="text-2xl font-light text-gray-400">✕</button>
               <h2 className="font-bold text-lg">Send Assets</h2>
               <div className="w-6"></div>
            </header>

            <div className="space-y-6">
               <div className="bg-gray-50 p-4 rounded-3xl">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Recipient EVM Address</label>
                  <input 
                    value={recipient} 
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="0x..." 
                    className="w-full bg-transparent text-sm font-mono font-bold outline-none mt-2 text-purple-700"
                  />
               </div>

               <div className="text-center py-10">
                  <input 
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="0"
                    className="text-7xl font-black w-full text-center outline-none bg-transparent"
                  />
                  <p className="text-gray-400 font-bold text-xs mt-2 uppercase tracking-tighter">Available: {displayBalance} USDC</p>
               </div>

               {/* SLIDE TO SEND BUTTON (Visual Only for Prototype) */}
               <button 
                disabled={!sendTransaction || isSending}
                onClick={() => sendTransaction?.()}
                className={`w-full py-5 rounded-[2rem] font-black text-sm tracking-widest transition-all ${isAddressValid && sendAmount ? 'bg-blue-600 text-white shadow-2xl' : 'bg-gray-100 text-gray-300'}`}
               >
                 {isSending ? 'CONFIRMING...' : 'SLIDE TO SEND »'}
               </button>
            </div>
          </div>
        ) : view === 'receive' ? (
          <div className="animate-in zoom-in-95 duration-300 text-center space-y-8 pt-10">
             <button onClick={() => setView('main')} className="absolute left-6 top-8 text-2xl">←</button>
             <h2 className="font-black text-2xl uppercase italic">Your ARC QR</h2>
             <div className="bg-white p-6 inline-block rounded-[3rem] border-[8px] border-gray-50 shadow-2xl">
                {isConnected && address ? <QRCodeSVG value={address} size={220} /> : <div className="w-40 h-40 bg-gray-100 animate-pulse rounded-3xl" />}
             </div>
             <div className="bg-gray-50 p-4 rounded-2xl border text-[10px] font-mono break-all font-bold mx-4">
                {address || "Not Connected"}
             </div>
             <p className="text-xs text-gray-400 font-bold px-10 italic">Scan this QR to receive any EVM compatible token on ARC Chain</p>
          </div>
        ) : null}
      </div>

      {/* BOTTOM NAV */}
      {view === 'main' && (
        <div className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-md border-t p-5 flex justify-between px-10 z-50">
          <NavIcon icon="🏠" active />
          <NavIcon icon="📊" />
          <NavIcon icon="🔄" />
          <NavIcon icon="⚙️" />
        </div>
      )}
    </main>
  );
}

// STYLED COMPONENTS
function QuickBtn({ label, icon, onClick }: any) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-all">
      <div className="bg-gray-50 w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-2xl shadow-sm border border-white">
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">{label}</span>
    </div>
  );
}

function TokenItem({ name, symbol, balance, price, logo }: any) {
  return (
    <div className="flex justify-between items-center group">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center text-xl shadow-inner">{logo}</div>
        <div>
          <p className="font-black text-sm">{name}</p>
          <p className="text-[10px] text-gray-400 font-bold">{balance} {symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-black text-sm">{price}</p>
        <p className="text-[10px] text-gray-400 font-bold">ARC Chain</p>
      </div>
    </div>
  );
}

function NavIcon({ icon, active }: any) {
  return <span className={`text-2xl cursor-pointer ${active ? 'opacity-100' : 'opacity-20 hover:opacity-100'}`}>{icon}</span>;
}