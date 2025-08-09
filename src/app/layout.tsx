import type { Metadata } from 'next'
import '../styles/globals.css'
import { Geist } from 'next/font/google'
import { cn } from '@/lib/utils'

const geist = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Odonto PRO',
  icons: {
    icon: '/stethoscope.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(geist.className, 'dark antialiased')}>
      <body>{children}</body>
    </html>
  )
}
