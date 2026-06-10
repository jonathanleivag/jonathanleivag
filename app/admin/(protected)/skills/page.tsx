'use client'

import { useEffect, useState } from 'react'

interface SkillCategory {
  _id: string
  title: { es: string; en: string }
  description?: { es: string; en: string }
  skills: string[]
  skillUrls?: Record<string, string>
  order: number
  isPublished: boolean
}

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/skills')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data)
        } else {
          setMessage('Error al cargar skills')
        }
        setLoading(false)
      })
      .catch(() => { setMessage('Error de conexión'); setLoading(false) })
  }, [])

  const save = async (cat: SkillCategory) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/skills/${cat._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat),
      })
      if (res.ok) {
        setCategories((prev) => prev.map((c) => String(c._id) === String(cat._id) ? { ...c, ...cat } : c))
        setMessage('Guardado ✓')
        setEditingId(null)
        setTimeout(() => setMessage(''), 2000)
      } else {
        const err = await res.json().catch(() => ({}))
        setMessage(`Error: ${err.error ?? res.status}`)
        setTimeout(() => setMessage(''), 3000)
      }
    } catch {
      setMessage('Error de conexión')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  const toggle = async (id: string, current: boolean) => {
    await fetch(`/api/admin/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPublished: !current }),
    })
    setCategories((prev) => prev.map((c) => c._id === id ? { ...c, isPublished: !current } : c))
  }

  const create = async (data: Omit<SkillCategory, '_id'>) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const created = await res.json()
        setCategories((prev) => [...prev, created])
        setEditingId(null)
        setMessage('Categoría creada ✓')
        setTimeout(() => setMessage(''), 2000)
      } else {
        setMessage('Error al crear categoría')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch {
      setMessage('Error de conexión')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-zinc-500">Cargando...</div>

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Skills</h1>
          <p className="text-sm text-zinc-500 mt-1">{categories.length} categorías</p>
        </div>
        <div className="flex items-center gap-3">
          {message && <span className="text-sm text-emerald-400">{message}</span>}
          {!editingId && (
            <button
              onClick={() => setEditingId('new')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-colors"
            >
              + Nueva categoría
            </button>
          )}
        </div>
      </div>

      {editingId === 'new' && (
        <div className="bg-zinc-900 border border-emerald-500/20 rounded-xl p-5">
          <p className="text-sm font-semibold text-zinc-300 mb-4">Nueva categoría</p>
          <SkillEditor
            cat={{ _id: '', title: { es: '', en: '' }, description: { es: '', en: '' }, skills: [], skillUrls: {}, order: categories.length, isPublished: true }}
            onSave={(updated) => create({
              title: updated.title ?? { es: '', en: '' },
              description: updated.description,
              skills: updated.skills ?? [],
              skillUrls: updated.skillUrls ?? {},
              order: categories.length,
              isPublished: true,
            })}
            onCancel={() => setEditingId(null)}
            isPending={saving}
          />
        </div>
      )}

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-zinc-900 border border-white/5 rounded-xl p-5">
            {editingId === String(cat._id) ? (
              <SkillEditor
                cat={cat}
                onSave={(updated) => save({ ...cat, ...updated })}
                onCancel={() => setEditingId(null)}
                isPending={saving}
              />
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-zinc-100">{cat.title.es}</p>
                    <p className="text-xs text-zinc-500">{cat.title.en}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(String(cat._id))}
                      className="text-xs border border-white/10 text-zinc-400 hover:text-zinc-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => toggle(cat._id, cat.isPublished)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${cat.isPublished ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-white/10 text-zinc-500 hover:text-zinc-300'}`}
                    >
                      {cat.isPublished ? 'Publicado' : 'Oculto'}
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span key={s} className="text-xs bg-zinc-800 border border-white/5 text-zinc-300 px-2 py-0.5 rounded">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillEditor({ cat, onSave, onCancel, isPending }: {
  cat: SkillCategory
  onSave: (data: Partial<SkillCategory>) => void
  onCancel: () => void
  isPending: boolean
}) {
  const [titleEs, setTitleEs] = useState(cat.title.es)
  const [titleEn, setTitleEn] = useState(cat.title.en)
  const [descEs, setDescEs] = useState(cat.description?.es ?? '')
  const [descEn, setDescEn] = useState(cat.description?.en ?? '')
  const [skills, setSkills] = useState<string[]>(cat.skills)
  const [skillUrls, setSkillUrls] = useState<Record<string, string>>(cat.skillUrls ?? {})
  const [newSkill, setNewSkill] = useState('')
  const [editingUrlFor, setEditingUrlFor] = useState<string | null>(null)

  const addSkill = () => {
    const s = newSkill.trim()
    if (s && !skills.includes(s)) {
      setSkills([...skills, s])
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
    const updated = { ...skillUrls }
    delete updated[skill]
    setSkillUrls(updated)
  }

  const setSkillUrl = (skill: string, url: string) => {
    setSkillUrls((prev) => url ? { ...prev, [skill]: url } : Object.fromEntries(Object.entries(prev).filter(([k]) => k !== skill)))
  }

  const inp = 'w-full bg-zinc-800 border border-white/10 text-zinc-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400'
  const lbl = 'block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1'

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className={lbl}>Título ES</label><input value={titleEs} onChange={(e) => setTitleEs(e.target.value)} className={inp} /></div>
        <div><label className={lbl}>Título EN</label><input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className={inp} /></div>
        <div><label className={lbl}>Descripción ES</label><input value={descEs} onChange={(e) => setDescEs(e.target.value)} className={inp} /></div>
        <div><label className={lbl}>Descripción EN</label><input value={descEn} onChange={(e) => setDescEn(e.target.value)} className={inp} /></div>
      </div>

      <div className="space-y-2">
        <label className={lbl}>Skills</label>
        <div className="space-y-1.5">
          {skills.map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs bg-zinc-800 border border-white/5 text-zinc-300 px-2 py-1 rounded shrink-0">
                {s}
                <button type="button" onClick={() => removeSkill(s)} className="text-zinc-600 hover:text-red-400 ml-1">×</button>
              </span>
              {editingUrlFor === s ? (
                <input
                  autoFocus
                  defaultValue={skillUrls[s] ?? ''}
                  onBlur={(e) => { setSkillUrl(s, e.target.value.trim()); setEditingUrlFor(null) }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { setSkillUrl(s, (e.target as HTMLInputElement).value.trim()); setEditingUrlFor(null) } }}
                  placeholder="https://docs.ejemplo.com"
                  className="flex-1 bg-zinc-800 border border-emerald-500/30 text-zinc-100 rounded px-2 py-1 text-xs focus:outline-none"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingUrlFor(s)}
                  className={`text-xs truncate max-w-[200px] ${skillUrls[s] ? 'text-emerald-400 hover:underline' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  {skillUrls[s] ? skillUrls[s] : '+ URL'}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            placeholder="Agregar skill..."
            className={`${inp} flex-1`}
          />
          <button type="button" onClick={addSkill} className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 text-sm rounded-lg transition-colors">
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            // Include pending newSkill if user didn't press + or Enter
            const finalSkills = newSkill.trim() && !skills.includes(newSkill.trim())
              ? [...skills, newSkill.trim()]
              : skills
            onSave({ title: { es: titleEs, en: titleEn }, description: { es: descEs, en: descEn }, skills: finalSkills, skillUrls })
          }}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold text-sm rounded-lg transition-colors"
        >
          {isPending ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-white/10 text-zinc-400 hover:text-zinc-100 text-sm rounded-lg transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  )
}
