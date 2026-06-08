import { skillCategories } from '@/lib/data'
import { SkillGroup } from '@/components/ui/SkillGroup'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Stack técnico"
          title="Tecnologías que domino"
          subtitle="Herramientas que he usado en proyectos reales, no en tutoriales."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillCategories.map((cat) => (
            <SkillGroup key={cat.name} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
