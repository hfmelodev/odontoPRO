import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import SessionAuthProvider from '@/components/app/session-auth'
import { QueryClientContext } from '@/providers/query-client'

import '../styles/globals.css'

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
      <body className="dark font-geist antialiased">
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
