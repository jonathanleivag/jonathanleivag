export const revalidate = 86400

import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getPublicProfile } from '@/lib/data/profile'
import { getPublicLogo } from '@/lib/data/assets'
import { JsonLd } from '@/components/JsonLd'

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  const dbProfile = await getPublicProfile(locale as 'es' | 'en')

  return {
    title: {
      default: t('title'),
      template: `%s | ${dbProfile.name}`,
    },
    description: t('description'),
    keywords: [
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
    authors: [{ name: dbProfile.name, url: 'https://jonathanleivag.cl' }],
    creator: dbProfile.name,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'es_CL',
      url: `https://jonathanleivag.cl/${locale}`,
      siteName: dbProfile.name,
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: 'https://jonathanleivag.cl/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${dbProfile.name} — ${dbProfile.role}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      creator: '@jonathanleivag',
      images: ['https://jonathanleivag.cl/opengraph-image'],
    },
    alternates: {
      canonical: `https://jonathanleivag.cl/${locale}`,
      languages: {
        es: 'https://jonathanleivag.cl/es',
        en: 'https://jonathanleivag.cl/en',
        'x-default': 'https://jonathanleivag.cl/es',
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
      other: [{ rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }],
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as never)) {
    notFound()
  }

  const [messages, dbProfile, logo] = await Promise.all([
    getMessages(),
    getPublicProfile(locale as 'es' | 'en'),
    getPublicLogo(),
  ])

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navbar
        handle={dbProfile.handle}
        cvUrl={dbProfile.social.cv}
        logo={logo}
      />
      {children}
      <Footer
        name={dbProfile.name}
        role={dbProfile.role}
        handle={dbProfile.handle}
        github={dbProfile.social.github}
        linkedin={dbProfile.social.linkedin}
        email={dbProfile.social.email}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: dbProfile.name,
          jobTitle: dbProfile.role,
          url: 'https://jonathanleivag.cl',
          email: dbProfile.social.email,
          image: 'https://jonathanleivag.cl/opengraph-image',
          sameAs: [dbProfile.social.github, dbProfile.social.linkedin],
          knowsAbout: ['Vue.js', 'React', 'TypeScript', 'Node.js', 'GraphQL', 'Express.js', 'JavaScript'],
        }}
      />
    </NextIntlClientProvider>
  )
}
