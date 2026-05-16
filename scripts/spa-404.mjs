import { copyFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const index = join(root, 'dist', 'index.html')
const fallback = join(root, 'dist', '404.html')

if (!existsSync(index)) {
  console.warn('spa-404: dist/index.html missing (run vite build first)')
  process.exit(0)
}

copyFileSync(index, fallback)
console.log('spa-404: copied dist/index.html -> dist/404.html (GitHub Pages client routes)')
