import './globals.css'
import Script from 'next/script'
import { IBM_Plex_Mono, Inter, PT_Serif } from 'next/font/google'
import { Metadata, Viewport } from 'next'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Hon. Dr. Ghali Panda - Gaya, Ajingi, and Albasu Federal Constituency',
    template: '%s | Hon. Dr. Ghali Panda',
  },
  description: 'Official website of Hon. Dr. Ghali Mustapha Tijjani Panda, Member representing Gaya, Ajingi, and Albasu Federal Constituency in the House of Representatives.',
  keywords: [
    'Ghali Panda',
    'Hon. Dr. Ghali Panda',
    'Ghali Mustapha Tijjani',
    'Gaya',
    'Ajingi',
    'Albasu',
    'Kano',
    'House of Representatives',
    'Nigeria Politics',
    'Ghali Panda 2027',
    'Community Development',
    'APC',
  ],
  authors: [{ name: 'Hon. Dr. Ghali Panda' }],
  creator: 'Hon. Dr. Ghali Panda Media Team',
  publisher: 'Hon. Dr. Ghali Panda Media',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: SITE_URL,
    siteName: 'Hon. Dr. Ghali Panda Official',
    title: 'Hon. Dr. Ghali Panda - Gaya, Ajingi, and Albasu Federal Constituency',
    description:
      'Celebrating the impactful service of Hon. Dr. Ghali Panda in Gaya, Ajingi, and Albasu Federal Constituency. Delivering clean water, healthcare, electrification, and community empowerment.',
    images: [
      {
        url: '/assets/images/gallery/0-Portraits-Official/portrait-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Hon. Dr. Ghali Panda',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hon. Dr. Ghali Panda - Gaya, Ajingi, and Albasu Federal Constituency',
    description:
      'Championing development across Gaya, Ajingi, and Albasu Federal Constituency.',
    images: ['/assets/images/gallery/0-Portraits-Official/portrait-1.jpg'],
    creator: '@HonGhaliPanda',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/images/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/assets/images/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/assets/images/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/assets/images/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#16a34a', // Green-600
}

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
})
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

import { ThemeProvider } from '@/components/ThemeProvider'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <meta name="theme-color" content="#16a34a" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
