# Plan para actualizar la página 1 vez al día desde la base de datos sin perder lo estático

## Objetivo

Mantener el portafolio como una página rápida, cacheada y con comportamiento casi estático, pero alimentada por los datos guardados en la base de datos.

La página pública debe consultar MongoDB durante el render del servidor y regenerarse automáticamente **una vez al día**. Así se evita consultar la base de datos en cada visita y se conserva el rendimiento de una página estática.

## Resultado esperado

- El sitio público se sirve desde caché estática la mayor parte del tiempo.
- Los datos vienen desde MongoDB, no desde archivos manuales en `/content`.
- La página se revalida automáticamente cada 24 horas.
- Si MongoDB falla, el sitio sigue mostrando la última versión válida generada.
- El panel admin puede modificar datos sin obligar a redeployar el sitio.
- Opcionalmente, el admin puede forzar una actualización manual después de editar contenido.

## Estrategia recomendada

Usar **Incremental Static Regeneration** de Next.js App Router con `revalidate`.

```ts
export const revalidate = 86400
```

`86400` segundos equivalen a 24 horas.

Esto permite que Next.js:

1. Genere la página con datos de MongoDB.
2. Guarde el HTML/render cacheado.
3. Sirva la versión cacheada durante 24 horas.
4. Regenere la página en segundo plano cuando expire el tiempo.
5. Mantenga la última versión válida si ocurre un error temporal.

## Arquitectura propuesta

```text
MongoDB Atlas
     ↓
lib/data/public-portfolio.ts
     ↓
Server Components / generateMetadata
     ↓
Next.js ISR revalidate: 86400
     ↓
Sitio público cacheado como estático
```

## Alcance de la actualización diaria

Aplicar revalidación diaria a todas las rutas públicas que consuman datos dinámicos:

```text
app/[locale]/page.tsx
app/[locale]/projects/page.tsx
app/[locale]/projects/[slug]/page.tsx
app/[locale]/case-studies/page.tsx
app/[locale]/case-studies/[slug]/page.tsx
```

Si alguna ruta todavía no existe, aplicar este criterio cuando se implemente.

## Plan de implementación

### 1. Centralizar lectura pública de datos

Crear una capa de lectura para el sitio público:

```text
lib/data/public-portfolio.ts
```

Responsabilidades:

- Conectarse a MongoDB usando `lib/mongodb.ts`.
- Leer solo documentos publicados.
- Normalizar datos para los componentes públicos.
- Aplicar ordenamiento estable.
- Devolver datos seguros para renderizar.

Funciones sugeridas:

```ts
getPublicHomeData(locale)
getPublicProjects(locale)
getPublicProjectBySlug(locale, slug)
getPublicCaseStudies(locale)
getPublicSeoMetadata(locale, route)
```

### 2. Activar revalidación diaria en rutas públicas

En cada página pública que consulte MongoDB, agregar:

```ts
export const revalidate = 86400
```

Ejemplo:

```ts
export const revalidate = 86400

export default async function HomePage() {
  const data = await getPublicHomeData(locale)

  return <HomeView data={data} />
}
```

### 3. Evitar render dinámico innecesario

No usar en rutas públicas APIs que obliguen render dinámico por request, salvo que sea necesario:

- Evitar `headers()` en páginas públicas cacheables.
- Evitar `cookies()` en páginas públicas cacheables.
- Evitar `no-store` en `fetch`.
- Evitar leer datos de sesión en la página pública.

Si se necesita lógica de usuario/admin, mantenerla separada en `/admin`.

### 4. Manejar fallback ante errores de base de datos

La lectura desde MongoDB debe fallar de forma controlada.

Opciones recomendadas:

- Mantener contenido mínimo de fallback en `/content` para emergencias.
- Registrar el error en servidor.
- Evitar romper el build/render público por datos opcionales.
- Validar datos con Zod antes de enviarlos a componentes.

Ejemplo de comportamiento esperado:

```text
MongoDB responde correctamente → render con datos actualizados.
MongoDB falla durante revalidación → Next.js conserva la última versión cacheada.
MongoDB falla en primer render sin caché → usar fallback local mínimo.
```

### 5. Revalidación manual desde admin

Además de la actualización diaria, crear una ruta interna para actualizar inmediatamente después de guardar cambios importantes.

Ruta propuesta:

```text
app/api/revalidate/route.ts
```

Funcionamiento:

- Recibe un secreto privado por header o query param.
- Ejecuta `revalidatePath` para rutas públicas afectadas.
- Nunca se expone al cliente público.
- Solo la usa el panel admin o un script interno.

Variables de entorno sugeridas:

```env
REVALIDATE_SECRET="secret-largo-y-seguro"
```

Rutas a revalidar después de cambios:

```text
/
/es
/en
/es/projects
/en/projects
/es/case-studies
/en/case-studies
```

Para detalle por slug:

```text
/es/projects/[slug]
/en/projects/[slug]
/es/case-studies/[slug]
/en/case-studies/[slug]
```

### 6. Separar caché pública de panel admin

El panel admin debe leer datos en tiempo real o con caché mínima.

Recomendación:

```ts
export const dynamic = 'force-dynamic'
```

Solo para rutas admin:

```text
app/admin/**
```

No aplicar esta opción en páginas públicas porque desactiva el beneficio estático.

### 7. Validar SEO y metadata

`generateMetadata` también debe leer desde la misma capa pública de datos y respetar la revalidación diaria.

Datos SEO a incluir desde MongoDB:

- Title.
- Description.
- Open Graph image.
- Canonical URL.
- Alternates por idioma.
- Robots si alguna página no debe indexarse.

### 8. Crear script opcional de verificación diaria

Si se quiere mayor control, agregar un cron externo que llame una ruta privada de healthcheck o revalidación.

Opciones:

- Vercel Cron Jobs.
- GitHub Actions scheduled workflow.
- UptimeRobot o servicio similar.

Para este caso, ISR diario suele ser suficiente. El cron solo es necesario si se quiere asegurar que la regeneración ocurra a una hora específica.

## Orden recomendado de trabajo

1. Confirmar modelos MongoDB definitivos para contenido público.
2. Crear `lib/data/public-portfolio.ts`.
3. Migrar la home pública para consumir la capa de datos.
4. Agregar `export const revalidate = 86400` en la home.
5. Migrar proyectos y casos de estudio.
6. Agregar fallback local mínimo.
7. Agregar validación Zod de datos públicos.
8. Implementar ruta privada de revalidación manual.
9. Conectar el panel admin para llamar revalidación después de guardar.
10. Probar comportamiento en build y producción.

## Checklist técnico

- [ ] Existe conexión reutilizable a MongoDB en `lib/mongodb.ts`.
- [ ] Las páginas públicas no usan `cookies()` ni `headers()` innecesariamente.
- [ ] Las rutas públicas definen `export const revalidate = 86400`.
- [ ] Los datos públicos se leen desde una capa centralizada.
- [ ] Los documentos tienen campo `published` o equivalente.
- [ ] Los documentos tienen `updatedAt` para auditoría.
- [ ] El sitio tiene fallback local mínimo.
- [ ] El admin fuerza render dinámico y no comparte caché pública.
- [ ] Existe `REVALIDATE_SECRET` para revalidación manual.
- [ ] Se prueba `pnpm build` antes de desplegar.

## Riesgos y mitigaciones

### Riesgo: consultar MongoDB en cada visita

Mitigación:

- Usar Server Components con `revalidate = 86400`.
- No marcar páginas públicas como dinámicas.

### Riesgo: cambios del admin no visibles inmediatamente

Mitigación:

- Mantener actualización diaria automática.
- Agregar botón o acción admin para revalidación manual.

### Riesgo: caída temporal de MongoDB

Mitigación:

- Next.js conserva la última versión cacheada si falla la revalidación.
- Mantener fallback local mínimo para primer render.

### Riesgo: datos incompletos rompen la página

Mitigación:

- Validar con Zod.
- Definir defaults seguros.
- Publicar solo contenido con campos obligatorios completos.

## Decisión recomendada

Implementar el sitio público con **ISR diario (`revalidate = 86400`)** y agregar una **revalidación manual protegida** para cambios importantes desde el admin.

Esta estrategia mantiene lo mejor de ambos mundos:

- Rendimiento de sitio estático.
- Datos administrables desde MongoDB.
- Menos lecturas a la base de datos.
- Actualización automática diaria.
- Posibilidad de actualización inmediata cuando sea necesario.
