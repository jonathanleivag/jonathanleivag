import { getPublicProfile } from '@/lib/data/profile'
import { createOgImageResponse } from '@/lib/og-image'
import { routing, type Locale } from '@/i18n/routing'

export const alt = 'Jonathan Leiva Gómez'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleOGImage({ params }: Props) {
  const { locale } = await params
  const profile = await getPublicProfile(locale as Locale)
  return createOgImageResponse(profile.name, profile.role)
}
