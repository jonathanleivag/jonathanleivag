import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectToDatabase } from '@/lib/mongodb'
import { Experience } from '@/models/Experience'
import { revalidatePath } from 'next/cache'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await request.json()
  await connectToDatabase()
  await Experience.findByIdAndUpdate(id, body)
  revalidatePath('/')
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await connectToDatabase()
  await Experience.findByIdAndDelete(id)
  revalidatePath('/')
  return NextResponse.json({ ok: true })
}
