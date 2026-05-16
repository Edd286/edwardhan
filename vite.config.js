import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project sites need base `/repository-name/`.
// Set VITE_BASE_PATH in `.env.production` (see README). Defaults to `/` for local dev and user pages.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_PATH || '/'

  return {
    plugins: [react(), tailwindcss()],
    base,
  }
})
