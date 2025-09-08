'use client'

import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function ChoosePickerDate() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const dateFromUrl = searchParams.get('date')

  const [selectedDate, setSelectedDate] = useState<string>(
    dateFromUrl || format(new Date(), 'yyyy-MM-dd') // ✅ se tiver na URL, já usa
  )

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  function handleChangeDate(date: Date | undefined) {
    if (!date) return

    const formattedDate = format(date, 'yyyy-MM-dd')
    setSelectedDate(formattedDate)

    setIsCalendarOpen(false) // Fecha o calendário

    router.push(`/dashboard?date=${formattedDate}`)
  }

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('w-fit justify-start text-left font-normal text-sm hover:border-primary')}>
          <CalendarIcon />
          {format(parseISO(dateFromUrl || selectedDate), 'dd/MM/yyyy', { locale: ptBR }) || <span>Escolher data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate ? parseISO(selectedDate) : undefined} // ✅ converte string → Date
          onSelect={handleChangeDate}
          locale={ptBR}
          required
        />
      </PopoverContent>
    </Popover>
  )
}
