import type { Metadata } from 'next'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ variable: '--font-jetbrains-mono', subsets: ['latin'], weight: ['400', '500', '700'] })
const archivo = Archivo({ variable: '--font-archivo', subsets: ['latin'], weight: ['400', '500', '700', '900'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jonathanleivag.cl'),
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={`${jetbrainsMono.variable} ${archivo.variable} dark h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#151a19] text-[#e8e6dd]">
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
