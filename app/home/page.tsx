'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState<any>(null)
  const [prices, setPrices] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Portfolio')

  useEffect(() => {
    const addr = localStorage.getItem('worldx_address') || ''
    setAddress(addr)

    // Fetch real prices
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=worldcoin-wld,bitcoin,ethereum,solana,usd-coin&vs_currencies=usd&include_24hr_change=true')
      .then(r => r.json())
      .then(data => {
        setPrices(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto">
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest">WorldX</p>
          <h1 className="text-2xl font-medium text-black mt-0.5">My Wallet</h1>
        </div>
        <div className="text-right">
          <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-xs font-medium">
            {address ? address.slice(2, 4).toUpperCase() : 'W'}
          </div>
        </div>
      </div>

      <div className="mx-5 bg-black rounded-3xl p-6 mb-5">
        <p className="text-gray-500 text-xs mb-1">Wallet address</p>
        <p className="text-white text-sm font-mono mb-3">{shortAddress}</p>
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 w-fit">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-white text-xs">Connected · World App</span>
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

      <div className="flex-1 px-5">
        {loading ? (
          <p className="text-center text-gray-400 text-sm mt-8">Loading live prices...</p>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Live market prices</p>
            {[
              { id: 'worldcoin-wld', symbol: 'WLD', name: 'Worldcoin' },
              { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
              { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
              { id: 'solana', symbol: 'SOL', name: 'Solana' },
              { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin' },
            ].map((coin) => {
              const price = prices[coin.id]?.usd ?? 0
              const change = prices[coin.id]?.usd_24h_change ?? 0
              return (
                <div
                  key={coin.symbol}
                  onClick={() => router.push('/trade')}
                  className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3.5 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                      <span className="text-xs font-medium text-white">{coin.symbol.slice(0, 1)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">{coin.name}</p>
                      <p className="text-xs text-gray-400">{coin.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-black">
                      ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-400'}`}>
                      {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
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