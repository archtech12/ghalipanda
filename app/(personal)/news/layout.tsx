import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Updates | Hon. Dr. Ghali Mustapha Tijjani',
  description: 'Scorecard and constituency project updates for Albasu, Gaya and Ajingi Federal Constituency.',
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
