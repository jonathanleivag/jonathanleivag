'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const t = useTranslations('contactForm')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [globalMessage, setGlobalMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    setGlobalMessage('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (json.ok) {
        setStatus('success')
        setGlobalMessage(t('success'))
        formRef.current?.reset()
      } else {
        setStatus('error')
        setGlobalMessage(t('error'))
      }
    } catch {
      setStatus('error')
      setGlobalMessage(t('error'))
    }
  }

  const inputClass =
    'w-full bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:border-transparent hover:border-white/20'

  const labelClass = 'block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2'

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot anti-spam — hidden from real users */}
      <input
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>{t('name')}</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder={t('namePlaceholder')}
            required
            minLength={2}
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>{t('email')}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder={t('emailPlaceholder')}
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>{t('subject')}</label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder={t('subjectPlaceholder')}
          required
          minLength={3}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>{t('message')}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder={t('messagePlaceholder')}
          required
          minLength={10}
          className={`${inputClass} resize-none`}
        />
      </div>

      {globalMessage && (
        <p
          aria-live="polite"
          className={`text-sm font-medium ${status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}
        >
          {globalMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold px-6 py-3 rounded-lg transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {status === 'loading' ? t('sending') : t('send')}
      </button>
    </form>
  )
}
