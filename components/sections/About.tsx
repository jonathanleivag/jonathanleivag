import { Layers, Lightbulb, Zap } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const HIGHLIGHTS = [
  {
    icon: Layers,
    title: 'Arquitectura',
    description: 'Decisiones técnicas balanceadas entre calidad, velocidad y mantenibilidad.',
  },
  {
    icon: Lightbulb,
    title: 'Producto',
    description: 'Entiendo el problema antes de implementar. Conecto tecnología con negocio.',
  },
  {
    icon: Zap,
    title: 'Ejecución end-to-end',
    description: 'Frontend, backend, infraestructura y despliegue. Sin zonas grises.',
  },
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Sobre mí"
          title="Construyo productos, no solo código"
          subtitle="Full Stack Senior con más de 7 años de experiencia construyendo productos digitales desde el descubrimiento técnico hasta el despliegue. Me especializo en arquitecturas escalables, APIs robustas y frontends de alto rendimiento con mentalidad de producto."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="border-l-2 border-emerald-500 pl-5 py-1 space-y-2"
            >
              <div className="flex items-center gap-2 text-zinc-100 font-semibold">
                <Icon size={16} className="text-emerald-400 shrink-0" />
                {title}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
