# Plan UX/UI del Portafolio Full Stack Senior

## Objetivo de experiencia

Diseñar una experiencia clara, rápida y confiable que permita a CTOs, reclutadores y líderes de producto entender en pocos minutos el perfil, seniority, stack, proyectos e impacto profesional de Jonathan Leiva.

La interfaz debe sentirse como un producto digital bien construido: simple, sólida, responsive, accesible y con detalles de interacción que refuercen calidad sin distraer.

## Principios UX/UI

- **Mobile-first:** la experiencia debe funcionar perfectamente desde pantallas pequeñas antes de escalar a desktop.
- **Claridad sobre decoración:** cada bloque debe ayudar a entender el perfil o avanzar hacia contacto.
- **Escaneo rápido:** titulares fuertes, bloques cortos, métricas visibles y jerarquía clara.
- **Confianza profesional:** diseño sobrio, consistente y técnico sin parecer frío.
- **Conversión simple:** contacto, CV, GitHub y LinkedIn deben estar siempre accesibles.
- **Performance percibida:** carga rápida, animaciones ligeras y navegación fluida.

## User journey

### 1. Entrada inicial

El usuario llega desde LinkedIn, GitHub, CV, búsqueda directa o una postulación.

Necesidades principales:

- Entender quién es Jonathan.
- Confirmar si es un perfil Full Stack Senior.
- Ver rápidamente tecnologías, experiencia y proyectos.

Respuesta de la interfaz:

- Hero directo con rol, propuesta de valor y CTAs.
- Stack principal visible sin hacer scroll excesivo.
- Navegación simple hacia proyectos y contacto.

### 2. Validación rápida

El usuario escanea la página para decidir si vale la pena profundizar.

Necesidades principales:

- Identificar seniority.
- Ver evidencias de experiencia real.
- Detectar fit técnico.

Respuesta de la interfaz:

- Sección de proyectos destacados con contexto e impacto.
- Resumen de experiencia con logros.
- Bloques visuales de stack por categoría.

### 3. Profundización

El usuario revisa casos de estudio o experiencia profesional.

Necesidades principales:

- Entender cómo piensa técnicamente.
- Ver decisiones, trade-offs y resultados.
- Evaluar calidad de comunicación.

Respuesta de la interfaz:

- Cards de proyectos con narrativa clara.
- Páginas o modales de detalle si el portafolio crece.
- Arquitecturas, flujos o highlights técnicos fáciles de leer.

### 4. Conversión

El usuario decide contactar, guardar perfil o compartirlo internamente.

Necesidades principales:

- Encontrar contacto sin fricción.
- Acceder a CV, LinkedIn o GitHub.
- Confirmar disponibilidad o tipo de oportunidades.

Respuesta de la interfaz:

- CTA persistente o repetido estratégicamente.
- Footer claro con enlaces clave.
- Bloque final de contacto directo.

## Wireframe textual

### Mobile

```text
[Header compacto]
Logo / Nombre                 Menú

[Hero]
Senior Full Stack Engineer
Subtítulo de propuesta de valor
[Ver proyectos] [Contactar]
Stack breve: React · Next.js · Node.js · TypeScript · Cloud

[Resumen profesional]
Texto breve de 3-5 líneas
Highlights: End-to-end · Arquitectura · Producto

[Proyectos destacados]
Card proyecto 1
- Título
- Problema
- Stack
- Resultado
- CTA: Ver caso

Card proyecto 2
Card proyecto 3

[Stack técnico]
Tabs o bloques por categoría
Frontend
Backend
Database
Cloud & DevOps
Tools

[Experiencia e impacto]
Timeline vertical
Rol / Empresa / Periodo
Logros principales

[Forma de trabajo]
Cards pequeñas
Entender problema
Diseñar solución
Implementar
Medir y mejorar

[Sobre mí]
Texto breve profesional

[Contacto]
Mensaje final
[Email] [LinkedIn] [GitHub] [Descargar CV]

[Footer]
Nombre · Rol · Links
```

### Desktop

```text
[Header fijo]
Nombre / Logo        Inicio Proyectos Experiencia Stack Contacto        [CV]

[Hero 2 columnas]
Columna izquierda:
- Rol
- Propuesta de valor
- CTAs
- Links rápidos

Columna derecha:
- Bloque visual técnico
- Métricas o highlights
- Stack principal

[Resumen + Highlights]
Bloque de descripción
3 cards: Producto · Arquitectura · Ejecución end-to-end

[Proyectos destacados]
Grid de 2 o 3 columnas
Cards con imagen/captura, contexto, stack e impacto

[Experiencia]
Timeline horizontal o vertical amplia
Logros cuantificables

[Stack técnico]
Grid por categorías
Cada categoría con tecnologías y nivel de uso contextual

[Forma de trabajo]
Proceso en 4 pasos
Discovery → Arquitectura → Implementación → Iteración

[Sobre mí + Contacto]
Layout 2 columnas
Perfil humano/profesional + CTA final

[Footer]
Links, email, redes, CV
```

## Estructura responsive

### Breakpoints recomendados

- **Small mobile:** 320px - 374px.
- **Mobile:** 375px - 767px.
- **Tablet:** 768px - 1023px.
- **Desktop:** 1024px - 1439px.
- **Large desktop:** 1440px en adelante.

### Mobile-first

- Layout de una columna.
- Header compacto con menú desplegable.
- CTAs apilados o en ancho completo.
- Cards verticales.
- Timeline vertical.
- Espaciado generoso para lectura táctil.
- Evitar tablas o grids complejos.

### Tablet

- Hero puede pasar a dos columnas si hay espacio.
- Cards en grid de 2 columnas.
- Stack técnico agrupado en bloques visuales.
- Menú puede seguir compacto o pasar a navegación completa según ancho.

### Desktop

- Header fijo con navegación completa.
- Hero en dos columnas.
- Proyectos en grid de 2 o 3 columnas.
- Secciones con ancho máximo controlado.
- Uso de whitespace para transmitir seniority y orden.

## Jerarquía visual

### Nivel 1: Identidad y propuesta

Debe dominar la primera pantalla.

- Nombre o marca personal.
- Rol profesional.
- Propuesta de valor.
- CTAs principales.

### Nivel 2: Evidencia de seniority

Debe aparecer temprano, idealmente antes de proyectos completos.

- Años o amplitud de experiencia si aplica.
- Especialidades técnicas.
- Enfoque end-to-end.
- Highlights de impacto.

### Nivel 3: Proyectos y resultados

Debe tener máxima profundidad visual y narrativa.

- Cards destacadas.
- Resultados visibles.
- Stack contextual.
- Links a demo/repositorio/caso.

### Nivel 4: Detalles de soporte

Debe complementar sin competir con lo principal.

- Stack completo.
- Forma de trabajo.
- Sobre mí.
- Footer.

### Reglas visuales

- Usar un solo H1.
- Titulares de sección claros y consistentes.
- Párrafos cortos de máximo 3-5 líneas.
- Métricas o resultados en formato destacado.
- Evitar bloques densos de texto.
- Mantener contraste fuerte entre fondo, texto y CTAs.

## Componentes principales

### Header

- Nombre o logotipo textual.
- Navegación principal.
- CTA de CV o contacto.
- Estado sticky opcional.
- Menú mobile accesible.

### Hero

- Rol principal.
- Mensaje de valor.
- CTAs.
- Stack breve.
- Links rápidos.
- Bloque visual con highlights o mini dashboard técnico.

### ProjectCard

- Título del proyecto.
- Categoría o tipo de producto.
- Problema resuelto.
- Stack usado.
- Resultado o impacto.
- CTA de detalle.
- Estado hover/focus.

### TechStackGroup

- Categoría técnica.
- Lista de tecnologías.
- Contexto de uso.
- Ícono opcional por categoría.

### ExperienceItem

- Rol.
- Empresa o contexto.
- Periodo.
- Responsabilidades.
- Logros.
- Tecnologías relacionadas.

### WorkProcessStep

- Número o icono.
- Nombre del paso.
- Descripción breve.
- Resultado esperado.

### ContactBlock

- Mensaje final.
- Email.
- LinkedIn.
- GitHub.
- CV descargable.
- CTA principal claro.

### Footer

- Nombre.
- Rol.
- Links secundarios.
- Año.
- Mensaje breve de disponibilidad si aplica.

## Estados visuales

### Botones

- **Default:** alto contraste, texto claro y buen tamaño táctil.
- **Hover:** cambio sutil de fondo, borde o elevación.
- **Focus:** outline visible y accesible.
- **Active:** feedback inmediato de presión.
- **Disabled:** menor contraste, sin perder legibilidad.

### Links

- **Default:** color diferenciado o subrayado sutil.
- **Hover:** subrayado visible o cambio de tono.
- **Focus:** outline claro.
- **Visited:** opcional, mantener consistencia visual.

### Cards

- **Default:** borde sutil, fondo definido y buena separación.
- **Hover desktop:** elevación leve, borde destacado o desplazamiento mínimo.
- **Focus keyboard:** borde/outline visible.
- **Pressed mobile:** feedback de opacidad o escala mínima.

### Navegación

- **Active section:** resaltar sección actual.
- **Scrolled:** header puede compactarse o agregar fondo sólido.
- **Menu open:** bloquear scroll de fondo y mantener foco dentro del menú.

### Formularios, si se agregan

- **Empty:** labels claros.
- **Focus:** borde visible.
- **Error:** mensaje textual específico, no solo color.
- **Success:** confirmación clara y accesible.
- **Loading:** estado de envío visible.

## Microinteracciones

### Scroll y navegación

- Scroll suave entre secciones.
- Highlight de navegación según sección activa.
- Header con transición sutil al hacer scroll.

### CTAs

- Hover con cambio de borde/fondo.
- Icono de flecha que se desplaza ligeramente.
- Feedback visual al copiar email o abrir enlaces.

### Cards de proyecto

- Elevación ligera en hover.
- Reveal sutil de CTA.
- Tags de tecnología con transición de color suave.

### Stack técnico

- Chips con hover informativo.
- Agrupación por categoría con transición sutil.
- Evitar animaciones excesivas en listas largas.

### Carga inicial

- Animación mínima del hero.
- Entrada escalonada muy sutil de bloques principales.
- Respetar `prefers-reduced-motion`.

### Contacto

- Botón para copiar email con estado “Copiado”.
- Confirmación visual breve.
- Links externos con indicador discreto.

## Recomendaciones de accesibilidad

### Semántica

- Usar estructura HTML semántica: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Mantener un único `h1`.
- Usar jerarquía correcta de headings.
- Las cards de proyectos deben ser navegables sin depender solo del mouse.

### Teclado

- Todo elemento interactivo debe ser accesible con teclado.
- Focus visible en botones, links, cards clickeables y menú.
- Menú mobile debe poder cerrarse con `Esc`.
- El orden de tabulación debe seguir el flujo visual.

### Contraste

- Texto normal con contraste mínimo WCAG AA.
- No depender solo del color para comunicar estados.
- Evitar textos grises demasiado claros.
- Verificar contraste en modo claro y oscuro si existen ambos.

### Motion

- Implementar soporte para `prefers-reduced-motion`.
- Evitar animaciones que bloqueen lectura.
- No usar parallax agresivo.
- Mantener transiciones bajo 200-300ms.

### Imágenes y contenido

- Usar `alt` descriptivo en imágenes relevantes.
- Si una imagen es decorativa, usar `alt=""`.
- No incrustar información importante solo dentro de imágenes.
- Mantener textos legibles en mobile.

### Tamaños táctiles

- Botones y enlaces principales de al menos 44px de alto.
- Espaciado suficiente entre elementos interactivos.
- Evitar menús o chips demasiado pequeños.

## Diseño mobile-first

### Prioridades en mobile

1. Entender el perfil en la primera pantalla.
2. Acceder rápido a proyectos y contacto.
3. Leer casos de estudio sin fatiga.
4. Navegar con una mano.
5. Evitar elementos pesados o decorativos innecesarios.

### Layout mobile recomendado

- Header de 56px a 64px.
- Hero con altura flexible, no forzada a 100vh.
- CTA principal en ancho completo si mejora la interacción.
- Cards con padding cómodo.
- Tipografía base entre 16px y 18px.
- Secciones con espaciado vertical consistente.

### Navegación mobile

- Menú tipo drawer o dropdown fullscreen ligero.
- Links grandes y fáciles de tocar.
- CTA de contacto visible dentro del menú.
- Cerrar menú al seleccionar sección.
- Mantener foco accesible.

### Contenido mobile

- Reducir cantidad de texto visible inicialmente.
- Usar “Ver más” solo si aporta claridad, no para esconder información crítica.
- Mostrar primero los proyectos más fuertes.
- Priorizar métricas y resultados en cards.

## Recomendación visual

### Estilo general

- Minimalista técnico.
- Alto contraste.
- Mucho whitespace.
- Tipografía moderna y legible.
- Paleta sobria con un color acento para CTAs.

### Paleta sugerida

- Fondo principal: gris muy oscuro o blanco cálido.
- Texto principal: alto contraste.
- Texto secundario: gris medio accesible.
- Acento: azul, verde o violeta técnico.
- Bordes: sutiles, no decorativos.

### Tipografía sugerida

- Sans serif moderna para interfaz.
- Peso fuerte para titulares.
- Cuerpo legible y cómodo.
- Evitar demasiadas familias tipográficas.

## Checklist UX/UI final

- El rol se entiende en menos de 10 segundos.
- El CTA principal está visible sin esfuerzo.
- Los proyectos muestran problema, solución e impacto.
- El stack está organizado por categorías.
- La navegación funciona bien en mobile y desktop.
- Los estados hover, focus, active y loading están definidos.
- El sitio es accesible por teclado.
- Las animaciones respetan `prefers-reduced-motion`.
- El diseño mobile no es una versión reducida del desktop, sino la base de la experiencia.
