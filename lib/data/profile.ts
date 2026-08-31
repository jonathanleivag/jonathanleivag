import { connectToDatabase } from '@/lib/mongodb'
import { Profile } from '@/models/Profile'
import type { Locale } from '@/i18n/routing'
import { profile as staticProfile } from '@/content/profile'

export async function getProfile() {
  await connectToDatabase()
  const doc = await Profile.findOne().lean()
  return doc
}

export function getLocalizedField(
  field: { es: string; en: string } | null | undefined,
  locale: Locale
): string {
  if (!field) return ''
  return field[locale] ?? field.es ?? ''
}

export async function getPublicProfile(locale: Locale) {
  try {
    const doc = await getProfile()
    if (!doc) return { ...staticProfile, portrait: undefined }

    const gl = (field: unknown) =>
      getLocalizedField(field as { es: string; en: string } | null, locale)

    const social = doc.social as { github?: string; linkedin?: string; email?: string; cv?: string } | null
    const about = doc.about as { body?: Array<{ es: string; en: string }>; highlights?: Array<{ title: { es: string; en: string }; description: { es: string; en: string } }> } | null
    const portrait = doc.portrait as { url?: string; alt?: string; width?: number; height?: number } | null
    const body = about?.body?.map((p) => gl(p)).filter(Boolean) ?? []

    return {
      name: (doc.name as string) || staticProfile.name,
      handle: (doc.handle as string) || staticProfile.handle,
      role: gl(doc.role) || staticProfile.role,
      location: (doc.location as string) || staticProfile.location,
      availability: gl(doc.availability) || staticProfile.availability,
      hero: {
        headline: gl(doc.headline) || staticProfile.hero.headline,
        subtitle: gl(doc.summary) || staticProfile.hero.subtitle,
        primaryCta: staticProfile.hero.primaryCta,
        secondaryCta: staticProfile.hero.secondaryCta,
      },
      about: {
        title: staticProfile.about.title,
        sectionTitle: staticProfile.about.sectionTitle,
        summary: gl(doc.summary) || staticProfile.about.summary,
        highlights: about?.highlights?.map((h) => ({
          title: getLocalizedField(h.title, locale),
          description: getLocalizedField(h.description, locale),
        })) || staticProfile.about.highlights,
        body: body.length ? body : staticProfile.about.body,
      },
      portrait: portrait?.url ? {
        src: portrait.url,
        alt: portrait.alt || (doc.name as string) || '',
        width: portrait.width || 1200,
        height: portrait.height || 800,
      } : undefined,
      social: {
        github: social?.github || staticProfile.social.github,
        linkedin: social?.linkedin || staticProfile.social.linkedin,
        email: social?.email || staticProfile.social.email,
        cv: social?.cv || staticProfile.social.cv,
      },
      contact: staticProfile.contact,
      sections: staticProfile.sections,
      metaTitle: staticProfile.metaTitle,
      metaDescription: staticProfile.metaDescription,
    }
  } catch {
    return { ...staticProfile, portrait: undefined }
  }
}
