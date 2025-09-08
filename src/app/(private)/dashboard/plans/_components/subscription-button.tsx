'use client'

import { BadgeCheck, Crown } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { TypePlans } from '@/generated/prisma'
import { getStringJs } from '@/lib/stripe-js'
import { createSubscription } from '../_actions/create-subscription'

type SubscriptionButtonProps = {
  planIndex: number
  type: TypePlans
}

export function SubscriptionButton({ planIndex: index, type }: SubscriptionButtonProps) {
  async function handleCreateBilling() {
    const response = await createSubscription({ type })

    if (response.error) {
      toast.error(response.error)
      return
    }

    const stripe = await getStringJs()

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: response.sessionId! })
    }

    toast.info(response.message)
  }

  return (
    <Button
      onClick={handleCreateBilling}
      className="w-full font-semibold text-white"
      variant={index === 0 ? 'outline' : 'default'}
    >
      {index === 0 ? <BadgeCheck /> : <Crown />}
      Assinar agora
    </Button>
  )
}
