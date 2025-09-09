'use server'

import { addDays, isAfter } from 'date-fns'
import type { Session } from 'next-auth'
import type { ResultPermissionProps } from './can-permission'

const TRIAL_DAYS = 3

export async function checkSubscriptionExpired(session: Session): Promise<ResultPermissionProps> {
  // Data de fim do trial, baseada na data de criação do usuário
  const trialEndDate = addDays(session.user.createdAt, TRIAL_DAYS)

  // Verificar se a data do trial acabou
  if (isAfter(new Date(), trialEndDate)) {
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    }
  }

  return {
    hasPermission: true,
    planId: 'TRIAL',
    expired: false,
    plan: null,
  }
}
