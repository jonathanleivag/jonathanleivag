import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { Session } from 'next-auth'

const ADMIN_GITHUB_ID = process.env.ADMIN_GITHUB_ID
const ADMIN_GITHUB_LOGIN = process.env.ADMIN_GITHUB_LOGIN
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

type AdminUser = {
  email?: string | null
  githubId?: string
  githubLogin?: string
}

export function isAdminSession(session: Session | null): boolean {
  if (!session?.user) return false

  const user = session.user as AdminUser

  const byId = Boolean(ADMIN_GITHUB_ID && user.githubId === ADMIN_GITHUB_ID)
  const byLogin = Boolean(
    ADMIN_GITHUB_LOGIN &&
    user.githubLogin?.toLowerCase() === ADMIN_GITHUB_LOGIN.toLowerCase()
  )
  const byEmail = Boolean(
    ADMIN_EMAIL &&
    user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  )

  return byId || byLogin || byEmail
}

export async function assertAdmin(): Promise<
  { ok: true } | { ok: false; response: NextResponse }
> {
  const session = (await auth()) as Session | null

  if (!session?.user) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  if (!isAdminSession(session)) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    }
  }

  return { ok: true }
}
