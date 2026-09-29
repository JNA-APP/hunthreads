import { adminDb } from '@/lib/supabase'

export default async function AdminDashboard() {
  const [
    { count: productCount },
    { count: galleryCount },
    { count: btsCount },
  ] = await Promise.all([
    adminDb.from('products').select('*', { count: 'exact', head: true }),
    adminDb.from('gallery').select('*', { count: 'exact', head: true }),
    adminDb.from('bts').select('*', { count: 'exact', head: true }),
  ])

  const quickLinks = [
    { href: '/admin/hero',     label: 'Edit Hero' },
    { href: '/admin/services', label: 'Edit Services' },
    { href: '/admin/about',    label: 'Edit About' },
    { href: '/admin/shop',     label: 'Edit Shop Page' },
    { href: '/admin/products', label: 'Manage Products' },
    { href: '/admin/gallery',  label: 'Manage Gallery' },
    { href: '/admin/bts',      label: 'Manage BTS Photos' },
  ]

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">Dashboard</h1>
      </div>

      <div className="ht-stats">
        <div className="ht-stat">
          <div className="ht-stat__num">{productCount ?? 0}</div>
          <div className="ht-stat__label">Products</div>
        </div>
        <div className="ht-stat">
          <div className="ht-stat__num">{galleryCount ?? 0}</div>
          <div className="ht-stat__label">Gallery Items</div>
        </div>
        <div className="ht-stat">
          <div className="ht-stat__num">{btsCount ?? 0}</div>
          <div className="ht-stat__label">BTS Photos</div>
        </div>
      </div>

      <div className="ht-card">
        <p className="ht-card__title">Quick Links</p>
        <div className="ht-quick-links">
          {quickLinks.map(l => (
            <a key={l.href} href={l.href} className="ht-quick-link">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
