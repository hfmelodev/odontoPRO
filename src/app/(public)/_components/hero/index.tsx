import { Search } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section>
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <main className="mt-2 flex items-center justify-center">
          <article className="flex max-w-3xl flex-[2] flex-col justify-center space-y-4 md:space-y-8">
            <h1 className="max-w-2xl font-bold text-4xl tracking-tight lg:text-5xl">
              Encontre os melhores profissionais em um único local!
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              Nós somos uma plataforma para profissionais de saúde com foco em agilizar seu atendimento de forma simplificada e
              organizada.
            </p>
            <Button className="mt-4 flex w-fit items-center font-semibold">
              <Search />
              Encontre uma clínica
            </Button>
          </article>

          <div className="hidden lg:block">
            <Image
              src="/doctor-hero.png"
              alt="Foto ilustrativa de um profissional da saúde"
              className="object-contain"
              width={340}
              height={400}
              quality={100}
              priority
            />
          </div>
        </main>
      </div>
    </section>
  )
}
