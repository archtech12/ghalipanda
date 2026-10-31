import { TemplateId } from '../../types'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LayoutSwitcherProps {
  currentTemplate: TemplateId
  onSelect: (id: TemplateId) => void
}

type Category = 'Recommended' | 'Classic' | 'Premium' | 'Editorial'

interface TemplateInfo {
  id: TemplateId
  name: string
  desc: string
  icon: string
  color: string
}

export const LayoutSwitcher = ({ currentTemplate, onSelect }: LayoutSwitcherProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>('Recommended')

  const allTemplates: Record<TemplateId, TemplateInfo> = {
    classic: { id: 'classic', name: 'The Signature', desc: 'Classic Campaign Card', icon: 'history_edu', color: 'bg-emerald-100 text-emerald-600' },
    print: { id: 'print', name: 'The Executive', desc: 'High Contrast Print', icon: 'business_center', color: 'bg-slate-800 text-slate-100' },
    geometricV2: { id: 'geometricV2', name: 'Geometric Pro', desc: 'Designer Edition', icon: 'category', color: 'bg-indigo-100 text-indigo-600' },
    modern: { id: 'modern', name: 'Glass Pro', desc: 'Frosted Glass Aesthetic', icon: 'blur_on', color: 'bg-cyan-100 text-cyan-600' },
    youth: { id: 'youth', name: 'The Vanguard', desc: 'Vibrant & Bold', icon: 'bolt', color: 'bg-rose-100 text-rose-600' },
    minimal: { id: 'minimal', name: 'Pure Minimal', desc: 'Clean & Sophisticated', icon: 'check_box_outline_blank', color: 'bg-gray-100 text-gray-600' },
    badge: { id: 'badge', name: 'Official ID', desc: 'Proud Supporter Badge', icon: 'badge', color: 'bg-blue-100 text-blue-600' },
    type: { id: 'type', name: 'Typographic', desc: 'High Impact Grid', icon: 'font_download', color: 'bg-stone-800 text-stone-100' },
    geometric: { id: 'geometric', name: 'The Architect', desc: 'Structured Shapes', icon: 'architecture', color: 'bg-teal-100 text-teal-600' },
    classicV2: { id: 'classicV2', name: 'Heritage Max', desc: 'Refined Classic Layout', icon: 'account_balance', color: 'bg-amber-100 text-amber-700' },
    badgeV2: { id: 'badgeV2', name: 'Secure Pass', desc: 'Official Credentials', icon: 'admin_panel_settings', color: 'bg-zinc-800 text-zinc-100' },
    classicPremium: { id: 'classicPremium', name: 'The Prestige', desc: 'Premium Classic Design', icon: 'diamond', color: 'bg-yellow-100 text-yellow-700' },
    modernPremium: { id: 'modernPremium', name: 'Visionary', desc: 'Ultra-Premium Glass', icon: 'visibility', color: 'bg-purple-100 text-purple-600' },
    printPremium: { id: 'printPremium', name: 'Gazette', desc: 'Editorial Print Layout', icon: 'article', color: 'bg-red-100 text-red-600' },
    badgePremium: { id: 'badgePremium', name: 'Black Card', desc: 'VIP Exclusive Access', icon: 'credit_card', color: 'bg-black text-gold-400' },
    pledge: { id: 'pledge', name: 'Vote & Pledge', desc: 'My Vote My Pledge Dual Card', icon: 'how_to_vote', color: 'bg-rose-900 text-rose-100' },
  }

  const categories: Record<Category, TemplateId[]> = {
    Recommended: ['pledge', 'classic', 'print', 'geometricV2'],
    Classic: ['classic', 'minimal', 'classicV2', 'type', 'geometric'],
    Premium: ['pledge', 'classicPremium', 'modernPremium', 'badgePremium', 'youth', 'modern'],
    Editorial: ['pledge', 'printPremium', 'print', 'badge', 'badgeV2']
  }

  const handleSelect = (id: TemplateId) => {
    onSelect(id)
    // Small haptic feedback if supported
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Selected design</p>
          <p className="text-sm font-black text-slate-900">{allTemplates[currentTemplate]?.name || 'Custom'}</p>
        </div>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-brand-700">16 layouts</span>
      </div>
      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-4 hide-scrollbar sm:pb-4 border-b border-slate-100 mb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {(Object.keys(categories) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {categories[activeCategory].map((id) => {
            const t = allTemplates[id]
            const isSelected = currentTemplate === t.id
            
            return (
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={t.id}
                onClick={() => handleSelect(t.id)}
                aria-pressed={isSelected}
                className={`relative text-left w-full rounded-2xl overflow-hidden border-2 transition-all duration-300 active:scale-95 group ${
                  isSelected
                    ? 'border-brand-500 shadow-[0_4px_20px_rgba(34,197,94,0.25)] bg-brand-50/50'
                    : 'border-slate-200 hover:border-brand-300 bg-white hover:bg-slate-50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>
                  </div>
                )}
                
                {/* Visual Preview Placeholder */}
                <div className={`h-16 sm:h-20 w-full flex items-center justify-center border-b border-slate-100/50 ${t.color}`}>
                   <span className="material-symbols-outlined text-3xl sm:text-4xl opacity-80 group-hover:scale-110 transition-transform duration-300">{t.icon}</span>
                </div>
                
                <div className="p-2">
                  <p className={`font-black text-[10px] sm:text-xs leading-tight uppercase tracking-tight mb-0.5 ${
                    isSelected ? 'text-brand-700' : 'text-slate-800'
                  }`}>
                    {t.name}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 leading-tight line-clamp-1">
                    {t.desc}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
