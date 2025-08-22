'use client'
import { ptBR } from 'date-fns/locale'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type DatePickerTimerProps = {
  minDate?: Date
  initialDate?: Date
  onChange: (date: Date) => void
}

export function DatePickerTimer({ minDate, initialDate, onChange }: DatePickerTimerProps) {
  const [open, setOpen] = React.useState(false)
  const [startDate, setStartDate] = React.useState<Date | undefined>(initialDate)

  const handleSelect = (date: Date | undefined) => {
    if (!date) return

    setStartDate(date)
    onChange(date)
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-48 justify-between font-normal">
            {startDate ? startDate.toLocaleDateString('pt-BR') : 'Selecione uma data'}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            locale={ptBR}
            mode="single"
            selected={startDate}
            onSelect={handleSelect}
            captionLayout="dropdown"
            disabled={date => !!minDate && date < minDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
