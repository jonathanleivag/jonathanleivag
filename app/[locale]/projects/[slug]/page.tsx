import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { caseStudies } from '@/content/case-studies'
import { profile } from '@/content/profile'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const locales = ['es', 'en']
  return locales.flatMap((locale) =>
    caseStudies.map((cs) => ({ locale, slug: cs.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return { title: profile.name }
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

export default async function CaseStudyPage({ params }: Props) {
  const { slug, locale } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) notFound()

  const t = await getTranslations({ locale, namespace: 'caseStudies' })

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-32">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <Link
            href={`/${locale}#case-studies`}
            className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
          >
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
            <span key={tech} className="text-xs bg-zinc-800 border border-white/5 text-zinc-300 px-2.5 py-1 rounded-md">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </main>
  )
}
