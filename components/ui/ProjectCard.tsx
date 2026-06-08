import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/content/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col h-full border border-white/5 bg-zinc-900/40 rounded-xl p-6 hover:-translate-y-0.5 hover:border-emerald-500/20 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-zinc-100 leading-snug">
            {project.title}
          </h3>
        </div>
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">{project.summary}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs bg-zinc-800 border border-white/5 text-zinc-300 px-2.5 py-1 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="border-t border-white/5 pt-4 flex items-center justify-between">
        <p className="text-xs text-emerald-400 font-medium leading-snug max-w-[70%]">
          {project.value}
        </p>
        <a
          href={`/projects/${project.slug}`}
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-emerald-400 transition-colors group-hover:text-zinc-300 min-h-[44px] min-w-[44px] justify-end"
          aria-label={`Ver caso de ${project.title}`}
        >
          Ver caso
          <ArrowUpRight size={13} />
        </a>
      </div>
    </article>
  )
}
