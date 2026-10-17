export const revalidate = 86400

import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { getPublicProfile } from '@/lib/data/profile'
import { getPublicExperiences } from '@/lib/data/experience'
import { getPublicSkillCategories } from '@/lib/data/skills'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CodeMark } from '@/components/ui/CodeMark'
import { defaultOpenGraph, defaultTwitter, pageAlternates } from '@/lib/seo'

const CODE_DECOR = `export interface Migration {
  from: 'vue@2'
  to: 'vue@3'
  typed: true
}

export function migrate(app: App): App {
  return withTypes(app)
    .composition()
    .modularCss()
}`

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'aboutPage' })
  const profile = await getPublicProfile(locale as 'es' | 'en')
  const title = `${t('heading')} — ${profile.name}`
  const description = profile.about.summary

  return {
    title,
    description,
    alternates: pageAlternates(locale, '/about'),
    openGraph: defaultOpenGraph(locale, title, description, '/about', profile.name),
    twitter: defaultTwitter(locale, title, description),
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
    <main className="pb-20">
      <header className="relative overflow-hidden border-b border-[var(--dc-border)] bg-[linear-gradient(180deg,#0b1113_0%,#0d1416_70%,#151a19_100%)]">
        <div className="relative site-container flex flex-col lg:flex-row lg:items-center lg:min-h-[720px]">
          <CodeMark className="pointer-events-none absolute hidden xl:block right-[440px] top-[42%] -translate-y-1/2 w-[290px] drop-shadow-[0_0_44px_rgba(45,212,191,0.6)]" />

          {profile.portrait && (
            <div className="relative order-last mx-auto mb-10 w-full max-w-[420px] aspect-[3/4] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent),linear-gradient(to_bottom,transparent,black_10%,black_80%,transparent)] [mask-composite:intersect] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mb-0 lg:max-w-none lg:aspect-auto lg:w-[46%] xl:-right-[60px] xl:w-[620px] lg:[mask-image:linear-gradient(to_right,transparent,black_35%,black_88%,transparent),linear-gradient(to_bottom,black_82%,transparent)]">
              <Image src={profile.portrait.src} alt={profile.portrait.alt} fill sizes="(min-width: 1280px) 620px, (min-width: 1024px) 46vw, 420px" className="object-cover object-[center_10%]" priority />
            </div>
          )}

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute -right-[120px] top-[10%] h-[80%] w-[520px] bg-[radial-gradient(closest-side,rgba(45,212,191,0.2),transparent)] mix-blend-screen" />
            <div className="absolute right-[375px] top-[42%] h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.16),transparent_65%)]" />
            <div className="absolute right-[620px] top-[13%] hidden xl:block h-[160px] w-[180px] border border-[#e8e6dd]/[0.05]">
              <div className="h-6 border-b border-[#e8e6dd]/[0.05]" />
            </div>
            <pre className="absolute right-4 top-8 select-none text-[10px] leading-[1.9] text-[#e8e6dd] opacity-[0.08] mix-blend-screen">{CODE_DECOR}</pre>
          </div>

          <div className="relative z-10 max-w-[460px] 2xl:max-w-[560px] pt-12 pb-8 lg:py-16">
            <span className="text-[15px] tracking-[0.12em] uppercase text-[var(--dc-accent)]">{t('eyebrow')}</span>
            <h1 className="mt-6 lg:mt-12 font-heading text-[44px] sm:text-[64px] 2xl:text-[76px] font-bold leading-[1.08] tracking-[-0.02em] text-white">{t('heading')}</h1>
            <p className="mt-6 font-heading text-2xl sm:text-[28px] font-normal tracking-[-0.01em] text-white">{profile.name}</p>
            <p className="mt-3 text-base sm:text-lg tracking-[0.02em] text-[var(--dc-accent)]">{profile.role}</p>
            <p className="mt-8 lg:mt-12 text-sm sm:text-base text-[#9aa5a2]">{t('heroStack')}</p>
          </div>
        </div>
      </header>

      <div className="site-container">
        <section className="grid lg:grid-cols-[1.15fr_1fr] gap-14 items-start pt-14 pb-14">
          <div>
            <p className="max-w-[600px] text-base leading-[1.85] text-[#dcd9cf]">{profile.about.summary}</p>
            {profile.about.body.map((paragraph) => (
              <p key={paragraph} className="mt-5 max-w-[600px] text-base leading-[1.85] text-[#c9cec9]">{paragraph}</p>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 p-5 border border-[var(--dc-border-strong)] text-xs tracking-[0.04em] text-[#c9cec9]">
              <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('dataLabel')}</span>
              <span>{profile.location}</span>
              <span>{profile.social.email}</span>
              <span>{t('languages')}</span>
              <span className="text-[#e8e6dd]">{profile.availability}</span>
            </div>
          </div>
        </section>

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
      </div>
    </main>
  )
}
