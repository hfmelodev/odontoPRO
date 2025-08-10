'use client'

import { LayoutDashboard, Link as LinkIcon, LoaderCircle, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { handleRegister } from '../../_actions/authenticate'

type NavItemsProps = {
  setIsSheetOpen: (open: boolean) => void
}

export function NavItems({ setIsSheetOpen }: NavItemsProps) {
  const { data: session, status } = useSession()

  const navItems = [
    {
      label: 'Profissionais',
      href: '#professional',
    },
    {
      label: 'Recepcionistas',
      href: '#receptionists',
    },
  ]

  async function handleAuthentication() {
    await handleRegister('github')
  }

  return (
    <>
      {navItems.map(item => (
        <div key={item.href} className="ml-2.5 flex flex-col items-start">
          <Button asChild variant="ghost" onClick={() => setIsSheetOpen(false)}>
            <Link href={item.href}>
              <LinkIcon />
              {item.label}
            </Link>
          </Button>
        </div>
      ))}

      <Separator className="md:hidden" />

      {status === 'loading' ? (
        <Button>
          <LoaderCircle className="animate-spin" />
          Carregando...
        </Button>
      ) : session ? (
        <Link
          href="/dashboard"
          className="mx-4 flex items-center justify-center gap-2 rounded-sm bg-muted px-3 py-2 font-medium text-sm transition-colors hover:bg-muted/50 hover:text-primary"
        >
          <LayoutDashboard className="size-5 text-primary" />
          <span>Painel da Clínica</span>
        </Link>
      ) : (
        <Button className="mx-6 mt-2 md:mt-0" onClick={handleAuthentication}>
          <LogIn />
          Acessar Clínica
        </Button>
      )}
    </>
  )
}
