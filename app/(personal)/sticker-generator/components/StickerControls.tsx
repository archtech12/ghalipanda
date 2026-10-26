'use client'

import {motion, AnimatePresence} from 'framer-motion'
import {useState, useRef} from 'react'
import TemplateGallery from './TemplateGallery'

type Template = 'classic' | 'modern' | 'vibrant' | 'elegant' | 'bold' | 'neon' | 'royal' | 'greenCircular'
type Language = 'en' | 'ha' | 'ar'

interface StickerControlsProps {
  supporterName: string
  setSupporterName: (name: string) => void
  customMessage: string
  setCustomMessage: (msg: string) => void
  language: Language
  setLanguage: (lang: Language) => void
  template: Template
  setTemplate: (template: Template) => void
  year: string
  setYear: (year: string) => void
  supporterPhoto: string | null
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onShowCropper: () => void
  templates: Record<Template, any>
  messages: Record<Language, string[]>
}

const StickerControls = ({
  supporterName,
  setSupporterName,
  customMessage,
  setCustomMessage,
  language,
  setLanguage,
  template,
  setTemplate,
  year,
  setYear,
  supporterPhoto,
  onPhotoUpload,
  onShowCropper,
  templates,
  messages,
}: StickerControlsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState<'info' | 'design'>('info')

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2 bg-white/50 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50">
        <motion.button
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'info'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="material-symbols-outlined text-base align-middle mr-1">person</span>
          Info
        </motion.button>
        <motion.button
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          onClick={() => setActiveTab('design')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'design'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="material-symbols-outlined text-base align-middle mr-1">palette</span>
          Design
        </motion.button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'info' && (
          <motion.div
            key="info"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10}}
            transition={{duration: 0.2}}
            className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-4 border border-white/20"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Name *</label>
                <motion.input
                  whileFocus={{scale: 1.01}}
                  type="text"
                  value={supporterName}
                  onChange={(e) => setSupporterName(e.target.value)}
                  placeholder="e.g., Ahmed Ibrahim"
                  className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Custom Message</label>
                <motion.input
                  whileFocus={{scale: 1.01}}
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g., Service to Humanity!"
                  maxLength={40}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all font-sans"
                />
                <p className="text-xs text-gray-400 mt-1">{customMessage.length}/40</p>

                <div className="mt-2">
                  <p className="text-xs font-semibold text-gray-500 mb-1.5">💡 Quick:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {messages[language].slice(0, 3).map((msg, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={() => setCustomMessage(msg)}
                        className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors font-medium"
                      >
                        {msg.substring(0, 15)}
                        {msg.length > 15 ? '...' : ''}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Language</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['en', 'ha', 'ar'] as Language[]).map((lang) => (
                    <motion.button
                      key={lang}
                      whileHover={{scale: 1.05}}
                      whileTap={{scale: 0.95}}
                      onClick={() => setLanguage(lang)}
                      className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
                        language === lang
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lang === 'en' ? 'EN' : lang === 'ha' ? 'HA' : 'AR'}
                    </motion.button>
                  ))}
                </div>
              </div>

              {template === 'greenCircular' && (
                <div className="pt-2 border-t border-gray-200">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Campaign</label>
                  <div className="grid grid-cols-2 gap-1.5 mb-2">
                    {['TOGETHER WE RISE', 'KWANKWASIYYA IN ACTION', 'COMMUNITY FIRST', 'PROGRESS FOR ALL'].map(
                      (msg) => (
                        <motion.button
                          key={msg}
                          whileHover={{scale: 1.05}}
                          whileTap={{scale: 0.95}}
                          onClick={() => setCustomMessage(msg)}
                          className="text-xs px-2 py-1 bg-green-50 text-green-800 border border-green-200 rounded-md hover:bg-green-100"
                        >
                          {msg.length > 12 ? msg.substring(0, 12) + '...' : msg}
                        </motion.button>
                      ),
                    )}
                  </div>

                  <label htmlFor="year" className="block text-xs font-bold text-gray-700 mb-1.5">Year</label>
                  <input
                    type="number"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    min="2020"
                    max="2030"
                    placeholder="2027"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Photo (Optional)</label>
                <input type="file" ref={fileInputRef} onChange={onPhotoUpload} accept="image/*" className="hidden" />
                <motion.button
                  whileHover={{scale: 1.02}}
                  whileTap={{scale: 0.98}}
                  onClick={triggerFileInput}
                  className="w-full py-2 px-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium text-gray-700"
                >
                  <span className="material-symbols-outlined text-base">upload</span>
                  {supporterPhoto ? 'Change Photo' : 'Upload Photo'}
                </motion.button>
                {supporterPhoto && (
                  <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    className="mt-2 flex items-center gap-2"
                  >
                    <img
                      src={supporterPhoto}
                      alt="Preview"
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-500 shadow-md"
                    />
                    <motion.button
                      whileHover={{scale: 1.05}}
                      whileTap={{scale: 0.95}}
                      onClick={onShowCropper}
                      className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">crop</span>
                      Adjust
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'design' && (
          <motion.div
            key="design"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10}}
            transition={{duration: 0.2}}
            className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-4 border border-white/20"
          >
            <TemplateGallery templates={templates} selectedTemplate={template} onSelectTemplate={setTemplate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StickerControls
