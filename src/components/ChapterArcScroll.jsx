import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import ChapterBlock from './ChapterBlock.jsx'
import HorizontalScrollRail from './HorizontalScrollRail.jsx'
import { getItemsForRow } from '../data/portfolioData.js'
const MIN_EDGE_PAD = 24
const SCROLL_IDLE_MS = 140

function readGapPx(el) {
  if (!el) return 24
  const g = getComputedStyle(el).gap || '0'
  const n = parseFloat(g)
  return Number.isFinite(n) ? n : 24
}

/** @param {HTMLElement} root */
function getChapterList(root) {
  return root.querySelector('ul')
}

/**
 * Horizontal work-category strip with arc scaling toward the viewport center.
 * Symmetric horizontal padding lets every card—including first and last—scroll to center.
 * @param {{ rows: Array<{ id: string, title: string, itemIds: string[], cardBackVariant?: string, cardBackImage?: string }> }} props
 */
export default function ChapterArcScroll({ rows }) {
  const scrollerRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const frameRef = useRef(0)
  const rowsKeyRef = useRef('')
  const snappingRef = useRef(false)
  const scrollIdleRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null))

  const updateArc = useCallback(() => {
    const root = scrollerRef.current
    if (!root) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    const items = root.querySelectorAll('[data-arc-item]')
    if (!items.length) return

    const sc = root.getBoundingClientRect()
    const centerX = sc.left + sc.width / 2
    const halfW = Math.max(sc.width * 0.48, 120)

    items.forEach((node) => {
      const el = /** @type {HTMLElement} */ (node)
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const dist = Math.min(1, Math.abs(cx - centerX) / halfW)

      if (reduce) {
        el.style.transform = ''
        el.style.opacity = ''
        el.style.zIndex = ''
        return
      }

      const scale = Math.max(0.76, 1 - dist * 0.24)
      const arcY = dist * dist * 56
      const t = Math.max(-1, Math.min(1, (cx - centerX) / halfW))
      const rotY = t * -10
      const z = 10 + Math.round((1 - dist) * 24)
      const opacity = 0.72 + (1 - dist) * 0.28

      el.style.transformOrigin = 'center bottom'
      el.style.transform = `translateY(${arcY}px) scale(${scale}) perspective(1100px) rotateY(${rotY}deg)`
      el.style.zIndex = String(z)
      el.style.opacity = String(opacity)
    })
  }, [])

  const tick = useCallback(() => {
    updateArc()
  }, [updateArc])

  const scheduleUpdate = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(tick)
  }, [tick])

  const applySymmetricPadding = useCallback(() => {
    const root = scrollerRef.current
    const ul = root ? getChapterList(root) : null
    const firstLi = ul?.querySelector(':scope > li')
    if (!root || !ul || !firstLi || rows.length === 0) return

    const cw = root.clientWidth
    const cardW = firstLi.getBoundingClientRect().width
    if (cardW <= 0) return

    const pad = Math.max(MIN_EDGE_PAD, (cw - cardW) / 2)
    root.style.paddingLeft = `${Math.round(pad)}px`
    root.style.paddingRight = `${Math.round(pad)}px`
  }, [rows.length])

  const getNearestCenteredIndex = useCallback(() => {
    const root = scrollerRef.current
    const ul = root ? getChapterList(root) : null
    if (!root || !ul) return 0

    const items = ul.querySelectorAll(':scope > li')
    if (!items.length) return 0

    const centerX = root.getBoundingClientRect().left + root.clientWidth / 2
    let best = 0
    let bestDist = Infinity

    items.forEach((li, i) => {
      const r = li.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const d = Math.abs(cx - centerX)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })

    return best
  }, [])

  const scrollIndexToCenter = useCallback(
    (index, { smooth = false } = {}) => {
      const root = scrollerRef.current
      const ul = root ? getChapterList(root) : null
      const firstLi = ul?.querySelector(':scope > li')
      if (!root || !ul || !firstLi || rows.length === 0) return

      const cw = root.clientWidth
      const cardW = firstLi.getBoundingClientRect().width
      if (cardW <= 0 || cw <= 0) return

      const pad = Math.max(MIN_EDGE_PAD, (cw - cardW) / 2)
      const gap = readGapPx(ul)
      const i = Math.max(0, Math.min(rows.length - 1, index))
      const cardCenter = pad + i * (cardW + gap) + cardW / 2
      const max = Math.max(0, root.scrollWidth - root.clientWidth)
      const target = Math.min(max, Math.max(0, cardCenter - cw / 2))

      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

      if (smooth && !reduce) {
        root.scrollTo({ left: target, behavior: 'smooth' })
      } else {
        root.scrollLeft = target
      }
    },
    [rows.length],
  )

  const snapToNearestCenter = useCallback(
    ({ smooth = true } = {}) => {
      if (snappingRef.current) return
      const root = scrollerRef.current
      if (!root || rows.length === 0) return

      const index = getNearestCenteredIndex()
      const ul = getChapterList(root)
      const firstLi = ul?.querySelector(':scope > li')
      if (!ul || !firstLi) return

      const cw = root.clientWidth
      const cardW = firstLi.getBoundingClientRect().width
      if (cardW <= 0 || cw <= 0) return

      const pad = Math.max(MIN_EDGE_PAD, (cw - cardW) / 2)
      const gap = readGapPx(ul)
      const cardCenter = pad + index * (cardW + gap) + cardW / 2
      const target = Math.min(
        Math.max(0, root.scrollWidth - root.clientWidth),
        Math.max(0, cardCenter - cw / 2),
      )

      if (Math.abs(root.scrollLeft - target) < 1) return

      snappingRef.current = true
      scrollIndexToCenter(index, { smooth })
      if (!smooth) {
        snappingRef.current = false
        tick()
      }
    },
    [getNearestCenteredIndex, rows.length, scrollIndexToCenter, tick],
  )

  const rowsKey = rows.map((r) => r.id).join('|')

  useLayoutEffect(() => {
    const root = scrollerRef.current
    if (!root || rows.length === 0) return

    applySymmetricPadding()
    const layoutKeyChanged = rowsKeyRef.current !== rowsKey
    rowsKeyRef.current = rowsKey

    if (layoutKeyChanged) {
      const mid = Math.max(0, Math.floor((rows.length - 1) / 2))
      requestAnimationFrame(() => {
        scrollIndexToCenter(mid)
        tick()
      })
    } else {
      tick()
    }
  }, [applySymmetricPadding, rows.length, rowsKey, scrollIndexToCenter, tick])

  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return

    const supportsScrollEnd = typeof root.onscrollend !== 'undefined'

    const onScrollEnd = () => {
      if (snappingRef.current) {
        snappingRef.current = false
        tick()
        return
      }
      snapToNearestCenter({ smooth: true })
    }

    const onScroll = () => {
      scheduleUpdate()
      if (supportsScrollEnd) return
      if (scrollIdleRef.current) clearTimeout(scrollIdleRef.current)
      scrollIdleRef.current = setTimeout(() => {
        scrollIdleRef.current = null
        if (!snappingRef.current) snapToNearestCenter({ smooth: true })
      }, SCROLL_IDLE_MS)
    }

    tick()
    root.addEventListener('scroll', onScroll, { passive: true })
    if (supportsScrollEnd) root.addEventListener('scrollend', onScrollEnd)
    window.addEventListener('resize', scheduleUpdate, { passive: true })

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            const prevMax = Math.max(0, root.scrollWidth - root.clientWidth)
            const prevSl = root.scrollLeft
            applySymmetricPadding()
            requestAnimationFrame(() => {
              const newMax = Math.max(0, root.scrollWidth - root.clientWidth)
              if (newMax <= 0) {
                root.scrollLeft = 0
              } else if (prevMax > 0) {
                root.scrollLeft = Math.min(newMax, Math.max(0, (prevSl / prevMax) * newMax))
              }
              snapToNearestCenter({ smooth: false })
              tick()
            })
          })
        : null
    if (ro) ro.observe(root)

    return () => {
      cancelAnimationFrame(frameRef.current)
      if (scrollIdleRef.current) clearTimeout(scrollIdleRef.current)
      root.removeEventListener('scroll', onScroll)
      if (supportsScrollEnd) root.removeEventListener('scrollend', onScrollEnd)
      window.removeEventListener('resize', scheduleUpdate)
      ro?.disconnect()
    }
  }, [applySymmetricPadding, scheduleUpdate, snapToNearestCenter, tick])

  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return

    const onWheel = (e) => {
      const { deltaX, deltaY } = e
      if (Math.abs(deltaY) <= Math.abs(deltaX)) return

      window.scrollBy({ top: deltaY, left: 0, behavior: 'instant' })
      e.preventDefault()
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    return () => root.removeEventListener('wheel', onWheel)
  }, [])

  if (!rows.length) return null

  return (
    <div className="relative overflow-x-clip overflow-y-visible py-4 pb-2 md:py-5 md:pb-3">
      <div
        ref={scrollerRef}
        className="row-scroll snap-x snap-mandatory w-full min-w-0 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-y px-2 pt-6 pb-8 [scroll-behavior:auto] md:px-3 md:pt-7 md:pb-10"
      >
        <ul className="flex w-max list-none items-end gap-6 py-1 md:gap-7" aria-label="Work categories">
            {rows.map((row, index) => (
              <li key={row.id} className="shrink-0 snap-center snap-always">
                <div data-arc-item className="will-change-transform">
                  <ChapterBlock
                    rowId={row.id}
                    title={row.title}
                    count={getItemsForRow(row).length}
                    index={index}
                    cardBackVariant={row.cardBackVariant}
                    cardBackImage={row.cardBackImage}
                    embedInArc
                  />
                </div>
              </li>
          ))}
        </ul>
      </div>
      <HorizontalScrollRail
        targetRef={scrollerRef}
        className="relative z-20 mt-0 flex justify-center md:mt-1"
      />
    </div>
  )
}
