'use client'

import { useEffect, useState } from 'react'
import { FileText, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { profile } from '@/content/profile'

const NAV_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Stack', href: '#skills' },
  { label: 'Contacto', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
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

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <nav aria-label="Navegación principal" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#hero" className="text-sm font-semibold text-zinc-100 tracking-wide hover:text-emerald-400 transition-colors">
          {profile.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 text-sm border border-[var(--accent-emerald-border)] text-emerald-400 px-4 py-2 rounded-lg hover:bg-[var(--accent-emerald-dim)] transition-colors"
        >
          <FileText size={14} />
          CV
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-zinc-400 hover:text-zinc-100 transition-colors p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div id="mobile-nav" className="lg:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-md z-40 flex flex-col p-8">
          <ul className="flex flex-col gap-8 mt-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-2xl font-medium text-zinc-300 hover:text-emerald-400 transition-colors block"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center gap-2 text-sm border border-[var(--accent-emerald-border)] text-emerald-400 px-5 py-3 rounded-lg hover:bg-[var(--accent-emerald-dim)] transition-colors self-start"
          >
            <FileText size={14} />
            Descargar CV
          </a>
        </div>
      )}
    </header>
  )
}
