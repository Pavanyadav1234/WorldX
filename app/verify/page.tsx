'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IDKit } from '@worldcoin/idkit'

export default function VerifyPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  async function onSuccess(proof: any) {
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: proof }),
    })
    if (res.ok) {
      router.push('/home')
    } else {
      setError('Verification failed')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="w-24 h-24 rounded-full border-2 border-black bg-black flex items-center justify-center mb-8">
        <div className="w-12 h-12 rounded-full border-2 border-white opacity-60" />
      </div>
      <h1 className="text-2xl font-medium text-black text-center mb-2">Verify with World ID</h1>
      <p className="text-gray-400 text-sm text-center mb-10 max-w-xs">
        Verify you are a unique human to continue.
      </p>

      <IDKit
        app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
        action="worldx-verify"
        verification_level="device"
        onSuccess={onSuccess}
      >
        {({ open }) => (
          <button
            onClick={open}
            className="w-full max-w-xs bg-black text-white py-4 rounded-2xl text-base font-medium"
          >
            Verify with World ID
          </button>
        )}
      </IDKit>

      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
      <p className="text-gray-300 text-xs mt-10 text-center">Powered by Worldcoin</p>
    </div>
  )
}