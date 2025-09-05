'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cancelAppointment } from '../../_actions/cancel-appointment'

type DeleteAppointmentProps = {
  appointmentId: string
  setIsDialogOpen: (open: boolean) => void
}

export function DeleteAppointment({ appointmentId, setIsDialogOpen }: DeleteAppointmentProps) {
  const queryClient = useQueryClient()

  async function handleCancelAppointment(appointmentId: string) {
    const response = await cancelAppointment({ appointmentId })

    if (response.error) {
      toast.error(response.error)
      return
    }

    // Invalida a query de agendamentos para recarregá-la
    queryClient.invalidateQueries({ queryKey: ['get-appointments'] })

    toast.success(response.message)
  }

  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Deletar agendamento</DialogTitle>
        <DialogDescription>Tem certeza que deseja deletar esse agendamento?</DialogDescription>
      </DialogHeader>

      <Button
        variant="destructive"
        className="w-full"
        onClick={() => {
          handleCancelAppointment(appointmentId)
          setIsDialogOpen(false)
        }}
      >
        <Trash />
        Deletar
      </Button>
    </DialogContent>
  )
}
