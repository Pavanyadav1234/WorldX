'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const holdings = [
  { symbol: 'WLD', name: 'Worldcoin', amount: 245.50, id: 'worldcoin' },
  { symbol: 'BTC', name: 'Bitcoin', amount: 0.0042, id: 'bitcoin' },
  { symbol: 'ETH', name: 'Ethereum', amount: 0.124, id: 'ethereum' },
  { symbol: 'SOL', name: 'Solana', amount: 2.80, id: 'solana' },
  { symbol: 'USDC', name: 'USD Coin', amount: 932.00, id: 'usd-coin' },
]

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Portfolio')
  const [prices, setPrices] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ids = holdings.map(h => h.id).join(',')
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`)
      .then(r => r.json())
      .then(data => {
        setPrices(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const assets = holdings.map(h => {
    const price = prices[h.id]?.usd ?? 0
    const change = prices[h.id]?.usd_24h_change ?? 0
    return {
      ...h,
      price,
      value: h.amount * price,
      change: change.toFixed(2),
      positive: change >= 0,
    }
  })

  const total = assets.reduce((sum, a) => sum + a.value, 0)

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
          {loading ? '...' : `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        </p>
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
        {loading ? (
          <p className="text-center text-gray-400 text-sm mt-8">Loading live prices...</p>
        ) : (
          assets.map((asset) => (
            <div key={asset.symbol} onClick={() => router.push('/trade')} className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3.5 cursor-pointer">
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
                <p className="text-sm font-medium text-black">${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className={`text-xs ${asset.positive ? 'text-green-500' : 'text-red-400'}`}>
                  {asset.positive ? '▲' : '▼'} {Math.abs(Number(asset.change))}%
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-around items-center px-6 py-4 border-t border-gray-100 mt-6">
        {[
          { label: 'Home', path: '/home' },
          { label: 'Markets', path: '/markets' },
          { label: 'Trade', path: '/trade' },
          { label: 'Wallet', path: '/home' },
          { label: 'Profile', path: '/home' },
        ].map((item, i) => (
          <button key={item.label} onClick={() => router.push(item.path)} className="flex flex-col items-center gap-1">
            <span className={`text-xs ${i === 0 ? 'text-black font-medium' : 'text-gray-300'}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}