/** Base-aware root URL for hash links (GitHub Pages project sites use a subpath). */
export function appRootWithHash(hash) {
  const raw = import.meta.env.BASE_URL
  const h = hash.replace(/^#/, '')
  if (raw === '/') return h ? `/#${h}` : '/'
  const base = raw.endsWith('/') ? raw : `${raw}/`
  return h ? `${base}#${h}` : base
}
