import { NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/auth/admin'
import { connectToDatabase } from '@/lib/mongodb'
import { SkillCategory } from '@/models/SkillCategory'

export async function GET() {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  await connectToDatabase()
  const categories = await SkillCategory.find().sort({ order: 1 }).lean()
  // Explicitly stringify _id to avoid ObjectId comparison issues on client
  const safe = categories.map((c) => ({
    ...JSON.parse(JSON.stringify(c)),
    _id: c._id.toString(),
  }))
  return NextResponse.json(safe)
}
