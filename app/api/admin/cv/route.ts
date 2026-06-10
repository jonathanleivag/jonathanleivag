import { NextRequest, NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/auth/admin'
import { connectToDatabase } from '@/lib/mongodb'
import { Asset } from '@/models/Asset'

export async function POST(request: NextRequest) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

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
