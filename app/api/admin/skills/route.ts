import { NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/auth/admin'
import { connectToDatabase } from '@/lib/mongodb'
import { SkillCategory } from '@/models/SkillCategory'

export async function GET() {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  await connectToDatabase()
  const categories = await SkillCategory.find().sort({ order: 1 }).lean()
  return NextResponse.json(JSON.parse(JSON.stringify(categories)))
}
