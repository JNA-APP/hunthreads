import Image from 'next/image'
import Link from 'next/link'
import { getProducts } from '@/lib/db'

const CATEGORIES = ['Collectible', 'Apparel', 'Accessories', 'Digital Print'] as const

export default async function Merch() {
  const all = await getProducts()

  const preview = CATEGORIES
    .map(cat => all.find(p => p.category === cat))
    .filter(Boolean) as typeof all

  return (
    <section className="merch" id="merch">
      <div className="merch__bg-text" aria-hidden="true">MERCH</div>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Limited Drops</span>
          <h2 className="section-title">THE THREADS</h2>
        </div>

        <div className="merch__categories">
          <div className="merch__category">
            <div className="merch__category-header">
              <span className="merch__category-num">01</span>
              <div>
                <h3 className="merch__category-title">Merch</h3>
                <p className="merch__category-sub">Collectibles, apparel &amp; accessories. Limited run — no restocks.</p>
              </div>
              <span className="merch__badge merch__badge--cyan" style={{ position: 'static', marginLeft: 'auto', marginTop: '4px' }}>
                COLLECTOR SERIES
              </span>
            </div>

            <div className="merch__row merch__row--4">
              {preview.map(p => (
                <div key={p.slug} className="merch__card">
                  <div className="merch__img merch__img--photo" style={{ position: 'relative' }}>
                    {p.badge && (
                      <span className={`merch__badge${p.badgeMod ? ' merch__badge' + p.badgeMod : ''}`}>
                        {p.badge}
                      </span>
                    )}
                    <Image src={p.imageSrc || '/placeholder.jpg'} alt={p.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="merch__info">
                    <span className="merch__info-cat">{p.category}</span>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="merch__footer">
          <p>All merch is limited. No restocks. Get it while it&#39;s live.</p>
          <div className="merch__footer-actions">
            <Link href="/shop" className="btn btn--primary">View Full Shop</Link>
            <a href="#book" className="btn btn--ghost">Custom Order Enquiry</a>
          </div>
        </div>
      </div>
    </section>
  )
}
