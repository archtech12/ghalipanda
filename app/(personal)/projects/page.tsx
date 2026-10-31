'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { projects as allProjects, type Project } from '@/lib/projects'
import { homepageMetrics } from '@/lib/scorecard'
import { SITE_URL } from '@/lib/site'
import { ProjectModal } from '@/components/ProjectModal'

const getCategoryIcon = (category: string) => {
  if (category.includes('Water')) return 'water_drop'
  if (category.includes('Infrastructure')) return 'engineering'
  if (category.includes('Education')) return 'school'
  if (category.includes('Agriculture')) return 'agriculture'
  if (category.includes('Empowerment')) return 'diversity_3'
  if (category.includes('Health')) return 'medical_services'
  if (category.includes('Employment')) return 'work'
  if (category.includes('Legislation')) return 'gavel'
  if (category.includes('Governance')) return 'account_balance'
  return 'category'
}

const getCategoryColor = (category: string) => {
  if (category.includes('Water')) return 'bg-blue-100 text-blue-700 border-blue-200'
  if (category.includes('Infrastructure')) return 'bg-orange-100 text-orange-700 border-orange-200'
  if (category.includes('Education')) return 'bg-indigo-100 text-indigo-700 border-indigo-200'
  if (category.includes('Agriculture')) return 'bg-green-100 text-green-700 border-green-200'
  if (category.includes('Empowerment')) return 'bg-pink-100 text-pink-700 border-pink-200'
  if (category.includes('Health')) return 'bg-red-100 text-red-700 border-red-200'
  if (category.includes('Employment')) return 'bg-amber-100 text-amber-700 border-amber-200'
  if (category.includes('Legislation')) return 'bg-purple-100 text-purple-700 border-purple-200'
  if (category.includes('Governance')) return 'bg-teal-100 text-teal-700 border-teal-200'
  return 'bg-gray-100 text-gray-700 border-gray-200'
}

const ribbonIcons = ['solar_power', 'school', 'water_drop']

export default function ProjectsPage() {
  const [lang, setLang] = useState<'en' | 'ha'>('en')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const titleOf = (project: Project) => (lang === 'en' ? project.title : project.titleHA)

  // Every project in lib/projects.json is shown; there is no slice or page cap.
  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    allProjects.forEach(project => counts.set(project.category, (counts.get(project.category) ?? 0) + 1))
    return [
      { name: 'All', count: allProjects.length },
      ...Array.from(counts, ([name, count]) => ({ name, count })),
    ]
  }, [])

  // Support deep links such as /projects?category=water
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('category')?.toLowerCase()
    if (!param) return
    const match = categories.find(c => c.name.toLowerCase() === param || c.name.toLowerCase().includes(param))
    if (match) setActiveCategory(match.name)
  }, [categories])

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return allProjects.filter(project => {
      if (activeCategory !== 'All' && project.category !== activeCategory) return false
      if (!query) return true
      return `${project.title} ${project.titleHA} ${project.description} ${project.impact} ${project.location}`
        .toLowerCase()
        .includes(query)
    })
  }, [activeCategory, searchQuery])

  const groupedProjects = useMemo(() => {
    const groups: Record<string, Project[]> = {}
    filteredProjects.forEach(project => {
      ;(groups[project.category] ??= []).push(project)
    })
    return Object.entries(groups)
  }, [filteredProjects])

  const projectUrl = (project: Project) => `${SITE_URL}/projects/${project._id}`

  const copyLink = async (project: Project) => {
    try {
      await navigator.clipboard.writeText(`${titleOf(project)}\n${projectUrl(project)}`)
      setCopiedId(project._id)
      window.setTimeout(() => setCopiedId(id => (id === project._id ? null : id)), 2000)
    } catch {
      setCopiedId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-green-100 selection:text-green-900">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="animate-blob absolute -left-[10%] -top-[20%] h-[50%] w-[50%] rounded-full bg-green-500/20 blur-[120px]"></div>
          <div className="animate-blob animation-delay-2000 absolute bottom-0 right-0 h-[40%] w-[40%] rounded-full bg-yellow-500/10 blur-[100px]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-8 text-center md:py-12">
          <div className="mb-3 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-green-100 backdrop-blur-md md:text-sm">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
            Development in Action
          </div>
          <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            {lang === 'en' ? (
              <>
                Transforming Our <span className="bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">Community</span>
              </>
            ) : (
              "Canza Al'ummarmu"
            )}
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-base font-light leading-relaxed text-green-100 md:text-lg">
            {lang === 'en'
              ? 'Explore the projects and empowerment initiatives delivered across Gaya, Ajingi, and Albasu Federal Constituency.'
              : 'Bincika muhimman ayyuka da tsare-tsaren da aka aiwatar a Gaya, Ajingi, da Albasu.'}
          </p>

          <div className="inline-flex rounded-full border border-white/20 bg-white/10 p-1 shadow-xl backdrop-blur-md" role="group" aria-label="Language">
            {(['en', 'ha'] as const).map(code => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${
                  lang === code ? 'bg-white text-green-900 shadow-md' : 'text-white hover:bg-white/10'
                }`}
              >
                {code === 'en' ? 'English' : 'Hausa'}
              </button>
            ))}
          </div>
        </div>

        {/* Scorecard ribbon: total comes from the data, figures from the scorecard */}
        <div className="border-t border-emerald-800/60 bg-emerald-950/90 px-4 py-3 text-white backdrop-blur-md">
          <div className="container mx-auto flex flex-wrap items-center justify-around gap-x-6 gap-y-2 text-center text-xs font-semibold sm:text-sm">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-emerald-400">verified</span>
              <span>
                <strong>{allProjects.length}</strong> Projects Documented
              </span>
            </div>
            {homepageMetrics.map((metric, index) => (
              <div key={metric.projectId} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-amber-300">{ribbonIcons[index % ribbonIcons.length]}</span>
                <span>
                  <strong>{metric.value}</strong> {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky controls */}
      <div className="sticky top-[56px] z-30 border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="container mx-auto space-y-2 px-4 py-3 md:flex md:items-center md:justify-between md:gap-4 md:space-y-0">
          <div className="no-scrollbar flex gap-2 overflow-x-auto py-1" role="tablist" aria-label="Project categories">
            {categories.map(({ name, count }) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={activeCategory === name}
                onClick={() => setActiveCategory(name)}
                className={`flex-shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300 ${
                  activeCategory === name
                    ? 'border-green-700 bg-green-700 text-white shadow-[0_4px_12px_rgba(21,128,61,0.3)]'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                {name} <span className="ml-1 text-xs opacity-75">{count}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full flex-shrink-0 md:w-72">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              type="search"
              placeholder={lang === 'en' ? 'Search projects...' : 'Nemi ayyuka...'}
              aria-label="Search projects"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>
      </div>

      {/* Projects */}
      <main className="container mx-auto px-4 py-8 md:py-10">
        <p className="mb-6 text-sm font-semibold text-gray-600" aria-live="polite">
          {lang === 'en'
            ? `Showing ${filteredProjects.length} of ${allProjects.length} projects`
            : `Ana nuna ayyuka ${filteredProjects.length} daga cikin ${allProjects.length}`}
        </p>

        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-6">
              <span className="material-symbols-outlined text-4xl text-gray-400">search_off</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-700">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All')
                setSearchQuery('')
              }}
              className="mt-6 font-medium text-green-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {groupedProjects.map(([category, items]) => (
              <section key={category} aria-labelledby={`cat-${category}`}>
                <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getCategoryColor(category)}`}>
                    <span className="material-symbols-outlined text-[22px]">{getCategoryIcon(category)}</span>
                  </div>
                  <h2 id={`cat-${category}`} className="text-xl font-black uppercase tracking-tight text-gray-900 md:text-2xl">
                    {category}
                  </h2>
                  <span className="ml-auto rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-600">
                    {items.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map(project => (
                    <article
                      key={project._id}
                      className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedProject({ ...project, title: titleOf(project) })}
                        aria-label={`View details for ${titleOf(project)}`}
                        className="flex flex-1 text-left sm:flex-col"
                      >
                        {/* Thumbnail: side-by-side on mobile, banner from sm up */}
                        <div className="relative w-24 shrink-0 self-stretch bg-gray-100 sm:h-32 sm:w-full">
                          {project.images.length > 0 ? (
                            <>
                              <Image
                                src={project.images[0]}
                                alt={titleOf(project)}
                                fill
                                sizes="(max-width: 640px) 96px, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              {project.images.length > 1 && (
                                <span className="absolute bottom-1 right-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                  +{project.images.length - 1}
                                </span>
                              )}
                            </>
                          ) : (
                            <div className={`flex h-full w-full items-center justify-center ${getCategoryColor(project.category).split(' ').slice(0, 2).join(' ')}`}>
                              <span className="material-symbols-outlined text-4xl opacity-70">{getCategoryIcon(project.category)}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3 sm:p-4">
                          <div className="flex items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-wider text-gray-400">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px] text-green-600">calendar_today</span>
                              {project.date}
                            </span>
                            {project.status && (
                              <span className="shrink-0 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-bold normal-case tracking-normal text-green-700">
                                {project.status}
                              </span>
                            )}
                          </div>
                          <h3 className="line-clamp-2 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-green-700">
                            {titleOf(project)}
                          </h3>
                          <p className="line-clamp-2 text-xs font-semibold text-green-800">{project.impact}</p>
                          <p className="hidden text-xs leading-relaxed text-gray-600 sm:line-clamp-2">{project.description}</p>
                          <p className="flex items-start gap-1 text-xs text-gray-500">
                            <span className="material-symbols-outlined mt-px shrink-0 text-[14px] text-green-600">location_on</span>
                            <span className="line-clamp-1">{project.location}</span>
                          </p>
                        </div>
                      </button>

                      <div className="flex items-center justify-between border-t border-gray-100 px-3 py-2 sm:px-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Share</span>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(`${titleOf(project)} - ${projectUrl(project)}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600 transition-all hover:bg-green-500 hover:text-white"
                            aria-label={`Share ${titleOf(project)} on WhatsApp`}
                          >
                            <i className="fab fa-whatsapp"></i>
                          </a>
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectUrl(project))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all hover:bg-blue-600 hover:text-white"
                            aria-label={`Share ${titleOf(project)} on Facebook`}
                          >
                            <i className="fab fa-facebook-f text-sm"></i>
                          </a>
                          <button
                            type="button"
                            onClick={() => copyLink(project)}
                            className="flex h-8 min-w-8 items-center justify-center rounded-full bg-gray-100 px-2 text-gray-500 transition-all hover:bg-gray-700 hover:text-white"
                            aria-label={`Copy link to ${titleOf(project)}`}
                          >
                            {copiedId === project._id ? (
                              <span className="text-[11px] font-bold">Copied</span>
                            ) : (
                              <span className="material-symbols-outlined text-[18px]">content_copy</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}
