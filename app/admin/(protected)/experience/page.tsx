import { connectToDatabase } from '@/lib/mongodb'
import { Experience } from '@/models/Experience'

async function togglePublished(id: string, current: boolean) {
  'use server'
  const { connectToDatabase } = await import('@/lib/mongodb')
  const { Experience } = await import('@/models/Experience')
  const { revalidatePath } = await import('next/cache')
  const { auth } = await import('@/auth')
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')
  await connectToDatabase()
  await Experience.findByIdAndUpdate(id, { isPublished: !current })
  revalidatePath('/admin/experience')
  revalidatePath('/')
}

export default async function AdminExperiencePage() {
  await connectToDatabase()
  const experiences = await Experience.find().sort({ order: 1 }).lean()

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Experiencia laboral</h1>
        <p className="text-sm text-zinc-500 mt-1">{experiences.length} experiencias</p>
      </div>

      <div className="space-y-3">
        {experiences.map((exp) => {
          const e = exp as Record<string, unknown>
          const role = e.role as { es?: string } | null
          return (
            <div key={String(e._id)} className="bg-zinc-900 border border-white/5 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${e.isPublished ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                  <p className="text-sm font-medium text-zinc-100">{role?.es}</p>
                  {Boolean(e.isCurrent) && <span className="text-xs text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">Actual</span>}
                </div>
                <p className="text-xs text-zinc-500 ml-4">{e.company as string} · {e.period as string}</p>
              </div>
              <form action={togglePublished.bind(null, String(e._id), Boolean(e.isPublished))}>
                <button type="submit" className={`text-xs px-3 py-1.5 rounded-lg border transition-colors shrink-0 ${e.isPublished ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-white/10 text-zinc-500 hover:text-zinc-300'}`}>
                  {e.isPublished ? 'Publicado' : 'Oculto'}
                </button>
              </form>
            </div>
          )
        })}
      </div>
    </div>
  )
}
