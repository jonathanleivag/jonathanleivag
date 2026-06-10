import { connectToDatabase } from '@/lib/mongodb'
import { Project } from '@/models/Project'
import { SkillCategory } from '@/models/SkillCategory'
import Link from 'next/link'

async function revalidateSite() {
  'use server'
  const { auth } = await import('@/auth')
  const { revalidatePath } = await import('next/cache')
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  for (const path of ['/', '/es', '/en', '/es/projects', '/en/projects']) {
    revalidatePath(path)
  }
}

export default async function AdminDashboard() {
  await connectToDatabase()

  const [totalProjects, publishedProjects, featuredProjects, totalSkills] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ isPublished: true }),
    Project.countDocuments({ isFeatured: true }),
    SkillCategory.countDocuments({ isPublished: true }),
  ])

  const stats = [
    { label: 'Total proyectos', value: totalProjects },
    { label: 'Publicados', value: publishedProjects },
    { label: 'Destacados', value: featuredProjects },
    { label: 'Categorías skills', value: totalSkills },
  ]

  const quickLinks = [
    { label: '+ Nuevo proyecto', href: '/admin/projects/new' },
    { label: 'Editar perfil', href: '/admin/profile' },
    { label: 'Gestionar skills', href: '/admin/skills' },
  ]

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Resumen del portafolio</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-zinc-900 border border-white/5 rounded-xl p-5">
            <p className="text-3xl font-bold text-emerald-400">{s.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {quickLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm rounded-lg transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="border-t border-white/5 pt-6">
        <p className="text-xs text-zinc-500 mb-3">El sitio se actualiza automáticamente cada 24 horas. Puedes forzar una actualización ahora:</p>
        <form action={revalidateSite}>
          <button type="submit" className="px-4 py-2 border border-white/10 text-zinc-400 hover:text-zinc-100 hover:border-emerald-500/30 text-sm rounded-lg transition-colors">
            ↺ Actualizar sitio ahora
          </button>
        </form>
      </div>
    </div>
  )
}
