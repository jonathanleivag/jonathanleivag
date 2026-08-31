'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

interface NavbarProps {
  handle?: string
  cvUrl?: string
  logo?: { src: string; alt: string; width: number; height: number }
}

export function Navbar({
  handle = 'jonathanleivag',
  cvUrl = '/cv.pdf',
  logo = { src: '', alt: 'Logo', width: 40, height: 40 },
}: NavbarProps) {
  const t = useTranslations('nav')
  const ta = useTranslations('a11y')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstDrawerLinkRef = useRef<HTMLAnchorElement>(null)

  const NAV_LINKS = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/about' },
    { label: t('blog'), href: '/blog' },
    { label: t('contact'), href: '/contact' },
  ]

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const mainEl = document.querySelector('main')
    document.body.style.overflow = open ? 'hidden' : ''
    if (mainEl) mainEl.toggleAttribute('inert', open)
    return () => {
      document.body.style.overflow = ''
      if (mainEl) mainEl.removeAttribute('inert')
    }
  }, [open])

  useEffect(() => {
    if (open) { firstDrawerLinkRef.current?.focus() }
    else { toggleRef.current?.focus() }
  }, [open])

  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[rgba(21,26,25,.94)] backdrop-blur-md border-b border-[var(--dc-border)]">
        <nav aria-label="Navegación principal" className="max-w-[1180px] mx-auto px-6 sm:px-10 h-[62px] grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e6dd] rounded">
            {logo.src && <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} priority className="rounded-sm" />}
            <span className="font-heading text-base font-black tracking-tight text-[#e8e6dd]">{handle}<span className="font-normal">.cl</span></span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.12em] uppercase text-[var(--dc-muted)]">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href)
              return (
                <li key={link.href} className="flex flex-col items-center gap-1">
                  <Link
                    href={link.href}
                    className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e6dd] rounded ${active ? 'text-[#e8e6dd]' : 'hover:text-[#e8e6dd]'}`}
                  >
                    {link.label}
                  </Link>
                  {active && <span className="w-full h-[2px] bg-[#e8e6dd]" />}
                </li>
              )
            })}
          </ul>

          <div className="hidden lg:flex items-center justify-end gap-3.5 text-[11px] tracking-[0.1em]">
            <LanguageSwitcher />
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="px-[11px] py-[5px] bg-[#e8e6dd] text-[#111111] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e6dd]">
              {t('cv')}
            </a>
          </div>

          <button ref={toggleRef} className="lg:hidden col-start-3 justify-self-end text-[var(--dc-muted)] hover:text-[#e8e6dd] transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e6dd]" onClick={() => setOpen((v) => !v)} aria-label={open ? ta('menuClose') : ta('menuOpen')} aria-expanded={open} aria-controls="mobile-nav">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {open && (
        <div id="mobile-nav" className="lg:hidden fixed inset-0 top-[62px] bg-[#151a19] z-[60] flex flex-col p-8">
          <ul className="flex flex-col gap-8 mt-4">
            {NAV_LINKS.map((link, index) => {
              const active = isActive(link.href)
              return (
                <li key={link.href}>
                  <Link
                    ref={index === 0 ? firstDrawerLinkRef : undefined}
                    href={link.href}
                    className={`font-heading text-2xl font-black transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e6dd] ${active ? 'text-[#e8e6dd]' : 'text-[var(--dc-muted)] hover:text-[#e8e6dd]'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-8">
            <LanguageSwitcher />
          </div>
          <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center gap-2 text-sm px-5 py-3 bg-[#e8e6dd] text-[#111111] font-bold self-start">
            {t('cv')}
          </a>
        </div>
      )}
    </>
  )
}
