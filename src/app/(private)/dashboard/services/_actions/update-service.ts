'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const formSchema = z.object({
  serviceId: z.cuid().nonempty('ID do serviço é obrigatório').trim(),
  name: z.string().nonempty('O nome é obrigatório').trim(),
  price: z.number().positive('O preço deve ser maior que zero'),
  duration: z.number(),
})

type FormSchema = z.infer<typeof formSchema>

export async function updateService({ name, price, duration }: FormSchema) {
  const session = await auth()

  if (!session) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  const schema = formSchema.safeParse({ name, price, duration })

  if (!schema.success) {
    return {
      status: 400,
      error: 'Ocorreu um erro ao deletar o serviço',
    }
  }

  const serviceExists = await prisma.service.findUnique({
    where: {
      id: schema.data.serviceId,
      userId: session.user.id,
    },
  })

  if (!serviceExists) {
    return {
      status: 400,
      error: 'Serviço inexistente',
    }
  }

  try {
    await prisma.service.update({
      where: {
        id: schema.data.serviceId,
        userId: session.user.id,
      },
      data: {
        name: schema.data.name,
        price: schema.data.price,
        duration: schema.data.duration,
      },
    })

    revalidatePath('/dashboard/services')

    return {
      status: 200,
      message: 'Serviço alterado com sucesso',
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Ocorreu um erro ao alterar o serviço',
    }
  }
}
