# Plan para que todo el contenido del portafolio venga desde MongoDB

## Objetivo

Migrar el portafolio para que todo el contenido editable venga desde **MongoDB**, manteniendo Next.js como sitio público cacheado con ISR diario.

El código debe conservar únicamente estructura, componentes, estilos, lógica de render, validaciones y textos técnicos no editables. El contenido profesional, textos visibles, proyectos, assets, SEO y datos de contacto deben vivir en MongoDB.

## Estado actual detectado

Ya existen modelos MongoDB para parte del contenido:

```text
models/Profile.ts
models/Project.ts
models/SkillCategory.ts
models/Experience.ts
models/Asset.ts
models/shared.ts
```

Ya existe una capa inicial de datos:

```text
lib/data/profile.ts
lib/data/projects.ts
lib/data/skills.ts
lib/data/public-portfolio.ts
```

Ya existe un seed parcial:

```text
scripts/seed-mongodb.ts
```

Contenido que todavía depende de archivos estáticos o traducciones locales:

```text
content/profile.ts
content/projects.ts
content/personal-projects.ts
content/case-studies.ts
content/skills.ts
content/assets.ts
messages/es.json
messages/en.json
components/sections/Contact.tsx
components/sections/CaseStudies.tsx
components/ui/Terminal.tsx
```

## Principio de separación

### Debe vivir en MongoDB

- Perfil profesional, hero, about y disponibilidad.
- Experiencia laboral, educación y certificaciones.
- Skills y categorías.
- Proyectos profesionales, personales y freelance.
- Casos de estudio.
- Datos de contacto y redes sociales.
- Assets administrables: logo, CV, imágenes de proyectos y Open Graph.
- Metadata SEO editable.
- Configuración pública del sitio: navegación, footer y URLs canónicas.

### Puede quedarse en código o `messages`

- Labels genéricos de interfaz como `Ver proyecto`, `Copiar`, `Enviar` o `Cargando`.
- Textos de accesibilidad reutilizables.
- Validaciones de formulario.
- Estructura visual de componentes.
- Clases CSS, layouts, animaciones e iconos.

Si se quiere que absolutamente todo texto visible sea administrable, se puede crear una colección `SiteCopy`. Para evitar complejidad inicial, se recomienda mover primero el contenido profesional y dejar microcopy genérico en `messages`.

## Colecciones recomendadas

### `profiles`

Ya existe `Profile.ts`. Debe ser la fuente única para datos personales, hero, about, contacto y terminal.

Campos actuales útiles:

```text
name
handle
email
location
role.es / role.en
headline.es / headline.en
summary.es / summary.en
availability.es / availability.en
about.body[].es / about.body[].en
about.highlights[].title.es / title.en
about.highlights[].description.es / description.en
social.github
social.linkedin
social.email
social.cv
createdAt
updatedAt
```

Campos sugeridos a agregar:

```text
terminal.lines[].prefix
terminal.lines[].text.es / text.en
terminal.lines[].isOutput
contact.description.es / contact.description.en
contact.cta.es / contact.cta.en
seo.defaultTitle.es / seo.defaultTitle.en
seo.defaultDescription.es / seo.defaultDescription.en
```

Uso público:

- `Hero`.
- `About`.
- `Contact`.
- `Terminal`.
- Metadata global.

### `projects`

Ya existe `Project.ts`. Debe cubrir proyectos profesionales, personales y freelance usando el campo `type`.

Campos actuales útiles:

```text
slug
title.es / title.en
type: professional | personal | freelance
domain
url
repositoryUrl
category
summary.es / summary.en
objective.es / objective.en
stack[]
features[].es / features[].en
technicalHighlights[].es / technicalHighlights[].en
learning.es / learning.en
value.es / value.en
image.url
image.alt
image.width
image.height
image.publicId
status: live | in-progress | archived
isFeatured
isPublished
order
createdAt
updatedAt
```

Campos sugeridos a agregar:

```text
context.es / context.en
role.es / role.en
challenge.es / challenge.en
result.es / result.en
source
seo.title.es / seo.title.en
seo.description.es / seo.description.en
seo.imageAssetKey
```

Uso público:

- Sección de proyectos profesionales.
- Sección de proyectos personales.
- Páginas detalle de proyectos.
- Sitemap.
- Metadata SEO por proyecto.

### `caseStudies`

Actualmente los casos de estudio están en `content/case-studies.ts`. Crear modelo nuevo:

```text
models/CaseStudy.ts
```

Campos recomendados:

```text
slug
title.es / title.en
intro.es / intro.en
context.es / context.en
role.es / role.en
challenge.es / challenge.en
approach[].es / approach[].en
technicalDecisions[].es / technicalDecisions[].en
result.es / result.en
stack[]
source
relatedProjectSlug
isFeatured
isPublished
order
seo.title.es / seo.title.en
seo.description.es / seo.description.en
createdAt
updatedAt
```

Uso público:

- `components/sections/CaseStudies.tsx`.
- Página detalle de caso de estudio si se separa de proyectos.
- Sitemap.
- Metadata SEO por caso.

### `skillCategories`

Ya existe `SkillCategory.ts`.

Campos actuales útiles:

```text
title.es / title.en
description.es / description.en
skills[]
order
isPublished
createdAt
updatedAt
```

Campos sugeridos a agregar:

```text
icon
level
group: frontend | backend | mobile | tools | education | other
```

### `experiences`

Ya existe `Experience.ts`, pero actualmente no se usa en la home pública.

Campos actuales útiles:

```text
company
role.es / role.en
location
period
isCurrent
highlights[].es / highlights[].en
stack[]
order
isPublished
createdAt
updatedAt
```

Campos sugeridos a agregar:

```text
startDate
endDate
employmentType
companyUrl
logoAssetKey
```

### `assets`

Ya existe `Asset.ts`.

Campos actuales útiles:

```text
key
type: logo | favicon | cv | project-image | og-image | other
url
publicId
format
bytes
originalFilename
isActive
createdAt
updatedAt
```

Campos sugeridos a agregar:

```text
alt.es / alt.en
width
height
usage
relatedCollection
relatedSlug
```

Uso público:

- Logo.
- Favicon metadata.
- CV descargable.
- Imágenes de proyectos.
- Imagen Open Graph.

### `siteSettings`

Crear modelo nuevo:

```text
models/SiteSettings.ts
```

Campos recomendados:

```text
siteName
siteUrl
defaultLocale
availableLocales[]
navigation[].label.es / label.en
navigation[].href
footer.text.es / footer.text.en
contact.email
contact.toEmail
contact.fromEmail
analytics.enabled
analytics.provider
isMaintenanceMode
updatedAt
```

### `seoMetadata`

Crear modelo nuevo si no se decide incrustar SEO en cada documento:

```text
models/SeoMetadata.ts
```

Campos recomendados:

```text
route
locale
title
description
canonical
ogImageAssetKey
robots
priority
changeFrequency
updatedAt
```

## Cambios por archivo

### `lib/data/profile.ts`

Objetivo:

- Dejar de usar `content/profile.ts` como fuente primaria.
- Mantener fallback local solo para emergencia.
- Exponer objetos públicos ya localizados.

Funciones sugeridas:

```text
getProfile()
getPublicProfile(locale)
getPublicContact(locale)
getPublicTerminal(locale)
```

### `lib/data/projects.ts`

Objetivo:

- Completar el mapper para no perder campos de MongoDB.
- Usar `type` para separar professional, personal y freelance.
- Agregar detalle por slug.

Funciones sugeridas:

```text
getPublicProfessionalProjects(locale)
getPublicPersonalProjects(locale)
getPublicProjectBySlug(locale, slug)
getPublicProjectSlugs()
```

Campos públicos que debe devolver el mapper:

```text
slug
title
category
summary
context
objective
value
features[]
technicalHighlights[]
learning
stack[]
url
repositoryUrl
domain
status
image
seo
```

### `lib/data/skills.ts`

Objetivo:

- Leer categorías publicadas desde MongoDB.
- Ordenar por `order`.
- Localizar `title` y `description`.

### `lib/data/case-studies.ts`

Crear archivo nuevo con:

```text
getPublicCaseStudies(locale)
getPublicCaseStudyBySlug(locale, slug)
getPublicCaseStudySlugs()
```

### `lib/data/assets.ts`

Crear archivo nuevo con:

```text
getAssetByKey(key)
getPublicLogo(locale)
getPublicCv()
getPublicOgImage(route, locale)
```

### `lib/data/site-settings.ts`

Crear archivo nuevo con:

```text
getPublicSiteSettings(locale)
getPublicNavigation(locale)
getPublicFooter(locale)
```

### `components/sections/Contact.tsx`

Problema actual:

- Es client component y lee `profile` desde `content/profile.ts`.

Plan:

- Convertir `Contact.tsx` en Server Component que lea `getPublicContact(locale)`.
- Extraer la interacción de copiar email a un componente client pequeño.
- Pasar `email`, `github` y `linkedin` como props desde MongoDB.

Estructura propuesta:

```text
components/sections/Contact.tsx
components/ui/ContactLinks.tsx
components/ui/ContactForm.tsx
```

### `components/sections/CaseStudies.tsx`

Problema actual:

- Usa `content/case-studies.ts` directamente.

Plan:

- Reemplazar import estático por `getPublicCaseStudies(locale)`.
- Mantener fallback solo en la capa de datos, no en el componente.

### `components/ui/Terminal.tsx`

Problema actual:

- Usa `content/profile.ts` en cliente.

Plan:

- Recibir `lines` por props desde `Hero`.
- Construir líneas desde `Profile.terminal.lines` o desde `Profile + SkillCategory`.
- No importar contenido estático en el componente client.

### `app/[locale]/page.tsx`

Objetivo:

- Seguir usando ISR diario.
- Pasar `locale` a todas las secciones.
- Evitar `cookies()`, `headers()` o `force-dynamic` en la home pública.

Debe mantenerse:

```ts
export const revalidate = 86400
```

### `app/sitemap.ts`

Objetivo:

- Generar URLs desde MongoDB.
- Incluir proyectos y casos publicados.
- Usar `updatedAt` como `lastModified`.

### `app/opengraph-image.tsx`

Objetivo:

- Usar datos desde `Profile`, `Asset` o `SeoMetadata`.
- Mantener fallback si MongoDB no responde.

## Plan de migración por fases

### Fase 1: Consolidar modelos existentes

- Revisar `Profile`, `Project`, `SkillCategory`, `Experience` y `Asset`.
- Agregar campos faltantes sin romper datos ya guardados.
- Crear índices para `slug`, `isPublished`, `order`, `type` y `updatedAt`.
- Mantener `localizedStringSchema` para todo texto editable en español e inglés.

### Fase 2: Crear modelos faltantes

- Crear `CaseStudy.ts`.
- Crear `SiteSettings.ts`.
- Crear `SeoMetadata.ts` si no se incrusta SEO en cada colección.
- Definir tipos TypeScript públicos para los mappers.

### Fase 3: Completar seed inicial

- Actualizar `scripts/seed-mongodb.ts`.
- Migrar desde `content/profile.ts`.
- Migrar desde `content/projects.ts`.
- Migrar desde `content/personal-projects.ts`.
- Migrar desde `content/case-studies.ts`.
- Migrar desde `content/skills.ts`.
- Migrar desde `content/assets.ts`.
- Migrar `messages/es.json` y `messages/en.json` solo si se decide administrar copy de secciones desde MongoDB.
- Hacer seed idempotente con `findOneAndUpdate` y `upsert`.
- Evitar duplicados en ejecuciones repetidas.

### Fase 4: Crear capa pública única de datos

- Centralizar lecturas públicas en `lib/data/*`.
- Evitar imports desde `/content` en componentes.
- Devolver datos ya localizados y normalizados.
- Mantener fallback local dentro de `lib/data`, no dentro de UI.

### Fase 5: Migrar componentes sección por sección

Orden recomendado:

1. `Hero` y `Terminal`.
2. `About`.
3. `Projects`.
4. `PersonalProjects`.
5. `CaseStudies`.
6. `Skills`.
7. `Contact`.
8. Navigation, footer, SEO y sitemap.

### Fase 6: Reducir dependencia de `/content`

Cuando MongoDB esté funcionando:

- Mantener `/content` solo como fallback temporal.
- Crear `content/fallback.ts` si se quiere centralizar emergencia.
- Evitar que componentes importen `content/*` directamente.
- Documentar qué fallback se conserva y cuándo eliminarlo.

### Fase 7: Admin y edición de contenido

El panel admin debe permitir CRUD para:

```text
Profile
Experience
SkillCategory
Project
CaseStudy
Asset
SiteSettings
SeoMetadata
```

Después de guardar cambios importantes:

- Revalidar rutas afectadas usando `/api/revalidate`.
- Mantener ISR diario como respaldo.
- Mostrar estado de publicación y última actualización.

### Fase 8: Validación y seguridad

- Validar entrada del admin con Zod.
- Sanitizar slugs.
- Validar URLs externas.
- No exponer datos privados de MongoDB al cliente.
- Solo publicar documentos con `isPublished: true`.
- Usar `lean()` para lecturas públicas.
- Normalizar `_id` y fechas antes de pasar datos a componentes client.

## Checklist de contenido en MongoDB

- [ ] Nombre, handle, rol, ubicación y disponibilidad.
- [ ] Hero headline y subtítulo.
- [ ] About summary, body y highlights.
- [ ] Email, GitHub, LinkedIn y CV.
- [ ] Líneas o datos del terminal visual.
- [ ] Proyectos profesionales.
- [ ] Proyectos personales.
- [ ] Features, highlights técnicos, aprendizajes y valor de proyectos.
- [ ] Casos de estudio completos.
- [ ] Skills y categorías.
- [ ] Experiencia laboral.
- [ ] Assets: logo, favicon, CV, imágenes y OG image.
- [ ] SEO global y por página.
- [ ] Navegación y footer si se quieren editables.
- [ ] Configuración pública del sitio.

## Checklist técnico

- [ ] Ningún componente público importa desde `content/*`.
- [ ] Solo `lib/data/*` puede importar fallback desde `content/*`.
- [ ] `Contact.tsx` ya no importa `content/profile.ts`.
- [ ] `CaseStudies.tsx` ya no importa `content/case-studies.ts`.
- [ ] `Terminal.tsx` recibe datos por props.
- [ ] `sitemap.ts` lee slugs publicados desde MongoDB.
- [ ] `generateMetadata` lee SEO desde MongoDB.
- [ ] `scripts/seed-mongodb.ts` carga todas las colecciones necesarias.
- [ ] `pnpm build` funciona sin errores.
- [ ] La home mantiene `export const revalidate = 86400`.

## Riesgos y mitigaciones

### Riesgo: romper el sitio si MongoDB falla

Mitigación:

- Mantener fallback local temporal en `lib/data`.
- Usar ISR para conservar la última versión válida.
- Manejar errores con `try/catch` en lecturas públicas.

### Riesgo: mezclar contenido con labels de UI

Mitigación:

- MongoDB para contenido editable.
- `messages` para microcopy genérico de interfaz.
- Crear `SiteCopy` solo si realmente se necesita editar cada label desde admin.

### Riesgo: pasar documentos Mongoose crudos al cliente

Mitigación:

- Usar mappers públicos.
- Convertir `_id`, fechas y campos opcionales.
- Devolver objetos serializables.

### Riesgo: documentos incompletos publicados

Mitigación:

- Agregar validación Zod.
- Usar estado `draft/published` o `isPublished`.
- Bloquear publicación si faltan campos obligatorios por idioma.

## Decisión recomendada

Implementar MongoDB como **fuente principal de contenido editable**, con `/content` solo como fallback temporal durante la migración.

Prioridad recomendada:

1. Completar modelos y seed.
2. Centralizar lecturas en `lib/data`.
3. Eliminar imports directos a `/content` desde componentes.
4. Migrar casos de estudio, contacto y terminal, que son las dependencias estáticas más claras actualmente.
5. Conectar admin y revalidación manual.

Con esto el portafolio queda administrable desde MongoDB, sin perder rendimiento estático gracias a ISR diario.
