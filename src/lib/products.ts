export type Product = {
  src: string
  title: string
  desc: string
  detail: string
  category: string
  badge?: string
  badgeMod?: string
}

export const products: Product[] = [
  {
    src: '/merch/2.jpg',
    title: 'Mascot Series — 5 Colourways',
    desc: 'Green, Red, Black, Cyan, Yellow — hand-finished vinyl',
    detail: 'Part of the inaugural Hunthreads collector series. Each figure is hand-finished in one of five colourways. No two are identical. Once they\'re gone, they\'re gone.',
    category: 'Collectible',
    badge: 'COLLECTOR',
    badgeMod: '--cyan',
  },
  {
    src: '/merch/1.jpg',
    title: 'Show Display — Drop 01',
    desc: 'As seen at collector events and toy conventions',
    detail: 'The full display rig as it appeared at toy cons and collector events. Includes the complete lineup as exhibited — a snapshot of Drop 01 in its original form.',
    category: 'Collectible',
  },
  {
    src: '/merch/lab.jpg',
    title: 'LAB313 × Hunthreads',
    desc: '6-figure collab series — limited colourways',
    detail: 'A joint drop with LAB313. Six figures, limited colourways — this collab will not be repeated. Each piece carries both crew marks.',
    category: 'Collectible',
    badge: 'COLLAB',
    badgeMod: '--amber',
  },
  {
    src: '/merch/tote.jpg',
    title: 'Mascot Tote Bag',
    desc: 'Canvas, oversized mascot print, mascot charm',
    detail: 'Heavy canvas construction with an oversized mascot print on the front. Includes a detachable mascot charm. Practical and brand-forward.',
    category: 'Apparel',
    badge: 'NEW',
  },
  {
    src: '/merch/pink shirt.jpg',
    title: 'Mascot Tee — Pink',
    desc: 'Oversized cut, screen-printed mascot graphic',
    detail: 'Dropped-shoulder, oversized fit. Screen-printed mascot graphic front and centre. Heavyweight cotton. Washes well, keeps its shape.',
    category: 'Apparel',
    badge: 'NEW',
  },
  {
    src: '/merch/shirt-cyan.jpg',
    title: 'Mascot Tee — Cyan',
    desc: 'Oversized cut, screen-printed mascot graphic',
    detail: 'Same cut and construction as the Pink edition but in cyan. If you want both, get both — limited run on each.',
    category: 'Apparel',
    badge: 'NEW',
  },
  {
    src: '/merch/socks.jpg',
    title: 'Mascot Socks',
    desc: 'Crew-length, jacquard mascot pattern',
    detail: 'Crew-length with a jacquard-knit mascot pattern across the leg. Ribbed cuff. One size. The kind of detail people notice.',
    category: 'Accessories',
    badge: 'NEW',
  },
]
