import { ArrowRight, Mail } from 'lucide-react'
import { Terminal } from '@/components/ui/Terminal'

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16 pb-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400">
              Disponible para nuevos proyectos
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-zinc-100">
              Full Stack<br />
              <span className="text-emerald-400">Senior Engineer</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
              Diseño y construyo productos digitales escalables. Foco en arquitectura,
              experiencia de usuario y entrega end-to-end.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors min-h-[44px]"
            >
              Ver proyectos
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors min-h-[44px]"
            >
              Contactar
            </a>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/jonathanleivag"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://linkedin.com/in/jonathanleivag"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href="mailto:jonathan.leiva@movatec.cl"
              aria-label="Email"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Right column — Terminal */}
        <div className="w-full max-w-lg mx-auto lg:mx-0">
          <Terminal />
        </div>
      </div>
    </section>
  )
}
