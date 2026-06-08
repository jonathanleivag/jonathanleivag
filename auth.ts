import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ profile: githubProfile }) {
      if (!githubProfile?.email) return false
      return githubProfile.email === ADMIN_EMAIL
    },
    async session({ session }) {
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
})
