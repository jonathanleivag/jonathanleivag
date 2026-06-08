import { connectToDatabase } from '@/lib/mongodb'
import { Profile } from '@/models/Profile'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'

async function updateProfile(formData: FormData) {
  'use server'
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')
  await connectToDatabase()
  await Profile.findOneAndUpdate(
    {},
    {
      name: formData.get('name'),
      handle: formData.get('handle'),
      location: formData.get('location'),
      'role.es': formData.get('roleEs'),
      'role.en': formData.get('roleEn'),
      'headline.es': formData.get('headlineEs'),
      'headline.en': formData.get('headlineEn'),
      'summary.es': formData.get('summaryEs'),
      'summary.en': formData.get('summaryEn'),
      'social.github': formData.get('github'),
      'social.linkedin': formData.get('linkedin'),
      'social.email': formData.get('email'),
      'social.cv': formData.get('cv'),
    },
    { upsert: true }
  )
  revalidatePath('/')
}

export default async function AdminProfilePage() {
  await connectToDatabase()
  const profile = await Profile.findOne().lean() as Record<string, unknown> | null

  const role = profile?.role as { es?: string; en?: string } | null
  const headline = profile?.headline as { es?: string; en?: string } | null
  const summary = profile?.summary as { es?: string; en?: string } | null
  const social = profile?.social as { github?: string; linkedin?: string; email?: string; cv?: string } | null

  const base = 'w-full bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400'
  const label = 'block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5'

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Perfil</h1>
        <p className="text-sm text-zinc-500 mt-1">Edita tu información profesional</p>
      </div>

      <form action={updateProfile} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={label}>Nombre</label><input name="name" defaultValue={profile?.name as string} className={base} /></div>
          <div><label className={label}>Handle</label><input name="handle" defaultValue={profile?.handle as string} className={base} /></div>
        </div>
        <div><label className={label}>Ubicación</label><input name="location" defaultValue={profile?.location as string} className={base} /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={label}>Rol (ES)</label><input name="roleEs" defaultValue={role?.es} className={base} /></div>
          <div><label className={label}>Rol (EN)</label><input name="roleEn" defaultValue={role?.en} className={base} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={label}>Headline (ES)</label><textarea name="headlineEs" rows={2} defaultValue={headline?.es} className={`${base} resize-none`} /></div>
          <div><label className={label}>Headline (EN)</label><textarea name="headlineEn" rows={2} defaultValue={headline?.en} className={`${base} resize-none`} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={label}>Resumen (ES)</label><textarea name="summaryEs" rows={3} defaultValue={summary?.es} className={`${base} resize-none`} /></div>
          <div><label className={label}>Resumen (EN)</label><textarea name="summaryEn" rows={3} defaultValue={summary?.en} className={`${base} resize-none`} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={label}>GitHub</label><input name="github" defaultValue={social?.github} className={base} /></div>
          <div><label className={label}>LinkedIn</label><input name="linkedin" defaultValue={social?.linkedin} className={base} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={label}>Email público</label><input name="email" defaultValue={social?.email} className={base} /></div>
          <div><label className={label}>CV URL</label><input name="cv" defaultValue={social?.cv} className={base} /></div>
        </div>

        <button type="submit" className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-colors">
          Guardar perfil
        </button>
      </form>
    </div>
  )
}
