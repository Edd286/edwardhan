import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  consumeSkipHashScroll,
  isHomePath,
  scrollToHashSection,
  scrollToTop,
} from '../utils/scrollToSection.js'

/** Scroll on route/hash change (initial load, chapter → home). Navbar clicks scroll themselves. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (consumeSkipHashScroll()) return

    if (!isHomePath(pathname)) {
      scrollToTop({ behavior: 'instant' })
      return
    }

    const sectionId = hash.replace(/^#/, '')
    requestAnimationFrame(() => {
      const scrollOpts = { behavior: 'smooth', waitForLayout: true }
      if (!sectionId || sectionId === 'home') {
        scrollToTop(scrollOpts)
      } else {
        scrollToHashSection(sectionId, scrollOpts)
      }
    })
  }, [pathname, hash])

  return null
}
