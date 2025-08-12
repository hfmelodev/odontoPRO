import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type NavLinksProps = {
  href: string
  icon: React.ReactNode
  label: string
  pathname: string
  isCollapsed: boolean
  setIsSheetOpen: (open: boolean) => void
}

export function NavLinks({ href, icon, label, pathname, isCollapsed, setIsSheetOpen }: NavLinksProps) {
  return (
    <Link href={href} className="mx-4 sm:mx-0">
      {!isCollapsed ? (
        <Button
          variant={pathname === href ? 'default' : 'outline'}
          className="w-full justify-start transition-all duration-100 ease-in-out"
          onClick={() => setIsSheetOpen(false)}
        >
          {icon}
          {!isCollapsed && <span>{label}</span>}
        </Button>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              {icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </Link>
  )
}
