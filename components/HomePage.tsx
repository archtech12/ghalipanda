import Image from 'next/image'
import Link from 'next/link'

interface HomePageProps {
  data?: { title?: string }
}

export function HomePage({ data }: HomePageProps) {
  const title = data?.title ?? 'Hon. Dr. Ghali Mustapha Tijjani Panda'

  return (
    <section className="bg-green-950 text-white">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 overflow-hidden px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-0 size-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-0 size-96 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
          <p className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-100">
            Member, House of Representatives
          </p>
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-xl font-semibold text-emerald-200 sm:text-2xl">
            Service, opportunity, and progress for every community.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-green-100 sm:text-lg lg:mx-0">
            Representing Gaya, Ajingi, and Albasu Federal Constituency, Kano State, with practical projects and inclusive representation.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-green-950 transition hover:bg-emerald-100"
            >
              Explore projects
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              About Ghali
            </Link>
          </div>
        </div>

        <div className="relative z-10 order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-md">
          <div className="absolute inset-4 rounded-full bg-emerald-400/20 blur-2xl" aria-hidden="true" />
          <div className="relative aspect-square overflow-hidden rounded-full border-[10px] border-white/15 bg-green-900 shadow-2xl ring-1 ring-white/20">
            <Image
              src="/assets/Distinguished%20Portrait.png"
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
