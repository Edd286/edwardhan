import { useEffect, useRef } from 'react'

const FRAME_MS = 66
const SCALE = 0.65

export default function TvStaticOverlay() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let width = 0
    let height = 0
    let imageData = null
    let timerId = 0

    const resize = () => {
      width = Math.max(1, Math.floor(window.innerWidth * SCALE))
      height = Math.max(1, Math.floor(window.innerHeight * SCALE))
      canvas.width = width
      canvas.height = height
      imageData = ctx.createImageData(width, height)
    }

    const drawFrame = () => {
      if (!imageData) return
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
    }

    const tick = () => {
      drawFrame()
      if (!prefersReducedMotion) {
        timerId = window.setTimeout(tick, FRAME_MS)
      }
    }

    resize()
    tick()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      window.clearTimeout(timerId)
    }
  }, [])

  return (
    <div
      className="tv-static-overlay pointer-events-none fixed inset-0 z-30"
      aria-hidden
    >
      <canvas ref={canvasRef} className="tv-static-canvas h-full w-full" />
    </div>
  )
}

