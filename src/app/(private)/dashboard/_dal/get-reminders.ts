'use server'

import { prisma } from '@/lib/prisma'

type GetRemindersProps = {
  userId: string
}

export async function getReminders({ userId }: GetRemindersProps) {
  if (!userId) return []

  try {
    const reminders = await prisma.reminder.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return reminders
  } catch (err) {
    console.log(err)
    return []
  }
}
