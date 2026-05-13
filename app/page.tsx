'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address: address });

  // App States
  const [activeTab, setActiveTab] = useState('home');
  const [rechargeType, setRechargeType] = useState<string | null>(null);
  const [theme, setTheme] = useState('light');
  const [username, setUsername] = useState('ItzAbhi');

  // Transaction History (Dummy Data for now)
  const [transactions] = useState([
    { id: 1, type: 'Sent', amount: '10.5 ARC', to: '0x7a2...3b1', date: 'May 12' },
    { id: 2, type: 'Received', amount: '50.0 ARC', from: '0x1c4...e92', date: 'May 11' },
    { id: 3, type: 'Swap', amount: '5 ARC -> 5 USDT', date: 'May 10' },
  ]);

  const isDark = theme === 'dark';
  const displayBalance = isConnected && balance 
    ? (Number(balance.value) / 10 ** balance.decimals).toFixed(4) 
    : '0.0000';

  return (
    <main className={`min-h-screen flex flex-col items-center pb-28 transition-all duration-300 ${isDark ? 'bg-[#0a0a12] text-white' : 'bg-[#F5F6F8] text-black'}`}>
      
      {/* HEADER */}
      <nav className={`w-full p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm ${isDark ? 'bg-[#0a0a12]' : 'bg-white'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-purple-600 bg-purple-100">
             <span className="text-xl font-bold text-purple-700">{username[0]}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-purple-600 uppercase tracking-tighter">ArcPay India</span>
            <span className="text-xs font-bold tracking-tight text-gray-500">@{username.toLowerCase()}</span>
          </div>
        </div>
        <ConnectButton showBalance={false} chainStatus="icon" />
      </nav>

      <div className="w-full max-w-md space-y-4 pt-2 px-3">
        
        {/* WALLET CARD */}
        <div className="p-6 rounded-[2.5rem] shadow-2xl bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white">
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-[0.2em]">Total Balance</p>
          <h2 className="text-3xl font-black mt-1">
            {isConnected ? `${displayBalance} ${balance?.symbol}` : `0.00 ARC`}
          </h2>
        </div>

        {/* MAIN 4 OPTIONS (From your image reference) */}
        <div className={`grid grid-cols-2 gap-0.5 rounded-3xl overflow-hidden shadow-sm border ${isDark ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-100'}`}>
          <MenuBox label="Swap" icon="⇄" onClick={() => setActiveTab('swap')} active={activeTab === 'swap'} />
          <MenuBox label="Send" icon="↗" onClick={() => setRechargeType('Send Money')} />
          <MenuBox label="Receive" icon="📥" onClick={() => setActiveTab('receive')} active={activeTab === 'receive'} />
          <MenuBox label="Transactions" icon="🕒" onClick={() => setActiveTab('history')} active={activeTab === 'history'} />
        </div>

        {/* CONTENT AREA */}
        <div className="min-h-[300px]">
          
          {/* RECHARGE & BILLS (HOME VIEW) */}
          {activeTab === 'home' && !rechargeType && (
            <div className="animate-in fade-in duration-500 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="font-black text-xs mb-5 uppercase tracking-widest opacity-60">Bill Payments</h2>
              <div className="grid grid-cols-4 gap-y-8">
                <SquareIcon label="Mobile" icon="📱" onClick={() => setRechargeType('Mobile Recharge')} />
                <SquareIcon label="Electricity" icon="💡" onClick={() => setRechargeType('Electricity Bill')} />
                <SquareIcon label="DTH" icon="📡" onClick={() => setRechargeType('DTH Payment')} />
                <SquareIcon label="Gas" icon="🔥" onClick={() => setRechargeType('Gas Bill')} />
              </div>
            </div>
          )}

          {/* SEND / RECHARGE FORM */}
          {rechargeType && (
            <div className="bg-white p-7 rounded-[2.5rem] border animate-in slide-in-from-right-8 duration-300">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-black text-xl uppercase italic">{rechargeType}</h2>
                <button onClick={() => setRechargeType(null)} className="text-red-500 font-black text-xs px-3 py-1 bg-red-50 rounded-full">CANCEL</button>
              </div>
              <div className="space-y-4">
                <InputBox label="Recipient / ID" placeholder="Enter here..." />
                <InputBox label="Amount" placeholder="0.00" type="number" />
                <button className="w-full bg-purple-700 text-white py-5 rounded-[1.5rem] font-black shadow-lg">CONFIRM TRANSACTION</button>
              </div>
            </div>
          )}

          {/* TRANSACTION HISTORY VIEW */}
          {activeTab === 'history' && (
            <div className="space-y-3 animate-in fade-in duration-300">
              <h2 className="font-black text-xs uppercase opacity-60 px-2 tracking-widest">Recent Activity</h2>
              {transactions.map((trnx) => (
                <div key={trnx.id} className="bg-white p-4 rounded-2xl flex justify-between items-center border border-gray-50 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${trnx.type === 'Received' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {trnx.type === 'Received' ? '↓' : '↑'}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{trnx.type}</p>
                      <p className="text-[10px] text-gray-400">{trnx.date}</p>
                    </div>
                  </div>
                  <p className={`font-black text-sm ${trnx.type === 'Received' ? 'text-green-600' : 'text-black'}`}>
                    {trnx.type === 'Received' ? '+' : '-'}{trnx.amount}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* RECEIVE VIEW (With Real Address & QR) */}
          {activeTab === 'receive' && (
            <div className="bg-white p-8 rounded-[3rem] border text-center space-y-7 animate-in zoom-in-95">
              <h2 className="font-black text-xl uppercase italic text-purple-700">My QR Code</h2>
              <div className="bg-white p-6 inline-block rounded-[2.5rem] border-[6px] border-purple-600 shadow-2xl">
                {isConnected && address ? <QRCodeSVG value={address} size={180} /> : <p className="p-10 italic opacity-30 font-bold">Connect Wallet</p>}
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl border text-[10px] font-mono break-all font-bold text-purple-700">
                {address || "Connect wallet to see address"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className={`fixed bottom-0 w-full max-w-md border-t px-10 py-4 flex justify-between items-center z-[100] ${isDark ? 'bg-[#0a0a12] border-white/10' : 'bg-white border-gray-200'}`}>
        <NavIcon label="Home" icon="🏠" active={activeTab === 'home'} onClick={() => {setActiveTab('home'); setRechargeType(null)}} />
        <div onClick={() => setActiveTab('receive')} className="w-16 h-16 bg-purple-700 rounded-[1.5rem] flex items-center justify-center shadow-2xl border-[6px] border-white cursor-pointer -mt-10">
           <span className="text-xl text-white font-black italic">QR</span>
        </div>
        <NavIcon label="Settings" icon="⚙️" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </div>
    </main>
  );
}

// UI HELPERS
function MenuBox({ label, icon, onClick, active }: any) {
  return (
    <div onClick={onClick} className={`bg-white p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${active ? 'bg-purple-50' : ''}`}>
      <span className={`text-2xl ${active ? 'text-purple-700' : 'text-gray-700'}`}>{icon}</span>
      <span className={`text-[11px] font-black uppercase tracking-tight ${active ? 'text-purple-700' : 'text-gray-500'}`}>{label}</span>
    </div>
  );
}

function SquareIcon({ label, icon, onClick }: any) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer group">
      <div className="bg-gray-50 w-14 h-14 rounded-[1.2rem] flex items-center justify-center border shadow-sm group-active:scale-90 transition-all text-2xl">{icon}</div>
      <span className="text-[9px] font-black text-center opacity-70 uppercase tracking-tighter">{label}</span>
    </div>
  );
}

function NavIcon({ label, icon, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-purple-700' : 'opacity-40 text-gray-500'}`}>
      <span className="text-xl">{icon}</span>
      <span className="text-[8px] font-black uppercase">{label}</span>
    </div>
  );
}

function InputBox({ label, placeholder, type = "text" }: any) {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
      <label className="text-[10px] font-black opacity-40 uppercase tracking-widest">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full bg-transparent text-lg font-bold outline-none mt-2 text-black" />
    </div>
  );
}