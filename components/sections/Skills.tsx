import { getTranslations } from 'next-intl/server'
import { getPublicSkillCategories } from '@/lib/data/skills'
import { SkillGroup } from '@/components/ui/SkillGroup'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface Props {
  locale: string
}

export async function Skills({ locale }: Props) {
  const t = await getTranslations('skills')
  const skills = await getPublicSkillCategories(locale as 'es' | 'en')

  return (
    <section id="skills" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {skills.map((cat, index) => {
            const isLast = index === skills.length - 1
            const isFormacion = cat.title === 'Formación'
            if (isLast && isFormacion) {
              return (
                <div key={cat.title} className="sm:col-span-2 lg:col-span-3 border-t border-white/5 pt-8 mt-2">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">{cat.title}</h3>
                    {cat.description && (
                      <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{cat.description}</p>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {cat.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-base text-zinc-300">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            return <SkillGroup key={cat.title} category={cat} />
          })}
        </div>
      </div>
    </section>
  )
}
