import { Layers, Lightbulb, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { profile } from '@/content/profile'

const HIGHLIGHT_ICONS: LucideIcon[] = [Layers, Lightbulb, Zap]

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={profile.about.title}
          title="Construyo productos, no solo código"
          subtitle={profile.about.summary}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.about.highlights.map(({ title, description }, i) => {
            const Icon = HIGHLIGHT_ICONS[i] ?? Zap
            return (
              <div key={title} className="border-l-2 border-emerald-500 pl-5 py-1 space-y-2">
                <div className="flex items-center gap-2 text-zinc-100 font-semibold">
                  <Icon size={16} className="text-emerald-400 shrink-0" />
                  {title}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
