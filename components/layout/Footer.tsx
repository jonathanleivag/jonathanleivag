import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import { profile } from '@/content/profile'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-zinc-200">{profile.name}</p>
          <p className="text-xs text-zinc-400 mt-0.5">{profile.role}</p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${profile.social.email}`}
            aria-label="Email"
            className="text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>

        <p className="text-xs text-zinc-600">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
