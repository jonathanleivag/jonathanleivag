# Plan de implementación i18n Español/Inglés

## Objetivo

Implementar soporte multidioma en el portafolio para español e inglés, permitiendo que CTOs, reclutadores y visitantes internacionales puedan revisar el contenido en su idioma preferido sin duplicar lógica de componentes.

Idiomas iniciales:

- `es`: Español, idioma principal y fallback.
- `en`: Inglés, idioma secundario.

El idioma por defecto debe tomarse desde el navegador usando el header `Accept-Language`. Si el navegador no usa español ni inglés, el fallback será `es`.

## Estrategia recomendada

Usar rutas con prefijo de locale y detectar automáticamente el idioma del navegador cuando el usuario entra a `/`:

```text
/                  -> detecta idioma del navegador y redirige a /es o /en
/es
/en
/es/projects/[slug]
/en/projects/[slug]
```

Esto mejora:

- SEO internacional.
- Compartibilidad de URLs.
- Metadata por idioma.
- Escalabilidad si luego se agregan más idiomas.

## Librería recomendada

Para Next.js App Router, usar:

```bash
pnpm add next-intl
```

Motivos:

- Buen soporte para App Router.
- Manejo claro de diccionarios.
- Soporte para metadata localizada.
- Middleware para redirección por locale.
- API simple para Server Components y Client Components.

## Estructura de archivos propuesta

```text
app/
  [locale]/
    layout.tsx
    page.tsx
    projects/
      [slug]/
        page.tsx
  layout.tsx
  globals.css

content/
  i18n/
    es.ts
    en.ts
  projects.ts
  case-studies.ts
  skills.ts

i18n/
  request.ts
  routing.ts

middleware.ts
```

## Locales soportados

Crear archivo:

```text
i18n/routing.ts
```

Contenido sugerido:

```ts
export const locales = ['es', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'
```

## Diccionarios de contenido

Crear archivos:

```text
content/i18n/es.ts
content/i18n/en.ts
```

Ejemplo `content/i18n/es.ts`:

```ts
export const es = {
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    projects: 'Proyectos',
    caseStudies: 'Casos',
    skills: 'Stack',
    contact: 'Contacto',
    cv: 'CV',
  },
  hero: {
    eyebrow: 'Disponible para nuevos proyectos',
    headline: 'Desarrollo productos web con foco en escalabilidad, rendimiento y mantenibilidad.',
    subtitle:
      'Soy Desarrollador Full Stack Senior especializado en JavaScript, Vue.js, React, React Native, Express.js y GraphQL.',
    primaryCta: 'Ver proyectos',
    secondaryCta: 'Contactar',
  },
}
```

Ejemplo `content/i18n/en.ts`:

```ts
export const en = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    caseStudies: 'Case Studies',
    skills: 'Stack',
    contact: 'Contact',
    cv: 'Resume',
  },
  hero: {
    eyebrow: 'Available for new projects',
    headline: 'I build web products focused on scalability, performance, and maintainability.',
    subtitle:
      'I am a Senior Full Stack Developer specialized in JavaScript, Vue.js, React, React Native, Express.js, and GraphQL.',
    primaryCta: 'View projects',
    secondaryCta: 'Contact me',
  },
}
```

## Configuración de `next-intl`

Crear archivo:

```text
i18n/request.ts
```

Contenido sugerido:

```ts
import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, locales } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !locales.includes(locale as never)) {
    locale = defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
```

Nota: si se prefiere TypeScript en vez de JSON, se puede crear un helper propio para importar `content/i18n/es.ts` y `content/i18n/en.ts`.

## Middleware

Crear archivo:

```text
middleware.ts
```

Contenido sugerido:

```ts
import createMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from './i18n/routing'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
})

export const config = {
  matcher: ['/', '/(es|en)/:path*'],
}
```

Con `localeDetection: true`, cuando una persona visite `/`, `next-intl` revisará el header `Accept-Language` del navegador:

- Si detecta español, redirige a `/es`.
- Si detecta inglés, redirige a `/en`.
- Si detecta otro idioma no soportado, usa el fallback `/es`.

## Reestructura de rutas

Mover la página principal actual:

```text
app/page.tsx
```

A:

```text
app/[locale]/page.tsx
```

Mover layout con contenido localizado a:

```text
app/[locale]/layout.tsx
```

Mantener `app/layout.tsx` como root layout mínimo para `html`, `body` y estilos globales si aplica.

## Metadata por idioma

Definir metadata localizada según el `locale`:

```ts
export async function generateMetadata({ params }: Props) {
  const { locale } = await params

  const metadata = {
    es: {
      title: 'Jonathan Leiva Gómez | Desarrollador Full Stack Senior',
      description: 'Portafolio de Jonathan Leiva Gómez...',
    },
    en: {
      title: 'Jonathan Leiva Gómez | Senior Full Stack Developer',
      description: 'Portfolio of Jonathan Leiva Gómez...',
    },
  }

  return metadata[locale]
}
```

También agregar `alternates`:

```ts
alternates: {
  canonical: `/${locale}`,
  languages: {
    es: '/es',
    en: '/en',
  },
}
```

## Selector de idioma

Crear componente:

```text
components/ui/LanguageSwitcher.tsx
```

Comportamiento esperado:

- Mostrar `ES` y `EN`.
- Mantener la misma ruta al cambiar idioma.
- Ser accesible por teclado.
- Indicar idioma activo.
- Usar `aria-label` claro.

Ejemplo visual:

```text
[ES] [EN]
```

Ubicación sugerida:

- Desktop: en `Navbar`, cerca del CTA de CV.
- Mobile: dentro del drawer mobile.

## Contenido traducible

Mover a diccionarios todo texto visible de UI:

- Navbar.
- Hero.
- CTAs.
- About.
- Projects.
- Case Studies.
- Skills.
- Contact.
- Footer.
- Metadata.
- Labels accesibles como `aria-label`.
- Estados como `Email copiado`.

## Contenido técnico que puede mantenerse igual

Algunos términos técnicos pueden conservarse en inglés:

- `Frontend`
- `Backend`
- `Full Stack`
- `GraphQL`
- `API`
- `TypeScript`
- `Vue.js`
- `React`

Pero las descripciones deben traducirse según idioma.

## Proyectos y casos de estudio

Opción recomendada: mantener IDs/slugs estables y traducir contenido interno.

Ejemplo:

```ts
export const projects = [
  {
    slug: 'vue-framework-migration',
    content: {
      es: {
        title: 'Migración frontend de Vue 2 a Vue 3',
        summary: 'Migración progresiva...',
      },
      en: {
        title: 'Frontend migration from Vue 2 to Vue 3',
        summary: 'Progressive migration...',
      },
    },
  },
]
```

Ventajas:

- URLs estables.
- Menos duplicación estructural.
- Fácil validar que ambos idiomas tienen contenido.

## SEO internacional

Agregar:

- `lang` dinámico en `<html lang={locale}>`.
- `hreflang` mediante `alternates.languages`.
- Metadata localizada.
- Open Graph localizado.
- URLs canónicas por idioma.
- Sitemap con rutas `/es` y `/en`.

## Accesibilidad

Recomendaciones:

- El selector de idioma debe indicar idioma activo.
- Usar `aria-label="Cambiar idioma"` en español y `aria-label="Change language"` en inglés.
- No usar solo banderas para representar idiomas.
- Mantener textos de botones traducidos.
- Mantener foco visible en el selector.

## Orden de implementación

1. Instalar `next-intl`.
2. Crear configuración de locales en `i18n/routing.ts`.
3. Crear middleware de idioma con detección automática por navegador.
4. Reestructurar rutas bajo `app/[locale]`.
5. Crear diccionarios `es` y `en`.
6. Conectar textos del Hero y Navbar.
7. Traducir secciones principales.
8. Traducir proyectos y casos de estudio.
9. Implementar `LanguageSwitcher`.
10. Agregar metadata localizada y `hreflang`.
11. Validar accesibilidad y responsive.
12. Ejecutar TypeScript, lint y build.

## Checklist

- [ ] Instalar `next-intl`.
- [ ] Definir `es` como idioma por defecto.
- [ ] Crear rutas `/es` y `/en`.
- [ ] Redirigir `/` automáticamente según idioma del navegador.
- [ ] Usar `/es` como fallback si el idioma del navegador no está soportado.
- [ ] Traducir Hero.
- [ ] Traducir navegación.
- [ ] Traducir secciones.
- [ ] Traducir proyectos.
- [ ] Traducir casos de estudio.
- [ ] Traducir metadata.
- [ ] Agregar selector de idioma.
- [ ] Validar `lang` dinámico.
- [ ] Validar `hreflang`.
- [ ] Validar mobile.
- [ ] Validar navegación por teclado.
- [ ] Ejecutar `pnpm exec tsc --noEmit`.
- [ ] Ejecutar `pnpm lint`.
- [ ] Ejecutar `pnpm build`.

## Riesgos y mitigaciones

### Riesgo: duplicación de contenido

Mitigación:

- Mantener estructura única con contenido localizado por idioma.
- Evitar archivos completamente separados para proyectos si comparten metadata técnica.

### Riesgo: rutas rotas al cambiar idioma

Mitigación:

- Crear helper para generar URLs localizadas.
- Mantener slugs estables entre idiomas.

### Riesgo: metadata incompleta

Mitigación:

- Crear metadata desde diccionarios.
- Validar previews de `/es` y `/en`.

### Riesgo: build más complejo

Mitigación:

- Implementar i18n por fases.
- Primero traducir navegación y hero.
- Luego proyectos y casos.

## Criterio de éxito

La implementación será correcta cuando:

- `/` detecta el idioma del navegador y redirige automáticamente a `/es` o `/en`.
- `/es` muestra el portafolio completo en español.
- `/en` muestra el portafolio completo en inglés.
- El selector cambia idioma sin romper la ruta actual.
- El HTML usa `lang="es"` o `lang="en"` según corresponda.
- Cada idioma tiene metadata propia.
- Google y redes sociales pueden identificar versiones por idioma.
- TypeScript, lint y build pasan correctamente.
