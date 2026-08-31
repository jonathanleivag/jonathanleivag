'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongodb'
import { Profile } from '@/models/Profile'
import { auth } from '@/auth'

function parseParagraphs(raw: string): string[] {
  return raw
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export async function updateProfileAction(
  _prev: { ok: boolean; message: string } | null,
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  try {
    const session = await auth()
    if (!session?.user) return { ok: false, message: 'No autorizado' }

    const bodyEs = parseParagraphs(String(formData.get('aboutBodyEs') ?? ''))
    const bodyEn = parseParagraphs(String(formData.get('aboutBodyEn') ?? ''))
    const body = bodyEs.map((es, i) => ({ es, en: bodyEn[i] || es }))

    const imageUrl = String(formData.get('imageUrl') ?? '')

    await connectToDatabase()
    await Profile.findOneAndUpdate(
      {},
      {
        name: formData.get('name'),
        handle: formData.get('handle'),
        location: formData.get('location'),
        'role.es': formData.get('roleEs'),
        'role.en': formData.get('roleEn'),
        'headline.es': formData.get('headlineEs'),
        'headline.en': formData.get('headlineEn'),
        'summary.es': formData.get('summaryEs'),
        'summary.en': formData.get('summaryEn'),
        'about.body': body,
        'social.github': formData.get('github'),
        'social.linkedin': formData.get('linkedin'),
        'social.email': formData.get('email'),
        'social.cv': formData.get('cv'),
        ...(imageUrl ? {
          portrait: {
            url: imageUrl,
            publicId: String(formData.get('imagePublicId') ?? ''),
            width: Number(formData.get('imageWidth')) || 1200,
            height: Number(formData.get('imageHeight')) || 800,
          },
        } : {}),
      },
      { upsert: true }
    )

    revalidatePath('/')
    revalidatePath('/es/about')
    revalidatePath('/en/about')
    return { ok: true, message: 'Perfil guardado correctamente' }
  } catch {
    return { ok: false, message: 'Error al guardar. Intenta de nuevo.' }
  }
}
