import { StickerData } from '../../types'

interface ThemeControlsProps {
  data: StickerData
  onUpdate: (field: keyof StickerData, value: StickerData[keyof StickerData]) => void
}

const themes = [
  { id: 'green', label: 'Campaign Green', color: '#087f5b' },
  { id: 'red', label: 'Unity Red', color: '#b92f3b' },
  { id: 'blue', label: 'Civic Blue', color: '#2368c4' },
  { id: 'gold', label: 'Heritage Gold', color: '#a76b12' },
] as const

export const ThemeControls = ({ data, onUpdate }: ThemeControlsProps) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
    {themes.map((theme) => {
      const selected = data.colorTheme === theme.id
      return (
        <button
          key={theme.id}
          type="button"
          onClick={() => onUpdate('colorTheme', theme.id)}
          aria-pressed={selected}
          className={`rounded-xl border p-3 text-left transition-all ${selected ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20' : 'border-slate-200 bg-white hover:border-brand-300'}`}
        >
          <span className="mb-2 block h-7 w-full rounded-lg" style={{ backgroundColor: theme.color }} />
          <span className="block text-[10px] font-black uppercase tracking-wide text-slate-700">{theme.label}</span>
        </button>
      )
    })}
  </div>
)
