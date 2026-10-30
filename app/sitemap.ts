import type {MetadataRoute} from 'next'
import {projects} from '@/lib/projects'

const baseUrl = 'https://ghalipanda.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/constituency', '/projects', '/gallery', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.7,
  }))
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project._id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))
  return [...staticRoutes, ...projectRoutes]
}
