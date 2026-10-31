import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/news',
    '/constituency',
    '/gallery',
    '/legislative',
    '/volunteer',
    '/support',
    '/applications',
    '/contact',
    '/sticker-generator',
    '/supporter-card',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/projects/${p._id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes]
}
