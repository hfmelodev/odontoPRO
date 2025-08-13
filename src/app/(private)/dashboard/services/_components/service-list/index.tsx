'use client'

import { Edit, PlusIcon, X } from 'lucide-react'
import { Fragment, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import type { Service } from '@/generated/prisma'
import { formatCurrency } from '@/utils/format-currency'
import { DialogService } from '../dialog-service'

type ServiceListProps = {
  services: Service[]
}

export function ServiceList({ services }: ServiceListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className="mx-auto max-w-5xl">
        <Card className="gap-4">
          <CardHeader className="mb-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-bold text-xl md:text-2xl">Serviços</CardTitle>
            <DialogTrigger asChild>
              <Button variant="outline" className="hover:border! transition-all duration-200 ease-in-out hover:border-primary!">
                <PlusIcon />
              </Button>
            </DialogTrigger>

            <DialogService setIsDialogOpen={setIsDialogOpen} />
          </CardHeader>

          {services.length === 0 && (
            <p className="mt-1.5 flex items-center justify-center text-muted-foreground text-sm">
              Você ainda não possui nenhum serviço cadastrado.
            </p>
          )}

          <CardContent>
            <section className="space-y-4">
              {services.map(service => (
                <Fragment key={service.id}>
                  <article className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm md:text-base">{service.name}</span>
                      <span className="text-muted-foreground">-</span>
                      <Badge variant="outline" className="border! border-primary! text-xs">
                        {formatCurrency(service.price / 100)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="hover:border! group hover:border-primary!">
                        <Edit className="group-hover:text-primary" />
                      </Button>

                      <Button variant="outline" className="hover:border! group hover:border-red-700!">
                        <X className="group-hover:text-red-700" />
                      </Button>
                    </div>
                  </article>
                  <Separator className="w-full" />
                </Fragment>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  )
}
