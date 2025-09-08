'use server'

import { prisma } from '@/lib/prisma'

export async function getSubscription({ userId }: { userId: string }) {
  if (!userId) {
    return {
      status: 400,
      message: 'Usuário não autenticado',
    }
  }

  try {
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId,
      },
    })

    return subscription
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      message: 'Erro ao buscar assinatura',
    }
  }
}
