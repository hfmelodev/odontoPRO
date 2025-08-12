'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const formSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório'),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timezone: z.string().nonempty('O fuso horário é obrigatório'),
  times: z.array(z.string()),
})

type FormSchemaType = z.infer<typeof formSchema>

export async function updateProfile(formData: FormSchemaType) {
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
      error: 'Ocorreu um erro ao atualizar o perfil',
    }
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: schema.data.name,
        address: schema.data.address,
        phone: schema.data.phone,
        status: schema.data.status,
        timezone: schema.data.timezone,
        times: schema.data.times || [],
      },
    })

    revalidatePath('/dashboard/profile')

    return {
      status: 200,
      message: 'Perfil atualizado com sucesso',
    }
  } catch (err) {
    console.log(err)

    return {
      status: 500,
      error: 'Ocorreu um erro ao atualizar o perfil',
    }
  }
}
