import Link from 'next/link'
import scorecard from '@/lib/scorecard.json'
import {projects} from '@/lib/projects'

const pillars = [
  {title: 'Youth & women empowerment', description: 'Motorcycles, grinding machines, pasta machines, cash grants and skills support.', icon: 'trending_up'},
  {title: 'Education & human capital', description: 'Classroom blocks, an ICT center, school renovations and 60 nursing scholarships.', icon: 'school'},
  {title: 'Clean water access', description: '20,000-litre solar boreholes and repair of more than 30 existing boreholes.', icon: 'water_drop'},
  {title: 'Infrastructure development', description: 'Faragai road, Panda bypass and more than 1,500 solar street lights.', icon: 'construction'},
  {title: 'Agriculture support', description: 'Fertilizer, crop-protection supplies and industrial tractors for farmers.', icon: 'agriculture'},
  {title: 'Jobs & placements', description: 'Placements in public service, aviation, energy and healthcare, plus PTDF scholarships.', icon: 'work'},
]

export default function ConstituencyPage() {
  const locations = scorecard.constituency.join(' · ')
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-br from-green-950 via-green-900 to-green-800 px-4 py-12 text-white sm:py-16">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-widest text-green-200">Federal Constituency · Kano State</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{locations}</h1>
          <p className="mt-4 max-w-2xl text-green-100">One constituency across three local government areas, with a scorecard focused on opportunity, public services and infrastructure.</p>
        </div>
      </header>
      <section className="container mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {scorecard.constituency.map((lga) => <div key={lga} className="rounded-xl border border-gray-200 bg-white p-4 text-center font-bold text-gray-900 shadow-sm">{lga} LGA</div>)}
        </div>
        <div className="mb-8 flex items-center justify-between gap-3">
          <div><p className="text-sm font-bold uppercase tracking-wider text-green-700">Development priorities</p><h2 className="mt-1 text-2xl font-bold text-gray-900">Six scorecard pillars</h2></div>
          <Link href="/projects" className="shrink-0 text-sm font-bold text-green-800 hover:underline">All {projects.length} projects →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => <article key={pillar.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><span className="material-symbols-outlined text-2xl text-green-800" aria-hidden="true">{pillar.icon}</span><h3 className="mt-2 font-bold text-gray-900">{pillar.title}</h3><p className="mt-1 text-sm leading-relaxed text-gray-600">{pillar.description}</p></article>)}
        </div>
        <p className="mt-7 text-center text-xs text-gray-500">Scorecard population: {scorecard.population}</p>
      </section>
    </main>
  )
}
