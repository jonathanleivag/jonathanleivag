import { getTranslations } from 'next-intl/server'
import { getPublicPersonalProjects } from '@/lib/data/projects'
import { PersonalProjectCard } from '@/components/ui/PersonalProjectCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { PersonalProject } from '@/content/personal-projects'
import { ScrollReveal, StaggerList, StaggerItem } from '@/components/ui/ScrollReveal'

interface Props {
  locale: string
}

export async function PersonalProjects({ locale }: Props) {
  const t = await getTranslations('personalProjects')
  const personalProjects = (await getPublicPersonalProjects(locale as 'es' | 'en')) as PersonalProject[]

  return (
    <section id="personal-projects" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label={t('label')}
            title={t('title')}
            subtitle={t('subtitle')}
          />

          <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalProjects.map((project) => (
              <StaggerItem key={project.slug}>
                <PersonalProjectCard
                  project={project}
                  locale={locale}
                  viewLabel={t('viewProject')}
                />
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </ScrollReveal>
    </section>
  )
}
