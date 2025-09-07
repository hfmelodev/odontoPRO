'use client'

import { Calendar, Clock, Mail, Phone, User } from 'lucide-react'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/utils/format-currency'
import { formatDuration } from '@/utils/format-duration'
import type { AppointmentWithService } from './appointments-list'

type DetailsAppointmentProps = {
  appointment: AppointmentWithService | null
}

export function DetailsAppointment({ appointment }: DetailsAppointmentProps) {
  if (!appointment) return null

  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Detalhes do agendamento</DialogTitle>
        <DialogDescription>Confira as informações do agendamento</DialogDescription>
      </DialogHeader>

      <div className="mb-3">
        <Separator />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <User className="text-primary" />
          <h2 className="font-semibold text-lg">{appointment.name}</h2>
        </div>

        <div className="flex flex-col gap-2 rounded-md border bg-muted/40 p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">{appointment.service.name}</p>
            <p className="text-muted-foreground text-sm">Valor: {formatCurrency(appointment.service.price / 100)}</p>
          </div>
          <span className="text-muted-foreground text-sm">Duração: {formatDuration(appointment.service.duration)}</span>
        </div>

        {/* Data e Hora */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {new Intl.DateTimeFormat('pt-BR', {
                timeZone: 'UTC',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              }).format(new Date(appointment.appointmentDate))}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{appointment.time}</span>
          </div>
        </div>

        <Separator />

        {/* Contato */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{appointment.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{appointment.email}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}
