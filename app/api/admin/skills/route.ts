import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectToDatabase } from '@/lib/mongodb'
import { SkillCategory } from '@/models/SkillCategory'

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectToDatabase()
  const categories = await SkillCategory.find().sort({ order: 1 }).lean()
  return NextResponse.json(JSON.parse(JSON.stringify(categories)))
}
