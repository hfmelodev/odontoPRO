import { getReminders } from '../../_dal/get-reminders'
import { ReminderList } from './reminder-list'

type RemindersProps = {
  userId: string
}

export async function Reminders({ userId }: RemindersProps) {
  const reminders = await getReminders({ userId })

  return <ReminderList reminders={reminders} />
}
