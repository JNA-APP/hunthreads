import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Services from '@/components/Services'
import Work from '@/components/Work'
import Merch from '@/components/Merch'
import BehindScenes from '@/components/BehindScenes'
import About from '@/components/About'
import Book from '@/components/Book'
import Footer from '@/components/Footer'
import { reader } from '@/lib/keystatic'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TattooParlor',
      '@id': 'https://hunthreads.com/#tattoo',
      name: 'HUNTHREADS Tattoo Studio',
      description:
        'Custom tattoo art in Central Luzon — black & grey realism, traditional flash, cover-ups, and bespoke designs. Based in the Philippines.',
      telephone: '+639563676153',
      url: 'https://hunthreads.com',
      openingHours: 'Mo-Su 10:00-19:00',
      hasMap: 'https://maps.app.goo.gl/FyBsdwSZD4HLuNL48',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Central Luzon',
        addressCountry: 'PH',
      },
      sameAs: [
        'https://www.facebook.com/profile.php?id=61568755497348',
        'https://www.tiktok.com/@hunthreadscollection',
      ],
      priceRange: '₱₱',
    },
    {
      '@type': 'HairSalon',
      '@id': 'https://hunthreads.com/#barber',
      name: 'HUNTHREADS Barber',
      description:
        'Precision fades, skin tapers, shape-ups, beard sculpts, and hot towel shaves in Central Luzon, Philippines.',
      telephone: '+639563676153',
      url: 'https://hunthreads.com',
      openingHours: 'Mo-Su 10:00-19:00',
      hasMap: 'https://maps.app.goo.gl/FyBsdwSZD4HLuNL48',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Central Luzon',
        addressCountry: 'PH',
      },
      sameAs: [
        'https://www.facebook.com/profile.php?id=61568755497348',
        'https://www.tiktok.com/@hunthreadscollection',
      ],
      priceRange: '₱₱',
    },
  ],
}

export default async function Home() {
  const [galleryRaw, btsRaw] = await Promise.all([
    reader.collections.gallery.all(),
    reader.collections.bts.all(),
  ])

  const galleryItems = galleryRaw
    .map(({ slug, entry }) => ({
      slug,
      order:            entry.order ?? 99,
      label:            entry.label ?? slug,
      category:         (entry.category ?? 'tattoo') as 'tattoo' | 'barber',
      imageSrc:         entry.imageSrc ?? '',
      placeholderStyle: entry.placeholderStyle ?? '',
    }))
    .sort((a, b) => a.order - b.order)

  const btsPhotos = btsRaw
    .map(({ slug, entry }) => ({
      slug,
      order:    entry.order ?? 99,
      label:    entry.label ?? slug,
      imageSrc: entry.imageSrc ?? '',
      featured: entry.featured ?? false,
    }))
    .sort((a, b) => a.order - b.order)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <Hero />
      <Ticker />
      <Services />
      <Work items={galleryItems} />
      <Merch />
      <BehindScenes photos={btsPhotos} />
      <About />
      <Book />
      <Footer />
    </>
  )
}
