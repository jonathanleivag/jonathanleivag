import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'
import type { Locale } from '@/i18n/routing'
import { getLocalizedField } from './profile'
import { posts as staticPosts } from '@/content/posts'

export type PublicPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: 'articulo' | 'til' | 'tutorial' | 'snippet' | 'caso'
  tags: string[]
  readingMinutes: number
  isFeatured: boolean
  publishedAt: string
  image?: { src: string; alt: string; width: number; height: number }
}

type MongoPost = Record<string, unknown>

function toPublicPost(doc: MongoPost, locale: Locale): PublicPost {
  const gl = (field: unknown) =>
    getLocalizedField(field as { es: string; en: string } | null, locale)

  const publishedAt = doc.publishedAt as Date | string | undefined
  const image = doc.image as { url?: string; alt?: string; width?: number; height?: number } | null
  return {
    slug: doc.slug as string,
    title: gl(doc.title) || (doc.slug as string),
    excerpt: gl(doc.excerpt) || '',
    content: gl(doc.content) || '',
    category: (doc.category as PublicPost['category']) || 'articulo',
    tags: (doc.tags as string[]) || [],
    readingMinutes: (doc.readingMinutes as number) || 5,
    isFeatured: Boolean(doc.isFeatured),
    publishedAt: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
    image: image?.url ? {
      src: image.url,
      alt: image.alt || gl(doc.title) || '',
      width: image.width || 1200,
      height: image.height || 800,
    } : undefined,
  }
}

// The static fallback (content/posts.ts) has no per-locale variant — it's single-language
// seed content, unlike the Mongo documents it stands in for. `locale` is intentionally not
// a parameter here.
function staticToPublic(): PublicPost[] {
  return staticPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    tags: p.tags,
    readingMinutes: p.readingMinutes,
    isFeatured: p.isFeatured,
    publishedAt: new Date(p.publishedAt).toISOString(),
  }))
}

export async function getPublicPosts(locale: Locale): Promise<PublicPost[]> {
  try {
    await connectToDatabase()
    const docs = await Post.find({ isPublished: true }).sort({ publishedAt: -1 }).lean()
    return docs.map((d) => toPublicPost(d as MongoPost, locale))
  } catch {
    return staticToPublic()
  }
}

export async function getPublicPostBySlug(locale: Locale, slug: string): Promise<PublicPost | null> {
  try {
    await connectToDatabase()
    const doc = await Post.findOne({ slug, isPublished: true }).lean()
    if (!doc) return null
    return toPublicPost(doc as MongoPost, locale)
  } catch {
    return staticToPublic().find((p) => p.slug === slug) ?? null
  }
}

export async function getPublicPostSlugs(): Promise<string[]> {
  try {
    await connectToDatabase()
    const docs = await Post.find({ isPublished: true }, { slug: 1 }).lean()
    if (!docs.length) return staticPosts.map((p) => p.slug)
    return docs.map((d) => (d as MongoPost).slug as string)
  } catch {
    return staticPosts.map((p) => p.slug)
  }
}

export async function getAdjacentPosts(
  locale: Locale,
  slug: string
): Promise<{ previous: PublicPost | null; next: PublicPost | null }> {
  const all = await getPublicPosts(locale)
  const index = all.findIndex((p) => p.slug === slug)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: index < all.length - 1 ? all[index + 1] : null,
    next: index > 0 ? all[index - 1] : null,
  }
}
