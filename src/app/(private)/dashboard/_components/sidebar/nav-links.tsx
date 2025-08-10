import Link from 'next/link'
import { Button } from '@/components/ui/button'

type NavLinksProps = {
  href: string
  icon: React.ReactNode
  label: string
  pathname: string
  isCollapsed: boolean
}

export function NavLinks({ href, icon, label, pathname, isCollapsed }: NavLinksProps) {
  return (
    <Link href={href} className="mx-4">
      <Button
        variant={pathname === href ? 'default' : 'outline'}
        className="w-full justify-start transition-all duration-100 ease-in-out"
      >
        {icon}
        {!isCollapsed && <span>{label}</span>}
      </Button>
    </Link>
  )
}
