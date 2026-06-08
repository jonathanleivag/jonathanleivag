'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useTransition } from 'react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchLocale = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label="Cambiar idioma / Change language"
    >
      {(['es', 'en'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          disabled={isPending}
          aria-pressed={locale === lang}
          className={`text-xs font-semibold uppercase px-2 py-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 focus-visible:ring-offset-black disabled:opacity-50 ${
            locale === lang
              ? 'text-emerald-400 bg-emerald-500/10'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}
