# Review Feedback del Portafolio

Revisión realizada desde la perspectiva de Staff Frontend Engineer sobre la app Next.js, componentes, contenido TypeScript, SEO, accesibilidad, responsive, performance y mantenibilidad.

## Resumen ejecutivo

El portafolio tiene una base simple y bien encaminada: Next.js App Router, contenido separado en `/content`, secciones claras y componentes UI pequeños. Sin embargo, todavía hay problemas que afectan calidad de producción: el build depende de Google Fonts en tiempo de compilación, existe un error de lint en navegación interna, las rutas de casos de estudio están incompletas, hay enlaces a assets inexistentes y varias decisiones de UI/arquitectura pueden generar deuda si el sitio crece.

## Validaciones ejecutadas

- `pnpm exec tsc --noEmit`: pasa sin errores TypeScript.
- `pnpm lint`: falla por uso de `<a>` para navegación interna en `app/projects/[slug]/page.tsx`.
- `pnpm build`: falla porque `next/font/google` no puede descargar `Geist` y `Geist Mono` sin acceso de red.

## P0 — Bloqueantes de producción

### 1. Build dependiente de red para fuentes

- **Impacto:** Alto. El sitio no puede generar build en entornos sin red o CI restringido.
- **Evidencia:** `pnpm build` falla al intentar descargar `Geist` y `Geist Mono` desde Google Fonts en `app/layout.tsx`.
- **Archivo:** `app/layout.tsx`
- **Riesgo:** Deploys frágiles y builds no reproducibles.
- **Recomendación:** Usar fuentes locales con `next/font/local`, mantener assets versionados en el repo o configurar una estrategia de build con red garantizada.

### 2. Lint falla por navegación interna con `<a>`

- **Impacto:** Alto. Rompe el estándar de Next.js y deja el pipeline de calidad en rojo.
- **Evidencia:** `@next/next/no-html-link-for-pages` en `app/projects/[slug]/page.tsx`.
- **Archivo:** `app/projects/[slug]/page.tsx`
- **Riesgo:** Navegación menos eficiente, recargas innecesarias y CI fallando.
- **Recomendación:** Reemplazar `<a href="/#projects">` por `Link` de `next/link`.

### 3. Enlace a CV inexistente

- **Impacto:** Alto. El CTA principal de conversión puede terminar en 404.
- **Evidencia:** `profile.social.cv` apunta a `/cv.pdf`, pero `public/cv.pdf` no existe.
- **Archivos:** `content/profile.ts`, `components/layout/Navbar.tsx`, `components/sections/Contact.tsx`
- **Riesgo:** Pérdida de confianza ante reclutadores o CTOs.
- **Recomendación:** Agregar `public/cv.pdf`, ocultar el CTA hasta tener el archivo o apuntar a una URL real.

## P1 — Alto impacto en UX, SEO y arquitectura

### 4. Páginas dinámicas de proyectos sin contenido real

- **Impacto:** Alto. Los CTAs “Ver caso” prometen profundidad, pero llevan a una página placeholder.
- **Evidencia:** `app/projects/[slug]/page.tsx` solo imprime el `slug` y “Contenido del caso de estudio próximamente”.
- **Archivos:** `app/projects/[slug]/page.tsx`, `content/case-studies.ts`, `content/projects.ts`
- **Riesgo:** Baja la percepción de seniority porque el sitio declara casos de estudio sin entregarlos.
- **Recomendación:** Resolver el caso por `slug`, renderizar el contenido de `caseStudies`, manejar `notFound()` y generar metadata real por caso.

### 5. Slugs inconsistentes entre proyectos y casos

- **Impacto:** Alto. `ProjectCard` navega a `/projects/${project.slug}`, pero los casos usan otros `slug`.
- **Evidencia:** `projects.ts` usa `vue-framework-migration`; `case-studies.ts` usa `vue-2-to-vue-3-migration`.
- **Archivos:** `content/projects.ts`, `content/case-studies.ts`, `components/ui/ProjectCard.tsx`
- **Riesgo:** Rutas duplicadas, páginas sin contenido o acoplamiento manual difícil de mantener.
- **Recomendación:** Unificar un solo identificador o agregar `caseStudySlug` explícito en `Project`.

### 6. Modelo de contenido duplicado

- **Impacto:** Alto. Proyectos y casos repiten stack, contexto, decisiones y resumen.
- **Evidencia:** La migración Vue aparece en `projects.ts` y `case-studies.ts` con contenido similar pero slugs distintos.
- **Archivos:** `content/projects.ts`, `content/case-studies.ts`
- **Riesgo:** Drift de contenido, inconsistencias y mayor costo de edición.
- **Recomendación:** Crear un modelo canónico, por ejemplo `portfolio-items.ts`, con summary para cards y detail para caso completo.

### 7. Hero no usa el headline definido

- **Impacto:** Medio-alto. Se creó copy estratégico en `profile.hero.headline`, pero la UI muestra una versión derivada de `profile.role`.
- **Evidencia:** `Hero.tsx` construye el `h1` con `profile.role.split(...)`.
- **Archivo:** `components/sections/Hero.tsx`
- **Riesgo:** El mensaje principal queda menos diferencial y más genérico.
- **Recomendación:** Usar `profile.hero.headline` como `h1` y dejar `profile.role` como eyebrow o metadata visual.

### 8. Terminal muestra stack no alineado con el perfil real

- **Impacto:** Medio-alto. Comunica tecnologías no respaldadas en el PDF usado como fuente.
- **Evidencia:** `Terminal.tsx` lista `Next.js`, `NestJS`, `PostgreSQL`, `Docker`, `AWS`, `CI/CD`, mientras el perfil extraído enfatiza Vue.js, Vuetify, Express.js, GraphQL, Apollo, React y React Native.
- **Archivo:** `components/ui/Terminal.tsx`
- **Riesgo:** Inconsistencia profesional y pérdida de confianza.
- **Recomendación:** Derivar líneas desde `skills.ts` o actualizar manualmente con stack real.

### 9. Metadata SEO demasiado básica

- **Impacto:** Medio-alto. La página principal tiene `title` y `description`, pero falta metadata social y canonical.
- **Evidencia:** `metadata` en `app/layout.tsx` solo define `title` y `description`.
- **Archivo:** `app/layout.tsx`
- **Riesgo:** Previews pobres en LinkedIn, WhatsApp y buscadores.
- **Recomendación:** Agregar `openGraph`, `twitter`, `metadataBase`, `alternates.canonical`, keywords moderadas y metadata específica por caso.

### 10. Navegación no incluye todas las secciones principales

- **Impacto:** Medio. Existen `About` y `CaseStudies`, pero no están en `NAV_LINKS`.
- **Archivo:** `components/layout/Navbar.tsx`
- **Riesgo:** Menor descubribilidad de contenido clave, especialmente en revisión rápida.
- **Recomendación:** Incluir `Sobre mí` y `Casos` o ajustar las secciones visibles según prioridad real.

## P2 — Accesibilidad, responsive y performance

### 11. Menú mobile no gestiona foco completamente

- **Impacto:** Medio. Se usa `inert` en `main`, pero el foco no se mueve al drawer ni vuelve al botón al cerrar.
- **Archivo:** `components/layout/Navbar.tsx`
- **Riesgo:** Experiencia deficiente para usuarios de teclado o lectores de pantalla.
- **Recomendación:** Al abrir, enfocar el primer link; al cerrar, devolver foco al botón; considerar focus trap simple.

### 12. Falta estado de foco visible consistente

- **Impacto:** Medio. Muchos links dependen de hover/color y no tienen clases `focus-visible` explícitas.
- **Archivos:** `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `ProjectCard.tsx`, `Contact.tsx`
- **Riesgo:** Navegación por teclado menos clara.
- **Recomendación:** Agregar un patrón compartido de foco: `focus-visible:outline`, `focus-visible:ring`, `focus-visible:ring-emerald-400`.

### 13. Contraste de texto secundario puede quedar bajo

- **Impacto:** Medio. Se usa mucho `text-zinc-500` y `text-zinc-600` sobre fondos oscuros.
- **Archivos:** `Footer.tsx`, `ProjectCard.tsx`, `SkillGroup.tsx`, `CaseStudies.tsx`
- **Riesgo:** Legibilidad reducida en pantallas con bajo brillo o usuarios con baja visión.
- **Recomendación:** Revisar contraste WCAG; usar `text-zinc-400` como mínimo para textos informativos importantes.

### 14. Animaciones no respetan completamente `prefers-reduced-motion`

- **Impacto:** Medio. `Terminal` respeta reducción para aparición de líneas, pero el cursor mantiene `animate-pulse`.
- **Archivo:** `components/ui/Terminal.tsx`
- **Riesgo:** Movimiento innecesario para usuarios sensibles.
- **Recomendación:** Condicionar el cursor animado o usar clase `motion-reduce:animate-none`.

### 15. Header fixed puede tapar anchors

- **Impacto:** Medio. La navegación usa anchors internos y header fijo de 64px.
- **Archivos:** `Navbar.tsx`, secciones en `components/sections/*`
- **Riesgo:** Al navegar a una sección, el título puede quedar oculto bajo el header.
- **Recomendación:** Agregar `scroll-mt-20` o `scroll-margin-top` a cada sección con `id`.

### 16. Hero con `min-h-screen` puede generar scroll incómodo en móviles bajos

- **Impacto:** Medio. El hero incluye texto, CTAs, links y terminal dentro de `min-h-screen`.
- **Archivo:** `components/sections/Hero.tsx`
- **Riesgo:** En pantallas pequeñas, la terminal puede empujar contenido y dificultar la primera lectura.
- **Recomendación:** Usar `min-h-[auto] md:min-h-screen` o reducir/ocultar detalles decorativos en mobile.

### 17. Terminal puede desbordar horizontalmente con texto largo

- **Impacto:** Bajo-medio. Las líneas terminal usan flex sin wrapping explícito.
- **Archivo:** `components/ui/Terminal.tsx`
- **Riesgo:** Desbordes en móviles si se agregan comandos o stacks más largos.
- **Recomendación:** Agregar `min-w-0`, `break-words` o `overflow-x-auto` según intención visual.

### 18. Uso excesivo de componentes cliente

- **Impacto:** Bajo-medio. `Navbar`, `Contact` y `Terminal` requieren cliente, pero el resto está bien server-rendered.
- **Archivos:** `Navbar.tsx`, `Contact.tsx`, `Terminal.tsx`
- **Riesgo:** Bundle client mayor si se agregan más interacciones sin criterio.
- **Recomendación:** Mantener interactividad aislada; extraer solo subcomponentes cliente si crece la navbar o contacto.

## P3 — Mantenibilidad y calidad de código

### 19. Tipos de contenido definidos dentro de archivos de datos

- **Impacto:** Bajo-medio. Funciona, pero puede complicar reuso si crecen secciones, rutas y validaciones.
- **Archivos:** `content/projects.ts`, `content/case-studies.ts`, `content/skills.ts`
- **Recomendación:** Centralizar tipos en `content/types.ts` o `types/portfolio.ts`.

### 20. Secciones hardcodeadas en `app/page.tsx`

- **Impacto:** Bajo. Correcto para una landing simple, pero menos flexible si se quieren activar/desactivar secciones.
- **Archivo:** `app/page.tsx`
- **Recomendación:** Mantener por ahora; considerar un registry de secciones solo si el sitio escala.

### 21. Comentarios JSX innecesarios

- **Impacto:** Bajo. Hay comentarios como `Desktop links`, `Mobile drawer`, `Left column` que no aportan demasiado.
- **Archivos:** `Navbar.tsx`, `Hero.tsx`, `Contact.tsx`
- **Recomendación:** Eliminar comentarios obvios o reemplazarlos por componentes con nombres claros.

### 22. `.DS_Store`, `.next` y `tsconfig.tsbuildinfo` aparecen en el workspace

- **Impacto:** Bajo si están ignorados, alto si fueron commiteados.
- **Evidencia:** existen `.DS_Store`, `.next/` y `tsconfig.tsbuildinfo` en la carpeta.
- **Recomendación:** Confirmar `.gitignore` y evitar versionar artefactos de build o sistema operativo.

## Orden recomendado de acción

1. Eliminar bloqueo de build por fuentes remotas.
2. Corregir lint con `next/link`.
3. Agregar o corregir `/cv.pdf`.
4. Implementar páginas reales de caso de estudio con `notFound()`.
5. Unificar slugs y modelo de contenido.
6. Alinear Hero y Terminal con el contenido real del perfil.
7. Mejorar metadata SEO y previews sociales.
8. Reforzar accesibilidad de foco, menú mobile y `prefers-reduced-motion`.
9. Ajustar responsive del hero y anchors con header fijo.
10. Reducir duplicación y centralizar tipos si el contenido sigue creciendo.

## Conclusión

La base es buena para una primera versión: estructura clara, contenido separado, TypeScript activo y componentes pequeños. El mayor riesgo actual no está en complejidad excesiva, sino en inconsistencias entre contenido y UI, rutas incompletas y detalles de producción que rompen confianza. Resolver los P0 y P1 elevaría significativamente la percepción senior del portafolio.
