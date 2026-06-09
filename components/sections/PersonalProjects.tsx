import { getTranslations } from 'next-intl/server'
import { getPublicPersonalProjects } from '@/lib/data/projects'
import { PersonalProjectCard } from '@/components/ui/PersonalProjectCard'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface Props {
  locale: string
}

export async function PersonalProjects({ locale }: Props) {
  const t = await getTranslations('personalProjects')
  const personalProjects = await getPublicPersonalProjects(locale as 'es' | 'en')

  return (
    <section id="personal-projects" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={t('label')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalProjects.map((project) => (
            <PersonalProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              viewLabel={t('viewProject')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
