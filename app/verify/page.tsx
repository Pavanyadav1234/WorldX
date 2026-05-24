'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleVerify() {
    setStatus('loading')
    try {
      const { MiniKit } = await import('@worldcoin/minikit-js') as any
      if (!MiniKit.isInstalled()) {
        router.push('/home')
        return
      }
      const result = await MiniKit.walletAuth({
        nonce: Math.random().toString(36).substring(2),
        statement: 'Sign in to WorldX',
      })
      if (result?.finalPayload?.status !== 'error') {
        setStatus('done')
        router.push('/home')
      } else {
        router.push('/home')
      }
    } catch {
      router.push('/home')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="w-24 h-24 rounded-full border-2 border-black bg-black flex items-center justify-center mb-8">
        <div className="w-12 h-12 rounded-full border-2 border-white opacity-60" />
      </div>
      <h1 className="text-2xl font-medium text-black text-center mb-2">Sign in with World App</h1>
      <p className="text-gray-400 text-sm text-center mb-10 max-w-xs">
        Connect your World wallet to start trading.
      </p>
      <button
        onClick={handleVerify}
        disabled={status === 'loading'}
        className="w-full max-w-xs bg-black text-white py-4 rounded-2xl text-base font-medium disabled:opacity-40"
      >
        {status === 'loading' ? 'Connecting...' : 'Connect World Wallet'}
      </button>
      <p className="text-gray-300 text-xs mt-10 text-center">Powered by Worldcoin</p>
    </div>
  )
}