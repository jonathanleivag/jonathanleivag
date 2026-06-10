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
    if (!doc) return staticProfile

    const gl = (field: unknown) =>
      getLocalizedField(field as { es: string; en: string } | null, locale)

    const social = doc.social as { github?: string; linkedin?: string; email?: string; cv?: string } | null

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
        // about.summary uses aboutSummary field (long text), falls back to first body paragraph
        summary: gl(doc.aboutSummary as { es: string; en: string } | null)
          || gl((doc.about as { body?: Array<{ es: string; en: string }> } | null)?.body?.[0])
          || staticProfile.about.summary,
        highlights: (doc.about as { highlights?: Array<{ title: { es: string; en: string }; description: { es: string; en: string } }> } | null)?.highlights?.map((h) => ({
          title: getLocalizedField(h.title, locale),
          description: getLocalizedField(h.description, locale),
        })) || staticProfile.about.highlights,
        body: staticProfile.about.body,
      },
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
    return staticProfile
  }
}
