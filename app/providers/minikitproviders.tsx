'use client'
import { useEffect } from 'react'

export function MiniKitProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const install = async () => {
      try {
        const { MiniKit } = await import('@worldcoin/minikit-js')
        MiniKit.install(process.env.NEXT_PUBLIC_APP_ID)
      } catch (e) {
        console.log('MiniKit not available:', e)
      }
    }
    install()
  }, [])
  return <>{children}</>
}