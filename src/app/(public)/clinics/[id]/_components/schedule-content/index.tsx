'use client'

import { MapPin } from 'lucide-react'
import Image from 'next/image'

export function ScheduleContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-32 bg-primary" />

      <section className="-mt-22 container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <article className="flex flex-col items-center">
            <div className="relative mb-8 h-48 w-48 overflow-hidden rounded-full border-4 border-white">
              <Image src="/clinics.png" alt="Foto ilustrativa de uma clínica" fill className="object-cover" priority />
            </div>

            <h1 className="mb-2 font-bold text-2xl">Clínica de Odontologia</h1>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin />
              Rua C, 123, Centro
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
