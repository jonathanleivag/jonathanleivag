import { Mail } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'

interface FooterProps {
  name?: string
  role?: string
  handle?: string
  github?: string
  linkedin?: string
  email?: string
}

export async function Footer({
  name = 'Jonathan Leiva Gómez',
  role = 'Desarrollador Full Stack Senior',
  handle = 'jonathanleivag',
  github = 'https://github.com/jonathanleivag',
  linkedin = 'https://www.linkedin.com/in/jonathanleivag',
  email = 'contacto@jonathanleivag.cl',
}: FooterProps = {}) {
  const ta = await getTranslations('a11y')

  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-zinc-200">{name}</p>
          <p className="text-xs text-zinc-400 mt-0.5">{role}</p>
        </div>

        <div className="flex items-center gap-5">
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label={ta('github')} className="text-zinc-400 hover:text-emerald-400 transition-colors">
            <GithubIcon size={18} />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={ta('linkedin')} className="text-zinc-400 hover:text-emerald-400 transition-colors">
            <LinkedinIcon size={18} />
          </a>
          <a href={`mailto:${email}`} aria-label={ta('email')} className="text-zinc-400 hover:text-emerald-400 transition-colors">
            <Mail size={18} />
          </a>
        </div>

        <p className="text-xs text-zinc-600">© {new Date().getFullYear()} {handle}</p>
      </div>
    </footer>
  )
}
