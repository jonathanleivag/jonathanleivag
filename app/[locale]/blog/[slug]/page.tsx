export const revalidate = 86400

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPublicPostBySlug, getPublicPostSlugs, getAdjacentPosts } from '@/lib/data/posts'
import { getPublicProfile } from '@/lib/data/profile'
import { parsePostContent } from '@/lib/posts/parseContent'
import { JsonLd } from '@/components/JsonLd'
import { defaultTwitter, pageAlternates, pageUrl } from '@/lib/seo'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const locales = ['es', 'en']
  const slugs = await getPublicPostSlugs()
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPublicPostBySlug(locale as 'es' | 'en', slug)
  if (!post) return {}

  const ogImage = post.image
    ? [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt }]
    : undefined

  const twitter = defaultTwitter(locale, post.title, post.excerpt)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: pageUrl(locale, `/blog/${slug}`),
      publishedTime: post.publishedAt,
      images: ogImage,
    },
    twitter: {
      ...twitter,
      images: post.image ? [post.image.src] : twitter.images,
    },
    alternates: pageAlternates(locale, `/blog/${slug}`),
  }
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CL', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'UTC' })
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  const l = locale as 'es' | 'en'

  const post = await getPublicPostBySlug(l, slug)
  if (!post) notFound()

  const [t, tBlog, profile, { previous, next }] = await Promise.all([
    getTranslations({ locale, namespace: 'postPage' }),
    getTranslations({ locale, namespace: 'blogPage' }),
    getPublicProfile(l),
    getAdjacentPosts(l, slug),
  ])

  const blocks = parsePostContent(post.content)
  const headings = blocks.filter((b) => b.type === 'heading')
  const categoryLabel = tBlog(`category${post.category[0].toUpperCase()}${post.category.slice(1)}` as 'categoryArticulo')

  return (
    <main className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-11">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: { '@type': 'Person', name: profile.name, url: pageUrl(locale) },
          url: pageUrl(locale, `/blog/${slug}`),
          ...(post.image ? { image: post.image.src } : {}),
          keywords: post.tags.join(', '),
        }}
      />
      <Link href="/blog" className="inline-block text-[11px] tracking-[0.12em] uppercase text-[var(--dc-muted)] hover:text-[#e8e6dd] transition-colors">
        {t('backToBlog')}
      </Link>

      <header className="pt-9 pb-10 border-b border-[var(--dc-border)]">
        <span className="flex items-center gap-3.5 text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">
          <span className="px-2 py-1 border border-[var(--dc-border-strong)]">{categoryLabel}</span>
          <span>{formatDate(post.publishedAt, locale)} · {post.readingMinutes} {tBlog('minutesSuffix')}</span>
        </span>
        <h1 className="mt-[22px] max-w-[900px] font-heading text-3xl sm:text-[56px] font-black leading-[1.03] tracking-[-0.035em] text-balance">{post.title}</h1>
        <p className="mt-6 max-w-[680px] text-base leading-[1.8] text-[#c9cec9]">{post.excerpt}</p>
      </header>

      {post.image && (
        <div className="relative h-[220px] sm:h-[360px] mt-10 border border-[var(--dc-border-strong)] overflow-hidden">
          <Image src={post.image.src} alt={post.image.alt} fill sizes="(min-width: 1180px) 1180px, 100vw" className="object-cover" priority />
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_220px] gap-16 pt-12">
        <article className="max-w-[680px] text-base leading-[1.85] text-[#dcd9cf] space-y-[26px]">
          {blocks.map((block, i) =>
            block.type === 'heading' ? (
              <h2 key={i} id={block.id} className="font-heading text-2xl font-black leading-tight tracking-[-0.025em] text-[#e8e6dd] pt-4">{block.text}</h2>
            ) : (
              <p key={i}>{block.text}</p>
            )
          )}

          <div className="flex flex-wrap gap-2 pt-8 border-t border-[var(--dc-border)] text-[10px] tracking-[0.12em] uppercase text-[var(--dc-muted)]">
            {post.tags.map((tag) => <span key={tag} className="px-2.5 py-1.5 border border-[var(--dc-border-strong)]">{tag}</span>)}
          </div>
        </article>

        {headings.length > 1 && (
          <aside className="sticky top-24 self-start flex flex-col gap-3.5 text-sm leading-[1.6]">
            <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('tocLabel')}</span>
            {headings.map((h) => (
              <a key={h.id} href={`#${h.id}`} className="pl-3 border-l-2 border-[var(--dc-border)] text-[var(--dc-muted)] hover:text-[#e8e6dd] hover:border-[#e8e6dd] transition-colors">
                {h.text}
              </a>
            ))}
          </aside>
        )}
      </div>

      {(previous || next) && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-px mt-16 border-t border-[var(--dc-border)]">
          {previous ? (
            <Link href={`/blog/${previous.slug}`} className="flex flex-col gap-2.5 py-7 sm:pr-7 sm:border-r border-[var(--dc-border)] hover:bg-[var(--dc-surface)] transition-colors">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('previous')}</span>
              <span className="font-heading text-xl font-bold tracking-tight">{previous.title}</span>
            </Link>
          ) : <div />}
          {next && (
            <Link href={`/blog/${next.slug}`} className="flex flex-col items-start sm:items-end gap-2.5 py-7 sm:pl-7 text-left sm:text-right hover:bg-[var(--dc-surface)] transition-colors">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('next')}</span>
              <span className="font-heading text-xl font-bold tracking-tight">{next.title}</span>
            </Link>
          )}
        </section>
      )}
    </main>
  )
}
