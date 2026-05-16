import { useReducedMotion } from 'framer-motion'

const FADE_EASE = 'cubic-bezier(0.25, 0.1, 0.25, 1)'
export const FADE_DURATION = 0.65

/** Fade in on page load (all elements share the same timing). */
export function LoadReveal({
  children,
  className = '',
  duration = FADE_DURATION,
  as: Tag = 'div',
  style,
  ...rest
}) {
  const reduced = useReducedMotion()
  const mergedStyle = {
    ...style,
    '--load-fade-duration': `${duration}s`,
    '--load-fade-delay': '0s',
    '--load-fade-ease': FADE_EASE,
  }

  if (reduced) {
    return (
      <Tag className={className} style={style} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      className={`load-reveal${className ? ` ${className}` : ''}`}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  )
}
