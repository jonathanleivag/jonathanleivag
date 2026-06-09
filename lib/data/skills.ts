import { connectToDatabase } from '@/lib/mongodb'
import { SkillCategory } from '@/models/SkillCategory'
import type { Locale } from '@/i18n/routing'
import { getLocalizedField } from './profile'
import { skills as staticSkills } from '@/content/skills'

export async function getSkillCategories() {
  await connectToDatabase()
  return SkillCategory.find({ isPublished: true }).sort({ order: 1 }).lean()
}

export async function getPublicSkillCategories(locale: Locale) {
  try {
    const docs = await getSkillCategories()
    if (!docs.length) return staticSkills

    return docs.map((doc) => {
      const d = doc as Record<string, unknown>
      return {
        title: getLocalizedField(d.title as { es: string; en: string } | null, locale) || (d.title as { es: string })?.es || '',
        description: getLocalizedField(d.description as { es: string; en: string } | null, locale) || '',
        skills: (d.skills as string[]) || [],
      }
    })
  } catch {
    return staticSkills
  }
}
