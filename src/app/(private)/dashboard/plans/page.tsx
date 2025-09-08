import getSession from '@/lib/session'
import { getSubscription } from '@/utils/get-subscription'
import { GridPlans } from './_components/grid-plans'

export default async function Plans() {
  const session = await getSession()

  const subscription = await getSubscription({ userId: session?.user.id! })

  return <div>{subscription?.status ? <div>Você tem uma assinatura ativa</div> : <GridPlans />}</div>
}
