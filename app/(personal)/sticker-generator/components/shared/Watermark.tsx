export const Watermark = () => {
  return (
    <div className="absolute bottom-4 right-4 z-50 pointer-events-none select-none">
      <div className="bg-black/95 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 flex items-center gap-2 shadow-md whitespace-nowrap">
         <span className="text-xs sm:text-sm text-white font-black tracking-widest uppercase">
            HON. DR. GHALI PANDA 2027
         </span>
      </div>
    </div>
  )
}
