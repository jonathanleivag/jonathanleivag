import type { Metadata } from 'next'
import type { Locale } from '@/i18n/routing'

export const BASE_URL = 'https://www.jonathanleivag.cl'

export const SEO_KEYWORDS: Record<Locale, string[]> = {
  es: [
    'Desarrollador Full Stack Senior',
    'JavaScript',
    'Vue.js',
    'React',
    'React Native',
    'TypeScript',
    'Express.js',
    'GraphQL',
    'Apollo',
    'Node.js',
    'Chile',
  ],
  en: [
    'Senior Full Stack Developer',
    'JavaScript',
    'Vue.js',
    'React',
    'React Native',
    'TypeScript',
    'Express.js',
    'GraphQL',
    'Apollo',
    'Node.js',
    'Chile',
  ],
}

export function pagePath(path = '') {
  if (!path || path === '/') return ''
  return path.startsWith('/') ? path : `/${path}`
}

export function pageUrl(locale: string, path = '') {
  return `${BASE_URL}/${locale}${pagePath(path)}`
}

export function pageAlternates(locale: string, path = '') {
  const normalized = pagePath(path)
  return {
    canonical: `${BASE_URL}/${locale}${normalized}`,
    languages: {
      es: `${BASE_URL}/es${normalized}`,
      en: `${BASE_URL}/en${normalized}`,
      'x-default': `${BASE_URL}/es${normalized}`,
    },
  }
}

export function ogImageUrl(locale: string) {
  return `${BASE_URL}/${locale}/opengraph-image`
}

export function defaultOgImage(locale: string, alt: string) {
  return {
    url: ogImageUrl(locale),
    width: 1200,
    height: 630,
    alt,
  }
}

export function defaultOpenGraph(
  locale: string,
  title: string,
  description: string,
  path = '',
  siteName?: string,
): NonNullable<Metadata['openGraph']> {
  return {
    type: 'website',
    locale: locale === 'en' ? 'en_US' : 'es_CL',
    url: pageUrl(locale, path),
    siteName,
    title,
    description,
    images: [defaultOgImage(locale, title)],
  }
}

export function defaultTwitter(locale: string, title: string, description: string): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    title,
    description,
    creator: '@jonathanleivag',
    images: [ogImageUrl(locale)],
  }
}

export function portfolioJsonLd({
  locale,
  name,
  role,
  description,
  email,
  github,
  linkedin,
}: {
  locale: string
  name: string
  role: string
  description: string
  email: string
  github: string
  linkedin: string
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name,
        description,
        inLanguage: ['es-CL', 'en-US'],
        publisher: { '@id': `${BASE_URL}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${BASE_URL}/#person`,
        name,
        jobTitle: role,
        url: BASE_URL,
        email,
        image: ogImageUrl(locale),
        sameAs: [github, linkedin],
        knowsAbout: ['Vue.js', 'React', 'TypeScript', 'Node.js', 'GraphQL', 'Express.js', 'JavaScript'],
      },
    ],
  }
}
