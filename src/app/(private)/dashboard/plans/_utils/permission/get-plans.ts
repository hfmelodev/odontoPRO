'use server'

import type { TypePlans } from '@/generated/prisma'
import type { PlansProps } from '../plans'

export type PlanDetailInfo = {
  maxServices: number
}

const PLANS_LIMITS: PlansProps = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 50,
  },
}

export async function getPlans({ planId }: { planId: TypePlans }) {
  return PLANS_LIMITS[planId]
}
