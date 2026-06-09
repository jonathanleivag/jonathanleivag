'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FileText, Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
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
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstDrawerLinkRef = useRef<HTMLAnchorElement>(null)

  const NAV_LINKS = [
    { label: t('home'), href: '#hero' },
    { label: t('projects'), href: '#projects' },
    { label: t('caseStudies'), href: '#case-studies' },
    { label: t('skills'), href: '#skills' },
    { label: t('about'), href: '#about' },
    { label: t('contact'), href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  return (
    <>
      <header className={cn('fixed top-0 z-50 w-full transition-all duration-300', scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent')}>
        <nav aria-label="Navegación principal" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 focus-visible:ring-offset-black rounded">
            {logo.src && <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} priority className="rounded-sm" />}
            <span className="text-sm font-semibold text-zinc-100 tracking-wide">{handle}</span>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 focus-visible:ring-offset-black">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm border border-[var(--accent-emerald-border)] text-emerald-400 px-4 py-2 rounded-lg hover:bg-[var(--accent-emerald-dim)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 focus-visible:ring-offset-black">
              <FileText size={14} />
              {t('cv')}
            </a>
          </div>

          <button ref={toggleRef} className="lg:hidden text-zinc-400 hover:text-zinc-100 transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 focus-visible:ring-offset-black" onClick={() => setOpen((v) => !v)} aria-label={open ? ta('menuClose') : ta('menuOpen')} aria-expanded={open} aria-controls="mobile-nav">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {open && (
        <div id="mobile-nav" className="lg:hidden fixed inset-0 top-16 bg-[#0a0a0a] z-[60] flex flex-col p-8">
          <ul className="flex flex-col gap-8 mt-4">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <a ref={index === 0 ? firstDrawerLinkRef : undefined} href={link.href} className="text-2xl font-medium text-zinc-300 hover:text-emerald-400 transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 focus-visible:ring-offset-black" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <LanguageSwitcher />
          </div>
          <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center gap-2 text-sm border border-[var(--accent-emerald-border)] text-emerald-400 px-5 py-3 rounded-lg hover:bg-[var(--accent-emerald-dim)] transition-colors self-start">
            <FileText size={14} />
            {t('cv')}
          </a>
        </div>
      )}
    </>
  )
}
