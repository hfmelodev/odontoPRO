'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const formSchema = z.object({
  appointmentId: z.cuid().trim().nonempty('ID do agendamento é obrigatório'),
})

type FormSchemaType = z.infer<typeof formSchema>

export async function cancelAppointment(formData: FormSchemaType) {
  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      status: 400,
      error: 'Ocorreu um erro ao cancelar o agendamento',
    }
  }

  const session = await auth()

  if (!session) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  try {
    await prisma.appointment.delete({
      where: {
        id: schema.data.appointmentId,
        userId: session.user.id,
      },
    })

    revalidatePath('/dashboard')

    return {
      status: 200,
      message: 'Agendamento cancelado com sucesso',
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Ocorreu um erro ao cancelar o agendamento',
    }
  }
}
