import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Latest News & Updates | #GhaliPanda2027 CONTINUITY',
  description: 'Read the latest news, legislative updates, and community achievements of Hon. Dr. Ghali Mustapha Tijjani Panda in Gaya, Ajingi, and Albasu Federal Constituency. Join the #GhaliPanda2027 CONTINUITY movement.',
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
