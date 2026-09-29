import { adminDb } from './supabase'

// ── Singletons ────────────────────────────────────────────────

export async function getHero() {
  const { data } = await adminDb.from('hero').select('*').eq('id', 1).single()
  return data ?? { eyebrow: 'EST. 2024', tagline: 'TATTOO × BARBER × MERCH', mascot_src: '/mascot.png' }
}

export async function getServices() {
  const { data } = await adminDb.from('services').select('*').eq('id', 1).single()
  return data ?? {
    tattoo_title: 'Tattoo', tattoo_desc: '', tattoo_list: [], tattoo_link_label: 'Book Consultation', tattoo_link_href: '#book',
    barber_title: 'Barber', barber_desc: '', barber_list: [], barber_link_label: 'Book Your Chair', barber_link_href: '#book',
    merch_title: 'Merch', merch_desc: '', merch_list: [], merch_link_label: 'Shop Now', merch_link_href: '#merch',
  }
}

export async function getAbout() {
  const { data } = await adminDb.from('about').select('*').eq('id', 1).single()
  return data ?? {
    stat1_num: '500+', stat1_label: 'Tattoos Done',
    stat2_num: '1K+', stat2_label: 'Clients Served',
    stat3_num: '3', stat3_label: 'Disciplines',
    story_p1: 'Hunthreads started as a simple idea — what if the best tattoo studio, the sharpest barber, and the most authentic streetwear brand in Central Luzon were all under one roof?',
    story_p2: "We're not a chain. We're not a franchise. We're a crew of artists and barbers based in Central Luzon who care about the craft.",
    value1_heading: 'No Shortcuts', value1_body: 'Every tattoo is drawn from scratch. Every cut is dialled in.',
    value2_heading: 'Community First', value2_body: "We know our clients by name. That's the point.",
    value3_heading: 'Culture Over Trend', value3_body: "We don't chase hype. We set the standard.",
  }
}

export async function getShopPage() {
  const { data } = await adminDb.from('shop_page').select('*').eq('id', 1).single()
  return data ?? {
    eyebrow: 'The Collection',
    title: 'THE FULL DROP',
    sub: 'Limited runs. No restocks. Everything here ships while it lasts.',
    footer_note: "All pieces are limited. Once sold, they don't come back.",
  }
}

// ── Collections ───────────────────────────────────────────────

export async function getGallery() {
  const { data } = await adminDb.from('gallery').select('*').order('display_order', { ascending: true })
  return (data ?? []).map(r => ({
    id:               r.id as string,
    slug:             r.slug as string,
    label:            r.label as string,
    order:            r.display_order as number,
    category:         r.category as 'tattoo' | 'barber',
    imageSrc:         r.image_src as string,
    placeholderStyle: r.placeholder_style as string,
  }))
}

export async function getBts() {
  const { data } = await adminDb.from('bts').select('*').order('display_order', { ascending: true })
  return (data ?? []).map(r => ({
    id:       r.id as string,
    slug:     r.slug as string,
    label:    r.label as string,
    order:    r.display_order as number,
    imageSrc: r.image_src as string,
    featured: r.featured as boolean,
  }))
}

export async function getProducts() {
  const { data } = await adminDb.from('products').select('*').order('display_order', { ascending: true })
  return (data ?? []).map(r => ({
    id:          r.id as string,
    slug:        r.slug as string,
    title:       r.title as string,
    desc:        r.description as string,
    detail:      r.detail as string,
    category:    r.category as string,
    badge:       r.badge as string,
    badgeMod:    r.badge_mod as string,
    imageSrc:    r.image_src as string,
    order:       r.display_order as number,
  }))
}
