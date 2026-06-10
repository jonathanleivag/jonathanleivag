import { NextRequest, NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/auth/admin'
import { connectToDatabase } from '@/lib/mongodb'
import { SkillCategory } from '@/models/SkillCategory'

export async function GET() {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  await connectToDatabase()
  const categories = await SkillCategory.find().sort({ order: 1 }).lean()
  const safe = categories.map((c) => ({
    ...JSON.parse(JSON.stringify(c)),
    _id: c._id.toString(),
  }))
  return NextResponse.json(safe)
}

export async function POST(request: NextRequest) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  const body = await request.json()
  await connectToDatabase()
  const doc = await SkillCategory.create(body)
  return NextResponse.json({ ...JSON.parse(JSON.stringify(doc)), _id: doc._id.toString() })
}
