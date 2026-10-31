import { CANDIDATE_BASE64 } from './candidateImage'

export const CandidatePortrait = ({ className = '', src, imagePosition = 'object-top' }: { className?: string, src?: string, imagePosition?: string }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src || CANDIDATE_BASE64}
        crossOrigin="anonymous"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/placeholder.jpg";
        }}
        alt="Hon. Dr. Ghali Panda"
        className={`w-full h-full object-cover ${imagePosition}`}
      />
      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[inherit] pointer-events-none" />
    </div>
  )
}
