import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // Hide API and Admin routes from crawlers
    },
    sitemap: 'https://ghalipanda.com/sitemap.xml',
  }
}
