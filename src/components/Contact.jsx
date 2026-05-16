import { Code2, Link as LinkIcon, Mail } from 'lucide-react'
import { LoadReveal } from './LoadReveal.jsx'
import { contactContent } from '../data/portfolioData.js'
import { mailtoHref, openEmailWithFallback } from '../utils/links.js'

export default function Contact() {
  const { email, emailSubject, webMailFallback, linkedin, github } = contactContent
  const emailDraft = { subject: emailSubject }
  const emailHref = mailtoHref(email, emailDraft)

  return (
    <section
      id="contact"
      className="divider-t pb-16 pt-10 md:pb-20 md:pt-12"
    >
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="space-y-8">
          <LoadReveal>
            <h2 className="heading-display font-display text-xl font-semibold tracking-tight md:text-2xl">
              Contact
            </h2>
          </LoadReveal>

          <ul className="grid gap-3 sm:grid-cols-3">
            <LoadReveal as="li">
              <a
                href={emailHref}
                onClick={(e) => {
                  e.preventDefault()
                  openEmailWithFallback(email, emailDraft, { webMailFallback })
                }}
                className="card-elevated card-elevated-hover flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white/90 px-4 py-4 text-sm text-zinc-900 transition hover:border-zinc-400 hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
              >
                <Mail className="size-4 text-amber-500/80" aria-hidden />
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                  Email
                </span>
              </a>
            </LoadReveal>
            <LoadReveal as="li">
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="card-elevated card-elevated-hover flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white/90 px-4 py-4 text-sm text-zinc-900 transition hover:border-zinc-400 hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
              >
                <LinkIcon className="size-4 text-amber-500/80" aria-hidden />
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                  LinkedIn
                </span>
              </a>
            </LoadReveal>
            <LoadReveal as="li">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="card-elevated card-elevated-hover flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white/90 px-4 py-4 text-sm text-zinc-900 transition hover:border-zinc-400 hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
              >
                <Code2 className="size-4 text-amber-500/80" aria-hidden />
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                  GitHub
                </span>
              </a>
            </LoadReveal>
          </ul>
        </div>
      </div>
    </section>
  )
}
