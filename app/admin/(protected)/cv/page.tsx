'use client'

import { useState } from 'react'
import { FileUploadField } from '@/components/admin/FileUploadField'

export default function AdminCVPage() {
  const [cvUrl, setCvUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpload = async (result: { url: string; publicId: string; bytes: number; originalFilename: string }) => {
    setSaving(true)
    setMessage('')

    const res = await fetch('/api/admin/cv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    })

    if (res.ok) {
      setCvUrl(result.url)
      setMessage('CV actualizado correctamente ✓')
    } else {
      setMessage('Error al guardar el CV')
    }
    setSaving(false)
  }

  return (
    <div className="max-w-lg space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Subir CV</h1>
        <p className="text-sm text-zinc-500 mt-1">Reemplaza el CV del portafolio</p>
      </div>

      <div className="space-y-4">
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-5 space-y-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">CV actual</p>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-emerald-400 hover:underline"
          >
            Ver CV actual →
          </a>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-xl p-5 space-y-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Subir nuevo CV</p>
          <FileUploadField
            onUpload={handleUpload}
            folder="jonathanleivag/cv"
            label="Seleccionar CV en PDF"
          />
          {saving && <p className="text-sm text-zinc-400">Guardando en base de datos...</p>}
          {message && (
            <p className={`text-sm font-medium ${message.includes('✓') ? 'text-emerald-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
          {cvUrl && (
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-400 hover:underline block">
              Ver nuevo CV subido →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
