'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { TimeSlotsProps } from '.'

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
  return (
    <div className="grid grid-cols-4 gap-2 md:grid-cols-5">
      {availableTimeSlots.map(timeSlot => {
        return (
          <Button
            key={timeSlot.time}
            type="button"
            variant={selectedTime === timeSlot.time ? 'default' : 'outline'}
            // disabled={blockedTimes.includes(timeSlot.time) || clinicTimes.includes(timeSlot.time) || requiredSlots <= 0}
            onClick={() => onSelectTime(timeSlot.time)}
            className={cn('select-none', selectedTime === timeSlot.time && 'text-white')}
          >
            {timeSlot.time}
          </Button>
        )
      })}
    </div>
  )
}
