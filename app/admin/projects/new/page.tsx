import { createProject } from '../actions'

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Nuevo proyecto</h1>
        <p className="text-sm text-zinc-500 mt-1">Completa los campos para crear el proyecto</p>
      </div>

      <form action={createProject} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Slug *" name="slug" placeholder="mi-proyecto" required />
          <Field label="Tipo *" name="type" type="select" options={['professional', 'personal', 'freelance']} required />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Título (ES) *" name="titleEs" placeholder="Mi proyecto" required />
          <Field label="Título (EN) *" name="titleEn" placeholder="My project" required />
        </div>
        <Field label="Resumen (ES) *" name="summaryEs" type="textarea" placeholder="Descripción en español..." required />
        <Field label="Resumen (EN) *" name="summaryEn" type="textarea" placeholder="Description in English..." required />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Categoría" name="category" placeholder="SaaS / Internal Tool" />
          <Field label="Stack (separado por comas)" name="stack" placeholder="React, TypeScript, Node.js" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="URL" name="url" placeholder="https://..." />
          <Field label="Dominio" name="domain" placeholder="ejemplo.com" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Orden" name="order" type="number" placeholder="0" />
        </div>
        <div className="flex gap-6">
          <Checkbox label="Publicado" name="isPublished" defaultChecked />
          <Checkbox label="Destacado" name="isFeatured" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-colors">
            Crear proyecto
          </button>
          <a href="/admin/projects" className="px-5 py-2.5 border border-white/10 text-zinc-400 hover:text-zinc-100 text-sm rounded-lg transition-colors">
            Cancelar
          </a>
        </div>
      </form>
    </div>
  )
}

function Field({ label, name, type = 'text', placeholder, required, options }: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean; options?: string[]
}) {
  const base = 'w-full bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400'
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</label>
      {type === 'textarea' ? (
        <textarea name={name} placeholder={placeholder} required={required} rows={3} className={`${base} resize-none`} />
      ) : type === 'select' ? (
        <select name={name} required={required} className={base}>
          {options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} placeholder={placeholder} required={required} className={base} />
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
