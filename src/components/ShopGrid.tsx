'use client'

import { useState } from 'react'
import Image from 'next/image'

type Product = {
  slug: string
  title: string
  desc: string
  detail: string
  category: string
  badge: string
  badgeMod: string
  imageSrc: string
}

const CATEGORIES = ['All', 'Collectible', 'Apparel', 'Accessories', 'Digital Print']

export default function ShopGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? products
    : products.filter(p => p.category === active)

  return (
    <>
      <div className="shop__filters">
        {CATEGORIES.filter(c => c === 'All' || products.some(p => p.category === c)).map(cat => (
          <button
            key={cat}
            className={`shop__filter-btn${active === cat ? ' shop__filter-btn--active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="shop__grid">
        {filtered.map(p => (
          <article key={p.slug} className="shop__card">
            <div className="shop__img-wrap">
              {p.badge && (
                <span className={`merch__badge${p.badgeMod ? ' merch__badge' + p.badgeMod : ''}`}>
                  {p.badge}
                </span>
              )}
              <Image
                src={p.imageSrc || '/placeholder.jpg'}
                alt={p.title}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="shop__card-body">
              <span className="shop__category">{p.category}</span>
              <h2 className="shop__card-title">{p.title}</h2>
              <p className="shop__card-desc">{p.detail}</p>
              <a href="/#book" className="btn btn--primary shop__cta">Get in Touch</a>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
