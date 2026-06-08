'use client'

import { useEffect, useState, useTransition } from 'react'

interface SkillCategory {
  _id: string
  title: { es: string; en: string }
  description?: { es: string; en: string }
  skills: string[]
  order: number
  isPublished: boolean
}

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/skills').then((r) => r.json()).then((data) => {
      setCategories(data)
      setLoading(false)
    })
  }, [])

  const save = async (cat: SkillCategory) => {
    startTransition(async () => {
      const res = await fetch(`/api/admin/skills/${cat._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat),
      })
      if (res.ok) {
        setMessage('Guardado ✓')
        setEditingId(null)
        setTimeout(() => setMessage(''), 2000)
      }
    })
  }

  const toggle = async (id: string, current: boolean) => {
    await fetch(`/api/admin/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPublished: !current }),
    })
    setCategories((prev) => prev.map((c) => c._id === id ? { ...c, isPublished: !current } : c))
  }

  if (loading) return <div className="text-zinc-500">Cargando...</div>

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Skills</h1>
          <p className="text-sm text-zinc-500 mt-1">{categories.length} categorías</p>
        </div>
        {message && <span className="text-sm text-emerald-400">{message}</span>}
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-zinc-900 border border-white/5 rounded-xl p-5">
            {editingId === cat._id ? (
              <SkillEditor
                cat={cat}
                onSave={(updated) => save({ ...cat, ...updated })}
                onCancel={() => setEditingId(null)}
                isPending={isPending}
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
                      onClick={() => setEditingId(cat._id)}
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
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    const s = newSkill.trim()
    if (s && !skills.includes(s)) {
      setSkills([...skills, s])
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill))

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
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="flex items-center gap-1 text-xs bg-zinc-800 border border-white/5 text-zinc-300 px-2 py-1 rounded">
              {s}
              <button type="button" onClick={() => removeSkill(s)} className="text-zinc-600 hover:text-red-400 ml-1">×</button>
            </span>
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
          onClick={() => onSave({ title: { es: titleEs, en: titleEn }, description: { es: descEs, en: descEn }, skills })}
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
