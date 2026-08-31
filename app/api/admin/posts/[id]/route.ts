import { NextRequest, NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/auth/admin'
import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'
import { revalidatePath } from 'next/cache'

function revalidatePublicPaths(slug?: string) {
  revalidatePath('/')
  revalidatePath('/es')
  revalidatePath('/en')
  revalidatePath('/es/blog')
  revalidatePath('/en/blog')
  if (slug) {
    revalidatePath(`/es/blog/${slug}`)
    revalidatePath(`/en/blog/${slug}`)
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  const { id } = await params
  const body = await request.json()

  await connectToDatabase()

  let slug: string | undefined = body.slug
  if (!slug) {
    const existing = await Post.findById(id).lean<{ slug?: string } | null>()
    slug = existing?.slug
  }

  await Post.findByIdAndUpdate(id, body)
  revalidatePublicPaths(slug)

  return NextResponse.json({ ok: true })
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  const { id } = await params
  await connectToDatabase()

  const existing = await Post.findById(id).lean<{ slug?: string } | null>()
  await Post.findByIdAndDelete(id)
  revalidatePublicPaths(existing?.slug)

  return NextResponse.json({ ok: true })
}
