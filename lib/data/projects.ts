import { connectToDatabase } from '@/lib/mongodb'
import { Project } from '@/models/Project'

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
