import type { MetadataRoute } from 'next'
import { getAllProjectSlugs } from '@/lib/data/projects'
import { getPublicPostSlugs } from '@/lib/data/posts'

const BASE_URL = 'https://www.jonathanleivag.cl'
const LOCALES = ['es', 'en'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projectSlugs: string[] = []
  try {
    projectSlugs = await getAllProjectSlugs()
  } catch {
    // fallback to empty if DB unavailable
  }

  let postSlugs: string[] = []
  try {
    postSlugs = await getPublicPostSlugs()
  } catch {
    // fallback to empty if DB unavailable
  }

  const homeUrls = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }))

  const projectUrls = LOCALES.flatMap((locale) =>
    projectSlugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  const blogIndexUrls = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogPostUrls = LOCALES.flatMap((locale) =>
    postSlugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  const aboutUrls = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const contactUrls = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}/contact`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    ...homeUrls,
    ...projectUrls,
    ...blogIndexUrls,
    ...blogPostUrls,
    ...aboutUrls,
    ...contactUrls,
  ]
}
