'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function VerifyPage() {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleVerify() {
    setStatus('loading')
    setErrorMsg('')

    try {
      const { MiniKit } = await import('@worldcoin/minikit-js') as any

      if (!MiniKit.isInstalled()) {
        setErrorMsg('MiniKit not installed - open inside World App')
        setStatus('error')
        return
      }

      const result = await MiniKit.commandsAsync.verify({
        action: 'worldx-verify',
        verification_level: 'device',
      })

      console.log('Verify result:', JSON.stringify(result))

      if (!result || !result.finalPayload) {
        setErrorMsg('No response from World App')
        setStatus('error')
        return
      }

      if (result.finalPayload.status === 'error') {
        setErrorMsg('Error: ' + JSON.stringify(result.finalPayload))
        setStatus('error')
        return
      }

      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: result.finalPayload }),
      })

      const data = await res.json()
      console.log('API response:', JSON.stringify(data))

      if (res.ok) {
        setStatus('success')
        setTimeout(() => router.push('/home'), 1200)
      } else {
        setErrorMsg('API error: ' + JSON.stringify(data))
        setStatus('error')
      }
    } catch (e: any) {
      setErrorMsg('Exception: ' + e?.message)
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center mb-8 transition-colors duration-500 ${
        status === 'success' ? 'border-green-500 bg-green-50' :
        status === 'error' ? 'border-red-400 bg-red-50' :
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
          ? 'Taking you to WorldX...'
          : "We use World ID to confirm you are a unique human. No personal data is stored."}
      </p>

      {status !== 'success' && (
        <button
          onClick={handleVerify}
          disabled={status === 'loading'}
          className="w-full max-w-xs bg-black text-white py-4 rounded-2xl text-base font-medium disabled:opacity-40"
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Verifying...
            </span>
          ) : (
            'Verify with World ID'
          )}
        </button>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-xs mt-4 text-center break-all px-2">{errorMsg}</p>
      )}

      <p className="text-gray-300 text-xs mt-10 text-center">
        Powered by Worldcoin
      </p>
    </div>
  )
}