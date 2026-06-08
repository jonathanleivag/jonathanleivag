'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUploadField } from '@/components/admin/ImageUploadField'

interface ImageData {
  url: string
  publicId: string
  width: number
  height: number
}

export default function NewProjectPage() {
  const [image, setImage] = useState<ImageData | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement)?.value ?? ''
    const checked = (name: string) => (form.elements.namedItem(name) as HTMLInputElement)?.checked ?? false

    const data = {
      slug: get('slug'),
      title: { es: get('titleEs'), en: get('titleEn') },
      type: get('type'),
      category: get('category') || undefined,
      domain: get('domain') || undefined,
      url: get('url') || undefined,
      summary: { es: get('summaryEs'), en: get('summaryEn') },
      stack: get('stack').split(',').map((s) => s.trim()).filter(Boolean),
      isFeatured: checked('isFeatured'),
      isPublished: checked('isPublished'),
      order: Number(get('order') || 0),
      image: image ?? undefined,
    }

    startTransition(async () => {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        router.push('/admin/projects')
        router.refresh()
      } else {
        const json = await res.json()
        setError(json.error ?? 'Error al crear proyecto')
      }
    })
  }

  const inp = 'w-full bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400'
  const lbl = 'block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5'

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Nuevo proyecto</h1>
        <p className="text-sm text-zinc-500 mt-1">Completa los campos para crear el proyecto</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={lbl}>Slug *</label><input name="slug" placeholder="mi-proyecto" required className={inp} /></div>
          <div>
            <label className={lbl}>Tipo *</label>
            <select name="type" required className={inp}>
              <option value="professional">professional</option>
              <option value="personal">personal</option>
              <option value="freelance">freelance</option>
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={lbl}>Título ES *</label><input name="titleEs" placeholder="Mi proyecto" required className={inp} /></div>
          <div><label className={lbl}>Título EN *</label><input name="titleEn" placeholder="My project" required className={inp} /></div>
        </div>
        <div><label className={lbl}>Resumen ES *</label><textarea name="summaryEs" placeholder="Descripción en español..." required rows={2} className={`${inp} resize-none`} /></div>
        <div><label className={lbl}>Resumen EN *</label><textarea name="summaryEn" placeholder="Description in English..." required rows={2} className={`${inp} resize-none`} /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={lbl}>Categoría</label><input name="category" placeholder="SaaS / Internal Tool" className={inp} /></div>
          <div><label className={lbl}>Stack (comas)</label><input name="stack" placeholder="React, TypeScript" className={inp} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={lbl}>URL</label><input name="url" placeholder="https://..." className={inp} /></div>
          <div><label className={lbl}>Dominio</label><input name="domain" placeholder="ejemplo.com" className={inp} /></div>
        </div>

        <div>
          <label className={lbl}>Imagen principal</label>
          <ImageUploadField onUpload={setImage} folder="jonathanleivag/projects" />
          {image && <p className="text-xs text-emerald-400 mt-1">Imagen lista ✓</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={lbl}>Orden</label><input name="order" type="number" placeholder="0" className={inp} /></div>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
            <input type="checkbox" name="isPublished" defaultChecked className="accent-emerald-400 w-4 h-4" />
            Publicado
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
            <input type="checkbox" name="isFeatured" className="accent-emerald-400 w-4 h-4" />
            Destacado
          </label>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={isPending} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black font-semibold text-sm rounded-lg transition-colors">
            {isPending ? 'Creando...' : 'Crear proyecto'}
          </button>
          <a href="/admin/projects" className="px-5 py-2.5 border border-white/10 text-zinc-400 hover:text-zinc-100 text-sm rounded-lg transition-colors">
            Cancelar
          </a>
        </div>
      </form>
    </div>
  )
}
