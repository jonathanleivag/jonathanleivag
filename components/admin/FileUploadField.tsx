'use client'

import { useRef, useState } from 'react'

interface UploadResult {
  url: string
  publicId: string
  bytes: number
  originalFilename: string
}

interface Props {
  onUpload: (result: UploadResult) => void
  accept?: string
  maxBytes?: number
  folder?: string
  label?: string
}

export function FileUploadField({
  onUpload,
  accept = 'application/pdf',
  maxBytes = 5 * 1024 * 1024,
  folder = 'jonathanleivag/cv',
  label = 'Seleccionar archivo PDF',
}: Props) {
  const [filename, setFilename] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Solo se permiten archivos PDF')
      return
    }
    if (file.size > maxBytes) {
      setError(`El archivo no puede superar ${Math.round(maxBytes / 1024 / 1024)}MB`)
      return
    }

    setError('')
    setFilename(file.name)
    setUploading(true)

    try {
      const sigRes = await fetch('/api/upload/cloudinary-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder, resourceType: 'raw' }),
      })
      const { signature, timestamp, apiKey, cloudName } = await sigRes.json()

      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', apiKey)
      formData.append('timestamp', String(timestamp))
      formData.append('signature', signature)
      formData.append('folder', folder)
      formData.append('public_id', 'jonathan-leiva-cv')

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        { method: 'POST', body: formData }
      )
      const data = await uploadRes.json()

      if (data.error) throw new Error(data.error.message)

      onUpload({
        url: data.secure_url,
        publicId: data.public_id,
        bytes: data.bytes,
        originalFilename: file.name,
      })
    } catch (err) {
      setError('Error al subir el archivo. Intenta de nuevo.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div
        className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-500/30 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        <div className="space-y-2">
          <div className="text-3xl">📄</div>
          {filename ? (
            <p className="text-sm text-emerald-400">{filename}</p>
          ) : (
            <>
              <p className="text-sm text-zinc-400">{label}</p>
              <p className="text-xs text-zinc-600">PDF · máx {Math.round(maxBytes / 1024 / 1024)}MB</p>
            </>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />

      {uploading && <p className="text-sm text-emerald-400 animate-pulse">Subiendo archivo...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
}
