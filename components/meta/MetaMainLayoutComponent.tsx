import { FC } from 'react'
import Head from 'next/head'

export interface IMetaMainLayoutComponentProps {
  title: string
  tags: string[]
  pathname: string
  description: string
}

export const MetaMainLayoutComponent: FC<IMetaMainLayoutComponentProps> = ({
  title,
  tags,
  pathname,
  description
}) => {
  return (
    <Head>
      {/* SEO */}
      <title>{title} | jonathanleivag</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      {/* <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
      /> */}

      <meta
        name='description'
        content={`Portafolio de jonathanleivag - ${description}`}
      />
      <meta
        name='keywords'
        content={[
          'jonathanleivag',
          'jonathan',
          'leiva',
          'programación',
          'javascript',
          'typescript',
          'react',
          'nodejs',
          'express',
          'mongodb',
          ...tags
        ].toString()}
      />
      <meta name='author' content='Jonathan Leiva Gómez' />
      <meta name='jonathanleivag' content='Propietario de jonathanleivag' />
      <meta name='robots' content='index' />
      <meta name='robots' content='follow' />

      <link rel='canonical' href={`https://jonathanleivag.cl/${pathname}`} />

      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='jonathanleivag' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-config' content='/icons/browserconfig.xml' />
      <meta name='msapplication-tap-highlight' content='no' />

      {/* favicon */}
      <link
        rel='apple-touch-icon'
        sizes='57x57'
        href='/icons/apple-icon-57x57.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='60x60'
        href='/icons/apple-icon-60x60.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='72x72'
        href='/icons/apple-icon-72x72.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='76x76'
        href='/icons/apple-icon-76x76.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='114x114'
        href='/icons/apple-icon-114x114.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='120x120'
        href='/icons/apple-icon-120x120.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='144x144'
        href='/icons/apple-icon-144x144.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='152x152'
        href='/icons/apple-icon-152x152.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/icons/apple-icon-180x180.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='192x192'
        href='/icons/android-icon-192x192.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/icons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='96x96'
        href='/icons/favicon-96x96.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/icons/favicon-16x16.png'
      />
      <link rel='manifest' href='/manifest.json' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-TileImage'
        content='/icons/ms-icon-144x144.png'
      />
      <meta name='theme-color' content='#ffffff' />

      {/* twitter */}
      <meta name='twitter:card' content={description} />
      <meta name='twitter:site' content='@jonathanleivag' />
      <meta name='twitter:url' content='https://www.jonathanleivag.cl' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta
        name='twitter:image'
        content='https://www.jonathanleivag.cl/images/profile.jpg'
      />
      <meta name='twitter:image:alt' content='Jonathan Leiva Gómez' />
      <meta name='twitter:image:width' content='1200' />
      <meta name='twitter:image:height' content='1600' />
      <meta name='twitter:creator' content='@jonathanleivag' />
      <meta name='twitter:domain' content='https://www.jonathanleivag.cl' />

      {/* og */}
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content='jonathanleivag' />
      <meta property='og:url' content='https://www.jonathanleivag.cl' />
      <meta
        property='og:image'
        content='https://www.jonathanleivag.cl/icons/apple-icon.png'
      />

      {/* apple splash screen images */}
      <link
        rel='apple-touch-startup-image'
        href='/images/apple_splash_2048.png'
        sizes='2048x2732'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple_splash_1668.png'
        sizes='1668x2224'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple_splash_1536.png'
        sizes='1536x2048'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple_splash_1125.png'
        sizes='1125x2436'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple_splash_1242.png'
        sizes='1242x2208'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple_splash_750.png'
        sizes='750x1334'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple_splash_640.png'
        sizes='640x1136'
      />
    </Head>
  )
}
