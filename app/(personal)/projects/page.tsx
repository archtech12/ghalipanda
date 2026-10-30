'use client'

import {useMemo, useState} from 'react'
import Image from 'next/image'
import {ProjectModal} from '@/components/ProjectModal'
import {projects} from '@/lib/projects'

type Project = (typeof projects)[number]

const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const visibleProjects = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase()
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory
      const matchesSearch = !query || `${project.title} ${project.titleHA} ${project.description} ${project.location}`.toLocaleLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-gradient-to-br from-green-950 via-green-900 to-green-800 px-4 py-8 text-white sm:py-12">
        <div className="container mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-200">Albasu · Gaya · Ajingi</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">Constituency Projects</h1>
              <p className="mt-1 text-sm text-green-100">{projects.length} initiatives from the constituency scorecard</p>
            </div>
            <label className="block w-full sm:max-w-xs">
              <span className="sr-only">Search projects</span>
              <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search projects…" className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-green-100/70 outline-none ring-green-300 focus:ring-2" />
            </label>
          </div>
        </div>
      </header>

      <nav aria-label="Filter projects by category" className="sticky top-14 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="container mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${activeCategory === category ? 'border-green-800 bg-green-800 text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-green-700 hover:text-green-800'}`}>
              {category}
            </button>
          ))}
        </div>
      </nav>

      <section className="container mx-auto max-w-6xl px-4 pt-5">
        <p className="mb-3 text-xs text-gray-500">Showing {visibleProjects.length} of {projects.length}</p>
        {visibleProjects.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {visibleProjects.map((project) => (
              <button key={project._id} onClick={() => setSelectedProject(project)} className="group overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-700">
                <div className="relative h-28 bg-gradient-to-br from-green-700 to-green-950 sm:h-36">
                  {project.images[0] && <Image src={project.images[0]} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition duration-300 group-hover:scale-105" />}
                  <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-green-800">{project.category}</span>
                </div>
                <div className="p-3 sm:p-4">
                  <h2 className="line-clamp-2 min-h-10 text-sm font-bold leading-snug text-gray-900 group-hover:text-green-800 sm:text-base">{project.title}</h2>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-600">{project.impact}</p>
                  <span className="mt-2 block text-[10px] font-semibold text-gray-400">{project.date}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center text-sm text-gray-500">No projects match this search.</div>
        )}
      </section>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  )
}
