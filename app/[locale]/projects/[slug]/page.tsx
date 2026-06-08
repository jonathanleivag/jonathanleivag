import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { caseStudies } from '@/content/case-studies'
import { personalProjects } from '@/content/personal-projects'
import { profile } from '@/content/profile'
import { BrowserFrame } from '@/components/ui/BrowserFrame'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const locales = ['es', 'en']
  const caseStudyParams = locales.flatMap((locale) =>
    caseStudies.map((cs) => ({ locale, slug: cs.slug }))
  )
  const personalParams = locales.flatMap((locale) =>
    personalProjects.map((p) => ({ locale, slug: p.slug }))
  )
  return [...caseStudyParams, ...personalParams]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params

  const cs = caseStudies.find((c) => c.slug === slug)
  if (cs) {
    return {
      title: `${cs.title} — ${profile.name}`,
      description: cs.intro,
      alternates: {
        canonical: `https://jonathanleivag.cl/${locale}/projects/${slug}`,
        languages: {
          es: `https://jonathanleivag.cl/es/projects/${slug}`,
          en: `https://jonathanleivag.cl/en/projects/${slug}`,
        },
      },
    }
  }

  const project = personalProjects.find((p) => p.slug === slug)
  if (project) {
    return {
      title: `${project.title} — ${profile.name}`,
      description: project.summary,
      openGraph: {
        title: `${project.title} — ${profile.name}`,
        description: project.summary,
        images: [
          {
            url: project.image.src,
            width: project.image.width,
            height: project.image.height,
            alt: project.image.alt,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${project.title} — ${profile.name}`,
        description: project.summary,
        images: [project.image.src],
      },
      alternates: {
        canonical: `https://jonathanleivag.cl/${locale}/projects/${slug}`,
        languages: {
          es: `https://jonathanleivag.cl/es/projects/${slug}`,
          en: `https://jonathanleivag.cl/en/projects/${slug}`,
        },
      },
    }
  }

  return { title: profile.name }
}

export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = await params

  // Try case study first
  const cs = caseStudies.find((c) => c.slug === slug)
  if (cs) {
    const t = await getTranslations({ locale, namespace: 'caseStudies' })
    return (
      <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <Link href={`/${locale}#case-studies`} className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded">
              ← {locale === 'en' ? 'Back to cases' : 'Volver a casos'}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100">{cs.title}</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">{cs.intro}</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">{t('context')}</h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{cs.context}</p>
            </section>
            <section>
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">{t('role')}</h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{cs.role}</p>
            </section>
            <section>
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">{t('challenge')}</h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{cs.challenge}</p>
            </section>
            <section>
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">{t('technicalDecisions')}</h2>
              <ul className="space-y-2">
                {cs.technicalDecisions.map((d) => (
                  <li key={d} className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                    <span className="text-emerald-500 mt-0.5 shrink-0">→</span>
                    {d}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">{t('result')}</h2>
              <p className="text-emerald-400 text-sm font-medium leading-relaxed">{cs.result}</p>
            </section>
          </div>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {cs.stack.map((tech) => (
              <span key={tech} className="text-xs bg-zinc-800 border border-white/5 text-zinc-300 px-2.5 py-1 rounded-md">{tech}</span>
            ))}
          </div>
        </div>
      </main>
    )
  }

  // Try personal project
  const project = personalProjects.find((p) => p.slug === slug)
  if (!project) notFound()

  const t = await getTranslations({ locale, namespace: 'personalProjects' })

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-32">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <Link href={`/${locale}#personal-projects`} className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded">
            {t('backToPortfolio')}
          </Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-emerald-400 font-medium mb-1">{project.domain}</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100">{project.title}</h1>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {t('visitProject')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>

        <BrowserFrame url={project.domain}>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            className="object-cover w-full"
            priority
          />
        </BrowserFrame>

        <p className="text-zinc-300 text-lg leading-relaxed">{project.summary}</p>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t('objective')}</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">{project.objective}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t('stack')}</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="text-xs bg-zinc-800 border border-white/5 text-zinc-300 px-2.5 py-1 rounded-md">{tech}</span>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t('features')}</h2>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                  <span className="text-emerald-500 mt-0.5 shrink-0">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t('technicalHighlights')}</h2>
            <ul className="space-y-2">
              {project.technicalHighlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                  <span className="text-emerald-500 mt-0.5 shrink-0">→</span>
                  {h}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="border-t border-white/5 pt-8 space-y-3">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t('learning')}</h2>
          <p className="text-emerald-400 text-sm font-medium leading-relaxed">{project.learning}</p>
        </section>
      </div>
    </main>
  )
}
