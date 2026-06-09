import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectToDatabase } from '@/lib/mongodb'
import { Experience } from '@/models/Experience'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectToDatabase()
  const docs = await Experience.find().sort({ order: 1 }).lean()
  return NextResponse.json(JSON.parse(JSON.stringify(docs)))
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  await connectToDatabase()
  const doc = await Experience.create(body)
  revalidatePath('/')
  return NextResponse.json(JSON.parse(JSON.stringify(doc)))
}
