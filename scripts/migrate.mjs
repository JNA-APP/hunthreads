// Migration script — run AFTER creating the Supabase schema
// Usage: SUPABASE_URL=... SUPABASE_KEY=... node scripts/migrate.mjs
// Or: add to .env.local and run with `dotenv -e .env.local -- node scripts/migrate.mjs`

import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const db = createClient(url, key)

// ── Singletons ───────────────────────────────────────────
const hero = {
  id: 1,
  eyebrow: 'EST. 2024',
  tagline: 'TATTOO × BARBER × MERCH',
  mascot_src: '/mascot.png',
}

const services = {
  id: 1,
  tattoo_title: 'Tattoo',
  tattoo_desc: 'Custom tattoo art in Central Luzon — black & grey realism, traditional flash, and cover-ups. Every piece is one of one, drawn for you and built to last.',
  tattoo_list: ['Custom Artwork', 'Black & Grey Realism', 'Traditional & Neo-Trad', 'Cover-ups & Touch-ups'],
  tattoo_link_label: 'Book Consultation',
  tattoo_link_href: '#book',
  barber_title: 'Barber',
  barber_desc: 'Precision fades, shape-ups, skin tapers, beard trims, and hot towel shaves. The best barber experience in Central Luzon — walk out looking sharp.',
  barber_list: ['Skin & Mid Fades', 'Shape-ups & Line-ups', 'Beard Sculpt & Trim', 'Hot Towel Shave'],
  barber_link_label: 'Book Your Chair',
  barber_link_href: '#book',
  merch_title: 'Merch',
  merch_desc: 'Hunthreads drops — collectible designer toys, graphic tees, and more. Limited runs, no restocks. If you sleep, you miss.',
  merch_list: ['Collectible Vinyl Figures', 'Graphic Tees', 'Tote Bags & Accessories', 'Limited Drops Only'],
  merch_link_label: 'Shop Now',
  merch_link_href: '#merch',
}

const about = {
  id: 1,
  stat1_num: '500+', stat1_label: 'Tattoos Done',
  stat2_num: '1K+',  stat2_label: 'Clients Served',
  stat3_num: '3',    stat3_label: 'Disciplines',
  story_p1: 'Hunthreads started as a simple idea — what if the best tattoo studio, the sharpest barber, and the most authentic streetwear brand in Central Luzon were all under one roof?',
  story_p2: "We're not a chain. We're not a franchise. We're a crew of artists and barbers based in Central Luzon who care about the craft. Every client walks out looking and feeling like themselves — just sharper.",
  value1_heading: 'No Shortcuts',    value1_body: 'Every tattoo is drawn from scratch. Every cut is dialled in.',
  value2_heading: 'Community First', value2_body: "We know our clients by name. That's the point.",
  value3_heading: 'Culture Over Trend', value3_body: "We don't chase hype. We set the standard.",
}

const shopPage = {
  id: 1,
  eyebrow: 'The Collection',
  title: 'THE FULL DROP',
  sub: 'Limited runs. No restocks. Everything here ships while it lasts.',
  footer_note: "All pieces are limited. Once sold, they don't come back.",
}

// ── Gallery ──────────────────────────────────────────────
const gallery = [
  { slug: '01-traditional-flash',  label: 'Traditional Flash',  display_order: 1,  category: 'tattoo',  image_src: '/01-traditional-flash/imageSrc.jpg',  placeholder_style: '' },
  { slug: '02-portrait-work',      label: 'Portrait Work',       display_order: 2,  category: 'tattoo',  image_src: '/02-portrait-work/imageSrc.jpg',       placeholder_style: '' },
  { slug: '03-custom-ink',         label: 'Custom Ink',          display_order: 3,  category: 'tattoo',  image_src: '/03-custom-ink/imageSrc.jpg',          placeholder_style: '' },
  { slug: '04-black-grey',         label: 'Black & Grey',        display_order: 4,  category: 'tattoo',  image_src: '/04-black-grey/imageSrc.jpg',          placeholder_style: '' },
  { slug: '05-fist-tattoo',        label: 'Fist Tattoo',         display_order: 5,  category: 'tattoo',  image_src: '/05-fist-tattoo/imageSrc.jpg',         placeholder_style: '' },
  { slug: '06-traditional-gun',    label: 'Traditional Gun',     display_order: 6,  category: 'tattoo',  image_src: '/06-traditional-gun/imageSrc.jpg',     placeholder_style: '' },
  { slug: '07-studio-session',     label: 'Studio Session',      display_order: 7,  category: 'tattoo',  image_src: '/07-studio-session/imageSrc.jpg',      placeholder_style: '' },
  { slug: '08-skin-fade',          label: 'Scissor Work',        display_order: 8,  category: 'barber',  image_src: '/08-skin-fade/imageSrc.jpg',           placeholder_style: '--cyan' },
  { slug: '09-lineup-shape',       label: 'Fade & Beard',        display_order: 9,  category: 'barber',  image_src: '/09-lineup-shape/imageSrc.jpg',        placeholder_style: '--dark' },
  { slug: '10-galleon-rose',       label: 'Galleon Rose',        display_order: 10, category: 'tattoo',  image_src: '/10-galleon-rose/imageSrc.jpeg',       placeholder_style: '' },
  { slug: '11-mandala',            label: 'Mandala',             display_order: 11, category: 'tattoo',  image_src: '/11-mandala/imageSrc.jpeg',            placeholder_style: '' },
  { slug: '12-memento',            label: 'Memento',             display_order: 12, category: 'tattoo',  image_src: '/12-memento/imageSrc.jpeg',            placeholder_style: '' },
  { slug: '13-roman',              label: 'Roman',               display_order: 13, category: 'tattoo',  image_src: '/13-roman/imageSrc.jpeg',              placeholder_style: '' },
  { slug: '14-rose-dagger',        label: 'Rose & Dagger',       display_order: 14, category: 'tattoo',  image_src: '/14-rose-dagger/imageSrc.jpeg',        placeholder_style: '' },
  { slug: '15-skull-bat',          label: 'Skull & Bat',         display_order: 15, category: 'tattoo',  image_src: '/15-skull-bat/imageSrc.jpeg',          placeholder_style: '' },
  { slug: '16-traditional-owl',    label: 'Traditional Owl',     display_order: 16, category: 'tattoo',  image_src: '/16-traditional-owl/imageSrc.jpeg',    placeholder_style: '' },
  { slug: '17-taper-cut',          label: 'Slick Back',          display_order: 17, category: 'barber',  image_src: '/17-taper-cut/imageSrc.jpg',           placeholder_style: '' },
  { slug: '18-beard-trim',         label: 'Shop Session',        display_order: 18, category: 'barber',  image_src: '/18-beard-trim/imageSrc.jpg',          placeholder_style: '' },
  { slug: '19-tattoo-flash',       label: 'Gypsy & Dagger',      display_order: 19, category: 'tattoo',  image_src: '/19-tattoo-flash/imageSrc.jpg',        placeholder_style: '' },
  { slug: '20-tattoo-portrait',    label: 'Kanji Script',        display_order: 20, category: 'tattoo',  image_src: '/20-tattoo-portrait/imageSrc.jpg',     placeholder_style: '' },
  { slug: '21-tattoo-custom',      label: 'Serpent & Peony',     display_order: 21, category: 'tattoo',  image_src: '/21-tattoo-custom/imageSrc.jpg',       placeholder_style: '' },
]

// ── BTS ──────────────────────────────────────────────────
const bts = [
  { slug: '02-barber-session',   label: 'Barber Session',        display_order: 2,  image_src: '/02-barber-session/imageSrc.jpg',   featured: false },
  { slug: '03-toy-con-booth',    label: 'Toy Con Booth',         display_order: 3,  image_src: '/03-toy-con-booth/imageSrc.jpg',    featured: false },
  { slug: '04-at-the-show',      label: 'At The Show',           display_order: 4,  image_src: '/04-at-the-show/imageSrc.jpg',      featured: false },
  { slug: '05-in-the-shop',      label: 'In The Shop',           display_order: 5,  image_src: '/05-in-the-shop/imageSrc.jpg',      featured: false },
  { slug: '06-studio-shelves',   label: 'Studio Shelves',        display_order: 6,  image_src: '/06-studio-shelves/imageSrc.jpg',   featured: false },
  { slug: '07-gallery-display',  label: 'Gallery Display',       display_order: 7,  image_src: '/07-gallery-display/imageSrc.jpg',  featured: false },
  { slug: '08-bts',              label: 'Behind The Scenes 8',   display_order: 8,  image_src: '/08-bts/imageSrc.jpeg',             featured: false },
  { slug: '09-bts',              label: 'Behind The Scenes 9',   display_order: 9,  image_src: '/09-bts/imageSrc.jpeg',             featured: false },
  { slug: '10-bts',              label: 'Behind The Scenes 10',  display_order: 10, image_src: '/10-bts/imageSrc.jpeg',             featured: false },
  { slug: '11-bts',              label: 'Behind The Scenes 11',  display_order: 11, image_src: '/11-bts/imageSrc.jpeg',             featured: false },
  { slug: '12-bts',              label: 'Behind The Scenes 12',  display_order: 12, image_src: '/12-bts/imageSrc.jpeg',             featured: false },
  { slug: '13-bts',              label: 'Behind The Scenes 13',  display_order: 13, image_src: '/13-bts/imageSrc.jpeg',             featured: false },
  { slug: '14-bts',              label: 'Behind The Scenes 14',  display_order: 14, image_src: '/14-bts/imageSrc.jpeg',             featured: false },
  { slug: '15-bts',              label: 'Behind The Scenes 15',  display_order: 15, image_src: '/15-bts/imageSrc.jpeg',             featured: false },
  { slug: '16-bts',              label: 'Behind The Scenes 16',  display_order: 16, image_src: '/16-bts/imageSrc.jpeg',             featured: false },
  { slug: '17-bts',              label: 'Behind The Scenes 17',  display_order: 17, image_src: '/17-bts/imageSrc.jpeg',             featured: false },
  { slug: '18-bts',              label: 'Behind The Scenes 18',  display_order: 18, image_src: '/18-bts/imageSrc.jpeg',             featured: false },
  { slug: '19-bts',              label: 'Behind The Scenes 19',  display_order: 19, image_src: '/19-bts/imageSrc.jpeg',             featured: false },
  { slug: '20-bts',              label: 'Behind The Scenes 20',  display_order: 20, image_src: '/20-bts/imageSrc.jpeg',             featured: false },
  { slug: '21-bts',              label: 'Behind The Scenes 21',  display_order: 21, image_src: '/21-bts/imageSrc.jpeg',             featured: false },
  { slug: '22-bts',              label: 'Behind The Scenes 22',  display_order: 22, image_src: '/22-bts/imageSrc.jpg',              featured: false },
  { slug: '23-bts',              label: 'Behind The Scenes 23',  display_order: 23, image_src: '/23-bts/imageSrc.jpg',              featured: false },
  { slug: '24-bts',              label: 'Behind The Scenes 24',  display_order: 24, image_src: '/24-bts/imageSrc.jpg',              featured: false },
  { slug: '25-bts',              label: 'Behind The Scenes 25',  display_order: 25, image_src: '/25-bts/imageSrc.jpg',              featured: false },
  { slug: '26-bts',              label: 'Behind The Scenes 26',  display_order: 26, image_src: '/26-bts/imageSrc.jpg',              featured: false },
  { slug: '27-bts',              label: 'Behind The Scenes 27',  display_order: 27, image_src: '/27-bts/imageSrc.jpg',              featured: false },
  { slug: 'ez-mil',              label: 'Ez Mil',                display_order: 99, image_src: '/ez-mil/imageSrc.jpg',              featured: true  },
]

// ── Products ──────────────────────────────────────────────
const products = [
  { slug: '01-mascot-series',         title: 'Mascot Series — 5 Colourways', description: 'Green, Red, Black, Cyan, Yellow — hand-finished vinyl',    detail: 'Part of the inaugural Hunthreads collector series. Each figure is hand-finished in one of five colourways. No two are identical. Once they\'re gone, they\'re gone.', category: 'Collectible',   badge: 'COLLECTOR', badge_mod: '--cyan',  image_src: '/01-mascot-series/imageSrc.jpg',        display_order: 1  },
  { slug: '02-show-display',           title: 'Show Display — Drop 01',        description: 'As seen at collector events and toy conventions',           detail: 'The full display rig as it appeared at toy cons and collector events. Includes the complete lineup as exhibited — a snapshot of Drop 01 in its original form.', category: 'Collectible',   badge: '',          badge_mod: '',        image_src: '/02-show-display/imageSrc.jpg',          display_order: 2  },
  { slug: '03-lab313',                 title: 'LAB313 × Hunthreads',           description: '6-figure collab series — limited colourways',              detail: 'A joint drop with LAB313. Six figures, limited colourways — this collab will not be repeated. Each piece carries both crew marks.',               category: 'Collectible',   badge: 'COLLAB',    badge_mod: '--amber', image_src: '/03-lab313/imageSrc.jpg',                display_order: 3  },
  { slug: '04-mascot-tote-bag',        title: 'Mascot Tote Bag',               description: 'Canvas, oversized mascot print, mascot charm',             detail: 'Heavy canvas construction with an oversized mascot print on the front. Includes a detachable mascot charm. Practical and brand-forward.',                category: 'Apparel',       badge: 'NEW',       badge_mod: '',        image_src: '/04-mascot-tote-bag/imageSrc.jpg',       display_order: 4  },
  { slug: '05-mascot-tee-pink',        title: 'Mascot Tee — Pink',             description: 'Oversized cut, screen-printed mascot graphic',             detail: 'Dropped-shoulder, oversized fit. Screen-printed mascot graphic front and centre. Heavyweight cotton. Washes well, keeps its shape.',                 category: 'Apparel',       badge: 'NEW',       badge_mod: '',        image_src: '/05-mascot-tee-pink/imageSrc.jpg',       display_order: 5  },
  { slug: '06-mascot-tee-cyan',        title: 'Mascot Tee — Cyan',             description: 'Oversized cut, screen-printed mascot graphic',             detail: 'Same cut and construction as the Pink edition but in cyan. If you want both, get both — limited run on each.',                                          category: 'Apparel',       badge: 'NEW',       badge_mod: '',        image_src: '/06-mascot-tee-cyan/imageSrc.jpg',       display_order: 6  },
  { slug: '07-mascot-socks',           title: 'Mascot Socks',                  description: 'Crew-length, jacquard mascot pattern',                     detail: 'Crew-length with a jacquard-knit mascot pattern across the leg. Ribbed cuff. One size. The kind of detail people notice.',                              category: 'Accessories',   badge: 'NEW',       badge_mod: '',        image_src: '/07-mascot-socks/imageSrc.jpg',          display_order: 7  },
  { slug: '08-logo-shirt',             title: 'Logo Shirt',                    description: '',                                                         detail: '',                                                                                                                                                          category: 'Apparel',       badge: '',          badge_mod: '',        image_src: '/08-logo-shirt/imageSrc.jpeg',           display_order: 8  },
  { slug: '09-logo-shirt-black-white', title: 'Logo Shirt Black & White',      description: '',                                                         detail: '',                                                                                                                                                          category: 'Apparel',       badge: '',          badge_mod: '',        image_src: '/09-logo-shirt-black-white/imageSrc.jpeg', display_order: 9  },
  { slug: '10-shirt-car',              title: 'Car Shirt',                     description: '',                                                         detail: '',                                                                                                                                                          category: 'Apparel',       badge: '',          badge_mod: '',        image_src: '/10-shirt-car/imageSrc.jpeg',            display_order: 10 },
  { slug: '11-white-shirt',            title: 'White Shirt',                   description: '',                                                         detail: '',                                                                                                                                                          category: 'Apparel',       badge: '',          badge_mod: '',        image_src: '/11-white-shirt/imageSrc.jpeg',          display_order: 11 },
  { slug: '12-print-01',               title: 'Digital Print 01',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/12-print-01/imageSrc.jpeg',             display_order: 12 },
  { slug: '13-print-02',               title: 'Digital Print 02',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/13-print-02/imageSrc.jpeg',             display_order: 13 },
  { slug: '14-print-03',               title: 'Digital Print 03',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/14-print-03/imageSrc.jpeg',             display_order: 14 },
  { slug: '15-print-04',               title: 'Digital Print 04',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/15-print-04/imageSrc.jpeg',             display_order: 15 },
  { slug: '16-print-05',               title: 'Digital Print 05',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/16-print-05/imageSrc.jpeg',             display_order: 16 },
  { slug: '17-print-06',               title: 'Digital Print 06',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/17-print-06/imageSrc.jpeg',             display_order: 17 },
  { slug: '18-print-07',               title: 'Digital Print 07',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/18-print-07/imageSrc.jpeg',             display_order: 18 },
  { slug: '19-print-08',               title: 'Digital Print 08',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/19-print-08/imageSrc.jpeg',             display_order: 19 },
  { slug: '20-print-09',               title: 'Digital Print 09',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/20-print-09/imageSrc.jpeg',             display_order: 20 },
  { slug: '21-print-10',               title: 'Digital Print 10',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/21-print-10/imageSrc.jpeg',             display_order: 21 },
  { slug: '22-print-11',               title: 'Digital Print 11',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/22-print-11/imageSrc.jpeg',             display_order: 22 },
  { slug: '23-print-12',               title: 'Digital Print 12',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/23-print-12/imageSrc.jpeg',             display_order: 23 },
  { slug: '24-print-13',               title: 'Digital Print 13',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/24-print-13/imageSrc.jpeg',             display_order: 24 },
  { slug: '25-print-14',               title: 'Digital Print 14',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/25-print-14/imageSrc.jpeg',             display_order: 25 },
  { slug: '26-print-15',               title: 'Digital Print 15',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/26-print-15/imageSrc.jpeg',             display_order: 26 },
  { slug: '27-print-16',               title: 'Digital Print 16',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/27-print-16/imageSrc.jpeg',             display_order: 27 },
  { slug: '28-print-17',               title: 'Digital Print 17',              description: '',                                                         detail: '',                                                                                                                                                          category: 'Digital Print', badge: '',          badge_mod: '',        image_src: '/28-print-17/imageSrc.jpeg',             display_order: 28 },
]

// ── Run ───────────────────────────────────────────────────
async function run() {
  console.log('Migrating to Supabase...')

  const checks = await Promise.all([
    db.from('hero').select('id').single(),
    db.from('services').select('id').single(),
  ])

  if (checks[0].data) {
    console.log('Hero row already exists — skipping singletons. Use upsert flag to overwrite.')
  } else {
    const r1 = await db.from('hero').insert(hero)
    const r2 = await db.from('services').insert(services)
    const r3 = await db.from('about').insert(about)
    const r4 = await db.from('shop_page').insert(shopPage)
    if (r1.error) console.error('hero:', r1.error.message)
    if (r2.error) console.error('services:', r2.error.message)
    if (r3.error) console.error('about:', r3.error.message)
    if (r4.error) console.error('shop_page:', r4.error.message)
    console.log('Singletons done.')
  }

  const { error: ge } = await db.from('gallery').upsert(gallery, { onConflict: 'slug' })
  if (ge) console.error('gallery:', ge.message)
  else console.log(`Gallery: ${gallery.length} items.`)

  const { error: be } = await db.from('bts').upsert(bts, { onConflict: 'slug' })
  if (be) console.error('bts:', be.message)
  else console.log(`BTS: ${bts.length} items.`)

  const { error: pe } = await db.from('products').upsert(products, { onConflict: 'slug' })
  if (pe) console.error('products:', pe.message)
  else console.log(`Products: ${products.length} items.`)

  console.log('Done.')
}

run().catch(console.error)
