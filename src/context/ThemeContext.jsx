import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

/** @typedef {'light' | 'dark'} Theme */

const ThemeContext = createContext(
  /** @type {{ theme: Theme, isDark: boolean, setTheme: (t: Theme) => void, toggleTheme: () => void } | null} */ (
    null
  ),
)

/** @returns {Theme} */
function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return 'dark'
}

function applyTheme(theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  localStorage.setItem(STORAGE_KEY, theme)
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = (next) => setThemeState(next)

  const toggleTheme = () =>
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider
      value={{ theme, isDark: theme === 'dark', setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
