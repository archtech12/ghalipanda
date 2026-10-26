import { NextConfig } from 'next'

const config: NextConfig = {
  reactCompiler: true,
  experimental: {
    cpus: 2,
    webpackMemoryOptimizations: true,
  },
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'localhost', port: '5000', protocol: 'http' },
      { hostname: '127.0.0.1', port: '5000', protocol: 'http' },
      { hostname: '*.supabase.co', protocol: 'https' }
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  turbopack: {
    root: __dirname,
  },

}

export default config
