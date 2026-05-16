import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { initScrollRestoration } from './utils/scrollToSection.js'

initScrollRestoration()

document.fonts?.ready?.then(() => {
  document.documentElement.classList.add('fonts-ready')
})

const base = import.meta.env.BASE_URL
const basename = base === '/' ? undefined : base.replace(/\/$/, '')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
