import Link from 'next/link'
import scorecard from '@/lib/scorecard.json'

export default function LegislativePage() {
  return (
    <main className="grid min-h-[65vh] place-items-center bg-gray-50 px-4 py-12">
      <section className="max-w-2xl rounded-2xl border border-gray-200 bg-white p-7 shadow-sm sm:p-10">
        <p className="text-xs font-bold uppercase tracking-widest text-green-700">National Assembly</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">Committee service</h1>
        <p className="mt-4 leading-relaxed text-gray-600">{scorecard.representative} serves as {scorecard.committee}. The constituency scorecard supplied for this site does not include a verified list of motions or bills, so this page reports the confirmed committee role only.</p>
        <Link href="/projects" className="mt-6 inline-flex rounded-xl bg-green-800 px-5 py-3 font-bold text-white hover:bg-green-900">View constituency projects</Link>
      </section>
    </main>
  )
}
