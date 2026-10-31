import { StickerData } from '../../types'
import { useState, useRef } from 'react'
import PhotoCropper from '../PhotoCropper'
import { getCroppedImg } from '../../utils/cropImage'
import { Area } from 'react-easy-crop'
import { candidatePhotoOptions } from '../shared/candidatePhotos'

interface TextControlsProps {
  data: StickerData
  onUpdate: (field: keyof StickerData, value: any) => void
}

export const TextControls = ({ data, onUpdate }: TextControlsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Cropper State
  const [isCropperOpen, setIsCropperOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImageSrc(reader.result?.toString() || null)
        setIsCropperOpen(true)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleDoneCropping = async () => {
    try {
      if (imageSrc && croppedAreaPixels) {
        const croppedImageBase64 = await getCroppedImg(imageSrc, croppedAreaPixels)
        onUpdate('supporterPhoto', croppedImageBase64)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsCropperOpen(false)
    }
  }

  return (
    <div className="space-y-6">

      <fieldset>
        <legend className="mb-3 text-xs font-black uppercase tracking-widest text-gray-400">Social format</legend>
        <div className="grid grid-cols-3 gap-2">
          {([
            { id: 'square', label: 'Square', size: '1:1' },
            { id: 'portrait', label: 'Portrait', size: '4:5' },
            { id: 'story', label: 'Story / Status', size: '9:16' },
          ] as const).map((format) => {
            const selected = data.aspectRatio === format.id
            return (
              <button
                key={format.id}
                type="button"
                onClick={() => onUpdate('aspectRatio', format.id)}
                aria-pressed={selected}
                className={`rounded-xl border px-2 py-3 text-center transition ${selected ? 'border-brand-500 bg-brand-500/10 text-brand-300 ring-2 ring-brand-500/25' : 'border-white/10 bg-slate-950/50 text-gray-400 hover:border-brand-400/60'}`}
              >
                <span className="block text-xs font-black">{format.label}</span>
                <span className="mt-1 block text-[10px] opacity-70">{format.size}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-black uppercase tracking-widest text-gray-400">Ghali&apos;s photo</legend>
        <p className="mb-3 text-xs text-gray-500">Choose the portrait used across all sticker designs.</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {candidatePhotoOptions.map((photo) => {
            const selected = data.candidatePhoto === photo.src
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => onUpdate('candidatePhoto', photo.src)}
                aria-pressed={selected}
                aria-label={`Use ${photo.label} on all designs`}
                className={`overflow-hidden rounded-lg border-2 text-left transition ${selected ? 'border-brand-500 ring-2 ring-brand-500/30' : 'border-white/10 hover:border-brand-300'}`}
              >
                <img src={photo.src} alt="" className="aspect-square w-full object-cover" />
                <span className="block truncate px-1.5 py-1 text-[10px] font-bold text-gray-300">{photo.label}</span>
              </button>
            )
          })}
        </div>
      </fieldset>
      
      {/* Photo Upload */}
      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Your Photo</label>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handlePhotoUpload} 
          accept="image/*" 
          className="hidden" 
        />
        
        {!data.supporterPhoto ? (
           <button
             onClick={() => fileInputRef.current?.click()}
             className="w-full py-3 px-4 border-2 border-dashed border-white/20 rounded-xl hover:border-brand-500 hover:bg-brand-500/10 transition-all duration-200 flex flex-row items-center justify-center gap-3 text-sm font-bold text-gray-400 group"
           >
             <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-brand-500/20 flex items-center justify-center transition-colors">
                 <span className="material-symbols-outlined text-gray-400 group-hover:text-brand-500 text-lg">add_a_photo</span>
             </div>
             <span>Upload Your Photo</span>
           </button>
        ) : (
           <div className="relative w-full rounded-xl overflow-hidden border border-white/20 bg-black/40 p-3 flex items-center gap-3">
               <img src={data.supporterPhoto} alt="Your photo" className="w-12 h-12 rounded-full object-cover border-2 border-brand-500 shadow-lg" />
               <div className="flex-1">
                   <p className="text-xs font-bold text-white">Photo Added</p>
                   <p className="text-[10px] text-gray-400">Looking good!</p>
               </div>
               <div className="flex gap-2">
                   <button 
                       onClick={() => onUpdate('supporterPhoto', null)}
                       className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg transition-colors"
                       title="Remove Photo"
                   >
                       <span className="material-symbols-outlined text-sm">delete</span>
                   </button>
                   <button 
                       onClick={() => fileInputRef.current?.click()}
                       className="p-2 bg-brand-500/20 text-brand-400 hover:bg-brand-500/40 rounded-lg transition-colors"
                       title="Change Photo"
                   >
                       <span className="material-symbols-outlined text-sm">edit</span>
                   </button>
               </div>
           </div>
        )}
      </div>

      {/* Name Input */}
      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Your Name</label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <span className="material-symbols-outlined text-gray-500 group-focus-within:text-brand-500 transition-colors">person</span>
            </div>
            <input
            type="text"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            value={data.supporterName}
            onChange={(e) => onUpdate('supporterName', e.target.value)}
            placeholder="e.g. Ibrahim Yusuf"
            className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-white/10 rounded-xl focus:bg-slate-900 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all placeholder:text-gray-500 text-white font-bold text-sm sm:text-base shadow-inner touch-manipulation caret-brand-400"
            style={{ color: '#ffffff', backgroundColor: '#020617' }}
            />
        </div>
      </div>

      {/* Slogan Input */}
      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Campaign Slogan</label>
        <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <span className="material-symbols-outlined text-gray-500 group-focus-within:text-brand-500 transition-colors">campaign</span>
            </div>
            <input
            type="text"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            value={data.customMessage}
            onChange={(e) => onUpdate('customMessage', e.target.value)}
            placeholder="Progress First"
            maxLength={30}
            className="w-full pl-12 pr-16 py-4 bg-slate-950 border border-white/10 rounded-xl focus:bg-slate-900 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all placeholder:text-gray-500 text-white font-bold text-sm sm:text-base shadow-inner touch-manipulation caret-brand-400"
            style={{ color: '#ffffff', backgroundColor: '#020617' }}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-brand-400 bg-brand-500/20 px-2 py-1 rounded-md">
                {data.customMessage.length}/30
            </span>
        </div>
        
        {/* Quick Slogans */}
        <div className="mt-4">
            <p className="text-[10px] text-gray-500 font-black uppercase mb-3 tracking-widest">Quick Suggestions</p>
            <div className="flex flex-wrap gap-2">
                {['Gaya Ajingi Albasu', 'Progress First', 'Service Above Politics', '#GhaliPanda2027', 'Youth For Dr. Ghali', 'Building The Future'].map(slogan => (
                    <button
                        key={slogan}
                        onClick={() => onUpdate('customMessage', slogan)}
                        className="text-[11px] sm:text-xs px-4 py-2 bg-white/5 border border-white/10 hover:border-brand-400/50 hover:bg-brand-500/10 text-gray-300 hover:text-brand-300 rounded-full transition-all shadow-sm active:scale-95 font-bold touch-manipulation min-h-[40px] flex items-center"
                    >
                        {slogan}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {imageSrc && (
        <PhotoCropper
          isOpen={isCropperOpen}
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
          onClose={() => setIsCropperOpen(false)}
          onDone={handleDoneCropping}
        />
      )}
    </div>
  )
}
