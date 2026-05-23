'use client'
import { useEffect, useState } from 'react'

export default function SplashPage() {
  const [go, setGo] = useState(false)

  export default function Page() {
  return null
}
}

  useEffect(() => {
    if (go) {
      window.location.href = '/welcome'
    }
  }, [go])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-white text-3xl font-medium">WorldX</h1>
      <p className="text-gray-500 text-sm mt-2">Mini App</p>
    </div>
  )
}