import { connectToDatabase } from '@/lib/mongodb'
import { SkillCategory } from '@/models/SkillCategory'

async function togglePublished(id: string, current: boolean) {
  'use server'
  const { connectToDatabase } = await import('@/lib/mongodb')
  const { SkillCategory } = await import('@/models/SkillCategory')
  const { revalidatePath } = await import('next/cache')
  const { auth } = await import('@/auth')
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')
  await connectToDatabase()
  await SkillCategory.findByIdAndUpdate(id, { isPublished: !current })
  revalidatePath('/admin/skills')
}

export default async function AdminSkillsPage() {
  await connectToDatabase()
  const categories = await SkillCategory.find().sort({ order: 1 }).lean()

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Skills</h1>
        <p className="text-sm text-zinc-500 mt-1">{categories.length} categorías</p>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={String(cat._id)} className="bg-zinc-900 border border-white/5 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-zinc-100">{(cat.title as { es: string })?.es}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{(cat.title as { en: string })?.en}</p>
              </div>
              <form action={togglePublished.bind(null, String(cat._id), cat.isPublished as boolean)}>
                <button type="submit" className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${cat.isPublished ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-white/10 text-zinc-500 hover:text-zinc-300'}`}>
                  {cat.isPublished ? 'Publicado' : 'Oculto'}
                </button>
              </form>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(cat.skills as string[]).map((s) => (
                <span key={s} className="text-xs bg-zinc-800 border border-white/5 text-zinc-300 px-2 py-0.5 rounded">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
