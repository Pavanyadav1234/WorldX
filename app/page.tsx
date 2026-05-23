'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashPage() {
  const router = useRouter()
  useEffect(() => {
    const timer = setTimeout(() => router.push('/welcome'), 2000)
    return () => clearTimeout(timer)
  }, [router])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-white text-3xl font-medium">WorldX</h1>
      <p className="text-gray-500 text-sm mt-2">Mini App</p>
    </div>
  )
}