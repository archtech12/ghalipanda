'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Project {
  _id: string
  title: string
  description: string
  category: string
  images: string[]
  date: string
  status?: string
  impact?: string
  location?: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState<string>('')

  useEffect(() => {
    if (project?.images?.[0]) {
      setActiveImage(project.images[0])
    }
  }, [project])

  // Handle Body Scroll Locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Push state to history to enable back button closing
      window.history.pushState({ modalOpen: true }, '')
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle Back Button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isOpen) {
        // If modal is open and back is pressed, close it
        onClose()
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isOpen, onClose])


  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={() => {
            // Go back in history if background clicked (to keep history clean)
            if (window.history.state?.modalOpen) {
                window.history.back()
            } else {
                onClose()
            }
        }}
      />
      
      <div className="relative bg-white sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl overflow-y-auto flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
        //   onClick={() => window.history.back()} // Use history back for consistency
          onClick={() => {
            if (window.history.state?.modalOpen) {
                window.history.back()
            } else {
                onClose()
            }
          }}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Image Section */}
        <div className="w-full h-[40vh] md:w-1/2 bg-black flex flex-col justify-center relative shrink-0 md:h-auto min-h-[300px]">
           <div className="relative h-full w-full">
             {activeImage ? (
                <Image
                  src={activeImage}
                  alt={project.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
             ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                  <span className="material-symbols-outlined text-6xl">image_not_supported</span>
                </div>
             )}
           </div>
           
           {/* Thumbnails if multiple images - Mobile Overlay / Desktop Below */}
           {project.images && project.images.length > 1 && (
             <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2 overflow-x-auto bg-gradient-to-t from-black/80 to-transparent no-scrollbar z-10">
               {project.images.map((img, idx) => (
                 <button
                   key={idx}
                   onClick={(e) => { e.stopPropagation(); setActiveImage(img); }}
                   className={`relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-green-500 ring-2 ring-green-500/30' : 'border-white/30 opacity-70 hover:opacity-100'}`}
                 >
                   <Image 
                     src={img} 
                     alt={`View ${idx + 1}`} 
                     fill 
                     className="object-cover"
                   />
                 </button>
               ))}
             </div>
           )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col h-full bg-white">
          <div className="mb-6 overflow-y-auto flex-grow">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">
                {project.category}
              </span>
              {project.status && (
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  project.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 
                  project.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-gray-100 text-gray-700'
                }`}>
                  {project.status}
                </span>
              )}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">
              {project.title}
            </h2>
            
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {project.description}
            </p>
            {project.impact && (
              <div className="mt-5 rounded-xl bg-green-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-green-800">Scorecard impact</p>
                <p className="mt-1 font-semibold text-gray-900">{project.impact}</p>
              </div>
            )}
            {project.location && (
              <p className="mt-4 text-sm text-gray-600"><span className="font-bold text-gray-800">Location:</span> {project.location}</p>
            )}
          </div>

          <div className="border-t border-gray-100 pt-6 mt-auto shrink-0 flex items-center justify-between">
             <div className="flex items-center gap-2 text-sm text-gray-500">
               <span className="material-symbols-outlined text-lg">calendar_month</span>
               <span className="font-semibold">Project Date:</span>
               <span>{project.date}</span>
             </div>

             <button 
                onClick={async () => {
                    const shareData = {
                        title: project.title,
                        text: `${project.title}\n${project.description}`,
                        url: window.location.href
                    }
                    if (navigator.share) {
                        try {
                            await navigator.share(shareData)
                        } catch (err) {
                            console.log('Error sharing:', err)
                        }
                    } else {
                        // Fallback to copying link
                        navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
                        alert('Link copied to clipboard!')
                    }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-bold text-sm hover:bg-green-100 transition-colors"
             >
                <span className="material-symbols-outlined text-lg">share</span>
                Share
             </button>
          </div>
        </div>

      </div>
    </div>
  )
}
