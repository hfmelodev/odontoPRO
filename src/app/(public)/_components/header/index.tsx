'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { NavItems } from './nav-items'

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b bg-muted/40 px-6 py-4 shadow-muted shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl">
          Odonto <span className="font-extrabold text-primary">PRO</span>
        </Link>

        <nav className="hidden items-center space-x-4 md:flex">
          <NavItems setIsSheetOpen={setIsSheetOpen} />
        </nav>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="border-b">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Veja nossos links 😉</SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col space-y-3">
              <NavItems setIsSheetOpen={setIsSheetOpen} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
