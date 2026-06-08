# Plan para guardar el portafolio en MongoDB y crear panel de administración

## Objetivo

Guardar todo el contenido del portafolio en **MongoDB** y crear un panel de administración privado para gestionar proyectos, información profesional, skills, casos de estudio, assets y contenido SEO sin modificar código.

El portafolio debe pasar de usar archivos estáticos en `/content` a consumir contenido desde base de datos.

## Resultado esperado

Crear un panel privado:

```text
/admin
```

Desde el panel se debe poder administrar:

```text
Dashboard
├── Perfil
├── Experiencia
├── Educación
├── Certificaciones
├── Skills
├── Proyectos profesionales
├── Proyectos personales
├── Casos de estudio
├── Assets
├── SEO
└── Configuración
```

El sitio público debe consumir datos desde MongoDB para renderizar:

- Home del portafolio.
- Hero.
- Sobre mí.
- Skills.
- Experiencia.
- Proyectos.
- Proyectos personales.
- Casos de estudio.
- Metadata SEO.
- Contenido en español e inglés.

## Stack recomendado

- **Base de datos:** MongoDB Atlas.
- **ODM:** Mongoose.
- **Framework:** Next.js App Router.
- **Auth admin:** Auth.js o Clerk.
- **Validación:** Zod.
- **Imágenes:** Cloudinary.
- **Email contacto:** Resend.
- **UI admin:** shadcn/ui o componentes propios.

## Por qué MongoDB

MongoDB funciona bien para este caso porque el contenido del portafolio es flexible y documental:

- Proyectos con estructuras variables.
- Casos de estudio con secciones dinámicas.
- Contenido multidioma anidado.
- Skills agrupadas por categoría.
- Assets con metadata flexible.
- Menos rigidez que un modelo relacional.

## Arquitectura general

```text
MongoDB Atlas
     ↑↓
Mongoose Models
     ↑↓
Server Components / Server Actions / Route Handlers
     ↑↓
Sitio público + Panel admin
```

## Estructura de archivos propuesta

```text
app/
  admin/
    page.tsx
    profile/
      page.tsx
    projects/
      page.tsx
      new/
        page.tsx
      [id]/
        page.tsx
    skills/
      page.tsx
    case-studies/
      page.tsx
    assets/
      page.tsx
    seo/
      page.tsx
  api/
    admin/
      projects/
        route.ts
    upload/
      cloudinary-signature/
        route.ts

lib/
  mongodb.ts
  data/
    profile.ts
    projects.ts
    skills.ts
    case-studies.ts
    seo.ts
  validations/
    profile.ts
    project.ts
    skill.ts
    case-study.ts
    asset.ts

models/
  Profile.ts
  Project.ts
  SkillCategory.ts
  Experience.ts
  Education.ts
  Certification.ts
  Asset.ts
  SeoMetadata.ts
  AdminUser.ts

components/
  admin/
    AdminLayout.tsx
    AdminSidebar.tsx
    ProjectForm.tsx
    SkillForm.tsx
    ProfileForm.tsx
```

## Variables de entorno

Crear o actualizar `.env.local`:

```env
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/portfolio"
MONGODB_DB="portfolio"

AUTH_SECRET=""
ADMIN_EMAIL="email@jonathanleivag.cl"

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

RESEND_API_KEY=""
CONTACT_TO_EMAIL=""
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

Importante:

- No subir `.env.local` a GitHub.
- Confirmar que `.env.local` esté en `.gitignore`.
- No exponer `MONGODB_URI`, `CLOUDINARY_API_SECRET` ni `RESEND_API_KEY` en cliente.

## Instalación de dependencias

```bash
pnpm add mongoose zod
```

Para autenticación con Auth.js:

```bash
pnpm add next-auth
```

Para Cloudinary:

```bash
pnpm add cloudinary
```

Para Resend:

```bash
pnpm add resend
```

## Conexión a MongoDB

Crear archivo:

```text
lib/mongodb.ts
```

Contenido sugerido:

```ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined')
}

type CachedConnection = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

const globalForMongoose = globalThis as unknown as {
  mongoose?: CachedConnection
}

const cached = globalForMongoose.mongoose ?? {
  conn: null,
  promise: null,
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  globalForMongoose.mongoose = cached

  return cached.conn
}
```

## Modelo de contenido multidioma

Para evitar duplicar documentos, se recomienda guardar textos localizados dentro de objetos:

```ts
title: {
  es: string,
  en: string,
}
summary: {
  es: string,
  en: string,
}
```

Ventajas:

- Un solo documento por proyecto.
- Slug estable.
- Fácil cambiar idioma en frontend.
- Más simple que colecciones separadas por idioma.

## Modelo `Profile`

Archivo:

```text
models/Profile.ts
```

Schema sugerido:

```ts
import { Schema, model, models } from 'mongoose'

const localizedStringSchema = new Schema(
  {
    es: { type: String, required: true },
    en: { type: String, required: true },
  },
  { _id: false }
)

const profileSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String },
    role: { type: localizedStringSchema, required: true },
    headline: { type: localizedStringSchema, required: true },
    summary: { type: localizedStringSchema, required: true },
    about: {
      body: [localizedStringSchema],
      highlights: [
        {
          title: localizedStringSchema,
          description: localizedStringSchema,
        },
      ],
    },
    social: {
      github: String,
      linkedin: String,
      email: String,
      cv: String,
    },
    availability: localizedStringSchema,
  },
  { timestamps: true }
)

export const Profile = models.Profile || model('Profile', profileSchema)
```

## Modelo `Project`

Archivo:

```text
models/Project.ts
```

Schema sugerido:

```ts
import { Schema, model, models } from 'mongoose'

const localizedStringSchema = new Schema(
  {
    es: { type: String, required: true },
    en: { type: String, required: true },
  },
  { _id: false }
)

const imageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: localizedStringSchema,
    width: Number,
    height: Number,
    publicId: String,
    order: { type: Number, default: 0 },
  },
  { _id: false }
)

const caseStudySectionSchema = new Schema(
  {
    title: localizedStringSchema,
    body: localizedStringSchema,
    order: { type: Number, default: 0 },
  },
  { _id: false }
)

const caseStudySchema = new Schema(
  {
    intro: localizedStringSchema,
    context: localizedStringSchema,
    challenge: localizedStringSchema,
    solution: localizedStringSchema,
    result: localizedStringSchema,
    sections: [caseStudySectionSchema],
  },
  { _id: false }
)

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: localizedStringSchema, required: true },
    type: {
      type: String,
      enum: ['professional', 'personal', 'freelance'],
      required: true,
    },
    domain: String,
    url: String,
    repositoryUrl: String,
    summary: { type: localizedStringSchema, required: true },
    objective: localizedStringSchema,
    stack: [{ type: String }],
    features: [localizedStringSchema],
    technicalHighlights: [localizedStringSchema],
    learning: localizedStringSchema,
    images: [imageSchema],
    caseStudy: caseStudySchema,
    status: {
      type: String,
      enum: ['live', 'in-progress', 'archived'],
      default: 'live',
    },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Project = models.Project || model('Project', projectSchema)
```

## Modelo `SkillCategory`

Archivo:

```text
models/SkillCategory.ts
```

Schema sugerido:

```ts
import { Schema, model, models } from 'mongoose'

const localizedStringSchema = new Schema(
  {
    es: { type: String, required: true },
    en: { type: String, required: true },
  },
  { _id: false }
)

const skillCategorySchema = new Schema(
  {
    title: localizedStringSchema,
    description: localizedStringSchema,
    skills: [
      {
        name: { type: String, required: true },
        level: String,
        order: { type: Number, default: 0 },
      },
    ],
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const SkillCategory =
  models.SkillCategory || model('SkillCategory', skillCategorySchema)
```

## Modelo `Experience`

Archivo:

```text
models/Experience.ts
```

Campos sugeridos:

```text
company
role.es
role.en
location
startDate
endDate
isCurrent
summary.es
summary.en
highlights[].es
highlights[].en
stack[]
order
isPublished
createdAt
updatedAt
```

## Modelo `Education`

Campos sugeridos:

```text
institution
title.es
title.en
focus.es
focus.en
period
order
isPublished
```

## Modelo `Certification`

Campos sugeridos:

```text
title
issuer
url
issuedAt
order
isPublished
```

## Modelo `Asset`

Archivo:

```text
models/Asset.ts
```

Campos sugeridos:

```text
key
type: logo | favicon | project-image | og-image | other
url
publicId
alt.es
alt.en
width
height
format
isActive
createdAt
updatedAt
```

## Modelo `SeoMetadata`

Archivo:

```text
models/SeoMetadata.ts
```

Campos sugeridos:

```text
route
locale
title
description
ogImage
canonical
keywords[]
```

Índice recomendado:

```ts
seoMetadataSchema.index({ route: 1, locale: 1 }, { unique: true })
```

## Datos iniciales a migrar

Migrar desde:

```text
content/profile.ts
content/projects.ts
content/case-studies.ts
content/skills.ts
```

También considerar planes actuales para:

- Proyectos personales.
- Resend contact form.
- Cloudinary assets.
- i18n español/inglés.

## Script seed

Crear:

```text
scripts/seed-mongodb.ts
```

Responsabilidades:

- Conectar a MongoDB.
- Limpiar colecciones si se ejecuta en desarrollo.
- Insertar perfil.
- Insertar skills.
- Insertar proyectos profesionales.
- Insertar proyectos personales.
- Insertar assets base.
- Insertar metadata SEO inicial.

Comando sugerido en `package.json`:

```json
{
  "scripts": {
    "db:seed": "tsx scripts/seed-mongodb.ts"
  }
}
```

Dependencia para ejecutar scripts TypeScript:

```bash
pnpm add -D tsx
```

## Capa de datos pública

Crear funciones server-side:

```text
lib/data/profile.ts
lib/data/projects.ts
lib/data/skills.ts
lib/data/seo.ts
```

Ejemplo:

```ts
import { connectToDatabase } from '@/lib/mongodb'
import { Project } from '@/models/Project'

export async function getFeaturedProjects() {
  await connectToDatabase()

  return Project.find({
    isPublished: true,
    isFeatured: true,
  })
    .sort({ order: 1 })
    .lean()
}
```

## Consumo en Server Components

Actualizar `app/page.tsx` para consultar datos:

```tsx
export default async function Home() {
  const profile = await getProfile()
  const projects = await getFeaturedProjects()
  const skills = await getSkillCategories()

  return (
    <main>
      <Hero profile={profile} />
      <Projects projects={projects} />
      <Skills skills={skills} />
    </main>
  )
}
```

## Panel de administración

Ruta principal:

```text
app/admin/page.tsx
```

Secciones del panel:

```text
/admin/profile
/admin/experience
/admin/education
/admin/certifications
/admin/skills
/admin/projects
/admin/projects/new
/admin/projects/[id]
/admin/assets
/admin/seo
```

## CRUD de proyectos

El panel debe permitir:

- Listar proyectos.
- Crear proyecto.
- Editar proyecto.
- Publicar/despublicar.
- Marcar como destacado.
- Cambiar orden.
- Agregar stack.
- Agregar features.
- Agregar imágenes.
- Agregar o editar caso de estudio.
- Eliminar o archivar.

## CRUD de perfil

Debe permitir editar:

- Nombre.
- Rol español/inglés.
- Headline español/inglés.
- Resumen español/inglés.
- Sobre mí.
- Highlights.
- Links sociales.
- CV.
- Email.

## CRUD de skills

Debe permitir:

- Crear categoría.
- Editar título español/inglés.
- Editar descripción español/inglés.
- Agregar skills.
- Ordenar skills.
- Publicar/despublicar categoría.

## CRUD de assets

Debe permitir:

- Subir imagen a Cloudinary.
- Guardar URL y `publicId` en MongoDB.
- Definir tipo de asset.
- Asociar imagen a proyecto.
- Cambiar logo.
- Cambiar OG image.

## Subida de imágenes con Cloudinary

Flujo seguro:

```text
Admin selecciona imagen
        ↓
Frontend pide firma a /api/upload/cloudinary-signature
        ↓
Servidor firma con CLOUDINARY_API_SECRET
        ↓
Frontend sube imagen a Cloudinary
        ↓
Se guarda URL/publicId en MongoDB
```

Nunca exponer:

```env
CLOUDINARY_API_SECRET
```

## Autenticación del admin

Opciones:

### Opción A — Auth.js con GitHub

Recomendada si quieres mantener control dentro de Next.js.

Variables:

```env
AUTH_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
ADMIN_EMAIL="email@jonathanleivag.cl"
```

La app debe permitir acceso solo si el email del usuario coincide con `ADMIN_EMAIL`.

### Opción B — Clerk

Más rápida si quieres login administrado y UI lista.

### Recomendación

Usar **Auth.js con GitHub OAuth** para un portafolio personal.

## Protección de rutas admin

Proteger:

```text
/admin/:path*
/api/admin/:path*
/api/upload/:path*
```

Reglas:

- Usuario autenticado.
- Email autorizado.
- Mutaciones solo desde servidor.
- Validación con Zod.

## Validación con Zod

Crear schemas:

```text
lib/validations/profile.ts
lib/validations/project.ts
lib/validations/skill.ts
lib/validations/asset.ts
lib/validations/seo.ts
```

Todas las mutaciones deben validar en servidor.

## Server Actions vs Route Handlers

### Server Actions

Útiles para:

- Crear proyecto.
- Editar proyecto.
- Actualizar perfil.
- Editar skills.
- Publicar/despublicar.

### Route Handlers

Útiles para:

- Firma de Cloudinary.
- APIs del admin si se usan formularios cliente complejos.
- Operaciones con fetch desde componentes client.

## Estado de publicación

Cada documento editable debe incluir:

```text
isPublished
order
createdAt
updatedAt
```

Para proyectos además:

```text
isFeatured
status
```

Esto permite:

- Borradores.
- Orden manual.
- Destacar proyectos en home.
- Ocultar contenido incompleto.

## SEO desde MongoDB

Guardar metadata en colección `SeoMetadata`:

```text
route
locale
title
description
ogImage
canonical
keywords[]
```

Usar `generateMetadata` para leer desde MongoDB:

```ts
export async function generateMetadata({ params }) {
  const seo = await getSeoMetadata('/', params.locale)

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
  }
}
```

## i18n con MongoDB

El contenido debe responder según locale:

```ts
function getLocalized<T extends { es: string; en: string }>(value: T, locale: 'es' | 'en') {
  return value[locale] ?? value.es
}
```

Fallback:

- Si falta inglés, usar español.
- Si falta español, mostrar campo disponible.

## Cache y revalidación

Como el contenido cambia solo desde admin, usar cache.

Opciones:

- `unstable_cache`.
- `revalidatePath` al guardar.
- `revalidateTag` para tags como `projects`, `profile`, `skills`.

Recomendación:

- Cachear consultas públicas.
- Revalidar desde Server Actions al guardar cambios.

Ejemplo:

```ts
revalidatePath('/')
revalidatePath('/projects')
revalidatePath(`/projects/${slug}`)
```

## UX del panel admin

Principios:

- Simple y funcional.
- Formulario claro.
- Feedback inmediato al guardar.
- Botones visibles: Guardar, Publicar, Despublicar, Cancelar.
- Confirmación antes de eliminar.
- Preferir archivar/despublicar antes que borrar.
- Preview de imágenes.
- Preview de contenido localizado.

## Dashboard admin

Mostrar:

- Total de proyectos.
- Proyectos publicados.
- Proyectos destacados.
- Skills activas.
- Última actualización.
- Estado de assets principales.
- Acceso rápido a crear proyecto.

## MVP recomendado

Para evitar sobrediseñar, comenzar con:

- MongoDB Atlas.
- Mongoose.
- Auth admin.
- CRUD de proyectos.
- CRUD de skills.
- Edición de perfil.
- Imágenes por URL Cloudinary.
- Publicar/despublicar.
- Orden manual.
- Sitio público leyendo desde MongoDB.

Dejar para fase 2:

- CRUD experiencia.
- CRUD educación.
- CRUD certificaciones.
- SEO editable.
- Upload firmado Cloudinary.
- Preview mode.
- Audit logs.
- Roles múltiples.

## Fase 1 — Setup base

1. Crear cluster en MongoDB Atlas.
2. Crear usuario y password.
3. Configurar IP allowlist.
4. Obtener `MONGODB_URI`.
5. Agregar variables en `.env.local`.
6. Instalar `mongoose` y `zod`.
7. Crear `lib/mongodb.ts`.
8. Crear modelos iniciales.

## Fase 2 — Migración de contenido

1. Crear script seed.
2. Migrar `profile.ts`.
3. Migrar `skills.ts`.
4. Migrar `projects.ts`.
5. Migrar `case-studies.ts`.
6. Agregar proyectos personales.
7. Verificar datos en MongoDB Atlas.

## Fase 3 — Consumo público

1. Crear capa `lib/data`.
2. Actualizar `app/page.tsx`.
3. Pasar datos como props a secciones.
4. Actualizar páginas dinámicas de proyectos.
5. Agregar `notFound()` para slugs inválidos.
6. Agregar metadata dinámica.

## Fase 4 — Admin MVP

1. Configurar autenticación.
2. Proteger `/admin`.
3. Crear layout admin.
4. Crear dashboard.
5. Crear CRUD proyectos.
6. Crear CRUD skills.
7. Crear edición de perfil.
8. Agregar publish/draft.
9. Agregar orden manual.

## Fase 5 — Assets y Cloudinary

1. Agregar colección `Asset`.
2. Guardar URLs de imágenes.
3. Asociar imágenes a proyectos.
4. Implementar upload firmado.
5. Validar imágenes en cards y detalle.

## Fase 6 — SEO e i18n

1. Agregar metadata desde MongoDB.
2. Agregar contenido `es/en` en todos los documentos.
3. Conectar con sistema i18n.
4. Agregar `hreflang`.
5. Generar sitemap desde MongoDB.

## Seguridad

Requisitos:

- Proteger `/admin`.
- Proteger APIs de escritura.
- Validar email admin.
- Validar inputs con Zod.
- No exponer secrets.
- No permitir uploads sin sesión.
- Sanitizar contenido si se permite HTML.
- Usar rate limit si hay endpoints públicos de escritura.

## Backups

Configurar en MongoDB Atlas:

- Backups automáticos si el plan lo permite.
- Export manual inicial después del seed.
- Descargar copia JSON de contenido relevante.

## Riesgos y mitigaciones

### Riesgo: documentos demasiado grandes

Mitigación:

- Mantener imágenes como URLs, no archivos binarios.
- Si un caso de estudio crece mucho, mover secciones a colección separada.

### Riesgo: contenido inconsistente entre idiomas

Mitigación:

- Validar que `es` y `en` existan en campos principales.
- Agregar fallback a español.

### Riesgo: panel inseguro

Mitigación:

- Auth obligatoria.
- Whitelist por email.
- APIs admin protegidas.

### Riesgo: performance por consultas frecuentes

Mitigación:

- Usar `.lean()` en queries públicas.
- Crear índices para `slug`, `isPublished`, `isFeatured`, `order`.
- Cachear contenido público.

## Índices recomendados

En MongoDB/Mongoose:

```ts
projectSchema.index({ slug: 1 }, { unique: true })
projectSchema.index({ isPublished: 1, isFeatured: 1, order: 1 })
projectSchema.index({ type: 1, isPublished: 1 })
skillCategorySchema.index({ isPublished: 1, order: 1 })
seoMetadataSchema.index({ route: 1, locale: 1 }, { unique: true })
```

## Checklist MVP

- [ ] Crear MongoDB Atlas cluster.
- [ ] Obtener `MONGODB_URI`.
- [ ] Instalar `mongoose`.
- [ ] Instalar `zod`.
- [ ] Crear `lib/mongodb.ts`.
- [ ] Crear modelos `Profile`, `Project`, `SkillCategory`.
- [ ] Crear seed desde `/content`.
- [ ] Crear capa `lib/data`.
- [ ] Hacer que home lea desde MongoDB.
- [ ] Crear auth admin.
- [ ] Proteger `/admin`.
- [ ] Crear dashboard admin.
- [ ] Crear CRUD proyectos.
- [ ] Crear CRUD skills.
- [ ] Crear edición perfil.
- [ ] Agregar publicación/draft.
- [ ] Agregar orden manual.
- [ ] Validar TypeScript.
- [ ] Ejecutar lint.
- [ ] Ejecutar build.

## Checklist fase 2

- [ ] CRUD experiencia.
- [ ] CRUD educación.
- [ ] CRUD certificaciones.
- [ ] CRUD assets.
- [ ] Upload firmado Cloudinary.
- [ ] SEO editable.
- [ ] Sitemap desde MongoDB.
- [ ] i18n completo desde DB.
- [ ] Preview de contenido.
- [ ] Audit logs.
- [ ] Backups configurados.

## Comandos de validación

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

Nota: si el build falla por `next/font/google`, resolver con fuente local o ejecutar en entorno con red. Ese problema es independiente de MongoDB.

## Criterio de éxito

La implementación estará completa cuando:

- El contenido principal del portafolio vive en MongoDB.
- El home consume perfil, skills y proyectos desde MongoDB.
- Los proyectos se pueden crear, editar, publicar y ordenar desde `/admin`.
- El perfil profesional se puede editar desde `/admin`.
- Las imágenes se gestionan como URLs de Cloudinary.
- El panel está protegido por autenticación.
- El contenido soporta español e inglés.
- Las páginas públicas mantienen SEO dinámico.
- TypeScript, lint y build pasan correctamente.

## Recomendación final

Implementar primero un MVP pequeño:

1. MongoDB conectado.
2. Proyectos desde DB.
3. Skills desde DB.
4. Perfil desde DB.
5. Admin protegido para editar esos tres módulos.

Después avanzar a casos de estudio, assets, SEO editable, experiencia, educación y uploads firmados.

La prioridad debe ser mantener el panel simple y útil, no construir un CMS demasiado complejo desde el inicio.
