export type Post = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: 'articulo' | 'til' | 'tutorial' | 'snippet' | 'caso'
  tags: string[]
  readingMinutes: number
  isFeatured: boolean
  publishedAt: string
  image?: { src: string; alt: string }
}

export const posts: Post[] = [
  {
    slug: 'migrar-vue-2-a-vue-3-sin-congelar-el-roadmap',
    title: 'Migrar Vue 2 a Vue 3 sin congelar el roadmap',
    excerpt: 'Cómo dividir una migración progresiva en pasos entregables: compilación dual, capa de compatibilidad, tipado incremental y el orden en que conviene mover los componentes.',
    content: `La pregunta que aparece primero no es técnica: si el producto tiene entregas cada dos semanas, ¿cuándo se hace la migración? La respuesta que funcionó fue no reservar un período para migrar, sino convertir la migración en una serie de cambios que caben dentro de un sprint normal.

## Congelar la superficie antes de mover el motor

Antes de tocar dependencias conviene dejar de crecer en las zonas que van a cambiar. En la práctica: prohibir nuevos usos de la API de opciones en componentes nuevos, y escribir todo lo nuevo con la Composition API, que ya existe en Vue 2.7. El código nuevo nace migrado.

## Tipado antes de la versión

TypeScript no requiere Vue 3, y meterlo primero convierte errores de migración en errores de compilación. El orden importa: primero los modelos de dominio y las respuestas de API, después los componentes. Tipar la capa de datos es lo que hace visible qué componentes dependen de qué — por ejemplo, definir una interfaz Product con id, sku, price y stock antes de tocar un solo componente que la consuma.

## Un componente, un pull request

Los cambios grandes se revisan mal. Migrar de a un componente por PR hace que cada cambio sea reversible y que la revisión sea real. El costo es que la migración dura más en el calendario; el beneficio es que nunca hay una semana en que el producto no se puede desplegar. Una migración progresiva no se mide por porcentaje migrado, sino por cuántos días el equipo no pudo desplegar.

## CSS modular como frontera

Vuetify cambia de versión junto con Vue, y los estilos globales son lo que más duele. Mover el estilo a módulos por componente antes de la migración reduce el problema a un componente a la vez, en lugar de una hoja de estilos compartida que rompe todo junto.

El resultado de este orden no fue una migración más rápida, sino una migración que nunca bloqueó al equipo. Es la diferencia entre un proyecto que se puede pausar y uno que hay que terminar a la fuerza.`,
    category: 'articulo',
    tags: ['Vue 3', 'TypeScript', 'Vuetify', 'Migración'],
    readingMinutes: 9,
    isFeatured: true,
    publishedAt: '2026-08-14',
  },
  {
    slug: 'definemodel-y-el-fin-de-los-props-espejo',
    title: 'defineModel() y el fin de los props espejo',
    excerpt: 'defineModel() reemplaza el patrón modelValue + emit(\'update:modelValue\') por una sola declaración reactiva, sin perder el contrato explícito entre padre e hijo.',
    content: `Antes de Vue 3.4, un componente con v-model necesitaba declarar una prop modelValue y emitir un evento update:modelValue manualmente. Era un patrón mecánico, repetido en cada componente de formulario, y fácil de romper si se olvidaba el emit.

## Qué cambia en la práctica

defineModel() colapsa ambos lados en una sola declaración: const model = defineModel(); leer model.value lee la prop, escribir model.value emite el evento. El componente padre sigue usando v-model="valor" exactamente igual — el cambio es puramente interno.

Vale la pena migrarlo componente por componente, no de una vez: el patrón antiguo y defineModel() conviven sin problema en la misma base de código mientras dura la transición.`,
    category: 'til',
    tags: ['Vue 3', 'Composition API'],
    readingMinutes: 2,
    isFeatured: false,
    publishedAt: '2026-07-30',
  },
  {
    slug: 'cache-de-queries-apollo-que-no-miente',
    title: 'Caché de queries Apollo que no miente',
    excerpt: 'Configurar fetchPolicy y typePolicies para que el caché de Apollo Client refresque cuando el dato realmente cambió, sin forzar network-only en todas partes.',
    content: `El caché por defecto de Apollo Client normaliza por id, pero cuando un mismo tipo aparece en dos queries distintas con selección de campos distinta, es fácil terminar mostrando datos parcialmente viejos sin que ningún error lo avise.

## El fetchPolicy correcto por caso de uso

cache-first sirve para listados que no cambian seguido. cache-and-network sirve para pantallas donde el usuario espera ver algo de inmediato pero también el dato más fresco apenas llega. network-only debería ser la excepción, no la regla — usarlo en todas partes es renunciar al caché en vez de configurarlo.

## typePolicies para campos derivados

Cuando un campo se calcula en el cliente (por ejemplo, un total derivado de una lista), declararlo en typePolicies con una función read evita que quede desincronizado del resto del caché normalizado.`,
    category: 'snippet',
    tags: ['GraphQL', 'Apollo', 'Cache'],
    readingMinutes: 4,
    isFeatured: false,
    publishedAt: '2026-07-02',
  },
  {
    slug: 'css-modular-en-vuetify-sin-pelear-con-el-framework',
    title: 'CSS modular en Vuetify sin pelear con el framework',
    excerpt: 'Cómo introducir CSS Modules en un proyecto Vuetify sin duplicar el sistema de diseño ni perder los estados hover/focus que el framework ya resuelve.',
    content: `Vuetify trae su propio sistema de clases utilitarias y componentes con estilos internos vía scoped CSS. Meter CSS Modules encima sin criterio termina en dos sistemas de diseño compitiendo por la misma pantalla.

## Dónde sí conviene CSS Modules

Para el layout propio de cada vista — grillas, espaciados entre secciones, breakpoints específicos del producto — CSS Modules da nombres de clase únicos sin colisión, y es más fácil de razonar que sobrescribir clases internas de Vuetify con !important.

## Dónde no conviene

Los estados interactivos de los componentes Vuetify (hover, focus, disabled, ripple) ya están resueltos por el framework. Reimplementarlos en un módulo CSS aparte duplica lógica y se desincroniza en la próxima actualización de versión. La regla práctica: CSS Modules para layout propio, props y slots de Vuetify para todo lo que el componente ya sabe hacer.`,
    category: 'tutorial',
    tags: ['Vuetify', 'CSS Modules'],
    readingMinutes: 12,
    isFeatured: false,
    publishedAt: '2026-06-11',
  },
  {
    slug: 'componentes-reutilizables-cuando-extraer-y-cuando-duplicar',
    title: 'Componentes reutilizables: cuándo extraer y cuándo duplicar',
    excerpt: 'La regla de las tres apariciones no siempre aplica: a veces duplicar dos componentes parecidos es más barato que mantener una abstracción con demasiadas ramas condicionales.',
    content: `Extraer un componente compartido demasiado pronto suele terminar en un componente con cinco props booleanas controlando ramas de renderizado distintas — más difícil de leer que los dos componentes separados que reemplazó.

## La señal real no es la repetición, es el acoplamiento

Dos componentes que se ven parecidos hoy pero cuyo propósito de negocio es distinto (por ejemplo, una card de proyecto y una card de artículo) van a divergir con el tiempo. Compartirlos ata su evolución innecesariamente. La pregunta que importa no es "¿se ven igual?" sino "¿van a cambiar juntos o por separado?".

## Cuándo sí extraer

Cuando la lógica compartida es realmente estructural — el layout de un formulario, el comportamiento de un modal, un patrón de carga/error/vacío — y no solo apariencia visual coincidente. Ahí un componente compartido reduce mantenimiento real en vez de solo reducir líneas de código.`,
    category: 'articulo',
    tags: ['Component Architecture'],
    readingMinutes: 7,
    isFeatured: false,
    publishedAt: '2026-05-28',
  },
  {
    slug: 'tipar-respuestas-de-graphql-sin-duplicar-interfaces',
    title: 'Tipar respuestas de GraphQL sin duplicar interfaces',
    excerpt: 'Generar tipos TypeScript directamente desde el schema y las queries de GraphQL evita mantener a mano interfaces que ya describe el propio schema.',
    content: `Escribir a mano una interfaz TypeScript para cada respuesta de GraphQL duplica información que ya vive en el schema — cualquier cambio en el backend obliga a actualizar el tipo manualmente, y es fácil que se desincronicen sin que nadie lo note hasta producción.

## Generar en vez de escribir

Herramientas como GraphQL Code Generator leen el schema y las queries del proyecto y generan los tipos exactos que esa query va a devolver, incluyendo null en los campos que el schema marca como opcionales. El tipo deja de ser una promesa manual y pasa a ser un reflejo directo del contrato real.

El costo es agregar un paso de generación al flujo de desarrollo; el beneficio es que un cambio de schema que rompe un componente se detecta en tiempo de compilación, no en producción.`,
    category: 'til',
    tags: ['GraphQL', 'TypeScript'],
    readingMinutes: 3,
    isFeatured: false,
    publishedAt: '2026-04-14',
  },
  {
    slug: 'un-backend-expressjs-que-sobrevivio-tres-frontends',
    title: 'Un backend Express.js que sobrevivió tres frontends',
    excerpt: 'Un servicio Express.js diseñado alrededor de contratos GraphQL estables terminó sirviendo, sin cambios, a un frontend Vue, uno React y una app React Native.',
    content: `El proyecto empezó como un backend Express.js con Apollo Server para un único frontend Vue. El diseño desde el principio fue no filtrar detalles de presentación en el schema GraphQL — ningún tipo ni resolver asumía cómo se iba a renderizar el dato.

## Por qué sobrevivió a los cambios de frontend

Cuando el mismo negocio necesitó una segunda interfaz en React y después una app en React Native, ninguno de los dos requirió cambios en el backend. El schema ya exponía datos como conceptos de dominio (un producto, un pedido, un usuario) en vez de como estructuras convenientes para una pantalla específica.

## La lección que queda

Un backend que conoce demasiado sobre cómo un frontend particular va a mostrar el dato es un backend que va a necesitar reescribirse cuando cambie el frontend. Modelar el schema alrededor del dominio, no de la pantalla, es lo que permite que un mismo servicio sirva a varios clientes sin fricción.`,
    category: 'caso',
    tags: ['Express.js', 'GraphQL', 'Architecture'],
    readingMinutes: 10,
    isFeatured: false,
    publishedAt: '2026-03-02',
  },
]
