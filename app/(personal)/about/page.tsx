import Link from 'next/link'
import Image from 'next/image'

interface QuickFact {
  icon: string
  label: string
  value: string
}

interface AboutData {
  title: string
  content: string
  quickFacts?: QuickFact[]
}

const defaultQuickFacts: QuickFact[] = [
  { icon: 'badge', label: 'Position', value: 'Member, House of Representatives' },
  { icon: 'location_on', label: 'Constituency', value: 'Gaya, Ajingi, and Albasu Federal Constituency' },
  { icon: 'calendar_today', label: 'Years of Service', value: '2023 - Present' },
  { icon: 'groups', label: 'Party', value: 'All Progressives Congress (APC)' },
  { icon: 'school', label: 'Education', value: 'PhD, Oil and Gas, Robert Gordon University (2014)' },
]

const visionItems = [
  {
    icon: 'school',
    title: 'Education & Human Capital',
    desc: 'Classroom blocks, one equipped ICT center, 13+ schools under renovation, and 60 nursing and midwifery scholarships.',
  },
  {
    icon: 'diversity_3',
    title: 'Youth & Women Empowerment',
    desc: 'Motorcycles, grinding machines, pasta-making equipment, and SME grants supporting livelihoods.',
  },
  {
    icon: 'water_drop',
    title: 'Clean Water & Healthcare',
    desc: 'Industrial 20,000-litre solar boreholes, repairs to over 30 boreholes, and the Faragai hospital project.',
  },
  {
    icon: 'agriculture',
    title: 'Agriculture & Food Security',
    desc: 'Fertilizer support for thousands of farmers, 4,000 insecticide and herbicide pieces, and tractors.',
  },
  {
    icon: 'solar_power',
    title: 'Roads & Solar Street Lighting',
    desc: 'A 5 km Faragai road, a 2 km Panda bypass, and over 1,500 solar street lights.',
  },
  {
    icon: 'home_work',
    title: 'Employment & Career Placements',
    desc: 'Employment and scholarship placements across security, oil and gas, aviation, and healthcare.',
  },
]

export default function AboutPage() {
  const aboutData: AboutData = {
    title: 'About Hon. Dr. Ghali Mustapha Tijjani Panda',
    content: `<p>Hon. Dr. Ghali Mustapha Tijjani Panda was born on 13 August 1980 in Panda Town, Albasu Local Government Area, Kano State. He began his education at Panda Central Primary School and attended Usman Danfodio University, where he served as a Student Union leader and graduated in 2005.</p>
    <p>After completing his NYSC at Diamond Bank, where he was retained, he earned an MSc in Oil and Gas from Glasgow Caledonian University in 2009. He later worked as Area Manager (North West) for Texaco/MRS Oil and Gas and completed a PhD in Oil and Gas at Robert Gordon University in 2014.</p>
    <p>Before entering politics, Dr. Ghali was an oil and gas consultant and contributed to Nigeria's National Gas Expansion Programme. In 2023, he was elected on the platform of the All Progressives Congress (APC) to represent Gaya, Ajingi, and Albasu Federal Constituency in the House of Representatives.</p>
    <p>His public service includes legislative advocacy and community projects focused on clean water, roads, healthcare, education, agriculture, and career opportunities across Albasu, Gaya, and Ajingi.</p>`,
    quickFacts: defaultQuickFacts,
  }

  const facts = aboutData.quickFacts && aboutData.quickFacts.length > 0
    ? aboutData.quickFacts
    : defaultQuickFacts

  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-green-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-yellow-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-5 text-xs sm:text-sm font-semibold tracking-wide uppercase text-green-100">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block mr-2 align-middle" />
            Gaya, Ajingi, and Albasu Federal Constituency
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {aboutData.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-green-100 max-w-2xl mx-auto leading-relaxed">
            Dedicated advocate for community development and participatory leadership
          </p>
        </div>
      </section>

      {/* ── Profile + Biography ── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">

            {/* Profile card – appears first on mobile */}
            <div className="lg:col-span-1 order-first lg:order-last">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden sticky top-24">
                {/* photo */}
                <div className="relative w-full h-64 sm:h-72">
                  <Image
                    src="/assets/Distinguished%20Portrait.png"
                    alt="Hon. Dr. Ghali Panda"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  {/* name badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4">
                    <p className="text-white font-bold text-lg leading-tight">Hon. Dr. Ghali Panda</p>
                    <p className="text-green-300 text-sm">Gaya / Ajingi / Albasu</p>
                  </div>
                </div>

                {/* quick facts */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                    Quick Facts
                  </h3>
                  <ul className="space-y-3">
                    {facts.map((fact, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl shrink-0 mt-0.5">
                          {fact.icon}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">{fact.label}:</strong>{' '}
                          {fact.value}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow hover:shadow-lg active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm">mail</span>
                      Get In Touch
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="lg:col-span-2 order-last lg:order-first">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">
                My Journey
              </h2>

              <div
                className="prose prose-sm sm:prose-base prose-green max-w-none text-gray-700 dark:text-gray-300 mb-10"
                dangerouslySetInnerHTML={{ __html: aboutData.content }}
              />

              {/* Timeline */}
              <div className="border-l-4 border-green-600 pl-5 sm:pl-6 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[26px] top-1.5 w-4 h-4 rounded-full bg-green-600 ring-4 ring-green-100 dark:ring-green-900" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Member, House of Representatives
                  </h3>
                  <span className="text-green-700 dark:text-green-400 font-bold text-sm block mb-2">
                    2023 – Present
                  </span>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Representing Gaya, Ajingi, and Albasu Federal Constituency under the All Progressives Congress (APC).
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[26px] top-1.5 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-gray-100 dark:ring-gray-800" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Grassroots Philanthropy &amp; Community Service
                  </h3>
                  <span className="text-gray-500 font-bold text-sm block mb-2">Pre-2023</span>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Built a revered track record of community self-help projects, youth educational sponsorships, and healthcare interventions across rural Kano communities.
                  </p>
                </div>
              </div>

              {/* Core Values */}
              <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Core Values
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {[
                    'Integrity in all actions and decisions',
                    'Transparency in governance and operations',
                    'Accountability to constituents and stakeholders',
                    'Equity in resource distribution and opportunity',
                    'Sustainability in development initiatives',
                    'Community empowerment through participatory leadership',
                  ].map((v, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="material-symbols-outlined text-green-600 text-base shrink-0 mt-0.5">
                        check_circle
                      </span>
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
              My Vision
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Leadership &quot;by the people, for the people&quot; through community empowerment and sustainable development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {visionItems.map((item, i) => (
              <div
                key={i}
                className="group bg-green-50 dark:bg-gray-700 p-5 sm:p-6 rounded-2xl border border-transparent hover:border-green-200 dark:hover:border-green-700 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-green-700 group-hover:bg-green-600 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <span className="material-symbols-outlined text-white text-xl">{item.icon}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
