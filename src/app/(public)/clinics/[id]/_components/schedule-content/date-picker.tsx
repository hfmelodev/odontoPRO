'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerTimerProps {
  minDate?: Date
  initialDate?: Date
  onChange: (date: Date) => void
}

export function DatePickerTimer({ minDate, initialDate, onChange }: DatePickerTimerProps) {
  const [startDate, setStartDate] = useState(initialDate || new Date())

  function handleChange(date: Date | null) {
    if (date) {
      console.log(date)
      setStartDate(date)
      onChange(date)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('w-full justify-start text-left font-normal', !startDate && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-1" />
          {startDate ? format(startDate, 'dd/MM/yyyy', { locale: ptBR }) : <span>Selecione a data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={handleChange}
          disabled={{ before: minDate || new Date() }}
          locale={ptBR}
          required
        />
      </PopoverContent>
    </Popover>
  )
}
