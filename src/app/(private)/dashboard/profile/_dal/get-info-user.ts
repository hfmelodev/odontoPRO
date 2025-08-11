'use server'

import { prisma } from '@/lib/prisma'

type GetUserDataProps = {
  userId: string
}

export async function getUserData({ userId }: GetUserDataProps) {
  if (!userId) return null

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
      },
    })

    if (!user) return null

    return user
  } catch (err) {
    console.log(err)
    return null
  }
}
