'use client'

import { useSearchParams } from 'next/navigation'

type AppointmentsListProps = {
  times: string[]
}

export function AppointmentsList({ times }: AppointmentsListProps) {
  const searchParams = useSearchParams()
  const date = searchParams.get('date') as string

  console.log({
    times,
    date,
  })

  return <div>AppointmentsList</div>
}
