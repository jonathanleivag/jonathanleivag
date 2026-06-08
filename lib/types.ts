export interface Project {
  id: string
  title: string
  category: string
  problem: string
  stack: string[]
  impact: string
  slug: string
  links?: { demo?: string; repo?: string }
}

export interface CaseStudy {
  id: string
  title: string
  category: string
  context: string
  decisions: string[]
  result: string
  stack: string[]
  links?: { demo?: string; repo?: string }
}

export interface SkillCategory {
  name: string
  skills: string[]
}
