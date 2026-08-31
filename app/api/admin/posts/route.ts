import { NextRequest, NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/auth/admin'
import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  await connectToDatabase()
  const docs = await Post.find().sort({ order: 1 }).lean()
  const safe = docs.map((d) => ({
    ...JSON.parse(JSON.stringify(d)),
    _id: d._id.toString(),
  }))
  return NextResponse.json(safe)
}

export async function POST(request: NextRequest) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  const body = await request.json()
  await connectToDatabase()
  const doc = await Post.create(body)
  revalidatePath('/')
  revalidatePath('/es')
  revalidatePath('/en')
  revalidatePath('/es/blog')
  revalidatePath('/en/blog')
  return NextResponse.json({ ...JSON.parse(JSON.stringify(doc)), _id: doc._id.toString() })
}
