import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {projects} from '@/lib/projects'

interface Props {params: Promise<{id: string}>}

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({id: project._id}))
}

export async function generateMetadata({params}: Props) {
  const {id} = await params
  const project = projects.find((item) => item._id === id)
  return {
    title: project ? `${project.title} | Ghali Panda` : 'Project not found | Ghali Panda',
    description: project?.description ?? 'Constituency project scorecard for Albasu, Gaya and Ajingi.',
  }
}

export default async function ProjectDetailsPage({params}: Props) {
  const {id} = await params
  const project = projects.find((item) => item._id === id)
  if (!project) notFound()

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:py-10">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-4 sm:p-5"><Link href="/projects" className="text-sm font-bold text-green-800 hover:underline">← All constituency projects</Link></div>
        <div className="relative h-56 bg-gradient-to-br from-green-700 to-green-950 sm:h-80">{project.images[0] && <Image src={project.images[0]} alt={project.title} fill sizes="(max-width: 768px) 100vw, 896px" priority className="object-cover" />}</div>
        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="rounded-full bg-green-50 px-3 py-1 text-green-800">{project.category}</span>
            <span className="text-gray-500">{project.date}</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold text-gray-900 sm:text-4xl">{project.title}</h1>
          <p className="mt-4 leading-relaxed text-gray-600">{project.description}</p>
          <div className="mt-6 rounded-xl bg-green-50 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-green-800">Scorecard impact</p>
            <p className="mt-1 font-semibold text-gray-900">{project.impact}</p>
          </div>
          <p className="mt-5 text-sm text-gray-600"><span className="font-bold text-gray-800">Location:</span> {project.location}</p>
          <p className="mt-3 text-sm text-gray-500"><span className="font-semibold">Status:</span> {project.status}</p>
        </div>
      </article>
    </main>
  )
}
