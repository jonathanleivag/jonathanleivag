import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectToDatabase } from '@/lib/mongodb'
import { Project } from '@/models/Project'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  if (!body.slug || !body.title?.es || !body.summary?.es) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  await connectToDatabase()

  try {
    await Project.create(body)
    revalidatePath('/')
    revalidatePath('/es')
    revalidatePath('/en')
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('duplicate key')) {
      return NextResponse.json({ error: 'El slug ya existe' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Error al crear proyecto' }, { status: 500 })
  }
}
