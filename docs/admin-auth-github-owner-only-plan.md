# Plan para que solo yo pueda iniciar sesión en `/admin` usando GitHub

## Objetivo

Proteger completamente la ruta `/admin` para que solo el dueño del portafolio pueda entrar, usando login con GitHub y una lista permitida de identidad.

La respuesta corta es: **sí, se puede hacer con GitHub**. No todos podrían entrar si se valida correctamente el usuario después del login. GitHub solo autentica quién es la persona; la app debe decidir si esa persona está autorizada.

## Estado actual detectado

Ya existe Auth.js/NextAuth con proveedor GitHub en:

```text
auth.ts
```

Actualmente se usa:

```ts
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

callbacks: {
  async signIn({ profile: githubProfile }) {
    if (!githubProfile?.email) return false
    return githubProfile.email === ADMIN_EMAIL
  }
}
```

También existe login admin en:

```text
app/admin/login/page.tsx
```

Y layout protegido en:

```text
app/admin/(protected)/layout.tsx
```

El layout ya redirige a `/admin/login` si no hay sesión.

## Problema a resolver

GitHub permite que cualquiera intente autenticarse, pero eso no significa que cualquiera deba entrar al admin.

El control correcto debe ser:

```text
Usuario hace login con GitHub
        ↓
GitHub confirma identidad
        ↓
La app revisa si el usuario está permitido
        ↓
Solo si coincide con mi identidad entra a /admin
```

## Decisión recomendada

Usar GitHub como login y restringir acceso con allowlist por:

1. `GitHub username/login` como verificación principal.
2. `GitHub id` como verificación más robusta.
3. `email` como verificación secundaria, porque puede venir privado o no verificado.

No se recomienda depender solo del email de GitHub.

## Por qué no basta con GitHub sin validación

Si solo se configura el provider GitHub y no se valida `signIn`, cualquier cuenta GitHub podría autenticarse.

Para un panel admin personal, siempre se debe validar contra una identidad permitida.

## Por qué no depender solo del email

GitHub puede no entregar email público si el usuario lo tiene privado.

Casos posibles:

- `profile.email` existe y coincide.
- `profile.email` viene `null` porque está privado.
- El usuario usa un noreply email de GitHub.
- El email principal cambia en GitHub.

Por eso conviene validar por `profile.login` o `profile.id`.

## Variables de entorno recomendadas

Actualizar `.env.local` y `.env.example` con:

```env
AUTH_SECRET="secret-largo-y-seguro"

AUTH_GITHUB_ID="github-oauth-client-id"
AUTH_GITHUB_SECRET="github-oauth-client-secret"

ADMIN_GITHUB_LOGIN="tu-usuario-github"
ADMIN_GITHUB_ID="tu-id-numerico-github"
ADMIN_EMAIL="tu-email@dominio.com"
```

Notas:

- `ADMIN_GITHUB_LOGIN` es el username público de GitHub.
- `ADMIN_GITHUB_ID` es el ID numérico estable de la cuenta.
- `ADMIN_EMAIL` queda como respaldo, no como única validación.
- No subir `.env.local` al repositorio.

## Cómo obtener el GitHub ID

Opción rápida desde navegador:

```text
https://api.github.com/users/TU_USUARIO
```

Buscar el campo:

```json
{
  "id": 12345678,
  "login": "TU_USUARIO"
}
```

## Cambios recomendados en `auth.ts`

Actualizar validación de `signIn` para usar allowlist.

Lógica recomendada:

```text
Permitir login si:
- profile.id coincide con ADMIN_GITHUB_ID, o
- profile.login coincide con ADMIN_GITHUB_LOGIN, o
- profile.email coincide con ADMIN_EMAIL como fallback
```

Ejemplo conceptual:

```ts
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_GITHUB_LOGIN = process.env.ADMIN_GITHUB_LOGIN
const ADMIN_GITHUB_ID = process.env.ADMIN_GITHUB_ID

callbacks: {
  async signIn({ profile }) {
    const githubId = String(profile?.id ?? '')
    const githubLogin = String(profile?.login ?? '').toLowerCase()
    const githubEmail = String(profile?.email ?? '').toLowerCase()

    const allowedById = ADMIN_GITHUB_ID && githubId === ADMIN_GITHUB_ID
    const allowedByLogin = ADMIN_GITHUB_LOGIN && githubLogin === ADMIN_GITHUB_LOGIN.toLowerCase()
    const allowedByEmail = ADMIN_EMAIL && githubEmail === ADMIN_EMAIL.toLowerCase()

    return Boolean(allowedById || allowedByLogin || allowedByEmail)
  }
}
```

## Proteger páginas y APIs

Actualmente el layout protegido cubre páginas dentro de:

```text
app/admin/(protected)/**
```

Pero también hay APIs admin:

```text
app/api/admin/experience/route.ts
app/api/admin/experience/[id]/route.ts
app/api/admin/projects/route.ts
app/api/admin/cv/route.ts
app/api/admin/skills/route.ts
app/api/admin/skills/[id]/route.ts
```

Estas rutas también deben validar sesión y usuario autorizado. No basta con proteger solo la UI, porque alguien podría llamar la API directamente.

## Helper recomendado para APIs admin

Crear helper:

```text
lib/auth/admin.ts
```

Funciones sugeridas:

```ts
assertAdmin()
isAdminSession(session)
```

Responsabilidad:

- Leer sesión con `auth()`.
- Verificar que exista `session.user`.
- Confirmar que el usuario corresponde al admin permitido.
- Devolver error `401` o `403` si no corresponde.

Uso conceptual en APIs:

```ts
const admin = await assertAdmin()
if (!admin.ok) return admin.response
```

## Mejorar la sesión

En `auth.ts`, guardar datos útiles en la sesión:

```text
user.email
user.name
user.image
user.githubLogin
```

Si se decide validar por `profile.id`, conviene persistir también el ID en JWT/session.

Con Auth.js se puede hacer mediante callbacks:

```text
jwt
session
```

Esto permite que APIs y UI sepan si el usuario autenticado es realmente admin.

## Middleware opcional

Actualmente `proxy.ts` solo maneja `next-intl` para rutas públicas:

```text
matcher: ['/', '/(es|en)/:path*']
```

No es obligatorio proteger `/admin` desde middleware si el layout y APIs ya validan sesión.

Opciones:

- Mantener protección en layout + APIs, recomendado por simplicidad.
- Agregar middleware/proxy para `/admin/:path*` como capa extra.

Para este proyecto, se recomienda empezar con layout + APIs.

## Configuración en GitHub OAuth App

Crear OAuth App en GitHub:

```text
GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
```

Configurar local:

```text
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/api/auth/callback/github
```

Configurar producción:

```text
Homepage URL: https://tu-dominio.com
Authorization callback URL: https://tu-dominio.com/api/auth/callback/github
```

Guardar:

```text
AUTH_GITHUB_ID
AUTH_GITHUB_SECRET
```

## UX del login

Actualizar `/admin/login` para explicar que el acceso es privado.

Texto recomendado:

```text
Acceso privado. Solo el administrador autorizado puede iniciar sesión.
```

Si el usuario no está permitido, Auth.js redirige a `/admin/login` con error.

Se puede mostrar un mensaje simple:

```text
No tienes permisos para acceder al panel admin.
```

## Alternativas a GitHub

### Opción A: GitHub con allowlist

Recomendada para este proyecto.

Ventajas:

- Simple.
- No necesitas manejar passwords.
- Buena seguridad si se valida `id` o `login`.
- Puedes usar 2FA de GitHub.

Desventajas:

- Dependes de GitHub.
- Requiere OAuth App configurada.

### Opción B: Email magic link

Ventajas:

- Solo entra quien controle tu email.
- No depende de GitHub.

Desventajas:

- Requiere proveedor de email.
- Más configuración.
- Debe protegerse contra abuso de envío.

### Opción C: Usuario/password propio

No recomendada para este caso.

Desventajas:

- Debes guardar hashes.
- Debes manejar recuperación de contraseña.
- Más superficie de seguridad.

### Opción D: Clerk/Auth0

Buena opción si el admin crece o habrá más usuarios.

Para un portafolio personal, probablemente es demasiado.

## Plan de implementación

### Fase 1: Endurecer GitHub Auth

- Agregar `ADMIN_GITHUB_LOGIN` y `ADMIN_GITHUB_ID` a `.env.example`.
- Actualizar `.env.local` con tus valores reales.
- Cambiar `auth.ts` para validar por `id`, `login` y email fallback.
- Normalizar comparaciones con lowercase.

### Fase 2: Proteger APIs admin

- Crear `lib/auth/admin.ts`.
- Agregar validación a todas las rutas `app/api/admin/**`.
- Responder `401` si no hay sesión.
- Responder `403` si hay sesión pero no es admin permitido.

### Fase 3: Mejorar sesión y errores

- Agregar callbacks `jwt` y `session` si se necesita guardar `githubId` o `githubLogin`.
- Mostrar mensaje claro en `/admin/login` cuando hay error.
- Mantener `robots: noindex` en admin.

### Fase 4: Validación local

- Probar login con tu cuenta GitHub.
- Probar login con otra cuenta GitHub y confirmar rechazo.
- Probar acceso directo a `/admin` sin sesión.
- Probar llamadas directas a `/api/admin/**` sin sesión.
- Probar llamadas directas a `/api/admin/**` con sesión no autorizada.

### Fase 5: Producción

- Configurar OAuth callback de producción en GitHub.
- Configurar variables en proveedor de hosting.
- Ejecutar `pnpm build`.
- Verificar login en dominio real.

## Checklist técnico

- [ ] `ADMIN_GITHUB_LOGIN` definido.
- [ ] `ADMIN_GITHUB_ID` definido.
- [ ] `ADMIN_EMAIL` queda como fallback.
- [ ] `auth.ts` valida identidad autorizada.
- [ ] `/admin` redirige si no hay sesión.
- [ ] `/api/admin/**` valida sesión y autorización.
- [ ] Usuario GitHub no autorizado no puede entrar.
- [ ] APIs admin no responden a usuarios no autorizados.
- [ ] OAuth callback local configurado.
- [ ] OAuth callback producción configurado.
- [ ] `pnpm build` pasa correctamente.

## Riesgos y mitigaciones

### Riesgo: cualquier GitHub entra al admin

Mitigación:

- Mantener callback `signIn` con allowlist por `ADMIN_GITHUB_ID` o `ADMIN_GITHUB_LOGIN`.

### Riesgo: email privado bloquea tu propio login

Mitigación:

- No depender solo de `profile.email`.
- Validar por `profile.id` o `profile.login`.

### Riesgo: APIs admin quedan expuestas

Mitigación:

- Validar `auth()` dentro de cada `app/api/admin/**`.
- No confiar solo en el layout protegido.

### Riesgo: perder acceso por cambio de username

Mitigación:

- Usar `ADMIN_GITHUB_ID` como validación principal, porque es estable.
- Mantener `ADMIN_GITHUB_LOGIN` como respaldo legible.

## Decisión recomendada

Usar **GitHub login + allowlist por GitHub ID**.

No necesitas otro tipo de login para este caso. GitHub es suficiente si la app valida que la cuenta autenticada sea la tuya y si también se protegen las rutas API del admin.
