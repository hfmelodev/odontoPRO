'use client'

import { CalendarCheck, CircleX, ClosedCaption, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Prisma } from '@/generated/prisma'
import { formatPhone } from '@/utils/format-phone'
import { type AppointmentFormType, useAppointmentForm } from '../schedule-form'
import { DatePickerTimer } from './date-picker'

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true
    services: true
  }
}>

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm()

  async function handleNewAppointment(formData: AppointmentFormType) {
    console.log(formData)
  }

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
        <div className="flex items-center justify-center px-4">
          <form
            onSubmit={form.handleSubmit(handleNewAppointment)}
            className="w-full space-y-6 rounded-md border p-5 shadow-sm md:max-w-2xl"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
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
                <FormItem className="space-y-1.5">
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
                <FormItem className="space-y-1.5">
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
                <FormItem className="space-y-1.5">
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
                <FormItem className="space-y-1.5">
                  <FormLabel className="font-semibold">Serviço</FormLabel>
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

            {clinic.status ? (
              <Button type="submit" className="w-full">
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
