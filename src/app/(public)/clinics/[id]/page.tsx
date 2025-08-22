import { redirect } from 'next/navigation'
import { ScheduleContent } from './_components/schedule-content'
import { getInfoSchedule } from './_dal/get-info-schedule'

export default async function SchedulePage({ params }: { params: Promise<{ id: string }> }) {
  const userId = (await params).id

  const user = await getInfoSchedule({ userId })

  if (!user) {
    redirect('/')
  }

  return <ScheduleContent />
}
