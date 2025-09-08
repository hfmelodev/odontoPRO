import { BadgeCheck, CheckCircle, Crown, Gem } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { subscriptionPlans } from '../../_utils/plans'

export function GridPlans() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {subscriptionPlans.map((plan, index) => (
        <Card
          key={plan.id}
          className={cn(
            'relative py-0',
            index === 1 &&
              'hover:-translate-y-1 border border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/50'
          )}
        >
          {index === 0 && (
            <CardHeader className="rounded-t-md bg-muted p-4">
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

          {plan['name'] === 'Basic' && <CheckCircle className="absolute top-5 right-6" />}
          {plan['name'] === 'Professional' && <Gem className="absolute top-5 right-6" />}

          <CardContent>
            <ul className="relative flex flex-col">
              {plan.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="mb-2 border border-primary">
                  {feature}
                </Badge>
              ))}
            </ul>

            <div className="mt-2">
              <span className="text-muted-foreground text-sm line-through">{plan.oldPrice}</span>
              <p className="font-bold text-2xl">{plan.price}</p>
            </div>
          </CardContent>

          <CardFooter className="mt-auto mb-4 w-full px-4">
            <Button className="w-full font-semibold text-white" variant={index === 0 ? 'outline' : 'default'}>
              {index === 0 ? <BadgeCheck /> : <Crown />}
              Assinar agora
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}
