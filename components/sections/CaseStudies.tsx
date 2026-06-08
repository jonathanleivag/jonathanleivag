import { caseStudies } from '@/lib/data'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Casos de estudio"
          title="Decisiones técnicas en contexto"
          subtitle="No solo qué se construyó, sino por qué y cómo. Problemas reales, trade-offs reales."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {caseStudies.map((cs) => (
            <article
              key={cs.id}
              className="border border-white/5 bg-zinc-900/40 rounded-xl p-7 space-y-6 hover:border-emerald-500/20 transition-colors"
            >
              <div>
                <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                  {cs.category}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-zinc-100">{cs.title}</h3>
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
                    {cs.decisions.map((d, i) => (
                      <li key={i} className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
