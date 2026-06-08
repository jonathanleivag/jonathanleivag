import { connectToDatabase } from '@/lib/mongodb'
import { SkillCategory } from '@/models/SkillCategory'

export async function getSkillCategories() {
  await connectToDatabase()
  return SkillCategory.find({ isPublished: true }).sort({ order: 1 }).lean()
}
