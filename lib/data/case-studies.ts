import { connectToDatabase } from '@/lib/mongodb'
import { CaseStudy } from '@/models/CaseStudy'
import type { Locale } from '@/i18n/routing'
import { getLocalizedField } from './profile'
import { caseStudies as staticCaseStudies } from '@/content/case-studies'

type MongoCaseStudy = Record<string, unknown>

function toPublicCaseStudy(doc: MongoCaseStudy, locale: Locale) {
  const gl = (field: unknown) =>
    getLocalizedField(field as { es: string; en: string } | null, locale)

  return {
    slug: doc.slug as string,
    title: gl(doc.title) || (doc.slug as string),
    intro: gl(doc.intro) || '',
    context: gl(doc.context) || '',
    role: gl(doc.role) || '',
    challenge: gl(doc.challenge) || '',
    approach: (doc.approach as Array<{ es: string; en: string }>)?.map((a) => gl(a)) ?? [],
    technicalDecisions: (doc.technicalDecisions as Array<{ es: string; en: string }>)?.map((d) => gl(d)) ?? [],
    result: gl(doc.result) || '',
    stack: (doc.stack as string[]) || [],
    source: (doc.source as string) || '',
    relatedProjectSlug: (doc.relatedProjectSlug as string) || '',
  }
}

export async function getPublicCaseStudies(locale: Locale) {
  try {
    await connectToDatabase()
    const docs = await CaseStudy.find({ isPublished: true }).sort({ order: 1 }).lean()
    if (!docs.length) return staticCaseStudies
    return docs.map((d) => toPublicCaseStudy(d as MongoCaseStudy, locale))
  } catch {
    return staticCaseStudies
  }
}

export async function getPublicCaseStudyBySlug(locale: Locale, slug: string) {
  try {
    await connectToDatabase()
    const doc = await CaseStudy.findOne({ slug, isPublished: true }).lean()
    if (!doc) return null
    return toPublicCaseStudy(doc as MongoCaseStudy, locale)
  } catch {
    return null
  }
}

export async function getPublicCaseStudySlugs(): Promise<string[]> {
  try {
    await connectToDatabase()
    const docs = await CaseStudy.find({ isPublished: true }, { slug: 1 }).lean()
    return docs.map((d) => (d as MongoCaseStudy).slug as string)
  } catch {
    return []
  }
}
