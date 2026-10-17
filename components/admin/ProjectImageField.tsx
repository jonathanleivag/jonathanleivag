'use client'

import { useState } from 'react'
import { ImageUploadField } from '@/components/admin/ImageUploadField'

interface ImageData {
  url: string
  publicId: string
  width: number
  height: number
}

export function ProjectImageField({ initial }: { initial?: ImageData }) {
  const [image, setImage] = useState<ImageData | null>(initial ?? null)

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Imagen principal</label>
      <input type="hidden" name="imageUrl" value={image?.url ?? ''} />
      <input type="hidden" name="imagePublicId" value={image?.publicId ?? ''} />
      <input type="hidden" name="imageWidth" value={image?.width ?? ''} />
      <input type="hidden" name="imageHeight" value={image?.height ?? ''} />
      <ImageUploadField onUpload={setImage} currentUrl={image?.url} folder="jonathanleivag/projects" />
      {image && <p className="text-xs text-emerald-400 mt-1">Imagen lista ✓</p>}
    </div>
  )
}
