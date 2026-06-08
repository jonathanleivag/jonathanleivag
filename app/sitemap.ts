import type { MetadataRoute } from 'next'
import { caseStudies } from '@/content/case-studies'

const BASE_URL = 'https://jonathanleivag.cl'
const LOCALES = ['es', 'en'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const homeUrls = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }))

  const caseStudyUrls = LOCALES.flatMap((locale) =>
    caseStudies.map((cs) => ({
      url: `${BASE_URL}/${locale}/projects/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    ...homeUrls,
    ...caseStudyUrls,
  ]
}
