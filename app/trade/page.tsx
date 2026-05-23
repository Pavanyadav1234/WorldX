'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const coins = [
  { symbol: 'WLD', name: 'Worldcoin', price: '2.84', change: '+5.32', positive: true },
  { symbol: 'BTC', name: 'Bitcoin', price: '67,420', change: '+1.84', positive: true },
  { symbol: 'ETH', name: 'Ethereum', price: '3,512', change: '+0.62', positive: true },
  { symbol: 'SOL', name: 'Solana', price: '178.40', change: '-1.23', positive: false },
  { symbol: 'USDC', name: 'USD Coin', price: '1.00', change: '0.00', positive: true },
]

export default function TradePage() {
  const router = useRouter()
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [selected, setSelected] = useState(coins[0])
  const [amount, setAmount] = useState('')

  const total = amount ? (parseFloat(amount) * parseFloat(selected.price.replace(',', ''))).toFixed(2) : '0.00'

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => router.push('/home')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg">
          ←
        </button>
        <h1 className="text-xl font-medium text-black">Trade</h1>
      </div>

      {/* Buy / Sell toggle */}
      <div className="flex mx-5 bg-gray-100 rounded-xl p-1 mb-5">
        {(['buy', 'sell'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg capitalize transition-all ${
              side === s
                ? s === 'buy' ? 'bg-black text-white' : 'bg-red-500 text-white'
                : 'text-gray-400'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Coin selector */}
      <div className="px-5 mb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Select asset</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {coins.map((coin) => (
            <button
              key={coin.symbol}
              onClick={() => setSelected(coin)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                selected.symbol === coin.symbol
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-500 border-gray-200'
              }`}
            >
              {coin.symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Selected coin info */}
      <div className="mx-5 bg-gray-50 rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <span className="text-white text-xs font-medium">{selected.symbol.slice(0, 1)}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-black">{selected.name}</p>
              <p className={`text-xs ${selected.positive ? 'text-green-500' : 'text-red-400'}`}>
                {selected.positive ? '▲' : '▼'} {selected.change}% today
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium text-black">${selected.price}</p>
            <p className="text-xs text-gray-400">per token</p>
          </div>
        </div>
      </div>

      {/* Amount input */}
      <div className="px-5 mb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Amount ({selected.symbol})</p>
        <div className="bg-gray-50 rounded-2xl px-4 py-3 flex items-center gap-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 bg-transparent text-2xl font-medium text-black outline-none"
          />
          <span className="text-gray-400 text-sm">{selected.symbol}</span>
        </div>
        {/* Quick amounts */}
        <div className="flex gap-2 mt-2">
          {['25%', '50%', '75%', 'Max'].map((q) => (
            <button key={q} className="flex-1 bg-gray-100 text-gray-500 text-xs py-1.5 rounded-lg">
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Order summary */}
      <div className="mx-5 bg-gray-50 rounded-2xl p-4 mb-5">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Order summary</p>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Price</span>
          <span className="text-black">${selected.price}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Amount</span>
          <span className="text-black">{amount || '0'} {selected.symbol}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Fee (0.1%)</span>
          <span className="text-black">${amount ? (parseFloat(total) * 0.001).toFixed(2) : '0.00'}</span>
        </div>
        <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
          <span className="text-sm font-medium text-black">Total</span>
          <span className="text-sm font-medium text-black">${total}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-8">
        <button
          className={`w-full py-4 rounded-2xl text-white text-base font-medium ${
            side === 'buy' ? 'bg-black' : 'bg-red-500'
          } disabled:opacity-40`}
          disabled={!amount || parseFloat(amount) <= 0}
        >
          {side === 'buy' ? `Buy ${selected.symbol}` : `Sell ${selected.symbol}`}
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          Verified with World ID · Instant settlement
        </p>
      </div>
    </div>
  )
}