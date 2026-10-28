'use client'

import { HomePage } from '@/components/HomePage'
import { ConstituencyBlueprint } from '@/components/ConstituencyBlueprint'
import { ContactSection } from '@/components/ContactSection'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProjectModal } from '@/components/ProjectModal'

import { news as staticNews } from '@/lib/news'
import { projects as staticProjects } from '@/lib/projects'
import { visionContent } from '@/lib/data'

interface Project {
  _id: string
  title: string
  titleHA: string
  description: string
  category: string
  images: string[]
  date: string
  impact?: string
  status?: string
}

export default function IndexRoute() {
  const news = staticNews
  const projects = staticProjects.filter(project => project.category !== 'Legislative') as Project[]
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const mockData = {
    title: 'Hon. Dr. Ghali Panda',
  }

  const featuredProjects = ['project-1', 'project-5', 'project-9']
    .map(id => projects.find(project => project._id === id))
    .filter((project): project is Project => Boolean(project))

  return (
    <div>
      <HomePage data={mockData} />
      
      {/* Strategic Constituency Blueprint */}
      <ConstituencyBlueprint />

      {/* Featured Projects Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              OUR INITIATIVES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">
              Transforming Communities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Empowering lives through dedicated projects and programs across Gaya, Ajingi, and Albasu Federal Constituency
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedProject(project)}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2 cursor-pointer"
                >
                    <div className="h-48 relative overflow-hidden bg-gray-200">
                    {project.images && project.images.length > 0 ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700"></div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-white/90 backdrop-blur text-green-800 px-4 py-2 rounded-full font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            View Details
                        </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 translate-y-0 group-hover:translate-y-2 transition-transform duration-300">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-green-700 rounded-full text-xs font-semibold">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                      <span className="text-sm font-semibold text-green-800">
                        {project.impact || project.date}
                      </span>
                      <span className="shrink-0 text-xs text-gray-500">{project.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-green-700 text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-green-800 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 sm:hover:scale-105 text-base sm:text-base touch-manipulation"
            >
              <span>View All Projects</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>


      {/* Latest News Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              LATEST UPDATES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">
              News & Announcements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Stay informed with the latest developments and community updates
            </p>
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {news.slice(0, 3).map((item, index) => (
                <Link key={index} href={`/news/${item._id}`} className="group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden transform hover:-translate-y-2 h-full flex flex-col border border-gray-100">
                    <div className="h-56 bg-gradient-to-br from-green-500 to-green-600 relative overflow-hidden">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-6xl">
                            article
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-green-700 rounded-full text-xs font-semibold">
                          {item.category || 'News'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{item.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{new Date(item.publishDate).toLocaleDateString()}</span>
                        <span className="group-hover:text-green-700 transition-colors font-medium">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 bg-green-600 text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 sm:hover:scale-105 text-base sm:text-base touch-manipulation"
            >
              <span>View All News</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Impact & Scorecard Section */}
      <section className="py-14 sm:py-20 md:py-24 bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 rounded-full text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur">
              VERIFIED SCORECARD IMPACT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Measurable Progress Across Every Ward
            </h2>
            <p className="text-green-100/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Real results documented from Albasu, Gaya, and Ajingi LGAs—delivering lasting dividends of democracy.
            </p>
          </div>

          {/* 6 Key Scorecard Counters */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-center transform hover:-translate-y-1.5 transition-all duration-300">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">18</div>
              <div className="text-emerald-200 text-xs sm:text-sm font-semibold">Scorecard Projects</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-center transform hover:-translate-y-1.5 transition-all duration-300">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-300 mb-2">1,500+</div>
              <div className="text-emerald-200 text-xs sm:text-sm font-semibold">Solar Street Lights</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-center transform hover:-translate-y-1.5 transition-all duration-300">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">60</div>
              <div className="text-emerald-200 text-xs sm:text-sm font-semibold">Nursing Scholars</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-center transform hover:-translate-y-1.5 transition-all duration-300">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-cyan-300 mb-2">30+</div>
              <div className="text-emerald-200 text-xs sm:text-sm font-semibold">Solar Boreholes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-center transform hover:-translate-y-1.5 transition-all duration-300">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">1,000+</div>
              <div className="text-emerald-200 text-xs sm:text-sm font-semibold">SME Cash Grants</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-center transform hover:-translate-y-1.5 transition-all duration-300">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-300 mb-2">3</div>
              <div className="text-emerald-200 text-xs sm:text-sm font-semibold">Federal LGAs</div>
            </div>
          </div>

          {/* Vision Quote Card */}
          <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto text-center shadow-2xl">
            <span className="material-symbols-outlined text-4xl text-emerald-300 mb-3 opacity-80">
              format_quote
            </span>
            <p className="text-green-50 text-base sm:text-lg italic leading-relaxed">
              &ldquo;{visionContent}&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="h-0.5 w-8 bg-emerald-400"></div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">
                Hon. Dr. Ghali Mustapha Tijjani (PhD)
              </p>
              <div className="h-0.5 w-8 bg-emerald-400"></div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  )
}
