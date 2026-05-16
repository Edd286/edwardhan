import { useCallback, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import HorizontalScrollRail from './HorizontalScrollRail.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import PortfolioCard from './PortfolioCard.jsx'
import DetailModal from './DetailModal.jsx'
import { LoadReveal } from './LoadReveal.jsx'
import {
  contentRows,
  getItemsForRow,
  portfolioItems,
} from '../data/portfolioData.js'

export default function ChapterPage() {
  const { rowId } = useParams()
  const [activeItemId, setActiveItemId] = useState(null)
  const scrollerRef = useRef(/** @type {HTMLUListElement | null} */ (null))

  const row = useMemo(
    () => contentRows.find((r) => r.id === rowId) ?? null,
    [rowId],
  )

  const items = useMemo(() => (row ? getItemsForRow(row) : []), [row])

  const activeItem =
    activeItemId && portfolioItems[activeItemId]
      ? portfolioItems[activeItemId]
      : null

  const closeModal = useCallback(() => setActiveItemId(null), [])

  const scrollBy = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.65), behavior: 'smooth' })
  }

  if (!rowId || !row) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="surface-page min-h-screen">
      <Navbar />
      <main className="pb-24 pt-[5.25rem] md:pt-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <LoadReveal className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </Link>
          </LoadReveal>

          <LoadReveal as="header" className="divider-b mb-8 pb-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-500/80">
              Category
            </p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
              <h1 className="heading-display font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {row.title}
              </h1>
              <div className="hidden gap-1 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollBy(-1)}
                  className="rounded-full border border-zinc-300 bg-white/80 p-2 text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollBy(1)}
                  className="rounded-full border border-zinc-300 bg-white/80 p-2 text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </LoadReveal>
        </div>

        <div className="relative">
          <div
            className="fade-edge-x pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r to-transparent md:w-12"
            aria-hidden
          />
          <div
            className="fade-edge-x pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l to-transparent md:w-12"
            aria-hidden
          />

          <ul
            ref={scrollerRef}
            className="row-scroll flex list-none gap-4 overflow-x-auto overflow-y-visible overscroll-x-contain touch-pan-y px-4 py-4 md:gap-5 md:px-8 md:py-6"
            aria-label={`${row.title} entries`}
          >
            {items.map((item) => (
              <LoadReveal key={item.id} as="li" className="shrink-0 py-1">
                <PortfolioCard
                  item={item}
                  layout="portrait-scroll"
                  onOpen={() => setActiveItemId(item.id)}
                />
              </LoadReveal>
            ))}
          </ul>
          <HorizontalScrollRail
            targetRef={scrollerRef}
            className="pointer-events-auto relative z-20 -mt-1 flex justify-center px-4 pb-0 pt-1 md:px-8"
          />
        </div>
      </main>
      <Footer />
      <DetailModal item={activeItem} onClose={closeModal} />
    </div>
  )
}
