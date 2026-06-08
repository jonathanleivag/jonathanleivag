# Portfolio Base Structure — Design Spec

**Date:** 2026-06-08
**Project:** jonathanleivag personal portfolio
**Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, shadcn/ui, framer-motion

---

## Goal

Build the base structure of Jonathan Leiva's personal portfolio as a single-page landing with all main sections, component-based architecture, dark mode by default (emerald accent), mobile-first responsive design, and a foundation that supports future case study detail pages.

---

## Visual Direction

- **Mode:** Dark by default — `dark` class on `<html>`, no toggle in base version
- **Background:** `#0a0a0a` base, `#111111` card surfaces
- **Accent:** Emerald — `#10b981` (emerald-500) for CTAs, active states, highlights, borders
- **Text:** `#f9fafb` primary, `#6b7280` secondary/muted
- **Fonts:** Geist Sans (UI), Geist Mono (terminal block)
- **Style:** Minimal-technical, high contrast, generous whitespace

---

## Architecture

**Approach:** Component-based single page. `app/page.tsx` assembles all section components. Each section is a standalone file under `components/sections/`. A placeholder route `app/projects/[slug]/page.tsx` prepares the structure for future case study detail pages.

---

## File Structure

```
app/
  layout.tsx                    # update: metadata, dark class, lang="es"
  page.tsx                      # update: assemble all sections in order
  globals.css                   # update: emerald accent tokens, CSS vars
  projects/
    [slug]/
      page.tsx                  # create: placeholder case study detail page

components/
  layout/
    Navbar.tsx                  # sticky nav, scroll-aware bg, mobile drawer
    Footer.tsx                  # name, role, links, year
  sections/
    Hero.tsx                    # 2-col desktop, terminal block right
    About.tsx                   # summary paragraph + 3 highlight cards
    Projects.tsx                # grid of ProjectCard
    CaseStudies.tsx             # narrative cards (problem → impact)
    Skills.tsx                  # SkillGroup by category
    Contact.tsx                 # email copy, social links, CV download
  ui/
    ProjectCard.tsx             # reusable project card
    SkillGroup.tsx              # tech category with badge list
    SectionHeader.tsx           # consistent section title + optional subtitle
    Terminal.tsx                # animated CLI block for Hero

lib/
  data.ts                       # static placeholder content, typed arrays
  types.ts                      # TypeScript interfaces for all data shapes
```

---

## Components

### Navbar
- Sticky, `position: fixed` at top
- Background: transparent → `bg-black/80 backdrop-blur` on scroll (via `scroll` event or `IntersectionObserver`)
- Desktop: name/logo left, nav links center, CV button right
- Mobile: name/logo left, hamburger right → fullscreen drawer overlay
- Active section highlight via `IntersectionObserver` on each section
- Drawer closes on link click and on `Esc` key
- Nav order: Inicio · Proyectos · Stack · Contacto

### Hero
- Mobile: single column
- Desktop: two columns (`lg:grid-cols-2`)
- Left column: greeting label, name (`h1`), role, value proposition (2 lines), two CTAs (primary: "Ver proyectos", secondary: "Contactar"), quick links row (GitHub, LinkedIn icons)
- Right column: `Terminal` component
- `Terminal`: Geist Mono, dark terminal window chrome (traffic light dots), typed output showing `whoami → jonathan.leiva`, `skills --list → [stack lines]`, blinking cursor. Respects `prefers-reduced-motion` (no animation if reduced).

### About
- Section title via `SectionHeader`
- 3–4 line professional summary paragraph
- Row of 3 highlight cards (inline, no separate component): Arquitectura · Producto · Ejecución end-to-end
- Each card: icon (lucide-react), title, one-line description, emerald left border

### Projects
- Section title via `SectionHeader`
- Responsive grid: 1 col mobile → 2 col tablet → 3 col desktop
- Each `ProjectCard`: title, category tag, problem statement (1 line), stack badges (3–4), impact line, "Ver caso →" CTA
- Cards have hover: subtle elevation (`translate-y-[-2px]`), emerald border

### CaseStudies
- Section title via `SectionHeader`
- Larger cards, 1→2 col grid
- Structure visible on card: **Contexto** / **Decisiones técnicas** / **Resultado**
- Stack badges, links to demo/repo if available
- Visually distinct from Projects (taller cards, more narrative text)

### Skills
- Section title via `SectionHeader`
- 5 `SkillGroup` components: Frontend · Backend · Bases de datos · Cloud & DevOps · Tools
- Each group: category label + icon, list of tech badges
- Badge hover: subtle bg fill

### Contact
- Section title + closing message
- Email row: email text + "Copiar" button (copies to clipboard, shows "Copiado ✓" state for 2s)
- Button row: LinkedIn, GitHub, Descargar CV
- All external links open in new tab with `rel="noopener noreferrer"`

### Footer
- `<footer>` semantic element
- Name · Role · nav links · year
- Minimal, 1–2 lines

---

## Data Layer

`lib/types.ts` defines:
```ts
interface Project { id, title, category, problem, stack, impact, slug, links }
interface CaseStudy { id, title, context, decisions, result, stack, links }
interface SkillCategory { name, icon, skills: string[] }
```

`lib/data.ts` exports:
```ts
export const projects: Project[]       // 3 placeholder entries
export const caseStudies: CaseStudy[]  // 2 placeholder entries
export const skillCategories: SkillCategory[]  // 5 categories
```

Components import from `lib/data.ts` directly — no API calls, no dynamic fetching at this stage.

---

## Styling Conventions

- Tailwind v4 utility classes throughout — no custom CSS except CSS variables in `globals.css`
- `globals.css` updates: add `--color-accent: #10b981` and related emerald variants as CSS custom properties; set `dark` class on `:root` or handle via `layout.tsx`
- `cn()` from `lib/utils.ts` for conditional class merging
- `SectionHeader` ensures consistent `h2` hierarchy across all sections
- Section spacing: `py-20 md:py-32` on each section wrapper
- Max width: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`

---

## Accessibility

- Single `<h1>` in Hero
- Correct heading hierarchy: `h1` → `h2` (sections) → `h3` (cards)
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- All interactive elements keyboard-accessible with visible focus ring
- Mobile drawer: focus trap, `Esc` to close, scroll lock on body
- `prefers-reduced-motion`: Terminal animation disabled, framer-motion `useReducedMotion()` respected
- Min touch target: 44px on all buttons and links

---

## Responsive Breakpoints

Follows Tailwind defaults:
- `sm`: 640px (minor adjustments)
- `md`: 768px (2-col grids begin)
- `lg`: 1024px (Hero 2-col, desktop nav)
- `xl`: 1280px (max content width kicks in)

---

## Out of Scope (base version)

- Dark/light mode toggle (dark only for now)
- Contact form (email link only)
- Blog or articles section
- Animations beyond Terminal typing and hover states
- Real project data (placeholder content only)
- Case study detail page content (route scaffolded, content TBD)
