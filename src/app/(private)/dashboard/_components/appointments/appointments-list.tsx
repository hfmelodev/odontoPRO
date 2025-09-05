'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Calendar, Clock } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

type AppointmentsListProps = {
  times: string[]
}

export function AppointmentsList({ times }: AppointmentsListProps) {
  const searchParams = useSearchParams()
  const date = searchParams.get('date') as string

  const { data: appointments, isPending: isPendingAppointments } = useQuery({
    queryKey: ['get-appointments', date],
    queryFn: async () => {
      let activeDate = date

      if (!activeDate) {
        const today = format(new Date(), 'yyyy-MM-dd')
        activeDate = today
      }

      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/clinic/appointments?date=${activeDate}`

      const response = await fetch(url)
      const data = await response.json()

      console.log({ data })

      if (!response.ok) {
        throw new Error(data?.error || 'Erro ao buscar agendamentos')
      }

      return data
    },
  })

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
          {times.map(slot => {
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
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
