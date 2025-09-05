import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Toaster } from 'sonner'
import SessionAuthProvider from '@/components/app/session-auth'
import { cn } from '@/lib/utils'
import { QueryClientContext } from '@/providers/query-client'

import '../styles/globals.css'

const geist = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'OdontoPRO',
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(geist.className, 'dark antialiased')}>
        <SessionAuthProvider>
          <QueryClientContext>
            <Toaster richColors theme="dark" position="top-right" />
            {children}
          </QueryClientContext>
        </SessionAuthProvider>
      </body>
    </html>
  )
}
