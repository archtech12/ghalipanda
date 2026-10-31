'use client'

import { motion } from 'framer-motion'
import { StickerPreview } from '../StickerPreview'
import { StickerData, TemplateId } from '../../types'

interface LayoutSwitcherProps {
  currentTemplate: TemplateId
  onSelect: (id: TemplateId) => void
  data: StickerData
}

const featuredTemplates: Array<{ id: TemplateId; name: string; description: string }> = [
  { id: 'classicV2', name: 'Classic Portrait', description: 'A timeless campaign design' },
  { id: 'modernPremium', name: 'Modern Glass', description: 'A polished contemporary look' },
  { id: 'printPremium', name: 'Editorial', description: 'A bold print-inspired design' },
  { id: 'geometricV2', name: 'Geometric', description: 'A striking, structured layout' },
  { id: 'pledge', name: 'My Pledge', description: 'A personal supporter card' },
]

export const LayoutSwitcher = ({ currentTemplate, onSelect, data }: LayoutSwitcherProps) => {
  const selectTemplate = (id: TemplateId) => {
    onSelect(id)
    if (typeof window !== 'undefined' && window.navigator?.vibrate) window.navigator.vibrate(35)
  }

  return (
    <section aria-labelledby="sticker-designs-heading" className="w-full">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h3 id="sticker-designs-heading" className="text-sm font-black uppercase tracking-wider text-slate-900">Choose a design</h3>
          <p className="mt-1 text-xs text-slate-500">Five hand-picked campaign styles</p>
        </div>
        <span className="shrink-0 rounded-full bg-brand-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-brand-700">{featuredTemplates.length} designs</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {featuredTemplates.map((template, index) => {
          const selected = currentTemplate === template.id
          return (
            <motion.button
              key={template.id}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: index * 0.025 }}
              onClick={() => selectTemplate(template.id)}
              aria-pressed={selected}
              className={`group overflow-hidden rounded-2xl border-2 bg-white text-left transition-all active:scale-[.98] ${selected ? 'border-brand-500 shadow-[0_4px_20px_rgba(34,197,94,0.2)] ring-2 ring-brand-500/15' : 'border-slate-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md'}`}
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <StickerPreview data={{ ...data, templateId: template.id, aspectRatio: 'square' }} />
                {selected && <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white shadow-md"><span className="material-symbols-outlined text-sm">check</span></span>}
              </div>
              <span className="block truncate px-3 pt-2.5 text-xs font-black uppercase tracking-wide text-slate-900">{template.name}</span>
              <span className="block truncate px-3 pb-3 pt-0.5 text-[10px] text-slate-500">{template.description}</span>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
