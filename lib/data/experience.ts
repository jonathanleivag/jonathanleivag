import { connectToDatabase } from '@/lib/mongodb'
import { Experience } from '@/models/Experience'
import type { Locale } from '@/i18n/routing'
import { getLocalizedField } from './profile'

export type PublicExperience = {
  company: string
  role: string
  location: string
  period: string
  isCurrent: boolean
  highlights: string[]
  stack: string[]
}

type MongoExperience = Record<string, unknown>

function toPublicExperience(doc: MongoExperience, locale: Locale): PublicExperience {
  const gl = (field: unknown) =>
    getLocalizedField(field as { es: string; en: string } | null, locale)

  return {
    company: (doc.company as string) || '',
    role: gl(doc.role) || '',
    location: (doc.location as string) || '',
    period: (doc.period as string) || '',
    isCurrent: Boolean(doc.isCurrent),
    highlights: (doc.highlights as Array<{ es: string; en: string }>)?.map((h) => gl(h)) ?? [],
    stack: (doc.stack as string[]) || [],
  }
}

export async function getPublicExperiences(locale: Locale): Promise<PublicExperience[]> {
  try {
    await connectToDatabase()
    const docs = await Experience.find({ isPublished: true }).sort({ order: 1 }).lean()
    if (!docs.length) return []
    return docs.map((d) => toPublicExperience(d as MongoExperience, locale))
  } catch {
    return []
  }
}
