# Plan para integrar Link Preview de Aceternity UI

## Objetivo

Integrar el componente **Link Preview** de Aceternity UI en el portafolio para mostrar previews visuales al pasar el mouse sobre enlaces importantes, manteniendo el diseño oscuro actual, buen rendimiento y compatibilidad con Next.js App Router.

## Resultado esperado

- Componente reutilizable `LinkPreview` en `components/ui`.
- Previews para proyectos, enlaces externos, casos destacados y redes profesionales.
- Integración progresiva sin romper ISR diario ni el comportamiento estático.
- Buen soporte de accesibilidad, mobile y `prefers-reduced-motion`.

## Estado actual del proyecto

Stack detectado:

```text
Next.js 16
React 19
Tailwind CSS 4
shadcn/ui
tw-animate-css
next-intl
MongoDB/Mongoose
```

Dependencias útiles ya existentes:

```text
clsx
tailwind-merge
lucide-react
```

Dependencia requerida que falta:

```text
framer-motion
```

Instalación recomendada:

```bash
pnpm add framer-motion
```

## Ubicación del componente

Crear:

```text
components/ui/LinkPreview.tsx
```

Debe ser Client Component:

```ts
'use client'
```

Motivo:

- Maneja estado de hover.
- Usa eventos del mouse.
- Renderiza animaciones con `framer-motion`.
- Controla aparición y salida de la preview en cliente.

## API recomendada

Props sugeridas:

```ts
type LinkPreviewProps = {
  children: React.ReactNode
  url: string
  imageSrc?: string
  imageAlt?: string
  title?: string
  description?: string
  className?: string
  previewClassName?: string
  openInNewTab?: boolean
  disabled?: boolean
}
```

Ejemplo de uso:

```tsx
<LinkPreview
  url={project.url}
  imageSrc={project.image?.src}
  imageAlt={project.image?.alt}
  title={project.title}
  description={project.summary}
>
  {project.domain}
</LinkPreview>
```

## Diseño visual

Adaptar el componente al estilo actual del portafolio.

Estilo recomendado para la card de preview:

```text
bg-zinc-950
border border-white/10
rounded-xl
shadow-2xl
overflow-hidden
ring-1 ring-emerald-500/10
max-w-sm
```

Contenido de la preview:

- Imagen o screenshot.
- Título.
- Descripción corta.
- URL o dominio.

Estados a cubrir:

- Hover en desktop.
- Focus visible para teclado.
- Reduced motion sin animaciones excesivas.
- Mobile con enlace normal sin overlay en primera versión.

## Fuentes de datos

### Proyectos

Usar datos del mapper público de proyectos:

```text
project.url
project.domain
project.title
project.summary
project.image.src
project.image.alt
```

### Casos de estudio

Cuando los casos estén en MongoDB, usar:

```text
caseStudy.slug
caseStudy.title
caseStudy.intro
caseStudy.seo.image
```

### Contacto y redes

Usar datos desde perfil/MongoDB:

```text
profile.social.github
profile.social.linkedin
profile.social.cv
```

Para redes sociales, usar assets de Cloudinary o una imagen administrable desde `Asset`.

## Puntos de integración

### `components/ui/ProjectCard.tsx`

Integrar `LinkPreview` en el enlace externo del proyecto o dominio.

Beneficio:

- Permite ver un screenshot antes de abrir el proyecto.

### `components/ui/PersonalProjectCard.tsx`

Integrar `LinkPreview` en el CTA del proyecto personal.

Beneficio:

- Mejora la exploración de proyectos con imagen previa.

### `components/sections/CaseStudies.tsx`

Integrar después de migrar casos de estudio a MongoDB.

Beneficio:

- Preview del caso o proyecto relacionado.

### `components/sections/Contact.tsx`

Integrar en GitHub, LinkedIn y CV.

Evitar usarlo en email o botón de copiar para no interferir con la interacción principal.

## Consideraciones con Server Components

`LinkPreview` será client, pero debe recibir datos desde Server Components.

Patrón recomendado:

```text
Server Component lee MongoDB
        ↓
Mapper devuelve props serializables
        ↓
Client Component LinkPreview maneja hover
```

Evitar:

- Consultar MongoDB dentro de `LinkPreview`.
- Pasar documentos Mongoose crudos al cliente.
- Pasar funciones desde Server Components.

## Imágenes y Cloudinary

El proyecto ya permite imágenes desde Cloudinary en `next.config.ts`.

Recomendación:

- Usar screenshots guardados en Cloudinary.
- Guardar `url`, `alt`, `width`, `height` y `publicId` en MongoDB.
- Evitar depender de screenshots externos de otros dominios.

Si se usan imágenes externas, actualizar:

```text
next.config.ts → images.remotePatterns
```

## Accesibilidad

Requisitos mínimos:

- Mantener `href` real.
- Mantener navegación por teclado.
- Usar `target="_blank"` y `rel="noopener noreferrer"` en enlaces externos.
- No mostrar información crítica solo dentro del hover.
- Mantener estilos `focus-visible`.
- Respetar `prefers-reduced-motion`.

## Mobile

En mobile no existe hover confiable.

Primera versión recomendada:

- Desactivar preview en touch/mobile.
- Mantener el enlace normal.
- Evitar overlays que bloqueen navegación.

Mejora futura:

- Mostrar preview con primer tap.
- Cerrar preview al tocar fuera.

## Performance

Riesgo principal:

- `framer-motion` puede aumentar el bundle del cliente.

Mitigaciones:

- Usar `LinkPreview` solo en enlaces relevantes.
- No usarlo en navegación principal ni links pequeños.
- Considerar import dinámico si impacta demasiado.

Ejemplo opcional:

```ts
const LinkPreview = dynamic(
  () => import('@/components/ui/LinkPreview').then((mod) => mod.LinkPreview),
  { ssr: false }
)
```

Usar import dinámico solo si el build muestra impacto relevante.

## Plan de implementación

### Fase 1: Dependencia

- Instalar `framer-motion`.
- Verificar compatibilidad con React 19 y Next 16.
- Ejecutar build después de instalar.

### Fase 2: Componente base

- Crear `components/ui/LinkPreview.tsx`.
- Adaptar el código de Aceternity al estilo del portfolio.
- Usar `cn` desde `lib/utils.ts`.
- Usar `next/image` para previews con imagen.
- Agregar fallback visual cuando no haya imagen.

### Fase 3: Proyectos

- Actualizar `ProjectCard.tsx`.
- Actualizar `PersonalProjectCard.tsx`.
- Usar `project.image.src` como preview.
- Renderizar enlace normal si falta `url`.

### Fase 4: Contacto

- Integrar en GitHub, LinkedIn y CV.
- Mantener email/copy button sin preview.
- Usar imágenes administradas desde MongoDB/Cloudinary si existen.

### Fase 5: UX y responsive

- Ajustar posición para evitar que salga del viewport.
- Reducir animaciones con `prefers-reduced-motion`.
- Desactivar overlay en mobile.
- Revisar contraste y legibilidad.

### Fase 6: Validación

- Ejecutar `pnpm lint`.
- Ejecutar `pnpm build`.
- Probar `/es` y `/en`.
- Verificar hover en desktop.
- Verificar navegación en mobile.
- Confirmar que la home mantiene `revalidate = 86400`.

## Checklist técnico

- [ ] `framer-motion` instalado.
- [ ] Existe `components/ui/LinkPreview.tsx`.
- [ ] `LinkPreview` usa `'use client'`.
- [ ] `LinkPreview` no consulta MongoDB.
- [ ] Props serializables desde Server Components.
- [ ] `ProjectCard.tsx` usa preview si hay `url`.
- [ ] `PersonalProjectCard.tsx` usa preview si hay `url`.
- [ ] Enlaces externos usan `rel="noopener noreferrer"`.
- [ ] Mobile conserva navegación simple.
- [ ] `pnpm build` pasa correctamente.

## Riesgos y mitigaciones

### Riesgo: aumentar demasiado el bundle JS

Mitigación:

- Integrar solo en enlaces de alto valor.
- Evaluar import dinámico si el bundle crece demasiado.

### Riesgo: mala experiencia mobile

Mitigación:

- Desactivar previews en touch para la primera versión.
- Mantener enlaces normales como fallback.

### Riesgo: imágenes externas bloqueadas por Next

Mitigación:

- Usar Cloudinary como fuente principal.
- Actualizar `images.remotePatterns` solo si es necesario.

### Riesgo: preview fuera del viewport

Mitigación:

- Usar ancho máximo fijo.
- Ajustar posición según borde izquierdo/derecho.
- Probar cards cerca de los bordes.

## Decisión recomendada

Integrar Link Preview primero en `ProjectCard` y `PersonalProjectCard`, usando screenshots desde Cloudinary/MongoDB.

Después extenderlo a `Contact` y `CaseStudies` si aporta valor sin sobrecargar la interfaz.
