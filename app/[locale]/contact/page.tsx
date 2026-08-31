export const revalidate = 86400

import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPublicProfile } from '@/lib/data/profile'
import { ContactForm } from '@/components/ui/ContactForm'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contactPage' })
  const profile = await getPublicProfile(locale as 'es' | 'en')
  return {
    title: `${t('heading')} — ${profile.name}`,
    description: t('subtitle'),
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const [t, profile] = await Promise.all([
    getTranslations({ locale, namespace: 'contactPage' }),
    getPublicProfile(locale as 'es' | 'en'),
  ])

  return (
    <main className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-16 pb-20">
      <header className="pb-12">
        <span className="text-[11px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('eyebrow')}</span>
        <h1 className="mt-5 max-w-[900px] font-heading text-3xl sm:text-[58px] font-black leading-[1.03] tracking-[-0.035em]">{t('heading')}</h1>
        <p className="mt-6 max-w-[620px] text-base leading-[1.85] text-[#c9cec9]">{t('subtitle')}</p>
      </header>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 pt-12 border-t border-[var(--dc-border)]">
        <ContactForm />

        <aside className="flex flex-col gap-3.5">
          <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('directChannels')}</span>
          <a href={`mailto:${profile.social.email}`} className="flex items-center justify-between p-5 border border-[var(--dc-border-strong)] hover:border-[#e8e6dd] transition-colors">
            <span className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('emailChannel')}</span>
              <span className="text-sm">{profile.social.email}</span>
            </span>
            <span className="text-[var(--dc-muted)]">→</span>
          </a>
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 border border-[var(--dc-border-strong)] hover:border-[#e8e6dd] transition-colors">
            <span className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('linkedinChannel')}</span>
              <span className="text-sm">in/jonathanleivag</span>
            </span>
            <span className="text-[var(--dc-muted)]">→</span>
          </a>
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 border border-[var(--dc-border-strong)] hover:border-[#e8e6dd] transition-colors">
            <span className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('githubChannel')}</span>
              <span className="text-sm">github.com/jonathanleivag</span>
            </span>
            <span className="text-[var(--dc-muted)]">→</span>
          </a>
          <a href={profile.social.cv} className="flex items-center justify-between p-5 bg-[#e8e6dd] text-[#111111]">
            <span className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[#4a4a4a]">{t('cvChannel')}</span>
              <span className="text-sm font-bold">{t('downloadCv')}</span>
            </span>
            <span>↓</span>
          </a>
          <div className="flex items-center gap-2.5 pt-4 text-[11px] tracking-[0.08em] uppercase text-[var(--dc-muted)]">
            <span className="w-1.5 h-1.5 bg-[#e8e6dd]" />{t('availability')}
          </div>
        </aside>
      </div>
    </main>
  )
}
