import { useReducedMotion } from 'framer-motion'

/**
 * @param {{
 *   children: string
 *   active?: boolean
 *   className?: string
 * }} props
 */
export default function GlitchName({ children, active = false, className = '' }) {
  const reduced = useReducedMotion()
  const glitching = active && !reduced

  return (
    <h1
      data-text={children}
      className={`hero-glitch-name font-display text-7xl font-semibold leading-[1.05] tracking-tight text-zinc-900 [text-shadow:0_2px_16px_rgba(255,255,255,0.5)] dark:text-white dark:[text-shadow:0_2px_20px_rgba(0,0,0,0.55)] sm:text-8xl${glitching ? ' hero-glitch-name--active' : ''}${className ? ` ${className}` : ''}`}
    >
      {glitching && (
        <span className="hero-glitch-name__ghost" aria-hidden>
          {children}
        </span>
      )}
      <span className="hero-glitch-name__main">{children}</span>
    </h1>
  )
}
