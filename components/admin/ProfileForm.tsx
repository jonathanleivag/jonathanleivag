'use client'

import { useActionState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { updateProfileAction } from '@/app/admin/(protected)/profile/actions'

interface ProfileData {
  name?: string
  handle?: string
  location?: string
  roleEs?: string
  roleEn?: string
  headlineEs?: string
  headlineEn?: string
  summaryEs?: string
  summaryEn?: string
  github?: string
  linkedin?: string
  email?: string
  cv?: string
}

export function ProfileForm({ data }: { data: ProfileData }) {
  const [state, action, isPending] = useActionState(updateProfileAction, null)

  const base = 'w-full bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400'
  const label = 'block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5'

  return (
    <form action={action} className="space-y-5">
      {state && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${state.ok ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {state.ok ? <CheckCircle size={15} /> : <XCircle size={15} />}
          {state.message}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={label}>Nombre</label><input name="name" defaultValue={data.name} className={base} /></div>
        <div><label className={label}>Handle</label><input name="handle" defaultValue={data.handle} className={base} /></div>
      </div>
      <div><label className={label}>Ubicación</label><input name="location" defaultValue={data.location} className={base} /></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={label}>Rol (ES)</label><input name="roleEs" defaultValue={data.roleEs} className={base} /></div>
        <div><label className={label}>Rol (EN)</label><input name="roleEn" defaultValue={data.roleEn} className={base} /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={label}>Headline (ES)</label><textarea name="headlineEs" rows={2} defaultValue={data.headlineEs} className={`${base} resize-none`} /></div>
        <div><label className={label}>Headline (EN)</label><textarea name="headlineEn" rows={2} defaultValue={data.headlineEn} className={`${base} resize-none`} /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={label}>Resumen (ES)</label><textarea name="summaryEs" rows={3} defaultValue={data.summaryEs} className={`${base} resize-none`} /></div>
        <div><label className={label}>Resumen (EN)</label><textarea name="summaryEn" rows={3} defaultValue={data.summaryEn} className={`${base} resize-none`} /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={label}>GitHub</label><input name="github" defaultValue={data.github} className={base} /></div>
        <div><label className={label}>LinkedIn</label><input name="linkedin" defaultValue={data.linkedin} className={base} /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={label}>Email público</label><input name="email" defaultValue={data.email} className={base} /></div>
        <div><label className={label}>CV URL</label><input name="cv" defaultValue={data.cv} className={base} /></div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold text-sm rounded-lg transition-colors"
      >
        {isPending ? 'Guardando...' : 'Guardar perfil'}
      </button>
    </form>
  )
}
