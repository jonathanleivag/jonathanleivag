/** @type {import('next').NextConfig} */

const ESLintPlugin = require('eslint-webpack-plugin')
const withPWA = require('next-pwa')

const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: 'public'
  },
  images: {
    domains: [
      'raw.githubusercontent.com',
      'github.com',
      'avatars.githubusercontent.com'
    ]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (dev) {
      config.plugins.push(
        new ESLintPlugin({
          files: ['**/*.{ts,tsx,js,jsx}'],
          exclude: ['node_modules'],
          extensions: ['ts', 'tsx', 'js', 'jsx']
        })
      )
    }
    return config
  }
}

module.exports = withPWA(nextConfig)
