'use client'

import { BadgeCheck, Crown } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { TypePlans } from '@/generated/prisma'
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
    }

    toast.success(response.message)
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
