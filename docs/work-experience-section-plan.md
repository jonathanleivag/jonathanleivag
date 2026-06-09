# Plan para agregar una sección de experiencia laboral al portafolio

## Objetivo

Agregar una sección pública de **experiencia laboral** al portafolio, alimentada desde MongoDB, integrada con el diseño actual y compatible con la estrategia de sitio estático con ISR diario.

La sección debe mostrar la trayectoria profesional de forma clara, ordenada y orientada a valor: cargo, empresa, periodo, ubicación, responsabilidades, logros y stack utilizado.

## Resultado esperado

- Nueva sección pública `Experience` en la home.
- Datos leídos desde MongoDB usando el modelo `Experience` existente.
- Contenido disponible en español e inglés.
- Orden controlado desde base de datos.
- Solo se muestran experiencias publicadas.
- La home mantiene `export const revalidate = 86400`.
- El panel admin puede administrar la experiencia laboral en una fase posterior.

## Estado actual

Ya existe el modelo base:

```text
models/Experience.ts
```

Campos actuales:

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

La home actual está en:

```text
app/[locale]/page.tsx
```

Secciones actuales:

```text
Hero
About
Projects
CaseStudies
PersonalProjects
Skills
Contact
```

## Ubicación recomendada en la home

Agregar la sección después de `About` y antes de `Projects`.

Orden recomendado:

```text
Hero
About
Experience
Projects
CaseStudies
PersonalProjects
Skills
Contact
```

Justificación:

- Primero se presenta quién eres.
- Luego se valida la experiencia profesional.
- Después se muestran proyectos y casos de estudio como evidencia.

## Modelo de datos

### Usar modelo existente

Mantener `models/Experience.ts` como base.

Campos mínimos para publicar una experiencia:

```text
company
role.es
role.en
period
highlights[].es
highlights[].en
order
isPublished
```

### Campos sugeridos a futuro

Agregar solo si se necesitan para mejorar el timeline o el admin:

```text
startDate
endDate
employmentType
companyUrl
companyLogoAssetKey
summary.es / summary.en
achievements[].es / achievements[].en
```

Para la primera versión, el modelo actual es suficiente.

## Capa de datos

Crear archivo:

```text
lib/data/experience.ts
```

Funciones sugeridas:

```text
getExperiences()
getPublicExperiences(locale)
```

Responsabilidades:

- Conectar a MongoDB con `connectToDatabase()`.
- Leer solo experiencias con `isPublished: true`.
- Ordenar por `order` ascendente.
- Localizar `role` y `highlights` según `locale`.
- Devolver objetos serializables para componentes.
- Manejar fallback temporal si MongoDB falla o no hay datos.

Formato público sugerido:

```ts
type PublicExperience = {
  company: string
  role: string
  location?: string
  period?: string
  isCurrent: boolean
  highlights: string[]
  stack: string[]
}
```

## Componente público

Crear archivo:

```text
components/sections/Experience.tsx
```

Responsabilidades:

- Leer traducciones de sección con `next-intl`.
- Obtener experiencias usando `getPublicExperiences(locale)`.
- Renderizar un timeline o lista vertical.
- Mostrar estado actual si `isCurrent` es `true`.
- Mostrar stack como badges.
- No importar directamente desde `/content`.

Props sugeridas:

```ts
interface Props {
  locale: string
}
```

## Diseño UI recomendado

Usar un diseño tipo timeline vertical para reforzar trayectoria profesional.

Estructura visual:

```text
SectionHeader
└── Timeline
    ├── ExperienceCard
    │   ├── Cargo
    │   ├── Empresa + ubicación
    │   ├── Periodo + badge actual
    │   ├── Highlights
    │   └── Stack
    └── ExperienceCard
```

Estilo consistente con el portafolio actual:

- Fondo oscuro.
- Bordes `border-white/5`.
- Acentos `emerald`.
- Cards con `bg-zinc-900/40`.
- Texto principal `text-zinc-100`.
- Texto secundario `text-zinc-400`.

## Traducciones

Agregar namespace nuevo en:

```text
messages/es.json
messages/en.json
```

Namespace sugerido:

```json
{
  "experience": {
    "label": "Experiencia",
    "title": "Experiencia laboral",
    "subtitle": "Trayectoria construyendo productos web, interfaces modernas y soluciones full stack.",
    "current": "Actual"
  }
}
```

Versión inglés:

```json
{
  "experience": {
    "label": "Experience",
    "title": "Work experience",
    "subtitle": "A track record building web products, modern interfaces, and full stack solutions.",
    "current": "Current"
  }
}
```

Estos labels pueden quedarse en `messages` porque son microcopy de UI. Los datos laborales deben venir desde MongoDB.

## Integración en la home

Actualizar:

```text
app/[locale]/page.tsx
```

Agregar import:

```ts
import { Experience } from '@/components/sections/Experience'
```

Agregar sección después de `About`:

```tsx
<About locale={locale} />
<Experience locale={locale} />
<Projects locale={locale} />
```

Mantener:

```ts
export const revalidate = 86400
```

## Seed inicial

Actualizar:

```text
scripts/seed-mongodb.ts
```

Agregar carga inicial de experiencias laborales usando `findOneAndUpdate` con `upsert`.

Fuente sugerida inicial:

- Perfil profesional actual.
- LinkedIn/CV.
- Datos ya usados en casos de estudio.

Ejemplo conceptual:

```text
MOVATEC SPA
Full Stack Developer / Frontend Senior
Periodo actual
Highlights:
- Desarrollo de interfaces modernas con Vue.js y Vuetify.
- Migración progresiva desde Vue 2 hacia Vue 3.
- Optimización frontend, arquitectura de componentes y TypeScript.
Stack:
Vue.js, Vuetify, TypeScript, JavaScript, CSS modular
```

## Admin futuro

Agregar una sección en el panel admin:

```text
/admin/experience
```

Acciones necesarias:

- Listar experiencias.
- Crear experiencia.
- Editar experiencia.
- Cambiar orden.
- Publicar/despublicar.
- Eliminar o archivar.
- Revalidar home después de guardar.

Campos del formulario:

```text
Empresa
Cargo ES
Cargo EN
Ubicación
Periodo
Es trabajo actual
Highlights ES/EN
Stack
Orden
Publicado
```

## Plan de implementación

### Fase 1: Datos

- Crear `lib/data/experience.ts`.
- Leer experiencias publicadas desde MongoDB.
- Mapear campos localizados.
- Agregar fallback temporal si no hay datos.

### Fase 2: UI pública

- Crear `components/sections/Experience.tsx`.
- Diseñar timeline responsive.
- Mostrar highlights y stack.
- Agregar badge para experiencia actual.

### Fase 3: Integración

- Agregar namespace `experience` en `messages/es.json` y `messages/en.json`.
- Importar `Experience` en `app/[locale]/page.tsx`.
- Insertar la sección después de `About`.

### Fase 4: Seed

- Actualizar `scripts/seed-mongodb.ts` con experiencias iniciales.
- Ejecutar seed en ambiente local.
- Verificar documentos en MongoDB.

### Fase 5: Validación

- Ejecutar `pnpm lint` si está disponible.
- Ejecutar `pnpm build`.
- Verificar `/es` y `/en`.
- Confirmar que la sección no rompe ISR diario.

### Fase 6: Admin

- Crear pantalla `/admin/experience`.
- Agregar formulario con validación.
- Revalidar home al guardar cambios.

## Checklist técnico

- [ ] Existe `lib/data/experience.ts`.
- [ ] Existe `components/sections/Experience.tsx`.
- [ ] `app/[locale]/page.tsx` renderiza la sección.
- [ ] `messages/es.json` tiene namespace `experience`.
- [ ] `messages/en.json` tiene namespace `experience`.
- [ ] `scripts/seed-mongodb.ts` carga experiencias iniciales.
- [ ] Se leen solo experiencias con `isPublished: true`.
- [ ] Se respeta el campo `order`.
- [ ] No se importa contenido estático desde el componente.
- [ ] La home mantiene `revalidate = 86400`.

## Riesgos y mitigaciones

### Riesgo: experiencia vacía en producción

Mitigación:

- Agregar fallback temporal en `lib/data/experience.ts`.
- Ocultar la sección si no hay experiencias publicadas.

### Riesgo: contenido duplicado con proyectos o casos de estudio

Mitigación:

- Usar la experiencia para trayectoria laboral.
- Usar proyectos/casos para evidencia técnica detallada.

### Riesgo: demasiada información visual

Mitigación:

- Mostrar 3 a 5 highlights por experiencia.
- Mantener stack en badges compactos.
- Usar diseño de timeline escaneable.

## Decisión recomendada

Implementar primero la sección pública usando el modelo `Experience` existente y datos desde MongoDB.

Después, agregar CRUD en admin para mantener la experiencia laboral sin modificar código.
