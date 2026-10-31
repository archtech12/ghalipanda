import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // Hide API and Admin routes from crawlers
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
