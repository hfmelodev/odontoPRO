'use server'

import { addDays, differenceInDays, isAfter } from 'date-fns'
import { prisma } from '@/lib/prisma'
import { TRIAL_DAYS } from './trial-limits'

export async function checkSubscription({ userId }: { userId: string }) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      subscription: true,
    },
  })

  if (!user) {
    throw new Error('Usuário não encontrado')
  }

  if (user.subscription && user.subscription.status === 'active') {
    return {
      subscriptionStatus: 'active',
      message: 'Você possui um plano ativo.',
      planId: user.subscription.plan,
    }
  }

  const trialEndDate = addDays(user.createdAt, TRIAL_DAYS)

  if (isAfter(new Date(), trialEndDate)) {
    return {
      subscriptionStatus: 'EXPIRED',
      message: 'Seu período de teste expirou. Por favor, escolha um plano para continuar utilizando a plataforma.',
      planId: 'TRIAL',
    }
  }

  const daysRemaining = differenceInDays(trialEndDate, new Date())

  return {
    subscriptionStatus: 'TRIAL',
    numberMaxDays: daysRemaining,
    planId: 'TRIAL',
  }
}
