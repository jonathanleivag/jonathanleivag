import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { cloudinary } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { folder, resourceType } = await request.json()

  const timestamp = Math.round(new Date().getTime() / 1000)
  const paramsToSign: Record<string, string | number> = {
    timestamp,
    folder: folder ?? 'portfolio',
  }

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  )

  return NextResponse.json({
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder: folder ?? 'portfolio',
    resourceType: resourceType ?? 'image',
  })
}
