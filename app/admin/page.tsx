import { connectToDatabase } from '@/lib/mongodb'
import { Project } from '@/models/Project'
import { SkillCategory } from '@/models/SkillCategory'
import Link from 'next/link'

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
    </div>
  )
}
