import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ShopGrid from '@/components/ShopGrid'
import { reader } from '@/lib/keystatic'

export const metadata: Metadata = {
  title: 'Shop — HUNTHREADS',
  description: 'Collectibles, apparel and accessories. Limited runs. No restocks.',
}

export default async function ShopPage() {
  const [all, shopData] = await Promise.all([
    reader.collections.products.all(),
    reader.singletons.shopPage.read(),
  ])

  const eyebrow    = shopData?.eyebrow    ?? 'The Collection'
  const title      = shopData?.title      ?? 'THE FULL DROP'
  const sub        = shopData?.sub        ?? 'Limited runs. No restocks. Everything here ships while it lasts.'
  const footerNote = shopData?.footerNote ?? 'All pieces are limited. Once sold, they don\'t come back.'

  return (
    <>
      <Nav />

      <main className="shop">
        <div className="shop__hero">
          <div className="shop__bg-text" aria-hidden="true">SHOP</div>
          <div className="container">
            <Link href="/" className="shop__back">← Back to Home</Link>
            <span className="section-label">{eyebrow}</span>
            <h1 className="shop__title">{title}</h1>
            <p className="shop__sub">{sub}</p>
          </div>
        </div>

        <div className="container">
          <ShopGrid products={all.map(({ slug, entry: p }) => ({
            slug,
            title:    p.title,
            desc:     p.desc     ?? '',
            detail:   p.detail   ?? '',
            category: p.category ?? '',
            badge:    p.badge    ?? '',
            badgeMod: p.badgeMod ?? '',
            imageSrc: p.imageSrc ?? '',
          }))} />

          <div className="shop__footer-note">
            <p>{footerNote}</p>
            <a href="/#book" className="btn btn--ghost">Custom Order Enquiry</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
