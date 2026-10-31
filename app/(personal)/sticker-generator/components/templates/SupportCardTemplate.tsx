import { TemplateProps } from '../../types'

const CANDIDATE_PHOTO_PATH = '/assets/Distinguished%20Portrait.png'
const PARTY_LOGO_PATH = '/assets/images/gallery/0-Portraits-Official/APC2.png'

const FingerprintIcon = ({ className = 'h-full w-full' }: { className?: string }) => (
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
  <div className="flex h-[7.5cqw] w-[7.5cqw] shrink-0 items-center justify-center rounded-full border-[0.35cqw] border-green-500 bg-green-950 shadow-md relative overflow-hidden">
    <div className="absolute inset-[0.1cqw] rounded-full border border-yellow-400/80"></div>
    <div className="flex flex-col items-center justify-center text-center leading-none">
      <span className="text-[1cqw] font-black text-green-300 uppercase tracking-tighter">KANO</span>
      <span className="material-symbols-outlined text-yellow-400 text-[2cqw] my-[-0.2cqw]">shield</span>
      <span className="text-[0.9cqw] font-black text-white/90 uppercase tracking-tighter">NIGERIA</span>
    </div>
  </div>
)

export const SupportCardTemplate = ({ data }: TemplateProps) => {
  const supporterName = data.supporterName?.trim() || 'YOUR FULL NAME'
  const message = data.customMessage?.trim() || 'Deserves Another Chance!'

  const themeGradients = {
    green: 'from-[#064e3b] via-[#043d2e] to-[#022c22]',
    red: 'from-[#5d071e] via-[#460415] to-[#2b020c]',
    blue: 'from-[#1e3a8a] via-[#172554] to-[#0f172a]',
    gold: 'from-[#451a03] via-[#3b1202] to-[#1c0800]',
  }

  const bannerBgs = {
    green: 'bg-[#032e22]/90 border-white/10',
    red: 'bg-[#430414]/90 border-white/10',
    blue: 'bg-[#0f1d4a]/90 border-white/10',
    gold: 'bg-[#290d02]/90 border-white/10',
  }

  const currentGradient = themeGradients[data.colorTheme] || themeGradients.red
  const currentBanner = bannerBgs[data.colorTheme] || bannerBgs.red

  return (
    <div
      className={`relative h-full w-full overflow-hidden select-none font-sans bg-gradient-to-b ${currentGradient} p-[3.5cqw] flex flex-col justify-between`}
      style={{ containerType: 'inline-size' }}
    >
      {/* Background Vertical Texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(255,255,255,0.08) 12px, rgba(255,255,255,0.08) 13px)',
        }}
      />

      {/* ── TOP HEADER ── */}
      <div className="relative z-10 flex items-start justify-between gap-[2cqw] shrink-0">
        <div>
          <h2 className="font-black text-white tracking-tight leading-none drop-shadow-sm" style={{ fontSize: '5.2cqw' }}>
            My Vote, My Pledge
          </h2>
          <p className="text-white/90 font-semibold" style={{ fontSize: '2.1cqw', marginTop: '0.4cqw' }}>
            I pledge to vote for Hon. Dr. Ghali Panda
          </p>
        </div>

        <div className="flex items-center gap-[1.5cqw] text-right shrink-0">
          <StateSeal />
          <div className="leading-tight">
            <span className="block font-medium text-white/60 uppercase" style={{ fontSize: '1.2cqw' }}>
              Powered by:
            </span>
            <span className="block font-black text-white" style={{ fontSize: '1.5cqw' }}>
              Team Ghali Panda
            </span>
          </div>
        </div>
      </div>

      {/* ── DUAL SIDE-BY-SIDE CARDS ── */}
      <div className="relative z-10 grid grid-cols-2 gap-[2.5cqw] my-[1.5cqw] flex-1">
        {/* LEFT CARD: SUPPORTER */}
        <div className="bg-white rounded-[2cqw] overflow-hidden shadow-xl flex flex-col border border-white/20">
          <div className="relative h-[65%] bg-slate-100 overflow-hidden">
            {data.supporterPhoto ? (
              <img
                src={data.supporterPhoto}
                crossOrigin="anonymous"
                alt="Supporter"
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-slate-400">
                <span className="material-symbols-outlined" style={{ fontSize: '7cqw' }}>
                  account_circle
                </span>
                <span className="font-bold uppercase text-slate-500" style={{ fontSize: '1.6cqw' }}>
                  Supporter Photo
                </span>
              </div>
            )}
          </div>

          {/* Supporter Details Box */}
          <div className="h-[35%] p-[1.8cqw] bg-white space-y-[0.6cqw] text-slate-900 border-t border-slate-100 flex flex-col justify-center">
            <div className="grid grid-cols-[28%_1fr] items-center gap-[0.8cqw]">
              <span className="font-bold text-slate-500 uppercase tracking-wider leading-none" style={{ fontSize: '1.3cqw' }}>
                NAME
              </span>
              <span className="font-black uppercase text-slate-950 leading-normal whitespace-nowrap overflow-visible" style={{ fontSize: '1.8cqw' }}>
                {supporterName}
              </span>
            </div>
            <div className="grid grid-cols-[28%_1fr] items-center gap-[0.8cqw]">
              <span className="font-bold text-slate-500 uppercase tracking-wider leading-none" style={{ fontSize: '1.3cqw' }}>
                WARD
              </span>
              <span className="font-black uppercase text-slate-950 leading-normal whitespace-nowrap overflow-visible" style={{ fontSize: '1.8cqw' }}>
                GAYA TOWN
              </span>
            </div>
            <div className="grid grid-cols-[28%_1fr] items-center gap-[0.8cqw]">
              <span className="font-bold text-slate-500 uppercase tracking-wider leading-none" style={{ fontSize: '1.3cqw' }}>
                CON.
              </span>
              <span className="font-black uppercase text-slate-950 leading-normal whitespace-nowrap overflow-visible" style={{ fontSize: '1.8cqw' }}>
                GAYA / AJINGI / ALBASU FED. CON.
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: CANDIDATE */}
        <div className="bg-white rounded-[2cqw] overflow-hidden shadow-xl flex flex-col border border-white/20">
          <div className="relative h-full bg-slate-900 overflow-hidden">
            <img
              src={CANDIDATE_PHOTO_PATH}
              crossOrigin="anonymous"
              alt="Hon. Dr. Ghali Panda"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* ── MIDDLE PLEDGE BANNER ── */}
      <div
        className={`relative z-10 ${currentBanner} rounded-[1.4cqw] px-[2cqw] py-[1.2cqw] text-center text-white font-medium shadow-inner shrink-0`}
        style={{ fontSize: '2.1cqw' }}
      >
        I pledge to vote for <span className="font-black text-white">Hon. Dr. Ghali Panda</span>
      </div>

      {/* ── BOTTOM FOOTER SECTION ── */}
      <div className="relative z-10 bg-white rounded-[2cqw] p-[2cqw] flex items-center justify-between shadow-xl text-slate-900 shrink-0 mt-[1.5cqw]">
        <div>
          <span className="block font-black uppercase tracking-wider text-slate-500" style={{ fontSize: '1.3cqw' }}>
            PROVEN PERFORMANCE
          </span>
          <span className="block font-black text-slate-900 tracking-tight leading-tight" style={{ fontSize: '2.3cqw' }}>
            {message}
          </span>
        </div>

        <div className="flex items-center gap-[2cqw] shrink-0">
          <div className="h-[5.5cqw] w-[8cqw] relative flex items-center justify-center">
            <img
              src={PARTY_LOGO_PATH}
              crossOrigin="anonymous"
              alt="APC Logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="h-[5.5cqw] w-[5.5cqw] text-slate-900">
            <FingerprintIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
