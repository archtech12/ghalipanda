'use client'
import './sticker-styles.css'

import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { useStickerConfig } from './hooks/useStickerConfig'
import { StickerPreview } from './components/StickerPreview'
import { TextControls } from './components/controls/TextControls'
import { ThemeControls } from './components/controls/ThemeControls'
import { LayoutSwitcher } from './components/controls/LayoutSwitcher'

export default function StickerGeneratorPage() {
  const { data, updateField } = useStickerConfig()
  const exportRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [generatedFile, setGeneratedFile] = useState<File | null>(null)
  const [generatedStickerId, setGeneratedStickerId] = useState<string | null>(null)
  // scale state removed to prevent double scaling with StickerCanvas

  const saveStickerToSupabase = async (base64Data: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/stickers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supporterName: data.supporterName,
          templateId: data.templateId,
          imageBase64: base64Data
        })
      })
      const result = await response.json()
      if (result.success) {
        setGeneratedStickerId(result.id)
        return result.id
      }
    } catch (e) {
      console.error('Failed to save to Supabase:', e)
    }
    return null
  }

  const trackAction = async (id: string, action: 'download' | 'share') => {
    try {
      await fetch('/api/stickers/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
      })
    } catch (e) {
      console.error('Failed to track action:', e)
    }
  }

  const waitForImages = async (element: HTMLElement) => {
    const images = Array.from(element.getElementsByTagName('img'))
    const promises = images.map((img) => {
      if (img.complete) return Promise.resolve()
      return new Promise((resolve) => {
        img.onload = resolve
        img.onerror = resolve // Continue even if broken
      })
    })
    
    // 5 second timeout to prevent hanging forever
    const timeout = new Promise((resolve) => setTimeout(resolve, 5000))
    await Promise.race([Promise.all(promises), timeout])
  }

  const handleDownload = async () => {
    if (!exportRef.current) return
    
    setIsDownloading(true)
    try {
        await document.fonts.ready;
        await waitForImages(exportRef.current)
        
        // Multiplier for ultra-crisp high-res output
        const pixelRatio = window.devicePixelRatio || 1
        const exportScale = 1.5 // Reduced from 2 to 1.5 to dramatically speed up rendering time (especially for blur filters)

        console.log('Starting toPng...')
        const image = await toPng(exportRef.current, {
            pixelRatio: exportScale,
            cacheBust: false,
            skipFonts: true,
            style: {
                transform: 'none',
                transformOrigin: 'top left'
            },
            filter: (node) => {
                // Ignore broken or empty images
                if (node.tagName === 'IMG') {
                   const img = node as HTMLImageElement;
                   if (!img.src || img.src === window.location.href) return false;
                }
                return true;
            }
        })
        console.log('Finished toPng!')
        
        // Save to Supabase
        const stickerId = generatedStickerId || await saveStickerToSupabase(image)
        if (stickerId) {
          trackAction(stickerId, 'download')
        }

        const link = document.createElement('a')
        link.href = image
        link.download = `Hon-Dr-Ghali-${data.templateId}.png`
        ;(window as any).lastDownloadUrl = image;
        link.click()
    } catch (e) {
        console.error('Download failed', e)
        alert(e instanceof Error ? `Image failed to load: ${e.message}. Please check your connection or try a different image.` : 'Could not generate sticker. Please try again.')
    } finally {
        setIsDownloading(false)
    }
  }

  // Download All feature removed for performance

  const handleShare = async () => {
    if (!exportRef.current) return
    
    setIsSharing(true)
    try {
        await document.fonts.ready;
      await waitForImages(exportRef.current)
        
        const exportScale = 2 // Optimized for speed while maintaining good quality

        const dataUrl = await toPng(exportRef.current, {
            pixelRatio: exportScale,
            cacheBust: true,
            skipFonts: true,
            style: {
                transform: 'none',
                transformOrigin: 'top left'
            }
        })
        
        // Convert base64 to blob
        const res = await fetch(dataUrl)
        const blob = await res.blob()
            if (!blob) {
                alert('Could not generate sticker for sharing.')
                setIsSharing(false)
                return
            }

            const file = new File([blob], `Hon-Dr-Ghali-${data.templateId}.png`, { type: 'image/png' })

            const reader = new FileReader()
            reader.onloadend = async () => {
              const base64data = reader.result as string
              const stickerId = generatedStickerId || await saveStickerToSupabase(base64data)
              if (stickerId) {
                setGeneratedStickerId(stickerId)
                trackAction(stickerId, 'share')
              }
            }
            reader.readAsDataURL(blob)

            setGeneratedFile(file)
            setShowShareModal(true)
            setIsSharing(false)
    } catch (e) {
        console.error('Share generation failed', e)
        alert(e instanceof Error ? `Image failed to load: ${e.message}. Please check your connection or try a different image.` : 'Could not generate sticker. Please try again.')
        setIsSharing(false)
    }
  }

  const executeNativeShare = async () => {
    if (!generatedFile) return
    try {
        await navigator.share({
            files: [generatedFile],
            title: 'Hon. Dr. Ghali Panda 2027',
            text: 'I proudly support Hon. Dr. Ghali Panda 2027! 🇳🇬 Join the movement and create your own campaign sticker at https://ghalipanda.com/sticker-generator'
        })
        setShowShareModal(false)
    } catch (err) {
        if ((err as Error).name !== 'AbortError') {
            console.error('Share failed', err)
            // If it still fails, gracefully tell them to use the fallback methods
            alert(`Native sharing is restricted by your device. Please download the image to share!`)
        }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-x-hidden text-slate-900 selection:bg-brand-500/30 pb-28 lg:pb-0">
      
      {/* ── CINEMATIC BACKGROUND EFFECTS (LIGHT STUDIO MODE) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
         <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-brand-300/30 rounded-full blur-[150px] mix-blend-multiply opacity-60 animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-gold-300/30 rounded-full blur-[180px] mix-blend-multiply opacity-60"></div>
      </div>


      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-9 relative z-10">
        
        {/* ── HEADER SECTION ── */}
        <header className="mb-8 lg:mb-10 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 border-b border-slate-200 pb-7">
            <div className="flex flex-col items-center lg:items-start animate-revealUp">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-white text-brand-600 border border-brand-100 text-[10px] uppercase font-black tracking-[0.3em] rounded-full mb-6 shadow-sm">
                     <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse"></span>
                     1. Choose · 2. Personalize · 3. Download
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-3 tracking-tighter leading-tight drop-shadow-sm">
                    Design Your <br className="hidden lg:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500">Sticker</span>
                </h1>
                <p className="text-slate-600 text-base md:text-xl max-w-xl leading-relaxed font-medium">
                    Generate an ultra-premium, personalized endorsement card. Choose a layout, enter your details, and download the high-res graphic.
                </p>
            </div>
            
            {/* Global Stats / Trust Badge */}
            <div className="hidden lg:flex flex-col items-end gap-1 bg-white border border-slate-100 shadow-xl p-6 rounded-2xl animate-revealUp" style={{animationDelay: '0.2s'}}>
                <span className="text-4xl font-black text-slate-900 drop-shadow-sm">2027</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-600">Hon. Dr. Ghali Panda</span>
                <div className="flex items-center gap-2 mt-3 opacity-50">
                   <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                   <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                   <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                </div>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ── RIGHT (TOP ON MOBILE): PREVIEW STUDIO ── */}
            <div className="lg:col-span-7 order-1 lg:order-2 animate-revealUp z-[60] bg-slate-50/95 backdrop-blur-2xl pb-4 pt-2 -mx-4 px-4 lg:bg-transparent lg:pb-0 lg:pt-0 lg:mx-0 lg:px-0 border-b border-slate-200 lg:border-none shadow-[0_10px_30px_rgba(0,0,0,0.05)] lg:shadow-none transition-all" style={{animationDelay: '0.3s'}}>
                 <div className="lg:sticky lg:top-24">
                    
                    {/* The Studio Environment (Light Mode) */}
                    <div className="bg-white p-2 sm:p-6 md:p-8 rounded-[1.5rem] lg:rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center justify-center min-h-[300px] lg:min-h-[650px] relative overflow-hidden group">
                        
                        {/* Floor Reflection / Studio Lights */}
                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-400/30 to-transparent" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-brand-400/10 blur-[100px] rounded-full pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-1000 mix-blend-multiply"></div>

                        {/* The Floating Canvas with dynamic mobile scaling and 3D Tilt */}
                        <div 
                          className="relative w-full max-w-[550px] transition-all duration-200 ease-out z-10"
                          style={{ perspective: '1200px' }}
                          onMouseMove={(e) => {
                             const rect = e.currentTarget.getBoundingClientRect()
                             const x = e.clientX - rect.left
                             const y = e.clientY - rect.top
                             const centerX = rect.width / 2
                             const centerY = rect.height / 2
                             const rotateX = ((y - centerY) / centerY) * -8
                             const rotateY = ((x - centerX) / centerX) * 8
                             e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
                          }}
                          onMouseLeave={(e) => {
                             e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
                             e.currentTarget.style.transition = 'transform 0.5s ease-out'
                          }}
                          onMouseEnter={(e) => {
                             e.currentTarget.style.transition = 'transform 0.1s ease-out'
                          }}
                        >
                             {/* Canvas Glow Shadow */}
                             <div className="absolute -inset-2 bg-gradient-to-b from-slate-300/30 to-transparent rounded-[2rem] blur-xl opacity-50 transition-opacity duration-500"></div>
                             
                             <div className="relative shadow-[0_40px_80px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden bg-white mx-auto w-full group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05)] transition-shadow duration-500">
                                 <StickerPreview ref={exportRef} data={data} />
                             </div>
                        </div>

                        {/* Desktop Actions Bar */}
                        <div className="hidden lg:flex absolute bottom-8 left-0 right-0 px-8 flex-row items-center justify-center gap-4 w-full z-50 transition-all">
                            <button
                                onClick={handleDownload}
                                disabled={isDownloading || isSharing || !data.supporterName}
                                className={`
                                    flex-1 relative overflow-hidden group px-6 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 active:scale-95 text-sm shadow-xl
                                    ${!data.supporterName 
                                        ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                                        : 'bg-brand-600 border border-brand-500 text-white hover:bg-brand-500 hover:shadow-[0_15px_30px_rgba(34,197,94,0.3)] hover:-translate-y-1'
                                    }
                                `}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {isDownloading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                            Rendering...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-lg group-hover:-translate-y-1 transition-transform">file_download</span>
                                            Download
                                        </>
                                    )}
                                </span>
                            </button>



                            <button
                                onClick={handleShare}
                                disabled={isDownloading || isSharing || !data.supporterName}
                                className={`
                                    flex-1 relative overflow-hidden group px-6 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 active:scale-95 text-sm shadow-xl
                                    ${!data.supporterName 
                                        ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                                        : 'bg-brand-600 border border-brand-500 text-white hover:bg-brand-500 hover:shadow-[0_15px_30px_rgba(34,197,94,0.3)] hover:-translate-y-1'
                                    }
                                `}
                            >
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {isSharing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                            Share Link
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-lg">ios_share</span>
                                            Share Link
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                        
                        {!data.supporterName && (
                            <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-amber-700 bg-amber-50 px-5 py-2.5 rounded-full text-[10px] uppercase font-black border border-amber-200 shadow-md animate-pulse z-20">
                                <span className="material-symbols-outlined text-sm">lock</span>
                                Data Required
                            </div>
                        )}
                    </div>
                 </div>
            </div>

            {/* ── LEFT (BOTTOM ON MOBILE): CONTROLS PANEL ── */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-6 lg:space-y-8 animate-revealUp" style={{animationDelay: '0.4s'}}>
                
                {/* Step 1: Layout */}
                <section className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                       <h2 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-3 sm:gap-4">
                           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 text-brand-600 text-xs shadow-sm border border-brand-200">1</div> 
                           Architecture
                       </h2>
                    </div>
                    
                    <div className="relative z-10">
                       <LayoutSwitcher currentTemplate={data.templateId} onSelect={(id) => updateField('templateId', id)} />
                    </div>
                </section>

                {/* Step 2: Customization */}
                <section className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden group">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                     <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                        <h2 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-3 sm:gap-4">
                           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 text-brand-600 text-xs shadow-sm border border-brand-200">2</div>
                           Personalization
                        </h2>
                    </div>
                    
                    <div className="relative z-10 space-y-8">
                        <TextControls data={data} onUpdate={updateField} />
                        
                        <div className="h-px w-full bg-slate-100 my-8"></div>
                        
                        <div>
                           <h3 className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Color Profile</h3>
                           <ThemeControls data={data} onUpdate={updateField} />
                        </div>
                    </div>
                </section>
            </div>
            
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-2xl border-t border-slate-200 flex flex-row items-center justify-center gap-3 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <button
              onClick={handleDownload}
              disabled={isDownloading || isSharing || !data.supporterName}
              className={`
                  flex-1 relative overflow-hidden group px-4 py-4 rounded-xl font-black uppercase tracking-wider transition-all active:scale-95 text-xs shadow-md flex items-center justify-center gap-2 min-h-[50px]
                  ${!data.supporterName 
                      ? 'bg-gray-200 border border-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                      : 'bg-brand-600 border border-brand-500 text-white hover:bg-brand-500'
                  }
              `}
          >
              {isDownloading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                  <span className="material-symbols-outlined text-[18px]">file_download</span>
              )}
              <span>Download</span>
          </button>



          <button
              onClick={handleShare}
              disabled={isDownloading || isSharing || !data.supporterName}
              className={`
                  flex-1 relative overflow-hidden group px-4 py-4 rounded-xl font-black uppercase tracking-wider transition-all active:scale-95 text-xs shadow-md flex items-center justify-center gap-2 min-h-[50px]
                  ${!data.supporterName 
                      ? 'bg-gray-200 border border-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                      : 'bg-brand-600 border border-brand-500 text-white hover:bg-brand-500'
                  }
              `}
          >
              {isSharing ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                  <span className="material-symbols-outlined text-[18px]">ios_share</span>
              )}
              <span>Share</span>
          </button>
      </div>

      {/* ── SHARE MODAL ── */}
      {showShareModal && generatedFile && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
           <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative overflow-hidden flex flex-col items-center animate-revealUp text-center">
              <button 
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors"
              >
                 <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-4 shadow-inner">
                 <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Sticker Ready!</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                 Your personalized campaign sticker has been successfully generated. How would you like to share it?
              </p>

              <div className="w-full flex flex-col gap-3">
                 <button
                   onClick={executeNativeShare}
                   className="w-full flex items-center justify-center gap-3 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-[0_10px_20px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 transition-all"
                 >
                   <span className="material-symbols-outlined text-[18px]">share</span>
                   Share Sticker
                 </button>
                 
                 <button
                   onClick={() => {
                     const link = document.createElement('a')
                     link.download = generatedFile.name
                     link.href = URL.createObjectURL(generatedFile)
                     link.click()
                     setShowShareModal(false)
                   }}
                   className="w-full flex items-center justify-center gap-3 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg hover:-translate-y-0.5 transition-all"
                 >
                   <span className="material-symbols-outlined text-[18px]">download</span>
                   Save to Device
                 </button>
              </div>
           </div>
        </div>
      )}



    </div>
  )
}
