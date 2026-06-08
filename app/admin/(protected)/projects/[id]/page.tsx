import { notFound } from 'next/navigation'
import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import { Project } from '@/models/Project'
import { updateProject, deleteProject } from '../actions'
import { DeleteProjectButton } from '@/components/admin/DeleteProjectButton'

interface Props { params: Promise<{ id: string }> }

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params
  await connectToDatabase()
  const p = await Project.findById(id).lean()
  if (!p) notFound()

  const updateWithId = updateProject.bind(null, id)

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Editar proyecto</h1>
        <p className="text-sm text-zinc-500 mt-1">{p.slug as string}</p>
      </div>

      <form action={updateWithId} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Tipo *" name="type" type="select" options={['professional', 'personal', 'freelance']} defaultValue={p.type as string} />
          <Field label="Categoría" name="category" defaultValue={p.category as string} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Título (ES) *" name="titleEs" defaultValue={(p.title as { es: string })?.es} required />
          <Field label="Título (EN) *" name="titleEn" defaultValue={(p.title as { en: string })?.en} required />
        </div>
        <Field label="Resumen (ES) *" name="summaryEs" type="textarea" defaultValue={(p.summary as { es: string })?.es} required />
        <Field label="Resumen (EN) *" name="summaryEn" type="textarea" defaultValue={(p.summary as { en: string })?.en} required />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Stack" name="stack" defaultValue={(p.stack as string[])?.join(', ')} />
          <Field label="URL" name="url" defaultValue={p.url as string} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Dominio" name="domain" defaultValue={p.domain as string} />
          <Field label="Orden" name="order" type="number" defaultValue={String(p.order ?? 0)} />
        </div>
        <div className="flex gap-6">
          <Checkbox label="Publicado" name="isPublished" defaultChecked={p.isPublished as boolean} />
          <Checkbox label="Destacado" name="isFeatured" defaultChecked={p.isFeatured as boolean} />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-colors">
            Guardar cambios
          </button>
          <Link href="/admin/projects" className="px-5 py-2.5 border border-white/10 text-zinc-400 hover:text-zinc-100 text-sm rounded-lg transition-colors">
            Cancelar
          </Link>
        </div>
      </form>

      <div className="border-t border-white/5 pt-6">
        <DeleteProjectButton action={deleteProject.bind(null, id)} />
      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', placeholder, required, options, defaultValue }: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean; options?: string[]; defaultValue?: string
}) {
  const base = 'w-full bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400'
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</label>
      {type === 'textarea' ? (
        <textarea name={name} placeholder={placeholder} required={required} rows={3} className={`${base} resize-none`} defaultValue={defaultValue} />
      ) : type === 'select' ? (
        <select name={name} required={required} className={base} defaultValue={defaultValue}>
          {options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} placeholder={placeholder} required={required} className={base} defaultValue={defaultValue} />
      )}
    </div>
  )
}

function Checkbox({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="accent-emerald-400 w-4 h-4" />
      {label}
    </label>
  )
}
