import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ghalipanda.com'
  
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/news',
    '/campaign',
    '/constituency',
    '/gallery',
    '/legislative',
    '/volunteer',
    '/support',
    '/applications',
    '/contact',
    '/sticker-generator'
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
