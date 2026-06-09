import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const LOCALES = ['es', 'en']
const PUBLIC_PATHS = ['/', ...LOCALES.map((l) => `/${l}`)]

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { paths } = await request.json().catch(() => ({ paths: null }))

  const toRevalidate: string[] = paths ?? [
    ...PUBLIC_PATHS,
    ...LOCALES.map((l) => `/${l}/projects`),
  ]

  for (const path of toRevalidate) {
    revalidatePath(path)
  }

  return NextResponse.json({ ok: true, revalidated: toRevalidate, timestamp: new Date().toISOString() })
}
