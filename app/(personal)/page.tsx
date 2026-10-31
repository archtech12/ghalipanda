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
import { scorecard, homepageMetrics, totalProjectsMetric, localGovernmentAreas } from '@/lib/scorecard'

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

  const featuredProjects = ['ghali-education-classrooms', 'ghali-water-solar-boreholes', 'ghali-infrastructure-solar-lights']
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


      {/* Gallery Strip */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">Moments From the Constituency</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A glimpse of programmes delivered across Gaya, Ajingi, and Albasu.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {[
              { src: '/assets/images/gallery/1-Water-Empowerment/solar-borehole-gaya-town-gaya-dec2024-2.jpg', caption: 'Water' },
              { src: '/assets/images/gallery/6-Education/school-block-gaya-gra-2024-1.jpg', caption: 'Education' },
              { src: '/assets/images/gallery/4-Youth-Women-Empowerment/motorcycle-handover-gaya-10units-dec2024-1.jpg', caption: 'Youth Empowerment' },
              { src: '/assets/images/gallery/5-Agriculture-Food-Support/fertilizer-distribution-1800-bags-aug2025-1.jpg', caption: 'Agriculture' },
              { src: '/assets/images/gallery/3-Lighting-Energy/streetlight.jpg', caption: 'Infrastructure' },
              { src: '/assets/images/gallery/4-Youth-Women-Empowerment/cash-empowerment-20m-youths-march2024-1.jpg', caption: 'Empowerment' },
            ].map(item => (
              <div key={item.src} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={item.src}
                  alt={`${item.caption} programme`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                  {item.caption}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="inline-flex items-center gap-2 font-semibold text-green-700 hover:text-green-800">
              View full gallery <span className="material-symbols-outlined text-lg">arrow_forward</span>
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

          {/* Scorecard counters: figures come from lib/scorecard.json + lib/projects.json */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
            {[
              totalProjectsMetric,
              ...homepageMetrics,
              { label: 'Local Government Areas', value: String(localGovernmentAreas), projectId: 'lgas' },
            ].map((metric, index) => (
              <div
                key={metric.label}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-center transform hover:-translate-y-1.5 transition-all duration-300"
              >
                <div
                  className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-2 ${
                    ['text-white', 'text-amber-300', 'text-white', 'text-cyan-300', 'text-emerald-300'][index % 5]
                  }`}
                >
                  {metric.value}
                </div>
                <div className="text-emerald-200 text-xs sm:text-sm font-semibold">{metric.label}</div>
              </div>
            ))}
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

      {/* Biography */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 grid gap-8 md:grid-cols-2 items-center max-w-6xl">
          <div className="relative mx-auto w-full max-w-sm aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/assets/Distinguished%20Portrait.png"
              alt="Hon. Dr. Ghali Mustapha Tijjani"
              fill
              sizes="(max-width: 768px) 90vw, 384px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              The Representative
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{scorecard.representative}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {scorecard.office}, representing {scorecard.constituency.join(', ')} Federal Constituency, {scorecard.state}.
              Serving since {scorecard.termStart}.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">{scorecard.committee}.</p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Read the full biography <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{scorecard.vision}</h2>
          <p className="text-green-100 mb-8">
            Volunteer, create a supporter sticker, or get in touch with the office.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/volunteer" className="rounded-lg bg-white px-6 py-3 font-bold text-green-800 transition hover:bg-green-50">
              Join as a volunteer
            </Link>
            <Link href="/sticker-generator" className="rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10">
              Create your sticker
            </Link>
            <Link href="/supporter-card" className="rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10">
              Get a support card
            </Link>
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
