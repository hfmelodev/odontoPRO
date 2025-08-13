'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const formSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório').trim(),
  price: z.number().positive('O preço deve ser maior que zero'),
  duration: z.number(),
})

type FormSchemaType = z.infer<typeof formSchema>

export async function createService(formData: FormSchemaType) {
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
      error: 'Ocorreu um erro ao criar o serviço',
    }
  }

  const serviceExists = await prisma.service.findFirst({
    where: {
      name: schema.data.name,
    },
  })

  if (serviceExists) {
    return {
      status: 400,
      error: 'Já existe um serviço com esse nome',
    }
  }

  try {
    await prisma.service.create({
      data: {
        name: schema.data.name,
        price: schema.data.price,
        duration: schema.data.duration,
        userId: session.user.id,
      },
    })

    revalidatePath('/dashboard/services')

    return {
      status: 200,
      message: 'Serviço criado com sucesso',
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Ocorreu um erro ao criar o serviço',
    }
  }
}
