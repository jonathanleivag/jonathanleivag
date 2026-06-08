import type { SkillCategory } from '@/lib/types'

interface SkillGroupProps {
  category: SkillCategory
}

export function SkillGroup({ category }: SkillGroupProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
        {category.name}
      </h3>
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
