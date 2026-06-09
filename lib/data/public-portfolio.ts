import { getProfile } from './profile'
import { getProfessionalProjects, getPersonalProjects, getAllProjectSlugs } from './projects'
import { getSkillCategories } from './skills'

export type {} from './profile'

export async function getPublicHomeData() {
  try {
    const [profile, professionalProjects, personalProjects, skillCategories] = await Promise.all([
      getProfile(),
      getProfessionalProjects(),
      getPersonalProjects(),
      getSkillCategories(),
    ])
    return { profile, professionalProjects, personalProjects, skillCategories }
  } catch (error) {
    console.error('[public-portfolio] getPublicHomeData error:', error)
    return { profile: null, professionalProjects: [], personalProjects: [], skillCategories: [] }
  }
}

export async function getPublicProjectSlugs(): Promise<string[]> {
  try {
    return await getAllProjectSlugs()
  } catch {
    return []
  }
}
