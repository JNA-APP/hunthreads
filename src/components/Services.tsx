import { getServices } from '@/lib/db'

export default async function Services() {
  const data = await getServices()

  const cards = [
    {
      num: '01',
      colorMod: 'red',
      title:     data.tattoo_title     ?? 'Tattoo',
      desc:      data.tattoo_desc      ?? '',
      list:      data.tattoo_list      ?? [],
      linkLabel: data.tattoo_link_label ?? 'Book Consultation',
      linkHref:  data.tattoo_link_href  ?? '#book',
      icon: (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M8 56L28 20l8 8L8 56z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M28 20l8-8 20 20-8 8-20-20z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          <circle cx="48" cy="12" r="4" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M14 50l4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      num: '02',
      colorMod: 'cyan',
      title:     data.barber_title     ?? 'Barber',
      desc:      data.barber_desc      ?? '',
      list:      data.barber_list      ?? [],
      linkLabel: data.barber_link_label ?? 'Book Your Chair',
      linkHref:  data.barber_link_href  ?? '#book',
      icon: (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M20 12c0 0 4 4 4 10s-4 10-4 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M16 44h32M16 50h24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="28" y="8" width="18" height="28" rx="3" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M34 36v8M40 36v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="22" cy="22" r="6" stroke="currentColor" strokeWidth="2.5"/>
        </svg>
      ),
    },
    {
      num: '03',
      colorMod: 'amber',
      title:     data.merch_title     ?? 'Merch',
      desc:      data.merch_desc      ?? '',
      list:      data.merch_list      ?? [],
      linkLabel: data.merch_link_label ?? 'Shop Now',
      linkHref:  data.merch_link_href  ?? '#merch',
      icon: (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M20 8L12 20v36h40V20L44 8H20z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M20 8c0 6.627 5.373 12 12 12s12-5.373 12-12" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M24 38h16M24 46h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
    },
  ]

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">THREE PILLARS.<br />ONE BRAND.</h2>
        </div>
      </div>
      <div className="services__grid">
        {cards.map(card => (
          <div key={card.num} className={`service-card service-card--${card.colorMod}`}>
            <div className="service-card__top">
              <span className="service-card__num">{card.num}</span>
              <div className="service-card__icon">{card.icon}</div>
            </div>
            <h3 className="service-card__title">{card.title}</h3>
            <div className="service-card__rule" />
            <p className="service-card__desc">{card.desc}</p>
            <ul className="service-card__list">
              {(card.list as string[]).map((item: string) => <li key={item}>{item}</li>)}
            </ul>
            <a href={card.linkHref} className="service-card__link">
              <span>{card.linkLabel}</span>
              <span className="service-card__arrow">→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
