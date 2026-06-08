# Portfolio Base Structure — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete base structure of Jonathan Leiva's personal portfolio as a single-page landing with all sections, dark-mode-first with emerald accent, mobile-first responsive design.

**Architecture:** Component-based single page. `app/page.tsx` assembles all section components. Each section lives under `components/sections/`. Shared UI primitives in `components/ui/`. Typed static data in `lib/`. A placeholder route at `app/projects/[slug]/` scaffolds future case study detail pages.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, shadcn/ui, framer-motion, lucide-react

---

## File Map

| Action   | File                                       | Responsibility                              |
|----------|--------------------------------------------|---------------------------------------------|
| Modify   | `app/globals.css`                          | Emerald accent tokens, smooth scroll        |
| Modify   | `app/layout.tsx`                           | Metadata, dark class, lang="es"             |
| Modify   | `app/page.tsx`                             | Assemble all sections                       |
| Create   | `app/projects/[slug]/page.tsx`             | Placeholder case study detail route         |
| Create   | `lib/types.ts`                             | TypeScript interfaces for all data shapes   |
| Create   | `lib/data.ts`                              | Static placeholder content                  |
| Create   | `components/ui/SectionHeader.tsx`          | Consistent section title + subtitle         |
| Create   | `components/ui/Terminal.tsx`               | Animated CLI block for Hero right column    |
| Create   | `components/ui/ProjectCard.tsx`            | Reusable project card                       |
| Create   | `components/ui/SkillGroup.tsx`             | Tech category with badge list               |
| Create   | `components/layout/Navbar.tsx`             | Sticky nav, scroll-aware, mobile drawer     |
| Create   | `components/layout/Footer.tsx`             | Name, role, links, year                     |
| Create   | `components/sections/Hero.tsx`             | 2-col desktop, terminal right column        |
| Create   | `components/sections/About.tsx`            | Summary + 3 highlight cards                 |
| Create   | `components/sections/Projects.tsx`         | Grid of ProjectCard                         |
| Create   | `components/sections/CaseStudies.tsx`      | Narrative cards (context → result)          |
| Create   | `components/sections/Skills.tsx`           | SkillGroup by category                      |
| Create   | `components/sections/Contact.tsx`          | Email copy, social links, CV download       |

---

## Task 1: Types and data layer

**Files:**
- Create: `lib/types.ts`
- Create: `lib/data.ts`

- [ ] **Step 1: Create `lib/types.ts`**

```typescript
export interface Project {
  id: string
  title: string
  category: string
  problem: string
  stack: string[]
  impact: string
  slug: string
  links?: { demo?: string; repo?: string }
}

export interface CaseStudy {
  id: string
  title: string
  category: string
  context: string
  decisions: string[]
  result: string
  stack: string[]
  links?: { demo?: string; repo?: string }
}

export interface SkillCategory {
  name: string
  skills: string[]
}
```

- [ ] **Step 2: Create `lib/data.ts`**

```typescript
import type { Project, CaseStudy, SkillCategory } from './types'

export const projects: Project[] = [
  {
    id: '1',
    title: 'Plataforma de Gestión Comercial',
    category: 'Enterprise SaaS',
    problem: 'Digitalizar procesos manuales de ventas y seguimiento de clientes.',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript'],
    impact: 'Reducción del 60% en tiempo de gestión operativa',
    slug: 'gestion-comercial',
    links: {},
  },
  {
    id: '2',
    title: 'Sistema de Notificaciones Multicanal',
    category: 'Microservicio',
    problem: 'Centralizar envíos de email, SMS y push desde múltiples productos.',
    stack: ['Node.js', 'Redis', 'RabbitMQ', 'TypeScript'],
    impact: 'Procesamiento de 50k eventos/día con latencia < 200ms',
    slug: 'notificaciones-multicanal',
    links: {},
  },
  {
    id: '3',
    title: 'Dashboard de Analytics en Tiempo Real',
    category: 'Internal Tool',
    problem: 'Visualizar métricas de negocio con actualización en tiempo real.',
    stack: ['React', 'WebSocket', 'ClickHouse', 'TypeScript'],
    impact: 'Eliminó 3 reportes manuales semanales para el equipo de producto',
    slug: 'dashboard-analytics',
    links: {},
  },
]

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Migración de Monolito a Microservicios',
    category: 'Arquitectura',
    context:
      'Sistema legacy de 5 años con acoplamiento alto, deploys costosos y tiempos de respuesta degradados bajo carga.',
    decisions: [
      'Strangler pattern para migración gradual sin downtime',
      'API Gateway centralizado para routing y autenticación',
      'Event-driven communication con RabbitMQ para servicios asíncronos',
    ],
    result: 'Deploy time de 45min → 8min. Incidentes de producción reducidos un 70%.',
    stack: ['NestJS', 'RabbitMQ', 'Docker', 'PostgreSQL', 'Redis'],
    links: {},
  },
  {
    id: '2',
    title: 'Optimización de Performance: de 8s a 1.2s',
    category: 'Performance',
    context:
      'Dashboard con queries N+1 no detectadas, sin caché y bundle de frontend sin optimizar causaban carga lenta crítica.',
    decisions: [
      'Auditoría con Query Explain en PostgreSQL para detectar N+1',
      'Redis para cache de queries frecuentes con TTL por entidad',
      'Code splitting y lazy loading en React por ruta',
    ],
    result: 'LCP de 8.2s a 1.2s. Tasa de rebote reducida un 40%.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'TypeScript'],
    links: {},
  },
]

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React Query'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'NestJS', 'GraphQL', 'REST APIs', 'WebSockets', 'Jest'],
  },
  {
    name: 'Bases de datos',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma', 'Mikro-ORM'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['Docker', 'AWS', 'Vercel', 'CI/CD', 'GitHub Actions', 'Nginx'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'Figma', 'Postman', 'RabbitMQ', 'Turborepo', 'ESLint'],
  },
]
```

- [ ] **Step 3: Run TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/types.ts lib/data.ts
git commit -m "feat: add typed data layer with placeholder content"
```

---

## Task 2: Global styles — emerald tokens + smooth scroll

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Update the `.dark` block and add smooth scroll**

Replace the `.dark` block CSS variables and add smooth scroll. Keep all existing variables — only update `--primary` and `--primary-foreground` inside `.dark`, and add `scroll-behavior` to `html`:

```css
/* At the top of the file, after existing @import lines, add: */
@layer base {
  html {
    scroll-behavior: smooth;
  }
}
```

Inside the existing `.dark { ... }` block, update these two variables:

```css
--primary: oklch(0.696 0.17 162.48);       /* emerald-500 */
--primary-foreground: oklch(0.145 0 0);    /* near-black */
```

Also add a new CSS custom property for the emerald accent (used for borders and glows), below the `.dark` block:

```css
:root {
  --accent-emerald: #10b981;
  --accent-emerald-dim: rgba(16, 185, 129, 0.15);
  --accent-emerald-border: rgba(16, 185, 129, 0.3);
}
```

- [ ] **Step 2: Verify Tailwind picks up primary change**

```bash
pnpm dev
```

Open `http://localhost:3000`. The default page still shows — that's expected. No errors in terminal.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add emerald accent tokens and smooth scroll"
```

---

## Task 3: Update layout.tsx — metadata + dark class

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update `app/layout.tsx`**

Replace the entire file contents:

```tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Jonathan Leiva — Full Stack Senior Engineer',
  description:
    'Diseño y desarrollo productos digitales escalables con foco en arquitectura, producto y ejecución end-to-end.',
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
      <body className="min-h-full bg-[#0a0a0a] text-zinc-100">{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Verify**

```bash
pnpm dev
```

Open `http://localhost:3000`. Background should be near-black. No errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: update layout with dark mode, metadata and lang=es"
```

---

## Task 4: SectionHeader UI component

**Files:**
- Create: `components/ui/SectionHeader.tsx`

- [ ] **Step 1: Create `components/ui/SectionHeader.tsx`**

```tsx
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ label, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', className)}>
      {label && (
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400 block mb-3">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 leading-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-zinc-400 text-base sm:text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/SectionHeader.tsx
git commit -m "feat: add SectionHeader UI component"
```

---

## Task 5: Terminal UI component

**Files:**
- Create: `components/ui/Terminal.tsx`

- [ ] **Step 1: Create `components/ui/Terminal.tsx`**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface TerminalLine {
  prefix: string
  text: string
  isOutput?: boolean
}

const LINES: TerminalLine[] = [
  { prefix: '$', text: 'whoami' },
  { prefix: ' ', text: 'jonathan.leiva', isOutput: true },
  { prefix: '$', text: 'cat role.txt' },
  { prefix: ' ', text: 'Full Stack Senior Engineer', isOutput: true },
  { prefix: '$', text: 'skills --list' },
  { prefix: '→', text: 'React · Next.js · TypeScript', isOutput: true },
  { prefix: '→', text: 'Node.js · NestJS · PostgreSQL', isOutput: true },
  { prefix: '→', text: 'Docker · AWS · CI/CD', isOutput: true },
]

export function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced.current) {
      setVisibleCount(LINES.length)
      return
    }
    const interval = setInterval(() => {
      setVisibleCount((n) => {
        if (n >= LINES.length) {
          clearInterval(interval)
          return n
        }
        return n + 1
      })
    }, 220)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-xl border border-white/10 bg-black overflow-hidden font-mono text-sm">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-zinc-900/60">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs text-zinc-500">~/portfolio</span>
      </div>

      {/* Lines */}
      <div className="p-5 space-y-1 min-h-[220px]">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className={line.isOutput ? 'text-emerald-400' : 'text-zinc-500'}>
              {line.prefix}
            </span>
            <span className={line.isOutput ? 'text-zinc-300' : 'text-zinc-100'}>
              {line.text}
            </span>
          </div>
        ))}
        {visibleCount < LINES.length && (
          <div className="flex gap-3">
            <span className="text-zinc-500">$</span>
            <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
          </div>
        )}
        {visibleCount >= LINES.length && (
          <div className="flex gap-3">
            <span className="text-zinc-500">$</span>
            <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Terminal.tsx
git commit -m "feat: add Terminal animated CLI component"
```

---

## Task 6: Footer component

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create `components/layout/Footer.tsx`**

```tsx
import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-zinc-200">Jonathan Leiva</p>
          <p className="text-xs text-zinc-500 mt-0.5">Full Stack Senior Engineer</p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/jonathanleivag"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/jonathanleivag"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:jonathan.leiva@movatec.cl"
            aria-label="Email"
            className="text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>

        <p className="text-xs text-zinc-600">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 7: Navbar component

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Create `components/layout/Navbar.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { FileText, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
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
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#hero" className="text-sm font-semibold text-zinc-100 tracking-wide hover:text-emerald-400 transition-colors">
          Jonathan Leiva
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
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-md z-40 flex flex-col p-8">
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Quick visual smoke-test**

Temporarily add `<Navbar />` to `app/page.tsx`, run `pnpm dev`, open `http://localhost:3000`. Verify:
- Nav renders at top
- Hamburger icon visible on mobile width
- Clicking hamburger opens drawer
- `Esc` closes drawer
- Scrolling 20px makes header gain background

Remove the temporary import after verifying.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add sticky Navbar with mobile drawer"
```

---

## Task 8: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { Terminal } from '@/components/ui/Terminal'

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16 pb-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400">
              Disponible para nuevos proyectos
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-zinc-100">
              Full Stack<br />
              <span className="text-emerald-400">Senior Engineer</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
              Diseño y construyo productos digitales escalables. Foco en arquitectura,
              experiencia de usuario y entrega end-to-end.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors min-h-[44px]"
            >
              Ver proyectos
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors min-h-[44px]"
            >
              Contactar
            </a>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/jonathanleivag"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/jonathanleivag"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:jonathan.leiva@movatec.cl"
              aria-label="Email"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Right column — Terminal */}
        <div className="w-full max-w-lg mx-auto lg:mx-0">
          <Terminal />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with terminal block"
```

---

## Task 9: About section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create `components/sections/About.tsx`**

```tsx
import { Layers, Lightbulb, Zap } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const HIGHLIGHTS = [
  {
    icon: Layers,
    title: 'Arquitectura',
    description: 'Decisiones técnicas balanceadas entre calidad, velocidad y mantenibilidad.',
  },
  {
    icon: Lightbulb,
    title: 'Producto',
    description: 'Entiendo el problema antes de implementar. Conecto tecnología con negocio.',
  },
  {
    icon: Zap,
    title: 'Ejecución end-to-end',
    description: 'Frontend, backend, infraestructura y despliegue. Sin zonas grises.',
  },
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Sobre mí"
          title="Construyo productos, no solo código"
          subtitle="Full Stack Senior con más de 7 años de experiencia construyendo productos digitales desde el descubrimiento técnico hasta el despliegue. Me especializo en arquitecturas escalables, APIs robustas y frontends de alto rendimiento con mentalidad de producto."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="border-l-2 border-emerald-500 pl-5 py-1 space-y-2"
            >
              <div className="flex items-center gap-2 text-zinc-100 font-semibold">
                <Icon size={16} className="text-emerald-400 shrink-0" />
                {title}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: add About section"
```

---

## Task 10: ProjectCard and SkillGroup UI components

**Files:**
- Create: `components/ui/ProjectCard.tsx`
- Create: `components/ui/SkillGroup.tsx`

- [ ] **Step 1: Create `components/ui/ProjectCard.tsx`**

```tsx
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col h-full border border-white/5 bg-zinc-900/40 rounded-xl p-6 hover:-translate-y-0.5 hover:border-emerald-500/20 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-zinc-100 leading-snug">
            {project.title}
          </h3>
        </div>
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">{project.problem}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs bg-zinc-800 border border-white/5 text-zinc-300 px-2.5 py-1 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="border-t border-white/5 pt-4 flex items-center justify-between">
        <p className="text-xs text-emerald-400 font-medium leading-snug max-w-[70%]">
          {project.impact}
        </p>
        <a
          href={`/projects/${project.slug}`}
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-emerald-400 transition-colors group-hover:text-zinc-300 min-h-[44px] min-w-[44px] justify-end"
          aria-label={`Ver caso de ${project.title}`}
        >
          Ver caso
          <ArrowUpRight size={13} />
        </a>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Create `components/ui/SkillGroup.tsx`**

```tsx
import type { SkillCategory } from '@/lib/types'

interface SkillGroupProps {
  category: SkillCategory
}

export function SkillGroup({ category }: SkillGroupProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
        {category.name}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="text-sm bg-zinc-900 border border-white/5 text-zinc-300 px-3 py-1.5 rounded-lg hover:border-emerald-500/30 hover:text-emerald-400 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/ProjectCard.tsx components/ui/SkillGroup.tsx
git commit -m "feat: add ProjectCard and SkillGroup UI components"
```

---

## Task 11: Projects section

**Files:**
- Create: `components/sections/Projects.tsx`

- [ ] **Step 1: Create `components/sections/Projects.tsx`**

```tsx
import { projects } from '@/lib/data'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Proyectos"
          title="Proyectos destacados"
          subtitle="Soluciones construidas end-to-end con foco en impacto medible."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Projects.tsx
git commit -m "feat: add Projects section"
```

---

## Task 12: CaseStudies section

**Files:**
- Create: `components/sections/CaseStudies.tsx`

- [ ] **Step 1: Create `components/sections/CaseStudies.tsx`**

```tsx
import { ArrowUpRight } from 'lucide-react'
import { caseStudies } from '@/lib/data'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Casos de estudio"
          title="Decisiones técnicas en contexto"
          subtitle="No solo qué se construyó, sino por qué y cómo. Problemas reales, trade-offs reales."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {caseStudies.map((cs) => (
            <article
              key={cs.id}
              className="border border-white/5 bg-zinc-900/40 rounded-xl p-7 space-y-6 hover:border-emerald-500/20 transition-colors"
            >
              <div>
                <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                  {cs.category}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-zinc-100">{cs.title}</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Contexto
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{cs.context}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Decisiones técnicas
                  </p>
                  <ul className="space-y-2">
                    {cs.decisions.map((d, i) => (
                      <li key={i} className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                        <span className="text-emerald-500 mt-0.5 shrink-0">→</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Resultado
                  </p>
                  <p className="text-emerald-400 text-sm font-medium">{cs.result}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {cs.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-zinc-800 border border-white/5 text-zinc-300 px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/CaseStudies.tsx
git commit -m "feat: add CaseStudies section"
```

---

## Task 13: Skills section

**Files:**
- Create: `components/sections/Skills.tsx`

- [ ] **Step 1: Create `components/sections/Skills.tsx`**

```tsx
import { skillCategories } from '@/lib/data'
import { SkillGroup } from '@/components/ui/SkillGroup'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Stack técnico"
          title="Tecnologías que domino"
          subtitle="Herramientas que he usado en proyectos reales, no en tutoriales."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillCategories.map((cat) => (
            <SkillGroup key={cat.name} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Skills.tsx
git commit -m "feat: add Skills section"
```

---

## Task 14: Contact section

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create `components/sections/Contact.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { Check, Copy, ExternalLink, Github, Linkedin } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const EMAIL = 'jonathan.leiva@movatec.cl'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeader
          label="Contacto"
          title="¿Hablamos?"
          subtitle="Estoy abierto a nuevos proyectos, posiciones senior y conversaciones técnicas interesantes."
          className="text-center [&_p]:mx-auto"
        />

        {/* Email copy */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-zinc-300 text-base font-mono">{EMAIL}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs border border-white/10 text-zinc-400 hover:border-emerald-500/30 hover:text-emerald-400 px-3 py-2 rounded-lg transition-colors min-h-[44px]"
            aria-label="Copiar email"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                Copiado
              </>
            ) : (
              <>
                <Copy size={13} />
                Copiar
              </>
            )}
          </button>
        </div>

        {/* Social links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://linkedin.com/in/jonathanleivag"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors min-h-[44px] w-full sm:w-auto justify-center"
          >
            <Linkedin size={16} />
            LinkedIn
            <ExternalLink size={12} className="text-zinc-600" />
          </a>
          <a
            href="https://github.com/jonathanleivag"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors min-h-[44px] w-full sm:w-auto justify-center"
          >
            <Github size={16} />
            GitHub
            <ExternalLink size={12} className="text-zinc-600" />
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors min-h-[44px] w-full sm:w-auto justify-center"
          >
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat: add Contact section with clipboard copy"
```

---

## Task 15: Assemble page.tsx and layout.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <CaseStudies />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run full TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Run dev and do full visual review**

```bash
pnpm dev
```

Open `http://localhost:3000` and verify each section:
- Navbar: sticky, transparent → frosted on scroll, mobile drawer works, `Esc` closes it
- Hero: name, role, CTAs, quick links, Terminal animates
- About: summary text, 3 highlight cards with emerald left border
- Projects: 3 cards in grid, hover effect
- CaseStudies: 2 large cards, contexto/decisiones/resultado visible
- Skills: 5 skill groups with badges
- Contact: email + copy button (click to verify "Copiado"), social links, CV button
- Footer: name, role, icons, year
- Responsive: check mobile width — single column, drawer nav

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble landing page with all sections"
```

---

## Task 16: Case study detail page placeholder

**Files:**
- Create: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create `app/projects/[slug]/page.tsx`**

```tsx
interface Props {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
          Caso de estudio
        </span>
        <h1 className="text-3xl font-bold text-zinc-100">{slug}</h1>
        <p className="text-zinc-500 max-w-md mx-auto">
          Contenido del caso de estudio próximamente.
        </p>
        <a
          href="/#projects"
          className="inline-block text-sm text-emerald-400 hover:text-emerald-300 transition-colors mt-4"
        >
          ← Volver a proyectos
        </a>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Test the route**

With `pnpm dev` running, open `http://localhost:3000/projects/gestion-comercial`.
Expected: placeholder page renders with the slug and a back link.

- [ ] **Step 4: Final commit**

```bash
git add app/projects/
git commit -m "feat: scaffold case study detail page placeholder"
```

---

## Done

At this point the landing page is fully functional with:
- All 6 sections assembled and styled
- Navbar with mobile drawer
- Footer
- Typed data layer
- Dark mode (emerald accent)
- Mobile-first responsive layout
- Accessible keyboard navigation
- Terminal animation with `prefers-reduced-motion` support
- Case study detail route scaffolded
