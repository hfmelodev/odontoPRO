'use client'

import { Settings } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Subscription } from '@/generated/prisma'
import { subscriptionPlans } from '../../_utils/plans'

type SubscriptionDetailProps = {
  subscription: Subscription
}

export function SubscriptionDetail({ subscription }: SubscriptionDetailProps) {
  const subscriptionInfo = subscriptionPlans.find(plan => plan.id === subscription.plan)

  if (!subscriptionInfo) return null

  async function handleManagerSubscription() {
    console.log('Gerenciar assinatura')
  }

  return (
    <Card className="relative mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl">Seu Plano Atual</CardTitle>
        <CardDescription>Você possui um plano ativo no momento.</CardDescription>
      </CardHeader>

      <div className="px-4">
        <Separator />
      </div>

      <Badge className="absolute top-5 right-2 mx-4 mt-0 mb-2 border border-primary" variant="outline">
        <div className="size-2 animate-pulse rounded-full bg-primary" />
        Ativo
      </Badge>

      <CardContent>
        <h3 className="mb-2 font-semibold text-lg md:text-xl">{subscription.plan === 'BASIC' ? 'BÁSICO' : 'PROFISSIONAL'}</h3>

        <ul className="relative flex flex-col">
          {subscriptionInfo.features.map((feature, index) => (
            <Badge key={index} variant="outline" className="mb-2 border border-primary">
              {feature}
            </Badge>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto w-full">
        <Button className="w-full" variant="outline" onClick={handleManagerSubscription}>
          <Settings />
          Gerenciar Assinatura
        </Button>
      </CardFooter>
    </Card>
  )
}
