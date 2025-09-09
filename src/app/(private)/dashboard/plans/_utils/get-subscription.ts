'use server'

import { prisma } from '@/lib/prisma'

export async function getSubscription({ userId }: { userId: string }) {
  if (!userId) return null

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    })

    return subscription
  } catch (err) {
    console.error(err)
    return null
  }
}
