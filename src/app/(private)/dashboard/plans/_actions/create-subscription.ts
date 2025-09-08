'use server'

import type { TypePlans } from '@/generated/prisma'
import { auth } from '@/lib/auth'

type CreateSubscriptionProps = {
  type: TypePlans
}

export async function createSubscription({ type }: CreateSubscriptionProps) {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  console.log('Criar cobrança para o plano selecionado:', type)

  return {
    status: 200,
    message: 'Cobrança criada com sucesso',
  }
}
