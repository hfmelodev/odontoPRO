'use client'

import { Package } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function LabelSubscription({ expired }: { expired: boolean }) {
  return (
    <Card className="mx-auto mb-4 max-w-5xl border-destructive/30 bg-destructive/10">
      <CardContent className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-medium text-destructive text-sm">
            {expired ? 'Seu plano expirou ou você não possui um plano ativo.' : 'Você excedeu o limite do seu plano.'}
          </p>
          <p className="text-muted-foreground text-xs">Acesse o seu plano para verificar os detalhes.</p>
        </div>

        <Link href="/dashboard/plans" className="self-start">
          <Button size="sm" className="gap-2" variant="outline">
            <Package className="size-4" />
            Acessar Planos
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
