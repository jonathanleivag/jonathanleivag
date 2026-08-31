# Portfolio Redesign — Design Spec

**Date:** 2026-08-31
**Project:** jonathanleivag personal portfolio
**Branch:** feature/newPortafolio
**Source prototype:** `docs/superpowers/specs/2026-08-31-portfolio-redesign-source.dc.html` (imported from Claude Design, project "Portafolio web fullstack", file `Portafolio Jonathan - sitio.dc.html`)

---

## Goal

Replace the current portfolio's visual design and information architecture with the new prototype: a monochrome, terminal/editorial aesthetic (dark green-black background, bone-white text, JetBrains Mono + Archivo typefaces, no accent color) with six real content areas — home, blog ("Notas"), post detail, case/project detail, about, contact.

## Source prototype format

The `.dc.html` file is authored in Claude Design's canvas format, not plain HTML:
- `<x-dc>` wraps the whole template; `<sc-if value="{{ expr }}">` is conditional rendering.
- `onClick="{{ handlerName }}"` binds to a method on the `<script data-dc-script>` logic class.
- The logic class (`class Component extends DCLogic`) holds a single `state = { screen, lang }` and exposes `renderVals()` producing `isHome/isBlog/isPost/isCase/isAbout/isContact` booleans and `goHome/goBlog/goPost/goCase/goAbout/goContact` handlers — a client-side SPA with no real URLs.
- The `lang` toggle (ES/EN pill in the nav) is **decorative only** — no text in the prototype actually branches on `isEn`. It must NOT be treated as a translation source; the project's existing next-intl setup is the real i18n mechanism.
- `support.js` is just the prototype's browser runtime (parses `<x-dc>`, resolves `{{ }}` expressions, renders via React). It has no bearing on the Next.js implementation and is not ported.

## Architecture decisions (confirmed with user)

1. **Blog scope:** Real Mongo-backed model + admin CRUD (matches the existing `Post`-less-but-`CaseStudy`/`Project`/`SkillCategory` pattern), not a static mock.
2. **Navigation:** Real Next.js routes, not the prototype's in-memory `screen` state. Every prototype "screen" maps to a real, indexable URL under `app/[locale]/`.
3. **Theme:** Full global replacement — `app/globals.css` tokens and `app/layout.tsx` fonts change for the whole site, not just the new pages.

## Screen → route mapping

| Prototype screen (`isX`) | Real route | Notes |
|---|---|---|
| `isHome` | `app/[locale]/page.tsx` | Rewritten: hero, stats, case studies, personal projects, blog preview, CTA |
| `isBlog` | `app/[locale]/blog/page.tsx` | New. Category filter via `?category=`, no pagination (7 seed posts; "cargar más" button dropped — YAGNI until post count grows) |
| `isPost` | `app/[locale]/blog/[slug]/page.tsx` | New |
| `isCase` | `app/[locale]/projects/[slug]/page.tsx` | **Already exists** — restyle only, data flow (case study vs. personal project) unchanged |
| `isAbout` | `app/[locale]/about/page.tsx` | New. Previously an anchor-scrolled home section (`components/sections/About.tsx`); becomes its own page combining profile summary + experience + skills |
| `isContact` | `app/[locale]/contact/page.tsx` | New. Reuses existing `ContactForm` |

Nav becomes 4 real links: Home (`/`) · Notas (`/blog`) · Sobre mí (`/about`) · Contacto (`/contact`), replacing the current 6 anchor-scroll links (`#hero #about #projects #case-studies #skills #contact`). `components/layout/Navbar.tsx` changes from `IntersectionObserver`-based anchor scroll-spy to `usePathname()`-based active-route highlighting.

## Data reuse — confirmed the prototype's sample content is the project's real content

Cross-checking the prototype text against `content/*.ts` and the Mongo models confirms these are **not placeholders** — reuse the real data layer, do not hardcode:

- "Casos seleccionados" (3 rows: Vue 2→3 migration, responsive interfaces, full-stack freelance) = `getPublicCaseStudies(locale)` from `lib/data/case-studies.ts`. Company names (MOVATEC SPA), stack, results all match `content/case-studies.ts` verbatim.
- "Proyectos personales" (4-card grid: Nintendo, Teslo Shop, Clima Go, Website Personal) = `getPublicPersonalProjects(locale)` from `lib/data/projects.ts`. Matches `content/personal-projects.ts` exactly, including domains and stacks. Use the real `project.image` (Cloudinary URL) instead of the prototype's "SCREENSHOT" placeholder box.
- "Sobre mí" experience table (MOVATEC SPA / ValpoSystems / Gatblac / Freelance) = `getPublicExperiences(locale)` from `lib/data/experience.ts`.
- "Sobre mí" stack técnico (Frontend / Backend / GraphQL & APIs / Mobile / Arquitectura / Formación) = `getPublicSkillCategories(locale)` from `lib/data/skills.ts` — `content/skills.ts` already has these exact 7 categories (includes "Producto y forma de trabajo", which the prototype omits — keep it, it's real data).
- Contact channels (email, LinkedIn, GitHub, CV download) = `getPublicProfile(locale).social`.
- Hero headline/subtitle = `getPublicProfile(locale).hero`.
- The 4 hero stat tiles ("6 Años en JavaScript", "2→3 Migración Vue liderada", "4 Equipos de producto", "TS Tipado en toda la base") have no backing model anywhere in the project — they are fixed CV facts, not admin-editable content. Hardcode them in the Hero markup (YAGNI: no model needed for 4 static numbers).

**"Notas" (blog) is the one section with no existing data** — every post title/date/category in the prototype is invented for the mockup. This is the new `Post` model's seed content (see Post content plan below).

## New model: `Post`

Follows the exact shape of `CaseStudy`/`Experience` (`localizedStringSchema` from `models/shared.ts`, `isPublished`/`order`/`timestamps`). Content is modeled as a **single localized long-form text field**, not a rich block editor — matches the project's existing pattern of `body: string[]` / `approach: LocalizedString[]` paragraph arrays, avoids building an MDX/rich-text pipeline that isn't otherwise justified (YAGNI).

Minimal markdown inside `content.es` / `content.en`:
- A line starting with `## ` is an `<h2>` heading (used to build the article's table of contents — the prototype's "En esta nota" aside).
- Any other non-empty line is a paragraph; blank lines separate paragraphs.
- No code blocks, no inline formatting — the one prototype article with a code sample (`types/product.ts`) is reproduced as a plain paragraph describing it, not a syntax-highlighted block (out of scope: no code-block UI exists anywhere else in the project either).

Fields: `slug, title, excerpt, content, category (enum: articulo|til|tutorial|snippet|caso), tags[], readingMinutes, isFeatured, isPublished, publishedAt, order`.

## Post seed content (`content/posts.ts`)

Ports the 7 posts visible in the prototype (1 featured + 6 in the "2026" list). Only the first has full body copy in the prototype (the "Migrar Vue 2 a Vue 3" article); the other 6 get concise, plausible 3-paragraph bodies written for this seed, matching their prototype titles/dates/categories/reading-times exactly. The admin can rewrite them later via the new `/admin/posts` CRUD.

## Theme tokens (`app/globals.css`, `app/layout.tsx`)

Replace the current zinc/emerald dark palette with the prototype's monochrome palette, defined as literal hex/rgba (not oklch approximations — exactness matters more than consistency with the rest of the token file's oklch style):

```
--background: #151a19       (was oklch(0.145 0 0), ~#0a0a0a)
--foreground: #e8e6dd        (was oklch(0.985 0 0), zinc-100)
--dc-muted:  #8a938e         (secondary text — was zinc-400/500)
--dc-border: rgba(232,230,221,.14)   (hairline borders — was white/5, white/10)
--dc-border-strong: rgba(232,230,221,.28)
--dc-surface: rgba(232,230,221,.045) (hover surface — was zinc-800/zinc-900)
```

Drop `--accent-emerald*` — the new design has no accent color (monochrome, weight/spacing driven). `--radius` tokens stay (shadcn/ui components aren't part of this redesign's scope; admin panel keeps its own literal zinc/emerald Tailwind classes untouched since it references them directly, not via CSS variables).

Fonts: replace `Geist`/`Geist_Mono` with `JetBrains_Mono` (body/default, weights 400/500/700) and `Archivo` (headings, weights 400/500/700/900), both via `next/font/google`. Repoint the existing `@theme inline` mapping (`--font-sans` → JetBrains Mono variable, `--font-heading` → Archivo variable) rather than introducing new Tailwind utility names — `font-sans` (used by `html`) and `font-heading` (already a utility, currently aliased to sans) keep working with new fonts underneath.

## Legacy cleanup

`components/sections/{Hero,About,Experience,Projects,CaseStudies,PersonalProjects,Skills,Contact}.tsx` and their now-unused UI dependents (`ProjectCard.tsx`, `PersonalProjectCard.tsx` if nothing else imports them after the rewrite) are deleted once the new pages replace every import site — the redesign's home/about/contact pages fully replace their responsibilities. `SectionHeader.tsx` and `ScrollReveal.tsx` are reused (generic, not tied to the old visual style).
