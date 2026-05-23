'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const coins = [
  { symbol: 'WLD', name: 'Worldcoin', price: '2.84', change: '+5.32', positive: true, vol: '$1.2B', cap: '$4.1B' },
  { symbol: 'BTC', name: 'Bitcoin', price: '67,420', change: '+1.84', positive: true, vol: '$42.1B', cap: '$1.3T' },
  { symbol: 'ETH', name: 'Ethereum', price: '3,512', change: '+0.62', positive: true, vol: '$18.6B', cap: '$421B' },
  { symbol: 'SOL', name: 'Solana', price: '178.40', change: '-1.23', positive: false, vol: '$5.2B', cap: '$79B' },
  { symbol: 'USDC', name: 'USD Coin', price: '1.00', change: '0.00', positive: true, vol: '$8.1B', cap: '$43B' },
  { symbol: 'BNB', name: 'BNB', price: '594.10', change: '+0.41', positive: true, vol: '$2.8B', cap: '$88B' },
]

const ranges = ['1H', '1D', '1W', '1M', '1Y']

// Simple fake chart bars
const chartData = [40, 55, 45, 60, 52, 70, 65, 80, 72, 90, 85, 95, 88, 100, 92, 98, 88, 95, 90, 100]

export default function MarketsPage() {
  const router = useRouter()
  const [selected, setSelected] = useState(coins[0])
  const [range, setRange] = useState('1D')
  const [search, setSearch] = useState('')

  const filtered = coins.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-medium text-black">Markets</h1>
        <p className="text-gray-400 text-sm mt-1">Live crypto prices</p>
      </div>

      {/* Search */}
      <div className="mx-5 mb-4">
        <div className="bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-2">
          <span className="text-gray-400 text-sm">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search coins..."
            className="bg-transparent flex-1 text-sm text-black outline-none"
          />
        </div>
      </div>

      {/* Selected coin chart */}
      <div className="mx-5 bg-black rounded-3xl p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400 text-xs">{selected.name}</p>
            <p className="text-white text-2xl font-medium">${selected.price}</p>
            <p className={`text-sm mt-0.5 ${selected.positive ? 'text-green-400' : 'text-red-400'}`}>
              {selected.positive ? '▲' : '▼'} {selected.change}% today
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white text-xs font-medium">{selected.symbol.slice(0, 1)}</span>
          </div>
        </div>

        {/* Chart bars */}
        <div className="flex items-end gap-1 h-16 mb-3">
          {chartData.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-white/20"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Range selector */}
        <div className="flex gap-1">
          {ranges.map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`flex-1 py-1 text-xs rounded-lg transition-all ${
                range === r ? 'bg-white text-black font-medium' : 'text-gray-400'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex mx-5 gap-3 mb-5">
        {[
          { label: 'Volume', value: selected.vol },
          { label: 'Market cap', value: selected.cap },
        ].map(s => (
          <div key={s.label} className="flex-1 bg-gray-50 rounded-2xl p-3">
            <p className="text-xs text-gray-400">{s.label}</p>
            <p className="text-sm font-medium text-black mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Coin list */}
      <div className="px-5 flex flex-col gap-2 flex-1">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">All assets</p>
        {filtered.map((coin) => (
          <div
            key={coin.symbol}
            onClick={() => setSelected(coin)}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 cursor-pointer transition-all ${
              selected.symbol === coin.symbol ? 'bg-black' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                selected.symbol === coin.symbol ? 'bg-white/20' : 'bg-black'
              }`}>
                <span className={`text-xs font-medium ${
                  selected.symbol === coin.symbol ? 'text-white' : 'text-white'
                }`}>{coin.symbol.slice(0, 1)}</span>
              </div>
              <div>
                <p className={`text-sm font-medium ${selected.symbol === coin.symbol ? 'text-white' : 'text-black'}`}>
                  {coin.name}
                </p>
                <p className="text-xs text-gray-400">{coin.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${selected.symbol === coin.symbol ? 'text-white' : 'text-black'}`}>
                ${coin.price}
              </p>
              <p className={`text-xs ${coin.positive ? 'text-green-400' : 'text-red-400'}`}>
                {coin.positive ? '▲' : '▼'} {coin.change}%
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trade button */}
      <div className="px-5 py-5">
        <button
          onClick={() => router.push('/trade')}
          className="w-full bg-black text-white py-4 rounded-2xl text-base font-medium"
        >
          Trade {selected.symbol}
        </button>
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around items-center px-6 py-4 border-t border-gray-100">
        {[
          { label: 'Home', path: '/home' },
          { label: 'Markets', path: '/markets' },
          { label: 'Trade', path: '/trade' },
          { label: 'Wallet', path: '/home' },
          { label: 'Profile', path: '/home' },
        ].map((item, i) => (
          <button key={item.label} onClick={() => router.push(item.path)} className="flex flex-col items-center gap-1">
            <span className={`text-xs ${i === 1 ? 'text-black font-medium' : 'text-gray-300'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}