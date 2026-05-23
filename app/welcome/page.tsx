'use client'
import { useRouter } from 'next/navigation'

const features = [
  {
    icon: '◎',
    title: 'Trade crypto instantly',
    desc: 'Buy and sell BTC, ETH, SOL, WLD and more in seconds.',
  },
  {
    icon: '⬡',
    title: 'Verified humans only',
    desc: 'Powered by World ID — no bots, no duplicates.',
  },
  {
    icon: '↗',
    title: 'Live market data',
    desc: 'Real-time prices, charts and portfolio tracking.',
  },
]

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 pt-16 pb-10">
      {/* Header */}
      <div className="mb-12">
        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-6">
          <div className="w-6 h-6 rounded-full border border-white opacity-70" />
        </div>
        <h1 className="text-3xl font-medium text-black leading-tight">
          Trade smarter<br />with WorldX
        </h1>
        <p className="text-gray-400 text-sm mt-3">
          The crypto trading mini app built for World App users.
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-6 flex-1">
        {features.map((f) => (
          <div key={f.title} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg shrink-0">
              {f.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-black">{f.title}</p>
              <p className="text-sm text-gray-400 mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-col gap-3">
        <button
          onClick={() => router.push('/verify')}
          className="w-full bg-black text-white py-4 rounded-2xl text-base font-medium"
        >
          Get started
        </button>
        <p className="text-center text-xs text-gray-400">
          Requires World ID verification
        </p>
      </div>
    </div>
  )
}