export const revalidate = 86400

import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPublicProfile } from '@/lib/data/profile'
import { getPublicExperiences } from '@/lib/data/experience'
import { getPublicSkillCategories } from '@/lib/data/skills'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'aboutPage' })
  const profile = await getPublicProfile(locale as 'es' | 'en')
  return {
    title: `${t('heading')} — ${profile.name}`,
    description: profile.about.summary,
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const l = locale as 'es' | 'en'

  const [t, profile, experiences, skillCategories] = await Promise.all([
    getTranslations({ locale, namespace: 'aboutPage' }),
    getPublicProfile(l),
    getPublicExperiences(l),
    getPublicSkillCategories(l),
  ])

  return (
    <main className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-16 pb-20">
      <header className="grid lg:grid-cols-[1.15fr_1fr] gap-14 items-start pb-14">
        <div>
          <span className="text-[11px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('eyebrow')}</span>
          <h1 className="mt-5 font-heading text-3xl sm:text-[58px] font-black leading-[1.03] tracking-[-0.035em]">{t('heading')}</h1>
          <p className="mt-6 max-w-[600px] text-base leading-[1.85] text-[#dcd9cf]">{profile.about.summary}</p>
          {profile.about.body.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-[600px] text-base leading-[1.85] text-[#c9cec9]">{paragraph}</p>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <div className="h-[280px] border border-[var(--dc-border-strong)]" />
          <div className="flex flex-col gap-3 p-5 border border-[var(--dc-border-strong)] text-xs tracking-[0.04em] text-[#c9cec9]">
            <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('dataLabel')}</span>
            <span>{profile.location}</span>
            <span>{profile.social.email}</span>
            <span>{t('languages')}</span>
            <span className="text-[#e8e6dd]">{profile.availability}</span>
          </div>
        </div>
      </header>

      <ScrollReveal>
        <section className="pb-14">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)] mb-7">{t('experienceLabel')}</h2>
          {experiences.map((exp) => (
            <div key={exp.company} className="grid lg:grid-cols-[280px_1fr] gap-11 py-[26px] border-t border-[var(--dc-border)]">
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2.5 font-heading text-xl font-black tracking-tight">
                  {exp.company}
                  {exp.isCurrent && <span className="px-2 py-0.5 bg-[#e8e6dd] text-[#111111] text-[9px] font-bold tracking-[0.1em]">{t('currentBadge')}</span>}
                </span>
                <span className="text-[11px] tracking-[0.08em] text-[var(--dc-muted)]">{exp.period}</span>
                <span className="text-[11px] text-[var(--dc-muted)]">{exp.location}</span>
              </div>
              <div className="flex flex-col gap-3.5">
                <span className="text-sm text-[#e8e6dd]">{exp.role}</span>
                <div className="flex flex-col gap-2 text-sm leading-[1.7] text-[#c9cec9]">
                  {exp.highlights.map((h) => <span key={h}>→ {h}</span>)}
                </div>
                {exp.stack.length > 0 && (
                  <span className="text-[10px] tracking-[0.12em] uppercase text-[var(--dc-muted)]">{exp.stack.join(' · ')}</span>
                )}
              </div>
            </div>
          ))}
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)] mb-7">{t('stackLabel')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--dc-border)] border border-[var(--dc-border)]">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="flex flex-col gap-3 p-6 bg-[#151a19]">
                <span className="font-heading text-base font-black tracking-tight">{cat.title}</span>
                <span className="text-xs leading-[1.9] text-[#c9cec9]">{cat.skills.join(' · ')}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </main>
  )
}
