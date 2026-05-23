'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function VerifyPage() {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleVerify() {
    if (!MiniKit.isInstalled()) {
      setErrorMsg('Please open WorldX inside World App.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setErrorMsg('')

    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify({
        action: 'worldx-verify',
        verification_level: VerificationLevel.Orb,
      })

      if (finalPayload.status === 'error') {
        setErrorMsg('Verification was cancelled or failed.')
        setStatus('error')
        return
      }

      // Send proof to backend
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: finalPayload }),
      })

      if (res.ok) {
        setStatus('success')
        setTimeout(() => router.push('/home'), 1000)
      } else {
        setErrorMsg('Server verification failed. Try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      {/* Icon */}
      <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center mb-8 transition-colors duration-500 ${
        status === 'success' ? 'border-green-500 bg-green-50' :
        status === 'error'   ? 'border-red-400 bg-red-50' :
        'border-black bg-black'
      }`}>
        {status === 'success' ? (
          <span className="text-green-500 text-3xl">✓</span>
        ) : status === 'error' ? (
          <span className="text-red-400 text-3xl">✕</span>
        ) : (
          <div className="w-12 h-12 rounded-full border-2 border-white opacity-60" />
        )}
      </div>

      <h1 className="text-2xl font-medium text-black text-center mb-2">
        {status === 'success' ? 'Verified!' : 'Verify with World ID'}
      </h1>
      <p className="text-gray-400 text-sm text-center mb-10 max-w-xs">
        {status === 'success'
          ? 'Taking you to WorldX…'
          : 'We use World ID to confirm you're a unique human. No personal data is stored.'}
      </p>

      {status !== 'success' && (
        <button
          onClick={handleVerify}
          disabled={status === 'loading'}
          className="w-full max-w-xs bg-black text-white py-4 rounded-2xl text-base font-medium disabled:opacity-40 transition-opacity"
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Verifying…
            </span>
          ) : (
            'Verify with Orb'
          )}
        </button>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-sm mt-4 text-center">{errorMsg}</p>
      )}

      <p className="text-gray-300 text-xs mt-10 text-center">
        Orb-level verification required · Powered by Worldcoin
      </p>
    </div>
  )
}