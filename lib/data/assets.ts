import { connectToDatabase } from '@/lib/mongodb'
import { Asset } from '@/models/Asset'
import { assets as staticAssets } from '@/content/assets'

export async function getPublicLogo() {
  try {
    await connectToDatabase()
    const doc = await Asset.findOne({ key: 'logo', isActive: true }).lean() as Record<string, unknown> | null
    if (doc?.url) {
      return {
        src: doc.url as string,
        alt: (doc.alt as string) || staticAssets.logo.alt,
        width: (doc.width as number) || staticAssets.logo.width,
        height: (doc.height as number) || staticAssets.logo.height,
      }
    }
    return staticAssets.logo
  } catch {
    return staticAssets.logo
  }
}

export async function getPublicCv(): Promise<string> {
  try {
    await connectToDatabase()
    const doc = await Asset.findOne({ key: 'current-cv', isActive: true }).lean() as Record<string, unknown> | null
    return (doc?.url as string) || staticAssets.favicon.ico
  } catch {
    return '/cv.pdf'
  }
}
