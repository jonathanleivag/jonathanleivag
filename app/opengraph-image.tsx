import { createOgImageResponse } from '@/lib/og-image'
import { getPublicProfile } from '@/lib/data/profile'

export const alt = 'Jonathan Leiva Gómez — Desarrollador Full Stack Senior'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const profile = await getPublicProfile('es')
  return createOgImageResponse(profile.name, profile.role)
}
