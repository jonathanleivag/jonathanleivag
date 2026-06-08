import { getTranslations } from 'next-intl/server'
import { skills } from '@/content/skills'
import { SkillGroup } from '@/components/ui/SkillGroup'
import { SectionHeader } from '@/components/ui/SectionHeader'

export async function Skills() {
  const t = await getTranslations('skills')

  return (
    <section id="skills" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {skills.map((cat) => (
            <SkillGroup key={cat.title} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
