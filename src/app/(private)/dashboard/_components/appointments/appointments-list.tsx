'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Calendar, Clock, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Prisma } from '@/generated/prisma'
import { formatDuration } from '@/utils/format-duration'

type AppointmentsListProps = {
  times: string[]
}

type AppointmentWithService = Prisma.AppointmentGetPayload<{
  include: { service: true }
}>

export function AppointmentsList({ times }: AppointmentsListProps) {
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

        <Button variant="outline">Selecionar data</Button>
      </CardHeader>

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
                    <Badge variant="outline" className="border! border-amber-600! text-[10px] lg:text-xs">
                      Agendado
                    </Badge>
                    <div className="ml-4 flex flex-col gap-1 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-sm">{occupant.name}</span>
                        <span className="ml-2 text-muted-foreground text-xs">{occupant.phone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">{occupant.service.name}</span>
                        <span className="text-muted-foreground text-xs">
                          Duração: {formatDuration(occupant.service.duration)}
                        </span>
                      </div>

                      <span className="text-muted-foreground text-xs">
                        {(occupant.service.price / 100).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
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
                  <Badge variant="outline" className="border! border-primary! text-[10px] lg:text-xs">
                    Disponível
                  </Badge>
                </div>
              )
            })
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
