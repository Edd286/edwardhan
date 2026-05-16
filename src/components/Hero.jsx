import { useState } from 'react'
import { ArrowRight, Briefcase, GraduationCap, Mail, MapPin } from 'lucide-react'
import { LoadReveal } from './LoadReveal.jsx'
import GlitchName from './GlitchName.jsx'
import TypewriterText from './TypewriterText.jsx'
import { heroContent, contactContent } from '../data/portfolioData.js'
import { appRootWithHash } from '../utils/appHref.js'
import { publicAsset } from '../utils/publicAsset.js'
import { useLocation } from 'react-router-dom'
import { handleHomeHashNavClick } from '../utils/scrollToSection.js'

export default function Hero() {
  const { pathname } = useLocation()
  const [nameGlitch, setNameGlitch] = useState(false)
  const coverSrc = `${import.meta.env.BASE_URL}${heroContent.coverImage.replace(/^\//, '')}`

  return (
    <section
      id="home"
      className="divider-b relative flex min-h-[min(78svh,720px)] scroll-mt-24 items-stretch"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <img
          src={coverSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[78%_22%] sm:object-[76%_22%]"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* Light mode scrims */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-white/20 dark:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgb(250_250_250)_0%,rgb(250_250_250)_20%,rgb(250_250_250/0.92)_38%,rgb(250_250_250/0.55)_54%,rgb(250_250_250/0.2)_70%,rgb(250_250_250/0.05)_84%,transparent_100%)] dark:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top,rgb(250_250_250/0.5)_0%,rgb(250_250_250/0.12)_30%,transparent_52%)] dark:hidden"
        aria-hidden
      />

      {/* Dark mode scrims */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-zinc-950/12 dark:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-[linear-gradient(to_right,rgb(9_9_11)_0%,rgb(9_9_11)_20%,rgb(9_9_11/0.9)_38%,rgb(9_9_11/0.55)_54%,rgb(9_9_11/0.22)_70%,rgb(9_9_11/0.06)_84%,transparent_100%)] dark:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-[linear-gradient(to_top,rgb(9_9_11/0.45)_0%,rgb(9_9_11/0.14)_30%,transparent_52%)] dark:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_55%_50%_at_78%_42%,rgba(232,165,75,0.1),transparent_60%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pb-16 pt-[5.25rem] md:px-8 md:pb-20 md:pt-24">
        <div className="max-w-2xl space-y-5">
          <LoadReveal>
            <GlitchName active={nameGlitch}>{heroContent.name}</GlitchName>
          </LoadReveal>
          <LoadReveal>
            <p className="text-base leading-relaxed text-zinc-700 [text-shadow:0_1px_8px_rgba(255,255,255,0.4)] dark:text-zinc-200/90 dark:[text-shadow:0_1px_12px_rgba(0,0,0,0.45)] md:text-lg">
              {heroContent.role}
            </p>
          </LoadReveal>
          <LoadReveal>
            <p className="flex items-center gap-1.5 text-sm text-zinc-600 [text-shadow:0_1px_8px_rgba(255,255,255,0.4)] dark:text-zinc-400 dark:[text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
              <MapPin className="size-4 shrink-0 text-amber-600/90 dark:text-amber-400/90" aria-hidden />
              <span>{heroContent.location}</span>
            </p>
          </LoadReveal>
          <TypewriterText
            text={heroContent.tagline}
            className="max-w-xl text-sm leading-relaxed text-zinc-600 [text-shadow:0_1px_8px_rgba(255,255,255,0.45)] dark:text-zinc-300 dark:[text-shadow:0_1px_12px_rgba(0,0,0,0.45)] md:text-base"
            startDelayMs={900}
            charMs={26}
            onTypingChange={setNameGlitch}
          />
          <LoadReveal className="flex flex-wrap gap-3 pt-2">
            <a
              href={appRootWithHash('work')}
              onClick={(e) => handleHomeHashNavClick(e, appRootWithHash('work'), pathname)}
              className="card-elevated card-elevated-hover inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-500/90 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:border-amber-400/70 hover:bg-amber-400"
            >
              Explore
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </a>
            <a
              href={publicAsset(contactContent.resumeFile)}
              download={contactContent.resumeFile}
              className="card-elevated card-elevated-hover inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-5 py-2.5 text-sm text-zinc-800 transition hover:border-zinc-400 hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              <Briefcase className="size-4 shrink-0" aria-hidden />
              Résumé
            </a>
            <a
              href={publicAsset(contactContent.transcriptFile)}
              download={contactContent.transcriptFile}
              className="card-elevated card-elevated-hover inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-5 py-2.5 text-sm text-zinc-800 transition hover:border-zinc-400 hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              <GraduationCap
                className="size-[1.125rem] shrink-0"
                strokeWidth={2}
                aria-hidden
              />
              Transcript
            </a>
            <a
              href={appRootWithHash('contact')}
              onClick={(e) =>
                handleHomeHashNavClick(e, appRootWithHash('contact'), pathname)
              }
              className="card-elevated card-elevated-hover inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-5 py-2.5 text-sm text-zinc-800 transition hover:border-zinc-400 hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              <Mail className="size-4 shrink-0" aria-hidden />
              Contact
            </a>
          </LoadReveal>
        </div>
      </div>
    </section>
  )
}
