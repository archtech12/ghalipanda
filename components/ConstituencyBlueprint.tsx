'use client'

import Link from 'next/link'
import { useState } from 'react'

interface BlueprintPillar {
  id: string
  title: string
  titleHA?: string
  icon: string
  tagline: string
  badge: string
  badgeColor: string
  accentColor: string
  deliverables: string[]
  stats: string
  statsLabel: string
  link: string
}

const blueprintPillars: BlueprintPillar[] = [
  {
    id: 'water-health',
    title: 'Clean Water & Public Health',
    titleHA: 'Inganta Ruwan Sha da Lafiya',
    icon: 'water_drop',
    tagline: 'Delivering industrial solar water systems and restoring existing boreholes to ensure safe drinking water.',
    badge: 'High Impact',
    badgeColor: 'bg-green-50 text-green-800 border-green-200',
    accentColor: 'from-green-700 to-yellow-500',
    deliverables: [
      '20,000-litre industrial solar-powered boreholes',
      'Restoration of 30+ broken community boreholes',
      'Faragai Hospital construction & medical outreach',
    ],
    stats: '30+ Communities',
    statsLabel: 'Accessing clean, reliable water',
    link: '/projects?category=Water',
  },
  {
    id: 'education-skills',
    title: 'Education & Digital Literacy',
    titleHA: 'Ilimi da Fasahar Sadarwa',
    icon: 'school',
    tagline: 'Investing in human capital, digital skills, and full scholarships for aspiring medical professionals.',
    badge: 'Human Capital',
    badgeColor: 'bg-green-50 text-green-800 border-green-200',
    accentColor: 'from-green-800 to-green-600',
    deliverables: [
      '60 full scholarships for Nursing & Midwifery students',
      'Equipped NITDA ICT Center in Panda Town',
      'Construction & renovation of 13+ school blocks',
    ],
    stats: '60 Scholars',
    statsLabel: 'Fully funded medical trainees',
    link: '/projects?category=Education',
  },
  {
    id: 'infrastructure-energy',
    title: 'Infrastructure & Solar Energy',
    titleHA: 'Hanyoyi da Hasken Solar',
    icon: 'solar_power',
    tagline: 'Connecting agricultural hubs through road networks and illuminating towns with renewable street lighting.',
    badge: 'Infrastructure',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    accentColor: 'from-yellow-500 to-amber-400',
    deliverables: [
      '1,500+ solar-powered street lights installed',
      '5 km Faragai–Chilori–Magamaru inter-ward road',
      '2 km Panda Township bypass to ease traffic',
    ],
    stats: '1,500+ Units',
    statsLabel: 'Solar street lights deployed',
    link: '/projects?category=Infrastructure',
  },
  {
    id: 'agriculture-food',
    title: 'Agriculture & Food Security',
    titleHA: 'Noma da Samar da Abinci',
    icon: 'agriculture',
    tagline: 'Equipping grassroots farmers with subsidized fertilizers, pest control, and mechanized machinery.',
    badge: 'Food Security',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    accentColor: 'from-green-700 to-yellow-500',
    deliverables: [
      'Mass distribution of thousands of fertilizer bags',
      '4,000 pieces of agro-chemicals and sprayers',
      'Heavy-duty industrial tractors donated to LGAs',
    ],
    stats: 'Thousands',
    statsLabel: 'Farmers supported across 3 LGAs',
    link: '/projects?category=Agriculture',
  },
  {
    id: 'empowerment-livelihoods',
    title: 'Youth & Women Empowerment',
    titleHA: 'Tallafin Matasa da Mata',
    icon: 'diversity_3',
    tagline: 'Providing livelihood assets, transport vehicles, and seed funding for self-reliant businesses.',
    badge: 'Livelihoods',
    badgeColor: 'bg-green-50 text-green-800 border-green-200',
    accentColor: 'from-green-800 to-yellow-500',
    deliverables: [
      '100+ commercial motorcycles for youth transport',
      '500+ grinding and pasta-making machines for women',
      'Cash grants to 1,000+ micro and small enterprise owners',
    ],
    stats: '1,500+ Assets',
    statsLabel: 'Distributed to active entrepreneurs',
    link: '/projects?category=Empowerment',
  },
  {
    id: 'legislative-advocacy',
    title: 'Legislative Advocacy & Placements',
    titleHA: 'Wakilci da Samar da Aikin Yi',
    icon: 'gavel',
    tagline: 'Championing constituent-centered bills on the House floor and securing federal career placements.',
    badge: 'Governance',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    accentColor: 'from-green-800 to-green-600',
    deliverables: [
      'Active advocacy on energy, petroleum & local economy',
      'Federal career placements in security, aviation & civil service',
      'Constituency feedback desks in Gaya, Ajingi & Albasu',
    ],
    stats: '3 LGAs',
    statsLabel: 'Unified voice in the 10th Assembly',
    link: '/legislative',
  },
]

export function ConstituencyBlueprint() {
  const [activeTab, setActiveTab] = useState<string>('all')

  const displayedPillars =
    activeTab === 'all'
      ? blueprintPillars
      : blueprintPillars.filter((p) => p.id === activeTab)

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Decorative background grid and gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#166534_0.75px,transparent_0.75px)] [background-size:20px_20px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-amber-200/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-green-900 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
            </span>
            Constituency Blueprint
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            A Strategic Framework for Sustainable Progress
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-gray-600 sm:text-lg">
            Our blueprint guides every intervention across{' '}
            <span className="font-semibold text-green-800">Gaya</span>,{' '}
            <span className="font-semibold text-green-800">Ajingi</span>, and{' '}
            <span className="font-semibold text-green-800">Albasu</span>—turning policy commitments into measurable grassroots transformation.
          </p>

          {/* Quick Pillar Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-green-800 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              All 6 Pillars
            </button>
            {blueprintPillars.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === p.id
                    ? 'bg-green-800 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{p.icon}</span>
                <span>{p.title.split('&')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
            >
              {/* Top Accent Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pillar.accentColor}`}
              />

              <div>
                {/* Header: Icon & Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-800 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${pillar.badgeColor}`}
                  >
                    {pillar.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-5 text-xl font-bold tracking-tight text-gray-900 group-hover:text-green-800 transition-colors">
                  {pillar.title}
                </h3>
                {pillar.titleHA && (
                  <p className="text-xs font-medium text-gray-500 italic mt-0.5">
                    {pillar.titleHA}
                  </p>
                )}

                {/* Tagline */}
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {pillar.tagline}
                </p>

                {/* Key Deliverables Checklist */}
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Key Deliverables
                  </p>
                  <ul className="mt-2.5 space-y-2 text-sm text-gray-700">
                    {pillar.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="material-symbols-outlined mt-0.5 text-sm text-green-600 shrink-0">
                          check_circle
                        </span>
                        <span className="text-xs sm:text-sm leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Stat & Link */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="text-base font-bold text-gray-900 sm:text-lg">
                    {pillar.stats}
                  </p>
                  <p className="text-[11px] text-gray-500">{pillar.statsLabel}</p>
                </div>
                <Link
                  href={pillar.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-green-700 transition hover:text-green-900"
                >
                  <span>Explore</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Constituency Scope Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Inclusive Representation Across 3 Local Government Areas
              </p>
              <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                Albasu • Gaya • Ajingi Federal Constituency
              </h3>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm text-green-100">
                Every project under the Blueprint is equitably distributed across all wards, ensuring no community is left behind in water, power, education, or economic support.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-green-950 shadow-md transition hover:bg-emerald-100 active:scale-95"
              >
                <span>View Full Scorecard</span>
                <span className="material-symbols-outlined text-base">checklist</span>
              </Link>
              <Link
                href="/constituency"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20 active:scale-95"
              >
                <span>Constituency Map</span>
                <span className="material-symbols-outlined text-base">explore</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
