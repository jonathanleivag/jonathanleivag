import Link from 'next/link'
import { signOut } from '@/auth'

const NAV = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Perfil', href: '/admin/profile' },
  { label: 'Proyectos', href: '/admin/projects' },
  { label: 'Skills', href: '/admin/skills' },
  { label: 'Experiencia', href: '/admin/experience' },
  { label: 'CV', href: '/admin/cv' },
]

export function AdminSidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-white/5 bg-zinc-950 flex flex-col py-6 px-4">
      <div className="mb-8 px-2">
        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Admin</p>
        <p className="text-sm font-bold text-zinc-100 mt-0.5">Portfolio</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <form
        action={async () => {
          'use server'
          await signOut({ redirectTo: '/admin/login' })
        }}
        className="mt-4"
      >
        <button
          type="submit"
          className="w-full px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors text-left"
        >
          Sign out
        </button>
      </form>
    </aside>
  )
}
