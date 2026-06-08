# Plan para editar skills, subir CV y cargar imágenes en proyectos

## Objetivo

Agregar funcionalidades clave al panel de administración del portafolio para que Jonathan pueda mantener contenido importante sin tocar código:

- Editar skills desde el panel admin.
- Subir y reemplazar el CV desde el panel admin.
- Crear proyectos subiendo una imagen principal.

Estas funcionalidades deben integrarse con el futuro panel `/admin`, MongoDB como base de datos y Cloudinary como gestor de archivos e imágenes.

## Alcance del plan

Este plan cubre tres módulos:

```text
/admin/skills
/admin/cv
/admin/projects/new
```

Cada módulo debe permitir crear, editar, guardar y validar datos desde una interfaz segura protegida por autenticación.

## Stack recomendado

- **Base de datos:** MongoDB Atlas.
- **ODM:** Mongoose.
- **Storage:** Cloudinary.
- **Framework:** Next.js App Router.
- **Validación:** Zod.
- **Auth:** Auth.js o Clerk.
- **UI:** shadcn/ui o componentes propios.

## Variables de entorno necesarias

```env
MONGODB_URI="mongodb+srv://..."

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

ADMIN_EMAIL="email@jonathanleivag.cl"
AUTH_SECRET=""
```

Importante:

- No exponer `CLOUDINARY_API_SECRET` en el cliente.
- No subir `.env.local` a GitHub.
- Proteger todos los endpoints de escritura.

## Estructura de archivos propuesta

```text
app/
  admin/
    skills/
      page.tsx
    cv/
      page.tsx
    projects/
      new/
        page.tsx
  api/
    upload/
      cloudinary-signature/
        route.ts

components/
  admin/
    SkillCategoryForm.tsx
    SkillListEditor.tsx
    CvUploadForm.tsx
    ProjectForm.tsx
    ImageUploadField.tsx

lib/
  cloudinary.ts
  mongodb.ts
  validations/
    skill.ts
    cv.ts
    project.ts

models/
  SkillCategory.ts
  Asset.ts
  Project.ts
```

## Módulo 1 — Editar skills

## Objetivo del módulo

Permitir administrar categorías de skills y sus tecnologías desde el panel.

Ejemplo:

```text
Frontend
- Vue.js
- React
- TypeScript
- JavaScript

Backend
- Node.js
- Express.js
- GraphQL
```

## Ruta

```text
/admin/skills
```

## Funcionalidades

- Ver listado de categorías de skills.
- Crear nueva categoría.
- Editar nombre de categoría.
- Editar descripción de categoría.
- Agregar skills dentro de una categoría.
- Eliminar skills.
- Reordenar skills.
- Publicar/despublicar categoría.
- Reordenar categorías.
- Guardar cambios en MongoDB.

## Modelo MongoDB sugerido

```ts
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
```

## Validación con Zod

Crear:

```text
lib/validations/skill.ts
```

```ts
import { z } from 'zod'

const localizedStringSchema = z.object({
  es: z.string().min(1, 'Campo requerido'),
  en: z.string().min(1, 'Required field'),
})

export const skillCategorySchema = z.object({
  title: localizedStringSchema,
  description: localizedStringSchema.optional(),
  skills: z.array(
    z.object({
      name: z.string().min(1, 'Skill requerida'),
      level: z.string().optional(),
      order: z.number().optional(),
    })
  ),
  order: z.number().optional(),
  isPublished: z.boolean().optional(),
})
```

## UX recomendada

La pantalla debe mostrar:

```text
Skills
[+ Nueva categoría]

Frontend                  [Editar] [Despublicar]
Vue.js · React · TypeScript

Backend                   [Editar] [Despublicar]
Node.js · Express.js · GraphQL
```

Al editar:

```text
Título ES
Título EN
Descripción ES
Descripción EN
Skills
  [Vue.js] [Eliminar]
  [React] [Eliminar]
[+ Agregar skill]
[Guardar cambios]
```

## Criterio de éxito del módulo Skills

- Las categorías se editan desde `/admin/skills`.
- Los cambios se reflejan en la sección pública de skills.
- Se puede publicar/despublicar una categoría.
- Se puede agregar y eliminar skills sin modificar código.

## Módulo 2 — Subir CV nuevo

## Objetivo del módulo

Permitir subir o reemplazar el CV desde el panel admin.

El CV debe quedar disponible para los CTAs del portafolio:

```text
Descargar CV
```

## Ruta

```text
/admin/cv
```

## Estrategia recomendada

Subir el CV a Cloudinary como archivo tipo `raw` o guardar el PDF localmente en storage externo.

Recomendación:

- Usar Cloudinary `resource_type: 'raw'` para PDF.
- Guardar la URL final en MongoDB dentro de una colección `Asset`.
- Actualizar el link `profile.social.cv` o resolverlo desde DB.

## Modelo `Asset` sugerido

```ts
const assetSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ['logo', 'favicon', 'cv', 'project-image', 'og-image', 'other'],
      required: true,
    },
    url: { type: String, required: true },
    publicId: String,
    format: String,
    bytes: Number,
    originalFilename: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)
```

Para el CV:

```ts
{
  key: 'current-cv',
  type: 'cv',
  url: 'https://res.cloudinary.com/.../cv.pdf',
  publicId: 'portfolio/cv/jonathan-leiva-cv',
  isActive: true,
}
```

## Validación del CV

Reglas:

- Solo permitir `.pdf`.
- Tamaño máximo sugerido: `5MB`.
- Nombre final sugerido: `jonathan-leiva-cv.pdf`.
- Reemplazar CV anterior o marcar anterior como inactivo.

Crear:

```text
lib/validations/cv.ts
```

Reglas esperadas:

```ts
const allowedTypes = ['application/pdf']
const maxSize = 5 * 1024 * 1024
```

## UX recomendada

Pantalla:

```text
CV actual
[Ver CV] [Descargar]

Subir nuevo CV
[Seleccionar archivo PDF]
[Subir y reemplazar]
```

Estados:

- Idle: muestra CV actual.
- Uploading: muestra progreso o loading.
- Success: “CV actualizado correctamente”.
- Error: “No se pudo subir el CV”.

## Flujo de subida recomendado

```text
Admin selecciona PDF
        ↓
Frontend pide firma a route handler seguro
        ↓
Frontend sube PDF a Cloudinary como raw
        ↓
Servidor guarda URL/publicId en MongoDB
        ↓
CTA público usa nuevo CV
```

## Endpoint de firma Cloudinary

Crear:

```text
app/api/upload/cloudinary-signature/route.ts
```

Debe:

- Validar sesión admin.
- Generar firma con `CLOUDINARY_API_SECRET`.
- Permitir folder específico:

```text
portfolio/cv
```

- Retornar `signature`, `timestamp`, `apiKey`, `cloudName`.

## Criterio de éxito del módulo CV

- Se puede subir un PDF desde `/admin/cv`.
- El CV anterior deja de usarse.
- El CTA `Descargar CV` apunta al nuevo archivo.
- El archivo no requiere redeploy.
- No se expone `CLOUDINARY_API_SECRET`.

## Módulo 3 — Crear proyecto con imagen

## Objetivo del módulo

Permitir crear un proyecto desde el panel admin y subir una imagen principal durante la creación.

## Ruta

```text
/admin/projects/new
```

## Campos del formulario

```text
Título ES
Título EN
Slug
Tipo: professional | personal | freelance
Dominio
URL pública
Repositorio
Resumen ES
Resumen EN
Objetivo ES
Objetivo EN
Stack
Features ES
Features EN
Imagen principal
Estado: live | in-progress | archived
Destacado
Publicado
Orden
[Crear proyecto]
```

## Modelo `Project` sugerido

```ts
const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: localizedStringSchema,
    type: {
      type: String,
      enum: ['professional', 'personal', 'freelance'],
      required: true,
    },
    domain: String,
    url: String,
    repositoryUrl: String,
    summary: localizedStringSchema,
    objective: localizedStringSchema,
    stack: [{ type: String }],
    features: [localizedStringSchema],
    mainImage: {
      url: String,
      publicId: String,
      alt: localizedStringSchema,
      width: Number,
      height: Number,
    },
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
```

## Validación del proyecto

Crear:

```text
lib/validations/project.ts
```

Reglas:

- `title.es`: requerido.
- `title.en`: requerido.
- `slug`: requerido, lowercase, sin espacios.
- `type`: requerido.
- `summary.es`: requerido.
- `summary.en`: requerido.
- `stack`: mínimo 1 item.
- `mainImage.url`: requerido si el proyecto se publica.
- `url`: debe ser URL válida si existe.
- `repositoryUrl`: debe ser URL válida si existe.

## Subida de imagen

La imagen principal debe subirse a Cloudinary.

Folder recomendado:

```text
portfolio/projects
```

Transformación recomendada para mostrar:

```text
f_auto,q_auto,w_1200
```

Formatos permitidos:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`

Tamaño máximo sugerido:

```text
3MB
```

## UX de carga de imagen

El campo debe permitir:

- Seleccionar imagen.
- Ver preview antes de guardar.
- Ver estado de subida.
- Reemplazar imagen antes de crear.
- Mostrar error si el formato no es válido.

Ejemplo:

```text
Imagen principal
[Seleccionar imagen]

Preview:
+-------------------------+
| screenshot del proyecto |
+-------------------------+

[Crear proyecto]
```

## Flujo de creación de proyecto

```text
Admin completa formulario
        ↓
Admin selecciona imagen
        ↓
Imagen se sube a Cloudinary
        ↓
Se obtiene secure_url y public_id
        ↓
Se envía formulario completo al servidor
        ↓
Servidor valida con Zod
        ↓
Servidor guarda proyecto en MongoDB
        ↓
Se revalida home y página de proyecto
```

## Revalidación después de crear proyecto

Al crear o editar un proyecto:

```ts
revalidatePath('/')
revalidatePath('/projects')
revalidatePath(`/projects/${slug}`)
```

Si hay i18n:

```ts
revalidatePath('/es')
revalidatePath('/en')
revalidatePath(`/es/projects/${slug}`)
revalidatePath(`/en/projects/${slug}`)
```

## Criterio de éxito del módulo Proyectos

- Se puede crear un proyecto desde `/admin/projects/new`.
- Se puede subir una imagen principal.
- La imagen queda guardada en Cloudinary.
- La URL de la imagen queda guardada en MongoDB.
- El proyecto aparece en el home si está publicado/destacado.
- El proyecto tiene página de detalle.

## Seguridad general

Todos los módulos admin deben cumplir:

- Usuario autenticado.
- Email autorizado.
- Validación server-side con Zod.
- APIs protegidas.
- No exponer secrets.
- No permitir uploads sin sesión.
- Validar tipo y tamaño de archivos.

## Componentes reutilizables recomendados

### `ImageUploadField`

Responsable de:

- Validar archivo de imagen.
- Mostrar preview.
- Subir a Cloudinary.
- Retornar `url`, `publicId`, `width`, `height`.

### `FileUploadField`

Responsable de:

- Validar PDF.
- Mostrar nombre del archivo.
- Subir a Cloudinary como `raw`.
- Retornar `url`, `publicId`, `bytes`.

### `SkillListEditor`

Responsable de:

- Agregar skills.
- Eliminar skills.
- Reordenar skills.
- Editar nivel si se usa.

## Orden recomendado de implementación

1. Crear modelos MongoDB: `SkillCategory`, `Asset`, `Project`.
2. Crear validaciones Zod para skills, CV y proyectos.
3. Crear endpoint seguro para firma Cloudinary.
4. Crear componente `ImageUploadField`.
5. Crear componente `FileUploadField`.
6. Implementar `/admin/skills`.
7. Implementar `/admin/cv`.
8. Implementar `/admin/projects/new`.
9. Conectar CTAs públicos con CV desde DB.
10. Mostrar proyectos creados desde MongoDB.
11. Revalidar rutas al guardar cambios.
12. Validar accesibilidad, responsive y seguridad.

## Checklist

### Skills

- [ ] Crear modelo `SkillCategory`.
- [ ] Crear validación `skill.ts`.
- [ ] Crear pantalla `/admin/skills`.
- [ ] Crear editor de categorías.
- [ ] Crear editor de skills.
- [ ] Guardar cambios en MongoDB.
- [ ] Reflejar cambios en sección pública.

### CV

- [ ] Crear modelo `Asset` o usar colección existente.
- [ ] Crear validación de PDF.
- [ ] Crear pantalla `/admin/cv`.
- [ ] Crear componente de subida de archivo.
- [ ] Subir PDF a Cloudinary como `raw`.
- [ ] Guardar URL en MongoDB.
- [ ] Actualizar CTA público `Descargar CV`.

### Proyecto con imagen

- [ ] Crear modelo `Project`.
- [ ] Crear validación `project.ts`.
- [ ] Crear pantalla `/admin/projects/new`.
- [ ] Crear componente de subida de imagen.
- [ ] Subir imagen a Cloudinary.
- [ ] Guardar proyecto en MongoDB.
- [ ] Mostrar proyecto en home.
- [ ] Crear o actualizar página de detalle.

### Validaciones finales

- [ ] Proteger rutas `/admin`.
- [ ] Proteger endpoints de upload.
- [ ] Validar usuario admin.
- [ ] Ejecutar `pnpm exec tsc --noEmit`.
- [ ] Ejecutar `pnpm lint`.
- [ ] Ejecutar `pnpm build`.

## MVP recomendado

Para una primera versión, implementar en este orden:

1. Editar skills.
2. Subir CV nuevo.
3. Crear proyecto con imagen.

Motivo:

- Skills valida el CRUD básico.
- CV valida upload de archivo.
- Proyecto valida formulario complejo + upload de imagen + publicación.

## Criterio de éxito general

La implementación estará lista cuando:

- Jonathan puede editar skills desde `/admin/skills`.
- Jonathan puede subir un nuevo CV desde `/admin/cv`.
- El botón público de CV usa el archivo actualizado.
- Jonathan puede crear un proyecto desde `/admin/projects/new`.
- El proyecto puede incluir imagen principal subida a Cloudinary.
- Los datos quedan guardados en MongoDB.
- Los cambios se ven en el portafolio sin redeploy.
- Las rutas admin están protegidas.
- TypeScript, lint y build pasan correctamente.
