export const revalidate = 86400

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPublicCaseStudyBySlug, getPublicCaseStudySlugs } from '@/lib/data/case-studies'
import { getPublicPersonalProjects, getAllProjectSlugs } from '@/lib/data/projects'
import { getPublicProfile } from '@/lib/data/profile'
import { defaultOpenGraph, defaultTwitter, pageAlternates } from '@/lib/seo'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const locales = ['es', 'en']
  const [csSlugs, projectSlugs] = await Promise.all([
    getPublicCaseStudySlugs(),
    getAllProjectSlugs(),
  ])
  return locales.flatMap((locale) => [
    ...csSlugs.map((slug) => ({ locale, slug })),
    ...projectSlugs.map((slug) => ({ locale, slug })),
  ])
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params

  const [profile, cs, personalProjects] = await Promise.all([
    getPublicProfile(locale as 'es' | 'en'),
    getPublicCaseStudyBySlug(locale as 'es' | 'en', slug),
    getPublicPersonalProjects(locale as 'es' | 'en'),
  ])

  if (cs) {
    const title = `${cs.title} — ${profile.name}`
    return {
      title,
      description: cs.intro,
      openGraph: defaultOpenGraph(locale, title, cs.intro, `/projects/${slug}`, profile.name),
      twitter: defaultTwitter(locale, title, cs.intro),
      alternates: pageAlternates(locale, `/projects/${slug}`),
    }
  }

  const project = personalProjects.find((p) => p.slug === slug)
  if (project) {
    const title = `${project.title} — ${profile.name}`
    return {
      title,
      description: project.summary,
      openGraph: {
        ...defaultOpenGraph(locale, title, project.summary, `/projects/${slug}`, profile.name),
        images: project.image ? [
          {
            url: project.image.src,
            width: project.image.width,
            height: project.image.height,
            alt: project.image.alt,
          },
        ] : defaultOpenGraph(locale, title, project.summary, `/projects/${slug}`, profile.name).images,
      },
      twitter: {
        ...defaultTwitter(locale, title, project.summary),
        images: project.image ? [project.image.src] : defaultTwitter(locale, title, project.summary).images,
      },
      alternates: pageAlternates(locale, `/projects/${slug}`),
    }
  }

  return { title: profile.name }
}

export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = await params

  const [cs, personalProjects] = await Promise.all([
    getPublicCaseStudyBySlug(locale as 'es' | 'en', slug),
    getPublicPersonalProjects(locale as 'es' | 'en'),
  ])

  // Try case study first
  if (cs) {
    const t = await getTranslations({ locale, namespace: 'caseStudies' })
    return (
      <main className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-11">
        <Link href="/" className="inline-block text-[11px] tracking-[0.12em] uppercase text-[var(--dc-muted)] hover:text-[#e8e6dd] transition-colors">
          ← {locale === 'en' ? 'Back to work' : 'Volver al trabajo'}
        </Link>

        <header className="pt-9 pb-11">
          <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{cs.stack.slice(0, 2).join(' · ')}</span>
          <h1 className="mt-5 max-w-[920px] font-heading text-3xl sm:text-[62px] font-black leading-[1.02] tracking-[-0.035em]">{cs.title}</h1>
          <p className="mt-[26px] max-w-[660px] text-base leading-[1.8] text-[#c9cec9]">{cs.intro}</p>
        </header>

        <div className="h-[220px] sm:h-[320px] border border-[var(--dc-border-strong)]" />

        <section className="grid grid-cols-2 mt-px border-t border-b border-[var(--dc-border)]">
          <div className="flex flex-col gap-2 py-[22px] pr-[22px] border-r border-[var(--dc-border)]">
            <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('role')}</span>
            <span className="text-sm">{cs.role}</span>
          </div>
          <div className="flex flex-col gap-2 py-[22px] pl-[22px]">
            <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">Stack</span>
            <span className="text-sm">{cs.stack.slice(0, 3).join(' · ')}</span>
          </div>
        </section>

        <section className="grid lg:grid-cols-[260px_1fr] gap-14 pt-[60px]">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('context')}</h2>
          <p className="max-w-[680px] text-base leading-[1.85] text-[#dcd9cf]">{cs.context}</p>
        </section>

        <section className="grid lg:grid-cols-[260px_1fr] gap-14 pt-14">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('technicalDecisions')}</h2>
          <div className="flex flex-col max-w-[760px]">
            {cs.technicalDecisions.map((d, i) => (
              <div key={d} className="grid grid-cols-[44px_1fr] gap-[18px] py-[18px] border-t border-[var(--dc-border)] last:border-b">
                <span className="font-heading text-base font-black text-[var(--dc-muted)]">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[15px] leading-[1.7] text-[#dcd9cf]">{d}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-[260px_1fr] gap-14 pt-14">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('result')}</h2>
          <div className="flex flex-col gap-[26px] max-w-[760px]">
            <p className="font-heading text-xl sm:text-2xl font-bold leading-[1.35] tracking-[-0.02em]">{cs.result}</p>
            <div className="flex flex-wrap gap-2 text-[10px] tracking-[0.12em] uppercase text-[var(--dc-muted)]">
              {cs.stack.map((tech) => <span key={tech} className="px-2.5 py-1.5 border border-[var(--dc-border-strong)]">{tech}</span>)}
            </div>
          </div>
        </section>
      </main>
    )
  }

  // Try personal project
  const project = personalProjects.find((p) => p.slug === slug)
  if (!project) notFound()

  const t = await getTranslations({ locale, namespace: 'personalProjects' })

  return (
    <main className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-11 pb-20">
      <Link href="/" className="inline-block text-[11px] tracking-[0.12em] uppercase text-[var(--dc-muted)] hover:text-[#e8e6dd] transition-colors">
        {t('backToPortfolio')}
      </Link>

      <div className="flex items-start justify-between gap-5 flex-wrap pt-9">
        <div>
          <p className="text-xs text-[var(--dc-muted)] font-medium mb-1.5">{project.domain}</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-tight">{project.title}</h1>
        </div>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-2 bg-[#e8e6dd] text-[#111111] font-bold px-5 py-2.5 text-sm">
          {t('visitProject')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
        </a>
      </div>

      {project.image && (
        <div className="mt-8 border border-[var(--dc-border-strong)] overflow-hidden">
          <Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} className="object-cover w-full" priority />
        </div>
      )}

      <p className="mt-8 text-lg leading-[1.8] text-[#dcd9cf]">{project.summary}</p>

      <div className="grid md:grid-cols-2 gap-9 pt-9">
        <section className="space-y-3">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('objective')}</h2>
          <p className="text-sm leading-[1.7] text-[#c9cec9]">{project.objective}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('stack')}</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => <span key={tech} className="text-xs border border-[var(--dc-border-strong)] px-2.5 py-1">{tech}</span>)}
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('features')}</h2>
          <ul className="space-y-2">
            {project.features.map((f) => <li key={f} className="flex gap-2 text-sm text-[#c9cec9] leading-[1.7]"><span className="text-[var(--dc-muted)] shrink-0">→</span>{f}</li>)}
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('technicalHighlights')}</h2>
          <ul className="space-y-2">
            {project.technicalHighlights.map((h) => <li key={h} className="flex gap-2 text-sm text-[#c9cec9] leading-[1.7]"><span className="text-[var(--dc-muted)] shrink-0">→</span>{h}</li>)}
          </ul>
        </section>
      </div>

      <section className="border-t border-[var(--dc-border)] pt-8 mt-8 space-y-3">
        <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('learning')}</h2>
        <p className="text-sm font-medium leading-[1.7]">{project.learning}</p>
      </section>
    </main>
  )
}
