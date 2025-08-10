import { Footer } from './_components/footer'
import { Header } from './_components/header'
import { Hero } from './_components/hero'
import { Professionals } from './_components/professionals'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <div>
        <Hero />
        <Professionals />
        <Footer />
      </div>
    </main>
  )
}
