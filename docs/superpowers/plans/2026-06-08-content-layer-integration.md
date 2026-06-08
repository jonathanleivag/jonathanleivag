# Content Layer Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect all `content/` files to UI components, remove every hardcoded string from visual components, and delete the now-redundant `lib/data.ts` and `lib/types.ts`.

**Architecture:** Single pass — update `content/profile.ts` first (adds fields all components depend on), then update UI primitives (`ProjectCard`, `SkillGroup`), then layout components (Navbar, Footer), then section components, then delete the old lib files. Each task is independent once `profile.ts` is updated.

**Tech Stack:** Next.js 16, React 19, TypeScript, `as const` typed content objects

---

## File Map

| Action  | File                                          | What changes                                  |
|---------|-----------------------------------------------|-----------------------------------------------|
| Modify  | `content/profile.ts`                          | Add `availability`, `social`, `about.highlights`, `sections` |
| Modify  | `app/layout.tsx`                              | Metadata from `profile`                       |
| Modify  | `components/layout/Navbar.tsx`                | Logo text from `profile.name`                 |
| Modify  | `components/layout/Footer.tsx`                | Name, role, social links from `profile`       |
| Modify  | `components/sections/Hero.tsx`                | All text + URLs from `profile`                |
| Modify  | `components/sections/About.tsx`               | Summary + highlights from `profile.about`     |
| Modify  | `components/sections/Projects.tsx`            | Import from `content/projects`, header from `profile.sections` |
| Modify  | `components/sections/CaseStudies.tsx`         | Import from `content/case-studies`, field renames |
| Modify  | `components/sections/Skills.tsx`              | Import from `content/skills`, header from `profile.sections` |
| Modify  | `components/ui/ProjectCard.tsx`               | Import type from `content/projects`, `summary` not `problem` |
| Modify  | `components/ui/SkillGroup.tsx`                | Import type from `content/skills`, `title` not `name` |
| Delete  | `lib/data.ts`                                 | Replaced by `content/`                        |
| Delete  | `lib/types.ts`                                | Each `content/` file owns its types           |

---

## Task 1: Extend content/profile.ts with missing fields

**Files:**
- Modify: `content/profile.ts`

- [ ] **Step 1: Replace the entire file with the extended version**

```typescript
export const profile = {
  name: 'Jonathan Leiva',
  role: 'Senior Full Stack Developer',
  metaTitle: 'Jonathan Leiva | Senior Full Stack Developer',
  metaDescription:
    'Portafolio de Jonathan Leiva, Senior Full Stack Developer especializado en crear productos digitales escalables, APIs robustas, interfaces modernas y soluciones end-to-end con foco en negocio.',
  availability: 'Disponible para nuevos proyectos',
  social: {
    github: 'https://github.com/jonathanleivag',
    linkedin: 'https://linkedin.com/in/jonathanleivag',
    email: 'jonathan.leiva@movatec.cl',
    cv: '/cv.pdf',
  },
  hero: {
    headline: 'Construyo productos digitales robustos, escalables y orientados a negocio.',
    subtitle:
      'Soy Full Stack Senior. Diseño e implemento soluciones end-to-end combinando arquitectura, frontend, backend, automatización y criterio de producto para resolver problemas reales con tecnología mantenible.',
    primaryCta: 'Ver proyectos',
    secondaryCta: 'Hablemos',
  },
  about: {
    title: 'Sobre mí',
    summary:
      'Soy desarrollador Full Stack Senior con experiencia construyendo aplicaciones web, APIs, integraciones y plataformas digitales desde la definición técnica hasta el despliegue. Me enfoco en crear soluciones claras, sostenibles y alineadas con objetivos de producto y negocio.',
    body: [
      'Trabajo bien en contextos donde hay que transformar problemas ambiguos en sistemas funcionales. Me involucro desde el entendimiento del usuario y las restricciones del negocio hasta la arquitectura, implementación, performance y mejora continua.',
      'Mi fortaleza está en conectar visión técnica con ejecución práctica: elegir buenas abstracciones, reducir complejidad innecesaria, documentar decisiones importantes y construir software que otros equipos puedan mantener y escalar.',
      'Valoro la comunicación clara, el ownership técnico y la colaboración cercana con producto, diseño y stakeholders. Para mí, seniority no es solo escribir código: es tomar mejores decisiones bajo restricciones reales.',
    ],
    highlights: [
      {
        title: 'Arquitectura',
        description: 'Decisiones técnicas balanceadas entre calidad, velocidad y mantenibilidad.',
      },
      {
        title: 'Producto',
        description: 'Entiendo el problema antes de implementar. Conecto tecnología con negocio.',
      },
      {
        title: 'Ejecución end-to-end',
        description: 'Frontend, backend, infraestructura y despliegue. Sin zonas grises.',
      },
    ],
  },
  contact: {
    title: '¿Tienes un producto, equipo o desafío técnico donde pueda aportar?',
    description:
      'Estoy abierto a conversar sobre roles senior, liderazgo técnico, desarrollo de producto, arquitectura full stack y proyectos donde la tecnología tenga impacto real.',
    primaryCta: 'Contactar',
    secondaryCta: 'Ver LinkedIn',
    emailLabel: 'Escríbeme por email',
    copiedLabel: 'Email copiado',
  },
  sections: {
    projects: {
      label: 'Proyectos',
      title: 'Proyectos destacados',
      subtitle: 'Soluciones construidas end-to-end con foco en impacto medible.',
    },
    caseStudies: {
      label: 'Casos de estudio',
      title: 'Decisiones técnicas en contexto',
      subtitle:
        'No solo qué se construyó, sino por qué y cómo. Problemas reales, trade-offs reales.',
    },
    skills: {
      label: 'Stack técnico',
      title: 'Tecnologías que domino',
      subtitle: 'Herramientas que he usado en proyectos reales, no en tutoriales.',
    },
  },
} as const
```

- [ ] **Step 2: Run TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add content/profile.ts
git commit -m "feat: add availability, social, highlights and sections to profile"
```

---

## Task 2: Update ProjectCard — new type and field name

**Files:**
- Modify: `components/ui/ProjectCard.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/content/projects'

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

      <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">{project.summary}</p>

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

Key change: `project.problem` → `project.summary`, import type from `@/content/projects`.

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/ProjectCard.tsx
git commit -m "feat: connect ProjectCard to content/projects type"
```

---

## Task 3: Update SkillGroup — new type and field name

**Files:**
- Modify: `components/ui/SkillGroup.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import type { SkillCategory } from '@/content/skills'

interface SkillGroupProps {
  category: SkillCategory
}

export function SkillGroup({ category }: SkillGroupProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
          {category.title}
        </h3>
        {category.description && (
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{category.description}</p>
        )}
      </div>
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

Key changes: `category.name` → `category.title`, import from `@/content/skills`, adds optional `description` line.

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/SkillGroup.tsx
git commit -m "feat: connect SkillGroup to content/skills type"
```

---

## Task 4: Update layout.tsx — metadata from profile

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
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
  title: profile.metaTitle,
  description: profile.metaDescription,
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
```

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: metadata from profile content"
```

---

## Task 5: Update Navbar — name from profile

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Add profile import and replace hardcoded name**

Read the current file first, then make two targeted changes:

1. Add import at the top (after existing imports):
```tsx
import { profile } from '@/content/profile'
```

2. Replace the hardcoded logo text. Find this line:
```tsx
<a href="#hero" className="text-sm font-semibold text-zinc-100 tracking-wide hover:text-emerald-400 transition-colors">
  Jonathan Leiva
</a>
```

Replace with:
```tsx
<a href="#hero" className="text-sm font-semibold text-zinc-100 tracking-wide hover:text-emerald-400 transition-colors">
  {profile.name}
</a>
```

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: navbar logo from profile.name"
```

---

## Task 6: Update Footer — name, role, social links from profile

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import { profile } from '@/content/profile'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-zinc-200">{profile.name}</p>
          <p className="text-xs text-zinc-500 mt-0.5">{profile.role}</p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${profile.social.email}`}
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

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: footer content from profile"
```

---

## Task 7: Update Hero section — all text from profile

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import { ArrowRight, Mail } from 'lucide-react'
import { Terminal } from '@/components/ui/Terminal'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import { profile } from '@/content/profile'

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
              {profile.availability}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-emerald-400">
              {profile.role}
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
              {profile.hero.subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors min-h-[44px]"
            >
              {profile.hero.primaryCta}
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors min-h-[44px]"
            >
              {profile.hero.secondaryCta}
            </a>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-5">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href={`mailto:${profile.social.email}`}
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

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: hero content from profile"
```

---

## Task 8: Update About section — summary and highlights from profile

**Files:**
- Modify: `components/sections/About.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import { Layers, Lightbulb, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { profile } from '@/content/profile'

const HIGHLIGHT_ICONS: LucideIcon[] = [Layers, Lightbulb, Zap]

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={profile.about.title}
          title="Construyo productos, no solo código"
          subtitle={profile.about.summary}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.about.highlights.map(({ title, description }, i) => {
            const Icon = HIGHLIGHT_ICONS[i] ?? Zap
            return (
              <div key={title} className="border-l-2 border-emerald-500 pl-5 py-1 space-y-2">
                <div className="flex items-center gap-2 text-zinc-100 font-semibold">
                  <Icon size={16} className="text-emerald-400 shrink-0" />
                  {title}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

Note: the section title `"Construyo productos, no solo código"` is a short visual headline kept in the component. The `subtitle` (long summary text) and `highlights` text come from `profile`.

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: about section content from profile"
```

---

## Task 9: Update Projects section — data and header from content

**Files:**
- Modify: `components/sections/Projects.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import { projects } from '@/content/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { profile } from '@/content/profile'

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={profile.sections.projects.label}
          title={profile.sections.projects.title}
          subtitle={profile.sections.projects.subtitle}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

Key changes: import from `content/projects`, key on `project.slug` (no `id`), SectionHeader from `profile.sections.projects`.

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Projects.tsx
git commit -m "feat: projects section from content layer"
```

---

## Task 10: Update CaseStudies section — new data source and field names

**Files:**
- Modify: `components/sections/CaseStudies.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import { caseStudies } from '@/content/case-studies'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { profile } from '@/content/profile'

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={profile.sections.caseStudies.label}
          title={profile.sections.caseStudies.title}
          subtitle={profile.sections.caseStudies.subtitle}
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {caseStudies.map((cs) => (
            <article
              key={cs.slug}
              className="border border-white/5 bg-zinc-900/40 rounded-xl p-7 space-y-6 hover:border-emerald-500/20 transition-colors"
            >
              <div>
                <h3 className="text-xl font-semibold text-zinc-100">{cs.title}</h3>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{cs.intro}</p>
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
                    {cs.technicalDecisions.map((d) => (
                      <li key={d} className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
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

              <div className="pt-2">
                <a
                  href={`/projects/${cs.slug}`}
                  className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
                  aria-label={`Ver caso de estudio: ${cs.title}`}
                >
                  Ver caso completo
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Key changes: import from `content/case-studies`, key on `cs.slug`, `cs.technicalDecisions` (was `cs.decisions`), adds `cs.intro` display, decision key uses `d` text (stable, no index).

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/CaseStudies.tsx
git commit -m "feat: case studies section from content layer"
```

---

## Task 11: Update Skills section — data and header from content

**Files:**
- Modify: `components/sections/Skills.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import { skills } from '@/content/skills'
import { SkillGroup } from '@/components/ui/SkillGroup'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { profile } from '@/content/profile'

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={profile.sections.skills.label}
          title={profile.sections.skills.title}
          subtitle={profile.sections.skills.subtitle}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {skills.map((cat) => (
            <SkillGroup key={cat.title} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

Key changes: import `skills` from `content/skills`, key on `cat.title` (was `cat.name`), SectionHeader from `profile.sections.skills`.

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Skills.tsx
git commit -m "feat: skills section from content layer"
```

---

## Task 12: Update Contact section — all text from profile

**Files:**
- Modify: `components/sections/Contact.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import { profile } from '@/content/profile'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.social.email)
      setCopied(true)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — fail silently
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeader
          label="Contacto"
          title={profile.contact.title}
          subtitle={profile.contact.description}
          className="text-center [&_p]:mx-auto"
        />

        {/* Email copy */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-zinc-300 text-base font-mono">{profile.social.email}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs border border-white/10 text-zinc-400 hover:border-emerald-500/30 hover:text-emerald-400 px-3 py-2 rounded-lg transition-colors min-h-[44px]"
            aria-label="Copiar email"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                {profile.contact.copiedLabel}
              </>
            ) : (
              <>
                <Copy size={13} />
                {profile.contact.emailLabel}
              </>
            )}
          </button>
        </div>
        <span aria-live="polite" className="sr-only">
          {copied ? 'Email copiado al portapapeles' : ''}
        </span>

        {/* Social links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors min-h-[44px] w-full sm:w-auto justify-center"
          >
            <LinkedinIcon size={16} />
            LinkedIn
            <ExternalLink size={12} className="text-zinc-600" />
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-6 py-3 rounded-lg transition-colors min-h-[44px] w-full sm:w-auto justify-center"
          >
            <GithubIcon size={16} />
            GitHub
            <ExternalLink size={12} className="text-zinc-600" />
          </a>
          <a
            href={profile.social.cv}
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

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat: contact section content from profile"
```

---

## Task 13: Delete lib/data.ts and lib/types.ts

**Files:**
- Delete: `lib/data.ts`
- Delete: `lib/types.ts`

- [ ] **Step 1: Delete both files**

```bash
rm lib/data.ts lib/types.ts
```

- [ ] **Step 2: Verify no remaining imports**

```bash
grep -r "from '@/lib/data'" . --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v .next
grep -r "from '@/lib/types'" . --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v .next
```

Expected: no output (zero matches).

- [ ] **Step 3: TypeScript check — must be clean**

```bash
pnpm tsc --noEmit
```

Expected: no errors. If errors appear, a component still imports from `lib/` — fix it before committing.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove lib/data.ts and lib/types.ts — replaced by content layer"
```

---

## Done

At this point:
- All text in the portfolio is editable from `content/` files only
- No hardcoded strings remain in visual components (except structural UI labels like "LinkedIn", "GitHub", "Descargar CV" which are proper nouns / UI affordances)
- `lib/data.ts` and `lib/types.ts` are gone
- `pnpm tsc --noEmit` passes clean
