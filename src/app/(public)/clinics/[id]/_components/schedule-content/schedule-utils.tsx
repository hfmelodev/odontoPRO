/**
 *
 * Verifica se uma data é hoje
 *
 * @param date Data a ser verificada
 */
export function isToday(date: Date) {
  const today = new Date()

  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}

/**
 *
 * Verifica se um slot está no passado
 *
 * @param slotTime Horário do slot
 */
export function isSlotInThePast(slotTime: string) {
  const [slotHour, slotMinute] = slotTime.split(':').map(Number)

  const today = new Date()
  const currentHour = today.getHours()
  const currentMinute = today.getMinutes()

  // Verifica se a hora do agendamento é anterior ao horário atual com base nas horas e minutos
  return slotHour < currentHour || (slotHour === currentHour && slotMinute <= currentMinute)
}
