export const revalidate = 86400

import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPublicPosts } from '@/lib/data/posts'

const CATEGORIES = ['articulo', 'til', 'tutorial', 'snippet', 'caso'] as const

interface Props {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blogPage' })
  return { title: t('heading'), description: t('subtitle') }
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CL', { year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' }).toUpperCase()
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params
  const { category } = await searchParams
  const l = locale as 'es' | 'en'

  const [t, allPosts] = await Promise.all([
    getTranslations({ locale, namespace: 'blogPage' }),
    getPublicPosts(l),
  ])

  const filtered = category ? allPosts.filter((p) => p.category === category) : allPosts

  const counts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = allPosts.filter((p) => p.category === cat).length
    return acc
  }, {})

  const categoryLabel = (cat: string) => t(`category${cat[0].toUpperCase()}${cat.slice(1)}` as 'categoryArticulo')

  return (
    <main className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-16">
      <header className="pb-11">
        <span className="text-[11px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('eyebrow')}</span>
        <h1 className="mt-5 max-w-[820px] font-heading text-3xl sm:text-[60px] font-black leading-[1.02] tracking-[-0.035em]">{t('heading')}</h1>
        <p className="mt-6 max-w-[560px] text-sm leading-[1.9] text-[#c9cec9]">{t('subtitle')}</p>
      </header>

      <div className="flex flex-wrap gap-2 py-5 border-t border-b border-[var(--dc-border)] text-[11px] tracking-[0.12em] uppercase">
        <Link href="/blog" className={`px-3.5 py-1.5 ${!category ? 'bg-[#e8e6dd] text-[#111111] font-bold' : 'border border-[var(--dc-border-strong)] text-[#c9cec9] hover:border-[#e8e6dd]'}`}>
          {t('filterAll')} · {allPosts.length}
        </Link>
        {CATEGORIES.filter((cat) => counts[cat] > 0).map((cat) => (
          <Link key={cat} href={`/blog?category=${cat}`} className={`px-3.5 py-1.5 ${category === cat ? 'bg-[#e8e6dd] text-[#111111] font-bold' : 'border border-[var(--dc-border-strong)] text-[#c9cec9] hover:border-[#e8e6dd]'}`}>
            {categoryLabel(cat)} · {counts[cat]}
          </Link>
        ))}
      </div>

      <section className="pt-4 pb-16">
        {filtered.map((post) => (
          <div key={post.slug}>
            {post.isFeatured && (
              <Link href={`/blog/${post.slug}`} className="grid lg:grid-cols-[1fr_260px] items-center gap-8 py-11 border-b border-[var(--dc-border)]">
                <div>
                  <span className="flex items-center gap-3.5 text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">
                    <span className="px-2 py-1 bg-[#e8e6dd] text-[#111111] font-bold">{t('featuredBadge')}</span>
                    <span>{formatDate(post.publishedAt, locale)} · {categoryLabel(post.category)} · {post.readingMinutes} {t('minutesSuffix')}</span>
                  </span>
                  <h2 className="mt-[18px] font-heading text-2xl sm:text-[38px] font-black leading-[1.06] tracking-[-0.03em]">{post.title}</h2>
                  <p className="mt-3 text-sm leading-[1.9] text-[#c9cec9] max-w-2xl">{post.excerpt}</p>
                </div>
                {post.image && (
                  <div className="relative h-[160px] border border-[var(--dc-border-strong)] overflow-hidden hidden lg:block">
                    <Image src={post.image.src} alt={post.image.alt} fill sizes="260px" className="object-cover" />
                  </div>
                )}
              </Link>
            )}
          </div>
        ))}
        {filtered.filter((p) => !p.isFeatured).map((post) => (
          <PostRowWithCategory
            key={post.slug}
            date={formatDate(post.publishedAt, locale)}
            category={categoryLabel(post.category)}
            minutes={`${post.readingMinutes} ${t('minutesSuffix')}`}
            title={post.title}
            href={`/blog/${post.slug}`}
            image={post.image}
          />
        ))}
      </section>
    </main>
  )
}

function PostRowWithCategory({ date, category, minutes, title, href, image }: { date: string; category: string; minutes: string; title: string; href: string; image?: { src: string; alt: string } }) {
  return (
    <Link href={href} className="grid grid-cols-[40px_90px_minmax(0,1fr)_28px] sm:grid-cols-[48px_140px_96px_minmax(0,1fr)_60px_28px] items-center gap-5 py-5 px-2 border-t border-[var(--dc-border)] hover:bg-[var(--dc-surface)] transition-colors">
      <span className="relative w-10 h-10 border border-[var(--dc-border-strong)] overflow-hidden shrink-0">
        {image && <Image src={image.src} alt={image.alt} fill sizes="40px" className="object-cover" />}
      </span>
      <span className="text-[11px] tracking-[0.08em] text-[var(--dc-muted)]">{date}</span>
      <span className="text-[10px] tracking-[0.12em] text-[var(--dc-muted)] uppercase hidden sm:block">{category}</span>
      <span className="font-heading text-lg font-bold tracking-tight">{title}</span>
      <span className="text-[10px] text-[var(--dc-muted)] hidden sm:block">{minutes}</span>
      <span className="text-right text-[var(--dc-muted)]">→</span>
    </Link>
  )
}
