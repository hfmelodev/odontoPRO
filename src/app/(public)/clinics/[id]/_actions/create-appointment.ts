'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const formSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório').trim(),
  email: z.email('O email é obrigatório'),
  phone: z.string().nonempty('O telefone é obrigatório').trim(),
  date: z.date(),
  serviceId: z.cuid('O serviço é obrigatório'),
  time: z.string().nonempty('O horário é obrigatório'),
  clinicId: z.cuid('A clínica é obrigatória'),
})

type AppointmentFormType = z.infer<typeof formSchema>

export async function createNewAppointment(formData: AppointmentFormType) {
  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      status: 400,
      error: 'Ocorreu um erro ao criar o agendamento',
    }
  }

  try {
    const selectDate = new Date(schema.data.date)

    const year = selectDate.getFullYear()
    const month = selectDate.getMonth()
    const day = selectDate.getDate()

    const appointmentDate = new Date(year, month, day, 0, 0, 0, 0)

    await prisma.appointment.create({
      data: {
        name: schema.data.name,
        email: schema.data.email,
        phone: schema.data.phone,
        appointmentDate,
        time: schema.data.time,
        serviceId: schema.data.serviceId,
        userId: schema.data.clinicId,
      },
    })

    return {
      status: 200,
      message: 'Agendamento realizado com sucesso',
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Ocorreu um erro ao criar o agendamento',
    }
  }
}
