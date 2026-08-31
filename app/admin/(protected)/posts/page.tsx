'use client'

import { useEffect, useState, useTransition } from 'react'
import Image from 'next/image'
import { ImageUploadField } from '@/components/admin/ImageUploadField'

interface PostImage {
  url: string
  publicId: string
  width: number
  height: number
}

interface PostItem {
  _id: string
  slug: string
  title: { es: string; en: string }
  excerpt: { es: string; en: string }
  content: { es: string; en: string }
  category: 'articulo' | 'til' | 'tutorial' | 'snippet' | 'caso'
  image?: PostImage
  tags: string[]
  readingMinutes: number
  isFeatured: boolean
  isPublished: boolean
  order: number
}

const CATEGORIES = ['articulo', 'til', 'tutorial', 'snippet', 'caso'] as const

const emptyForm = (): Omit<PostItem, '_id'> => ({
  slug: '',
  title: { es: '', en: '' },
  excerpt: { es: '', en: '' },
  content: { es: '', en: '' },
  category: 'articulo',
  image: undefined,
  tags: [],
  readingMinutes: 5,
  isFeatured: false,
  isPublished: true,
  order: 0,
})

export default function AdminPostsPage() {
  const [items, setItems] = useState<PostItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | 'new' | null>(null)
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const notify = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(''), 3000) }

  useEffect(() => {
    fetch('/api/admin/posts').then((r) => r.json()).then((data) => { setItems(data); setLoading(false) })
  }, [])

  const save = async (data: Partial<PostItem> & { _id?: string }) => {
    startTransition(async () => {
      if (data._id) {
        await fetch(`/api/admin/posts/${data._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        setItems((prev) => prev.map((i) => i._id === data._id ? { ...i, ...data } as PostItem : i))
        notify('Guardado ✓')
      } else {
        const res = await fetch('/api/admin/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        const created = await res.json()
        setItems((prev) => [...prev, created])
        notify('Creado ✓')
      }
      setEditingId(null)
    })
  }

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar esta nota?')) return
    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
    setItems((prev) => prev.filter((i) => i._id !== id))
    notify('Eliminada ✓')
  }

  const toggle = async (id: string, current: boolean) => {
    await fetch(`/api/admin/posts/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isPublished: !current }) })
    setItems((prev) => prev.map((i) => i._id === id ? { ...i, isPublished: !current } : i))
  }

  if (loading) return <div className="text-zinc-500 text-sm">Cargando...</div>

  const editing = editingId === 'new' ? null : items.find((i) => i._id === editingId)

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Notas</h1>
          <p className="text-sm text-zinc-500 mt-1">{items.length} notas</p>
        </div>
        <div className="flex items-center gap-3">
          {message && <span className="text-sm text-emerald-400">{message}</span>}
          {!editingId && (
            <button onClick={() => setEditingId('new')} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-colors">
              + Nueva nota
            </button>
          )}
        </div>
      </div>

      {editingId && (
        <PostForm
          initial={editing ?? emptyForm()}
          onSave={(data) => save(editingId === 'new' ? data : { ...data, _id: editingId })}
          onCancel={() => setEditingId(null)}
          isPending={isPending}
        />
      )}

      {!editingId && (
        <div className="space-y-3">
          {items.map((post) => (
            <div key={post._id} className="bg-zinc-900 border border-white/5 rounded-xl px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {post.image?.url && (
                    <Image src={post.image.url} alt="" width={48} height={48} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  )}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${post.isPublished ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                      <p className="text-sm font-medium text-zinc-100">{post.title.es}</p>
                      {post.isFeatured && <span className="text-xs text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">Destacado</span>}
                    </div>
                    <p className="text-xs text-zinc-500 ml-4">{post.category} · {post.slug} · {post.readingMinutes} min</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggle(post._id, post.isPublished)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${post.isPublished ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-white/10 text-zinc-500 hover:text-zinc-300'}`}>
                    {post.isPublished ? 'Publicado' : 'Oculto'}
                  </button>
                  <button onClick={() => setEditingId(post._id)} className="text-xs border border-white/10 text-zinc-400 hover:text-zinc-100 px-3 py-1.5 rounded-lg transition-colors">
                    Editar
                  </button>
                  <button onClick={() => remove(post._id)} className="text-xs text-red-500 hover:text-red-400 transition-colors px-1">
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

function PostForm({ initial, onSave, onCancel, isPending }: {
  initial: Omit<PostItem, '_id'> | PostItem
  onSave: (data: Omit<PostItem, '_id'>) => void
  onCancel: () => void
  isPending: boolean
}) {
  const [slug, setSlug] = useState(initial.slug)
  const [titleEs, setTitleEs] = useState(initial.title.es)
  const [titleEn, setTitleEn] = useState(initial.title.en)
  const [excerptEs, setExcerptEs] = useState(initial.excerpt.es)
  const [excerptEn, setExcerptEn] = useState(initial.excerpt.en)
  const [contentEs, setContentEs] = useState(initial.content.es)
  const [contentEn, setContentEn] = useState(initial.content.en)
  const [category, setCategory] = useState(initial.category)
  const [image, setImage] = useState<PostImage | null>(initial.image ?? null)
  const [tagsRaw, setTagsRaw] = useState(initial.tags.join(', '))
  const [readingMinutes, setReadingMinutes] = useState(initial.readingMinutes)
  const [isFeatured, setIsFeatured] = useState(initial.isFeatured)
  const [isPublished, setIsPublished] = useState(initial.isPublished)
  const [order, setOrder] = useState(initial.order)

  const inp = 'w-full bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400'
  const lbl = 'block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5'

  return (
    <div className="bg-zinc-900 border border-emerald-500/20 rounded-xl p-6 space-y-5">
      <p className="text-sm font-semibold text-zinc-300">{'_id' in initial ? 'Editar nota' : 'Nueva nota'}</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={lbl}>Slug *</label><input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="mi-nota" className={inp} /></div>
        <div>
          <label className={lbl}>Categoría *</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as PostItem['category'])} className={inp}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={lbl}>Título ES *</label><input value={titleEs} onChange={(e) => setTitleEs(e.target.value)} className={inp} /></div>
        <div><label className={lbl}>Título EN *</label><input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className={inp} /></div>
      </div>
      <div><label className={lbl}>Resumen ES *</label><textarea value={excerptEs} onChange={(e) => setExcerptEs(e.target.value)} rows={2} className={`${inp} resize-none`} /></div>
      <div><label className={lbl}>Resumen EN *</label><textarea value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} rows={2} className={`${inp} resize-none`} /></div>
      <div><label className={lbl}>Contenido ES * (líneas que empiezan con &quot;## &quot; son encabezados)</label><textarea value={contentEs} onChange={(e) => setContentEs(e.target.value)} rows={10} className={`${inp} resize-y font-mono`} /></div>
      <div><label className={lbl}>Contenido EN *</label><textarea value={contentEn} onChange={(e) => setContentEn(e.target.value)} rows={10} className={`${inp} resize-y font-mono`} /></div>
      <div>
        <label className={lbl}>Imagen de portada</label>
        <ImageUploadField onUpload={setImage} currentUrl={image?.url} folder="jonathanleivag/posts" />
        {image && <p className="text-xs text-emerald-400 mt-1">Imagen lista ✓</p>}
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div><label className={lbl}>Tags (comas)</label><input value={tagsRaw} onChange={(e) => setTagsRaw(e.target.value)} placeholder="Vue 3, TypeScript" className={inp} /></div>
        <div><label className={lbl}>Minutos de lectura</label><input type="number" value={readingMinutes} onChange={(e) => setReadingMinutes(Number(e.target.value))} className={inp} /></div>
        <div><label className={lbl}>Orden</label><input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className={inp} /></div>
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
          <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="accent-emerald-400 w-4 h-4" />
          Publicado
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
          <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="accent-emerald-400 w-4 h-4" />
          Destacado
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          disabled={isPending || !slug || !titleEs}
          onClick={() => onSave({
            slug,
            title: { es: titleEs, en: titleEn || titleEs },
            excerpt: { es: excerptEs, en: excerptEn || excerptEs },
            content: { es: contentEs, en: contentEn || contentEs },
            category,
            image: image ?? undefined,
            tags: tagsRaw.split(',').map((s) => s.trim()).filter(Boolean),
            readingMinutes,
            isFeatured,
            isPublished,
            order,
          })}
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
