import { skills } from '@/content/skills'
import { SkillGroup } from '@/components/ui/SkillGroup'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { profile } from '@/content/profile'

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={profile.sections.skills.label}
          title={profile.sections.skills.title}
          subtitle={profile.sections.skills.subtitle}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {skills.map((cat) => (
            <SkillGroup key={cat.title} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
