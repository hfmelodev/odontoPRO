import { CalendarClock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function Professionals() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-bold text-3xl">Clínicas disponíveis</h2>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="overflow-hidden py-0">
              <CardContent className="p-0">
                <div>
                  <div className="relative h-48">
                    <Image src="/clinics.png" alt="Foto ilustrativa de uma clínica" fill className="object-cover" />
                  </div>
                </div>

                <div className="space-y-4 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Clínica de Odontologia</h3>
                      <p className="text-muted-foreground text-sm">Rua C, 123, Centro</p>
                    </div>

                    <div className="size-2.5 animate-pulse rounded-full bg-primary" />
                  </div>

                  <Link href="/clinic/18sd56syh21">
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
