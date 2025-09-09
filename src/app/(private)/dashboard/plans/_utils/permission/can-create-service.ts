'use server'

import type { Session } from 'next-auth'
import type { Subscription } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { PLANS } from '../plans'
import type { ResultPermissionProps } from './can-permission'
import { checkSubscriptionExpired } from './check-subscription-expired'
import { getPlans } from './get-plans'

type CanCreateServiceProps = {
  subscription: Subscription | null
  session: Session
}

export async function canCreateService({ subscription, session }: CanCreateServiceProps): Promise<ResultPermissionProps> {
  try {
    const serviceCount = await prisma.service.count({
      where: {
        userId: session.user.id,
      },
    })

    // verifica se o plano atual permite criar mais serviços
    if (subscription && subscription.status === 'active') {
      const planId = subscription.plan
      const planLimits = await getPlans({ planId })

      console.log({ planLimits })

      return {
        // verifica se o plano atual permite criar mais serviços ou se o plano atual tem limite de serviços
        hasPermission: planLimits.maxServices === null || serviceCount <= planLimits.maxServices,
        planId: subscription.plan,
        expired: false,
        plan: PLANS[subscription.plan],
      }
    }

    // verifica se o plano trial acabou ou se o plano trial tem limite de serviços
    const checkUserLimit = await checkSubscriptionExpired(session)

    return checkUserLimit
  } catch (err) {
    console.error(err)
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    }
  }
}
