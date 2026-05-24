'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IDKitRequestWidget } from '@worldcoin/idkit'

export default function VerifyPage() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <IDKitRequestWidget
        app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
        action="worldx-verify"
        rp_context={{}}
        allow_legacy_proofs={false}
        open={isOpen}
        onOpenChange={setIsOpen}
        handleVerify={async () => {}}
        onSuccess={async (proof) => {
          const res = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payload: proof }),
          })
          if (res.ok) router.push('/home')
        }}
      />

      <div className="w-24 h-24 rounded-full border-2 border-black bg-black flex items-center justify-center mb-8">
        <div className="w-12 h-12 rounded-full border-2 border-white opacity-60" />
      </div>
      <h1 className="text-2xl font-medium text-black text-center mb-2">Verify with World ID</h1>
      <p className="text-gray-400 text-sm text-center mb-10 max-w-xs">
        Verify you are a unique human to continue.
      </p>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full max-w-xs bg-black text-white py-4 rounded-2xl text-base font-medium"
      >
        Verify with World ID
      </button>
      <p className="text-gray-300 text-xs mt-10 text-center">Powered by Worldcoin</p>
    </div>
  )
}