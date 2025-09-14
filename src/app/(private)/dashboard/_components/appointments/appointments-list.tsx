'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Calendar, Clock, Eye, Loader2, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { Prisma } from '@/generated/prisma'
import { formatDuration } from '@/utils/format-duration'
import { ChoosePickerDate } from './choose-date'
import { DeleteAppointment } from './delete-appointment'
import { DetailsAppointment } from './details-appointment'

type AppointmentsListProps = {
  times: string[]
}

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
  include: { service: true }
}>

export function AppointmentsList({ times }: AppointmentsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDialogOpenDetails, setIsDialogOpenDetails] = useState(false)

  const searchParams = useSearchParams()
  const date = searchParams.get('date') as string

  const { data, isPending: isPendingAppointments } = useQuery({
    queryKey: ['get-appointments', date],
    queryFn: async () => {
      let activeDate = date

      if (!activeDate) {
        const today = format(new Date(), 'yyyy-MM-dd')
        activeDate = today
      }

      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/clinic/appointments?date=${activeDate}`

      const response = await fetch(url)
      const data = (await response.json()) as AppointmentWithService[]

      if (!response.ok) {
        throw new Error('Erro ao buscar agendamentos')
      }

      return data
    },
    staleTime: 2000, // 2 segundos de cache para agendamentos
    refetchInterval: 60000, // 1 minuto de intervalo para agendamentos
  })

  // occupantMap vai guardar quais horários já estão ocupados e qual agendamento ocupa cada um.
  // A chave é o horário (string) e o valor é o agendamento.
  const occupantMap: Record<string, AppointmentWithService> = {}

  if (data && data.length > 0) {
    // Percorre cada agendamento existente
    for (const appointment of data) {
      // Calcula quantos blocos de 30 minutos esse agendamento ocupa
      const requiredSlots = Math.ceil(appointment.service.duration / 30)

      // Descobre a posição do horário inicial no array de horários disponíveis (times)
      const startIndex = times.indexOf(appointment.time)

      if (startIndex !== -1) {
        // Marca todos os blocos ocupados por esse agendamento
        for (let i = 0; i < requiredSlots; i++) {
          const slotIndex = startIndex + i
          if (slotIndex < times.length) {
            // Exemplo: se começou 09:00 e dura 1h, então marca 09:00 e 09:30 como ocupados
            occupantMap[times[slotIndex]] = appointment
          }
        }
      }
    }
  }

  return (
    <Card className="flex-1">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-1.5">
          <Calendar className="size-5" />
          Agendamentos
        </CardTitle>

        {/* COMPONENT: Escolher data do agendamento */}
        <ChoosePickerDate />
      </CardHeader>

      {times.length === 0 && (
        <div className="mx-2">
          <Separator />
        </div>
      )}

      <CardContent>
        <ScrollArea className="h-[calc(100vh-20rem)] pr-4 lg:h-[calc(100vh-15rem)]">
          {isPendingAppointments ? (
            <Button
              type="button"
              variant="ghost"
              className="mx-auto mt-[60%] flex items-center justify-center text-muted-foreground lg:mt-[40%]"
            >
              <Loader2 className="size-5 animate-spin" />
              <span className="ml-1">Carregando agendamentos...</span>
            </Button>
          ) : (
            times.map(slot => {
              const occupant = occupantMap[slot]

              if (occupant) {
                return (
                  <div key={slot} className="flex items-center border-b py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4" />
                      <span className="w-16 font-semibold text-sm">{slot}</span>
                    </div>
                    <Badge variant="outline" className="border! border-amber-600! text-[10px] text-xs">
                      Agendado
                    </Badge>
                    <div className="ml-4 flex flex-col gap-1 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-sm">{occupant.name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">{occupant.phone}</span>
                      </div>
                    </div>

                    <div className="ml-auto">
                      <div className="flex flex-col items-center gap-2 xl:flex-row">
                        <Dialog open={isDialogOpenDetails} onOpenChange={setIsDialogOpenDetails}>
                          <DialogTrigger asChild>
                            <Button size="icon" variant="outline" className="border! hover:border-primary!">
                              <Eye className="size-4" />
                            </Button>
                          </DialogTrigger>

                          {/* COMPONENT: Detalhes do agendamento */}
                          <DetailsAppointment appointment={occupant} />
                        </Dialog>

                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button size="icon" variant="outline" className="border! hover:border-destructive!">
                              <X className="size-4" />
                            </Button>
                          </DialogTrigger>

                          {/* COMPONENT: Deletar agendamento */}
                          <DeleteAppointment appointmentId={occupant.id} setIsDialogOpen={setIsDialogOpen} />
                        </Dialog>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <div key={slot} className="flex items-center border-b py-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    <span className="w-16 font-semibold text-sm">{slot}</span>
                  </div>
                  <Badge variant="outline" className="border! border-primary! text-xs">
                    Disponível
                  </Badge>
                </div>
              )
            })
          )}

          {times.length === 0 && (
            <div className="flex h-full items-center justify-center">
              <span className="text-muted-foreground text-sm">Você não possui agendamentos neste dia</span>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
