import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { auth } from '@/lib/auth'
import { ServiceContent } from './_components/service-content'

export default async function Services() {
  const session = await auth()

  return (
    <Suspense fallback={<LoadingServices />}>
      <ServiceContent userId={session!.user.id} userCreationDate={session!.user.createdAt} />
    </Suspense>
  )
}

function LoadingServices() {
  return (
    <div className="mt-40 flex items-center justify-center gap-1.5 text-base text-muted-foreground">
      <Loader2 className="animate-spin" />
      Carregando serviços...
    </div>
  )
}
