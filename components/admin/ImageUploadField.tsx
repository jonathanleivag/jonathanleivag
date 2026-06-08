'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

interface UploadResult {
  url: string
  publicId: string
  width: number
  height: number
}

interface Props {
  onUpload: (result: UploadResult) => void
  currentUrl?: string
  folder?: string
}

export function ImageUploadField({ onUpload, currentUrl, folder = 'jonathanleivag/projects' }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      setError('Solo se permiten imágenes JPG, PNG o WEBP')
      return
    }
    if (file.size > 3 * 1024 * 1024) {
      setError('La imagen no puede superar 3MB')
      return
    }

    setError('')
    setPreview(URL.createObjectURL(file))
    setUploading(true)

    try {
      const sigRes = await fetch('/api/upload/cloudinary-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder, resourceType: 'image' }),
      })
      const { signature, timestamp, apiKey, cloudName } = await sigRes.json()

      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', apiKey)
      formData.append('timestamp', String(timestamp))
      formData.append('signature', signature)
      formData.append('folder', folder)

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
      )
      const data = await uploadRes.json()

      if (data.error) throw new Error(data.error.message)

      onUpload({
        url: data.secure_url,
        publicId: data.public_id,
        width: data.width,
        height: data.height,
      })
    } catch (err) {
      setError('Error al subir la imagen. Intenta de nuevo.')
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
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const file = e.dataTransfer.files[0]
          if (file) handleFile(file)
        }}
      >
        {preview ? (
          <div className="relative aspect-video w-full max-w-sm mx-auto rounded-lg overflow-hidden">
            <Image src={preview} alt="Preview" fill className="object-cover" unoptimized={preview.startsWith('blob:')} />
          </div>
        ) : (
          <div className="py-4 space-y-2">
            <div className="text-3xl">🖼</div>
            <p className="text-sm text-zinc-400">Arrastra una imagen o haz click para seleccionar</p>
            <p className="text-xs text-zinc-600">JPG, PNG, WEBP · máx 3MB</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />

      {uploading && <p className="text-sm text-emerald-400 animate-pulse">Subiendo imagen...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}
      {preview && !uploading && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Cambiar imagen
        </button>
      )}
    </div>
  )
}
