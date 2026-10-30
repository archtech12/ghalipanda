import './globals.css'
import Script from 'next/script'
import { IBM_Plex_Mono, Inter, PT_Serif } from 'next/font/google'
import { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://ghalipanda.vercel.app'),
  title: {
    default: 'Hon. Dr. Ghali Mustapha Tijjani | Albasu, Gaya & Ajingi',
    template: '%s | Hon. Dr. Ghali Mustapha Tijjani',
  },
  description: 'Official website of Hon. Dr. Ghali Mustapha Tijjani, Member representing Albasu, Gaya and Ajingi Federal Constituency in the House of Representatives.',
  keywords: [
    'Ghali Mustapha Tijjani',
    'Ghali Panda',
    'Albasu',
    'Gaya',
    'Ajingi',
    'Kano',
    'House of Representatives',
    'Nigeria Politics',
    'Constituency projects',
    'Community Development',
    'APC',
  ],
  authors: [{ name: 'Hon. Dr. Ghali Mustapha Tijjani' }],
  creator: 'Hon. Dr. Ghali Mustapha Tijjani',
  publisher: 'Ghali Panda',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://ghalipanda.vercel.app',
    siteName: 'Hon. Dr. Ghali Mustapha Tijjani',
    title: 'Hon. Dr. Ghali Mustapha Tijjani - Albasu, Gaya & Ajingi',
    description:
      'Constituency projects and service for Albasu, Gaya and Ajingi Federal Constituency, Kano State.',
    images: [
      {
        url: '/assets/Distinguished%20Portrait.png',
        width: 1200,
        height: 630,
        alt: 'Hon. Dr. Ghali Mustapha Tijjani',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hon. Dr. Ghali Mustapha Tijjani - Albasu, Gaya & Ajingi',
    description:
      'Discover constituency projects and development initiatives across Albasu, Gaya and Ajingi.',
    images: ['/assets/Distinguished%20Portrait.png'],
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
      { url: '/assets/images/favicon.ico' },
      { url: '/assets/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/assets/images/apple-touch-icon.png' }],
    other: [
      { rel: 'android-chrome-192x192', url: '/assets/images/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/assets/images/android-chrome-512x512.png' },
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
