'use client'

import { LayoutDashboard, Link as LinkIcon, LogIn } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type NavItemsProps = {
  setIsSheetOpen: (open: boolean) => void
}

export function NavItems({ setIsSheetOpen }: NavItemsProps) {
  const session = null

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

      {session ? (
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 font-medium text-sm transition-colors hover:bg-muted hover:text-primary"
        >
          <LayoutDashboard className="size-5 text-primary" />
          <span>Painel da Clínica</span>
        </Link>
      ) : (
        <Button className="mx-6">
          <Link href="/login" className="flex items-center justify-center gap-1.5">
            <LogIn />
            Acessar Clínica
          </Link>
        </Button>
      )}
    </>
  )
}
