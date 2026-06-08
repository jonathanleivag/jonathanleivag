import { caseStudies } from '@/content/case-studies'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { profile } from '@/content/profile'

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={profile.sections.caseStudies.label}
          title={profile.sections.caseStudies.title}
          subtitle={profile.sections.caseStudies.subtitle}
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {caseStudies.map((cs) => (
            <article
              key={cs.slug}
              className="border border-white/5 bg-zinc-900/40 rounded-xl p-7 space-y-6 hover:border-emerald-500/20 transition-colors"
            >
              <div>
                <h3 className="text-xl font-semibold text-zinc-100">{cs.title}</h3>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{cs.intro}</p>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Contexto
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{cs.context}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Decisiones técnicas
                  </p>
                  <ul className="space-y-2">
                    {cs.technicalDecisions.map((d) => (
                      <li key={d} className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                        <span className="text-emerald-500 mt-0.5 shrink-0">→</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Resultado
                  </p>
                  <p className="text-emerald-400 text-sm font-medium">{cs.result}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {cs.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-zinc-800 border border-white/5 text-zinc-300 px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={`/projects/${cs.slug}`}
                  className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
                  aria-label={`Ver caso de estudio: ${cs.title}`}
                >
                  Ver caso completo
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
