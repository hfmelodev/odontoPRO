'use client'

import { motion } from 'framer-motion'
import { Building2, CalendarClock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Prisma } from '@/generated/prisma'
import { PremiumBadge } from '../premium-bagde'

type UserWithSubscription = Prisma.UserGetPayload<{
  include: { subscription: true }
}>

type ProfessionalsProps = {
  professionals: UserWithSubscription[]
}

export function Professionals({ professionals }: ProfessionalsProps) {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-bold text-3xl">Clínicas disponíveis</h2>

        {professionals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center rounded-2xl border border-muted-foreground/30 border-dashed p-8 shadow-sm"
          >
            <Building2 className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="font-medium text-base text-muted-foreground">Nenhuma clínica cadastrada</p>
            <p className="text-muted-foreground/70 text-sm">Adicione sua primeira clínica para começar.</p>
          </motion.div>
        )}

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

                  {professional.subscription?.status === 'active' && professional.subscription?.plan === 'PROFESSIONAL' && (
                    <PremiumBadge />
                  )}
                </div>

                <div className="relative flex min-h-[160px] flex-col justify-between space-y-4 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{professional.name}</h3>
                      <p className="line-clamp-2 text-muted-foreground text-sm">
                        {professional.address ?? 'Endereço não informado'}
                      </p>
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
