'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const formSchema = z.object({
  avatarUrl: z.url().nonempty('A URL da imagem é obrigatória'),
})

type FormData = z.infer<typeof formSchema>

export async function updateAvatar(formData: FormData) {
  const session = await auth()

  if (!session) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      status: 400,
      error: 'Ocorreu um erro ao atualizar a imagem',
    }
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: schema.data.avatarUrl,
      },
    })

    revalidatePath('/dashboard/profile')

    return {
      status: 200,
      message: 'Imagem atualizada com sucesso',
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Ocorreu um erro ao atualizar a imagem',
    }
  }
}
