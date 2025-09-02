'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const formSchema = z.object({
  reminderId: z.cuid().nonempty('ID do serviço é obrigatório').trim(),
})

type FormSchemaType = z.infer<typeof formSchema>

export async function deleteReminder(formData: FormSchemaType) {
  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      status: 400,
      error: 'Ocorreu um erro ao deletar o serviço',
    }
  }

  try {
    await prisma.reminder.delete({
      where: {
        id: schema.data.reminderId,
      },
    })

    revalidatePath('/dashboard')

    return {
      status: 200,
      message: 'Lembrete deletado com sucesso',
    }
  } catch (error) {
    console.log(error)
    return {
      status: 500,
      error: 'Ocorreu um erro ao deletar o serviço',
    }
  }
}
