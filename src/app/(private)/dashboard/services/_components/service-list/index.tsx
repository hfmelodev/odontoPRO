'use client'

import { Edit, PlusIcon, X } from 'lucide-react'
import { Fragment, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import type { Service } from '@/generated/prisma'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/format-currency'
import { DialogService } from '../dialog-service'
import { DeleteService } from './delete-service'

type ServiceListProps = {
  services: Service[]
}

export function ServiceList({ services }: ServiceListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editService, setEditService] = useState<null | Service>(null)

  function handleUpdateService(service: Service) {
    setEditService(service)
    setIsDialogOpen(true)
  }

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

            <DialogService
              setIsDialogOpen={() => {
                setIsDialogOpen(false)
                setEditService(null)
              }}
              serviceId={editService ? editService.id : undefined}
              initialValues={
                editService
                  ? {
                      name: editService.name,
                      price: formatCurrency(editService.price / 100),
                      hours: Math.floor(editService.duration / 60).toString(),
                      minutes: (editService.duration % 60).toString(),
                    }
                  : undefined
              }
            />
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
                      <span
                        className={cn(
                          'font-medium text-sm md:text-base',
                          !service.status && 'text-muted-foreground line-through'
                        )}
                      >
                        {service.name}
                      </span>
                      <span className="text-muted-foreground">-</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          'border! border-primary! text-xs',
                          !service.status && 'border-muted! text-muted-foreground line-through'
                        )}
                      >
                        {formatCurrency(service.price / 100)}
                      </Badge>
                      {!service.status && (
                        <Badge variant="destructive" className="text-xs">
                          Desativado
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="hover:border! group hover:border-primary!"
                        onClick={() => handleUpdateService(service)}
                      >
                        <Edit className="group-hover:text-primary" />
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="hover:border! group hover:border-red-700!"
                            disabled={!service.status}
                          >
                            <X className="group-hover:text-red-700" />
                          </Button>
                        </DialogTrigger>

                        <DeleteService serviceId={service.id} />
                      </Dialog>
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
