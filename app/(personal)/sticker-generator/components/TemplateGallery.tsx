'use client'

import {motion} from 'framer-motion'

type Template = 'classic' | 'modern' | 'vibrant' | 'elegant' | 'bold' | 'neon' | 'royal' | 'greenCircular'

interface TemplateGalleryProps {
  templates: Record<Template, any>
  selectedTemplate: Template
  onSelectTemplate: (template: Template) => void
}

const TemplateGallery = ({templates, selectedTemplate, onSelectTemplate}: TemplateGalleryProps) => {
  const templateEntries = Object.entries(templates) as [Template, any][]

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
        <span className="material-symbols-outlined text-red-600 text-base">palette</span>
        Choose Template
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {templateEntries.map(([key, template]) => (
          <motion.button
            key={key}
            onClick={() => onSelectTemplate(key)}
            whileHover={{scale: 1.05, y: -2}}
            whileTap={{scale: 0.95}}
            className={`relative p-2 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1.5 overflow-hidden group ${
              selectedTemplate === key
                ? 'border-red-500 bg-red-50 shadow-md ring-1 ring-red-500 ring-opacity-50'
                : 'border-gray-200 hover:border-red-300 hover:shadow-sm hover:bg-gray-50'
            }`}
          >
            {selectedTemplate === key && (
              <motion.div
                layoutId="selectedTemplate"
                className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-lg"
                transition={{type: 'spring', bounce: 0.2, duration: 0.4}}
              />
            )}
            <div className={`w-full h-8 ${template.bg} rounded-md shadow-inner relative z-10`}>
              {selectedTemplate === key && (
                <motion.div
                  initial={{scale: 0}}
                  animate={{scale: 1}}
                  className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-white text-xs">check</span>
                </motion.div>
              )}
            </div>
            <p className="text-xs font-semibold text-gray-700 capitalize relative z-10">{template.name || key}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default TemplateGallery
