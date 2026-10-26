import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { news } from '@/lib/news'

type Props = {
  params: Promise<{ id: string }>
}

function getArticle(id: string) {
  return news.find(article => article._id === id) ?? null
}

export function generateStaticParams() {
  return news.map(article => ({ id: article._id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const article = getArticle(id)

  if (!article) return { title: 'News Not Found | Hon. Dr. Ghali Panda' }

  return {
    title: `${article.title} | Hon. Dr. Ghali Panda`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.imageUrl ? [article.imageUrl] : undefined,
      type: 'article',
    },
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params
  const article = getArticle(id)
  if (!article) notFound()

  return (
    <article className="w-full bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/news" className="mb-8 inline-flex items-center gap-2 font-semibold text-green-800 hover:text-green-600 dark:text-green-300">
          <span aria-hidden="true">←</span> Back to News
        </Link>
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-900">
          {article.imageUrl && (
            <div className="relative h-64 w-full bg-gray-200 sm:h-96">
              <Image src={article.imageUrl} alt={article.title} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 896px" />
            </div>
          )}
          <div className="p-6 sm:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-green-100 px-3 py-1 font-bold text-green-800 dark:bg-green-950 dark:text-green-200">{article.category}</span>
              <time dateTime={article.publishDate} className="text-gray-500 dark:text-gray-400">
                {new Date(article.publishDate).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            <h1 className="text-3xl font-black leading-tight text-gray-950 dark:text-white sm:text-4xl">{article.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-600 dark:text-gray-300">{article.excerpt}</p>
            <div className="prose prose-lg mt-8 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
      </div>
    </article>
  )
}
