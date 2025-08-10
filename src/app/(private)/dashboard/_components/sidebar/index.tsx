'use client'

import { Banknote, CalendarCheck2, Folder, List, User2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { NavLinks } from './nav-links'

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSibedarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen w-full">
      <div
        className={cn('flex flex-1 flex-col transition-all duration-300 ease-in-out', {
          'md:ml-20': isSibedarCollapsed,
          'md:ml-64': !isSibedarCollapsed,
        })}
      >
        {/* Sidebar em modo Mobile */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-muted/40 px-2 shadow-muted shadow-sm backdrop-blur-md md:hidden md:px-6">
          <Sheet>
            <div className="flex items-center gap-2.5">
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <List />
                </Button>
              </SheetTrigger>

              <h1 className="flex items-center font-semibold md:text-lg">
                Menu Odonto<span className="text-primary">PRO</span>
              </h1>
            </div>

            <SheetContent className="sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>
                  Odonto<span className="font-semibold text-primary">PRO</span>
                </SheetTitle>
                <SheetDescription className="pb-2">Menu Administrativo</SheetDescription>
                <Separator />
              </SheetHeader>

              <nav className="grid gap-2">
                <h3 className="ml-4 font-semibold text-muted-foreground text-xs uppercase">Dashboard</h3>
                <NavLinks
                  href="/dashboard"
                  icon={<CalendarCheck2 />}
                  label="Agendamentos"
                  pathname={pathname}
                  isCollapsed={isSibedarCollapsed}
                />
                <NavLinks
                  href="/dashboard/services"
                  icon={<Folder />}
                  label="Serviços"
                  pathname={pathname}
                  isCollapsed={isSibedarCollapsed}
                />

                <div className="my-1" />

                <h3 className="ml-4 font-semibold text-muted-foreground text-xs uppercase">Minha Conta</h3>
                <NavLinks
                  href="/dashboard/profile"
                  icon={<User2 />}
                  label="Perfil"
                  pathname={pathname}
                  isCollapsed={isSibedarCollapsed}
                />
                <NavLinks
                  href="/dashboard/plans"
                  icon={<Banknote />}
                  label="Planos"
                  pathname={pathname}
                  isCollapsed={isSibedarCollapsed}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 px-2 py-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
