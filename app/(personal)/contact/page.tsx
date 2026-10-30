import Link from 'next/link'
import scorecard from '@/lib/scorecard.json'

export default function ContactPage() {
  return (
    <main className="grid min-h-[65vh] place-items-center bg-gray-50 px-4 py-12">
      <section className="max-w-xl rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm sm:p-10">
        <p className="text-xs font-bold uppercase tracking-widest text-green-700">Constituency office</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">Albasu, Gaya & Ajingi</h1>
        <p className="mt-4 leading-relaxed text-gray-600">This site currently presents the public constituency scorecard and project information. Office phone, email and address details were not included in the source material.</p>
        <p className="mt-3 text-sm text-gray-500">{scorecard.constituency.join(', ')}, {scorecard.state}</p>
        <Link href="/projects" className="mt-6 inline-flex rounded-xl bg-green-800 px-5 py-3 font-bold text-white hover:bg-green-900">View projects</Link>
      </section>
    </main>
  )
}
