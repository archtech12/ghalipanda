'use client'

import Image from 'next/image'
import { projects as staticProjects } from '@/lib/projects'

interface GalleryItem {
  id: string
  title: string
  category: string
  image: string
  description: string
}

export default function GalleryPage() {
  const galleryItems: GalleryItem[] = staticProjects
    .filter(project => project.images.length > 0)
    .map(project => ({
      id: project._id,
      title: project.title,
      category: project.category,
      image: project.images[0],
      description: project.description,
    }))
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-green-900/90 dark:bg-green-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">
            Media Gallery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-green-100">
            Capturing the impact of our interventions across Gaya, Ajingi, and Albasu Federal Constituency.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <span className="inline-block px-2 py-1 bg-green-600 text-white text-xs font-bold rounded-sm mb-2">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
