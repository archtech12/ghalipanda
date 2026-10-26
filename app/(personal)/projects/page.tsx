'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { projects as staticProjects } from '@/lib/projects' // Using local data fallback
import Link from 'next/link'
import { ProjectModal } from '@/components/ProjectModal'

interface Project {
  _id: string
  title: string
  titleHA: string
  description: string
  category: string
  images: string[]
  date: string
  status?: string
  impact?: string
  location?: string
}

// ... (Imports)

// Helper for Category Icons
const getCategoryIcon = (category: string) => {
  if (category.includes('Water')) return 'water_drop'
  if (category.includes('Electricity') || category.includes('Lighting')) return 'bolt'
  if (category.includes('Infrastructure') || category.includes('Construction') || category.includes('Road')) return 'engineering'
  if (category.includes('Education')) return 'school'
  if (category.includes('Agriculture') || category.includes('Food')) return 'agriculture'
  if (category.includes('Youth') || category.includes('Women') || category.includes('Empowerment')) return 'diversity_3'
  if (category.includes('Community') || category.includes('Health') || category.includes('Support')) return 'medical_services'
  if (category.includes('Legislative')) return 'gavel'
  if (category.includes('Sports')) return 'sports_soccer'
  return 'category'
}

// Category Colors
const getCategoryColor = (category: string) => {
  if (category.includes('Water')) return 'bg-blue-100 text-blue-700 border-blue-200'
  if (category.includes('Electricity') || category.includes('Lighting')) return 'bg-yellow-100 text-yellow-700 border-yellow-200'
  if (category.includes('Infrastructure') || category.includes('Construction') || category.includes('Road')) return 'bg-orange-100 text-orange-700 border-orange-200'
  if (category.includes('Education')) return 'bg-indigo-100 text-indigo-700 border-indigo-200'
  if (category.includes('Agriculture') || category.includes('Food')) return 'bg-green-100 text-green-700 border-green-200'
  if (category.includes('Youth') || category.includes('Women') || category.includes('Empowerment')) return 'bg-pink-100 text-pink-700 border-pink-200'
  if (category.includes('Community') || category.includes('Health') || category.includes('Support')) return 'bg-red-100 text-red-700 border-red-200'
  if (category.includes('Legislative')) return 'bg-purple-100 text-purple-700 border-purple-200'
  if (category.includes('Sports')) return 'bg-teal-100 text-teal-700 border-teal-200'
  return 'bg-gray-100 text-gray-700 border-gray-200'
}

export default function ProjectsPage() {
  const [lang, setLang] = useState<'en' | 'ha'>('en')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const projects = staticProjects as Project[]
  const loading = false

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])
  
  const toggleLang = () => setLang(prev => prev === 'en' ? 'ha' : 'en')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Link copied to clipboard!')
  }

  // Filter out Legislative category from main projects list
  const displayProjects = useMemo(() => {
    return projects.filter(p => p.category !== 'Legislative')
  }, [projects])

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(displayProjects.map(p => p.category))
    return ['All', ...Array.from(cats)]
  }, [displayProjects])

  const filteredProjects = useMemo(() => {
    return displayProjects.filter(project => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory
      const searchContent = `${project.title} ${project.titleHA} ${project.description} ${project.impact || ''} ${project.location || ''}`.toLowerCase()
      const matchesSearch = searchContent.includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery, displayProjects])

  // Group projects by category for thematic view
  const groupedProjects = useMemo(() => {
    const groups = {} as Record<string, Project[]>;
    filteredProjects.forEach(p => {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    });
    return groups;
  }, [filteredProjects])

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-red-100 selection:text-red-800">
      
      {/* Hero Section - Premium */}
      <div className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white overflow-hidden pb-8">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-green-500/20 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 py-10 md:py-14 relative z-10 text-center animate-fade-in-up">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-4 text-xs md:text-sm font-semibold tracking-wide uppercase text-green-100 shadow-lg">
             <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block mr-2"></span>
             Development in Action
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight drop-shadow-sm leading-tight">
            {lang === 'en' ? (
              <>
                Transforming Our <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300">Community</span>
              </>
            ) : (
              'Canza Al\'ummarmu'
            )}
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {lang === 'en' 
              ? 'Explore the tangible projects, infrastructure, and empowerment initiatives delivering real change to Gaya, Ajingi, and Albasu Federal Constituency.' 
              : 'Bincika muhimman ayyuka da tsare-tsaren da ke kawo sauyi na hakika ga Gaya, Ajingi, da Albasu.'}
          </p>
          
          <div className="inline-flex bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20 shadow-xl">
            <button 
              onClick={toggleLang}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${lang === 'en' ? 'bg-white text-green-900 shadow-md transform scale-105' : 'text-white hover:bg-white/10'}`}
            >
              English
            </button>
            <button 
              onClick={toggleLang}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${lang === 'ha' ? 'bg-white text-green-900 shadow-md transform scale-105' : 'text-white hover:bg-white/10'}`}
            >
              Hausa
            </button>
          </div>
        </div>
      </div>

      {/* Controls Section (Sticky) */}
      <div className="sticky top-[56px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
          
          {/* Category Filter (Horizontal Scroll on Mobile) */}
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-3 no-scrollbar mask-linear-fade py-2 px-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-green-700 text-white border-green-700 shadow-[0_4px_12px_rgba(21,128,61,0.3)] transform -translate-y-0.5' 
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              type="text"
              placeholder={lang === 'en' ? "Search projects..." : "Nemi ayyuka..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <main className="container mx-auto px-4 py-12">
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <span className="material-symbols-outlined text-4xl text-gray-400">search_off</span>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => {setActiveCategory('All'); setSearchQuery('')}}
              className="mt-6 text-green-600 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(groupedProjects).map(([category, catProjects]) => (
              <div key={category} className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryColor(category)}`}>
                     <span className="material-symbols-outlined">{getCategoryIcon(category)}</span>
                   </div>
                   <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">{category}</h2>
                   <span className="ml-auto bg-gray-100 text-gray-600 font-bold py-1 px-3 rounded-full text-sm">
                     {catProjects.length} Projects
                   </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {catProjects.map((project, index) => (
                    <div 
                      key={project._id}
                      onClick={() => setSelectedProject({ ...project, title: lang === 'en' ? project.title : project.titleHA })}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setSelectedProject({ ...project, title: lang === 'en' ? project.title : project.titleHA })
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`View details for ${lang === 'en' ? project.title : project.titleHA}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 border border-gray-100 flex flex-col transform hover:-translate-y-2 cursor-pointer"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Image Container - Gallery Grid */}
                      <div className="relative h-64 bg-gray-100 group-hover:shadow-inner transition-all">
                        {project.images && project.images.length > 0 ? (
                          <div className={`grid h-full w-full ${project.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-[1px] bg-white`}>
                            {/* Main Image (Front View) */}
                            <div className="relative h-full w-full overflow-hidden">
                               <Image
                                  src={project.images[0]}
                                  alt={`${project.title} - Front View`}
                                  fill
                                  priority={index < 6}
                                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            {/* Secondary Images (Inside/Outside or Count) */}
                            {project.images.length > 1 && (
                              <div className="relative h-full w-full grid grid-rows-1">
                                 <div className="relative h-full w-full overflow-hidden">
                                   <Image
                                      src={project.images[1]}
                                      alt={`${project.title} - Inside/Detail`}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                      sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                    {/* Overlay for more images */}
                                    {project.images.length > 2 && (
                                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                                        <span className="text-2xl font-bold">+{project.images.length - 2}</span>
                                        <span className="text-[10px] uppercase tracking-widest font-medium">More Photos</span>
                                      </div>
                                    )}
                                 </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 group-hover:bg-green-50/50 transition-colors">
                            <span className="material-symbols-outlined text-6xl text-gray-300 mb-2 group-hover:text-green-300 transition-colors">
                              {getCategoryIcon(project.category)}
                            </span>
                          </div>
                        )}
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm border backdrop-blur-md ${getCategoryColor(project.category)}`}>
                            <span className="material-symbols-outlined text-[14px]">{getCategoryIcon(project.category)}</span>
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow relative">
                        <div className="flex items-center gap-2 mb-3 text-xs font-medium text-gray-400 uppercase tracking-widest">
                          <span className="material-symbols-outlined text-[16px] text-green-600">calendar_today</span>
                          {project.date}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-green-700 transition-colors">
                          {lang === 'en' ? project.title : project.titleHA}
                        </h3>

                        <div className="w-12 h-1 bg-green-100 rounded-full mb-4 group-hover:w-20 group-hover:bg-green-500 transition-all duration-300"></div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-4">
                          {project.description}
                        </p>
                        {project.impact && (
                          <p className="mb-4 text-xs font-semibold text-green-800">
                            Impact: <span className="font-medium text-gray-600">{project.impact}</span>
                          </p>
                        )}

                        {/* Share Actions */}
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Share Project</span>
                          
                          <div className="flex items-center gap-2">
                             <a 
                              href={`https://wa.me/?text=${encodeURIComponent(`Check out this project by Hon. Dr. Ghali Panda: ${lang === 'en' ? project.title : project.titleHA} - https://ghalipanda.com/projects/${project._id}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300 mx-1"
                              title="Share on WhatsApp"
                              aria-label="Share on WhatsApp"
                            >
                              <i className="fab fa-whatsapp"></i>
                            </a>
                            
                            <a 
                              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${lang === 'en' ? project.title : project.titleHA} via @GhaliPanda`)}&url=${encodeURIComponent(`https://ghalipanda.com/projects/${project._id}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 mx-1"
                              title="Share on X"
                              aria-label="Share on X (Twitter)"
                            >
                              <i className="fab fa-twitter"></i>
                            </a>

                            <a 
                              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://ghalipanda.com/projects/${project._id}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 mx-1"
                              title="Share on Facebook"
                              aria-label="Share on Facebook"
                            >
                              <i className="fab fa-facebook-f text-sm"></i>
                            </a>
                            
                            <button
                              onClick={(e) => { e.stopPropagation(); copyToClipboard(`${lang === 'en' ? project.title : project.titleHA}\n${project.description}\nhttps://ghalipanda.com/projects/${project._id}`) }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-700 hover:text-white transition-all duration-300 mx-1"
                              title="Copy Link"
                              aria-label="Copy Project Link"
                            >
                              <span className="material-symbols-outlined text-[18px]">content_copy</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Call to Action Footer */}

      </main>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  )
}
