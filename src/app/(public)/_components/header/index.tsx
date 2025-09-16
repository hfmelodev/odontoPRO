'use client'

import { LayoutDashboard, LoaderCircle, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { handleRegister } from '../../_actions/authenticate'

export function Header() {
  const { data: session, status } = useSession()

  async function handleAuthentication() {
    await handleRegister('google')
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b bg-muted/40 px-6 py-4 shadow-muted shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl">
          Odonto<span className="font-extrabold text-primary">PRO</span>
        </Link>

        {status === 'loading' ? (
          <Button>
            <LoaderCircle className="animate-spin" />
            Carregando...
          </Button>
        ) : session ? (
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 rounded-sm bg-muted px-3 py-2 font-medium text-sm transition-colors hover:bg-muted/50 hover:text-primary"
          >
            <LayoutDashboard className="size-5 text-primary" />
            <span>Painel da Clínica</span>
          </Link>
        ) : (
          <Button className="mt-2 md:mt-0" onClick={handleAuthentication}>
            <LogIn />
            Acessar Clínica
          </Button>
        )}
      </div>
    </header>
  )
}
