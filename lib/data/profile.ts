import { connectToDatabase } from '@/lib/mongodb'
import { Profile } from '@/models/Profile'
import type { Locale } from '@/i18n/routing'

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
