import { Star, User2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { subscriptionPlans } from '../../_utils/plans'

export function GridPlans() {
  return (
    <div>
      {subscriptionPlans.map((plan, index) => (
        <Card key={plan.id} className="relative mb-4 py-0">
          {index === 0 && (
            <CardHeader className="rounded-md p-4">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
          )}

          {index === 1 && (
            <CardHeader className="rounded-t-md bg-primary/40 p-4">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-white">{plan.description}</CardDescription>
            </CardHeader>
          )}

          {plan['name'] === 'Basic' && <User2 className="absolute top-5 right-6" />}
          {plan['name'] === 'Professional' && <Star className="absolute top-5 right-6" />}

          <CardContent>
            <ul className="relative flex flex-col">
              {plan.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="mb-2 border border-primary">
                  {feature}
                </Badge>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
