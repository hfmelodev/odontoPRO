import { auth } from '@/lib/auth'
import { ServiceContent } from './_components/service-content'

export default async function Services() {
  const session = await auth()

  return <ServiceContent userId={session!.user.id} />
}
