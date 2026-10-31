'use client'

import { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import Link from 'next/link'

// Official Candidates Photos
const CANDIDATE_PHOTOS = [
  { id: 'portrait_smile', label: 'Official Smiling Cap', src: '/assets/Distinguished%20Portrait.png' },
  { id: 'portrait_white', label: 'Traditional Attire', src: '/assets/Distinguished%20Portrait.png' },
  { id: 'portrait_classic', label: 'Classic Formal', src: '/assets/images/gallery/0-Portraits-Official/portrait-3.jpg' },
  { id: 'portrait_hero', label: 'Leader Pose', src: '/assets/Distinguished%20Portrait.png' },
]

const PARTY_LOGO_PATH = '/assets/images/gallery/0-Portraits-Official/APC2.png'

const GAYA_AJINGI_ALBASU_WARDS = [
  'Gaya Town',
  'Kademi',
  'Panda',
  'Albasu',
  'Ajingi',
  'Faragai',
  'Gafasa',
  'Toranke',
  'Daho',
  'Kwalele',
  'Bataiya',
  'Wuro Bagga',
  'Gamoji',
  'Chula',
  'Balare',
]


const SLOGAN_PRESETS = [
  '#GhaliPanda2027 CONTINUITY',
  'Ingantaccen Wakilci',
  'Proven Track Record & Service',
  'Empowering the Grassroots',
  'Na Tsaya da Ghali Panda',
]

const FingerprintIcon = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className} aria-label="Fingerprint voting mark">
    <path d="M50,12 C30.7,12 15,27.7 15,47 C15,55.8 18.3,64 23.8,70.2 L27.2,67.2 C22.6,62 19.8,54.8 19.8,47 C19.8,30.3 33.3,16.8 50,16.8 C66.7,16.8 80.2,30.3 80.2,47 C80.2,54.8 77.4,62 72.8,67.2 L76.2,70.2 C81.7,64 85,55.8 85,47 C85,27.7 69.3,12 50,12 Z" />
    <path d="M50,21 C35.6,21 24,32.6 24,47 C24,53.3 26.3,59.1 30.1,63.6 L33.6,60.6 C30.6,56.9 28.8,52.2 28.8,47 C28.8,35.3 38.3,25.8 50,25.8 C61.7,25.8 71.2,35.3 71.2,47 C71.2,52.2 69.4,56.9 66.4,60.6 L69.9,63.6 C73.7,59.1 76,53.3 76,47 C76,32.6 64.4,21 50,21 Z" />
    <path d="M50,30 C40.6,30 33,37.6 33,47 C33,50.8 34.4,54.3 36.8,57.1 L40.3,54.1 C38.7,52.1 37.8,49.6 37.8,47 C37.8,40.3 43.3,34.8 50,34.8 C56.7,34.8 62.2,40.3 62.2,47 C62.2,49.6 61.3,52.1 59.7,54.1 L63.2,57.1 C65.6,54.3 67,50.8 67,47 C67,37.6 59.4,30 50,30 Z" />
    <path d="M50,39 C45.6,39 42,42.6 42,47 C42,48.8 42.7,50.4 43.9,51.6 L47.4,48.6 C47,48.2 46.8,47.6 46.8,47 C46.8,45.2 48.2,43.8 50,43.8 C51.8,43.8 53.2,45.2 53.2,47 C53.2,47.6 53,48.2 52.6,48.6 L56.1,51.6 C57.3,50.4 58,48.8 58,47 C58,42.6 54.4,39 50,39 Z" />
    <path d="M29,76 C34.8,83.2 42.1,87.8 50,87.8 C57.9,87.8 65.2,83.2 71,76 L67.4,72.8 C62.4,79 56.4,83 50,83 C43.6,83 37.6,79 32.6,72.8 L29,76 Z" />
    <path d="M35,84 C39.4,88.7 44.6,91.8 50,91.8 C55.4,91.8 60.6,88.7 65,84 L61.6,80.8 C58,84.6 54.1,87 50,87 C45.9,87 42,84.6 38.4,80.8 L35,84 Z" />
  </svg>
)

const StateSeal = () => (
  <div className="w-10 h-10 rounded-full border-2 border-green-500 bg-green-950 flex items-center justify-center shadow-md relative overflow-hidden shrink-0">
    <div className="absolute inset-0.5 rounded-full border border-yellow-400/80"></div>
    <div className="flex flex-col items-center justify-center text-center leading-none">
      <span className="text-[5px] font-black text-green-300 uppercase tracking-tighter">KANO STATE</span>
      <span className="material-symbols-outlined text-yellow-400 text-[11px] my-[-1px]">shield</span>
      <span className="text-[5px] font-black text-white/90 uppercase tracking-tighter">NIGERIA</span>
    </div>
  </div>
)

export default function SupporterCardPage() {
  const [supporterName, setSupporterName] = useState('')
  const [ward, setWard] = useState('GAYA TOWN')
  const lga = 'GAYA / AJINGI / ALBASU FED. CON.'
  const [candidateName, setCandidateName] = useState('Hon. Dr. Ghali Panda')
  const [performanceTag, setPerformanceTag] = useState('PROVEN PERFORMANCE')
  const [tagline, setTagline] = useState('#GhaliPanda2027 CONTINUITY')
  const [poweredBy, setPoweredBy] = useState('Team Ghali Panda')
  const [colorTheme, setColorTheme] = useState<'maroon' | 'green' | 'blue'>('green')
  const [supporterImage, setSupporterImage] = useState<string | null>(null)
  const [selectedCandidatePhoto, setSelectedCandidatePhoto] = useState(CANDIDATE_PHOTOS[0].src)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [mounted, setMounted] = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSupporterImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateCardBlob = async (): Promise<{ blob: Blob; safeName: string } | null> => {
    if (!canvasRef.current) return null
    await new Promise((resolve) => setTimeout(resolve, 80))

    const canvas = await html2canvas(canvasRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    })

    const safeName = supporterName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'supporter'
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve({ blob, safeName })
        } else {
          resolve(null)
        }
      }, 'image/png')
    })
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const result = await generateCardBlob()
      if (!result) throw new Error('Failed to generate image')

      const url = URL.createObjectURL(result.blob)
      const link = document.createElement('a')
      link.download = `My-Vote-My-Pledge-${result.safeName}.png`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed:', err)
      alert('Failed to generate image. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShare = async () => {
    setIsSharing(true)
    try {
      const result = await generateCardBlob()
      if (!result) throw new Error('Failed to create file')

      const file = new File([result.blob], `My-Vote-My-Pledge-${result.safeName}.png`, {
        type: 'image/png',
      })

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Vote, My Pledge | Hon. Dr. Ghali Panda',
          text: `I pledge to vote for Hon. Dr. Ghali Panda 2027! Create your own pledge card at https://ghalipanda.com/supporter-card`,
        })
      } else {
        // Fallback: download automatically
        const url = URL.createObjectURL(result.blob)
        const link = document.createElement('a')
        link.download = `My-Vote-My-Pledge-${result.safeName}.png`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
        alert('Card downloaded! You can now share it directly on WhatsApp, Twitter, or Facebook.')
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err)
        handleDownload()
      }
    } finally {
      setIsSharing(false)
    }
  }

  const themeStyles = {
    maroon: {
      bgGradient: 'from-[#5d071e] via-[#460415] to-[#2b020c]',
      bannerBg: 'bg-[#430414]/90 border-white/10',
      tagText: 'text-rose-200',
    },
    green: {
      bgGradient: 'from-[#064e3b] via-[#043d2e] to-[#022c22]',
      bannerBg: 'bg-[#032e22]/90 border-white/10',
      tagText: 'text-emerald-200',
    },
    blue: {
      bgGradient: 'from-[#1e3a8a] via-[#172554] to-[#0f172a]',
      bannerBg: 'bg-[#0f1d4a]/90 border-white/10',
      tagText: 'text-blue-200',
    },
  }[colorTheme]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider hover:bg-green-500/20 transition-all"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span> Return Home
            </Link>
            <Link
              href="/sticker-generator"
              className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider hover:bg-blue-500/20 transition-all"
            >
              <span className="material-symbols-outlined text-sm">palette</span> All 16 Sticker Layouts
            </Link>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
            My Vote, My Pledge
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Customize and generate your official endorsement pledge card in real-time. Upload your photo, enter your ward details, and download or share instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Form Input Section */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-400">tune</span>
                  Interactive Card Customizer
                </h2>
                <span className="text-[10px] font-black uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full">
                  Live Sync
                </span>
              </div>

              {/* 1. Photo Upload */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-2.5">
                  1. Upload Supporter Photo
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {!supporterImage ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 px-4 border-2 border-dashed border-slate-700 hover:border-green-500 bg-slate-950/60 hover:bg-green-500/5 rounded-2xl transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm font-bold text-slate-300 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-green-500/20 flex items-center justify-center transition-colors">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-green-400 text-xl">
                        add_a_photo
                      </span>
                    </div>
                    <span>Click to Select or Take Photo</span>
                  </button>
                ) : (
                  <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 p-3.5 flex items-center gap-3.5">
                    <img
                      src={supporterImage}
                      alt="Your photo"
                      className="w-14 h-14 rounded-xl object-cover border-2 border-green-500 shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-white truncate">Photo Attached</p>
                      <p className="text-[10px] text-slate-400">Looking great on your pledge card!</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSupporterImage(null)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors text-xs font-bold flex items-center gap-1"
                        title="Remove Photo"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl transition-colors text-xs font-bold flex items-center gap-1"
                        title="Replace Photo"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Supporter Name */}
              <div className="mb-5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                  2. Supporter Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg pointer-events-none">
                    person
                  </span>
                  <input
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="e.g. AUWALU YUSUF MUHAMMAD"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-700/80 focus:border-green-500 rounded-xl focus:ring-2 focus:ring-green-500/30 outline-none text-white placeholder:text-slate-500 font-bold text-sm uppercase transition-all caret-green-400"
                    style={{ color: '#ffffff', backgroundColor: '#020617' }}
                    value={supporterName}
                    onChange={(e) => setSupporterName(e.target.value.toUpperCase())}
                  />
                </div>
              </div>

              {/* 3. Ward Selection with Fast Chips */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                    3. Ward
                  </label>
                  <span className="text-[10px] text-slate-400">Click a ward or type custom</span>
                </div>
                <div className="relative mb-2">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg pointer-events-none">
                    location_on
                  </span>
                  <input
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="e.g. GAYA TOWN / KADEMI"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-700/80 focus:border-green-500 rounded-xl focus:ring-2 focus:ring-green-500/30 outline-none text-white placeholder:text-slate-500 font-bold text-sm uppercase transition-all caret-green-400"
                    style={{ color: '#ffffff', backgroundColor: '#020617' }}
                    value={ward}
                    onChange={(e) => setWard(e.target.value.toUpperCase())}
                  />
                </div>
                {/* Fast Ward Chips */}
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {GAYA_AJINGI_ALBASU_WARDS.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWard(w.toUpperCase())}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                        ward === w.toUpperCase()
                          ? 'bg-green-600 text-white border-green-500'
                          : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Tagline & Slogan Presets */}
              <div className="mb-5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                  5. Campaign Tagline
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="e.g. Deserves Another Chance!"
                  className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700/80 focus:border-green-500 rounded-xl focus:ring-2 focus:ring-green-500/30 outline-none text-white placeholder:text-slate-500 font-bold text-sm mb-2 transition-all caret-green-400"
                  style={{ color: '#ffffff', backgroundColor: '#020617' }}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                />
                <div className="flex flex-wrap gap-1.5">
                  {SLOGAN_PRESETS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setTagline(s)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                        tagline === s
                          ? 'bg-green-600 text-white border-green-500'
                          : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Candidate Photo Chooser */}
              <div className="mb-5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-2">
                  6. Candidate Photo
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {CANDIDATE_PHOTOS.map((photo) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setSelectedCandidatePhoto(photo.src)}
                      className={`relative aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all group ${
                        selectedCandidatePhoto === photo.src
                          ? 'border-green-400 shadow-lg shadow-green-500/20 scale-[1.02]'
                          : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={photo.src} alt={photo.label} className="w-full h-full object-cover object-top" />
                      {selectedCandidatePhoto === photo.src && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-[10px] font-black text-white">check</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 7. Color Theme */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-2">
                  7. Color Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'maroon', label: 'Crimson / Maroon', bg: 'bg-[#5d071e]' },
                    { id: 'green', label: 'APC Emerald', bg: 'bg-[#064e3b]' },
                    { id: 'blue', label: 'Royal Blue', bg: 'bg-[#1e3a8a]' },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setColorTheme(theme.id as any)}
                      className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 border text-xs font-bold transition-all ${
                        colorTheme === theme.id
                          ? 'border-green-400 bg-slate-800 text-white shadow-lg'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${theme.bg}`}></span>
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Download & Share */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading || isSharing || !supporterName}
                  className={`py-4 px-4 rounded-2xl font-black uppercase tracking-wider text-white shadow-xl flex items-center justify-center gap-2 transition-all ${
                    isDownloading || !supporterName
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-green-600/30 active:scale-98'
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">download</span>
                      <span>Download PNG</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  disabled={isDownloading || isSharing || !supporterName}
                  className={`py-4 px-4 rounded-2xl font-black uppercase tracking-wider text-white shadow-xl flex items-center justify-center gap-2 transition-all ${
                    isSharing || !supporterName
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-600/30 active:scale-98'
                  }`}
                >
                  {isSharing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Preparing...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">share</span>
                      <span>Share / WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2">
            <div className="sticky top-6 w-full flex flex-col items-center">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Instant Live Render
              </div>

              {/* ── CARD CANVAS CONTAINER ── */}
              <div className="w-full flex justify-center overflow-hidden p-1">
                <div
                  ref={canvasRef}
                  className={`relative w-full max-w-[480px] bg-gradient-to-b ${themeStyles.bgGradient} rounded-[28px] p-4 sm:p-5 shadow-2xl overflow-hidden font-sans border border-white/10`}
                  style={{
                    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)',
                    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  {/* Subtle Background Texture */}
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(255,255,255,0.08) 12px, rgba(255,255,255,0.08) 13px)',
                    }}
                  ></div>

                  {/* ── HEADER ── */}
                  <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none drop-shadow-sm">
                        My Vote, My Pledge
                      </h2>
                      <p className="text-white/90 text-xs font-semibold mt-1">
                        I pledge to vote for {candidateName}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-right shrink-0">
                      <StateSeal />
                      <div className="leading-tight">
                        <span className="block text-[8px] text-white/60 font-medium">Powered by:</span>
                        <span className="block text-[9px] text-white font-bold max-w-[120px] leading-tight">
                          {poweredBy}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── DUAL SIDE-BY-SIDE CARDS ── */}
                  <div className="relative z-10 grid grid-cols-2 gap-3 mb-3">
                    {/* LEFT CARD: SUPPORTER */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col border border-white/20">
                      <div className="relative aspect-[4/4.5] bg-slate-100 overflow-hidden">
                        {supporterImage ? (
                          <img
                            src={supporterImage}
                            alt="Supporter"
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-slate-400 p-4 text-center">
                            <span className="material-symbols-outlined text-4xl mb-1 text-slate-400">
                              account_circle
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">
                              Your Photo
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Supporter Details Box */}
                      <div className="py-2.5 px-3 bg-white flex flex-col justify-center gap-1.5 text-slate-900 border-t border-slate-100 flex-1">
                        <div className="grid grid-cols-[36px_1fr] sm:grid-cols-[40px_1fr] items-center gap-1.5 min-h-[18px]">
                          <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider leading-none">
                            NAME
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-black uppercase text-slate-950 leading-normal whitespace-nowrap overflow-visible">
                            {supporterName || 'SUPPORTER NAME'}
                          </span>
                        </div>
                        <div className="grid grid-cols-[36px_1fr] sm:grid-cols-[40px_1fr] items-center gap-1.5 min-h-[18px]">
                          <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider leading-none">
                            WARD
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-black uppercase text-slate-950 leading-normal whitespace-nowrap overflow-visible">
                            {ward || 'CONSTITUENCY WARD'}
                          </span>
                        </div>
                        <div className="grid grid-cols-[36px_1fr] sm:grid-cols-[40px_1fr] items-center gap-1.5 min-h-[18px]">
                          <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider leading-none">
                            CON.
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-black uppercase text-slate-950 leading-normal whitespace-nowrap overflow-visible">
                            {lga}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT CARD: CANDIDATE */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col border border-white/20">
                      <div className="relative h-full min-h-[220px] bg-slate-900 overflow-hidden">
                        <img
                          src={selectedCandidatePhoto}
                          alt="Hon. Dr. Ghali Panda"
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  {/* ── MIDDLE PLEDGE BANNER ── */}
                  <div
                    className={`relative z-10 ${themeStyles.bannerBg} rounded-xl px-4 py-2 text-center text-white text-xs sm:text-sm font-medium mb-3 shadow-inner`}
                  >
                    I pledge to vote for{' '}
                    <span className="font-black text-white">{candidateName}</span>
                  </div>

                  {/* ── BOTTOM FOOTER SECTION ── */}
                  <div className="relative z-10 bg-white rounded-2xl p-3 sm:p-3.5 flex items-center justify-between shadow-lg text-slate-900">
                    <div>
                      <span className="block text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-slate-500">
                        {performanceTag}
                      </span>
                      <span className="block text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-tight">
                        {tagline}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="h-8 sm:h-9 w-10 sm:w-12 relative flex items-center justify-center">
                        <img
                          src={PARTY_LOGO_PATH}
                          alt="APC Logo"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="text-slate-900">
                        <FingerprintIcon className="w-8 h-8 sm:w-9 sm:h-9" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-xs mt-3 text-center">
                High-resolution 300+ DPI render ready for WhatsApp Status, Facebook, Instagram & X.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
