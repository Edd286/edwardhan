import { motion } from 'framer-motion'
import { ExternalLink, Code2, FileText, PlayCircle } from 'lucide-react'
import { isFilledLink } from '../utils/links.js'

/**
 * @param {{ item: import('../data/portfolioData.js').PortfolioItem, onOpen: () => void, layout?: 'row' | 'portrait-scroll' }} props
 */
export default function PortfolioCard({ item, onOpen, layout = 'row' }) {
  const { links = {} } = item
  const isPortraitScroll = layout === 'portrait-scroll'

  return (
    <motion.article
      layout={layout === 'row'}
      whileHover={
        isPortraitScroll
          ? { scale: 1.03, y: -3 }
          : { scale: 1.04, y: -4 }
      }
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={
        isPortraitScroll
          ? 'group relative w-[min(46vw,11.5rem)] shrink-0 cursor-pointer px-1 py-2 sm:w-52 md:w-56'
          : 'group relative w-[220px] cursor-pointer px-1 py-2 sm:w-[240px] md:w-[260px]'
      }
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500/80"
      >
        <div
          className={`card-elevated card-elevated-hover relative isolate w-full overflow-hidden rounded-lg bg-gradient-to-br border border-zinc-200/80 transition group-hover:border-amber-500/35 dark:border-zinc-600/70 ${
            isPortraitScroll ? 'aspect-[3/4]' : 'aspect-video'
          } ${item.gradient}`}
        >
          {item.image ? (
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 opacity-40 mix-blend-screen">
              <div className="absolute -left-6 top-10 h-36 w-36 rounded-full bg-amber-400/30 blur-3xl" />
              <div className="absolute bottom-4 right-0 h-28 w-28 rounded-full bg-indigo-500/25 blur-3xl" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3 pt-12 sm:pt-14">
            <p className="text-[10px] font-medium uppercase tracking-wider text-amber-300/90">
              {item.subtitle}
            </p>
            <h3
              className={`font-display font-semibold leading-snug text-white ${
                isPortraitScroll
                  ? 'mt-1 text-xs sm:text-sm'
                  : 'text-sm md:text-base'
              }`}
            >
              {item.title}
            </h3>
          </div>
        </div>

        <div
          className={`mt-2.5 space-y-2 px-0.5 ${
            isPortraitScroll ? 'min-h-[4.5rem]' : ''
          }`}
        >
          <p
            className={`leading-relaxed text-zinc-400 ${
              isPortraitScroll
                ? 'line-clamp-3 text-[11px] sm:text-xs'
                : 'line-clamp-2 text-xs'
            }`}
          >
            {item.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {item.tech.slice(0, isPortraitScroll ? 3 : 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 text-[10px] text-zinc-300"
              >
                {t}
              </span>
            ))}
            {item.tech.length > (isPortraitScroll ? 3 : 4) ? (
              <span className="rounded-full border border-zinc-800 px-2 py-0.5 text-[10px] text-zinc-500">
                +{item.tech.length - (isPortraitScroll ? 3 : 4)}
              </span>
            ) : null}
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-500">
            <span>{item.year}</span>
            <span className="inline-flex gap-2 text-zinc-400">
              {isFilledLink(links.github) ? (
                <Code2 className="size-3.5" aria-label="GitHub" />
              ) : null}
              {isFilledLink(links.demo) ? (
                <ExternalLink className="size-3.5" aria-label="Demo" />
              ) : null}
              {isFilledLink(links.report) ? (
                <FileText className="size-3.5" aria-label="Report" />
              ) : null}
              {isFilledLink(links.video) ? (
                <PlayCircle className="size-3.5" aria-label="Video" />
              ) : null}
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  )
}
