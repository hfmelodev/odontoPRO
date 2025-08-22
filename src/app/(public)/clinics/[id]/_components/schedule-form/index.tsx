'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const appointmentFormSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório').trim(),
  email: z.email('O email é obrigatório'),
  phone: z.string().nonempty('O telefone é obrigatório').trim(),
  date: z.date(),
  serviceId: z.cuid().nonempty('O serviço é obrigatório'),
})

export type AppointmentFormType = z.infer<typeof appointmentFormSchema>

export function useAppointmentForm() {
  return useForm<AppointmentFormType>({
    shouldUnregister: true,
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      serviceId: '',
      date: new Date(),
    },
  })
}
