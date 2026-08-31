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
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  }
}

export function defaultTwitter(title: string, description: string): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    title,
    description,
    creator: '@jonathanleivag',
    images: [`${BASE_URL}/opengraph-image`],
  }
}
