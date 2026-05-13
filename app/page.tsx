'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';

export default function Home() {
  // States for App Functionality
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('INR');
  const [username, setUsername] = useState('itz_abhi'); // Default Username
  const [profilePic, setProfilePic] = useState('👤');

  // Theme apply logic
  const themeClass = theme === 'dark' ? 'bg-[#0f0f1a] text-white' : 'bg-[#F5F6F8] text-black';
  const cardClass = theme === 'dark' ? 'bg-[#1a1a2e] border-white/5' : 'bg-white border-gray-100';

  return (
    <main className={`min-h-screen flex flex-col items-center pb-24 transition-all duration-300 ${themeClass}`}>
      
      {/* HEADER SECTION */}
      <nav className={`w-full p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm ${theme === 'dark' ? 'bg-[#0a0a12]' : 'bg-white'}`}>
        <div className="flex items-center gap-3">
          <div onClick={() => setActiveTab('settings')} className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-purple-600 cursor-pointer overflow-hidden bg-purple-100">
             <span className="text-xl">{profilePic}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold opacity-60 uppercase">@{username}</span>
            <span className="text-sm font-bold flex items-center gap-1">{currency} Wallet ▼</span>
          </div>
        </div>
        <ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
      </nav>

      <div className="w-full max-w-md space-y-4 pt-2 px-2">
        
        {/* DYNAMIC VIEWS */}
        {activeTab === 'home' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            {/* Money Transfers */}
            <div className={`${cardClass} p-4 rounded-2xl shadow-sm`}>
              <h2 className="font-bold text-sm mb-4">Money Transfers (ARC Chain)</h2>
              <div className="grid grid-cols-4 gap-2">
                <ActionIcon label="To User" icon="👤" onClick={() => alert("Enter Username to send")} />
                <ActionIcon label="To Address" icon="🔗" onClick={() => alert("Enter Wallet Address")} />
                <ActionIcon label="Self A/c" icon="🏛️" />
                <ActionIcon label="Scan QR" icon="📷" onClick={() => setActiveTab('receive')} />
              </div>
            </div>

            {/* Recharge & Bills */}
            <div className={`${cardClass} p-4 rounded-2xl shadow-sm`}>
              <h2 className="font-bold text-sm mb-4">Recharge & Bill Pay</h2>
              <div className="grid grid-cols-4 gap-y-6">
                <SquareIcon label="Mobile" icon="📱" />
                <SquareIcon label="DTH" icon="📡" />
                <SquareIcon label="Electricity" icon="💡" />
                <SquareIcon label="Gas" icon="🔥" />
              </div>
            </div>
          </div>
        )}

        {/* RECEIVE / QR VIEW */}
        {activeTab === 'receive' && (
          <div className={`${cardClass} p-8 rounded-[2.5rem] text-center space-y-6 animate-in slide-in-from-bottom-4`}>
            <h2 className="text-xl font-bold">Receive Funds</h2>
            <div className="bg-white p-4 inline-block rounded-3xl border-4 border-purple-600">
              {/* Dummy QR Placeholder */}
              <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-gray-400">QR CODE HERE</div>
            </div>
            <p className="font-mono text-xs opacity-60 break-all px-4">0x123...ABCD</p>
            <div className="bg-purple-50 p-2 rounded-xl text-purple-700 font-bold text-sm">@{username}</div>
          </div>
        )}

        {/* SWAP VIEW */}
        {activeTab === 'swap' && (
          <div className={`${cardClass} p-6 rounded-[2.5rem] space-y-4 animate-in fade-in`}>
            <h2 className="text-xl font-bold">ARC Swap</h2>
            <SwapInput label="From" token="ARC" />
            <div className="flex justify-center -my-6 relative z-10">
               <div className="bg-purple-600 p-2 rounded-full border-4 border-white text-white text-xs">▼</div>
            </div>
            <SwapInput label="To" token="USDT" />
            <button className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg active:scale-95 transition-all">SWAP NOW</button>
          </div>
        )}

        {/* SETTINGS VIEW */}
        {activeTab === 'settings' && (
          <div className={`${cardClass} p-6 rounded-[3rem] space-y-6 animate-in slide-in-from-left-4`}>
            <h2 className="text-xl font-bold">Profile & Settings</h2>
            
            {/* Edit Profile */}
            <div className="space-y-3">
              <label className="text-xs font-bold opacity-50 uppercase">Edit Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl text-black" />
            </div>

            {/* Theme Toggle */}
            <div className="flex justify-between items-center p-3 border rounded-2xl">
              <span className="font-bold text-sm">Dark Mode</span>
              <input type="checkbox" onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} checked={theme === 'dark'} className="w-6 h-6" />
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold opacity-50 uppercase">App Language</label>
              <select onChange={(e) => setLanguage(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl text-black">
                <option>Hindi</option>
                <option>English</option>
                <option>Bhojpuri</option>
                <option>Spanish</option>
              </select>
            </div>

            {/* Currency Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold opacity-50 uppercase">Base Currency</label>
              <select onChange={(e) => setCurrency(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl text-black">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>AED (د.إ)</option>
              </select>
            </div>

            <button onClick={() => alert("Logged Out")} className="w-full text-red-500 font-bold p-3 border border-red-100 rounded-2xl">LOG OUT</button>
          </div>
        )}
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className={`fixed bottom-0 w-full max-w-md border-t px-6 py-3 flex justify-between items-end ${theme === 'dark' ? 'bg-[#0a0a12] border-white/10' : 'bg-white border-gray-200'}`}>
        <NavIcon label="Home" icon="🏠" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavIcon label="Swap" icon="🔄" active={activeTab === 'swap'} onClick={() => setActiveTab('swap')} />
        <div className="flex flex-col items-center -mt-8">
           <div onClick={() => setActiveTab('receive')} className="w-14 h-14 bg-purple-700 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white cursor-pointer active:scale-90 transition-all">
              <span className="text-2xl text-white">QR</span>
           </div>
        </div>
        <NavIcon label="Receive" icon="📥" active={activeTab === 'receive'} onClick={() => setActiveTab('receive')} />
        <NavIcon label="Settings" icon="⚙️" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </div>
    </main>
  );
}

// UI COMPONENTS
function ActionIcon({ label, icon, onClick }: any) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer active:opacity-60">
      <div className="bg-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md text-white text-xl">{icon}</div>
      <span className="text-[10px] text-center font-bold opacity-80 leading-tight">{label}</span>
    </div>
  );
}

function SquareIcon({ label, icon }: any) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer">
      <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center border border-gray-100 text-xl shadow-sm">{icon}</div>
      <span className="text-[10px] text-center font-bold opacity-70">{label}</span>
    </div>
  );
}

function NavIcon({ label, icon, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${active ? 'scale-110 text-purple-700' : 'opacity-40 text-gray-500'}`}>
      <span className="text-xl">{icon}</span>
      <span className="text-[9px] font-black uppercase">{label}</span>
    </div>
  );
}

function SwapInput({ label, token }: any) {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
      <label className="text-[10px] font-black opacity-40">{label}</label>
      <div className="flex justify-between items-center mt-1">
        <input type="number" placeholder="0.0" className="bg-transparent text-2xl font-bold outline-none w-full text-black" />
        <span className="bg-white px-3 py-1 rounded-full text-xs font-black shadow-sm text-purple-700">{token}</span>
      </div>
    </div>
  );
}