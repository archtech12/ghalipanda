import '@/styles/index.css'
import {Navbar} from '@/components/Navbar'
import {FooterWrapper} from '@/components/FooterWrapper'
import {BackToTop} from '@/components/BackToTop'

export default function IndexRoute({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white text-black dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <FooterWrapper />
        <BackToTop />
      </div>
    </>
  )
}
