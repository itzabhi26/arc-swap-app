'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { QRCodeSVG } from 'qrcode.react'; // असली QR के लिए

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address: address });

  // App States
  const [activeTab, setActiveTab] = useState('home');
  const [rechargeType, setRechargeType] = useState<string | null>(null);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('INR');
  const [username, setUsername] = useState('ItzAbhi');
  
  // Form States
  const [targetInput, setTargetInput] = useState('');
  const [amount, setAmount] = useState('');

  // Styles based on Theme
  const isDark = theme === 'dark';
  const mainBg = isDark ? 'bg-[#0a0a12] text-white' : 'bg-[#F5F6F8] text-black';
  const cardClass = isDark ? 'bg-[#161625] border-white/5' : 'bg-white border-gray-100';

  return (
    <main className={`min-h-screen flex flex-col items-center pb-28 transition-all duration-300 ${mainBg}`}>
      
      {/* HEADER */}
      <nav className={`w-full p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm ${isDark ? 'bg-[#0a0a12]' : 'bg-white'}`}>
        <div className="flex items-center gap-3">
          <div onClick={() => setActiveTab('settings')} className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-purple-600 bg-purple-100 cursor-pointer overflow-hidden">
             <span className="text-xl font-bold text-purple-700">{username[0]}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-purple-600 uppercase tracking-tighter">ArcPay India</span>
            <span className="text-xs font-bold">@{username} ▼</span>
          </div>
        </div>
        <ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
      </nav>

      <div className="w-full max-w-md space-y-4 pt-2 px-3">
        
        {/* REAL BALANCE CARD */}
        <div className="p-6 rounded-[2.5rem] shadow-xl bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-bold opacity-70 uppercase tracking-[0.2em]">Available Balance</p>
            <h2 className="text-3xl font-black mt-1">
              {isConnected ? `${parseFloat(balance?.formatted || '0').toFixed(4)} ${balance?.symbol}` : `0.00 ARC`}
            </h2>
            <div className="mt-4 flex justify-between items-center">
               <span className="text-[9px] font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">ARC MAINNET READY</span>
               <span className="text-xs font-bold opacity-60">{currency} Equivalent</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* DYNAMIC CONTENT AREA */}
        <div className="min-h-[400px]">
          
          {/* HOME VIEW */}
          {activeTab === 'home' && !rechargeType && (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className={`${cardClass} p-5 rounded-3xl shadow-sm border`}>
                <h2 className="font-black text-xs mb-5 uppercase tracking-widest opacity-60">Money Transfers</h2>
                <div className="grid grid-cols-4 gap-2">
                  <ActionIcon label="To User" icon="👤" color="bg-blue-500" />
                  <ActionIcon label="To Bank" icon="🏛️" color="bg-green-500" />
                  <ActionIcon label="Self" icon="🔄" color="bg-orange-500" />
                  <ActionIcon label="Scan QR" icon="📸" color="bg-purple-600" onClick={() => setActiveTab('receive')} />
                </div>
              </div>

              <div className={`${cardClass} p-5 rounded-3xl shadow-sm border`}>
                <h2 className="font-black text-xs mb-5 uppercase tracking-widest opacity-60">Recharge & Bills</h2>
                <div className="grid grid-cols-4 gap-y-8">
                  <SquareIcon label="Mobile" icon="📱" onClick={() => setRechargeType('Mobile Recharge')} />
                  <SquareIcon label="Electricity" icon="💡" onClick={() => setRechargeType('Electricity Bill')} />
                  <SquareIcon label="DTH" icon="📡" onClick={() => setRechargeType('DTH Payment')} />
                  <SquareIcon label="Gas" icon="🔥" onClick={() => setRechargeType('Gas Bill')} />
                </div>
              </div>
            </div>
          )}

          {/* REAL RECHARGE FORM */}
          {rechargeType && (
            <div className={`${cardClass} p-7 rounded-[2.5rem] shadow-2xl border animate-in slide-in-from-right-8 duration-300`}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-black text-xl uppercase italic">{rechargeType}</h2>
                <button onClick={() => setRechargeType(null)} className="text-red-500 font-black text-xs bg-red-50 px-3 py-1 rounded-full">CLOSE</button>
              </div>
              <div className="space-y-5">
                <InputBox label={rechargeType.includes('Mobile') ? "Phone Number" : "Consumer ID"} value={targetInput} onChange={setTargetInput} placeholder="Enter details..." />
                <InputBox label="Amount (ARC)" value={amount} onChange={setAmount} placeholder="0.00" type="number" />
                <button onClick={() => alert("Processing on ARC Chain...")} className="w-full bg-purple-700 text-white py-5 rounded-[1.5rem] font-black text-sm tracking-widest shadow-lg active:scale-95 transition-all">PAY NOW</button>
              </div>
            </div>
          )}

          {/* RECEIVE VIEW (With Real QR & Address) */}
          {activeTab === 'receive' && (
            <div className={`${cardClass} p-8 rounded-[3rem] shadow-2xl border text-center space-y-7 animate-in zoom-in-95 duration-300`}>
              <h2 className="font-black text-xl uppercase italic">Receive Money</h2>
              
              <div className="bg-white p-6 inline-block rounded-[2.5rem] border-[6px] border-purple-600 shadow-2xl">
                {isConnected && address ? (
                  <QRCodeSVG value={address} size={200} level="H" includeMargin={true} />
                ) : (
                  <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-400 font-bold italic">CONNECT WALLET</div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">Your Wallet Address</p>
                <div className="bg-gray-50 p-3 rounded-2xl border text-[10px] font-mono break-all font-bold text-purple-700">
                  {address || "Please connect your wallet"}
                </div>
              </div>

              <div className="bg-purple-700 text-white py-3 rounded-2xl font-black text-sm tracking-widest shadow-lg">
                @{username.toLowerCase()}
              </div>
            </div>
          )}

          {/* SWAP VIEW */}
          {activeTab === 'swap' && (
            <div className={`${cardClass} p-7 rounded-[3rem] shadow-xl border space-y-6 animate-in fade-in duration-300`}>
              <h2 className="font-black text-xl uppercase italic">Arc Swap</h2>
              <div className="space-y-2">
                <SwapRow label="From" token="ARC" balance={balance?.formatted} />
                <div className="flex justify-center -my-8 relative z-10">
                  <div className="bg-purple-700 p-3 rounded-full border-4 border-white text-white shadow-xl">↓</div>
                </div>
                <SwapRow label="To" token="USDT" balance="0.00" />
              </div>
              <button className="w-full bg-purple-700 text-white py-5 rounded-[1.5rem] font-black tracking-widest shadow-lg">EXECUTE SWAP</button>
            </div>
          )}

          {/* SETTINGS VIEW */}
          {activeTab === 'settings' && (
            <div className={`${cardClass} p-7 rounded-[3rem] shadow-xl border space-y-6 animate-in slide-in-from-left-8 duration-300`}>
              <h2 className="font-black text-xl uppercase italic">App Settings</h2>
              
              <div className="space-y-4">
                <SettingSelect label="Language" options={['English', 'Hindi', 'Bhojpuri', 'Spanish']} onChange={setLanguage} />
                <SettingSelect label="Currency" options={['INR (₹)', 'USD ($)', 'EUR (€)']} onChange={setCurrency} />
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border">
                  <span className="font-black text-xs uppercase tracking-widest opacity-60">Dark Mode</span>
                  <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className={`w-12 h-6 rounded-full transition-all ${isDark ? 'bg-purple-600' : 'bg-gray-300'} relative`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDark ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border space-y-2">
                  <label className="text-[10px] font-black opacity-40 uppercase">Profile Username</label>
                  <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-transparent font-bold text-purple-700 outline-none" />
                </div>
              </div>

              <button className="w-full border-2 border-red-100 text-red-500 py-4 rounded-2xl font-black text-xs tracking-widest uppercase">Log Out Account</button>
            </div>
          )}

        </div>
      </div>

      {/* BOTTOM NAVIGATION (PhonePe Style) */}
      <div className={`fixed bottom-0 w-full max-w-md border-t px-8 py-4 flex justify-between items-end z-[100] ${isDark ? 'bg-[#0a0a12] border-white/10' : 'bg-white border-gray-200'}`}>
        <NavIcon label="Home" icon="🏠" active={activeTab === 'home'} onClick={() => {setActiveTab('home'); setRechargeType(null)}} />
        <NavIcon label="Swap" icon="🔄" active={activeTab === 'swap'} onClick={() => setActiveTab('swap')} />
        
        <div className="flex flex-col items-center -mt-10">
           <div onClick={() => setActiveTab('receive')} className="w-16 h-16 bg-purple-700 rounded-[1.5rem] flex items-center justify-center shadow-2xl border-[6px] border-white cursor-pointer active:scale-90 transition-all">
              <span className="text-xl text-white font-black italic">QR</span>
           </div>
        </div>

        <NavIcon label="Receive" icon="📥" active={activeTab === 'receive'} onClick={() => setActiveTab('receive')} />
        <NavIcon label="Settings" icon="⚙️" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </div>
    </main>
  );
}

// UI HELPERS
function ActionIcon({ label, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer group">
      <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-active:scale-90 transition-all`}>
        <span className="text-xl text-white">{icon}</span>
      </div>
      <span className="text-[9px] font-black text-center opacity-60 uppercase tracking-tighter">{label}</span>
    </div>
  );
}

function SquareIcon({ label, icon, onClick }: any) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer group">
      <div className="bg-gray-50 w-14 h-14 rounded-[1.2rem] flex items-center justify-center border shadow-sm group-active:scale-90 transition-all text-2xl">
        {icon}
      </div>
      <span className="text-[9px] font-black text-center opacity-70 uppercase tracking-tighter">{label}</span>
    </div>
  );
}

function NavIcon({ label, icon, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${active ? 'scale-110 text-purple-700' : 'opacity-40 text-gray-500'}`}>
      <span className="text-xl">{icon}</span>
      <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
    </div>
  );
}

function InputBox({ label, value, onChange, placeholder, type = "text" }: any) {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
      <label className="text-[10px] font-black opacity-40 uppercase tracking-widest">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent text-xl font-bold outline-none mt-2 text-black" />
    </div>
  );
}

function SwapRow({ label, token, balance }: any) {
  return (
    <div className="bg-gray-50 p-5 rounded-[1.5rem] border">
      <div className="flex justify-between mb-2">
        <span className="text-[10px] font-black opacity-40 uppercase">{label}</span>
        <span className="text-[10px] font-bold text-purple-700 uppercase">Bal: {parseFloat(balance || '0').toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <input type="number" placeholder="0.00" className="bg-transparent text-2xl font-black outline-none w-full text-black" />
        <span className="bg-white px-4 py-2 rounded-full text-[10px] font-black shadow-sm text-purple-700 border">{token}</span>
      </div>
    </div>
  );
}

function SettingSelect({ label, options, onChange }: any) {
  return (
    <div className="p-4 bg-gray-50 rounded-2xl border space-y-2">
      <label className="text-[10px] font-black opacity-40 uppercase tracking-widest">{label}</label>
      <select onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent font-bold text-sm text-purple-700 outline-none cursor-pointer">
        {options.map((opt: string) => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}