'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const formSchema = z.object({
  description: z.string().trim().nonempty('A descrição do lembrete é obrigatória'),
})

type FormSchemaType = z.infer<typeof formSchema>

export async function createReminder(formData: FormSchemaType) {
  const schema = formSchema.safeParse(formData)

  const session = await auth()

  if (!session) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  if (!schema.success) {
    return {
      status: 400,
      error: 'Ocorreu um erro ao criar o lembrete',
    }
  }

  try {
    await prisma.reminder.create({
      data: {
        description: schema.data.description,
        userId: session.user.id,
      },
    })

    revalidatePath('/dashboard')

    return {
      status: 200,
      message: 'Lembrete criado com sucesso',
    }
  } catch (error) {
    console.log(error)
    return {
      status: 500,
      error: 'Ocorreu um erro ao criar o lembrete',
    }
  }
}
