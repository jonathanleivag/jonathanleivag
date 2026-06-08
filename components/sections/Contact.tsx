'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'

const EMAIL = 'jonathan.leiva@movatec.cl'

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
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable (HTTP, denied permission) — fail silently
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeader
          label="Contacto"
          title="¿Hablamos?"
          subtitle="Estoy abierto a nuevos proyectos, posiciones senior y conversaciones técnicas interesantes."
          className="text-center [&_p]:mx-auto"
        />

        {/* Email copy */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-zinc-300 text-base font-mono">{EMAIL}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs border border-white/10 text-zinc-400 hover:border-emerald-500/30 hover:text-emerald-400 px-3 py-2 rounded-lg transition-colors min-h-[44px]"
            aria-label="Copiar email"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                Copiado
              </>
            ) : (
              <>
                <Copy size={13} />
                Copiar
              </>
            )}
          </button>
        </div>
        {/* Accessible copy announcement */}
        <span aria-live="polite" className="sr-only">
          {copied ? 'Email copiado al portapapeles' : ''}
        </span>

        {/* Social links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://linkedin.com/in/jonathanleivag"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors min-h-[44px] w-full sm:w-auto justify-center"
          >
            <LinkedinIcon size={16} />
            LinkedIn
            <ExternalLink size={12} className="text-zinc-600" />
          </a>
          <a
            href="https://github.com/jonathanleivag"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors min-h-[44px] w-full sm:w-auto justify-center"
          >
            <GithubIcon size={16} />
            GitHub
            <ExternalLink size={12} className="text-zinc-600" />
          </a>
          <a
            href="/cv.pdf"
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
