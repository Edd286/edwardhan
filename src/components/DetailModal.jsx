import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Code2, ExternalLink, FileText, PlayCircle } from 'lucide-react'
import { isFilledLink } from '../utils/links.js'

/**
 * @param {{ item: import('../data/portfolioData.js').PortfolioItem | null, onClose: () => void }} props
 */
export default function DetailModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, onClose])

  useEffect(() => {
    if (!item) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [item])

  const node =
    typeof document !== 'undefined' ? document.body : null

  if (!node) return null

  return createPortal(
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            aria-label="Close details"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="relative z-10 m-0 max-h-[min(92vh,880px)] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-zinc-200 bg-white shadow-2xl sm:m-4 sm:rounded-2xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div
              className={`relative h-40 w-full bg-gradient-to-br sm:h-48 ${item.gradient}`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover opacity-90"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex rounded-full border border-zinc-700/80 bg-black/40 p-2 text-zinc-100 backdrop-blur transition hover:bg-black/60"
              >
                <X className="size-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            <div className="space-y-6 px-5 pb-8 pt-2 sm:px-8 sm:pb-10">
              <header className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400/90">
                  {item.category}
                </p>
                <h2
                  id="detail-title"
                  className="heading-display font-display text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  {item.title}
                </h2>
                <p className="text-muted text-sm">{item.subtitle}</p>
              </header>

              <div className="flex flex-wrap gap-2">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <DetailBlock title="Summary" body={item.detail.summary} />
              <DetailBlock title="Problem / context" body={item.detail.problem} />
              <DetailBlock title="What I built" body={item.detail.built} />
              <DetailBlock
                title="Technologies"
                body={item.detail.technologies.join(' · ')}
              />
              <DetailBlock title="Impact / results" body={item.detail.impact} />

              <LinksRow links={item.links} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    node,
  )
}

/** @param {{ title: string, body: string }} props */
function DetailBlock({ title, body }) {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{body}</p>
    </section>
  )
}

/** @param {{ links?: Record<string, string | undefined> }} props */
function LinksRow({ links = {} }) {
  const entries = [
    { key: 'github', label: 'GitHub', href: links.github, Icon: Code2 },
    { key: 'demo', label: 'Live demo', href: links.demo, Icon: ExternalLink },
    { key: 'report', label: 'Report / paper', href: links.report, Icon: FileText },
    { key: 'video', label: 'Video', href: links.video, Icon: PlayCircle },
  ].filter((l) => isFilledLink(l.href))

  if (!entries.length) return null

  return (
    <section className="divider-t space-y-3 pt-6">
      <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Links</h3>
      <div className="flex flex-wrap gap-2">
        {entries.map(({ key, label, href, Icon }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-800 transition hover:border-amber-500/50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:text-white"
          >
            <Icon className="size-3.5" aria-hidden />
            {label}
          </a>
        ))}
      </div>
    </section>
  )
}
