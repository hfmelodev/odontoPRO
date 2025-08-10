'use client'

import { Banknote, CalendarCheck2, Folder, List, PanelLeft, PanelRight, Stethoscope, User2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { NavLinks } from './nav-links'

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSibedarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar em modo Desktop */}
      <aside
        className={cn('flex h-full flex-col items-center border-r p-4 transition-all duration-300', {
          'w-20': isSibedarCollapsed,
          'w-64': !isSibedarCollapsed,
          'hidden md:fixed md:flex': true,
        })}
      >
        {!isSibedarCollapsed ? (
          <Link href="/" className="mt-2 mb-6 font-bold text-2xl">
            Odonto<span className="font-extrabold text-primary">PRO</span>
          </Link>
        ) : (
          <Link href="/" className="mt-2 mb-6 font-bold text-2xl">
            <Stethoscope className="font-bold text-primary" />
          </Link>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsSidebarCollapsed(!isSibedarCollapsed)}
              variant="outline"
              size="icon"
              className={cn('self-end', {
                'self-center': isSibedarCollapsed,
              })}
            >
              {isSibedarCollapsed ? <PanelRight /> : <PanelLeft />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={isSibedarCollapsed ? 'right' : 'top'}>
            <p>{isSibedarCollapsed ? 'Expandir' : 'Minimizar'}</p>
          </TooltipContent>
        </Tooltip>

        {isSibedarCollapsed && <Separator className="mt-3 mb-2" />}

        {/* Somente irá exibir se estiver em modo Mobile */}
        {isSibedarCollapsed && (
          <nav className="flex flex-col gap-2 overflow-hidden">
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
        )}

        {/* Somente irá exibir se estiver em modo Desktop */}
        <Collapsible open={!isSibedarCollapsed} className="mt-4 w-full self-start">
          <CollapsibleContent>
            <nav className="flex flex-col gap-2 overflow-hidden">
              <h3 className="font-semibold text-muted-foreground text-xs uppercase">Dashboard</h3>
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

              <Separator className="my-2" />

              <h3 className="font-semibold text-muted-foreground text-xs uppercase">Minha Conta</h3>
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
          </CollapsibleContent>
        </Collapsible>
      </aside>

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
                <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsSidebarCollapsed(false)}>
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
