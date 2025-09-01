'use client'

import { CalendarCheck, CircleX, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import type { Prisma } from '@/generated/prisma'
import { formatPhone } from '@/utils/format-phone'
import { createNewAppointment } from '../../_actions/create-appointment'
import { type AppointmentFormType, useAppointmentForm } from '../schedule-form'
import { DatePickerTimer } from './date-picker'
import { ScheduleTimeList } from './schedule-time-list'

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true
    services: true
  }
}>

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription
}

export type TimeSlotsProps = {
  time: string
  available: boolean
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm()

  const selectedDate = form.watch('date')
  const selectedServiceId = form.watch('serviceId')

  const [selectedTime, setSelectedTime] = useState('')
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlotsProps[]>([])
  const [blockedTimes, setBlockedTimes] = useState<string[]>([])

  // Busca quais horários estão bloqueados para agendamento
  const fetchBlockedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      try {
        const dateString = date.toISOString().split('T')[0]

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`
        )

        const data = await response.json()

        return data
      } catch (err) {
        console.log(err)
        return []
      }
    },
    [clinic.id]
  )

  useEffect(() => {
    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then(blockedTimes => {
        setBlockedTimes(blockedTimes)

        const times = clinic.times || []

        const finalSlotsAvailables = times.map(time => ({
          time,
          available: !blockedTimes.includes(time),
        }))

        // Verifica se o horário selecionado ainda está disponível de acordo com os horários bloqueados
        const stillAvailable = finalSlotsAvailables.find(slot => slot.time === selectedTime && slot.available)
        // Se não estiver mais disponível, limpa o horário selecionado
        if (!stillAvailable) {
          setSelectedTime('')
        }

        setAvailableTimeSlots(finalSlotsAvailables)
      })
    }
  }, [selectedDate, fetchBlockedTimes, clinic.times, selectedTime])

  async function handleNewAppointment(formData: AppointmentFormType) {
    if (!selectedTime) {
      toast.warning('Por favor, selecione um horário')
      return
    }

    const response = await createNewAppointment({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: selectedTime,
      serviceId: formData.serviceId,
      clinicId: clinic.id,
    })

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success(response.message)

    form.reset()
    setSelectedTime('')
  }

  // Busca o serviço selecionado da clínica atual
  const selectedService = clinic.services.find(service => service.id === selectedServiceId)

  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-32 bg-primary" />

      <section className="-mt-22 container mx-auto mb-10 px-4">
        <div className="mx-auto max-w-3xl">
          <article className="flex flex-col items-center">
            <div className="relative mb-8 h-48 w-48 overflow-hidden rounded-full border-4 border-white">
              <Image
                src={clinic.image ? clinic.image : '/user.svg'}
                alt="Foto ilustrativa de uma clínica"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>

            <h1 className="mb-2 font-bold text-2xl">{clinic.name}</h1>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin />
              {clinic.address ? clinic.address : 'Endereço não informado'}
            </div>
          </article>
        </div>
      </section>

      {/* Formulário de agendamento */}
      <Form {...form}>
        <div className="mb-10 flex items-center justify-center px-4">
          <form
            onSubmit={form.handleSubmit(handleNewAppointment)}
            className="w-full space-y-6 rounded-md border p-5 shadow-sm md:max-w-2xl"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="font-semibold">
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Digite o nome completo"
                      disabled={!clinic.status}
                      className="text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="font-semibold">
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Digite o seu e-mail"
                      disabled={!clinic.status}
                      className="text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone" className="font-semibold">
                    Telefone
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      placeholder="(99) 99999-9999"
                      className="text-sm"
                      disabled={!clinic.status}
                      {...field}
                      onChange={e => {
                        const formattedValue = formatPhone(e.target.value)
                        field.onChange(formattedValue)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Data do agendamento</FormLabel>
                  <FormControl>
                    <DatePickerTimer
                      disabled={!clinic.status}
                      initialDate={new Date()}
                      onChange={(date: Date) => {
                        if (date) {
                          field.onChange(date)
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Escolha o serviço</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full text-sm md:w-[50%]" disabled={!clinic.status}>
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clinic.services.map(service => (
                        <SelectItem key={service.id} value={service.id} className="flex items-center justify-between py-2">
                          <span className="font-medium">{service.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-primary font-semibold text-xs">
                              R$ {(service.price / 100).toFixed(2)}
                            </Badge>
                            {service.duration > 0 && (
                              <span className="text-muted-foreground text-sm">
                                {Math.floor(service.duration / 60) > 0 && `${Math.floor(service.duration / 60)}h`}
                                {service.duration % 60 > 0 && ` ${service.duration % 60}min`}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedServiceId && (
              <div className="space-y-2">
                <Label className="font-semibold">Horários disponíveis</Label>

                <div className="rounded-md bg-muted/40 p-3">
                  {selectedDate && availableTimeSlots.length === 0 ? (
                    // ainda não carregou nada
                    <div className="grid grid-cols-4 gap-1 md:grid-cols-5">
                      <Skeleton className="h-8 w-20 rounded-md" />
                      <Skeleton className="h-8 w-20 rounded-md" />
                      <Skeleton className="h-8 w-20 rounded-md" />
                      <Skeleton className="h-8 w-20 rounded-md" />
                      <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                  ) : availableTimeSlots.length > 0 ? (
                    // COMPONENT: Schedule Time List
                    <ScheduleTimeList
                      onSelectTime={time => setSelectedTime(time)}
                      clinicTimes={clinic.times}
                      blockedTimes={blockedTimes}
                      availableTimeSlots={availableTimeSlots}
                      selectedTime={selectedTime}
                      selectedDate={selectedDate}
                      requiredSlots={selectedService ? Math.ceil(selectedService.duration / 30) : 1}
                    />
                  ) : (
                    <p className="text-center text-muted-foreground text-sm">Nenhum horário disponível para este serviço</p>
                  )}
                </div>
              </div>
            )}

            {clinic.status ? (
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                <CalendarCheck />
                Realizar agendamento
              </Button>
            ) : (
              <Button disabled variant="destructive" className="w-full">
                <CircleX />
                Clínica fechada no momento
              </Button>
            )}
          </form>
        </div>
      </Form>
    </div>
  )
}
