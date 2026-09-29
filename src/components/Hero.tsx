import Image from 'next/image'
import { reader } from '@/lib/keystatic'

export default async function Hero() {
  const data = await reader.singletons.hero.read()

  const eyebrow  = data?.eyebrow  ?? 'EST. 2024'
  const tagline  = data?.tagline  ?? 'TATTOO × BARBER × MERCH'
  const mascotSrc = data?.mascotSrc || '/mascot.png'

  const taglineParts = tagline.split('×').map(s => s.trim())

  return (
    <section className="hero" id="home">
      <div className="hero__content">
        <div className="hero__pair">
          <div className="hero__mascot-wrap">
            <Image src={mascotSrc} alt="Hunthreads mascot" fill priority
              sizes="(max-width: 768px) 90vw, 65vw"
              style={{ objectFit: 'contain', objectPosition: 'center' }} />
          </div>
        </div>

        <p className="hero__tagline">
          {taglineParts.map((part, i) => (
            <span key={i}>
              {part}
              {i < taglineParts.length - 1 && <span className="x"> × </span>}
            </span>
          ))}
        </p>

        <p className="hero__eyebrow">{eyebrow}</p>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <svg className="hero__mouse" viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="24" height="38" rx="12" stroke="currentColor" strokeWidth="1.5"/>
          <rect className="hero__mouse-wheel" x="11.5" y="7" width="3" height="6" rx="1.5" fill="currentColor"/>
        </svg>
        <svg className="hero__scroll-arrow" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}
