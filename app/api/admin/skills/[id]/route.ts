import { NextRequest, NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/auth/admin'
import { connectToDatabase } from '@/lib/mongodb'
import { SkillCategory } from '@/models/SkillCategory'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  const { id } = await params
  const body = await request.json()

  await connectToDatabase()
  await SkillCategory.findByIdAndUpdate(id, body)

  return NextResponse.json({ ok: true })
}
