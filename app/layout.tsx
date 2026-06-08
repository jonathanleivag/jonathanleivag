import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { profile } from '@/content/profile'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jonathanleivag.cl'),
  title: {
    default: profile.metaTitle,
    template: `%s | ${profile.name}`,
  },
  description: profile.metaDescription,
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://jonathanleivag.cl',
    siteName: profile.name,
    title: profile.metaTitle,
    description: profile.metaDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.metaTitle,
    description: profile.metaDescription,
  },
  alternates: {
    canonical: 'https://jonathanleivag.cl',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-zinc-100">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
