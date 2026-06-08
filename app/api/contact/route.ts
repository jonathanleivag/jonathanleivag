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

    // Honeypot anti-spam
    if (company) {
      return NextResponse.json({ ok: true, message: 'Mensaje enviado correctamente' })
    }

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_TO_EMAIL ?? '',
      replyTo: email,
      subject: `[Portafolio] ${subject}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Nuevo mensaje desde el portafolio</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br />')}</p>
        </div>
      `,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json(
        { ok: false, message: 'No se pudo enviar el mensaje. Intenta nuevamente.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, message: 'Mensaje enviado correctamente' })
  } catch {
    return NextResponse.json(
      { ok: false, message: 'No se pudo enviar el mensaje. Intenta nuevamente.' },
      { status: 500 }
    )
  }
}
