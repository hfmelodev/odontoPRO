'use server'

import type { TypePlans } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

type manageSubscriptionProps = {
  subscriptionId: string
  customerId: string
  createAction: boolean
  deleteAction: boolean
  type?: TypePlans
}

/**
 * Gerencia a assinatura do usuário no banco de dados.
 * Salva, atualiza ou exclui a assinatura conforme necessário.
 */
export async function manageSubscription({
  subscriptionId,
  customerId,
  createAction = false,
  deleteAction = false,
  type,
}: manageSubscriptionProps) {
  // findFirst busca o primeiro registro que corresponde aos critérios especificados
  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId: customerId,
    },
  })

  if (!user) {
    return Response.json({ error: 'Usuário não encontrado' }, { status: 400 })
  }

  // Busca a assinatura no Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscription.id,
    userId: user.id,
    status: subscription.status,
    priceId: subscription.items.data[0]?.price.id,
    plan: type ?? 'BASIC',
  }

  if (subscriptionId && deleteAction) {
    // Deleta a assinatura no banco de dados
    await prisma.subscription.delete({
      where: {
        id: subscriptionId,
      },
    })

    return Response.json({ message: 'Assinatura deletada com sucesso' }, { status: 200 })
  }

  if (createAction) {
    try {
      // Cria uma nova assinatura no banco de dados
      await prisma.subscription.create({
        data: subscriptionData,
      })

      return Response.json({ message: 'Assinatura criada com sucesso' }, { status: 200 })
    } catch (err) {
      console.log(err)
      return Response.json({ error: 'Erro ao criar assinatura' }, { status: 400 })
    }
  } else {
    try {
      const existingSubscription = await prisma.subscription.findUnique({
        where: {
          id: subscriptionId,
        },
      })

      if (!existingSubscription) {
        return Response.json({ error: 'Assinatura não encontrada' }, { status: 400 })
      }

      // Atualiza a assinatura no banco de dados
      await prisma.subscription.update({
        where: {
          id: subscriptionId,
        },
        data: subscriptionData,
      })

      return Response.json({ message: 'Assinatura atualizada com sucesso' }, { status: 200 })
    } catch (err) {
      console.log(err)
      return Response.json({ error: 'Erro ao atualizar assinatura' }, { status: 400 })
    }
  }
}
