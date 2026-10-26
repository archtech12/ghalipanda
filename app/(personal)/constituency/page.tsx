import {
  constituencyData as staticConstituencyData,
  initiatives as staticInitiatives,
  visionContent as staticVisionContent,
} from '@/lib/data'
import Link from 'next/link'

interface Initiative {
  id: number
  title: string
  description: string
  icon: string
}

interface ConstituencyData {
  name: string
  representative: string
  party: string
  electionYear: string
  communities: string[]
  population: string
  reContestYear: string
  committee: string
}

// ... (imports same)
// ... interfaces same

export default function ConstituencyPage() {
  const constituencyData = staticConstituencyData
  const initiatives: Initiative[] = staticInitiatives
  const visionContent = staticVisionContent

  return (
    <div className="w-full">
      <section className="bg-green-900/90 dark:bg-green-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">
            Gaya, Ajingi & Albasu Federal Constituency
          </h1>
          <p className="mt-4 text-base sm:text-lg text-green-100">
            Serving the people of Gaya, Ajingi, and Albasu Federal Constituency with dedication and integrity
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Our Constituency
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p className="mb-4">
                  The {constituencyData.name} is represented in the House of Representatives by{' '}
                  {constituencyData.representative}, who was elected in{' '}
                  {constituencyData.electionYear} on the platform of the {constituencyData.party}.
                </p>
                <p className="mb-4">
                  Our constituency is home to hundreds of thousands of residents across{' '}
                  {constituencyData.communities.length} distinct local governments (Gaya, Ajingi, and Albasu) and their wards, each
                  with its own unique cultural heritage and economic characteristics.{' '}
                  Hon. Dr. Ghali Panda's representation focuses on addressing the
                  specific needs of these communities while advocating for policies that benefit all
                  constituents and Nigerians.
                </p>
                <p className="mb-6">
                  Since taking office, Hon. Dr. Ghali Panda has championed initiatives that
                  focus on clean water, healthcare access, rural electrification, and agricultural support. His legislative work emphasizes rural infrastructure, farm input subsidies, healthcare facilities, and empowering youth and women to build lasting self-reliance.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  Key Policy Focus Areas
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Building and renovating classrooms, deploying ICT hubs, and supporting scholarships</li>
                  <li>Expanding access to clean water and healthcare</li>
                  <li>Improving roads, bridges, street lighting, and electricity access</li>
                  <li>Supporting farmers with fertilizer, herbicides, and tractors</li>
                  <li>Creating livelihood opportunities for women and young people</li>
                </ul>

                <div className="bg-green-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <blockquote className="text-lg italic text-gray-900 dark:text-white">
                    "My representation is anchored in empowering youth, women, and families across
                    our constituency—delivering vital support such as food aid, education
                    infrastructure, and economic-opportunity programmes."
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Constituency Facts
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">
                      location_on
                    </span>
                    <span>
                      <strong>Communities:</strong> {constituencyData.communities.join(', ')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">groups</span>
                    <span>
                      <strong>Population:</strong> {constituencyData.population}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">badge</span>
                    <span>
                      <strong>Representative:</strong> {constituencyData.representative}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">
                      calendar_today
                    </span>
                    <span>
                      <strong>Elected:</strong> {constituencyData.electionYear}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">event</span>
                    <span>
                      <strong>Next election year:</strong> {constituencyData.reContestYear}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">account_balance</span>
                    <span>
                      <strong>Committee role:</strong> {constituencyData.committee}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">flag</span>
                    <span>
                      <strong>Party:</strong> {constituencyData.party}
                    </span>
                  </li>
                </ul>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-block w-full text-center bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 transition duration-300"
                  >
                    Contact Our Office
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Key Initiatives
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Programs and policies championed by Hon. Dr. Ghali Panda for our
              constituency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative) => (
              <div
                key={initiative.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-green-700"
              >
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                    <span className="material-symbols-outlined text-green-700 dark:text-green-400">
                      {initiative.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {initiative.title}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-red-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Vision for the Future
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mx-auto">
                <p className="mb-4">{visionContent}</p>
                <Link
                  href="/legislative"
                  className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-800 transition duration-300 transform hover:scale-105"
                >
                  Learn About Legislative Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
