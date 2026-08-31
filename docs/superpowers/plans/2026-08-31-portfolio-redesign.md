# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's visual design and information architecture (home, blog, post, case/project detail, about, contact) with the prototype imported from Claude Design, backed by real Next.js routes and a new Mongo-backed `Post` model with admin CRUD.

**Architecture:** Six real routes under `app/[locale]/` (`/`, `/blog`, `/blog/[slug]`, `/projects/[slug]` (existing), `/about`, `/contact`) replace the current one-page-with-anchors layout. A new `Post` model follows the exact pattern of `CaseStudy`/`Experience` (`localizedStringSchema`, `isPublished`/`order`/`timestamps`), with admin CRUD following the `SkillCategory`/`Experience` API-route-plus-client-fetch pattern (not the older server-action pattern used by `Project`). The global theme (colors, fonts) is replaced site-wide via `app/globals.css` and `app/layout.tsx`; the admin panel is unaffected because it uses literal Tailwind classes, not the CSS variables being changed.

**Tech Stack:** Next.js 16 (App Router), TypeScript, next-intl 4, Mongoose 9, Tailwind CSS v4, next/font/google, framer-motion (existing `ScrollReveal`), zod, next-auth 5 (existing admin auth).

**Spec:** `docs/superpowers/specs/2026-08-31-portfolio-redesign-design.md` (and the raw prototype at `docs/superpowers/specs/2026-08-31-portfolio-redesign-source.dc.html`)

## Global Constraints

- Locales are always `['es', 'en']` with `localePrefix: 'always'` (`i18n/routing.ts`) — every new page must work under both `/es/...` and `/en/...`.
- Data-fetching functions follow the existing try/catch-with-static-fallback pattern (see `lib/data/case-studies.ts`): `await connectToDatabase()`, query, map through a `toPublic*` function using `getLocalizedField`, catch and fall back to a `content/*.ts` static array.
- Server Components are the default; add `'use client'` only where state/events are unavoidable (matches existing convention — see `components/layout/Navbar.tsx`, `components/ui/LanguageSwitcher.tsx`).
- Admin routes (`app/admin/**`, `components/admin/**`, `app/api/admin/**`, `auth.ts`, `lib/auth/*`) are protected by `assertAdmin()` (`lib/auth/admin.ts`) — every new admin API route must call it first and return its `response` on `!ok`.
- No test runner exists in this project (no Jest/Vitest, no `tests/` directory) — verification is `npx tsc --noEmit` (or `npm run build`), `npm run lint`, and manual browser checks against `npm run dev`. Do not introduce a new test framework as part of this plan (out of scope, not requested).
- Do not touch `app/admin/**` visual styling or its literal `bg-zinc-900`/`bg-emerald-500` classes — those aren't wired to the CSS variables this plan changes.
- New CSS colors are literal hex/rgba (not oklch) — exactness with the prototype matters more than stylistic consistency with the rest of the token file.

---

### Task 1: Global theme — fonts and color tokens

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: CSS custom properties `--background`, `--foreground`, `--dc-muted`, `--dc-border`, `--dc-border-strong`, `--dc-surface` (consumed by every component built in later tasks via `bg-[var(--dc-surface)]`-style arbitrary values); Tailwind utility `font-heading` now renders in Archivo; `html`'s default `font-sans` now renders in JetBrains Mono.

- [ ] **Step 1: Replace the font loaders and body background in `app/layout.tsx`**

```tsx
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
```

- [ ] **Step 2: Repoint the font mapping in `app/globals.css`**

Replace:
```css
  --font-sans: var(--font-sans);
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-sans);
```
with:
```css
  --font-sans: var(--font-jetbrains-mono);
  --font-mono: var(--font-jetbrains-mono);
  --font-heading: var(--font-archivo);
```

- [ ] **Step 3: Replace the `.dark` color tokens**

Replace the entire `.dark { ... }` block with:
```css
.dark {
  --background: #151a19;
  --foreground: #e8e6dd;
  --card: #1b211f;
  --card-foreground: #e8e6dd;
  --popover: #1b211f;
  --popover-foreground: #e8e6dd;
  --primary: #e8e6dd;
  --primary-foreground: #151a19;
  --secondary: #1b211f;
  --secondary-foreground: #e8e6dd;
  --muted: #1b211f;
  --muted-foreground: #8a938e;
  --accent: #1b211f;
  --accent-foreground: #e8e6dd;
  --destructive: oklch(0.704 0.191 22.216);
  --border: rgba(232, 230, 221, 0.14);
  --input: rgba(232, 230, 221, 0.14);
  --ring: rgba(232, 230, 221, 0.4);
  --dc-muted: #8a938e;
  --dc-border: rgba(232, 230, 221, 0.14);
  --dc-border-strong: rgba(232, 230, 221, 0.28);
  --dc-surface: rgba(232, 230, 221, 0.045);
}
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, open `http://localhost:3000/es`. Expected: page background is dark green-black, body text renders in a monospace face (JetBrains Mono — visually distinct from the previous Geist Sans/system-sans look), no console errors about missing font variables.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: replace portfolio theme tokens and fonts for redesign"
```

---

### Task 2: i18n messages for the new pages

**Files:**
- Modify: `messages/es.json`
- Modify: `messages/en.json`

**Interfaces:**
- Produces: namespaces `nav` (now `home/about/blog/contact/cv` only), `hero` (extended with 4 stat fields + `terminalLine`/`availability`), `home` (new), `blogPage` (new), `postPage` (new), `aboutPage` (new), `contactPage` (new) — consumed by `getTranslations`/`useTranslations` calls in Tasks 8–15.

- [ ] **Step 1: Update `messages/es.json`**

Replace the `"nav"` block:
```json
  "nav": {
    "home": "Inicio",
    "about": "Sobre mí",
    "blog": "Notas",
    "contact": "Contacto",
    "cv": "CV"
  },
```

Replace the `"hero"` block:
```json
  "hero": {
    "eyebrow": "Disponible para nuevos proyectos",
    "terminalLine": "cat perfil.md",
    "headline": "Desarrollo productos web con foco en escalabilidad, rendimiento y mantenibilidad.",
    "subtitle": "Soy Desarrollador Full Stack Senior especializado en JavaScript, Vue.js, React, React Native, Express.js y GraphQL. Trabajo en interfaces modernas, componentes reutilizables, migraciones frontend y soluciones digitales orientadas a resultados.",
    "primaryCta": "Ver proyectos",
    "secondaryCta": "Contactar",
    "availability": "Disponible para nuevos proyectos",
    "stat1Value": "6",
    "stat1Label": "Años en JavaScript",
    "stat2Value": "2→3",
    "stat2Label": "Migración Vue liderada",
    "stat3Value": "4",
    "stat3Label": "Equipos de producto",
    "stat4Value": "TS",
    "stat4Label": "Tipado en toda la base"
  },
```

Add these new top-level namespaces right after `"experience"` (before `"contactForm"`):
```json
  "home": {
    "caseStudiesLabel": "// Casos seleccionados",
    "personalProjectsLabel": "// Proyectos personales",
    "notesLabel": "Notas",
    "seeAllNotes": "Ver todas →",
    "ctaTitle": "¿Necesitas construir, modernizar o escalar tu producto?",
    "ctaButton": "Hablemos →"
  },
  "blogPage": {
    "eyebrow": "// Notas",
    "heading": "Lo que aprendo, lo que rompo y lo que decido documentar.",
    "subtitle": "Artículos técnicos, notas cortas, tutoriales y snippets sobre Vue, React, TypeScript, GraphQL y arquitectura frontend.",
    "filterAll": "Todo",
    "categoryArticulo": "Artículo",
    "categoryTil": "TIL",
    "categoryTutorial": "Tutorial",
    "categorySnippet": "Snippet",
    "categoryCaso": "Caso",
    "featuredBadge": "Destacado",
    "minutesSuffix": "MIN"
  },
  "postPage": {
    "backToBlog": "← Volver a notas",
    "tocLabel": "En esta nota",
    "shareLabel": "Compartir",
    "previous": "← Anterior",
    "next": "Siguiente →"
  },
  "aboutPage": {
    "eyebrow": "// Sobre mí",
    "heading": "Desarrollo interfaces y soluciones orientadas a resultados.",
    "dataLabel": "Datos",
    "experienceLabel": "// Experiencia laboral",
    "stackLabel": "// Stack técnico",
    "currentBadge": "ACTUAL",
    "languages": "Español nativo · inglés técnico"
  },
  "contactPage": {
    "eyebrow": "// Contacto",
    "heading": "¿Necesitas un desarrollador senior para construir, modernizar o escalar tu producto?",
    "subtitle": "Puedo aportar en desarrollo full stack, migraciones frontend, arquitectura de componentes, Vue.js, React, TypeScript, Express.js, GraphQL y soluciones JavaScript orientadas a resultados.",
    "directChannels": "Canales directos",
    "emailChannel": "Email",
    "linkedinChannel": "LinkedIn",
    "githubChannel": "GitHub",
    "cvChannel": "Currículum",
    "downloadCv": "Descargar CV.PDF",
    "responseTime": "Respondo en un plazo de 24 a 48 horas hábiles.",
    "availability": "Disponible para nuevos proyectos"
  },
```

- [ ] **Step 2: Update `messages/en.json`** (mirror structure)

Replace the `"nav"` block:
```json
  "nav": {
    "home": "Home",
    "about": "About",
    "blog": "Notes",
    "contact": "Contact",
    "cv": "Resume"
  },
```

Replace the `"hero"` block:
```json
  "hero": {
    "eyebrow": "Available for new projects",
    "terminalLine": "cat profile.md",
    "headline": "I build web products focused on scalability, performance, and maintainability.",
    "subtitle": "I am a Senior Full Stack Developer specialized in JavaScript, Vue.js, React, React Native, Express.js, and GraphQL. I work on modern interfaces, reusable components, frontend migrations, and results-driven digital solutions.",
    "primaryCta": "View projects",
    "secondaryCta": "Contact me",
    "availability": "Available for new projects",
    "stat1Value": "6",
    "stat1Label": "Years in JavaScript",
    "stat2Value": "2→3",
    "stat2Label": "Vue migration led",
    "stat3Value": "4",
    "stat3Label": "Product teams",
    "stat4Value": "TS",
    "stat4Label": "Typed across the codebase"
  },
```

Add these new namespaces after `"experience"` (before `"contactForm"`):
```json
  "home": {
    "caseStudiesLabel": "// Selected cases",
    "personalProjectsLabel": "// Personal projects",
    "notesLabel": "Notes",
    "seeAllNotes": "See all →",
    "ctaTitle": "Need to build, modernize, or scale your product?",
    "ctaButton": "Let's talk →"
  },
  "blogPage": {
    "eyebrow": "// Notes",
    "heading": "What I learn, what I break, and what I decide to document.",
    "subtitle": "Technical articles, short notes, tutorials, and snippets about Vue, React, TypeScript, GraphQL, and frontend architecture.",
    "filterAll": "All",
    "categoryArticulo": "Article",
    "categoryTil": "TIL",
    "categoryTutorial": "Tutorial",
    "categorySnippet": "Snippet",
    "categoryCaso": "Case",
    "featuredBadge": "Featured",
    "minutesSuffix": "MIN"
  },
  "postPage": {
    "backToBlog": "← Back to notes",
    "tocLabel": "In this note",
    "shareLabel": "Share",
    "previous": "← Previous",
    "next": "Next →"
  },
  "aboutPage": {
    "eyebrow": "// About me",
    "heading": "I build interfaces and results-driven solutions.",
    "dataLabel": "Details",
    "experienceLabel": "// Work experience",
    "stackLabel": "// Tech stack",
    "currentBadge": "CURRENT",
    "languages": "Native Spanish · technical English"
  },
  "contactPage": {
    "eyebrow": "// Contact",
    "heading": "Need a senior developer to build, modernize, or scale your product?",
    "subtitle": "I can contribute in full stack development, frontend migrations, component architecture, Vue.js, React, TypeScript, Express.js, GraphQL, and results-driven JavaScript solutions.",
    "directChannels": "Direct channels",
    "emailChannel": "Email",
    "linkedinChannel": "LinkedIn",
    "githubChannel": "GitHub",
    "cvChannel": "Resume",
    "downloadCv": "Download Resume.PDF",
    "responseTime": "I respond within 24 to 48 business hours.",
    "availability": "Available for new projects"
  },
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`. Expected: no errors (JSON changes don't affect TS directly, but this catches any accidental syntax issue if messages are typed via `next-intl`'s global message typing — if the project doesn't use that, this step just confirms the rest of the build still type-checks). Also run `node -e "JSON.parse(require('fs').readFileSync('messages/es.json','utf8')); JSON.parse(require('fs').readFileSync('messages/en.json','utf8')); console.log('valid json')"` to confirm both files still parse.

- [ ] **Step 4: Commit**

```bash
git add messages/es.json messages/en.json
git commit -m "feat: add i18n messages for redesigned home, blog, about, and contact pages"
```

---

### Task 3: `Post` model, content parser, and data layer

**Files:**
- Create: `models/Post.ts`
- Create: `lib/posts/parseContent.ts`
- Create: `lib/data/posts.ts`
- Create: `content/posts.ts`

**Interfaces:**
- Produces: `Post` mongoose model; `parsePostContent(raw: string): PostBlock[]` where `PostBlock = { type: 'heading' | 'paragraph', text: string, id?: string }`; `getPublicPosts(locale): Promise<PublicPost[]>`, `getPublicPostBySlug(locale, slug): Promise<PublicPost | null>`, `getPublicPostSlugs(): Promise<string[]>`, `getAdjacentPosts(locale, slug): Promise<{ previous: PublicPost | null; next: PublicPost | null }>` where `PublicPost = { slug, title, excerpt, content, category, tags: string[], readingMinutes, isFeatured, publishedAt: string }`.
- Consumes: `connectToDatabase` (`@/lib/mongodb`), `getLocalizedField` (`@/lib/data/profile`), `localizedStringSchema` (`./shared`), `Locale` (`@/i18n/routing`).

- [ ] **Step 1: Create the model**

`models/Post.ts`:
```ts
import { Schema, model, models } from 'mongoose'
import { localizedStringSchema } from './shared'

const postSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: localizedStringSchema, required: true },
    excerpt: { type: localizedStringSchema, required: true },
    content: { type: localizedStringSchema, required: true },
    category: { type: String, enum: ['articulo', 'til', 'tutorial', 'snippet', 'caso'], required: true },
    tags: [{ type: String }],
    readingMinutes: { type: Number, default: 5 },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

postSchema.index({ isPublished: 1, order: 1 })

export const Post = models.Post || model('Post', postSchema)
```

- [ ] **Step 2: Create the content parser**

`lib/posts/parseContent.ts`:
```ts
export interface PostBlock {
  type: 'heading' | 'paragraph'
  text: string
  id?: string
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function parsePostContent(raw: string): PostBlock[] {
  return raw
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith('## ')) {
        const text = chunk.slice(3).trim()
        return { type: 'heading' as const, text, id: slugifyHeading(text) }
      }
      return { type: 'paragraph' as const, text: chunk.replace(/\n/g, ' ') }
    })
}
```

- [ ] **Step 3: Create the static seed content**

`content/posts.ts`:
```ts
export type Post = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: 'articulo' | 'til' | 'tutorial' | 'snippet' | 'caso'
  tags: string[]
  readingMinutes: number
  isFeatured: boolean
  publishedAt: string
}

export const posts: Post[] = [
  {
    slug: 'migrar-vue-2-a-vue-3-sin-congelar-el-roadmap',
    title: 'Migrar Vue 2 a Vue 3 sin congelar el roadmap',
    excerpt: 'Cómo dividir una migración progresiva en pasos entregables: compilación dual, capa de compatibilidad, tipado incremental y el orden en que conviene mover los componentes.',
    content: `La pregunta que aparece primero no es técnica: si el producto tiene entregas cada dos semanas, ¿cuándo se hace la migración? La respuesta que funcionó fue no reservar un período para migrar, sino convertir la migración en una serie de cambios que caben dentro de un sprint normal.

## Congelar la superficie antes de mover el motor

Antes de tocar dependencias conviene dejar de crecer en las zonas que van a cambiar. En la práctica: prohibir nuevos usos de la API de opciones en componentes nuevos, y escribir todo lo nuevo con la Composition API, que ya existe en Vue 2.7. El código nuevo nace migrado.

## Tipado antes de la versión

TypeScript no requiere Vue 3, y meterlo primero convierte errores de migración en errores de compilación. El orden importa: primero los modelos de dominio y las respuestas de API, después los componentes. Tipar la capa de datos es lo que hace visible qué componentes dependen de qué — por ejemplo, definir una interfaz Product con id, sku, price y stock antes de tocar un solo componente que la consuma.

## Un componente, un pull request

Los cambios grandes se revisan mal. Migrar de a un componente por PR hace que cada cambio sea reversible y que la revisión sea real. El costo es que la migración dura más en el calendario; el beneficio es que nunca hay una semana en que el producto no se puede desplegar. Una migración progresiva no se mide por porcentaje migrado, sino por cuántos días el equipo no pudo desplegar.

## CSS modular como frontera

Vuetify cambia de versión junto con Vue, y los estilos globales son lo que más duele. Mover el estilo a módulos por componente antes de la migración reduce el problema a un componente a la vez, en lugar de una hoja de estilos compartida que rompe todo junto.

El resultado de este orden no fue una migración más rápida, sino una migración que nunca bloqueó al equipo. Es la diferencia entre un proyecto que se puede pausar y uno que hay que terminar a la fuerza.`,
    category: 'articulo',
    tags: ['Vue 3', 'TypeScript', 'Vuetify', 'Migración'],
    readingMinutes: 9,
    isFeatured: true,
    publishedAt: '2026-08-14',
  },
  {
    slug: 'definemodel-y-el-fin-de-los-props-espejo',
    title: 'defineModel() y el fin de los props espejo',
    excerpt: 'defineModel() reemplaza el patrón modelValue + emit(\'update:modelValue\') por una sola declaración reactiva, sin perder el contrato explícito entre padre e hijo.',
    content: `Antes de Vue 3.4, un componente con v-model necesitaba declarar una prop modelValue y emitir un evento update:modelValue manualmente. Era un patrón mecánico, repetido en cada componente de formulario, y fácil de romper si se olvidaba el emit.

## Qué cambia en la práctica

defineModel() colapsa ambos lados en una sola declaración: const model = defineModel(); leer model.value lee la prop, escribir model.value emite el evento. El componente padre sigue usando v-model="valor" exactamente igual — el cambio es puramente interno.

Vale la pena migrarlo componente por componente, no de una vez: el patrón antiguo y defineModel() conviven sin problema en la misma base de código mientras dura la transición.`,
    category: 'til',
    tags: ['Vue 3', 'Composition API'],
    readingMinutes: 2,
    isFeatured: false,
    publishedAt: '2026-07-30',
  },
  {
    slug: 'cache-de-queries-apollo-que-no-miente',
    title: 'Caché de queries Apollo que no miente',
    excerpt: 'Configurar fetchPolicy y typePolicies para que el caché de Apollo Client refresque cuando el dato realmente cambió, sin forzar network-only en todas partes.',
    content: `El caché por defecto de Apollo Client normaliza por id, pero cuando un mismo tipo aparece en dos queries distintas con selección de campos distinta, es fácil terminar mostrando datos parcialmente viejos sin que ningún error lo avise.

## El fetchPolicy correcto por caso de uso

cache-first sirve para listados que no cambian seguido. cache-and-network sirve para pantallas donde el usuario espera ver algo de inmediato pero también el dato más fresco apenas llega. network-only debería ser la excepción, no la regla — usarlo en todas partes es renunciar al caché en vez de configurarlo.

## typePolicies para campos derivados

Cuando un campo se calcula en el cliente (por ejemplo, un total derivado de una lista), declararlo en typePolicies con una función read evita que quede desincronizado del resto del caché normalizado.`,
    category: 'snippet',
    tags: ['GraphQL', 'Apollo', 'Cache'],
    readingMinutes: 4,
    isFeatured: false,
    publishedAt: '2026-07-02',
  },
  {
    slug: 'css-modular-en-vuetify-sin-pelear-con-el-framework',
    title: 'CSS modular en Vuetify sin pelear con el framework',
    excerpt: 'Cómo introducir CSS Modules en un proyecto Vuetify sin duplicar el sistema de diseño ni perder los estados hover/focus que el framework ya resuelve.',
    content: `Vuetify trae su propio sistema de clases utilitarias y componentes con estilos internos vía scoped CSS. Meter CSS Modules encima sin criterio termina en dos sistemas de diseño compitiendo por la misma pantalla.

## Dónde sí conviene CSS Modules

Para el layout propio de cada vista — grillas, espaciados entre secciones, breakpoints específicos del producto — CSS Modules da nombres de clase únicos sin colisión, y es más fácil de razonar que sobrescribir clases internas de Vuetify con !important.

## Dónde no conviene

Los estados interactivos de los componentes Vuetify (hover, focus, disabled, ripple) ya están resueltos por el framework. Reimplementarlos en un módulo CSS aparte duplica lógica y se desincroniza en la próxima actualización de versión. La regla práctica: CSS Modules para layout propio, props y slots de Vuetify para todo lo que el componente ya sabe hacer.`,
    category: 'tutorial',
    tags: ['Vuetify', 'CSS Modules'],
    readingMinutes: 12,
    isFeatured: false,
    publishedAt: '2026-06-11',
  },
  {
    slug: 'componentes-reutilizables-cuando-extraer-y-cuando-duplicar',
    title: 'Componentes reutilizables: cuándo extraer y cuándo duplicar',
    excerpt: 'La regla de las tres apariciones no siempre aplica: a veces duplicar dos componentes parecidos es más barato que mantener una abstracción con demasiadas ramas condicionales.',
    content: `Extraer un componente compartido demasiado pronto suele terminar en un componente con cinco props booleanas controlando ramas de renderizado distintas — más difícil de leer que los dos componentes separados que reemplazó.

## La señal real no es la repetición, es el acoplamiento

Dos componentes que se ven parecidos hoy pero cuyo propósito de negocio es distinto (por ejemplo, una card de proyecto y una card de artículo) van a divergir con el tiempo. Compartirlos ata su evolución innecesariamente. La pregunta que importa no es "¿se ven igual?" sino "¿van a cambiar juntos o por separado?".

## Cuándo sí extraer

Cuando la lógica compartida es realmente estructural — el layout de un formulario, el comportamiento de un modal, un patrón de carga/error/vacío — y no solo apariencia visual coincidente. Ahí un componente compartido reduce mantenimiento real en vez de solo reducir líneas de código.`,
    category: 'articulo',
    tags: ['Component Architecture'],
    readingMinutes: 7,
    isFeatured: false,
    publishedAt: '2026-05-28',
  },
  {
    slug: 'tipar-respuestas-de-graphql-sin-duplicar-interfaces',
    title: 'Tipar respuestas de GraphQL sin duplicar interfaces',
    excerpt: 'Generar tipos TypeScript directamente desde el schema y las queries de GraphQL evita mantener a mano interfaces que ya describe el propio schema.',
    content: `Escribir a mano una interfaz TypeScript para cada respuesta de GraphQL duplica información que ya vive en el schema — cualquier cambio en el backend obliga a actualizar el tipo manualmente, y es fácil que se desincronicen sin que nadie lo note hasta producción.

## Generar en vez de escribir

Herramientas como GraphQL Code Generator leen el schema y las queries del proyecto y generan los tipos exactos que esa query va a devolver, incluyendo null en los campos que el schema marca como opcionales. El tipo deja de ser una promesa manual y pasa a ser un reflejo directo del contrato real.

El costo es agregar un paso de generación al flujo de desarrollo; el beneficio es que un cambio de schema que rompe un componente se detecta en tiempo de compilación, no en producción.`,
    category: 'til',
    tags: ['GraphQL', 'TypeScript'],
    readingMinutes: 3,
    isFeatured: false,
    publishedAt: '2026-04-14',
  },
  {
    slug: 'un-backend-expressjs-que-sobrevivio-tres-frontends',
    title: 'Un backend Express.js que sobrevivió tres frontends',
    excerpt: 'Un servicio Express.js diseñado alrededor de contratos GraphQL estables terminó sirviendo, sin cambios, a un frontend Vue, uno React y una app React Native.',
    content: `El proyecto empezó como un backend Express.js con Apollo Server para un único frontend Vue. El diseño desde el principio fue no filtrar detalles de presentación en el schema GraphQL — ningún tipo ni resolver asumía cómo se iba a renderizar el dato.

## Por qué sobrevivió a los cambios de frontend

Cuando el mismo negocio necesitó una segunda interfaz en React y después una app en React Native, ninguno de los dos requirió cambios en el backend. El schema ya exponía datos como conceptos de dominio (un producto, un pedido, un usuario) en vez de como estructuras convenientes para una pantalla específica.

## La lección que queda

Un backend que conoce demasiado sobre cómo un frontend particular va a mostrar el dato es un backend que va a necesitar reescribirse cuando cambie el frontend. Modelar el schema alrededor del dominio, no de la pantalla, es lo que permite que un mismo servicio sirva a varios clientes sin fricción.`,
    category: 'caso',
    tags: ['Express.js', 'GraphQL', 'Architecture'],
    readingMinutes: 10,
    isFeatured: false,
    publishedAt: '2026-03-02',
  },
]
```

- [ ] **Step 4: Create the data layer**

`lib/data/posts.ts`:
```ts
import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'
import type { Locale } from '@/i18n/routing'
import { getLocalizedField } from './profile'
import { posts as staticPosts } from '@/content/posts'

export type PublicPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: 'articulo' | 'til' | 'tutorial' | 'snippet' | 'caso'
  tags: string[]
  readingMinutes: number
  isFeatured: boolean
  publishedAt: string
}

type MongoPost = Record<string, unknown>

function toPublicPost(doc: MongoPost, locale: Locale): PublicPost {
  const gl = (field: unknown) =>
    getLocalizedField(field as { es: string; en: string } | null, locale)

  const publishedAt = doc.publishedAt as Date | string | undefined
  return {
    slug: doc.slug as string,
    title: gl(doc.title) || (doc.slug as string),
    excerpt: gl(doc.excerpt) || '',
    content: gl(doc.content) || '',
    category: (doc.category as PublicPost['category']) || 'articulo',
    tags: (doc.tags as string[]) || [],
    readingMinutes: (doc.readingMinutes as number) || 5,
    isFeatured: Boolean(doc.isFeatured),
    publishedAt: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
  }
}

// The static fallback (content/posts.ts) has no per-locale variant — it's single-language
// seed content, unlike the Mongo documents it stands in for. `locale` is intentionally not
// a parameter here.
function staticToPublic(): PublicPost[] {
  return staticPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    tags: p.tags,
    readingMinutes: p.readingMinutes,
    isFeatured: p.isFeatured,
    publishedAt: new Date(p.publishedAt).toISOString(),
  }))
}

export async function getPublicPosts(locale: Locale): Promise<PublicPost[]> {
  try {
    await connectToDatabase()
    const docs = await Post.find({ isPublished: true }).sort({ publishedAt: -1 }).lean()
    if (!docs.length) return staticToPublic()
    return docs.map((d) => toPublicPost(d as MongoPost, locale))
  } catch {
    return staticToPublic()
  }
}

export async function getPublicPostBySlug(locale: Locale, slug: string): Promise<PublicPost | null> {
  try {
    await connectToDatabase()
    const doc = await Post.findOne({ slug, isPublished: true }).lean()
    if (!doc) {
      return staticToPublic().find((p) => p.slug === slug) ?? null
    }
    return toPublicPost(doc as MongoPost, locale)
  } catch {
    return staticToPublic().find((p) => p.slug === slug) ?? null
  }
}

export async function getPublicPostSlugs(): Promise<string[]> {
  try {
    await connectToDatabase()
    const docs = await Post.find({ isPublished: true }, { slug: 1 }).lean()
    if (!docs.length) return staticPosts.map((p) => p.slug)
    return docs.map((d) => (d as MongoPost).slug as string)
  } catch {
    return staticPosts.map((p) => p.slug)
  }
}

export async function getAdjacentPosts(
  locale: Locale,
  slug: string
): Promise<{ previous: PublicPost | null; next: PublicPost | null }> {
  const all = await getPublicPosts(locale)
  const index = all.findIndex((p) => p.slug === slug)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: index < all.length - 1 ? all[index + 1] : null,
    next: index > 0 ? all[index - 1] : null,
  }
}
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit`. Expected: no type errors. This exercises the new files' types against the rest of the codebase (`Locale`, `getLocalizedField`) without needing a database connection (the try/catch falls back to `content/posts.ts` when `MONGODB_URI` queries fail, same as every other `lib/data/*.ts` file).

- [ ] **Step 6: Commit**

```bash
git add models/Post.ts lib/posts/parseContent.ts lib/data/posts.ts content/posts.ts
git commit -m "feat: add Post model, content parser, and data layer with seed content"
```

---

### Task 4: Seed script — load posts into MongoDB

**Files:**
- Modify: `scripts/seed-mongodb.ts`

**Interfaces:**
- Consumes: `posts` from `@/content/posts` (Task 3).

- [ ] **Step 1: Add the Post import and seeding block**

Add near the top, alongside the other content imports:
```ts
import { posts } from '../content/posts'
```

Add a `PostModel` definition alongside the other inline models (after `CaseStudyModel`):
```ts
  const PostModel = mongoose.models.Post || mongoose.model('Post', new mongoose.Schema({
    slug: { type: String, unique: true, index: true },
    title: Object, excerpt: Object, content: Object,
    category: String, tags: [String], readingMinutes: Number,
    isFeatured: Boolean, isPublished: Boolean, publishedAt: Date, order: Number,
  }, { timestamps: true }))
```

Add a seeding loop right before `await mongoose.disconnect()`:
```ts
  // Posts
  for (const [i, p] of posts.entries()) {
    await PostModel.findOneAndUpdate(
      { slug: p.slug },
      {
        slug: p.slug,
        title: { es: p.title, en: p.title },
        excerpt: { es: p.excerpt, en: p.excerpt },
        content: { es: p.content, en: p.content },
        category: p.category,
        tags: p.tags,
        readingMinutes: p.readingMinutes,
        isFeatured: p.isFeatured,
        isPublished: true,
        publishedAt: new Date(p.publishedAt),
        order: i,
      },
      { upsert: true, new: true }
    )
  }
  console.log(`✓ ${posts.length} posts seeded`)
```

- [ ] **Step 2: Verify**

Run: `npm run db:seed`. Expected: output includes `✓ 7 posts seeded` alongside the existing profile/projects/skills/case-studies/experience lines, with no errors. (Requires `MONGODB_URI` to be set — use the project's existing `.env.local`.)

- [ ] **Step 3: Commit**

```bash
git add scripts/seed-mongodb.ts
git commit -m "feat: seed Post collection in seed-mongodb script"
```

---

### Task 5: Admin API routes for posts

**Files:**
- Create: `app/api/admin/posts/route.ts`
- Create: `app/api/admin/posts/[id]/route.ts`

**Interfaces:**
- Consumes: `assertAdmin` (`@/lib/auth/admin`), `connectToDatabase` (`@/lib/mongodb`), `Post` (`@/models/Post`, Task 3).
- Produces: `GET /api/admin/posts` (list all, any publish state), `POST /api/admin/posts` (create), `PUT /api/admin/posts/:id` (partial update), `DELETE /api/admin/posts/:id` (delete) — mirrors the exact shape of `app/api/admin/skills/route.ts` and `app/api/admin/experience/[id]/route.ts`.

- [ ] **Step 1: Create the list/create route**

`app/api/admin/posts/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/auth/admin'
import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'

export async function GET() {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  await connectToDatabase()
  const docs = await Post.find().sort({ order: 1 }).lean()
  const safe = docs.map((d) => ({
    ...JSON.parse(JSON.stringify(d)),
    _id: d._id.toString(),
  }))
  return NextResponse.json(safe)
}

export async function POST(request: NextRequest) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  const body = await request.json()
  await connectToDatabase()
  const doc = await Post.create(body)
  return NextResponse.json({ ...JSON.parse(JSON.stringify(doc)), _id: doc._id.toString() })
}
```

- [ ] **Step 2: Create the update/delete route**

`app/api/admin/posts/[id]/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/auth/admin'
import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  const { id } = await params
  const body = await request.json()

  await connectToDatabase()
  await Post.findByIdAndUpdate(id, body)

  return NextResponse.json({ ok: true })
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await assertAdmin()
  if (!admin.ok) return admin.response

  const { id } = await params
  await connectToDatabase()
  await Post.findByIdAndDelete(id)

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`. Expected: no type errors. Manually verify with `npm run dev`, sign in at `/admin/login`, then `curl -i http://localhost:3000/api/admin/posts` from a browser devtools fetch (or just navigate to `/admin/posts` once Task 6 exists) — expect `401` when logged out, `200 []` when logged in with no posts yet.

- [ ] **Step 4: Commit**

```bash
git add app/api/admin/posts/route.ts "app/api/admin/posts/[id]/route.ts"
git commit -m "feat: add admin API routes for posts CRUD"
```

---

### Task 6: Admin UI page for posts

**Files:**
- Create: `app/admin/(protected)/posts/page.tsx`
- Modify: `components/admin/AdminSidebar.tsx`

**Interfaces:**
- Consumes: `/api/admin/posts` and `/api/admin/posts/:id` (Task 5).

- [ ] **Step 1: Add the sidebar link**

In `components/admin/AdminSidebar.tsx`, add a `Notas` entry to the `NAV` array, right after `Proyectos`:
```ts
const NAV = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Perfil', href: '/admin/profile' },
  { label: 'Proyectos', href: '/admin/projects' },
  { label: 'Notas', href: '/admin/posts' },
  { label: 'Skills', href: '/admin/skills' },
  { label: 'Experiencia', href: '/admin/experience' },
  { label: 'CV', href: '/admin/cv' },
]
```

- [ ] **Step 2: Create the admin posts page**

`app/admin/(protected)/posts/page.tsx`:
```tsx
'use client'

import { useEffect, useState, useTransition } from 'react'

interface PostItem {
  _id: string
  slug: string
  title: { es: string; en: string }
  excerpt: { es: string; en: string }
  content: { es: string; en: string }
  category: 'articulo' | 'til' | 'tutorial' | 'snippet' | 'caso'
  tags: string[]
  readingMinutes: number
  isFeatured: boolean
  isPublished: boolean
  order: number
}

const CATEGORIES = ['articulo', 'til', 'tutorial', 'snippet', 'caso'] as const

const emptyForm = (): Omit<PostItem, '_id'> => ({
  slug: '',
  title: { es: '', en: '' },
  excerpt: { es: '', en: '' },
  content: { es: '', en: '' },
  category: 'articulo',
  tags: [],
  readingMinutes: 5,
  isFeatured: false,
  isPublished: true,
  order: 0,
})

export default function AdminPostsPage() {
  const [items, setItems] = useState<PostItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | 'new' | null>(null)
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const notify = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(''), 3000) }

  useEffect(() => {
    fetch('/api/admin/posts').then((r) => r.json()).then((data) => { setItems(data); setLoading(false) })
  }, [])

  const save = async (data: Partial<PostItem> & { _id?: string }) => {
    startTransition(async () => {
      if (data._id) {
        await fetch(`/api/admin/posts/${data._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        setItems((prev) => prev.map((i) => i._id === data._id ? { ...i, ...data } as PostItem : i))
        notify('Guardado ✓')
      } else {
        const res = await fetch('/api/admin/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        const created = await res.json()
        setItems((prev) => [...prev, created])
        notify('Creado ✓')
      }
      setEditingId(null)
    })
  }

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar esta nota?')) return
    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
    setItems((prev) => prev.filter((i) => i._id !== id))
    notify('Eliminada ✓')
  }

  const toggle = async (id: string, current: boolean) => {
    await fetch(`/api/admin/posts/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isPublished: !current }) })
    setItems((prev) => prev.map((i) => i._id === id ? { ...i, isPublished: !current } : i))
  }

  if (loading) return <div className="text-zinc-500 text-sm">Cargando...</div>

  const editing = editingId === 'new' ? null : items.find((i) => i._id === editingId)

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Notas</h1>
          <p className="text-sm text-zinc-500 mt-1">{items.length} notas</p>
        </div>
        <div className="flex items-center gap-3">
          {message && <span className="text-sm text-emerald-400">{message}</span>}
          {!editingId && (
            <button onClick={() => setEditingId('new')} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-colors">
              + Nueva nota
            </button>
          )}
        </div>
      </div>

      {editingId && (
        <PostForm
          initial={editing ?? emptyForm()}
          onSave={(data) => save(editingId === 'new' ? data : { ...data, _id: editingId })}
          onCancel={() => setEditingId(null)}
          isPending={isPending}
        />
      )}

      {!editingId && (
        <div className="space-y-3">
          {items.map((post) => (
            <div key={post._id} className="bg-zinc-900 border border-white/5 rounded-xl px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${post.isPublished ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                    <p className="text-sm font-medium text-zinc-100">{post.title.es}</p>
                    {post.isFeatured && <span className="text-xs text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">Destacado</span>}
                  </div>
                  <p className="text-xs text-zinc-500 ml-4">{post.category} · {post.slug} · {post.readingMinutes} min</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggle(post._id, post.isPublished)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${post.isPublished ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-white/10 text-zinc-500 hover:text-zinc-300'}`}>
                    {post.isPublished ? 'Publicado' : 'Oculto'}
                  </button>
                  <button onClick={() => setEditingId(post._id)} className="text-xs border border-white/10 text-zinc-400 hover:text-zinc-100 px-3 py-1.5 rounded-lg transition-colors">
                    Editar
                  </button>
                  <button onClick={() => remove(post._id)} className="text-xs text-red-500 hover:text-red-400 transition-colors px-1">
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PostForm({ initial, onSave, onCancel, isPending }: {
  initial: Omit<PostItem, '_id'> | PostItem
  onSave: (data: Omit<PostItem, '_id'>) => void
  onCancel: () => void
  isPending: boolean
}) {
  const [slug, setSlug] = useState(initial.slug)
  const [titleEs, setTitleEs] = useState(initial.title.es)
  const [titleEn, setTitleEn] = useState(initial.title.en)
  const [excerptEs, setExcerptEs] = useState(initial.excerpt.es)
  const [excerptEn, setExcerptEn] = useState(initial.excerpt.en)
  const [contentEs, setContentEs] = useState(initial.content.es)
  const [contentEn, setContentEn] = useState(initial.content.en)
  const [category, setCategory] = useState(initial.category)
  const [tagsRaw, setTagsRaw] = useState(initial.tags.join(', '))
  const [readingMinutes, setReadingMinutes] = useState(initial.readingMinutes)
  const [isFeatured, setIsFeatured] = useState(initial.isFeatured)
  const [isPublished, setIsPublished] = useState(initial.isPublished)
  const [order, setOrder] = useState(initial.order)

  const inp = 'w-full bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400'
  const lbl = 'block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5'

  return (
    <div className="bg-zinc-900 border border-emerald-500/20 rounded-xl p-6 space-y-5">
      <p className="text-sm font-semibold text-zinc-300">{'_id' in initial ? 'Editar nota' : 'Nueva nota'}</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={lbl}>Slug *</label><input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="mi-nota" className={inp} /></div>
        <div>
          <label className={lbl}>Categoría *</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as PostItem['category'])} className={inp}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={lbl}>Título ES *</label><input value={titleEs} onChange={(e) => setTitleEs(e.target.value)} className={inp} /></div>
        <div><label className={lbl}>Título EN *</label><input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className={inp} /></div>
      </div>
      <div><label className={lbl}>Resumen ES *</label><textarea value={excerptEs} onChange={(e) => setExcerptEs(e.target.value)} rows={2} className={`${inp} resize-none`} /></div>
      <div><label className={lbl}>Resumen EN *</label><textarea value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} rows={2} className={`${inp} resize-none`} /></div>
      <div><label className={lbl}>Contenido ES * (líneas que empiezan con &quot;## &quot; son encabezados)</label><textarea value={contentEs} onChange={(e) => setContentEs(e.target.value)} rows={10} className={`${inp} resize-y font-mono`} /></div>
      <div><label className={lbl}>Contenido EN *</label><textarea value={contentEn} onChange={(e) => setContentEn(e.target.value)} rows={10} className={`${inp} resize-y font-mono`} /></div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div><label className={lbl}>Tags (comas)</label><input value={tagsRaw} onChange={(e) => setTagsRaw(e.target.value)} placeholder="Vue 3, TypeScript" className={inp} /></div>
        <div><label className={lbl}>Minutos de lectura</label><input type="number" value={readingMinutes} onChange={(e) => setReadingMinutes(Number(e.target.value))} className={inp} /></div>
        <div><label className={lbl}>Orden</label><input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className={inp} /></div>
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
          <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="accent-emerald-400 w-4 h-4" />
          Publicado
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
          <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="accent-emerald-400 w-4 h-4" />
          Destacado
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          disabled={isPending || !slug || !titleEs}
          onClick={() => onSave({
            slug,
            title: { es: titleEs, en: titleEn || titleEs },
            excerpt: { es: excerptEs, en: excerptEn || excerptEs },
            content: { es: contentEs, en: contentEn || contentEs },
            category,
            tags: tagsRaw.split(',').map((s) => s.trim()).filter(Boolean),
            readingMinutes,
            isFeatured,
            isPublished,
            order,
          })}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold text-sm rounded-lg transition-colors"
        >
          {isPending ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 border border-white/10 text-zinc-400 hover:text-zinc-100 text-sm rounded-lg transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run dev`, sign in at `/admin/login`, navigate to `/admin/posts`. Expected: empty list (until Task 4's seed runs) or the 7 seeded posts; create a test post, confirm it appears; toggle its publish state; edit it; delete it. No console errors.

- [ ] **Step 4: Commit**

```bash
git add "app/admin/(protected)/posts/page.tsx" components/admin/AdminSidebar.tsx
git commit -m "feat: add admin UI for managing posts"
```

---

### Task 7: Navbar rewrite — route-based navigation

**Files:**
- Modify: `components/layout/Navbar.tsx`

**Interfaces:**
- Consumes: `usePathname` (`@/i18n/navigation`), `Link` (`@/i18n/navigation`), `useTranslations('nav')`.
- Produces: same `NavbarProps` (`{ handle?, cvUrl?, logo? }`) — `app/[locale]/layout.tsx` (Task not modified) keeps working unchanged.

- [ ] **Step 1: Replace the file**

`components/layout/Navbar.tsx`:
```tsx
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

  useEffect(() => { setOpen(false) }, [pathname])

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

          <button ref={toggleRef} className="lg:hidden justify-self-end text-[var(--dc-muted)] hover:text-[#e8e6dd] transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e6dd]" onClick={() => setOpen((v) => !v)} aria-label={open ? ta('menuClose') : ta('menuOpen')} aria-expanded={open} aria-controls="mobile-nav">
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
```

- [ ] **Step 2: Verify**

Run: `npm run dev`, open `/es`. Expected: nav shows Inicio/Sobre mí/Notas/Contacto, no console errors about missing translation keys (confirms Task 2 landed correctly), the active link underlines correctly when navigating between `/`, `/about`, `/blog`, `/contact` (the latter three won't exist as real pages until Tasks 10–13 — a 404 is expected until then, but the Navbar itself must render without runtime errors on `/`).

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: rewrite Navbar with real routes and redesigned styling"
```

---

### Task 8: Footer restyle

**Files:**
- Modify: `components/layout/Footer.tsx`

**Interfaces:**
- Produces: same `FooterProps` — no signature change, visual only.

- [ ] **Step 1: Replace the file**

`components/layout/Footer.tsx`:
```tsx
import { Mail } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'

interface FooterProps {
  name?: string
  role?: string
  handle?: string
  github?: string
  linkedin?: string
  email?: string
}

export async function Footer({
  name = 'Jonathan Leiva Gómez',
  role = 'Desarrollador Full Stack Senior',
  handle = 'jonathanleivag',
  github = 'https://github.com/jonathanleivag',
  linkedin = 'https://www.linkedin.com/in/jonathanleivag',
  email = 'contacto@jonathanleivag.cl',
}: FooterProps = {}) {
  const ta = await getTranslations('a11y')

  return (
    <footer className="mt-20 border-t border-[var(--dc-border)]">
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 sm:grid-cols-[1fr_auto] items-end gap-10 px-10 py-10">
        <div className="flex flex-col gap-2">
          <span className="font-heading text-xl font-black tracking-tight text-[#e8e6dd]">{name}</span>
          <span className="text-[11px] tracking-[0.1em] uppercase text-[var(--dc-muted)]">{role} · Chile</span>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3 text-[11px] tracking-[0.1em] uppercase text-[var(--dc-muted)]">
          <div className="flex items-center gap-5">
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label={ta('github')} className="flex items-center gap-2 hover:text-[#e8e6dd] transition-colors">
              <GithubIcon size={16} /> {ta('github')}
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={ta('linkedin')} className="flex items-center gap-2 hover:text-[#e8e6dd] transition-colors">
              <LinkedinIcon size={16} /> {ta('linkedin')}
            </a>
            <a href={`mailto:${email}`} aria-label={ta('email')} className="flex items-center gap-2 hover:text-[#e8e6dd] transition-colors">
              <Mail size={16} /> {ta('email')}
            </a>
          </div>
          <span>© {new Date().getFullYear()} {handle}</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`, open `/es`, scroll to the bottom. Expected: footer renders with the new monochrome style, links work, no console errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: restyle Footer for redesign"
```

---

### Task 9: Home page rewrite

**Files:**
- Create: `components/ui/CaseRow.tsx`
- Create: `components/ui/PostRow.tsx`
- Modify: `app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `getPublicProfile` (`@/lib/data/profile`), `getPublicCaseStudies` (`@/lib/data/case-studies`), `getPublicPersonalProjects` (`@/lib/data/projects`), `getPublicPosts` (`@/lib/data/posts`, Task 3), `ScrollReveal`/`StaggerList`/`StaggerItem` (`@/components/ui/ScrollReveal`).
- Produces: `CaseRow({ index, title, category, intro, href })`, `PostRow({ date, category, minutesLabel, title, href })` — used for the home page's 3-post preview only. Task 12's blog listing renders a five-column row (with a separate reading-time column) via its own local `PostRowWithCategory`, not this component — the two layouts genuinely differ (the prototype's home preview row and blog listing row are laid out with a different column count), so they are intentionally separate small presentational components rather than one parameterized for both shapes.

- [ ] **Step 1: Create `CaseRow`**

`components/ui/CaseRow.tsx`:
```tsx
import { Link } from '@/i18n/navigation'

interface Props {
  index: number
  title: string
  category: string
  intro: string
  href: string
}

export function CaseRow({ index, title, category, intro, href }: Props) {
  return (
    <Link
      href={href}
      className="grid grid-cols-[60px_1fr_320px_28px] items-start gap-6 py-6 px-2 border-t border-[var(--dc-border)] cursor-pointer hover:bg-[var(--dc-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e6dd]"
    >
      <span className="font-heading text-3xl font-black leading-none text-transparent" style={{ WebkitTextStroke: '1px rgba(232,230,221,.32)' }}>
        {String(index).padStart(2, '0')}
      </span>
      <span className="flex flex-col gap-2">
        <span className="font-heading text-2xl font-black leading-tight tracking-tight text-[#e8e6dd]">{title}</span>
        <span className="text-[10px] tracking-[0.12em] uppercase text-[var(--dc-muted)]">{category}</span>
      </span>
      <span className="text-xs leading-[1.8] text-[#c9cec9] hidden sm:block">{intro}</span>
      <span className="text-right text-[var(--dc-muted)]">→</span>
    </Link>
  )
}
```

- [ ] **Step 2: Create `PostRow`**

`components/ui/PostRow.tsx`:
```tsx
import { Link } from '@/i18n/navigation'

interface Props {
  date: string
  category: string
  minutesLabel: string
  title: string
  href: string
}

export function PostRow({ date, category, minutesLabel, title, href }: Props) {
  return (
    <Link
      href={href}
      className="grid grid-cols-[110px_70px_1fr_28px] sm:grid-cols-[150px_90px_1fr_28px] items-center gap-5 py-[18px] px-2 border-t border-[var(--dc-border)] cursor-pointer hover:bg-[var(--dc-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e6dd]"
    >
      <span className="text-[11px] tracking-[0.08em] text-[var(--dc-muted)]">{date} · {minutesLabel}</span>
      <span className="text-[10px] tracking-[0.12em] text-[var(--dc-muted)] uppercase hidden sm:block">{category}</span>
      <span className="font-heading text-lg font-bold tracking-tight text-[#e8e6dd]">{title}</span>
      <span className="text-right text-[var(--dc-muted)]">→</span>
    </Link>
  )
}
```

- [ ] **Step 3: Rewrite the home page**

`app/[locale]/page.tsx`:
```tsx
export const revalidate = 86400

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getPublicProfile } from '@/lib/data/profile'
import { getPublicCaseStudies } from '@/lib/data/case-studies'
import { getPublicPersonalProjects } from '@/lib/data/projects'
import { getPublicPosts } from '@/lib/data/posts'
import { CaseRow } from '@/components/ui/CaseRow'
import { PostRow } from '@/components/ui/PostRow'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface Props {
  params: Promise<{ locale: string }>
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CL', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase()
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const l = locale as 'es' | 'en'

  const [profile, tHero, tHome, tBlog, caseStudies, personalProjects, posts] = await Promise.all([
    getPublicProfile(l),
    getTranslations({ locale, namespace: 'hero' }),
    getTranslations({ locale, namespace: 'home' }),
    getTranslations({ locale, namespace: 'blogPage' }),
    getPublicCaseStudies(l),
    getPublicPersonalProjects(l),
    getPublicPosts(l),
  ])

  return (
    <main>
      <header className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-20 pb-16">
        <div className="flex items-center gap-2.5 mb-9 text-[11px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">
          <span className="text-[#e8e6dd]">$</span>
          <span>{tHero('terminalLine')}</span>
          <span className="inline-block w-2 h-3.5 bg-[#e8e6dd] animate-pulse" />
        </div>
        <h1 className="max-w-[960px] font-heading text-4xl sm:text-5xl lg:text-[66px] font-black leading-[1.02] tracking-[-0.035em] text-balance">
          {tHero('headline')}
        </h1>
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-end mt-12">
          <p className="max-w-[580px] text-sm leading-[1.9] text-[#c9cec9]">{profile.hero.subtitle}</p>
          <div className="flex flex-col gap-2.5">
            <Link href="/#cases" className="flex items-center justify-between px-[18px] py-4 bg-[#e8e6dd] text-[#111111] text-xs font-bold tracking-[0.1em]">
              <span>{tHero('primaryCta').toUpperCase()}</span><span>→</span>
            </Link>
            <Link href="/contact" className="flex items-center justify-between px-[18px] py-4 border border-[var(--dc-border-strong)] text-xs tracking-[0.1em] text-[#c9cec9] hover:border-[#e8e6dd] hover:text-[#e8e6dd] transition-colors">
              <span>{tHero('secondaryCta').toUpperCase()}</span><span>→</span>
            </Link>
            <span className="flex items-center gap-2 mt-1 text-[11px] tracking-[0.08em] text-[var(--dc-muted)]">
              <span className="w-1.5 h-1.5 bg-[#e8e6dd]" />{tHero('availability')}
            </span>
          </div>
        </div>
      </header>

      <ScrollReveal>
        <section className="border-t border-b border-[var(--dc-border)]">
          <div className="grid grid-cols-2 sm:grid-cols-4 max-w-[1180px] mx-auto px-6 sm:px-10">
            {[
              [tHero('stat1Value'), tHero('stat1Label')],
              [tHero('stat2Value'), tHero('stat2Label')],
              [tHero('stat3Value'), tHero('stat3Label')],
              [tHero('stat4Value'), tHero('stat4Label')],
            ].map(([value, label], i) => (
              <div key={label} className={`flex flex-col gap-2 py-6 px-4 sm:px-5 ${i < 3 ? 'sm:border-r border-[var(--dc-border)]' : ''}`}>
                <span className="font-heading text-3xl sm:text-[38px] font-black leading-none tracking-[-0.03em]">{value}</span>
                <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{label}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="cases" className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-16">
          <div className="flex items-baseline justify-between mb-7">
            <h2 className="text-xs font-bold tracking-[0.2em] text-[var(--dc-muted)]">{tHome('caseStudiesLabel')}</h2>
          </div>
          {caseStudies.map((cs, i) => (
            <CaseRow key={cs.slug} index={i + 1} title={cs.title} category={cs.stack.slice(0, 2).join(' · ')} intro={cs.intro} href={`/projects/${cs.slug}`} />
          ))}
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-14">
          <h2 className="text-xs font-bold tracking-[0.2em] text-[var(--dc-muted)] mb-6">{tHome('personalProjectsLabel')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalProjects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="flex flex-col gap-3 group">
                <div className="relative h-[132px] border border-[var(--dc-border-strong)] overflow-hidden">
                  {p.image && <Image src={p.image.src} alt={p.image.alt} fill className="object-cover" />}
                </div>
                <span className="font-heading text-base font-black tracking-tight text-[#e8e6dd] group-hover:opacity-80">{p.title}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase text-[var(--dc-muted)]">{p.stack.slice(0, 3).join(' · ')}</span>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight">{tHome('notesLabel')}</h2>
            <Link href="/blog" className="text-[11px] tracking-[0.12em] uppercase text-[var(--dc-muted)] hover:text-[#e8e6dd] transition-colors">
              {tHome('seeAllNotes')}
            </Link>
          </div>
          {posts.slice(0, 3).map((post) => (
            <PostRow
              key={post.slug}
              date={formatDate(post.publishedAt, locale)}
              category={tBlog(`category${post.category[0].toUpperCase()}${post.category.slice(1)}` as 'categoryArticulo')}
              minutesLabel={`${post.readingMinutes} ${tBlog('minutesSuffix')}`}
              title={post.title}
              href={`/blog/${post.slug}`}
            />
          ))}
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mt-[70px] bg-[#e8e6dd] text-[#111111]">
          <div className="grid lg:grid-cols-[1fr_auto] items-center gap-10 max-w-[1180px] mx-auto px-6 sm:px-10 py-12">
            <h2 className="max-w-[660px] font-heading text-2xl sm:text-4xl font-black leading-tight tracking-tight">{tHome('ctaTitle')}</h2>
            <Link href="/contact" className="px-[26px] py-[18px] bg-[#111111] text-[#e8e6dd] text-xs font-bold tracking-[0.1em] self-start">
              {tHome('ctaButton')}
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </main>
  )
}
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, open `/es` and `/en`. Expected: hero, stats, 3 case rows, 4 personal-project cards with real Cloudinary images, 3 latest post rows, and the closing CTA band all render without console errors; every case row and project card links to `/projects/<slug>` (still restyled later in Task 15, so its content will look inconsistent until then — that's expected at this point in the plan).

- [ ] **Step 5: Commit**

```bash
git add components/ui/CaseRow.tsx components/ui/PostRow.tsx "app/[locale]/page.tsx"
git commit -m "feat: rewrite home page with redesigned layout and real data"
```

---

### Task 10: `/about` page

**Files:**
- Create: `app/[locale]/about/page.tsx`

**Interfaces:**
- Consumes: `getPublicProfile` (`@/lib/data/profile`), `getPublicExperiences` (`@/lib/data/experience`), `getPublicSkillCategories` (`@/lib/data/skills`).

- [ ] **Step 1: Create the page**

`app/[locale]/about/page.tsx`:
```tsx
export const revalidate = 86400

import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPublicProfile } from '@/lib/data/profile'
import { getPublicExperiences } from '@/lib/data/experience'
import { getPublicSkillCategories } from '@/lib/data/skills'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'aboutPage' })
  const profile = await getPublicProfile(locale as 'es' | 'en')
  return {
    title: `${t('heading')} — ${profile.name}`,
    description: profile.about.summary,
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const l = locale as 'es' | 'en'

  const [t, profile, experiences, skillCategories] = await Promise.all([
    getTranslations({ locale, namespace: 'aboutPage' }),
    getPublicProfile(l),
    getPublicExperiences(l),
    getPublicSkillCategories(l),
  ])

  return (
    <main className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-16 pb-20">
      <header className="grid lg:grid-cols-[1.15fr_1fr] gap-14 items-start pb-14">
        <div>
          <span className="text-[11px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('eyebrow')}</span>
          <h1 className="mt-5 font-heading text-3xl sm:text-[58px] font-black leading-[1.03] tracking-[-0.035em]">{t('heading')}</h1>
          <p className="mt-6 max-w-[600px] text-base leading-[1.85] text-[#dcd9cf]">{profile.about.summary}</p>
          {profile.about.body.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-[600px] text-base leading-[1.85] text-[#c9cec9]">{paragraph}</p>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <div className="h-[280px] border border-[var(--dc-border-strong)]" />
          <div className="flex flex-col gap-3 p-5 border border-[var(--dc-border-strong)] text-xs tracking-[0.04em] text-[#c9cec9]">
            <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('dataLabel')}</span>
            <span>{profile.location}</span>
            <span>{profile.social.email}</span>
            <span>{t('languages')}</span>
            <span className="text-[#e8e6dd]">{profile.availability}</span>
          </div>
        </div>
      </header>

      <ScrollReveal>
        <section className="pb-14">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)] mb-7">{t('experienceLabel')}</h2>
          {experiences.map((exp) => (
            <div key={exp.company} className="grid lg:grid-cols-[280px_1fr] gap-11 py-[26px] border-t border-[var(--dc-border)]">
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2.5 font-heading text-xl font-black tracking-tight">
                  {exp.company}
                  {exp.isCurrent && <span className="px-2 py-0.5 bg-[#e8e6dd] text-[#111111] text-[9px] font-bold tracking-[0.1em]">{t('currentBadge')}</span>}
                </span>
                <span className="text-[11px] tracking-[0.08em] text-[var(--dc-muted)]">{exp.period}</span>
                <span className="text-[11px] text-[var(--dc-muted)]">{exp.location}</span>
              </div>
              <div className="flex flex-col gap-3.5">
                <span className="text-sm text-[#e8e6dd]">{exp.role}</span>
                <div className="flex flex-col gap-2 text-sm leading-[1.7] text-[#c9cec9]">
                  {exp.highlights.map((h) => <span key={h}>→ {h}</span>)}
                </div>
                {exp.stack.length > 0 && (
                  <span className="text-[10px] tracking-[0.12em] uppercase text-[var(--dc-muted)]">{exp.stack.join(' · ')}</span>
                )}
              </div>
            </div>
          ))}
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)] mb-7">{t('stackLabel')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--dc-border)] border border-[var(--dc-border)]">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="flex flex-col gap-3 p-6 bg-[#151a19]">
                <span className="font-heading text-base font-black tracking-tight">{cat.title}</span>
                <span className="text-xs leading-[1.9] text-[#c9cec9]">{cat.skills.join(' · ')}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </main>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`, open `/es/about` and `/en/about`. Expected: header with profile summary + data card, experience list (4 entries from `content/experience` seed or Mongo), 7 skill category tiles, no console errors.

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/about/page.tsx"
git commit -m "feat: add /about page"
```

---

### Task 11: `/contact` page

**Files:**
- Create: `app/[locale]/contact/page.tsx`

**Interfaces:**
- Consumes: `getPublicProfile` (`@/lib/data/profile`), `ContactForm` (`@/components/ui/ContactForm`, unchanged).

- [ ] **Step 1: Create the page**

`app/[locale]/contact/page.tsx`:
```tsx
export const revalidate = 86400

import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPublicProfile } from '@/lib/data/profile'
import { ContactForm } from '@/components/ui/ContactForm'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contactPage' })
  const profile = await getPublicProfile(locale as 'es' | 'en')
  return {
    title: `${t('heading')} — ${profile.name}`,
    description: t('subtitle'),
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const [t, profile] = await Promise.all([
    getTranslations({ locale, namespace: 'contactPage' }),
    getPublicProfile(locale as 'es' | 'en'),
  ])

  return (
    <main className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-16 pb-20">
      <header className="pb-12">
        <span className="text-[11px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('eyebrow')}</span>
        <h1 className="mt-5 max-w-[900px] font-heading text-3xl sm:text-[58px] font-black leading-[1.03] tracking-[-0.035em]">{t('heading')}</h1>
        <p className="mt-6 max-w-[620px] text-base leading-[1.85] text-[#c9cec9]">{t('subtitle')}</p>
      </header>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 pt-12 border-t border-[var(--dc-border)]">
        <ContactForm />

        <aside className="flex flex-col gap-3.5">
          <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('directChannels')}</span>
          <a href={`mailto:${profile.social.email}`} className="flex items-center justify-between p-5 border border-[var(--dc-border-strong)] hover:border-[#e8e6dd] transition-colors">
            <span className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('emailChannel')}</span>
              <span className="text-sm">{profile.social.email}</span>
            </span>
            <span className="text-[var(--dc-muted)]">→</span>
          </a>
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 border border-[var(--dc-border-strong)] hover:border-[#e8e6dd] transition-colors">
            <span className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('linkedinChannel')}</span>
              <span className="text-sm">in/jonathanleivag</span>
            </span>
            <span className="text-[var(--dc-muted)]">→</span>
          </a>
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 border border-[var(--dc-border-strong)] hover:border-[#e8e6dd] transition-colors">
            <span className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('githubChannel')}</span>
              <span className="text-sm">github.com/jonathanleivag</span>
            </span>
            <span className="text-[var(--dc-muted)]">→</span>
          </a>
          <a href={profile.social.cv} className="flex items-center justify-between p-5 bg-[#e8e6dd] text-[#111111]">
            <span className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[#4a4a4a]">{t('cvChannel')}</span>
              <span className="text-sm font-bold">{t('downloadCv')}</span>
            </span>
            <span>↓</span>
          </a>
          <div className="flex items-center gap-2.5 pt-4 text-[11px] tracking-[0.08em] uppercase text-[var(--dc-muted)]">
            <span className="w-1.5 h-1.5 bg-[#e8e6dd]" />{t('availability')}
          </div>
        </aside>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`, open `/es/contact`. Expected: form on the left (reused `ContactForm`, unchanged behavior — submitting still hits `/api/contact`), channel cards on the right with real profile data, no console errors. Submit a real test message if `RESEND_API_KEY`/`CONTACT_TO_EMAIL` are configured in `.env.local`; otherwise just confirm the client-side validation and loading state work.

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/contact/page.tsx"
git commit -m "feat: add /contact page"
```

---

### Task 12: `/blog` listing page

**Files:**
- Create: `app/[locale]/blog/page.tsx`

**Interfaces:**
- Consumes: `getPublicPosts` (`@/lib/data/posts`), `PostRow` (`@/components/ui/PostRow`, Task 9).

- [ ] **Step 1: Create the page**

`app/[locale]/blog/page.tsx`:
```tsx
export const revalidate = 86400

import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPublicPosts } from '@/lib/data/posts'

const CATEGORIES = ['articulo', 'til', 'tutorial', 'snippet', 'caso'] as const

interface Props {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blogPage' })
  return { title: t('heading'), description: t('subtitle') }
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CL', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase()
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params
  const { category } = await searchParams
  const l = locale as 'es' | 'en'

  const [t, allPosts] = await Promise.all([
    getTranslations({ locale, namespace: 'blogPage' }),
    getPublicPosts(l),
  ])

  const filtered = category ? allPosts.filter((p) => p.category === category) : allPosts

  const counts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = allPosts.filter((p) => p.category === cat).length
    return acc
  }, {})

  const categoryLabel = (cat: string) => t(`category${cat[0].toUpperCase()}${cat.slice(1)}` as 'categoryArticulo')

  return (
    <main className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-16">
      <header className="pb-11">
        <span className="text-[11px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('eyebrow')}</span>
        <h1 className="mt-5 max-w-[820px] font-heading text-3xl sm:text-[60px] font-black leading-[1.02] tracking-[-0.035em]">{t('heading')}</h1>
        <p className="mt-6 max-w-[560px] text-sm leading-[1.9] text-[#c9cec9]">{t('subtitle')}</p>
      </header>

      <div className="flex flex-wrap gap-2 py-5 border-t border-b border-[var(--dc-border)] text-[11px] tracking-[0.12em] uppercase">
        <Link href="/blog" className={`px-3.5 py-1.5 ${!category ? 'bg-[#e8e6dd] text-[#111111] font-bold' : 'border border-[var(--dc-border-strong)] text-[#c9cec9] hover:border-[#e8e6dd]'}`}>
          {t('filterAll')} · {allPosts.length}
        </Link>
        {CATEGORIES.filter((cat) => counts[cat] > 0).map((cat) => (
          <Link key={cat} href={`/blog?category=${cat}`} className={`px-3.5 py-1.5 ${category === cat ? 'bg-[#e8e6dd] text-[#111111] font-bold' : 'border border-[var(--dc-border-strong)] text-[#c9cec9] hover:border-[#e8e6dd]'}`}>
            {categoryLabel(cat)} · {counts[cat]}
          </Link>
        ))}
      </div>

      <section className="pt-4 pb-16">
        {filtered.map((post) => (
          <div key={post.slug}>
            {post.isFeatured && (
              <Link href={`/blog/${post.slug}`} className="block py-11 border-b border-[var(--dc-border)]">
                <span className="flex items-center gap-3.5 text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">
                  <span className="px-2 py-1 bg-[#e8e6dd] text-[#111111] font-bold">{t('featuredBadge')}</span>
                  <span>{formatDate(post.publishedAt, locale)} · {categoryLabel(post.category)} · {post.readingMinutes} {t('minutesSuffix')}</span>
                </span>
                <h2 className="mt-[18px] font-heading text-2xl sm:text-[38px] font-black leading-[1.06] tracking-[-0.03em]">{post.title}</h2>
                <p className="mt-3 text-sm leading-[1.9] text-[#c9cec9] max-w-2xl">{post.excerpt}</p>
              </Link>
            )}
          </div>
        ))}
        {filtered.filter((p) => !p.isFeatured).map((post) => (
          <PostRowWithCategory
            key={post.slug}
            date={formatDate(post.publishedAt, locale)}
            category={categoryLabel(post.category)}
            minutes={`${post.readingMinutes} ${t('minutesSuffix')}`}
            title={post.title}
            href={`/blog/${post.slug}`}
          />
        ))}
      </section>
    </main>
  )
}

function PostRowWithCategory({ date, category, minutes, title, href }: { date: string; category: string; minutes: string; title: string; href: string }) {
  return (
    <Link href={href} className="grid grid-cols-[110px_80px_1fr_50px_28px] sm:grid-cols-[140px_96px_1fr_60px_28px] items-center gap-5 py-5 px-2 border-t border-[var(--dc-border)] hover:bg-[var(--dc-surface)] transition-colors">
      <span className="text-[11px] tracking-[0.08em] text-[var(--dc-muted)]">{date}</span>
      <span className="text-[10px] tracking-[0.12em] text-[var(--dc-muted)] uppercase hidden sm:block">{category}</span>
      <span className="font-heading text-lg font-bold tracking-tight">{title}</span>
      <span className="text-[10px] text-[var(--dc-muted)] hidden sm:block">{minutes}</span>
      <span className="text-right text-[var(--dc-muted)]">→</span>
    </Link>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`, open `/es/blog`. Expected: featured post banner, category filter pills with correct counts, remaining posts as rows; clicking a filter pill (e.g. `?category=til`) narrows the list and highlights that pill; `/es/blog?category=caso` shows exactly 1 result. No console errors.

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/blog/page.tsx"
git commit -m "feat: add /blog listing page with category filter"
```

---

### Task 13: `/blog/[slug]` article page

**Files:**
- Create: `app/[locale]/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getPublicPostBySlug`, `getPublicPostSlugs`, `getAdjacentPosts` (`@/lib/data/posts`, Task 3), `parsePostContent` (`@/lib/posts/parseContent`, Task 3).

- [ ] **Step 1: Create the page**

`app/[locale]/blog/[slug]/page.tsx`:
```tsx
export const revalidate = 86400

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPublicPostBySlug, getPublicPostSlugs, getAdjacentPosts } from '@/lib/data/posts'
import { parsePostContent } from '@/lib/posts/parseContent'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const locales = ['es', 'en']
  const slugs = await getPublicPostSlugs()
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPublicPostBySlug(locale as 'es' | 'en', slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.jonathanleivag.cl/${locale}/blog/${slug}`,
      languages: { es: `https://www.jonathanleivag.cl/es/blog/${slug}`, en: `https://www.jonathanleivag.cl/en/blog/${slug}` },
    },
  }
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CL', { year: 'numeric', month: 'long', day: '2-digit' })
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  const l = locale as 'es' | 'en'

  const post = await getPublicPostBySlug(l, slug)
  if (!post) notFound()

  const [t, tBlog, { previous, next }] = await Promise.all([
    getTranslations({ locale, namespace: 'postPage' }),
    getTranslations({ locale, namespace: 'blogPage' }),
    getAdjacentPosts(l, slug),
  ])

  const blocks = parsePostContent(post.content)
  const headings = blocks.filter((b) => b.type === 'heading')
  const categoryLabel = tBlog(`category${post.category[0].toUpperCase()}${post.category.slice(1)}` as 'categoryArticulo')

  return (
    <main className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-11">
      <Link href="/blog" className="inline-block text-[11px] tracking-[0.12em] uppercase text-[var(--dc-muted)] hover:text-[#e8e6dd] transition-colors">
        {t('backToBlog')}
      </Link>

      <header className="pt-9 pb-10 border-b border-[var(--dc-border)]">
        <span className="flex items-center gap-3.5 text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">
          <span className="px-2 py-1 border border-[var(--dc-border-strong)]">{categoryLabel}</span>
          <span>{formatDate(post.publishedAt, locale)} · {post.readingMinutes} {tBlog('minutesSuffix')}</span>
        </span>
        <h1 className="mt-[22px] max-w-[900px] font-heading text-3xl sm:text-[56px] font-black leading-[1.03] tracking-[-0.035em] text-balance">{post.title}</h1>
        <p className="mt-6 max-w-[680px] text-base leading-[1.8] text-[#c9cec9]">{post.excerpt}</p>
      </header>

      <div className="grid lg:grid-cols-[1fr_220px] gap-16 pt-12">
        <article className="max-w-[680px] text-base leading-[1.85] text-[#dcd9cf] space-y-[26px]">
          {blocks.map((block, i) =>
            block.type === 'heading' ? (
              <h2 key={i} id={block.id} className="font-heading text-2xl font-black leading-tight tracking-[-0.025em] text-[#e8e6dd] pt-4">{block.text}</h2>
            ) : (
              <p key={i}>{block.text}</p>
            )
          )}

          <div className="flex flex-wrap gap-2 pt-8 border-t border-[var(--dc-border)] text-[10px] tracking-[0.12em] uppercase text-[var(--dc-muted)]">
            {post.tags.map((tag) => <span key={tag} className="px-2.5 py-1.5 border border-[var(--dc-border-strong)]">{tag}</span>)}
          </div>
        </article>

        {headings.length > 1 && (
          <aside className="sticky top-24 self-start flex flex-col gap-3.5 text-sm leading-[1.6]">
            <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{t('tocLabel')}</span>
            {headings.map((h) => (
              <a key={h.id} href={`#${h.id}`} className="pl-3 border-l-2 border-[var(--dc-border)] text-[var(--dc-muted)] hover:text-[#e8e6dd] hover:border-[#e8e6dd] transition-colors">
                {h.text}
              </a>
            ))}
          </aside>
        )}
      </div>

      {(previous || next) && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-px mt-16 border-t border-[var(--dc-border)]">
          {previous ? (
            <Link href={`/blog/${previous.slug}`} className="flex flex-col gap-2.5 py-7 sm:pr-7 sm:border-r border-[var(--dc-border)] hover:bg-[var(--dc-surface)] transition-colors">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('previous')}</span>
              <span className="font-heading text-xl font-bold tracking-tight">{previous.title}</span>
            </Link>
          ) : <div />}
          {next && (
            <Link href={`/blog/${next.slug}`} className="flex flex-col items-start sm:items-end gap-2.5 py-7 sm:pl-7 text-left sm:text-right hover:bg-[var(--dc-surface)] transition-colors">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('next')}</span>
              <span className="font-heading text-xl font-bold tracking-tight">{next.title}</span>
            </Link>
          )}
        </section>
      )}
    </main>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`, open `/es/blog/migrar-vue-2-a-vue-3-sin-congelar-el-roadmap`. Expected: full article with 4 rendered `<h2>` headings, a matching 4-link table of contents in the aside that jumps to each heading via its `#id` anchor, tag pills, and a previous/next post navigation footer. Since `getPublicPosts` sorts by `publishedAt` descending and `getAdjacentPosts` treats index+1 (older) as "previous" and index-1 (newer) as "next", this most-recent post should show **"next" absent** (nothing newer exists) and **"previous" pointing to "defineModel() y el fin de los props espejo"** (the next-older post). Open a post with only paragraphs (e.g. `defineModel...`) and confirm the aside is absent (fewer than 2 headings).

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/blog/[slug]/page.tsx"
git commit -m "feat: add /blog/[slug] article page with table of contents"
```

---

### Task 14: `/projects/[slug]` visual restyle

**Files:**
- Modify: `app/[locale]/projects/[slug]/page.tsx`

**Interfaces:**
- No signature/data-flow change — same `getPublicCaseStudyBySlug`/`getPublicPersonalProjects` calls, same `generateStaticParams`/`generateMetadata`. Visual only.

- [ ] **Step 1: Replace the case-study branch's JSX**

Replace the `if (cs) { ... }` block's return statement with:
```tsx
  if (cs) {
    const t = await getTranslations({ locale, namespace: 'caseStudies' })
    return (
      <main className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-11">
        <Link href="/" className="inline-block text-[11px] tracking-[0.12em] uppercase text-[var(--dc-muted)] hover:text-[#e8e6dd] transition-colors">
          ← {locale === 'en' ? 'Back to work' : 'Volver al trabajo'}
        </Link>

        <header className="pt-9 pb-11">
          <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--dc-muted)]">{cs.stack.slice(0, 2).join(' · ')}</span>
          <h1 className="mt-5 max-w-[920px] font-heading text-3xl sm:text-[62px] font-black leading-[1.02] tracking-[-0.035em]">{cs.title}</h1>
          <p className="mt-[26px] max-w-[660px] text-base leading-[1.8] text-[#c9cec9]">{cs.intro}</p>
        </header>

        <div className="h-[220px] sm:h-[320px] border border-[var(--dc-border-strong)]" />

        <section className="grid grid-cols-2 sm:grid-cols-4 mt-px border-t border-b border-[var(--dc-border)]">
          <div className="flex flex-col gap-2 py-[22px] pr-[22px] sm:border-r border-[var(--dc-border)]">
            <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('role')}</span>
            <span className="text-sm">{cs.role}</span>
          </div>
          <div className="flex flex-col gap-2 py-[22px] px-[22px] sm:border-r border-[var(--dc-border)]">
            <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">{t('context')}</span>
            <span className="text-sm">{cs.source || '—'}</span>
          </div>
          <div className="flex flex-col gap-2 py-[22px] px-[22px] sm:border-r border-[var(--dc-border)] col-span-2 sm:col-span-1">
            <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--dc-muted)]">Stack</span>
            <span className="text-sm">{cs.stack.slice(0, 3).join(' · ')}</span>
          </div>
        </section>

        <section className="grid lg:grid-cols-[260px_1fr] gap-14 pt-[60px]">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('context')}</h2>
          <p className="max-w-[680px] text-base leading-[1.85] text-[#dcd9cf]">{cs.context}</p>
        </section>

        <section className="grid lg:grid-cols-[260px_1fr] gap-14 pt-14">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('technicalDecisions')}</h2>
          <div className="flex flex-col max-w-[760px]">
            {cs.technicalDecisions.map((d, i) => (
              <div key={d} className="grid grid-cols-[44px_1fr] gap-[18px] py-[18px] border-t border-[var(--dc-border)] last:border-b">
                <span className="font-heading text-base font-black text-[var(--dc-muted)]">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[15px] leading-[1.7] text-[#dcd9cf]">{d}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-[260px_1fr] gap-14 pt-14">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('result')}</h2>
          <div className="flex flex-col gap-[26px] max-w-[760px]">
            <p className="font-heading text-xl sm:text-2xl font-bold leading-[1.35] tracking-[-0.02em]">{cs.result}</p>
            <div className="flex flex-wrap gap-2 text-[10px] tracking-[0.12em] uppercase text-[var(--dc-muted)]">
              {cs.stack.map((tech) => <span key={tech} className="px-2.5 py-1.5 border border-[var(--dc-border-strong)]">{tech}</span>)}
            </div>
          </div>
        </section>
      </main>
    )
  }
```

- [ ] **Step 2: Replace the personal-project branch's JSX**

Replace the trailing `return (...)` (personal project branch) with:
```tsx
  const t = await getTranslations({ locale, namespace: 'personalProjects' })

  return (
    <main className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-11 pb-20">
      <Link href="/" className="inline-block text-[11px] tracking-[0.12em] uppercase text-[var(--dc-muted)] hover:text-[#e8e6dd] transition-colors">
        {t('backToPortfolio')}
      </Link>

      <div className="flex items-start justify-between gap-5 flex-wrap pt-9">
        <div>
          <p className="text-xs text-[var(--dc-muted)] font-medium mb-1.5">{project.domain}</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-tight">{project.title}</h1>
        </div>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-2 bg-[#e8e6dd] text-[#111111] font-bold px-5 py-2.5 text-sm">
          {t('visitProject')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
        </a>
      </div>

      {project.image && (
        <div className="mt-8 border border-[var(--dc-border-strong)] overflow-hidden">
          <Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} className="object-cover w-full" priority />
        </div>
      )}

      <p className="mt-8 text-lg leading-[1.8] text-[#dcd9cf]">{project.summary}</p>

      <div className="grid md:grid-cols-2 gap-9 pt-9">
        <section className="space-y-3">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('objective')}</h2>
          <p className="text-sm leading-[1.7] text-[#c9cec9]">{project.objective}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('stack')}</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => <span key={tech} className="text-xs border border-[var(--dc-border-strong)] px-2.5 py-1">{tech}</span>)}
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('features')}</h2>
          <ul className="space-y-2">
            {project.features.map((f) => <li key={f} className="flex gap-2 text-sm text-[#c9cec9] leading-[1.7]"><span className="text-[var(--dc-muted)] shrink-0">→</span>{f}</li>)}
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('technicalHighlights')}</h2>
          <ul className="space-y-2">
            {project.technicalHighlights.map((h) => <li key={h} className="flex gap-2 text-sm text-[#c9cec9] leading-[1.7]"><span className="text-[var(--dc-muted)] shrink-0">→</span>{h}</li>)}
          </ul>
        </section>
      </div>

      <section className="border-t border-[var(--dc-border)] pt-8 mt-8 space-y-3">
        <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--dc-muted)]">{t('learning')}</h2>
        <p className="text-sm font-medium leading-[1.7]">{project.learning}</p>
      </section>
    </main>
  )
}
```

Also remove the now-unused `BrowserFrame` import at the top of the file (`import { BrowserFrame } from '@/components/ui/BrowserFrame'`) since the restyled personal-project section no longer wraps the image in it.

- [ ] **Step 3: Verify**

Run: `npm run dev`. Open `/es/projects/vue-framework-migration` (case study) and `/es/projects/nintendo` (personal project). Expected: both render with the new monochrome style, no console errors, no reference to the removed `BrowserFrame` import (`npx tsc --noEmit` would catch a dangling import if it were still used elsewhere and now broken).

- [ ] **Step 4: Commit**

```bash
git add "app/[locale]/projects/[slug]/page.tsx"
git commit -m "feat: restyle /projects/[slug] for redesign"
```

---

### Task 15: Legacy cleanup and final verification

**Files:**
- Delete: `components/sections/Hero.tsx`
- Delete: `components/sections/About.tsx`
- Delete: `components/sections/Experience.tsx`
- Delete: `components/sections/Projects.tsx`
- Delete: `components/sections/CaseStudies.tsx`
- Delete: `components/sections/PersonalProjects.tsx`
- Delete: `components/sections/Skills.tsx`
- Delete: `components/sections/Contact.tsx`
- Delete (conditionally, see Step 1): `components/ui/ProjectCard.tsx`, `components/ui/PersonalProjectCard.tsx`, `components/ui/BrowserFrame.tsx`

**Interfaces:** None — this task only removes files confirmed unreferenced after Tasks 9–14 landed.

- [ ] **Step 1: Confirm nothing still imports the old section components**

Run:
```bash
grep -rn "components/sections/" app/ components/ --include="*.tsx" --include="*.ts"
```
Expected: no matches (the old home page was the only importer, replaced in Task 9). If any match remains, stop and investigate before deleting — do not delete a file still imported.

- [ ] **Step 2: Delete the unused section components**

```bash
git rm components/sections/Hero.tsx components/sections/About.tsx components/sections/Experience.tsx components/sections/Projects.tsx components/sections/CaseStudies.tsx components/sections/PersonalProjects.tsx components/sections/Skills.tsx components/sections/Contact.tsx
```

- [ ] **Step 3: Check the UI components those sections used, and delete any now-orphaned ones**

Run:
```bash
grep -rln "ProjectCard\b" app/ components/ --include="*.tsx" --include="*.ts"
grep -rln "PersonalProjectCard\b" app/ components/ --include="*.tsx" --include="*.ts"
grep -rln "BrowserFrame\b" app/ components/ --include="*.tsx" --include="*.ts"
```
For each of `components/ui/ProjectCard.tsx`, `components/ui/PersonalProjectCard.tsx`, `components/ui/BrowserFrame.tsx`: if the only remaining match is the component's own file (no other importer — Task 14 already removed `BrowserFrame`'s usage in `projects/[slug]/page.tsx`), delete it with `git rm`. If any of them is still imported elsewhere, leave it in place.

- [ ] **Step 4: Full verification pass**

Run, in order:
```bash
npx tsc --noEmit
npm run lint
npm run build
```
All three must succeed with no errors. `npm run build` additionally confirms `generateStaticParams` for `/blog/[slug]` and `/projects/[slug]` resolve correctly against the real (or fallback) data.

Then run `npm run dev` and manually check every route in both locales:
- `/es`, `/en` — home
- `/es/blog`, `/en/blog` — listing, try `?category=til`
- `/es/blog/migrar-vue-2-a-vue-3-sin-congelar-el-roadmap`, same in `/en/...`
- `/es/about`, `/en/about`
- `/es/contact`, `/en/contact` — submit a test message if email env vars are configured
- `/es/projects/vue-framework-migration` (case study) and `/es/projects/nintendo` (personal project)
- Toggle the language switcher from every page and confirm it lands on the equivalent page in the other locale (not a 404)
- Resize to mobile width and confirm the Navbar's hamburger menu opens/closes and its links navigate correctly

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove legacy home-section components after redesign"
```

---

## Self-Review Notes

- **Spec coverage:** All six prototype screens map to a task (home: Task 9; blog listing: Task 12; post detail: Task 13; case/project detail: Task 14; about: Task 10; contact: Task 11). Theme (Task 1), i18n (Task 2), new data model + admin CRUD (Tasks 3–6), and nav/footer (Tasks 7–8) cover every supporting requirement from the design spec. Cleanup (Task 15) closes the loop by removing what the redesign made obsolete.
- **Placeholder scan:** All code blocks are complete, runnable file contents or precise before/after replacements — no `TODO`/`TBD`/"similar to Task N" left in.
- **Type consistency:** `PublicPost` (Task 3) is used identically in Tasks 9, 12, and 13 (`slug, title, excerpt, content, category, tags, readingMinutes, isFeatured, publishedAt`); `PostBlock` (`type/text/id`) from `parsePostContent` is consumed identically in Task 13. `CaseRow`/`PostRow` props (Task 9) match their call sites in Tasks 9 and 12.
