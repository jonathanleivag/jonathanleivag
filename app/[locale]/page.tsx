export const revalidate = 86400

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getPublicProfile } from '@/lib/data/profile'
import { getPublicCaseStudies } from '@/lib/data/case-studies'
import { getPublicPersonalProjects } from '@/lib/data/projects'
import { getPublicPosts } from '@/lib/data/posts'
import { CaseRow } from '@/components/ui/CaseRow'
import { PostRow } from '@/components/ui/PostRow'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface Props {
  params: Promise<{ locale: string }>
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CL', { year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' }).toUpperCase()
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const l = locale as 'es' | 'en'

  const [profile, tHero, tHome, tBlog, caseStudies, personalProjects, posts] = await Promise.all([
    getPublicProfile(l),
    getTranslations({ locale, namespace: 'hero' }),
    getTranslations({ locale, namespace: 'home' }),
    getTranslations({ locale, namespace: 'blogPage' }),
    getPublicCaseStudies(l),
    getPublicPersonalProjects(l),
    getPublicPosts(l),
  ])

  return (
    <main>
      <header className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-20 pb-16">
        <div className="flex items-center gap-2.5 mb-9 text-[11px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">
          <span className="text-[#e8e6dd]">$</span>
          <span>{tHero('terminalLine')}</span>
          <span className="inline-block w-2 h-3.5 bg-[#e8e6dd] animate-pulse" />
        </div>
        <h1 className="max-w-[960px] font-heading text-4xl sm:text-5xl lg:text-[66px] font-black leading-[1.02] tracking-[-0.035em] text-balance">
          {tHero('headline')}
        </h1>
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-end mt-12">
          <p className="max-w-[580px] text-sm leading-[1.9] text-[#c9cec9]">{profile.hero.subtitle}</p>
          <div className="flex flex-col gap-2.5">
            <Link href="/#cases" className="flex items-center justify-between px-[18px] py-4 bg-[#e8e6dd] text-[#111111] text-xs font-bold tracking-[0.1em]">
              <span>{tHero('primaryCta').toUpperCase()}</span><span>→</span>
            </Link>
            <Link href="/contact" className="flex items-center justify-between px-[18px] py-4 border border-[var(--dc-border-strong)] text-xs tracking-[0.1em] text-[#c9cec9] hover:border-[#e8e6dd] hover:text-[#e8e6dd] transition-colors">
              <span>{tHero('secondaryCta').toUpperCase()}</span><span>→</span>
            </Link>
            <span className="flex items-center gap-2 mt-1 text-[11px] tracking-[0.08em] text-[var(--dc-muted)]">
              <span className="w-1.5 h-1.5 bg-[#e8e6dd]" />{tHero('availability')}
            </span>
          </div>
        </div>
      </header>

      <ScrollReveal>
        <section className="border-t border-b border-[var(--dc-border)]">
          <div className="grid grid-cols-2 sm:grid-cols-4 max-w-[1180px] mx-auto px-6 sm:px-10">
            {[
              [tHero('stat1Value'), tHero('stat1Label')],
              [tHero('stat2Value'), tHero('stat2Label')],
              [tHero('stat3Value'), tHero('stat3Label')],
              [tHero('stat4Value'), tHero('stat4Label')],
            ].map(([value, label], i) => (
              <div key={label} className={`flex flex-col gap-2 py-6 px-4 sm:px-5 ${i < 3 ? 'sm:border-r border-[var(--dc-border)]' : ''}`}>
                <span className="font-heading text-3xl sm:text-[38px] font-black leading-none tracking-[-0.03em]">{value}</span>
                <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{label}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="cases" className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-16">
          <div className="flex items-baseline justify-between mb-7">
            <h2 className="text-xs font-bold tracking-[0.2em] text-[var(--dc-muted)]">{tHome('caseStudiesLabel')}</h2>
          </div>
          {caseStudies.map((cs, i) => (
            <CaseRow key={cs.slug} index={i + 1} title={cs.title} category={cs.stack.slice(0, 2).join(' · ')} intro={cs.intro} href={`/projects/${cs.slug}`} />
          ))}
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-14">
          <h2 className="text-xs font-bold tracking-[0.2em] text-[var(--dc-muted)] mb-6">{tHome('personalProjectsLabel')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalProjects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="flex flex-col gap-3 group">
                <div className="relative h-[132px] border border-[var(--dc-border-strong)] overflow-hidden">
                  {p.image && <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />}
                </div>
                <span className="font-heading text-base font-black tracking-tight text-[#e8e6dd] group-hover:opacity-80">{p.title}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase text-[var(--dc-muted)]">{p.stack.slice(0, 3).join(' · ')}</span>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight">{tHome('notesLabel')}</h2>
            <Link href="/blog" className="text-[11px] tracking-[0.12em] uppercase text-[var(--dc-muted)] hover:text-[#e8e6dd] transition-colors">
              {tHome('seeAllNotes')}
            </Link>
          </div>
          {posts.slice(0, 3).map((post) => (
            <PostRow
              key={post.slug}
              date={formatDate(post.publishedAt, locale)}
              category={tBlog(`category${post.category[0].toUpperCase()}${post.category.slice(1)}` as 'categoryArticulo')}
              minutesLabel={`${post.readingMinutes} ${tBlog('minutesSuffix')}`}
              title={post.title}
              href={`/blog/${post.slug}`}
            />
          ))}
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mt-[70px] bg-[#e8e6dd] text-[#111111]">
          <div className="grid lg:grid-cols-[1fr_auto] items-center gap-10 max-w-[1180px] mx-auto px-6 sm:px-10 py-12">
            <h2 className="max-w-[660px] font-heading text-2xl sm:text-4xl font-black leading-tight tracking-tight">{tHome('ctaTitle')}</h2>
            <Link href="/contact" className="px-[26px] py-[18px] bg-[#111111] text-[#e8e6dd] text-xs font-bold tracking-[0.1em] self-start">
              {tHome('ctaButton')}
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </main>
  )
}
