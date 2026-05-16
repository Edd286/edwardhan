/** Public folder URL (respects Vite `base` on GitHub Pages). */
export function publicAsset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
