import { ImageResponse } from 'next/og'

export const OG_IMAGE_SIZE = { width: 1200, height: 630 }
export const OG_LOGO_URL = 'https://res.cloudinary.com/dq8fpb695/image/upload/f_png,w_64,h_64/jonathanleivag/logo/ohbxjqje4kelihconfov'
export const OG_TECH_TAGS = ['Vue.js', 'React', 'TypeScript', 'Node.js', 'GraphQL'] as const

interface OgImageContentProps {
  name: string
  role: string
}

export function OgImageContent({ name, role }: OgImageContentProps) {
  return (
    <div
      style={{
        background: '#151a19',
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
      <img
        src={OG_LOGO_URL}
        alt=""
        width={64}
        height={64}
        style={{ marginBottom: '32px', borderRadius: '8px' }}
      />

      <div style={{ fontSize: '56px', fontWeight: 700, color: '#e8e6dd', lineHeight: 1.1, marginBottom: '16px' }}>
        {name}
      </div>

      <div style={{ fontSize: '28px', color: '#e8e6dd', fontWeight: 600, marginBottom: '24px', opacity: 0.85 }}>
        {role}
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {OG_TECH_TAGS.map((tech) => (
          <div
            key={tech}
            style={{
              background: 'rgba(232,230,221,0.08)',
              border: '1px solid rgba(232,230,221,0.24)',
              color: '#e8e6dd',
              padding: '6px 16px',
              borderRadius: '6px',
              fontSize: '18px',
            }}
          >
            {tech}
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: '60px', right: '80px', fontSize: '20px', color: '#6b7280' }}>
        jonathanleivag.cl
      </div>
    </div>
  )
}

export function createOgImageResponse(name: string, role: string) {
  return new ImageResponse(<OgImageContent name={name} role={role} />, { ...OG_IMAGE_SIZE })
}
