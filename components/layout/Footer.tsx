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
    <footer className="mt-20 border-t border-[var(--dc-border)]">
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 sm:grid-cols-[1fr_auto] items-end gap-10 px-10 py-10">
        <div className="flex flex-col gap-2">
          <span className="font-heading text-xl font-black tracking-tight text-[#e8e6dd]">{name}</span>
          <span className="text-[11px] tracking-[0.1em] uppercase text-[var(--dc-muted)]">{role} · Chile</span>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3 text-[11px] tracking-[0.1em] uppercase text-[var(--dc-muted)]">
          <div className="flex items-center gap-5">
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label={ta('github')} className="flex items-center gap-2 hover:text-[#e8e6dd] transition-colors">
              <GithubIcon size={16} /> {ta('github')}
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={ta('linkedin')} className="flex items-center gap-2 hover:text-[#e8e6dd] transition-colors">
              <LinkedinIcon size={16} /> {ta('linkedin')}
            </a>
            <a href={`mailto:${email}`} aria-label={ta('email')} className="flex items-center gap-2 hover:text-[#e8e6dd] transition-colors">
              <Mail size={16} /> {ta('email')}
            </a>
          </div>
          <span>© {new Date().getFullYear()} {handle}</span>
        </div>
      </div>
    </footer>
  )
}
