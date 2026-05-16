/** Whether the current route is the home page (supports GitHub Pages base path). */
export function isHomePath(pathname) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const path = pathname.replace(/\/$/, '') || '/'
  if (!base || base === '/') return path === '/' || path === ''
  return path === base
}

/** @returns {number} */
function maxDocumentScrollY() {
  const el = document.documentElement
  return Math.max(0, el.scrollHeight - window.innerHeight)
}

/**
 * Scroll so a section's top divider (`divider-t`) lines up with the header's bottom divider (`divider-b`).
 * Clamps to the document end when the section is last and the page cannot scroll that far.
 * @param {string} sectionId
 * @param {{ behavior?: ScrollBehavior }} [options]
 * @returns {boolean}
 */
export function scrollToSectionBelowHeader(sectionId, options = {}) {
  const { behavior = 'smooth' } = options
  const section = document.getElementById(sectionId)
  if (!section) return false

  const header = document.querySelector('header')
  const headerBottom = header?.getBoundingClientRect().bottom ?? 0
  const top = section.getBoundingClientRect().top
  const idealY = window.scrollY + top - headerBottom
  const y = Math.min(Math.max(0, idealY), maxDocumentScrollY())

  window.scrollTo({ top: y, behavior })
  return true
}

/**
 * In-app hash navigation on the home page with divider-aligned scroll.
 * @param {MouseEvent} e
 * @param {string} href
 * @param {string} pathname
 */
export function handleHomeHashNavClick(e, href, pathname) {
  const hashIndex = href.indexOf('#')
  if (hashIndex === -1 || !isHomePath(pathname)) return

  const sectionId = href.slice(hashIndex + 1)
  if (!sectionId) return

  e.preventDefault()

  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    scrollToSectionBelowHeader(sectionId)
  }

  window.history.pushState(null, '', href)
}
