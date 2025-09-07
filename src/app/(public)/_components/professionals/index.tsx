'use client'

import { CalendarClock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { User } from '@/generated/prisma'

type ProfessionalsProps = {
  professionals: User[]
}

export function Professionals({ professionals }: ProfessionalsProps) {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-bold text-3xl">Clínicas disponíveis</h2>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {professionals.map(professional => (
            <Card
              key={professional.id}
              className="hover:-translate-y-2 overflow-hidden py-0 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
            >
              <CardContent className="p-0">
                <div className="relative h-58">
                  <Image
                    src={professional.image || ''}
                    alt={professional.name || 'Imagem do profissional'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>

                <div className="relative space-y-4 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{professional.name}</h3>
                      <p className="text-muted-foreground text-sm">{professional.address ?? 'Endereço não informado'}</p>
                    </div>

                    <div className="absolute top-4 right-4 flex size-2.5 animate-pulse items-center gap-2 rounded-full bg-primary" />
                  </div>

                  <Link href={`/clinics/${professional.id}`} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full font-semibold">
                      Agendar horário
                      <CalendarClock />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </section>
  )
}
