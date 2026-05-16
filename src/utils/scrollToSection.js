/**
 * Whether the current route is the home page.
 * With `BrowserRouter` `basename`, `pathname` is relative (always `/` at home).
 * Also accepts full paths when the base segment is still present (direct loads).
 */
export function isHomePath(pathname) {
  const path = pathname.replace(/\/$/, '') || '/'
  if (path === '/' || path === '') return true

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  if (!base || base === '/') return false

  const baseSegment = base.replace(/^\//, '')
  return path === baseSegment || path === `/${baseSegment}`
}

/** @returns {number} */
function maxDocumentScrollY() {
  const el = document.documentElement
  return Math.max(0, el.scrollHeight - window.innerHeight)
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  )
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

/** @type {{ cancel: () => void } | null} */
let activeScroll = null

/** Incremented when nav already performed the scroll (survives StrictMode double effects). */
let hashScrollHandledGeneration = 0
let hashScrollConsumedGeneration = 0

/** Navbar already scrolled — skip duplicate ScrollToTop run. */
export function markHashScrollHandled() {
  hashScrollHandledGeneration += 1
}

/** @returns {boolean} */
export function consumeSkipHashScroll() {
  if (hashScrollHandledGeneration > hashScrollConsumedGeneration) {
    hashScrollConsumedGeneration = hashScrollHandledGeneration
    return true
  }
  return false
}

export function cancelSmoothScroll() {
  activeScroll?.cancel()
  activeScroll = null
}

/**
 * Scroll position that aligns a section top with the header bottom.
 * @param {string} sectionId
 * @returns {number | null}
 */
export function sectionScrollY(sectionId) {
  const section = document.getElementById(sectionId)
  if (!section) return null

  const header = document.querySelector('header')
  const headerBottom = header?.getBoundingClientRect().bottom ?? 0
  const top = section.getBoundingClientRect().top
  const idealY = window.scrollY + top - headerBottom
  return Math.min(Math.max(0, idealY), maxDocumentScrollY())
}

/**
 * @param {number} endY
 * @param {{ behavior?: ScrollBehavior; duration?: number }} [options]
 * @returns {Promise<void>}
 */
function animateScrollTo(endY, options = {}) {
  const { behavior = 'smooth', duration = 780 } = options
  const targetY = Math.min(Math.max(0, endY), maxDocumentScrollY())
  const startY = window.scrollY

  if (behavior === 'instant' || prefersReducedMotion() || Math.abs(targetY - startY) < 2) {
    cancelSmoothScroll()
    window.scrollTo({ top: targetY, behavior: 'instant' })
    return Promise.resolve()
  }

  cancelSmoothScroll()

  return new Promise((resolve) => {
    const startTime = performance.now()
    let rafId = 0

    const finish = () => {
      if (activeScroll?.cancel === cancel) activeScroll = null
      resolve()
    }

    const cancel = () => {
      cancelAnimationFrame(rafId)
      finish()
    }

    activeScroll = { cancel }

    const step = (now) => {
      const t = easeInOutCubic(Math.min(1, (now - startTime) / duration))
      window.scrollTo({
        top: startY + (targetY - startY) * t,
        behavior: 'instant',
      })
      if (t < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        finish()
      }
    }

    rafId = requestAnimationFrame(step)
  })
}

/** Wait for layout after route/menu transitions before measuring sections. */
function afterLayoutReady() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  })
}

/**
 * Smooth scroll to a home section (`home`, `work`, `contact`).
 * Target Y is fixed at start — never recalculated mid-animation.
 * @param {string} sectionId
 * @param {{ behavior?: ScrollBehavior; duration?: number; waitForLayout?: boolean }} [options]
 * @returns {Promise<boolean>}
 */
export async function scrollToHashSection(sectionId, options = {}) {
  const { waitForLayout = false, ...scrollOptions } = options
  const id = sectionId === 'home' || !sectionId ? 'home' : sectionId

  if (waitForLayout) await afterLayoutReady()

  const endY = sectionScrollY(id)
  if (endY == null) return false
  await animateScrollTo(endY, scrollOptions)
  return true
}

/** @deprecated Use scrollToHashSection */
export function scrollToSectionBelowHeader(sectionId, options = {}) {
  return scrollToHashSection(sectionId, options)
}

/** @param {{ behavior?: ScrollBehavior; duration?: number }} [options] */
export function scrollToTop(options = {}) {
  return scrollToHashSection('home', options)
}

/**
 * Smooth scroll, then sync the hash (avoids the browser jumping to the fragment mid-animation).
 * @param {MouseEvent} e
 * @param {string} sectionId
 * @param {string} pathname
 * @param {string} [currentHash]
 * @param {(to: { pathname: string; hash?: string }, options?: object) => void} navigate
 */
export async function navigateToHashSection(
  e,
  sectionId,
  pathname,
  navigate,
  currentHash = '',
  { waitForLayout = false } = {},
) {
  e.preventDefault()

  const hash = `#${sectionId}`
  const hashMatches = currentHash === hash

  if (isHomePath(pathname)) {
    const scrolled = await scrollToHashSection(sectionId, {
      behavior: 'smooth',
      waitForLayout,
    })
    if (!scrolled) return

    markHashScrollHandled()
    if (!hashMatches) {
      navigate({ pathname: homePathname(), hash }, { preventScrollReset: true, replace: true })
    }
    return
  }

  navigate({ pathname: homePathname(), hash }, { preventScrollReset: true })
}

/** Home route path for `navigate()` (basename-relative). */
export function homePathname() {
  return '/'
}

/** @deprecated Use navigateToHashSection */
export function handleHomeHashNavClick(e, href, pathname, navigate) {
  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) return
  const sectionId = href.slice(hashIndex + 1)
  if (!sectionId) return
  navigateToHashSection(e, sectionId, pathname, navigate)
}

/** Call once at app startup. */
export function initScrollRestoration() {
  if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
}
