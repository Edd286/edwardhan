import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * @param {{
 *   text: string
 *   className?: string
 *   charMs?: number
 *   startDelayMs?: number
 *   onTypingChange?: (isTyping: boolean) => void
 * }} props
 */
export default function TypewriterText({
  text,
  className = '',
  charMs = 28,
  startDelayMs = 850,
  onTypingChange,
}) {
  const reduced = useReducedMotion()
  const [displayed, setDisplayed] = useState(reduced ? text : '')
  const [done, setDone] = useState(reduced)

  useEffect(() => {
    if (reduced) {
      setDisplayed(text)
      setDone(true)
      onTypingChange?.(false)
      return undefined
    }

    setDisplayed('')
    setDone(false)
    onTypingChange?.(false)

    let index = 0
    let delayId = 0
    let tickId = 0

    const tick = () => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) {
        window.clearInterval(tickId)
        setDone(true)
        onTypingChange?.(false)
      }
    }

    delayId = window.setTimeout(() => {
      onTypingChange?.(true)
      tickId = window.setInterval(tick, charMs)
    }, startDelayMs)

    return () => {
      window.clearTimeout(delayId)
      window.clearInterval(tickId)
      onTypingChange?.(false)
    }
  }, [text, charMs, startDelayMs, reduced, onTypingChange])

  return (
    <p className={`typewriter-text grid ${className}`.trim()} aria-label={text}>
      <span className="invisible col-start-1 row-start-1 block" aria-hidden>
        {text}
      </span>
      <span className="col-start-1 row-start-1">
        {displayed}
        {!done && <span className="typewriter-cursor" aria-hidden />}
      </span>
    </p>
  )
}
