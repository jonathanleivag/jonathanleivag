# Plan para usar logo y favicon con Cloudinary

## Objetivo

Centralizar los assets principales del portafolio en Cloudinary, específicamente el logo y el favicon, para poder servirlos optimizados, versionados y fáciles de reemplazar sin tocar archivos estáticos del proyecto.

## Assets a preparar

### Logo

Formato recomendado:

- `SVG` si el logo es vectorial.
- `PNG` transparente si el logo tiene detalles rasterizados.
- Tamaño recomendado para PNG: mínimo `512x512px` o superior.
- Nombre sugerido en Cloudinary: `portfolio/logo`.

### Favicon

Formatos recomendados:

- `favicon.ico` para compatibilidad clásica.
- `PNG` en tamaños `32x32`, `48x48`, `180x180` y `512x512`.
- Nombre sugerido en Cloudinary: `portfolio/favicon`.

## Estrategia recomendada

Usar Cloudinary para el logo visible dentro de la UI y mantener una copia local del favicon en `app/favicon.ico` o `public/favicon.ico`.

Motivo:

- El logo puede cargarse desde CDN sin problema.
- El favicon es un asset crítico que navegadores, bots y previews solicitan muy temprano.
- Mantener el favicon local reduce riesgos si Cloudinary tarda, cambia la URL o falla la red.

## Opción A — Logo desde Cloudinary y favicon local

Esta es la opción recomendada.

### 1. Subir logo a Cloudinary

Subir el logo al folder:

```text
portfolio/logo
```

URL esperada:

```text
https://res.cloudinary.com/<cloud-name>/image/upload/v<version>/portfolio/logo.png
```

O si es SVG:

```text
https://res.cloudinary.com/<cloud-name>/image/upload/v<version>/portfolio/logo.svg
```

### 2. Crear constante para assets

Crear archivo:

```text
content/assets.ts
```

Contenido sugerido:

```ts
export const assets = {
  logo: {
    src: 'https://res.cloudinary.com/<cloud-name>/image/upload/v<version>/portfolio/logo.png',
    alt: 'Logo de Jonathan Leiva Gómez',
    width: 48,
    height: 48,
  },
  favicon: {
    ico: '/favicon.ico',
    png32: '/favicon-32x32.png',
    appleTouchIcon: '/apple-touch-icon.png',
  },
} as const
```

### 3. Usar logo en componentes

En `Navbar`, `Footer` o `Hero`, usar `next/image`:

```tsx
import Image from 'next/image'
import { assets } from '@/content/assets'

<Image
  src={assets.logo.src}
  alt={assets.logo.alt}
  width={assets.logo.width}
  height={assets.logo.height}
  priority
/>
```

Usar `priority` solo si el logo aparece en el primer viewport.

### 4. Configurar Cloudinary en `next.config.ts`

Para permitir imágenes remotas con `next/image`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig
```

### 5. Mantener favicon local

Ubicar archivos en:

```text
app/favicon.ico
public/favicon-32x32.png
public/apple-touch-icon.png
```

Actualizar metadata en `app/layout.tsx`:

```ts
export const metadata = {
  title: profile.metaTitle,
  description: profile.metaDescription,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}
```

## Opción B — Logo y favicon desde Cloudinary

Esta opción es posible, pero menos recomendable para favicon.

### Metadata con favicon remoto

```ts
export const metadata = {
  title: profile.metaTitle,
  description: profile.metaDescription,
  icons: {
    icon: 'https://res.cloudinary.com/<cloud-name>/image/upload/v<version>/portfolio/favicon-32x32.png',
    apple: 'https://res.cloudinary.com/<cloud-name>/image/upload/v<version>/portfolio/apple-touch-icon.png',
  },
}
```

### Riesgos

- Algunos navegadores cachean agresivamente favicons.
- Cambios de URL pueden tardar en reflejarse.
- Si Cloudinary no responde, el favicon puede no cargar.
- El favicon remoto agrega dependencia externa a un asset crítico.

## Transformaciones útiles de Cloudinary

### Logo optimizado

```text
f_auto,q_auto,w_96
```

Ejemplo:

```text
https://res.cloudinary.com/<cloud-name>/image/upload/f_auto,q_auto,w_96/portfolio/logo
```

### Favicon PNG 32x32

```text
f_png,w_32,h_32,c_fit
```

Ejemplo:

```text
https://res.cloudinary.com/<cloud-name>/image/upload/f_png,w_32,h_32,c_fit/portfolio/favicon
```

### Apple touch icon

```text
f_png,w_180,h_180,c_fit
```

Ejemplo:

```text
https://res.cloudinary.com/<cloud-name>/image/upload/f_png,w_180,h_180,c_fit/portfolio/favicon
```

## Recomendación UX/UI

El logo debe ser simple, legible y coherente con el tono senior del portafolio.

Buenas prácticas:

- Evitar logos con demasiados detalles.
- Usar una versión monocromática o con acento sutil.
- Mantener buen contraste en fondo oscuro.
- Asegurar que funcione en tamaños pequeños.
- No depender solo del logo: mostrar también el nombre `Jonathan Leiva Gómez`.

## Recomendación SEO

El favicon y el logo ayudan a mejorar reconocimiento visual, pero no reemplazan una buena metadata.

Validar también:

- `metadata.title`
- `metadata.description`
- `openGraph.images`
- `twitter.images`
- `themeColor`
- `manifest` si se quiere soporte PWA básico

## Checklist de implementación

- [ ] Crear o exportar logo en `SVG` o `PNG` transparente.
- [ ] Crear favicon en `.ico` y PNGs principales.
- [ ] Subir logo a Cloudinary en folder `portfolio/logo`.
- [ ] Definir URL final del logo con `f_auto,q_auto`.
- [ ] Crear `content/assets.ts`.
- [ ] Configurar `remotePatterns` para `res.cloudinary.com`.
- [ ] Reemplazar texto/logo en `Navbar` si corresponde.
- [ ] Mantener favicon local en `app/favicon.ico`.
- [ ] Agregar icons en metadata de `app/layout.tsx`.
- [ ] Validar en desktop, mobile y preview del navegador.
- [ ] Ejecutar `pnpm exec tsc --noEmit`.
- [ ] Ejecutar `pnpm lint`.
- [ ] Ejecutar `pnpm build`.

## Orden sugerido

1. Definir versiones finales de logo y favicon.
2. Subir logo a Cloudinary.
3. Mantener favicon local para estabilidad.
4. Crear `content/assets.ts`.
5. Configurar `next.config.ts` para Cloudinary.
6. Integrar logo en `Navbar` y `Footer`.
7. Actualizar metadata de icons.
8. Validar carga, responsive, accesibilidad y SEO.

## Criterio de éxito

La implementación se considera correcta cuando:

- El logo carga desde Cloudinary sin layout shift.
- El logo tiene `alt` descriptivo.
- El favicon aparece correctamente en el navegador.
- El sitio no depende de credenciales privadas para mostrar assets públicos.
- `next/image` acepta la URL remota sin errores.
- TypeScript, lint y build pasan correctamente.
