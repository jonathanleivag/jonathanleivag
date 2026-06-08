import type { MetadataRoute } from 'next'
import { caseStudies } from '@/content/case-studies'

const BASE_URL = 'https://jonathanleivag.cl'

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyUrls = caseStudies.map((cs) => ({
    url: `${BASE_URL}/projects/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...caseStudyUrls,
  ]
}
