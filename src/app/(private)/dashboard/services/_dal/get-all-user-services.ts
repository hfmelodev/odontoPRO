'use server'

import { prisma } from '@/lib/prisma'

export async function getAllUserServices({ userId }: { userId: string }) {
  if (!userId) {
    return {
      status: 401,
      error: 'Falha ao obter os serviços do usuário',
    }
  }

  try {
    const services = await prisma.service.findMany({
      where: {
        userId,
      },
    })

    console.log(services)

    if (!services) {
      return {
        status: 404,
        error: 'Nenhum serviço ainda encontrado',
      }
    }

    return {
      status: 200,
      services,
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Falha ao obter os serviços do usuário',
    }
  }
}
