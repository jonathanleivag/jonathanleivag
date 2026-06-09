'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongodb'
import { Profile } from '@/models/Profile'
import { auth } from '@/auth'

export async function updateProfileAction(
  _prev: { ok: boolean; message: string } | null,
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  try {
    const session = await auth()
    if (!session?.user) return { ok: false, message: 'No autorizado' }

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
        'social.github': formData.get('github'),
        'social.linkedin': formData.get('linkedin'),
        'social.email': formData.get('email'),
        'social.cv': formData.get('cv'),
      },
      { upsert: true }
    )

    revalidatePath('/')
    return { ok: true, message: 'Perfil guardado correctamente' }
  } catch {
    return { ok: false, message: 'Error al guardar. Intenta de nuevo.' }
  }
}
