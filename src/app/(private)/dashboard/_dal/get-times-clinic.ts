'use server'

import { prisma } from '@/lib/prisma'

export async function getTimesClinic({ userId }: { userId: string }) {
  if (!userId) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        times: true,
      },
    })

    if (!user) {
      return {
        status: 404,
        error: 'Usuário não encontrado',
      }
    }

    return {
      status: 200,
      times: user.times,
      userId: user.id,
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Ocorreu um erro ao obter os horários da clínica',
    }
  }
}
