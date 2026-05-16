import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { isHomePath, scrollToSectionBelowHeader } from '../utils/scrollToSection.js'

/** Scroll to top on route change; on home, align hash targets to the header divider. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const sectionId = hash.replace(/^#/, '')

    if (isHomePath(pathname) && sectionId) {
      const run = () => {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'instant' })
        } else {
          scrollToSectionBelowHeader(sectionId, { behavior: 'instant' })
        }
      }
      requestAnimationFrame(() => requestAnimationFrame(run))
      return
    }

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
