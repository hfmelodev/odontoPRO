import { Hourglass } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function LabelTrial() {
  return (
    <Card className="mx-auto mb-4 max-w-5xl border-yellow-300/40 bg-yellow-100/40 dark:bg-yellow-900/20">
      <CardContent className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-medium text-sm text-yellow-800 dark:text-yellow-300">Você está aproveitando o período de teste.</p>
          <p className="text-muted-foreground text-xs">
            Quando o trial acabar, será necessário escolher um plano para continuar utilizando a plataforma.
          </p>
        </div>

        <Link href="/dashboard/plans" className="self-start">
          <Button size="sm" className="gap-2" variant="secondary">
            <Hourglass className="size-4" />
            Escolher Plano
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
