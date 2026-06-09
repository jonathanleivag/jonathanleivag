import { getTranslations } from 'next-intl/server'
import { getPublicExperiences } from '@/lib/data/experience'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface Props {
  locale: string
}

export async function Experience({ locale }: Props) {
  const t = await getTranslations('experience')
  const experiences = await getPublicExperiences(locale as 'es' | 'en')

  if (!experiences.length) return null

  return (
    <section id="experience" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={t('label')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-white/5 hidden sm:block" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div key={`${exp.company}-${index}`} className="sm:pl-8 relative">
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-emerald-500 -translate-x-[3px] hidden sm:block" />

                <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 space-y-4 hover:border-emerald-500/15 transition-colors">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-zinc-100">{exp.role}</h3>
                        {exp.isCurrent && (
                          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            {t('current')}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-emerald-400 mt-0.5">{exp.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm text-zinc-400">{exp.period}</p>
                      {exp.location && (
                        <p className="text-xs text-zinc-600 mt-0.5">{exp.location}</p>
                      )}
                    </div>
                  </div>

                  {/* Highlights */}
                  {exp.highlights.length > 0 && (
                    <ul className="space-y-1.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2 text-sm text-zinc-300 leading-relaxed">
                          <span className="text-emerald-500 mt-1 shrink-0 text-xs">→</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Stack */}
                  {exp.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.stack.map((tech) => (
                        <span key={tech} className="text-xs bg-zinc-800 border border-white/5 text-zinc-400 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
