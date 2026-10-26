'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import html2canvas from 'html2canvas'

// Configuration
const OFFICIAL_PHOTO_PATH = '/assets/images/gallery/0-Portraits-Official/portrait-1.jpg'
const PARTY_LOGO_PATH = '/assets/images/gallery/apc logo.jpg'

export default function PostCreatorPage() {
  const [headline, setHeadline] = useState('')
  const [useOfficialPhoto, setUseOfficialPhoto] = useState(true)
  const [customImage, setCustomImage] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCustomImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = async () => {
    if (!canvasRef.current) return
    
    setIsDownloading(true)
    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: null,
      })
      
      const link = document.createElement('a')
      link.download = `ghali-panda-post-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Download failed:', err)
      alert('Failed to generate image. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  // Determine which image to show
  const displayImage = useOfficialPhoto ? OFFICIAL_PHOTO_PATH : (customImage || '/placeholder.jpg')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-gray-900">Social Media Post Generator</h1>
            <p className="text-gray-600 mt-2">Create professional, branded updates for Hon. Dr. Ghali Panda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="material-symbols-outlined mr-2 text-green-600">settings</span>
                    Configuration
                </h3>
                
                {/* Photo Source Toggle */}
                <div className="mb-6">
                    <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition">Use Official Portrait</span>
                        <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${useOfficialPhoto ? 'bg-green-600' : 'bg-gray-300'}`}
                             onClick={() => setUseOfficialPhoto(!useOfficialPhoto)}>
                            <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${useOfficialPhoto ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                    </label>
                </div>

                {/* Custom Image Upload */}
                {!useOfficialPhoto && (
                    <div className="mb-6 animate-fade-in">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Custom Photo</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-green-50 file:text-green-700
                                hover:file:bg-green-100"
                        />
                    </div>
                )}

                {/* Headline Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Post Headline / Content</label>
                    <textarea
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                        placeholder="Enter your message here..."
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                    ></textarea>
                     <p className="text-xs text-gray-400 mt-1 text-right">{headline.length} chars</p>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleDownload}
                    disabled={isDownloading || (!useOfficialPhoto && !customImage)}
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center transition-all transform hover:-translate-y-1 ${
                        isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800 hover:shadow-green-500/30'
                    }`}
                >
                    {isDownloading ? (
                        <>
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                            Generating...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined mr-2">download_for_offline</span>
                            Download Image
                        </>
                    )}
                </button>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 text-sm text-blue-800">
                <div className="flex items-start">
                    <span className="material-symbols-outlined mr-2 text-blue-600 mt-0.5">info</span>
                    <p>Tip: Keep headlines concise for maximum impact. The design automatically adjusts to fit your text.</p>
                </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-8 flex items-center justify-center bg-gray-200/50 rounded-2xl border-2 border-dashed border-gray-300 p-8">
            <div className="relative shadow-2xl rounded-none overflow-hidden" ref={canvasRef} style={{ width: '600px', height: '600px' }}>
                
                {/* Canvas Logic */}
                <div className="absolute inset-0 bg-white flex flex-col">
                    
                    {/* Header/Image Section (Top 60%) */}
                    <div className="h-[65%] relative overflow-hidden bg-gray-100">
                         {/* Texture Overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-10 mix-blend-multiply pointer-events-none"></div>
                        
                        {displayImage && (
                            <img 
                                src={displayImage} 
                                alt="Post Visual" 
                                className="w-full h-full object-cover object-top"
                                style={{ objectPosition: 'center 20%' }}
                            />
                        )}
                        
                        {/* Gradient Overlay for Text Readability if we wanted text over image, but design asks for separate text area. 
                            Let's add a subtle bottom gradient to the image just in case. */}
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-green-900/50 to-transparent"></div>
                    </div>

                    {/* Content Section (Bottom 35%) */}
                    <div className="h-[35%] bg-green-900 relative flex flex-col justify-between p-6 overflow-hidden">
                        
                         {/* Decorative Background Elements */}
                         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                         <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                        {/* Text Content */}
                        <div className="relative z-10 h-full flex flex-col justify-center">
                            <h2 className="text-white font-black leading-tight drop-shadow-md" 
                                style={{ fontSize: headline.length > 80 ? '1.5rem' : headline.length > 40 ? '2rem' : '2.5rem' }}>
                                {headline || "Enter your headline text to see it appear here live."}
                            </h2>
                        </div>

                        {/* Footer */}
                        <div className="relative z-10 flex items-end justify-between border-t border-white/20 pt-4 mt-2">
                             <div>
                                 <div className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-0.5">Hon. Dr. Ghali Panda</div>
                                 <div className="text-green-200 text-xs tracking-wider">Member, House of Representatives</div>
                             </div>
                             
                             <div className="flex items-center gap-3">
                             <div className="flex flex-col items-end gap-1">
                                 <span className="text-yellow-400 font-black italic text-sm">#GHALIPANDA</span>
                                 <span className="text-white/80 font-bold italic text-xs">#GHALIPANDA2027</span>
                             </div>
                                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-lg">
                                     {/* APC Logo */}
                                     {/* eslint-disable-next-line @next/next/no-img-element */}
                                     <img src={PARTY_LOGO_PATH} alt="APC Logo" className="w-full h-full object-contain" />
                                 </div>
                             </div>
                        </div>
                    </div>
                    
                    {/* Green Accent Line */}
                    <div className="h-2 bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-400"></div>
                </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
