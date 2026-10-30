import Image from 'next/image'
import Link from 'next/link'
import {Timeline, timelineData} from './Timeline'
import {projects} from '@/lib/projects'
import scorecard from '@/lib/scorecard.json'

interface HomePageProps {
  data?: {title?: string}
}

const highlightIds = [
  'ghali-education-nursing-scholarships',
  'ghali-infrastructure-faragai-road',
  'ghali-empowerment-pasta-machines',
]
const highlights = highlightIds.map((id) => projects.find((project) => project._id === id)!).filter(Boolean)

const gallery = [
  'ghali-education-classrooms',
  'ghali-water-solar-boreholes',
  'ghali-agriculture-fertilizer',
  'ghali-empowerment-motorcycles',
].map((id) => projects.find((project) => project._id === id)).filter((project) => project?.images[0]).map((project) => ({
  src: project!.images[0],
  alt: project!.title,
  label: project!.category,
}))

const impact = scorecard.homepageMetrics.map((item) => ({
  ...item,
  project: projects.find((project) => project._id === item.projectId),
}))

export function HomePage({data}: HomePageProps) {
  const title = data?.title ?? 'Hon. Dr. Ghali Mustapha Tijjani'

  return (
    <main className="space-y-16 sm:space-y-20">
      {/* Hash site homepage structure: hero, achievements, gallery, impact, biography, timeline, call to action. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 pb-24 text-white sm:pb-32">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-green-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-yellow-300/20 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="space-y-6 text-center lg:w-1/2 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-green-100 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-yellow-300" />
                Member, House of Representatives · 10th National Assembly
              </div>
              <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.98] tracking-tight">
                {title}
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-green-100 sm:text-xl lg:mx-0">
                Serving Albasu, Gaya and Ajingi Federal Constituency with practical investments in education, infrastructure, health, agriculture and opportunity.
              </p>
              <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row lg:justify-start">
                <Link href="/projects" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-bold uppercase tracking-wide text-green-950 shadow-lg transition hover:bg-yellow-300">
                  Explore constituency projects <span aria-hidden="true">→</span>
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10">
                  Meet Dr. Ghali
                </Link>
              </div>
            </div>
            <div className="relative flex w-full justify-center lg:w-1/2 lg:justify-end">
              <div className="relative h-[min(78vw,340px)] w-[min(78vw,340px)] sm:h-[420px] sm:w-[420px] lg:h-[500px] lg:w-[500px]">
                <div className="absolute inset-0 rounded-full bg-green-300/30 blur-2xl" />
                <div className="absolute inset-3 overflow-hidden rounded-full border-8 border-white/20 shadow-2xl">
                  <Image src="/assets/Distinguished%20Portrait.png" alt="Hon. Dr. Ghali Mustapha Tijjani" fill priority sizes="(max-width: 640px) 78vw, (max-width: 1024px) 420px, 500px" className="object-cover object-top" />
                </div>
                <div className="absolute left-0 top-[16%] max-w-48 rounded-2xl border border-white/50 bg-white/95 p-4 text-gray-900 shadow-xl sm:-left-8">
                  <div className="text-2xl font-black leading-snug text-green-800">{projects.find((project) => project._id === 'ghali-infrastructure-solar-lights')?.metricValue}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">Solar street lights</div>
                </div>
                <div className="absolute bottom-[12%] right-0 rounded-2xl border border-white/50 bg-white/95 p-4 text-gray-900 shadow-xl sm:-right-5">
                  <div className="text-2xl font-black text-green-800">{scorecard.constituency.length} LGAs</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-600">One constituency</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:p-8">
          <div className="mb-7 flex flex-col gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-green-700">Constituency impact</span>
              <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">Projects making a difference</h2>
            </div>
            <Link href="/projects" className="font-semibold text-green-800 hover:underline">View all projects →</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((item) => (
              <Link key={item.title} href="/projects" className="group overflow-hidden rounded-xl border border-gray-100 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-48 bg-gradient-to-br from-green-700 to-green-950">
                  {item.images[0] && <Image src={item.images[0]} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />}
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-green-800">{item.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-green-800">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.impact}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-green-700">Across the constituency</span>
            <h2 className="mt-1 text-3xl font-bold text-gray-900">Development in action</h2>
          </div>
          <Link href="/gallery" className="font-semibold text-green-800 hover:underline">Browse the gallery →</Link>
        </div>
        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-4 sm:gap-4">
          {gallery.map((item, index) => (
            <Link href="/gallery" key={item.src} className={`group relative overflow-hidden rounded-2xl bg-gray-100 ${index === 1 ? 'sm:row-span-2' : ''}`}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-12 text-sm font-bold text-white">{item.label}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-green-800 to-green-950 py-14 text-white sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-9 text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-green-200">Verified scorecard</span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">A record of constituency service</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {impact.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur sm:p-7">
                <div className="text-3xl font-black sm:text-5xl">{item.project?.metricValue}</div>
                <div className="mt-2 text-sm text-green-100">{item.label}</div>
              </div>
            ))}
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur sm:p-7">
              <div className="text-3xl font-black sm:text-5xl">{projects.length}</div>
              <div className="mt-2 text-sm text-green-100">Scorecard initiatives</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto flex flex-col items-center gap-9 px-4 py-2 sm:px-6 lg:flex-row lg:px-8">
        <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xl lg:w-5/12">
          <Image src="/assets/ghali%20pic.jpg" alt="Hon. Dr. Ghali Mustapha Tijjani" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-top" />
        </div>
        <div className="lg:w-7/12">
          <span className="text-sm font-bold uppercase tracking-wider text-green-700">Meet your representative</span>
          <h2 className="mt-2 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">A background in energy, service and public leadership</h2>
          <p className="mt-5 leading-relaxed text-gray-600">Hon. Dr. Ghali Mustapha Tijjani was born in Panda Town, Albasu. After studying at Usmanu Danfodiyo University, he worked in banking and the oil and gas sector, earned postgraduate degrees in the United Kingdom, and contributed to Nigeria’s National Gas Expansion programme before entering public service.</p>
          <p className="mt-4 leading-relaxed text-gray-600">Today, he represents Albasu, Gaya and Ajingi in the House of Representatives and serves as Chairman of the House Committee on Ethics and Privileges.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/about" className="rounded-xl bg-green-800 px-5 py-3 font-bold text-white transition hover:bg-green-900">Read full biography</Link>
            <Link href="/constituency" className="rounded-xl border border-gray-300 px-5 py-3 font-bold text-gray-800 transition hover:bg-gray-50">Constituency profile</Link>
          </div>
        </div>
      </section>

      <Timeline items={timelineData} />

      <section className="relative overflow-hidden bg-[url('/assets/solar%20construction%20banner.jpg')] bg-cover bg-center py-16 sm:py-20">
        <div className="absolute inset-0 bg-green-950/85" />
        <div className="container relative mx-auto px-4 text-center text-white sm:px-6">
          <span className="text-sm font-bold uppercase tracking-widest text-green-200">One Constituency, Forward Together</span>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black sm:text-5xl">Building opportunity across Albasu, Gaya and Ajingi</h2>
          <p className="mx-auto mt-4 max-w-2xl text-green-100">Explore the constituency scorecard or contact the office to learn more about ongoing work.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/projects" className="rounded-xl bg-white px-6 py-4 font-bold text-green-950 hover:bg-yellow-300">Explore projects</Link>
            <Link href="/constituency" className="rounded-xl border border-white/40 bg-white/5 px-6 py-4 font-bold text-white hover:bg-white/10">View constituency</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
