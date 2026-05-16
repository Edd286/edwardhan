import { useCallback, useEffect, useRef, useState } from 'react'

const THUMB_H = 6
const THUMB_W_IDLE = 32
const THUMB_W_DRAG = 40
const THUMB_MIN_RATIO = 0.14
const REVEAL_DELAY_MS = 1000

/** @param {HTMLElement | null} el @param {number} trackW @param {boolean} dragging */
function thumbWidthFor(el, trackW, dragging) {
  const visibleRatio =
    el && el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1
  const proportional = trackW * Math.max(THUMB_MIN_RATIO, visibleRatio)
  return dragging
    ? Math.max(THUMB_W_DRAG, proportional)
    : Math.max(THUMB_W_IDLE, proportional)
}

/**
 * Centered mini track (~1.5 card widths) + amber pill thumb. Hides native bar on the target (`row-scroll`).
 * @param {{ targetRef: React.RefObject<HTMLElement | null>, className?: string, onInteractionEnd?: () => void }} props
 */
export default function HorizontalScrollRail({
  targetRef,
  className = '',
  onInteractionEnd,
}) {
  const trackRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const thumbRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const wrapRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const rafRef = useRef(0)
  const scrollableRef = useRef(false)
  const revealedRef = useRef(false)
  const draggingRef = useRef(false)

  const [revealed, setRevealed] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
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
      setScrollPct(0)
      thumb.style.left = '0px'
      thumb.style.width = `${THUMB_W_IDLE}px`
      thumb.style.height = `${THUMB_H}px`
      return
    }

    const thumbW = thumbWidthFor(el, trackW, draggingRef.current)
    const travel = Math.max(0, trackW - thumbW)
    const ratio = el.scrollLeft / maxS
    const x = ratio * travel

    thumb.style.width = `${thumbW}px`
    thumb.style.height = `${THUMB_H}px`
    thumb.style.left = `${x}px`
    setScrollPct(Math.round(ratio * 100))
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

  const seekFromRatio = useCallback(
    (ratio) => {
      const el = targetRef.current
      if (!el) return
      const maxS = Math.max(0, el.scrollWidth - el.clientWidth)
      if (maxS <= 0) return
      el.scrollLeft = Math.max(0, Math.min(1, ratio)) * maxS
      reveal()
      scheduleSync()
    },
    [targetRef, reveal, scheduleSync],
  )

  const seekFromClientX = useCallback(
    (clientX) => {
      const track = trackRef.current
      if (!track) return

      const el = targetRef.current
      const maxS = el ? Math.max(0, el.scrollWidth - el.clientWidth) : 0
      if (maxS <= 0) return

      const trackW = track.offsetWidth
      const thumbW = thumbWidthFor(el, trackW, draggingRef.current)
      const travel = Math.max(0, trackW - thumbW)
      const rect = track.getBoundingClientRect()
      const px = clientX - rect.left - thumbW / 2
      const clamped = Math.max(0, Math.min(travel, px))
      const ratio = travel > 0 ? clamped / travel : 0
      seekFromRatio(ratio)
    },
    [seekFromRatio, targetRef],
  )

  const onTrackPointerDown = (e) => {
    if (e.button !== 0) return
    e.preventDefault()
    reveal()
    draggingRef.current = true
    setDragging(true)
    seekFromClientX(e.clientX)

    const move = (ev) => seekFromClientX(ev.clientX)
    const up = () => {
      draggingRef.current = false
      setDragging(false)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      scheduleSync()
      onInteractionEnd?.()
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  const onKeyDown = (e) => {
    const el = targetRef.current
    if (!canScroll || !el) return
    const maxS = Math.max(0, el.scrollWidth - el.clientWidth)
    if (maxS <= 0) return
    const current = el.scrollLeft / maxS
    const step = 0.08
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      reveal()
      seekFromRatio(current + step)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      reveal()
      seekFromRatio(current - step)
    } else if (e.key === 'Home') {
      e.preventDefault()
      seekFromRatio(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      seekFromRatio(1)
    }
  }

  const showRail = canScroll && revealed

  return (
    <div
      ref={wrapRef}
      className={`scroll-rail ${showRail ? 'scroll-rail--revealed' : 'scroll-rail--hidden'} ${className}`.trim()}
    >
      <div
        ref={trackRef}
        role="slider"
        aria-label="Scroll portfolio categories horizontally"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={scrollPct}
        aria-hidden={!canScroll}
        tabIndex={canScroll ? 0 : -1}
        className="scroll-rail__track"
        onPointerDown={onTrackPointerDown}
        onKeyDown={onKeyDown}
      >
        <div
          ref={thumbRef}
          className={`scroll-rail__thumb${dragging ? ' scroll-rail__thumb--dragging' : ''}`}
          aria-hidden
        />
      </div>
      <span className="sr-only">Use arrow keys to scroll categories</span>
    </div>
  )
}
