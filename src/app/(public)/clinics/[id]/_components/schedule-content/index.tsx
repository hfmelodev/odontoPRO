'use client'

import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { Prisma } from '@/generated/prisma'
import { useAppointmentForm } from '../schedule-form'

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
          <form className="w-full space-y-6 rounded-md border p-5 shadow-sm md:max-w-2xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="font-semibold">Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do serviço" className="text-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </div>
      </Form>
    </div>
  )
}
