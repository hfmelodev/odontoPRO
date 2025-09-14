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
import type { ResultPermissionProps } from '../../../plans/_utils/permission/can-permission'
import { DialogService } from '../dialog-service'
import { DeleteService } from './delete-service'

type ServiceListProps = {
  services: Service[]
  permission: ResultPermissionProps
}

export function ServiceList({ services, permission }: ServiceListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const serviceList = permission.hasPermission ? services : services.slice(0, 3)

  async function handleUpdateService(service: Service) {
    setEditingService(service)
    setIsDialogOpen(true)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className="mx-auto max-w-5xl">
        <Card className="gap-4">
          <CardHeader className="mb-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-bold text-xl md:text-2xl">Serviços</CardTitle>
            {permission.hasPermission ? (
              <DialogTrigger asChild>
                <Button
                  onClick={() => setEditingService(null)}
                  variant="outline"
                  className="hover:border! transition-all duration-200 ease-in-out hover:border-primary!"
                >
                  <PlusIcon />
                </Button>
              </DialogTrigger>
            ) : (
              <div className="flex items-center gap-2">
                <p className="animate-pulse font-medium text-destructive text-sm">Limites de serviços atingidos</p>
                <Button variant="outline" className="cursor-not-allowed">
                  <PlusIcon />
                </Button>
              </div>
            )}

            {/* Conteudo que será exibido quando o dialog estiver aberto */}
            <DialogService
              key={
                editingService
                  ? `${editingService.id}-${editingService.name}-${editingService.price}-${editingService.duration}`
                  : 'create'
              }
              setIsDialogOpen={setIsDialogOpen}
              serviceId={editingService ? editingService.id : undefined}
              initialValues={
                editingService
                  ? {
                      name: editingService.name,
                      price: (editingService.price / 100).toFixed(2).replace('.', ','),
                      hours: Math.floor(editingService.duration / 60).toString(),
                      minutes: (editingService.duration % 60).toString(),
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
              {serviceList.map(service => (
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
