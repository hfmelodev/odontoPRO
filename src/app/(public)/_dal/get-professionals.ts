'use server'

import { prisma } from '@/lib/prisma'

export async function getProfessionals() {
  try {
    const professionals = await prisma.user.findMany({
      where: {
        status: true,
      },
      include: {
        subscription: true,
      },
      orderBy: {
        name: 'asc', // Ordena por nome em ordem alfabética
      },
    })

    return professionals
  } catch (err) {
    console.log(err)
    return []
  }
}
