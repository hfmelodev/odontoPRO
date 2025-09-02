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

type IsSlotSequenceAvailableProps = {
  startSlot: string
  requiredSlots: number
  allSlots: string[]
  blockedSlots: string[]
}

/**
 * Função que verifica se existe uma sequência de horários disponíveis
 * a partir de um horário inicial (startSlot), dentro de uma lista de slots (allSlots),
 * considerando uma quantidade necessária de slots consecutivos (requiredSlots)
 * e uma lista de horários que já estão bloqueados (blockedSlots).
 */
export function isSlotSequenceAvailable({ startSlot, requiredSlots, allSlots, blockedSlots }: IsSlotSequenceAvailableProps) {
  // Descobre o índice do slot inicial dentro da lista de todos os slots
  const startSlotIndex = allSlots.indexOf(startSlot)

  // Caso o slot inicial não exista na lista (-1)
  // ou não haja espaço suficiente até o fim do array para caber a quantidade necessária de slots
  if (startSlotIndex === -1 || startSlotIndex + requiredSlots > allSlots.length) {
    return false // não é possível reservar
  }

  // Percorre todos os slots necessários a partir do slot inicial
  for (let i = startSlotIndex; i < startSlotIndex + requiredSlots; i++) {
    const slotTime = allSlots[i]

    // Se algum desses slots estiver na lista de bloqueados, não dá para reservar
    if (blockedSlots.includes(slotTime)) {
      return false
    }
  }

  // Se chegou até aqui, significa que todos os slots estão livres
  return true
}
