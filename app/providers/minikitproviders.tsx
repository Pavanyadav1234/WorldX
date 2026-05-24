'use client'
import { useEffect } from 'react'

export function MiniKitProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const install = async () => {
      try {
        const { MiniKit } = await import('@worldcoin/minikit-js') as any
        MiniKit.install(process.env.NEXT_PUBLIC_APP_ID)
        setTimeout(() => {
          if (MiniKit.walletAddress) {
            localStorage.setItem('worldx_address', MiniKit.walletAddress)
          }
        }, 1000)
      } catch (e) {
        console.log('MiniKit error:', e)
      }
    }
    install()
  }, [])
  return <>{children}</>
}