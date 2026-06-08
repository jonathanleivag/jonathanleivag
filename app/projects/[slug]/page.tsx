interface Props {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
          Caso de estudio
        </span>
        <h1 className="text-3xl font-bold text-zinc-100">{slug}</h1>
        <p className="text-zinc-500 max-w-md mx-auto">
          Contenido del caso de estudio próximamente.
        </p>
        <a
          href="/#projects"
          className="inline-block text-sm text-emerald-400 hover:text-emerald-300 transition-colors mt-4"
        >
          ← Volver a proyectos
        </a>
      </div>
    </main>
  )
}
