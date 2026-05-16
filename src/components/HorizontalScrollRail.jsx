import { useCallback, useEffect, useRef, useState } from 'react'

const THUMB_H = 6
const THUMB_W = 32
const THUMB_MIN_RATIO = 0.14
const REVEAL_DELAY_MS = 1000

/** @param {HTMLElement | null} el @param {number} trackW */
function thumbWidthFor(el, trackW) {
  const visibleRatio =
    el && el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1
  const proportional = trackW * Math.max(THUMB_MIN_RATIO, visibleRatio)
  return Math.max(THUMB_W, proportional)
}

/**
 * Centered mini track (~1.5 card widths) + amber pill thumb. Hides native bar on the target (`row-scroll`).
 * Visual scroll indicator only — not draggable; scroll the row via wheel, touch, or swipe.
 * @param {{ targetRef: React.RefObject<HTMLElement | null>, className?: string }} props
 */
export default function HorizontalScrollRail({ targetRef, className = '' }) {
  const trackRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const thumbRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const rafRef = useRef(0)
  const scrollableRef = useRef(false)
  const revealedRef = useRef(false)

  const [revealed, setRevealed] = useState(false)
  const [canScroll, setCanScroll] = useState(false)

  const reveal = useCallback(() => {
    if (revealedRef.current) return
    revealedRef.current = true
    setRevealed(true)
  }, [])

  const sync = useCallback(() => {
    const el = targetRef.current
    const track = trackRef.current
    const thumb = thumbRef.current
    if (!el || !track || !thumb) return

    const list = el.querySelector('ul')
    const first = list?.querySelector(':scope > li') ?? el.querySelector('li')
    const cardW = first ? first.getBoundingClientRect().width : 0
    const gapStr = getComputedStyle(list ?? el).gap || '0'
    const gap = parseFloat(gapStr) || 0

    const maxS = Math.max(0, el.scrollWidth - el.clientWidth)
    const cw = el.clientWidth
    const ideal = cardW > 0 ? cardW * 1.5 + gap : Math.min(360, cw * 0.45)
    const trackW = Math.max(96, Math.min(ideal, cw - 32))

    track.style.width = `${Math.round(trackW)}px`

    const scrollable = maxS > 0
    scrollableRef.current = scrollable
    setCanScroll(scrollable)

    if (!scrollable) {
      thumb.style.left = '0px'
      thumb.style.width = `${THUMB_W}px`
      thumb.style.height = `${THUMB_H}px`
      return
    }

    const thumbW = thumbWidthFor(el, trackW)
    const travel = Math.max(0, trackW - thumbW)
    const ratio = el.scrollLeft / maxS
    const x = ratio * travel

    thumb.style.width = `${thumbW}px`
    thumb.style.height = `${THUMB_H}px`
    thumb.style.left = `${x}px`
  }, [targetRef])

  const scheduleSync = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(sync)
  }, [sync])

  useEffect(() => {
    const el = targetRef.current
    if (!el) return

    const onScroll = () => {
      reveal()
      scheduleSync()
    }

    sync()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', scheduleSync, { passive: true })

    const revealTimer = window.setTimeout(() => {
      if (scrollableRef.current) reveal()
    }, REVEAL_DELAY_MS)

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => scheduleSync())
        : null
    if (ro) ro.observe(el)

    return () => {
      window.clearTimeout(revealTimer)
      cancelAnimationFrame(rafRef.current)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', scheduleSync)
      ro?.disconnect()
    }
  }, [targetRef, reveal, scheduleSync, sync])

  const showRail = canScroll && revealed

  return (
    <div
      className={`scroll-rail ${showRail ? 'scroll-rail--revealed' : 'scroll-rail--hidden'} ${className}`.trim()}
    >
      <div
        ref={trackRef}
        className="scroll-rail__track"
        aria-hidden={!canScroll}
      >
        <div ref={thumbRef} className="scroll-rail__thumb" aria-hidden />
      </div>
    </div>
  )
}
