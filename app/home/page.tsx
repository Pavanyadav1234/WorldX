'use client'
import { useState } from 'react'

const assets = [
  { symbol: 'WLD', name: 'Worldcoin', amount: '245.50', value: '697.22', change: '+5.32', positive: true },
  { symbol: 'BTC', name: 'Bitcoin', amount: '0.0042', value: '283.16', change: '+1.84', positive: true },
  { symbol: 'ETH', name: 'Ethereum', amount: '0.124', value: '435.49', change: '+0.62', positive: true },
  { symbol: 'SOL', name: 'Solana', amount: '2.80', value: '499.52', change: '-1.23', positive: false },
  { symbol: 'USDC', name: 'USD Coin', amount: '932.00', value: '932.00', change: '0.00', positive: true },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('Portfolio')
  const total = assets.reduce((sum, a) => sum + parseFloat(a.value), 0)

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto">
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest">WorldX</p>
          <h1 className="text-2xl font-medium text-black mt-0.5">My Wallet</h1>
        </div>
        <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-sm font-medium">P</div>
      </div>

      <div className="mx-5 bg-black rounded-3xl p-6 mb-5">
        <p className="text-gray-500 text-xs mb-1">Total portfolio value</p>
        <p className="text-white text-4xl font-medium tracking-tight">
          ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-green-400 text-sm mt-2">▲ +$342.10 (2.73%) today</p>
        <div className="flex items-center gap-2 mt-4 bg-white/10 rounded-full px-3 py-1.5 w-fit">
          <div className="w-2 h-2 rounded-full bg-white" />
          <span className="text-white text-xs">Verified · World ID</span>
        </div>
        <div className="flex gap-2 mt-4">
          {['Deposit', 'Withdraw', 'Swap'].map((a) => (
            <button key={a} className="flex-1 bg-white/10 text-white text-xs py-2 rounded-xl">{a}</button>
          ))}
        </div>
      </div>

      <div className="flex mx-5 bg-gray-100 rounded-xl p-1 mb-4">
        {['Portfolio', 'Activity', 'Earn'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm rounded-lg transition-all ${activeTab === tab ? 'bg-white text-black font-medium' : 'text-gray-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 px-5 flex flex-col gap-3">
        {assets.map((asset) => (
          <div key={asset.symbol} className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <span className="text-xs font-medium text-white">{asset.symbol.slice(0, 1)}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-black">{asset.name}</p>
                <p className="text-xs text-gray-400">{asset.amount} {asset.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-black">${asset.value}</p>
              <p className={`text-xs ${asset.positive ? 'text-green-500' : 'text-red-400'}`}>
                {asset.positive ? '▲' : '▼'} {asset.change}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-around items-center px-6 py-4 border-t border-gray-100 mt-6">
        {[
          { label: 'Home', path: '/home' },
          { label: 'Markets', path: '/markets' },
          { label: 'Trade', path: '/trade' },
          { label: 'Wallet', path: '/home' },
          { label: 'Profile', path: '/profile' },
        ].map((item, i) => (
          <button
            key={item.label}
            onClick={() => router.push(item.path)}
            className="flex flex-col items-center gap-1"
          >
            <span className={`text-xs ${i === 0 ? 'text-black font-medium' : 'text-gray-300'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}