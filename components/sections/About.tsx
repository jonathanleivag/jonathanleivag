import { Layers, Lightbulb, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { SectionHeader } from '@/components/ui/SectionHeader'

const HIGHLIGHT_ICONS: LucideIcon[] = [Layers, Lightbulb, Zap]
const HIGHLIGHT_KEYS = ['frontend', 'fullstack', 'architecture'] as const

export async function About() {
  const t = await getTranslations('about')

  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label={t('label')} title={t('sectionTitle')} subtitle={t('summary')} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIGHLIGHT_KEYS.map((key, i) => {
            const Icon = HIGHLIGHT_ICONS[i] ?? Zap
            return (
              <div key={key} className="border-l-2 border-emerald-500 pl-5 py-1 space-y-2">
                <div className="flex items-center gap-2 text-zinc-100 font-semibold">
                  <Icon size={16} className="text-emerald-400 shrink-0" />
                  {t(`highlights.${key}.title`)}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{t(`highlights.${key}.description`)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
