import type { Metadata } from 'next'
import './globals.css'
import { MiniKitProvider } from './providers/minikitproviders'

export const metadata: Metadata = {
  title: 'WorldX',
  description: 'Crypto trading on World App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MiniKitProvider>{children}</MiniKitProvider>
      </body>
    </html>
  )
}