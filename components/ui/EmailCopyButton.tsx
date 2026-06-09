'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface Props {
  email: string
  emailLabel: string
  copiedLabel: string
}

export function EmailCopyButton({ email, emailLabel, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // fail silently
    }
  }

  return (
    <>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 text-xs border border-white/10 text-zinc-400 hover:border-emerald-500/30 hover:text-emerald-400 px-3 py-2 rounded-lg transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 focus-visible:ring-offset-black"
        aria-label="Copiar email"
      >
        {copied ? (
          <><Check size={13} className="text-emerald-400" />{copiedLabel}</>
        ) : (
          <><Copy size={13} />{emailLabel}</>
        )}
      </button>
      <span aria-live="polite" className="sr-only">{copied ? 'Email copiado al portapapeles' : ''}</span>
    </>
  )
}
