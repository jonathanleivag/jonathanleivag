import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

const ADMIN_GITHUB_ID = process.env.ADMIN_GITHUB_ID
const ADMIN_GITHUB_LOGIN = process.env.ADMIN_GITHUB_LOGIN
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ profile }) {
      const githubId = String(profile?.id ?? '')
      const githubLogin = String((profile as { login?: string })?.login ?? '').toLowerCase()
      const githubEmail = String(profile?.email ?? '').toLowerCase()

      const allowedById = Boolean(ADMIN_GITHUB_ID && githubId === ADMIN_GITHUB_ID)
      const allowedByLogin = Boolean(ADMIN_GITHUB_LOGIN && githubLogin === ADMIN_GITHUB_LOGIN.toLowerCase())
      const allowedByEmail = Boolean(ADMIN_EMAIL && githubEmail === ADMIN_EMAIL.toLowerCase())

      return allowedById || allowedByLogin || allowedByEmail
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.githubId = String(profile.id ?? '')
        token.githubLogin = String((profile as { login?: string }).login ?? '')
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        (session.user as { githubId?: string; githubLogin?: string }).githubId = token.githubId as string
        ;(session.user as { githubLogin?: string }).githubLogin = token.githubLogin as string
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
})
