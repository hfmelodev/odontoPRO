import { redirect } from 'next/navigation'
import getSession from '@/lib/session'

export default async function Dashboard() {
  const session = await getSession()

  if (!session) redirect('/')

  return (
    <main>
      <h1>Dashboard</h1>

      <div className="mb-10 h-[600px] w-full bg-gray-500" />
      <div className="mb-10 h-[600px] w-full bg-gray-900" />
    </main>
  )
}
