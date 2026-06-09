import type { SkillCategory } from '@/content/skills'
import { SKILL_URLS } from '@/lib/skill-urls'

interface SkillGroupProps {
  category: SkillCategory & { skillUrls?: Record<string, string> }
}

export function SkillGroup({ category }: SkillGroupProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
          {category.title}
        </h3>
        {category.description && (
          <p className="mt-1 text-sm text-zinc-300 leading-relaxed">{category.description}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => {
          // MongoDB URLs take priority over static fallback
          const url = category.skillUrls?.[skill] || SKILL_URLS[skill]
          const baseClass = 'text-sm bg-zinc-900 border border-white/5 text-zinc-300 px-3 py-1.5 rounded-lg transition-colors'
          if (url) {
            return (
              <a
                key={skill}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClass} hover:border-emerald-500/30 hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400`}
                title={`Ver documentación de ${skill}`}
              >
                {skill}
              </a>
            )
          }
          return (
            <span
              key={skill}
              className={`${baseClass} cursor-default`}
            >
              {skill}
            </span>
          )
        })}
      </div>
    </div>
  )
}
