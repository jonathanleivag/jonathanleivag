import { projects } from '@/content/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { profile } from '@/content/profile'

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={profile.sections.projects.label}
          title={profile.sections.projects.title}
          subtitle={profile.sections.projects.subtitle}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
