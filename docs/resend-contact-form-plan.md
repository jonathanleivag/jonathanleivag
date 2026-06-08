# Plan para formulario de contacto con Resend

## Objetivo

Implementar un formulario de contacto funcional en el portafolio usando **Resend** como proveedor principal de envío de correos.

El formulario permitirá que reclutadores, CTOs o potenciales clientes envíen mensajes directamente desde la web, sin exponer credenciales privadas en el navegador.

## Por qué usar Resend

Resend es la opción recomendada para este portafolio porque:

- Tiene plan gratuito para comenzar.
- Se integra muy bien con Next.js App Router.
- Evita configurar SMTP manualmente.
- No requiere exponer contraseñas de correo.
- Permite escalar luego con dominio verificado.
- Tiene una API simple para enviar emails desde server-side.

## Flujo esperado

```text
Usuario completa formulario
        ↓
POST /api/contact
        ↓
Validación server-side
        ↓
Resend envía el email
        ↓
Mensaje llega al correo configurado
        ↓
Usuario ve estado de éxito o error
```

## Resultado esperado en UI

En la sección `Contacto` debe existir un formulario con:

```text
Nombre
Email
Asunto
Mensaje
[Enviar mensaje]
```

También se deben mantener los links actuales:

- LinkedIn
- GitHub
- Descargar CV
- Email directo si aplica

## Dependencias necesarias

Instalar Resend:

```bash
pnpm add resend
```

Instalar Zod para validación:

```bash
pnpm add zod
```

## Variables de entorno

Crear o actualizar `.env.local`:

```env
RESEND_API_KEY="tu_resend_api_key"
CONTACT_TO_EMAIL="tu_correo_destino"
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

### Para producción

Cuando el dominio esté verificado en Resend, usar:

```env
CONTACT_FROM_EMAIL="Portfolio <contacto@jonathanleivag.cl>"
```

## Dónde obtener `RESEND_API_KEY`

1. Entrar a `https://resend.com`.
2. Crear cuenta o iniciar sesión.
3. Ir a **API Keys**.
4. Crear una nueva API key.
5. Copiar el valor en `.env.local`.

```env
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxx"
```

## Seguridad de variables

Importante:

- No subir `.env.local` a GitHub.
- Confirmar que `.env.local` esté en `.gitignore`.
- No usar `RESEND_API_KEY` en componentes con `'use client'`.
- Solo usar Resend desde route handlers, server actions o código server-side.

## Estructura de archivos propuesta

```text
app/
  api/
    contact/
      route.ts

components/
  sections/
    Contact.tsx
  ui/
    ContactForm.tsx

lib/
  resend.ts
  validations/
    contact.ts
```

## Modelo del formulario

```ts
type ContactFormValues = {
  name: string
  email: string
  subject: string
  message: string
  company?: string
}
```

El campo `company` será un honeypot anti-spam invisible para usuarios reales.

## Validación con Zod

Crear archivo:

```text
lib/validations/contact.ts
```

Contenido sugerido:

```ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Ingresa tu nombre'),
  email: z.string().trim().email('Ingresa un email válido'),
  subject: z.string().trim().min(3, 'Ingresa un asunto'),
  message: z.string().trim().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  company: z.string().optional(),
})

export type ContactInput = z.infer<typeof contactSchema>
```

## Configuración de Resend

Crear archivo:

```text
lib/resend.ts
```

Contenido sugerido:

```ts
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined')
}

export const resend = new Resend(process.env.RESEND_API_KEY)
```

## Endpoint de contacto

Crear archivo:

```text
app/api/contact/route.ts
```

Responsabilidades:

- Recibir petición `POST`.
- Validar datos con `contactSchema`.
- Rechazar spam por honeypot.
- Enviar correo usando Resend.
- Responder JSON con éxito o error.
- No exponer errores internos al cliente.

Ejemplo base:

```ts
import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import { contactSchema } from '@/lib/validations/contact'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: 'Revisa los datos del formulario' },
        { status: 400 }
      )
    }

    const { name, email, subject, message, company } = parsed.data

    if (company) {
      return NextResponse.json({ ok: true, message: 'Mensaje enviado correctamente' })
    }

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_TO_EMAIL ?? '',
      replyTo: email,
      subject: `[Portafolio] ${subject}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
          <h2>Nuevo mensaje desde el portafolio</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, '<br />')}</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true, message: 'Mensaje enviado correctamente' })
  } catch {
    return NextResponse.json(
      { ok: false, message: 'No se pudo enviar el mensaje. Intenta nuevamente.' },
      { status: 500 }
    )
  }
}
```

## Componente `ContactForm`

Crear archivo:

```text
components/ui/ContactForm.tsx
```

Debe ser client component:

```tsx
'use client'
```

Estados mínimos:

```ts
type FormStatus = 'idle' | 'loading' | 'success' | 'error'
```

Debe manejar:

- Inputs controlados o `FormData`.
- Estado `loading` mientras envía.
- Mensaje de éxito.
- Mensaje de error.
- Reset del formulario si el envío fue exitoso.
- Honeypot oculto.

## UX del formulario

### Estado inicial

- Campos vacíos.
- Botón activo.
- Texto del botón: `Enviar mensaje`.

### Estado loading

- Botón deshabilitado.
- Texto del botón: `Enviando...`.
- Evitar doble submit.

### Estado success

- Mostrar: `Mensaje enviado correctamente. Te responderé pronto.`
- Limpiar campos.
- Mantener links alternativos visibles.

### Estado error

- Mostrar: `No se pudo enviar el mensaje. Intenta nuevamente o escríbeme por LinkedIn.`
- No borrar campos.

## Integración en sección Contact

Actualizar:

```text
components/sections/Contact.tsx
```

Layout recomendado:

```text
Desktop:
[Mensaje + links] [Formulario]

Mobile:
[Mensaje]
[Formulario]
[Links]
```

El formulario debe ser el CTA principal de la sección.

## Accesibilidad

Requisitos:

- Cada campo debe tener `label` visible.
- Usar `aria-invalid` en campos con error.
- Usar `aria-describedby` para mensajes de error.
- Usar `aria-live="polite"` para mensajes globales.
- Botón con texto claro.
- Focus visible en inputs, textarea y botón.
- No depender solo del color para comunicar error.

## Anti-spam básico

### Honeypot

Agregar campo invisible:

```html
<input name="company" tabIndex={-1} autoComplete="off" />
```

Si `company` viene con valor, responder éxito falso y no enviar email.

### Rate limiting recomendado

Para una segunda fase:

- Upstash Redis.
- Vercel KV.
- Middleware por IP.
- Límite sugerido: 3 envíos cada 10 minutos por IP.

## Consideraciones para dominio propio

Para usar:

```env
CONTACT_FROM_EMAIL="Portfolio <contacto@jonathanleivag.cl>"
```

Se debe verificar el dominio en Resend.

Pasos generales:

1. Ir a Resend.
2. Entrar en **Domains**.
3. Agregar `jonathanleivag.cl`.
4. Copiar registros DNS.
5. Agregar registros en el proveedor DNS.
6. Esperar verificación.
7. Cambiar `CONTACT_FROM_EMAIL`.

## Testing manual

Probar:

- Envío exitoso.
- Email inválido.
- Mensaje vacío.
- Mensaje muy corto.
- Doble click en enviar.
- Error simulando `RESEND_API_KEY` inválida.
- Honeypot con valor.
- Navegación con teclado.
- Mobile responsive.
- Que el correo llegue al inbox correcto.
- Que al responder el correo se responda al usuario gracias a `replyTo`.

## Validaciones técnicas

Ejecutar:

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

Nota: si `pnpm build` falla por Google Fonts, ese problema es independiente del formulario y debe resolverse usando fuente local o build con acceso de red.

## Checklist de implementación

- [ ] Crear cuenta en Resend.
- [ ] Crear `RESEND_API_KEY`.
- [ ] Instalar `resend`.
- [ ] Instalar `zod`.
- [ ] Crear `.env.local` con variables necesarias.
- [ ] Verificar `.env.local` en `.gitignore`.
- [ ] Crear `lib/resend.ts`.
- [ ] Crear `lib/validations/contact.ts`.
- [ ] Crear `app/api/contact/route.ts`.
- [ ] Crear `components/ui/ContactForm.tsx`.
- [ ] Integrar formulario en `components/sections/Contact.tsx`.
- [ ] Agregar honeypot anti-spam.
- [ ] Agregar estados loading, success y error.
- [ ] Validar accesibilidad.
- [ ] Probar envío real.
- [ ] Ejecutar TypeScript.
- [ ] Ejecutar lint.
- [ ] Ejecutar build.

## Orden recomendado

1. Crear cuenta y API key en Resend.
2. Agregar variables a `.env.local`.
3. Instalar `resend` y `zod`.
4. Crear validación del formulario.
5. Crear cliente Resend server-side.
6. Crear endpoint `/api/contact`.
7. Crear componente `ContactForm`.
8. Integrar formulario en sección Contact.
9. Probar envío real.
10. Mejorar accesibilidad y responsive.
11. Verificar dominio propio en Resend si se usará `contacto@jonathanleivag.cl`.

## Criterio de éxito

La implementación estará lista cuando:

- El formulario aparece correctamente en la sección de contacto.
- El usuario puede enviar nombre, email, asunto y mensaje.
- El mensaje llega al correo configurado en `CONTACT_TO_EMAIL`.
- El email recibido permite responder directamente al visitante mediante `replyTo`.
- La API key de Resend no se expone en el navegador.
- El formulario muestra estados de carga, éxito y error.
- El formulario funciona bien en mobile.
- La navegación por teclado es correcta.
- TypeScript y lint pasan correctamente.
