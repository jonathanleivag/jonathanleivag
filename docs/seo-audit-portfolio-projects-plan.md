# Plan para verificar SEO del portafolio y proyectos

## Objetivo

Definir un plan de revisión SEO para el portafolio y las páginas de proyectos, asegurando que el sitio sea fácil de indexar, compartir, entender por buscadores y atractivo para CTOs, reclutadores y potenciales clientes.

El foco será validar:

- SEO técnico.
- Metadata principal.
- Open Graph y Twitter Cards.
- Estructura semántica.
- Performance.
- Accesibilidad relacionada con SEO.
- Indexabilidad.
- SEO por proyecto.
- SEO internacional si se implementa i18n español/inglés.

## Alcance

Páginas a revisar:

```text
/
/es
/en
/projects/[slug]
/es/projects/[slug]
/en/projects/[slug]
/admin/* no debe indexarse
```

Secciones a evaluar:

- Home.
- Hero.
- Sobre mí.
- Proyectos.
- Proyectos personales.
- Casos de estudio.
- Skills.
- Contacto.
- Páginas de detalle de proyecto.

## Resultado esperado

Al finalizar la revisión SEO, el sitio debe tener:

- Metadata correcta por página.
- Títulos únicos.
- Descripciones claras.
- Open Graph funcional.
- Imágenes sociales optimizadas.
- Sitemap generado.
- Robots configurado.
- Canonical correcto.
- `hreflang` si hay i18n.
- Páginas de proyectos indexables.
- Buen performance en Lighthouse.
- HTML semántico.

## Herramientas recomendadas

### Locales

```bash
pnpm build
pnpm start
```

```bash
pnpm lint
pnpm exec tsc --noEmit
```

### Auditoría SEO

- Lighthouse.
- PageSpeed Insights.
- Google Search Console.
- Rich Results Test.
- Meta Tags Preview.
- Open Graph Debugger.
- Twitter Card Validator.
- Screaming Frog SEO Spider.

### Validación técnica

- Chrome DevTools.
- Network panel.
- View Source.
- `curl` para headers y HTML inicial.

Ejemplo:

```bash
curl -I https://jonathanleivag.cl
curl -L https://jonathanleivag.cl | head -100
```

## Fase 1 — SEO técnico base

### 1. Validar metadata global

Revisar en:

```text
app/layout.tsx
```

Debe incluir:

```ts
title
description
metadataBase
openGraph
twitter
icons
alternates
```

Checklist:

- [ ] `title` existe.
- [ ] `description` existe.
- [ ] `metadataBase` apunta al dominio real.
- [ ] `openGraph.title` existe.
- [ ] `openGraph.description` existe.
- [ ] `openGraph.url` existe.
- [ ] `openGraph.siteName` existe.
- [ ] `openGraph.locale` existe.
- [ ] `twitter.card` existe.
- [ ] `icons` está configurado.

### 2. Validar título principal

El título debe ser claro y específico:

```text
Jonathan Leiva Gómez | Desarrollador Full Stack Senior
```

Para inglés:

```text
Jonathan Leiva Gómez | Senior Full Stack Developer
```

Evitar títulos genéricos como:

```text
Portfolio
Home
Next App
```

### 3. Validar meta description

Debe tener entre 140 y 160 caracteres aproximadamente.

Ejemplo español:

```text
Portafolio de Jonathan Leiva Gómez, Desarrollador Full Stack Senior especializado en Vue.js, React, TypeScript, GraphQL y soluciones web escalables.
```

Ejemplo inglés:

```text
Portfolio of Jonathan Leiva Gómez, Senior Full Stack Developer specialized in Vue.js, React, TypeScript, GraphQL, and scalable web solutions.
```

Checklist:

- [ ] La descripción explica quién es.
- [ ] Incluye rol senior.
- [ ] Incluye tecnologías principales.
- [ ] No suena genérica.
- [ ] No excede demasiado el largo recomendado.

## Fase 2 — SEO semántico del Home

### 1. Validar estructura de headings

Debe existir un solo `h1` por página.

Home recomendado:

```text
h1: Desarrollo productos web con foco en escalabilidad, rendimiento y mantenibilidad.
h2: Sobre mí
h2: Proyectos destacados
h2: Proyectos personales
h2: Casos de estudio
h2: Stack técnico
h2: Contacto
```

Checklist:

- [ ] Hay un solo `h1`.
- [ ] Los `h2` describen secciones reales.
- [ ] No se saltan niveles de heading sin motivo.
- [ ] No se usan headings solo por estilo visual.

### 2. Validar contenido visible

Google debe poder leer contenido real en el HTML inicial.

Checklist:

- [ ] El rol aparece como texto, no solo imagen.
- [ ] El stack aparece como texto.
- [ ] Los proyectos tienen título y descripción textual.
- [ ] Los CTAs son links o botones accesibles.
- [ ] El contacto principal está en texto visible.

### 3. Validar anchors y navegación

La navegación debe ser clara:

```text
Inicio
Sobre mí
Proyectos
Casos
Stack
Contacto
```

Checklist:

- [ ] Los links internos funcionan.
- [ ] No hay anchors rotos.
- [ ] Header fijo no tapa títulos.
- [ ] Cada sección tiene `id` único.

## Fase 3 — SEO de proyectos

Cada proyecto debe tener una página propia:

```text
/projects/nintendo
/projects/teslo-shop
/projects/clima-go
/projects/website
```

Si hay i18n:

```text
/es/projects/nintendo
/en/projects/nintendo
```

### Metadata por proyecto

Cada proyecto debe generar metadata única.

Ejemplo:

```ts
export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug)

  return {
    title: `${project.title} | Proyecto de Jonathan Leiva Gómez`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Jonathan Leiva Gómez`,
      description: project.summary,
      images: [project.image.url],
    },
  }
}
```

Checklist por proyecto:

- [ ] Título único.
- [ ] Descripción única.
- [ ] URL canónica.
- [ ] Imagen Open Graph.
- [ ] H1 con nombre del proyecto.
- [ ] Descripción textual del proyecto.
- [ ] Stack como texto.
- [ ] Link al proyecto público.
- [ ] Alt descriptivo en imagen.

### Estructura recomendada por proyecto

```text
h1: Nintendo
p: Resumen del proyecto
Imagen principal
h2: Objetivo
h2: Stack utilizado
h2: Funcionalidades
h2: Decisiones técnicas
h2: Aprendizajes
CTA: Visitar proyecto
```

### Proyectos a validar

```text
nintendo.jonathanleivag.cl
teslo-shop.jonathanleivag.cl
clima-go.jonathanleivag.cl
website.jonathanleivag.cl
```

Checklist:

- [ ] Cada proyecto responde con status `200`.
- [ ] Cada proyecto tiene screenshot.
- [ ] Cada proyecto tiene descripción real.
- [ ] Cada proyecto tiene stack.
- [ ] Cada proyecto tiene link externo.
- [ ] Cada proyecto no muestra placeholder.

## Fase 4 — Open Graph y redes sociales

Validar cómo se ve el portafolio al compartirlo en:

- LinkedIn.
- WhatsApp.
- Twitter/X.
- Slack.
- Discord.

### Metadata Open Graph recomendada

```ts
openGraph: {
  type: 'website',
  locale: 'es_CL',
  url: 'https://jonathanleivag.cl',
  siteName: 'Jonathan Leiva Gómez',
  title: 'Jonathan Leiva Gómez | Desarrollador Full Stack Senior',
  description: '...',
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Jonathan Leiva Gómez - Desarrollador Full Stack Senior',
    },
  ],
}
```

Checklist:

- [ ] Existe imagen `1200x630`.
- [ ] La imagen pesa menos de 500KB si es posible.
- [ ] La imagen tiene buen contraste.
- [ ] Se lee bien en mobile preview.
- [ ] Cada proyecto puede tener su propia OG image.

## Fase 5 — Sitemap y robots

### Sitemap

Crear o configurar:

```text
app/sitemap.ts
```

Debe incluir:

- Home.
- Páginas de proyecto.
- Rutas por idioma si aplica.

Ejemplo:

```ts
export default async function sitemap() {
  const projects = await getPublishedProjects()

  return [
    {
      url: 'https://jonathanleivag.cl',
      lastModified: new Date(),
    },
    ...projects.map((project) => ({
      url: `https://jonathanleivag.cl/projects/${project.slug}`,
      lastModified: project.updatedAt,
    })),
  ]
}
```

Checklist:

- [ ] Existe `/sitemap.xml`.
- [ ] Incluye proyectos publicados.
- [ ] No incluye `/admin`.
- [ ] No incluye drafts.
- [ ] Tiene `lastModified` correcto.

### Robots

Crear:

```text
app/robots.ts
```

Debe permitir el sitio público y bloquear admin:

```ts
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: 'https://jonathanleivag.cl/sitemap.xml',
  }
}
```

Checklist:

- [ ] Existe `/robots.txt`.
- [ ] Bloquea `/admin`.
- [ ] Bloquea `/api` si corresponde.
- [ ] Apunta a sitemap.

## Fase 6 — Canonical e i18n

Si se implementa español e inglés:

```text
/es
/en
```

Debe existir `hreflang`.

Checklist:

- [ ] `/es` tiene canonical a `/es`.
- [ ] `/en` tiene canonical a `/en`.
- [ ] `/es` referencia alternativa `/en`.
- [ ] `/en` referencia alternativa `/es`.
- [ ] Existe fallback `x-default` si aplica.
- [ ] El atributo `lang` del HTML cambia según idioma.

Ejemplo:

```ts
alternates: {
  canonical: `/${locale}`,
  languages: {
    es: '/es',
    en: '/en',
    'x-default': '/es',
  },
}
```

## Fase 7 — Performance SEO

SEO depende mucho de performance, especialmente Core Web Vitals.

Validar:

- LCP.
- CLS.
- INP.
- Peso JS.
- Imágenes.
- Fuentes.

Checklist:

- [ ] Imágenes usan `next/image`.
- [ ] Imágenes tienen `width` y `height`.
- [ ] No hay layout shift en Hero.
- [ ] Logo no genera CLS.
- [ ] Screenshots están optimizados.
- [ ] Fuentes no bloquean build ni render.
- [ ] No hay dependencias cliente innecesarias.

### Problema conocido a revisar

Si se usa `next/font/google`, el build puede fallar en entornos sin red.

Recomendación:

- Usar fuentes locales con `next/font/local`.
- Evitar dependencia de red en build.

## Fase 8 — Accesibilidad que impacta SEO

Checklist:

- [ ] Imágenes relevantes tienen `alt` descriptivo.
- [ ] Imágenes decorativas tienen `alt=""`.
- [ ] Links tienen texto claro.
- [ ] Botones tienen propósito claro.
- [ ] El contenido es navegable por teclado.
- [ ] Contraste suficiente.
- [ ] El formulario de contacto tiene labels.
- [ ] No hay contenido importante solo en imágenes.

## Fase 9 — Indexabilidad

Validar que las páginas públicas sean indexables.

Checklist:

- [ ] No hay `noindex` en home.
- [ ] No hay `noindex` en proyectos publicados.
- [ ] `/admin` sí debe ser `noindex` o estar bloqueado.
- [ ] Las páginas devuelven status `200`.
- [ ] Proyectos inexistentes devuelven `404` con `notFound()`.
- [ ] No hay redirects innecesarios.
- [ ] No hay contenido placeholder indexable.

## Fase 10 — Contenido orientado a conversión

SEO no solo es técnico; el contenido debe responder intención de búsqueda y evaluación profesional.

Checklist Home:

- [ ] El hero explica qué haces.
- [ ] El stack principal aparece temprano.
- [ ] Hay proyectos reales.
- [ ] Hay casos de estudio o resúmenes técnicos.
- [ ] Hay CTA de contacto.
- [ ] Hay CV disponible.

Checklist Proyecto:

- [ ] Explica qué es el proyecto.
- [ ] Explica objetivo técnico.
- [ ] Explica stack.
- [ ] Explica decisiones tomadas.
- [ ] Muestra imagen.
- [ ] Tiene link público.

## Fase 11 — Datos estructurados

Agregar JSON-LD para perfil profesional.

Tipo recomendado:

- `Person`
- `WebSite`
- `CreativeWork` para proyectos si aplica.

Ejemplo `Person`:

```ts
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jonathan Leiva Gómez',
  jobTitle: 'Desarrollador Full Stack Senior',
  url: 'https://jonathanleivag.cl',
  sameAs: [
    'https://github.com/jonathanleivag',
    'https://www.linkedin.com/in/jonathanleivag',
  ],
}
```

Checklist:

- [ ] JSON-LD válido.
- [ ] No contiene datos falsos.
- [ ] Se valida con Rich Results Test.

## Fase 12 — Checklist final por página

### Home

- [ ] Title único.
- [ ] Description única.
- [ ] H1 único.
- [ ] Open Graph image.
- [ ] Canonical.
- [ ] Texto suficiente.
- [ ] CTA claro.
- [ ] Lighthouse SEO sobre 90.

### Proyecto

- [ ] Title único.
- [ ] Description única.
- [ ] H1 con nombre del proyecto.
- [ ] Screenshot con alt.
- [ ] Stack como texto.
- [ ] Link externo.
- [ ] Open Graph por proyecto.
- [ ] Canonical.
- [ ] Status 200 si existe.
- [ ] Status 404 si no existe.

### Admin

- [ ] No indexable.
- [ ] Protegido con auth.
- [ ] No aparece en sitemap.
- [ ] No aparece en navegación pública.

## Orden recomendado de implementación

1. Corregir metadata global.
2. Crear `robots.ts`.
3. Crear `sitemap.ts`.
4. Agregar Open Graph image principal.
5. Agregar metadata dinámica por proyecto.
6. Corregir páginas de proyecto placeholder.
7. Agregar canonical.
8. Agregar `hreflang` si hay i18n.
9. Optimizar imágenes y fuentes.
10. Validar Lighthouse.
11. Configurar Google Search Console.
12. Enviar sitemap a Google Search Console.

## Checklist de herramientas

- [ ] Lighthouse local.
- [ ] PageSpeed Insights.
- [ ] Google Search Console.
- [ ] Open Graph Debugger.
- [ ] Twitter Card Validator.
- [ ] Rich Results Test.
- [ ] Validador de sitemap.
- [ ] Revisión manual en mobile.

## Métricas objetivo

```text
Lighthouse SEO: 90+
Lighthouse Accessibility: 90+
Lighthouse Best Practices: 90+
Lighthouse Performance: 80+ inicial, 90+ ideal
CLS: menor a 0.1
LCP: menor a 2.5s
INP: menor a 200ms
```

## Riesgos y mitigaciones

### Riesgo: páginas de proyecto con placeholder

Mitigación:

- No indexar páginas incompletas.
- Completar contenido antes de publicar.
- Usar `isPublished` si el contenido viene desde DB.

### Riesgo: metadata duplicada

Mitigación:

- Generar metadata dinámica por slug.
- Usar slugs únicos.

### Riesgo: imágenes pesadas

Mitigación:

- Usar Cloudinary con `f_auto,q_auto`.
- Usar `next/image`.
- Definir dimensiones.

### Riesgo: admin indexado

Mitigación:

- Bloquear `/admin` en robots.
- Agregar `noindex` si corresponde.
- No incluirlo en sitemap.

## Criterio de éxito

La revisión SEO estará completa cuando:

- El home tiene metadata completa.
- Cada proyecto publicado tiene metadata única.
- Existe sitemap con páginas públicas.
- Existe robots bloqueando admin.
- Open Graph funciona al compartir links.
- Las imágenes están optimizadas.
- No hay páginas placeholder indexables.
- Google Search Console puede leer el sitemap.
- Lighthouse SEO supera 90.
