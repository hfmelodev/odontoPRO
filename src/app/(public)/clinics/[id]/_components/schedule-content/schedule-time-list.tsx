'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { TimeSlotsProps } from '.'
import { isSlotInThePast, isSlotSequenceAvailable, isToday } from './schedule-utils'

type ScheduleTimeListProps = {
  selectedDate: Date
  selectedTime: string
  requiredSlots: number
  blockedTimes: string[]
  availableTimeSlots: TimeSlotsProps[]
  clinicTimes: string[]
  onSelectTime: (time: string) => void
}

export function ScheduleTimeList({
  selectedDate,
  selectedTime,
  requiredSlots,
  blockedTimes,
  availableTimeSlots,
  clinicTimes,
  onSelectTime,
}: ScheduleTimeListProps) {
  const dateIsToday = isToday(selectedDate)

  return (
    <div className="grid grid-cols-4 gap-2 md:grid-cols-5">
      {availableTimeSlots.map(timeSlot => {
        // Verifica se o horário atual está no passado e se o horário do slot atual está no passado
        const slotIsPast = dateIsToday && isSlotInThePast(timeSlot.time)

        const isSequenceAvailable = isSlotSequenceAvailable({
          startSlot: timeSlot.time,
          requiredSlots,
          allSlots: clinicTimes,
          blockedSlots: blockedTimes,
        })

        const slotEnabled = timeSlot.available && isSequenceAvailable && !slotIsPast

        return (
          <Button
            key={timeSlot.time}
            type="button"
            variant={selectedTime === timeSlot.time ? 'default' : 'outline'}
            onClick={() => slotEnabled && onSelectTime(timeSlot.time)}
            disabled={!slotEnabled}
            className={cn('select-none', selectedTime === timeSlot.time && 'text-white')}
          >
            {timeSlot.time}
          </Button>
        )
      })}
    </div>
  )
}
