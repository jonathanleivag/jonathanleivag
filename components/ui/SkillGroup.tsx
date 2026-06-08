import type { SkillCategory } from '@/content/skills'

interface SkillGroupProps {
  category: SkillCategory
}

export function SkillGroup({ category }: SkillGroupProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
          {category.title}
        </h3>
        {category.description && (
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{category.description}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="text-sm bg-zinc-900 border border-white/5 text-zinc-300 px-3 py-1.5 rounded-lg hover:border-emerald-500/30 hover:text-emerald-400 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
