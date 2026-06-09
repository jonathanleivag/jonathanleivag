'use client'

import { useEffect, useState, useTransition } from 'react'

interface ExperienceItem {
  _id: string
  company: string
  role: { es: string; en: string }
  location: string
  period: string
  isCurrent: boolean
  highlights: { es: string; en: string }[]
  stack: string[]
  order: number
  isPublished: boolean
}

const emptyForm = (): Omit<ExperienceItem, '_id'> => ({
  company: '',
  role: { es: '', en: '' },
  location: '',
  period: '',
  isCurrent: false,
  highlights: [],
  stack: [],
  order: 0,
  isPublished: true,
})

export default function AdminExperiencePage() {
  const [items, setItems] = useState<ExperienceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | 'new' | null>(null)
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const notify = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(''), 3000) }

  useEffect(() => {
    fetch('/api/admin/experience').then(r => r.json()).then(data => { setItems(data); setLoading(false) })
  }, [])

  const save = async (data: Partial<ExperienceItem> & { _id?: string }) => {
    startTransition(async () => {
      if (data._id) {
        await fetch(`/api/admin/experience/${data._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        setItems(prev => prev.map(i => i._id === data._id ? { ...i, ...data } as ExperienceItem : i))
        notify('Guardado ✓')
      } else {
        const res = await fetch('/api/admin/experience', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        const created = await res.json()
        setItems(prev => [...prev, created])
        notify('Creado ✓')
      }
      setEditingId(null)
    })
  }

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar esta experiencia?')) return
    await fetch(`/api/admin/experience/${id}`, { method: 'DELETE' })
    setItems(prev => prev.filter(i => i._id !== id))
    notify('Eliminado ✓')
  }

  const toggle = async (id: string, current: boolean) => {
    await fetch(`/api/admin/experience/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isPublished: !current }) })
    setItems(prev => prev.map(i => i._id === id ? { ...i, isPublished: !current } : i))
  }

  if (loading) return <div className="text-zinc-500 text-sm">Cargando...</div>

  const editing = editingId === 'new' ? null : items.find(i => i._id === editingId)

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Experiencia laboral</h1>
          <p className="text-sm text-zinc-500 mt-1">{items.length} experiencias</p>
        </div>
        <div className="flex items-center gap-3">
          {message && <span className="text-sm text-emerald-400">{message}</span>}
          {!editingId && (
            <button onClick={() => setEditingId('new')} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-colors">
              + Nueva
            </button>
          )}
        </div>
      </div>

      {editingId && (
        <ExperienceForm
          initial={editing ?? emptyForm()}
          onSave={(data) => save(editingId === 'new' ? data : { ...data, _id: editingId })}
          onCancel={() => setEditingId(null)}
          isPending={isPending}
        />
      )}

      {!editingId && (
        <div className="space-y-3">
          {items.map((exp) => (
            <div key={exp._id} className="bg-zinc-900 border border-white/5 rounded-xl px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${exp.isPublished ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                    <p className="text-sm font-medium text-zinc-100">{exp.role.es}</p>
                    {exp.isCurrent && <span className="text-xs text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">Actual</span>}
                  </div>
                  <p className="text-xs text-zinc-500 ml-4">{exp.company} · {exp.period}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggle(exp._id, exp.isPublished)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${exp.isPublished ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-white/10 text-zinc-500 hover:text-zinc-300'}`}>
                    {exp.isPublished ? 'Publicado' : 'Oculto'}
                  </button>
                  <button onClick={() => setEditingId(exp._id)} className="text-xs border border-white/10 text-zinc-400 hover:text-zinc-100 px-3 py-1.5 rounded-lg transition-colors">
                    Editar
                  </button>
                  <button onClick={() => remove(exp._id)} className="text-xs text-red-500 hover:text-red-400 transition-colors px-1">
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ExperienceForm({ initial, onSave, onCancel, isPending }: {
  initial: Omit<ExperienceItem, '_id'> | ExperienceItem
  onSave: (data: Omit<ExperienceItem, '_id'>) => void
  onCancel: () => void
  isPending: boolean
}) {
  const [company, setCompany] = useState(initial.company)
  const [roleEs, setRoleEs] = useState(initial.role.es)
  const [roleEn, setRoleEn] = useState(initial.role.en)
  const [location, setLocation] = useState(initial.location)
  const [period, setPeriod] = useState(initial.period)
  const [isCurrent, setIsCurrent] = useState(initial.isCurrent)
  const [highlights, setHighlights] = useState<{ es: string; en: string }[]>(initial.highlights)
  const [stackRaw, setStackRaw] = useState(initial.stack.join(', '))
  const [order, setOrder] = useState(initial.order)
  const [isPublished, setIsPublished] = useState(initial.isPublished)
  const [newHlEs, setNewHlEs] = useState('')
  const [newHlEn, setNewHlEn] = useState('')

  const addHighlight = () => {
    const es = newHlEs.trim(); const en = newHlEn.trim()
    if (es) { setHighlights(prev => [...prev, { es, en: en || es }]); setNewHlEs(''); setNewHlEn('') }
  }
  const removeHighlight = (i: number) => setHighlights(prev => prev.filter((_, idx) => idx !== i))

  const inp = 'w-full bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400'
  const lbl = 'block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5'

  return (
    <div className="bg-zinc-900 border border-emerald-500/20 rounded-xl p-6 space-y-5">
      <p className="text-sm font-semibold text-zinc-300">{'_id' in initial ? 'Editar experiencia' : 'Nueva experiencia'}</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={lbl}>Empresa *</label><input value={company} onChange={e => setCompany(e.target.value)} placeholder="Nombre de la empresa" className={inp} /></div>
        <div><label className={lbl}>Período</label><input value={period} onChange={e => setPeriod(e.target.value)} placeholder="ej: enero 2023 - Presente" className={inp} /></div>
        <div><label className={lbl}>Cargo (ES) *</label><input value={roleEs} onChange={e => setRoleEs(e.target.value)} placeholder="Desarrollador Full Stack" className={inp} /></div>
        <div><label className={lbl}>Cargo (EN)</label><input value={roleEn} onChange={e => setRoleEn(e.target.value)} placeholder="Full Stack Developer" className={inp} /></div>
        <div><label className={lbl}>Ubicación</label><input value={location} onChange={e => setLocation(e.target.value)} placeholder="Ciudad, País" className={inp} /></div>
        <div><label className={lbl}>Stack (comas)</label><input value={stackRaw} onChange={e => setStackRaw(e.target.value)} placeholder="Vue.js, TypeScript, Node.js" className={inp} /></div>
      </div>

      <div className="space-y-3">
        <label className={lbl}>Highlights / Logros</label>
        {highlights.map((h, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1 text-sm text-zinc-300 bg-zinc-800 rounded px-3 py-2">{h.es}</div>
            <button type="button" onClick={() => removeHighlight(i)} className="text-zinc-600 hover:text-red-400 text-lg leading-none mt-2">×</button>
          </div>
        ))}
        <div className="grid sm:grid-cols-2 gap-2">
          <input value={newHlEs} onChange={e => setNewHlEs(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHighlight())} placeholder="Highlight en español" className={inp} />
          <input value={newHlEn} onChange={e => setNewHlEn(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHighlight())} placeholder="Highlight in English (opcional)" className={inp} />
        </div>
        <button type="button" onClick={addHighlight} className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">+ Agregar highlight</button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div><label className={lbl}>Orden</label><input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} className={inp} /></div>
        <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer pt-6">
          <input type="checkbox" checked={isCurrent} onChange={e => setIsCurrent(e.target.checked)} className="accent-emerald-400 w-4 h-4" />
          Trabajo actual
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer pt-6">
          <input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} className="accent-emerald-400 w-4 h-4" />
          Publicado
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          disabled={isPending || !company || !roleEs}
          onClick={() => onSave({ company, role: { es: roleEs, en: roleEn || roleEs }, location, period, isCurrent, highlights, stack: stackRaw.split(',').map(s => s.trim()).filter(Boolean), order, isPublished })}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold text-sm rounded-lg transition-colors"
        >
          {isPending ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 border border-white/10 text-zinc-400 hover:text-zinc-100 text-sm rounded-lg transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  )
}
