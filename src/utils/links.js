/** @param {string} email */
export function mailtoHref(email, { subject, body } = {}) {
  const parts = []
  if (subject) parts.push(`subject=${encodeURIComponent(subject)}`)
  if (body) parts.push(`body=${encodeURIComponent(body)}`)
  const query = parts.join('&')
  return query ? `mailto:${email}?${query}` : `mailto:${email}`
}

export function gmailComposeHref(email, { subject, body } = {}) {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: email,
  })
  if (subject) params.set('su', subject)
  if (body) params.set('body', body)
  return `https://mail.google.com/mail/?${params.toString()}`
}

export function outlookComposeHref(email, { subject, body } = {}) {
  const params = new URLSearchParams({ to: email })
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`
}

/** @param {'gmail' | 'outlook'} client */
export function webComposeHref(client, email, options = {}) {
  return client === 'outlook'
    ? outlookComposeHref(email, options)
    : gmailComposeHref(email, options)
}

const MAILTO_FALLBACK_MS = 650

/**
 * Try the system mail app via mailto; if the window stays focused (no handler),
 * open Gmail or Outlook compose in a new tab.
 *
 * @param {string} email
 * @param {{ subject?: string, body?: string }} [draft]
 * @param {{ webMailFallback?: 'gmail' | 'outlook' }} [config]
 */
export function openEmailWithFallback(
  email,
  draft = {},
  { webMailFallback = 'gmail' } = {},
) {
  let handedOff = false

  const cleanup = () => {
    window.removeEventListener('blur', markHandedOff)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    clearTimeout(fallbackTimer)
  }

  const markHandedOff = () => {
    if (handedOff) return
    handedOff = true
    cleanup()
  }

  const onVisibilityChange = () => {
    if (document.hidden) markHandedOff()
  }

  window.addEventListener('blur', markHandedOff)
  document.addEventListener('visibilitychange', onVisibilityChange)

  const fallbackTimer = setTimeout(() => {
    if (handedOff) return
    cleanup()

    const url = webComposeHref(webMailFallback, email, draft)
    const tab = window.open(url, '_blank', 'noopener,noreferrer')
    if (!tab) window.location.assign(url)
  }, MAILTO_FALLBACK_MS)

  window.location.href = mailtoHref(email, draft)
}

/** @param {string | undefined} v */
export function isFilledLink(v) {
  if (typeof v !== 'string') return false
  const t = v.trim()
  return t.length > 0 && t !== '#' && t !== 'https://'
}
