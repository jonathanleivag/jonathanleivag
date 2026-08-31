import { NextRequest, NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/auth/admin'
import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  const { id } = await params
  const body = await request.json()

  await connectToDatabase()
  await Post.findByIdAndUpdate(id, body)

  return NextResponse.json({ ok: true })
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  const { id } = await params
  await connectToDatabase()
  await Post.findByIdAndDelete(id)

  return NextResponse.json({ ok: true })
}
