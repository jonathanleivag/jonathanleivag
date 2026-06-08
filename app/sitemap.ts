import type { MetadataRoute } from 'next'
import { getAllProjectSlugs } from '@/lib/data/projects'

const BASE_URL = 'https://jonathanleivag.cl'
const LOCALES = ['es', 'en'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projectSlugs: string[] = []
  try {
    projectSlugs = await getAllProjectSlugs()
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

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    ...homeUrls,
    ...projectUrls,
  ]
}
