'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import { profile } from '@/content/profile'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.social.email)
      setCopied(true)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — fail silently
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeader
          label="Contacto"
          title={profile.contact.title}
          subtitle={profile.contact.description}
          className="text-center [&_p]:mx-auto"
        />

        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-zinc-300 text-base font-mono">{profile.social.email}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs border border-white/10 text-zinc-400 hover:border-emerald-500/30 hover:text-emerald-400 px-3 py-2 rounded-lg transition-colors min-h-[44px]"
            aria-label="Copiar email"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                {profile.contact.copiedLabel}
              </>
            ) : (
              <>
                <Copy size={13} />
                {profile.contact.emailLabel}
              </>
            )}
          </button>
        </div>
        <span aria-live="polite" className="sr-only">
          {copied ? 'Email copiado al portapapeles' : ''}
        </span>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors min-h-[44px] w-full sm:w-auto justify-center"
          >
            <LinkedinIcon size={16} />
            LinkedIn
            <ExternalLink size={12} className="text-zinc-600" />
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors min-h-[44px] w-full sm:w-auto justify-center"
          >
            <GithubIcon size={16} />
            GitHub
            <ExternalLink size={12} className="text-zinc-600" />
          </a>
          <a
            href={profile.social.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors min-h-[44px] w-full sm:w-auto justify-center"
          >
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  )
}
