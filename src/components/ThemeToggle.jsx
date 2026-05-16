import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

/** Track 3.5rem (w-14), padding 0.125rem each side, thumb 1.75rem (size-7) */
const THUMB_TRAVEL = 'calc(3.5rem - 0.25rem - 1.75rem)'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className="relative box-border h-8 w-14 shrink-0 rounded-full border border-zinc-300 bg-zinc-200/90 p-0.5 transition-colors dark:border-zinc-600 dark:bg-zinc-800/90"
    >
      {/* Inactive-side hint (faded) */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
        <Sun
          className={`size-3.5 shrink-0 ${isDark ? 'text-zinc-500/35' : 'opacity-0'}`}
          aria-hidden
        />
        <Moon
          className={`size-3.5 shrink-0 ${isDark ? 'opacity-0' : 'text-zinc-500/35'}`}
          aria-hidden
        />
      </span>

      {/* Active icon — centered in thumb */}
      <span
        aria-hidden
        className="absolute top-0.5 left-0.5 flex size-7 items-center justify-center rounded-full bg-white text-amber-600 shadow-sm transition-transform duration-200 ease-out dark:bg-zinc-100 dark:text-amber-400"
        style={{ transform: isDark ? `translateX(${THUMB_TRAVEL})` : 'translateX(0)' }}
      >
        {isDark ? (
          <Moon className="size-3.5 shrink-0" strokeWidth={2.25} />
        ) : (
          <Sun className="size-3.5 shrink-0" strokeWidth={2.25} />
        )}
      </span>
    </button>
  )
}
