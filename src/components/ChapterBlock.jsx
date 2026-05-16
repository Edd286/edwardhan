import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { LoadReveal } from './LoadReveal.jsx'
import CardBackArt from './CardBackArt.jsx'

/**
 * Playing-card shaped category tile. Set `cardBackImage` in `contentRows` to use a custom back.
 * @param {{ rowId: string, title: string, count: number, index: number, cardBackVariant?: string, cardBackImage?: string, embedInArc?: boolean }} props
 */
export default function ChapterBlock({
  rowId,
  title,
  count,
  index,
  cardBackVariant = 'ember',
  cardBackImage = '',
  embedInArc = false,
}) {
  const hasImage = typeof cardBackImage === 'string' && cardBackImage.trim().length > 0
  const imageSrc = !hasImage
    ? ''
    : cardBackImage.startsWith('http') || cardBackImage.startsWith('data:')
      ? cardBackImage
      : `${import.meta.env.BASE_URL}${cardBackImage.replace(/^\//, '')}`

  return (
    <LoadReveal
      className={`shrink-0 w-[16rem] px-1 sm:w-[17.5rem] ${embedInArc ? 'py-1' : 'py-3'}`}
    >
      <Link
        to={`/chapter/${rowId}`}
        style={{ aspectRatio: '5 / 7' }}
        className="card-elevated card-elevated-hover group relative isolate block w-full overflow-hidden rounded-2xl border-2 border-zinc-300/60 bg-zinc-100 transition hover:-translate-y-1 hover:border-amber-500/40 dark:border-zinc-500/50 dark:bg-zinc-900 dark:hover:border-amber-500/35"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[0.9rem]">
          {hasImage ? (
            <img
              src={imageSrc}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <CardBackArt variant={cardBackVariant} />
          )}
          <div className="pointer-events-none absolute inset-0 rounded-[0.9rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent px-3 pb-3 pt-14 sm:px-4 sm:pb-4 sm:pt-16">
          <h2 className="font-display text-left text-sm font-semibold leading-snug tracking-tight text-white drop-shadow-md sm:text-base">
            {title}
          </h2>
          <p className="mt-1 text-left text-[11px] text-zinc-400 sm:text-xs">
            {count} {count === 1 ? 'entry' : 'entries'}
          </p>
        </div>

        <span className="pointer-events-none absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/35 text-zinc-300 backdrop-blur-sm transition group-hover:bg-black/50 group-hover:text-amber-300/90 sm:right-3 sm:top-3">
          <ChevronRight className="size-4" aria-hidden />
        </span>
      </Link>
    </LoadReveal>
  )
}
