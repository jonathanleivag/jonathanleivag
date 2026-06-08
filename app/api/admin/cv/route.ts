import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectToDatabase } from '@/lib/mongodb'
import { Asset } from '@/models/Asset'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { url, publicId, bytes, originalFilename } = await request.json()

  if (!url) return NextResponse.json({ error: 'URL requerida' }, { status: 400 })

  await connectToDatabase()

  await Asset.findOneAndUpdate(
    { key: 'current-cv' },
    {
      key: 'current-cv',
      type: 'cv',
      url,
      publicId,
      bytes,
      originalFilename,
      isActive: true,
    },
    { upsert: true }
  )

  return NextResponse.json({ ok: true, url })
}

export async function GET() {
  await connectToDatabase()
  const asset = await Asset.findOne({ key: 'current-cv', isActive: true }).lean()
  return NextResponse.json(asset)
}
