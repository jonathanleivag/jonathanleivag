import { ArrowRight, Mail } from 'lucide-react'
import { Terminal } from '@/components/ui/Terminal'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import { profile } from '@/content/profile'

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
              {profile.availability}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-zinc-100">
              {profile.role.split(' ').slice(0, -1).join(' ')}<br />
              <span className="text-emerald-400">
                {profile.role.split(' ').at(-1)}
              </span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
              {profile.hero.subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors min-h-[44px]"
            >
              {profile.hero.primaryCta}
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors min-h-[44px]"
            >
              {profile.hero.secondaryCta}
            </a>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-5">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href={`mailto:${profile.social.email}`}
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
