import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Jonathan Leiva Gómez — Desarrollador Full Stack Senior'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo */}
        <img
          src="https://res.cloudinary.com/dq8fpb695/image/upload/f_png,w_64,h_64/jonathanleivag/logo/ohbxjqje4kelihconfov"
          width={64}
          height={64}
          style={{ marginBottom: '32px', borderRadius: '8px' }}
        />

        {/* Name */}
        <div style={{ fontSize: '56px', fontWeight: 700, color: '#f4f4f5', lineHeight: 1.1, marginBottom: '16px' }}>
          Jonathan Leiva Gómez
        </div>

        {/* Role */}
        <div style={{ fontSize: '28px', color: '#10b981', fontWeight: 600, marginBottom: '24px' }}>
          Desarrollador Full Stack Senior
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['Vue.js', 'React', 'TypeScript', 'Node.js', 'GraphQL'].map((tech) => (
            <div
              key={tech}
              style={{
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#10b981',
                padding: '6px 16px',
                borderRadius: '6px',
                fontSize: '18px',
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: '60px', right: '80px', fontSize: '20px', color: '#52525b' }}>
          jonathanleivag.cl
        </div>
      </div>
    ),
    { ...size }
  )
}
