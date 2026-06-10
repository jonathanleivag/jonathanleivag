import { NextRequest, NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/auth/admin'
import { connectToDatabase } from '@/lib/mongodb'
import { Experience } from '@/models/Experience'
import { revalidatePath } from 'next/cache'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response
  const { id } = await params
  const body = await request.json()
  await connectToDatabase()
  await Experience.findByIdAndUpdate(id, body)
  revalidatePath('/')
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response
  const { id } = await params
  await connectToDatabase()
  await Experience.findByIdAndDelete(id)
  revalidatePath('/')
  return NextResponse.json({ ok: true })
}
