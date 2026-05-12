'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <main className="min-h-screen bg-[#F5F6F8] text-black flex flex-col items-center pb-24 font-sans">
      
      {/* 1. Top White Header */}
      <nav className="w-full bg-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-600 overflow-hidden">
             {/* Profile Pic Placeholder */}
             <span className="text-xl">👤</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase leading-none">Your Location</span>
            <span className="text-sm font-bold flex items-center gap-1">Siwan, Bihar <small>▼</small></span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xl text-gray-700">
          <span>QR</span>
          <span>🔔</span>
          <span>❓</span>
        </div>
      </nav>

      <div className="w-full max-w-md space-y-4 pt-2">
        
        {/* 2. Money Transfers Section (Purple Circles) */}
        <div className="bg-white mx-2 p-4 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-sm">Money Transfers</h2>
            <span className="bg-orange-50 text-orange-600 text-[10px] px-2 py-1 rounded-full font-bold">Refer & Earn ₹500</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <CircleAction label="To Mobile Number" icon="📱" color="bg-purple-600" />
            <CircleAction label="To Bank/Self A/c" icon="🏛️" color="bg-purple-600" />
            <CircleAction label="To Wallet" icon="👛" color="bg-purple-600" />
            <CircleAction label="Check Balance" icon="🏦" color="bg-purple-600" />
          </div>
        </div>

        {/* 3. Small Promo Banner */}
        <div className="px-2 flex gap-2 overflow-x-auto no-scrollbar">
          <div className="flex-none w-64 bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-500 rounded-lg"></div>
             <span className="text-xs font-bold leading-tight">10% off on bills via Credit Card*</span>
          </div>
        </div>

        {/* 4. Recharge & Bills Section (Grid) */}
        <div className="bg-white mx-2 p-4 rounded-2xl shadow-sm">
          <h2 className="font-bold text-sm mb-4">Recharge & Pay Bills</h2>
          <div className="grid grid-cols-4 gap-y-6">
            <SquareAction label="Mobile Recharge" icon="⚡" />
            <SquareAction label="Tuition Fees" icon="🎓" />
            <SquareAction label="Electricity" icon="💡" />
            <SquareAction label="Loan Repay" icon="💰" />
          </div>
          <button className="w-full mt-6 py-2 border-t border-gray-100 text-purple-700 font-bold text-xs flex justify-center items-center gap-2">
             VIEW ALL SERVICES ❯
          </button>
        </div>

        {/* 5. Loans Section */}
        <div className="bg-white mx-2 p-4 rounded-2xl shadow-sm">
           <h2 className="font-bold text-sm mb-4">Loans</h2>
           <div className="grid grid-cols-4 gap-y-6">
            <SquareAction label="Personal Loan" icon="👤" />
            <SquareAction label="Mutual Funds" icon="📊" />
            <SquareAction label="Gold Loan" icon="🎖️" />
            <SquareAction label="Credit Score" icon="📈" />
          </div>
        </div>

      </div>

      {/* 6. Bottom Navigation Bar (Matching photo_2026-05-12_22-54-30.jpg) */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-end">
        <NavIcon label="Home" icon="🏠" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavIcon label="Search" icon="🔍" active={activeTab === 'search'} onClick={() => setActiveTab('search')} />
        
        {/* Center QR/Scan Button */}
        <div className="flex flex-col items-center -mt-8">
           <div className="w-14 h-14 bg-purple-700 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-2xl text-white">QR</span>
           </div>
        </div>

        <NavIcon label="Alerts" icon="🔔" active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} />
        <NavIcon label="History" icon="🕒" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
      </div>
    </main>
  );
}

// Components for Layout
function CircleAction({ label, icon, color }: any) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center shadow-md`}>
        <span className="text-xl text-white">{icon}</span>
      </div>
      <span className="text-[10px] text-center font-medium leading-tight text-gray-600">{label}</span>
    </div>
  );
}

function SquareAction({ label, icon }: any) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center border border-gray-100">
        <span className="text-xl">{icon}</span>
      </div>
      <span className="text-[10px] text-center font-medium leading-tight text-gray-600 px-1">{label}</span>
    </div>
  );
}

function NavIcon({ label, icon, active, onClick }: any) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-1 cursor-pointer">
      <span className={`text-xl ${active ? 'text-purple-700' : 'text-gray-400'}`}>{icon}</span>
      <span className={`text-[10px] font-bold ${active ? 'text-purple-700' : 'text-gray-400'}`}>{label}</span>
    </div>
  );
}