import { connectToDatabase } from '@/lib/mongodb'
import { Project } from '@/models/Project'
import Link from 'next/link'

export default async function AdminProjectsPage() {
  await connectToDatabase()
  const projects = await Project.find().sort({ order: 1 }).lean()

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Proyectos</h1>
          <p className="text-sm text-zinc-500 mt-1">{projects.length} proyectos</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-colors"
        >
          + Nuevo proyecto
        </Link>
      </div>

      <div className="space-y-2">
        {projects.map((p) => (
          <div key={String(p._id)} className="flex items-center justify-between bg-zinc-900 border border-white/5 rounded-xl px-5 py-4">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${p.isPublished ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
              <div>
                <p className="text-sm font-medium text-zinc-100">{p.title?.es ?? String(p._id)}</p>
                <p className="text-xs text-zinc-500">{p.type} · {p.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {p.isFeatured && (
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">Destacado</span>
              )}
              <Link
                href={`/admin/projects/${String(p._id)}`}
                className="text-xs text-zinc-400 hover:text-zinc-100 border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
              >
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
