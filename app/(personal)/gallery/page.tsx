import Image from 'next/image'
import Link from 'next/link'
import {projects} from '@/lib/projects'

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
      <div className="container mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-widest text-green-700">Albasu · Gaya · Ajingi</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div><h1 className="text-3xl font-bold text-gray-900">Project Gallery</h1><p className="mt-1 text-sm text-gray-600">Images from the constituency scorecard projects.</p></div>
          <Link href="/projects" className="shrink-0 text-sm font-bold text-green-800 hover:underline">Project list →</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {projects.map((project) => <figure key={project._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="relative h-32 sm:h-44"><Image src={project.images[0]} alt={project.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" /></div>
            <figcaption className="p-3"><p className="line-clamp-2 text-sm font-bold text-gray-900">{project.title}</p><p className="mt-1 text-xs text-gray-500">{project.category}</p></figcaption>
          </figure>)}
        </div>
      </div>
    </main>
  )
}
