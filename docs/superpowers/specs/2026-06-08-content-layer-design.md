# Content Layer Integration — Design Spec

**Date:** 2026-06-08
**Project:** jonathanleivag personal portfolio
**Branch:** feature/structure

---

## Goal

Connect the existing `content/` files (profile.ts, projects.ts, case-studies.ts, skills.ts) to all UI components, eliminating all hardcoded text from visual components. Remove the now-redundant `lib/data.ts` and `lib/types.ts`.

---

## Current State

- `content/` files exist with real, rich content and their own TypeScript types
- UI components still import from `lib/data.ts` (placeholder data, different field names)
- Several components have hardcoded strings (Hero, About, Contact, Navbar, Footer, SectionHeaders)
- Type mismatches between `lib/types.ts` and `content/` types:
  - `content/projects.ts`: uses `summary` (not `problem`), no `id` field
  - `content/case-studies.ts`: uses `technicalDecisions` (not `decisions`), no `id` field
  - `content/skills.ts`: uses `title` (not `name`), adds `description` field

---

## Changes to `content/profile.ts`

Add four new fields to the existing `profile` object:

### `availability`
```ts
availability: 'Disponible para nuevos proyectos',
```

### `social`
```ts
social: {
  github: 'https://github.com/jonathanleivag',
  linkedin: 'https://linkedin.com/in/jonathanleivag',
  email: 'jonathan.leiva@movatec.cl',
  cv: '/cv.pdf',
},
```

### `about.highlights` (new array inside existing `about` object)
```ts
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
```

### `sections`
```ts
sections: {
  projects: {
    label: 'Proyectos',
    title: 'Proyectos destacados',
    subtitle: 'Soluciones construidas end-to-end con foco en impacto medible.',
  },
  caseStudies: {
    label: 'Casos de estudio',
    title: 'Decisiones técnicas en contexto',
    subtitle: 'No solo qué se construyó, sino por qué y cómo. Problemas reales, trade-offs reales.',
  },
  skills: {
    label: 'Stack técnico',
    title: 'Tecnologías que domino',
    subtitle: 'Herramientas que he usado en proyectos reales, no en tutoriales.',
  },
},
```

---

## Component Connection Map

### `app/layout.tsx`
- `metadata.title` ← `profile.metaTitle`
- `metadata.description` ← `profile.metaDescription`

### `components/layout/Navbar.tsx`
- Logo text ← `profile.name`

### `components/layout/Footer.tsx`
- Name ← `profile.name`
- Role ← `profile.role`
- GitHub href ← `profile.social.github`
- LinkedIn href ← `profile.social.linkedin`
- Email href ← `mailto:${profile.social.email}`

### `components/sections/Hero.tsx`
- Availability badge ← `profile.availability`
- `h1` role line ← `profile.role`
- Subtitle paragraph ← `profile.hero.subtitle`
- Primary CTA label ← `profile.hero.primaryCta`
- Secondary CTA label ← `profile.hero.secondaryCta`
- GitHub href ← `profile.social.github`
- LinkedIn href ← `profile.social.linkedin`
- Email href ← `mailto:${profile.social.email}`

### `components/sections/About.tsx`
- SectionHeader label ← `profile.about.title`
- SectionHeader subtitle ← `profile.about.summary`
- Highlight cards ← `profile.about.highlights` (icon mapping stays in component: Layers→Arquitectura, Lightbulb→Producto, Zap→Ejecución end-to-end)

### `components/sections/Projects.tsx`
- Import data ← `content/projects.ts`
- SectionHeader ← `profile.sections.projects`
- Key on `ProjectCard` ← `project.slug` (no `id` in new type)

### `components/sections/CaseStudies.tsx`
- Import data ← `content/case-studies.ts`
- SectionHeader ← `profile.sections.caseStudies`
- Key on article ← `cs.slug`
- Decisions list ← `cs.technicalDecisions` (renamed from `decisions`)

### `components/sections/Skills.tsx`
- Import data ← `content/skills.ts`
- SectionHeader ← `profile.sections.skills`
- Key on `SkillGroup` ← `category.title` (renamed from `name`)

### `components/sections/Contact.tsx`
- SectionHeader title ← `profile.contact.title`
- SectionHeader subtitle ← `profile.contact.description`
- Email value ← `profile.social.email`
- Copy button label ← `profile.contact.emailLabel`
- Copied feedback label ← `profile.contact.copiedLabel`
- LinkedIn href ← `profile.social.linkedin`
- GitHub href ← `profile.social.github`
- CV href ← `profile.social.cv`

### `components/ui/ProjectCard.tsx`
- Import type ← `import type { Project } from '@/content/projects'`
- Card body text ← `project.summary` (was `project.problem`)
- Key ← `project.slug` (upstream components pass `key`, card doesn't set it)

### `components/ui/SkillGroup.tsx`
- Import type ← `import type { SkillCategory } from '@/content/skills'`
- Category label ← `category.title` (was `category.name`)
- Add optional description line below title using `category.description`

---

## Files Deleted

| File | Reason |
|---|---|
| `lib/data.ts` | All data now lives in `content/` |
| `lib/types.ts` | Each `content/` file exports its own types; no shared type file needed |

---

## Files Not Touched

`content/projects.ts`, `content/case-studies.ts`, `content/skills.ts`, `components/ui/Terminal.tsx`, `components/ui/SectionHeader.tsx`, `components/ui/icons.tsx`, `app/page.tsx`, `app/projects/[slug]/page.tsx`

---

## Out of Scope

- Changing any visual design or layout
- Adding new sections or pages
- Internationalisation or multi-language support
- Dynamic/CMS-backed content (everything remains static TypeScript)
