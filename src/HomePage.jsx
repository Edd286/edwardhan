import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ChapterArcScroll from './components/ChapterArcScroll.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { LoadReveal } from './components/LoadReveal.jsx'
import { contentRows } from './data/portfolioData.js'

export default function HomePage() {
  return (
    <div className="surface-page min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <section
          id="work"
          aria-label="Portfolio work"
          className="surface-section divider-t py-8 md:py-10"
        >
          <LoadReveal className="mx-auto max-w-5xl px-4 pb-4 text-center md:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Explore
            </p>
          </LoadReveal>

          <div className="relative">
            <div
              className="fade-edge-x pointer-events-none absolute inset-y-0 left-0 z-20 w-6 bg-gradient-to-r to-transparent md:w-8"
              aria-hidden
            />
            <div
              className="fade-edge-x pointer-events-none absolute inset-y-0 right-0 z-20 w-6 bg-gradient-to-l to-transparent md:w-8"
              aria-hidden
            />

            <ChapterArcScroll rows={contentRows} />
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
