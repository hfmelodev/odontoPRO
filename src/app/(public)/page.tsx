import { Footer } from './_components/footer'
import { Header } from './_components/header'
import { Hero } from './_components/hero'
import { Professionals } from './_components/professionals'
import { getProfessionals } from './_dal/get-professionals'

export const revalidate = 120 // revalida a cada 2 minutos o conteúdo desta página

export default async function Home() {
  const professionals = await getProfessionals()

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <div>
        <Hero />
        <Professionals professionals={professionals || []} />
        <Footer />
      </div>
    </main>
  )
}
