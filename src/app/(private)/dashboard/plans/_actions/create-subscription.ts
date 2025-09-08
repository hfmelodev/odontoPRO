'use server'

import type { TypePlans } from '@/generated/prisma'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

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

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return {
      status: 404,
      error: 'Usuário não encontrado',
    }
  }

  let customerId = user.stripeCustomerId

  // Aqui você criaria o cliente no Stripe e obteria o ID caso ele não exista
  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      name: user.name || undefined,
      email: user.email,
    })

    await prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: stripeCustomer.id },
    })

    customerId = stripeCustomer.id
  }

  try {
    // Criação da assinatura no Stripe
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price:
            type === 'BASIC' ? (process.env.STRIPE_PLAN_BASIC_ID as string) : (process.env.STRIPE_PLAN_PROFESSIONAL_ID as string),
          // Somente permitir a compra de uma unidade do plano
          quantity: 1,
        },
      ],
      metadata: {
        type,
      },
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    return {
      status: 200,
      sessionId: stripeCheckoutSession.id,
      message: 'Redirecionando para o checkout...',
    }
  } catch (err) {
    console.error(err)
    return {
      status: 500,
      error: 'Erro ao criar assinatura',
    }
  }
}
