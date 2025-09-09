'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function createPortalCustomer() {
  const session = await auth()

  if (!session) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  if (!user) {
    return {
      status: 404,
      error: 'Usuário não encontrado',
    }
  }

  const sessionId = user.stripeCustomerId

  if (!sessionId) {
    return {
      status: 400,
      error: 'Nenhuma assinatura encontrada',
    }
  }

  try {
    // Cria uma sessão de portal para o cliente dentro do Stripe
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sessionId,
      return_url: process.env.STRIPE_SUCCESS_URL as string,
    })

    return {
      status: 200,
      url: portalSession.url,
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Ocorreu um erro ao criar o portal de pagamento',
    }
  }
}
