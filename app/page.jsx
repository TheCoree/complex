import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Visualization } from "@/components/visualization"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Visualization />
      <Features />
      <Footer />
    </main>
  )
}
