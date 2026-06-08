# Plan de integración de proyectos personales

## Objetivo

Mostrar proyectos personales destacados en el inicio del portafolio mediante cards visuales. Al hacer clic en una card, el usuario debe ver un resumen del proyecto con una imagen de la web, descripción, stack, objetivo técnico y enlaces relevantes.

Proyectos iniciales:

- `nintendo.jonathanleivag.cl`
- `teslo-shop.jonathanleivag.cl`
- `clima-go.jonathanleivag.cl`
- `website.jonathanleivag.cl`

## Resultado esperado en UX

En el inicio del portafolio debe existir una sección tipo:

```text
Proyectos personales

[Card Nintendo]   [Card Teslo Shop]
[Card Clima Go]   [Card Website]
```

Al pinchar una card:

```text
/projects/nintendo
```

Debe mostrar:

- Imagen o screenshot de la web.
- Nombre del proyecto.
- URL pública.
- Resumen del proyecto.
- Problema u objetivo.
- Stack utilizado.
- Principales funcionalidades.
- Aprendizajes o decisiones técnicas.
- CTA para visitar el proyecto.
- CTA para volver al portafolio.

## Estrategia recomendada

Crear un modelo de contenido para proyectos personales y reutilizar componentes para cards y página de detalle.

Separar:

- Datos del proyecto.
- Card visual.
- Página o vista de detalle.
- Assets o imágenes.

Esto evita hardcodear contenido en componentes y facilita agregar nuevos proyectos después.

## Estructura de archivos propuesta

```text
content/
  personal-projects.ts

components/
  sections/
    PersonalProjects.tsx
  ui/
    PersonalProjectCard.tsx

app/
  projects/
    [slug]/
      page.tsx

public/
  projects/
    nintendo.webp
    teslo-shop.webp
    clima-go.webp
    website.webp
```

Si se usará Cloudinary para imágenes:

```text
content/
  assets.ts
```

Y las imágenes podrían venir desde:

```text
https://res.cloudinary.com/<cloud-name>/image/upload/f_auto,q_auto,w_1200/portfolio/projects/nintendo
```

## Modelo de datos sugerido

Crear archivo:

```text
content/personal-projects.ts
```

Contenido sugerido:

```ts
export type PersonalProject = {
  slug: string
  title: string
  domain: string
  url: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  summary: string
  objective: string
  stack: string[]
  features: string[]
  technicalHighlights: string[]
  learning: string
  status: 'live' | 'in-progress' | 'archived'
}

export const personalProjects: PersonalProject[] = [
  {
    slug: 'nintendo',
    title: 'Nintendo Project',
    domain: 'nintendo.jonathanleivag.cl',
    url: 'https://nintendo.jonathanleivag.cl',
    image: {
      src: '/projects/nintendo.webp',
      alt: 'Screenshot del proyecto Nintendo',
      width: 1200,
      height: 800,
    },
    summary: 'Proyecto personal inspirado en una experiencia web relacionada con Nintendo.',
    objective: 'Practicar construcción de interfaces visuales, navegación responsive y presentación de contenido interactivo.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Interfaz responsive',
      'Cards de contenido',
      'Navegación clara',
      'Diseño visual orientado a producto',
    ],
    technicalHighlights: [
      'Componentización de UI',
      'Optimización visual para mobile',
      'Separación entre contenido y presentación',
    ],
    learning: 'Refuerza habilidades de UI, composición visual y experiencia responsive.',
    status: 'live',
  },
]
```

## Contenido base por proyecto

### Nintendo

```ts
{
  slug: 'nintendo',
  title: 'Nintendo',
  domain: 'nintendo.jonathanleivag.cl',
  url: 'https://nintendo.jonathanleivag.cl',
  summary: 'Proyecto personal inspirado en una experiencia visual de Nintendo, enfocado en UI, responsive design y presentación atractiva de contenido.',
  objective: 'Construir una interfaz visualmente sólida, clara y adaptable a distintos dispositivos.',
  stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
}
```

### Teslo Shop

```ts
{
  slug: 'teslo-shop',
  title: 'Teslo Shop',
  domain: 'teslo-shop.jonathanleivag.cl',
  url: 'https://teslo-shop.jonathanleivag.cl',
  summary: 'Proyecto e-commerce personal para practicar arquitectura de tienda online, catálogo, detalle de producto y flujos orientados a conversión.',
  objective: 'Demostrar capacidad para construir una experiencia de compra funcional, escalable y mantenible.',
  stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
}
```

### Clima Go

```ts
{
  slug: 'clima-go',
  title: 'Clima Go',
  domain: 'clima-go.jonathanleivag.cl',
  url: 'https://clima-go.jonathanleivag.cl',
  summary: 'Aplicación de clima enfocada en consumo de datos externos, visualización clara de información y experiencia rápida para consulta diaria.',
  objective: 'Practicar integración con APIs, manejo de estados y presentación simple de datos útiles.',
  stack: ['React', 'TypeScript', 'API Integration', 'CSS'],
}
```

### Website

```ts
{
  slug: 'website',
  title: 'Website',
  domain: 'website.jonathanleivag.cl',
  url: 'https://website.jonathanleivag.cl',
  summary: 'Sitio web personal orientado a marca profesional, presentación de perfil y estructura visual clara.',
  objective: 'Construir una presencia digital limpia, rápida y fácil de navegar.',
  stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
}
```

## Sección en el inicio

Crear componente:

```text
components/sections/PersonalProjects.tsx
```

Responsabilidades:

- Mostrar título de sección.
- Mostrar texto introductorio breve.
- Renderizar una grid de cards.
- Usar `personalProjects.map(...)`.
- Mantener diseño responsive.

Ejemplo de estructura visual:

```tsx
<section id="personal-projects">
  <SectionHeader
    label="Proyectos personales"
    title="Experimentos y productos propios"
    subtitle="Proyectos donde practico arquitectura, UI, APIs y experiencias completas."
  />

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {personalProjects.map((project) => (
      <PersonalProjectCard key={project.slug} project={project} />
    ))}
  </div>
</section>
```

## Card del proyecto

Crear componente:

```text
components/ui/PersonalProjectCard.tsx
```

La card debe incluir:

- Imagen de la web.
- Título.
- Dominio.
- Resumen corto.
- Stack principal en chips.
- CTA: `Ver proyecto` o `Ver resumen`.

Comportamiento:

- Click en toda la card o CTA.
- Navegar a `/projects/[slug]`.
- Hover sutil en desktop.
- Focus visible para teclado.
- Imagen con `alt` descriptivo.

## Página de detalle

Usar ruta existente o crear:

```text
app/projects/[slug]/page.tsx
```

Responsabilidades:

- Buscar proyecto por `slug`.
- Si no existe, usar `notFound()`.
- Renderizar imagen grande.
- Mostrar resumen y objetivo.
- Mostrar stack.
- Mostrar funcionalidades.
- Mostrar decisiones técnicas.
- Mostrar aprendizaje.
- CTA para visitar proyecto.
- CTA para volver al inicio.

Ejemplo de lógica:

```ts
import { notFound } from 'next/navigation'
import { personalProjects } from '@/content/personal-projects'

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = personalProjects.find((item) => item.slug === slug)

  if (!project) notFound()

  return <ProjectDetail project={project} />
}
```

## Metadata por proyecto

Cada proyecto debe generar metadata dinámica:

```ts
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = personalProjects.find((item) => item.slug === slug)

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    }
  }

  return {
    title: `${project.title} | Jonathan Leiva Gómez`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Jonathan Leiva Gómez`,
      description: project.summary,
      images: [project.image.src],
    },
  }
}
```

## Imágenes de los proyectos

### Opción A — Imágenes locales

Guardar screenshots en:

```text
public/projects/nintendo.webp
public/projects/teslo-shop.webp
public/projects/clima-go.webp
public/projects/website.webp
```

Ventajas:

- No dependen de servicios externos.
- Fácil de versionar.
- Buen control para SEO y previews.

### Opción B — Imágenes desde Cloudinary

Subir screenshots a:

```text
portfolio/projects/nintendo
portfolio/projects/teslo-shop
portfolio/projects/clima-go
portfolio/projects/website
```

Usar URLs optimizadas:

```text
f_auto,q_auto,w_1200
```

Ventajas:

- Optimización automática.
- Fácil reemplazo de screenshots.
- CDN global.

Recomendación:

- Usar Cloudinary si ya estará configurado para assets.
- Usar imágenes locales si se busca simplicidad inicial.

## Responsive design

### Mobile

- Grid de una columna.
- Imagen arriba, contenido debajo.
- CTA en ancho completo.
- Chips de stack con wrap.
- Evitar textos largos en la card.

### Tablet

- Grid de dos columnas.
- Cards con altura consistente.
- Imagen con aspect ratio fijo.

### Desktop

- Grid de cuatro columnas si las cards son compactas.
- Alternativa: grid de dos columnas si se quiere mostrar más descripción.
- Hover con elevación sutil.

## Accesibilidad

- Las cards deben ser navegables por teclado.
- Usar `Link` de `next/link`, no `<a>` para rutas internas.
- Agregar `alt` descriptivo en screenshots.
- No depender solo de color para estados.
- Asegurar contraste suficiente en textos secundarios.
- Usar `focus-visible` en cards y CTAs.
- El CTA debe tener texto claro: `Ver resumen de Nintendo`, no solo `Ver más`.

## SEO

- Cada detalle de proyecto debe tener metadata propia.
- Usar Open Graph image con screenshot.
- Agregar enlaces externos con `rel="noopener noreferrer"`.
- Usar dominios públicos completos.
- Incluir texto descriptivo real, no solo imagen.

## Performance

- Usar `next/image` para screenshots.
- Definir `width` y `height` para evitar layout shift.
- Usar `priority` solo para imágenes visibles en el primer viewport.
- Lazy loading para cards más abajo.
- Optimizar screenshots a `.webp` o usar Cloudinary con `f_auto,q_auto`.

## Orden de implementación

1. Crear `content/personal-projects.ts`.
2. Preparar screenshots de los 4 proyectos.
3. Decidir si las imágenes serán locales o Cloudinary.
4. Crear `PersonalProjectCard.tsx`.
5. Crear `PersonalProjects.tsx`.
6. Agregar sección al `app/page.tsx`.
7. Implementar detalle en `app/projects/[slug]/page.tsx`.
8. Agregar metadata dinámica por proyecto.
9. Validar responsive mobile/tablet/desktop.
10. Validar accesibilidad por teclado.
11. Ejecutar TypeScript, lint y build.

## Checklist

- [ ] Crear modelo `PersonalProject`.
- [ ] Agregar los 4 proyectos al contenido.
- [ ] Crear screenshots optimizados.
- [ ] Crear card reutilizable.
- [ ] Crear sección de proyectos personales.
- [ ] Mostrar sección en el inicio.
- [ ] Crear página de detalle por slug.
- [ ] Agregar `notFound()` para slugs inválidos.
- [ ] Agregar metadata dinámica.
- [ ] Agregar CTAs a URLs públicas.
- [ ] Validar que los enlaces externos abran correctamente.
- [ ] Validar mobile.
- [ ] Validar foco y navegación por teclado.
- [ ] Ejecutar `pnpm exec tsc --noEmit`.
- [ ] Ejecutar `pnpm lint`.
- [ ] Ejecutar `pnpm build`.

## Criterio de éxito

La implementación estará completa cuando:

- El inicio muestra las 4 cards de proyectos personales.
- Cada card tiene imagen, título, dominio, resumen y CTA.
- Al pinchar una card se abre un detalle con resumen completo.
- Cada detalle tiene imagen grande de la web.
- Cada detalle incluye stack, funcionalidades y aprendizaje.
- Cada proyecto tiene CTA para visitar la URL pública.
- La experiencia funciona bien en mobile y desktop.
- TypeScript, lint y build pasan correctamente.
