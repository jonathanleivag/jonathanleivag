/** @type {import('next').NextConfig} */

const ESLintPlugin = require('eslint-webpack-plugin')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'github.com']
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

module.exports = nextConfig
