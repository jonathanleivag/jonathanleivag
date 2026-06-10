import { getTranslations } from 'next-intl/server'
import { getPublicSkillCategories } from '@/lib/data/skills'
import { SkillGroup } from '@/components/ui/SkillGroup'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal, StaggerList, StaggerItem } from '@/components/ui/ScrollReveal'

interface Props {
  locale: string
}

export async function Skills({ locale }: Props) {
  const t = await getTranslations('skills')
  const skills = await getPublicSkillCategories(locale as 'es' | 'en')

  return (
    <section id="skills" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} />
          <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {skills.map((cat) => (
              <StaggerItem key={cat.title}>
                <SkillGroup category={cat} />
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </ScrollReveal>
    </section>
  )
}
