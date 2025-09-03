import { getTimesClinic } from '../../_dal/get-times-clinic'
import { AppointmentsList } from './appointments-list'

type AppointmentsProps = {
  userId: string
}

export async function Appointments({ userId }: AppointmentsProps) {
  const { times } = await getTimesClinic({ userId })

  return <AppointmentsList times={times || []} />
}
