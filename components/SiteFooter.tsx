import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="bg-green-950 text-white">
      <div className="container mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-bold">Hon. Dr. Ghali Mustapha Tijjani</p>
          <p className="mt-2 text-sm leading-relaxed text-green-100">Member, House of Representatives<br />Albasu, Gaya and Ajingi Federal Constituency, Kano State</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-green-200">Explore</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/about" className="hover:text-yellow-200">Biography</Link>
            <Link href="/projects" className="hover:text-yellow-200">Projects</Link>
            <Link href="/constituency" className="hover:text-yellow-200">Constituency</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-green-200">
        © Hon. Dr. Ghali Mustapha Tijjani. All rights reserved.
      </div>
    </footer>
  )
}
