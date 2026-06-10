import { NextRequest, NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/auth/admin'
import { connectToDatabase } from '@/lib/mongodb'
import { Experience } from '@/models/Experience'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response
  await connectToDatabase()
  const docs = await Experience.find().sort({ order: 1 }).lean()
  return NextResponse.json(JSON.parse(JSON.stringify(docs)))
}

export async function POST(request: NextRequest) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response
  const body = await request.json()
  await connectToDatabase()
  const doc = await Experience.create(body)
  revalidatePath('/')
  return NextResponse.json(JSON.parse(JSON.stringify(doc)))
}
