const CLOUD = 'dq8fpb695'
const LOGO_ID = 'jonathanleivag/logo/ohbxjqje4kelihconfov'

export const assets = {
  logo: {
    src: `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_96/${LOGO_ID}`,
    alt: 'Logo de Jonathan Leiva Gómez',
    width: 40,
    height: 40,
  },
  favicon: {
    ico: '/favicon.ico',
    png32: '/favicon-32x32.png',
    appleTouchIcon: '/apple-touch-icon.png',
  },
} as const
