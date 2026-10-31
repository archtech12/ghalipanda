import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/lib/projects'
import { SITE_URL } from '@/lib/site'

interface Props {
  params: Promise<{
    id: string
  }>
}

function getProject(id: string) {
  return projects.find(project => project._id === id) ?? null
}

export function generateStaticParams() {
  return projects.map(project => ({ id: project._id }))
}

// 2. Generate Metadata for Social Sharing (Server-Side)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = getProject(id)

  if (!project) {
    return {
      title: 'Project Not Found | Hon. Dr. Ghali Panda',
    }
  }

  const title = `${project.title} - Hon. Dr. Ghali Panda`
  const description = project.description
  const baseUrl = SITE_URL
  
  // Use the first photo or a default fallback
  const imagePath = project.images?.[0] || '/placeholder.jpg'
  const imageUrl = imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}/projects/${project._id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
    },
  }
}

// 3. Render the Project Details Page
export default async function ProjectDetailsPage({ params }: Props) {
  const { id } = await params
  const project = getProject(id)

  if (!project) {
    notFound()
  }

  const baseUrl = SITE_URL
  const shareUrl = `${baseUrl}/projects/${project._id}`

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Navigation Back */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <Link 
            href="/projects" 
            className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-green-700 transition-colors gap-2"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to All Projects
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 w-full bg-gray-200">
           {project.images && project.images.length > 0 ? (
             <Image
               src={project.images[0]}
               alt={project.title}
               fill
               className="object-cover"
               priority
             />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400">
               <span className="material-symbols-outlined text-6xl">image</span>
             </div>
           )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
           {/* Date & Category */}
           <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase rounded-full tracking-wide">
                {project.category}
              </span>
              <span className="flex items-center text-gray-500 text-sm font-medium">
                 <span className="material-symbols-outlined text-lg mr-1 text-green-600">calendar_today</span>
                 {project.date}
              </span>
           </div>

           {/* Titles */}
           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
             {project.title}
           </h1>
           {project.titleHA && (
               <h2 className="text-xl md:text-2xl font-semibold text-gray-500 mb-8 font-serif italic">
                 {project.titleHA}
               </h2>
           )}

           {/* Divider */}
           <div className="w-20 h-1.5 bg-green-600 rounded-full mb-8"></div>

           {/* Description */}
           <div className="prose prose-lg text-gray-600 mb-10 leading-relaxed">
             <p>{project.description}</p>
           </div>

           {(project.impact || project.location) && (
             <dl className="mb-10 grid gap-5 rounded-2xl border border-green-100 bg-green-50 p-6 sm:grid-cols-2">
               {project.impact && (
                 <div>
                   <dt className="text-xs font-bold uppercase tracking-wide text-green-800">Impact</dt>
                   <dd className="mt-2 font-semibold text-gray-900">{project.impact}</dd>
                 </div>
               )}
               {project.location && (
                 <div>
                   <dt className="text-xs font-bold uppercase tracking-wide text-green-800">Locations</dt>
                   <dd className="mt-2 text-gray-700">{project.location}</dd>
                 </div>
               )}
             </dl>
           )}

           {/* Additional Photos Grid (if any) */}
           {project.images && project.images.length > 1 && (
             <div className="mb-12">
               <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-green-500 pl-3">Gallery</h3>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {project.images.slice(1).map((photo: string, idx: number) => (
                   <div key={idx} className="relative h-40 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                     <Image
                       src={photo}
                       alt={`${project.title} - ${idx + 2}`}
                       fill
                       className="object-cover hover:scale-105 transition-transform duration-500"
                     />
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Call to Action */}
           <div className="bg-green-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-green-100">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-green-900 mb-1">Passionate about this initiative?</h3>
                <p className="text-green-700/80 text-sm">Share it with your community to spread the word.</p>
              </div>
              <div className="flex gap-3">
                 {/* Social Links */}
                 <a 
                   href={`https://wa.me/?text=${encodeURIComponent(`Check out: ${project.title} - ${shareUrl}`)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-sm"
                   title="Share on WhatsApp"
                 >
                   <i className="fab fa-whatsapp text-lg"></i>
                 </a>
                 <a 
                   href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
                   title="Share on Facebook"
                 >
                   <i className="fab fa-facebook-f"></i>
                 </a>
                 <a 
                   href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(project.title)}&url=${encodeURIComponent(shareUrl)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors shadow-sm"
                   title="Share on X"
                 >
                   <i className="fab fa-twitter"></i>
                 </a>
              </div>
           </div>

        </div>
      </div>
    </div>
  )
}
