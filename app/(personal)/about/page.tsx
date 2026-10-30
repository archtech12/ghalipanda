import Image from 'next/image'
import Link from 'next/link'

const biography = [
  {year: '1980–2005', title: 'Early life and education', text: 'Born on 13 August 1980 in Panda Town, Albasu LGA, Kano State. He attended Panda Central Primary School and Usmanu Danfodiyo University, where he served as a Student Union leader and graduated in 2005.'},
  {year: '2005–2009', title: 'Banking and postgraduate study', text: 'After NYSC at Diamond Bank, where he was retained, he earned an MSc in Oil and Gas from Glasgow Caledonian University in the United Kingdom.'},
  {year: '2009–2014', title: 'Energy sector leadership', text: 'He worked as Area Manager (North West) for Texaco/MRS Oil and Gas and completed a PhD in Oil and Gas at Robert Gordon University, UK.'},
  {year: 'Before public office', title: 'Consulting and national energy work', text: 'As an oil and gas consultant, he contributed to Nigeria’s National Gas Expansion programme before entering politics.'},
  {year: '2023–present', title: 'Representative for Albasu, Gaya and Ajingi', text: 'He represents the constituency in the House of Representatives and serves as Chairman of the House Committee on Ethics and Privileges.'},
]

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="bg-gradient-to-br from-green-950 to-green-800 px-4 py-12 text-white sm:py-16">
        <div className="container mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-green-200">Biography</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Hon. Dr. Ghali Mustapha Tijjani</h1>
            <p className="mt-4 max-w-xl leading-relaxed text-green-100">A background in education, energy and consulting informs his public service for Albasu, Gaya and Ajingi Federal Constituency.</p>
          </div>
          <div className="relative mx-auto h-72 w-72 overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl sm:h-80 sm:w-80">
            <Image src="/assets/Distinguished%20Portrait.png" alt="Hon. Dr. Ghali Mustapha Tijjani" fill sizes="320px" className="object-cover object-top" priority />
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <div className="mb-8 rounded-2xl border border-green-100 bg-green-50 p-5 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wider text-green-800">Public service</p>
          <p className="mt-2 leading-relaxed text-gray-700">Hon. Dr. Ghali Mustapha Tijjani serves in the 10th National Assembly as Member for Albasu, Gaya and Ajingi Federal Constituency. He is Chairman of the House Committee on Ethics and Privileges.</p>
        </div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Education, career and service</h2>
        <ol className="space-y-4">
          {biography.map((item) => (
            <li key={item.title} className="grid gap-2 rounded-xl border border-gray-100 p-5 sm:grid-cols-[130px_1fr] sm:gap-5">
              <p className="text-sm font-bold text-green-800">{item.year}</p>
              <div><h3 className="font-bold text-gray-900">{item.title}</h3><p className="mt-1 text-sm leading-relaxed text-gray-600">{item.text}</p></div>
            </li>
          ))}
        </ol>
        <Link href="/projects" className="mt-8 inline-flex rounded-xl bg-green-800 px-5 py-3 font-bold text-white hover:bg-green-900">Explore constituency projects →</Link>
      </section>
    </main>
  )
}
