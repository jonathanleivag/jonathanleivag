import type { Metadata } from 'next'
import { Suspense } from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Toaster } from '@/components/admin/Toaster'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
      <Suspense>
        <Toaster />
      </Suspense>
    </div>
  )
}
