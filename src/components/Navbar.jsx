import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle.jsx'
import { LoadReveal } from './LoadReveal.jsx'
import { siteNav } from '../data/portfolioData.js'
import { appRootWithHash } from '../utils/appHref.js'
import { navigateToHashSection } from '../utils/scrollToSection.js'

const MOBILE_NAV_CLOSE_MS = 320

export default function Navbar() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function navHref(href) {
    if (href.startsWith('#')) return appRootWithHash(href.slice(1))
    return href
  }

  function onNavClick(e, href) {
    if (!href.startsWith('#')) return

    e.preventDefault()
    const sectionId = href.slice(1)
    const targetHash = `#${sectionId}`
    const wasOpen = open
    setOpen(false)

    const go = () => {
      navigateToHashSection(e, sectionId, pathname, navigate, hash, {
        waitForLayout: wasOpen,
      })
    }

    if (wasOpen) {
      window.setTimeout(go, MOBILE_NAV_CLOSE_MS)
    } else {
      go()
    }
  }

  return (
    <LoadReveal
      as="header"
      className={`fixed inset-x-0 top-0 z-50 divider-b transition-colors ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md dark:bg-zinc-950/90'
          : 'bg-white/70 backdrop-blur-sm dark:bg-zinc-950/50'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 md:px-8"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="font-display text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-lg"
        >
          Edward Han
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {siteNav.map((item) => (
            <li key={item.id}>
              <a
                href={navHref(item.href)}
                onClick={(e) => onNavClick(e, item.href)}
                className="rounded-full px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-200/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 md:ml-0 md:gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex rounded-full p-2 text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="divider-t bg-white dark:bg-zinc-950 md:hidden"
          >
            <ul className="flex flex-col px-4 py-2">
              {siteNav.map((item) => (
                <li key={item.id}>
                  <a
                    href={navHref(item.href)}
                    className="block rounded-lg px-3 py-3 text-sm text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    onClick={(e) => onNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadReveal>
  )
}
