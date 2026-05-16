import { useEffect, useRef } from 'react'

const MAX_RIPPLES = 18
const SPAWN_MS = 165
const GLOW_LERP = 0.18

export default function CursorRippleTrail() {
  const layerRef = useRef(null)
  const glowRef = useRef(null)
  const lastSpawnRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const activeRef = useRef(false)
  const rafRef = useRef(0)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const enabled = () => finePointer.matches && !reducedMotion.matches

    const layer = layerRef.current
    const glow = glowRef.current
    if (!layer || !glow) return

    const spawnRipple = (x, y) => {
      const el = document.createElement('span')
      const size = 36 + Math.random() * 28
      const variant = Math.random() > 0.45 ? 'ember' : 'amber'

      el.className = `cursor-ripple cursor-ripple--${variant}`
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      el.style.width = `${size}px`
      el.style.height = `${size}px`

      while (layer.children.length >= MAX_RIPPLES) {
        layer.firstChild?.remove()
      }

      layer.appendChild(el)
      el.addEventListener('animationend', () => el.remove(), { once: true })
    }

    const tick = () => {
      if (!enabled()) return

      const { x: tx, y: ty } = targetRef.current
      const pos = posRef.current
      pos.x += (tx - pos.x) * GLOW_LERP
      pos.y += (ty - pos.y) * GLOW_LERP
      glow.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`

      if (activeRef.current) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    const onMove = (e) => {
      if (!enabled()) return

      targetRef.current = { x: e.clientX, y: e.clientY }

      if (!activeRef.current) {
        activeRef.current = true
        posRef.current = { x: e.clientX, y: e.clientY }
        glow.style.opacity = '1'
        rafRef.current = requestAnimationFrame(tick)
      }

      const now = performance.now()
      if (now - lastSpawnRef.current < SPAWN_MS) return
      lastSpawnRef.current = now

      spawnRipple(e.clientX, e.clientY)
    }

    const onLeave = () => {
      activeRef.current = false
      cancelAnimationFrame(rafRef.current)
      glow.style.opacity = '0'
    }

    const syncEnabled = () => {
      if (!enabled()) {
        onLeave()
        layer.replaceChildren()
      }
    }

    if (!enabled()) return undefined

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    finePointer.addEventListener('change', syncEnabled)
    reducedMotion.addEventListener('change', syncEnabled)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      finePointer.removeEventListener('change', syncEnabled)
      reducedMotion.removeEventListener('change', syncEnabled)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={layerRef}
        className="cursor-ripple-layer pointer-events-none fixed inset-0 z-[35]"
        aria-hidden
      />
      <div
        ref={glowRef}
        className="cursor-ripple-glow pointer-events-none fixed left-0 top-0 z-[35] opacity-0"
        aria-hidden
      />
    </>
  )
}
