import { getTranslations } from 'next-intl/server'
import { getPublicProfessionalProjects } from '@/lib/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Project } from '@/content/projects'

interface Props {
  locale: string
}

export async function Projects({ locale }: Props) {
  const t = await getTranslations('projects')
  const projects = (await getPublicProfessionalProjects(locale as 'es' | 'en')) as Project[]

  return (
    <section id="projects" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              viewCaseLabel={t('viewCase')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
