import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import type { TypePlans } from '@/generated/prisma'
import { stripe } from '@/lib/stripe'
import { manageSubscription } from '@/utils/manager-subscription'

export async function POST(request: NextRequest) {
  // Busca a assinatura do cabeçalho da requisição Stripe
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature found' }, { status: 400 })
  }

  const text = await request.text()

  const event = stripe.webhooks.constructEvent(text, signature, process.env.STRIPE_WEBHOOK_SECRET_KEY as string)

  switch (event.type) {
    case 'customer.subscription.deleted': {
      const paymentDeleted = event.data.object as Stripe.Subscription

      // Lógica para lidar com a exclusão da assinatura no banco de dados
      await manageSubscription({
        subscriptionId: paymentDeleted.id,
        customerId: paymentDeleted.customer as string,
        createAction: false,
        deleteAction: true,
      })

      break
    }
    case 'customer.subscription.updated': {
      const paymentUpdated = event.data.object as Stripe.Subscription

      // Lógica para lidar com a atualização da assinatura no banco de dados
      await manageSubscription({
        subscriptionId: paymentUpdated.id,
        customerId: paymentUpdated.customer as string,
        createAction: false,
        deleteAction: false,
      })

      break
    }
    case 'checkout.session.completed': {
      const checkoutSession = event.data.object as Stripe.Checkout.Session

      // Lógica para lidar com a conclusão da sessão de checkout no banco de dados
      if (checkoutSession.mode === 'subscription' && checkoutSession.subscription && checkoutSession.customer) {
        await manageSubscription({
          subscriptionId: checkoutSession.subscription as string,
          customerId: checkoutSession.customer as string,
          createAction: true,
          deleteAction: false,
          type: checkoutSession.metadata?.type as TypePlans,
        })
      }

      break
    }
    default:
      console.warn(`Tipo de evento não tratado: ${event.type}`)
  }

  revalidatePath('/dashboard/plans')

  return NextResponse.json({ received: true }, { status: 200 })
}
