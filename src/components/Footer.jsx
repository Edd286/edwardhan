import { LoadReveal } from './LoadReveal.jsx'

export default function Footer() {
  return (
    <LoadReveal
      as="footer"
      className="divider-t relative z-[35] bg-zinc-50 py-8 text-center text-xs text-zinc-500 dark:bg-zinc-950 dark:text-zinc-600"
    >
      <p>© {new Date().getFullYear()} Edward Han</p>
    </LoadReveal>
  )
}
