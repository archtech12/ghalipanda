'use client'

import {motion} from 'framer-motion'
import {useState} from 'react'

type Template = 'classic' | 'modern' | 'vibrant' | 'elegant' | 'bold' | 'neon' | 'royal' | 'greenCircular'

interface GalleryPreset {
  id: string
  template: Template
  name: string
  description: string
  message: string
  badge: string
  gradient: string
}

interface GalleryOfExcellenceProps {
  onApplyPreset: (preset: GalleryPreset) => void
  templates: Record<Template, any>
}

const GalleryOfExcellence = ({onApplyPreset, templates}: GalleryOfExcellenceProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const presets: GalleryPreset[] = [
    {
      id: '1',
      template: 'royal',
      name: 'Royal Elegance',
      description: 'Premium design for distinguished supporters',
      message: 'Service to Humanity',
      badge: '👑',
      gradient: 'from-purple-600 via-violet-700 to-purple-900',
    },
    {
      id: '2',
      template: 'neon',
      name: 'Cyber Modern',
      description: 'Futuristic design with neon accents',
      message: 'Leadership That Delivers',
      badge: '🦾',
      gradient: 'from-black via-gray-900 to-slate-900',
    },
    {
      id: '3',
      template: 'vibrant',
      name: 'Sunset Vibes',
      description: 'Bold and energetic color palette',
      message: 'Together We Rise',
      badge: '🌅',
      gradient: 'from-fuchsia-600 via-purple-700 to-pink-600',
    },
    {
      id: '4',
      template: 'greenCircular',
      name: 'Campaign Classic',
      description: 'Official campaign design',
      message: 'TOGETHER WE RISE',
      badge: '🟢',
      gradient: 'from-green-700 via-emerald-800 to-green-900',
    },
    {
      id: '5',
      template: 'modern',
      name: 'Blue Horizon',
      description: 'Clean and professional',
      message: 'Progress for All',
      badge: '🚀',
      gradient: 'from-blue-700 via-indigo-800 to-blue-900',
    },
    {
      id: '6',
      template: 'bold',
      name: 'Nature Fresh',
      description: 'Vibrant green energy',
      message: 'Community First',
      badge: '🌿',
      gradient: 'from-green-600 via-emerald-700 to-teal-800',
    },
  ]

  return (
    <>
      <motion.button
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">auto_awesome</span>
        Gallery of Excellence
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{opacity: 0, scale: 0.9, y: 20}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.9, y: 20}}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-4xl">✨</span>
                Gallery of Excellence
              </h2>
              <motion.button
                whileHover={{rotate: 90, scale: 1.1}}
                whileTap={{scale: 0.9}}
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-gray-600">close</span>
              </motion.button>
            </div>

            <p className="text-gray-600 mb-8 text-center">
              Choose from our professionally curated preset designs for instant results
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {presets.map((preset, index) => (
                <motion.div
                  key={preset.id}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: index * 0.1}}
                  whileHover={{scale: 1.05, y: -5}}
                  className="relative group cursor-pointer"
                  onClick={() => {
                    onApplyPreset(preset)
                    setIsOpen(false)
                  }}
                >
                  <div
                    className={`bg-gradient-to-br ${preset.gradient} rounded-xl p-6 h-full shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-white/50`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{preset.badge}</span>
                      <motion.div
                        whileHover={{rotate: 360}}
                        transition={{duration: 0.5}}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="material-symbols-outlined text-white">arrow_forward</span>
                      </motion.div>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{preset.name}</h3>
                    <p className="text-white/80 text-sm mb-4">{preset.description}</p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-white font-semibold text-sm">{preset.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default GalleryOfExcellence
