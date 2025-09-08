import { type NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

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

      console.log('Assinatura excluída:', paymentDeleted.id)

      // Lógica para lidar com a exclusão da assinatura no banco de dados

      break
    }
    case 'customer.subscription.updated': {
      const paymentUpdated = event.data.object as Stripe.Subscription

      console.log('Assinatura atualizada:', paymentUpdated.id)

      // Lógica para lidar com a atualização da assinatura no banco de dados

      break
    }
    case 'checkout.session.completed': {
      const checkoutSession = event.data.object as Stripe.Checkout.Session

      console.log('Sessão de checkout concluída:', checkoutSession.id)

      // Lógica para lidar com a conclusão da sessão de checkout no banco de dados

      break
    }
    default:
      console.warn(`Tipo de evento não tratado: ${event.type}`)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
