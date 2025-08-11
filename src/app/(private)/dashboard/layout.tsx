import { redirect } from 'next/navigation'
import getSession from '@/lib/session'
import { SidebarDashboard } from './_components/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session) redirect('/')

  return <SidebarDashboard>{children}</SidebarDashboard>
}
