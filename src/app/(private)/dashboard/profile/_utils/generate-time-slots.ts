type GenerateTimeSlotsProps = {
  startHour: number
  endHour: number
  intervalMinutes?: number
}

export function generateTimeSlots({ startHour, endHour, intervalMinutes }: GenerateTimeSlotsProps): string[] {
  const interval = intervalMinutes ?? 60 // Por padrão, o intervalo é de 60 minutos
  const timeSlots: string[] = []

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
    }
  }

  return timeSlots
}
