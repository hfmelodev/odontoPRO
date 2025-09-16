import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import SessionAuthProvider from '@/components/app/session-auth'
import { QueryClientContext } from '@/providers/query-client'

import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'OdontoPRO',
  description:
    'Nós somos uma plataforma para profissionais de saúde com foco em agilizar seu atendimento de forma simplificada e organizada.',
  icons: '/stethoscope.svg',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
