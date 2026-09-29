import type { Metadata } from 'next'
import Script from 'next/script'
import { Barlow_Condensed } from 'next/font/google'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})


export const metadata: Metadata = {
  // TODO: replace with your real production domain
  metadataBase: new URL('https://hunthreads.com'),
  title: {
    default: 'HUNTHREADS — Best Tattoo & Barber Shop in Central Luzon',
    template: '%s | HUNTHREADS',
  },
  description:
    'Hunthreads is Central Luzon\'s home for custom tattoo art, precision barbering, and limited streetwear drops. Book your session today — walk out looking sharp.',
  keywords: [
    'tattoo shop central luzon',
    'barber shop central luzon',
    'best tattoo shop central luzon',
    'tattoo artist central luzon',
    'custom tattoo central luzon',
    'skin fade central luzon',
    'barber central luzon',
    'tattoo barber merch philippines',
    'hunthreads',
    'tattoo studio philippines',
    'best barber philippines',
    'streetwear philippines',
  ],
  authors: [{ name: 'Hunthreads' }],
  creator: 'Hunthreads',
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://hunthreads.com',
    siteName: 'HUNTHREADS',
    title: 'HUNTHREADS — Best Tattoo & Barber Shop in Central Luzon',
    description:
      'Custom tattoo art, precision barbering, and limited streetwear drops. Central Luzon\'s home for sharp cuts and bold ink.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'HUNTHREADS — Tattoo × Barber × Merch, Central Luzon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HUNTHREADS — Best Tattoo & Barber in Central Luzon',
    description:
      'Custom tattoo art, precision barbering, and limited streetwear drops. Central Luzon\'s home for sharp cuts and bold ink.',
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
  other: {
    'geo.region': 'PH-03',
    'geo.placename': 'Central Luzon, Philippines',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-PH"
      data-theme="light"
      className={barlowCondensed.variable}
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">{`try{var t=localStorage.getItem('ht-theme')||'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}`}</Script>
        {children}
      </body>
    </html>
  )
}
