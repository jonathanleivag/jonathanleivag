# Plan de instalación de Cloudinary

## Objetivo

Instalar y dejar preparada la librería oficial de Cloudinary en el portafolio para poder subir, transformar y servir imágenes desde Cloudinary de forma segura.

## 1. Dependencia a instalar

Usar el SDK oficial de Cloudinary para Node.js:

```bash
pnpm add cloudinary
```

Si el proyecto usa otro gestor de paquetes:

```bash
npm install cloudinary
# o
 yarn add cloudinary
```

## 2. Variables de entorno necesarias

Crear o actualizar el archivo `.env.local` con las credenciales de Cloudinary:

```env
CLOUDINARY_CLOUD_NAME="tu_cloud_name"
CLOUDINARY_API_KEY="tu_api_key"
CLOUDINARY_API_SECRET="tu_api_secret"
```

Estas variables se obtienen desde el dashboard de Cloudinary.

Importante:

- No subir `.env.local` al repositorio.
- Confirmar que `.env.local` esté incluido en `.gitignore`.
- Nunca exponer `CLOUDINARY_API_SECRET` en componentes cliente.

## 3. Crear configuración del SDK

Crear un archivo para centralizar la configuración:

```text
lib/cloudinary.ts
```

Contenido sugerido:

```ts
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }
```

## 4. Uso recomendado en Next.js

Cloudinary debe usarse en contexto server-side:

- Server Actions
- Route Handlers
- API routes
- Scripts backend
- Server Components si solo se consultan recursos públicos

No usar directamente el SDK con `api_secret` dentro de componentes con `'use client'`.

## 5. Ejemplo de subida desde servidor

Ejemplo base para usar en una route handler o server action:

```ts
import { cloudinary } from '@/lib/cloudinary'

export async function uploadImage(filePath: string) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'portfolio',
    resource_type: 'image',
  })

  return {
    publicId: result.public_id,
    secureUrl: result.secure_url,
    width: result.width,
    height: result.height,
  }
}
```

## 6. Configurar dominios remotos para imágenes

Si se usará `next/image` con URLs de Cloudinary, actualizar `next.config.ts`:

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

## 7. Validaciones después de instalar

Ejecutar:

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

Resultado esperado:

- TypeScript sin errores.
- Lint sin errores relacionados con la nueva configuración.
- Build funcionando correctamente.

Nota: actualmente el build puede fallar si el entorno no tiene acceso a Google Fonts por `next/font/google`. Ese problema es independiente de Cloudinary.

## 8. Checklist de implementación

- [ ] Instalar `cloudinary` con `pnpm add cloudinary`.
- [ ] Crear variables en `.env.local`.
- [ ] Confirmar que `.env.local` esté ignorado por Git.
- [ ] Crear `lib/cloudinary.ts`.
- [ ] Configurar `next.config.ts` si se usará `next/image`.
- [ ] Usar Cloudinary solo desde servidor cuando requiera credenciales privadas.
- [ ] Ejecutar `tsc`, `lint` y `build`.

## 9. Recomendación de seguridad

Para subidas desde frontend, no enviar `api_secret` al navegador. Usar una de estas estrategias:

1. Subida firmada mediante endpoint server-side.
2. Upload preset unsigned con restricciones estrictas en Cloudinary.
3. Server Action que reciba el archivo y haga la subida desde servidor.

La opción más segura para producción es usar subidas firmadas desde backend.
