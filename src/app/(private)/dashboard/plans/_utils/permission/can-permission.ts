'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { canCreateService } from './can-create-service'
import type { PlanDetailInfo } from './get-plans'

export type PLAN_PROP = 'BASIC' | 'PROFESSIONAL' | 'EXPIRED' | 'TRIAL'

export type ResultPermissionProps = {
  hasPermission: boolean
  planId: PLAN_PROP
  expired: boolean
  plan: PlanDetailInfo | null
}

type CanPermissionProps = {
  type: 'service' | null
}

export async function canPermission({ type }: CanPermissionProps): Promise<ResultPermissionProps> {
  const session = await auth()

  if (!session) {
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    }
  }

  const subscription = await prisma.subscription.findUnique({
    where: {
      userId: session.user.id,
    },
  })

  switch (type) {
    case 'service': {
      const permission = await canCreateService({ subscription, session })

      return permission
    }

    default:
      return {
        hasPermission: true,
        planId: 'EXPIRED',
        expired: false,
        plan: null,
      }
  }
}
