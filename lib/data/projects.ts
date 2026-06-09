import { connectToDatabase } from '@/lib/mongodb'
import { Project } from '@/models/Project'
import type { Locale } from '@/i18n/routing'
import { getLocalizedField } from './profile'
import { projects as staticProjects } from '@/content/projects'
import { personalProjects as staticPersonalProjects } from '@/content/personal-projects'

export async function getProfessionalProjects() {
  await connectToDatabase()
  return Project.find({ type: 'professional', isPublished: true })
    .sort({ order: 1 })
    .lean()
}

export async function getPersonalProjects() {
  await connectToDatabase()
  return Project.find({ type: 'personal', isPublished: true })
    .sort({ order: 1 })
    .lean()
}

export async function getProjectBySlug(slug: string) {
  await connectToDatabase()
  return Project.findOne({ slug, isPublished: true }).lean()
}

export async function getAllProjectSlugs() {
  await connectToDatabase()
  const projects = await Project.find({ isPublished: true }, { slug: 1 }).lean()
  return projects.map((p) => p.slug as string)
}

type MongoProject = Record<string, unknown>

function toPublicProject(doc: MongoProject, locale: Locale) {
  const gl = (field: unknown) =>
    getLocalizedField(field as { es: string; en: string } | null, locale)

  const image = doc.image as { url?: string; alt?: string; width?: number; height?: number; src?: string } | null

  return {
    slug: doc.slug as string,
    title: gl(doc.title) || (doc.slug as string),
    category: (doc.category as string) || '',
    summary: gl(doc.summary) || '',
    value: gl(doc.value) || '',
    stack: (doc.stack as string[]) || [],
    url: (doc.url as string) || '',
    domain: (doc.domain as string) || '',
    status: (doc.status as string) || 'live',
    image: image ? {
      src: (image.url || image.src) ?? '',
      alt: (image.alt as string) || gl(doc.title) || '',
      width: (image.width as number) || 1200,
      height: (image.height as number) || 800,
    } : undefined,
    features: (doc.features as Array<{ es: string; en: string }>)?.map((f) => gl(f)) ?? [],
    technicalHighlights: (doc.technicalHighlights as Array<{ es: string; en: string }>)?.map((h) => gl(h)) ?? [],
    learning: gl(doc.learning) || '',
    objective: gl(doc.objective) || '',
    highlights: (doc.features as Array<{ es: string; en: string }>)?.map((f) => gl(f)) ?? [],
  }
}

export async function getPublicProfessionalProjects(locale: Locale) {
  try {
    const docs = await getProfessionalProjects()
    if (!docs.length) return staticProjects
    return docs.map((d) => toPublicProject(d as MongoProject, locale))
  } catch {
    return staticProjects
  }
}

export async function getPublicPersonalProjects(locale: Locale) {
  try {
    const docs = await getPersonalProjects()
    if (!docs.length) return staticPersonalProjects
    return docs.map((d) => toPublicProject(d as MongoProject, locale))
  } catch {
    return staticPersonalProjects
  }
}
