import { config, fields, collection, singleton } from '@keystatic/core'

const isDev = process.env.NODE_ENV === 'development'

export default config({
  storage: isDev
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          owner: 'JNA-APP',
          name: 'hunthreads',
        },
      },
  ui: {
    brand: { name: 'Hunthreads CMS' },
  },

  singletons: {
    hero: singleton({
      label: 'Hero',
      path: 'src/content/hero',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Eyebrow' }),
        title: fields.text({ label: 'Main Title' }),
        tagline: fields.text({ label: 'Tagline (use × as separator)' }),
        sub: fields.text({ label: 'Sub Text', multiline: true }),
        primaryBtnLabel: fields.text({ label: 'Primary Button — Label' }),
        primaryBtnHref: fields.text({ label: 'Primary Button — Link' }),
        ghostBtnLabel: fields.text({ label: 'Ghost Button — Label' }),
        ghostBtnHref: fields.text({ label: 'Ghost Button — Link' }),
        mascotSrc: fields.image({ label: 'Mascot Image', directory: 'public', publicPath: '/' }),
      },
    }),

    shopPage: singleton({
      label: 'Shop Page',
      path: 'src/content/shop-page',
      format: { data: 'json' },
      schema: {
        eyebrow:     fields.text({ label: 'Eyebrow Label' }),
        title:       fields.text({ label: 'Page Title' }),
        sub:         fields.text({ label: 'Subtitle', multiline: true }),
        footerNote:  fields.text({ label: 'Footer Note' }),
      },
    }),

    services: singleton({
      label: 'Services',
      path: 'src/content/services',
      format: { data: 'json' },
      schema: {
        tattooTitle:     fields.text({ label: 'Tattoo — Title' }),
        tattooDesc:      fields.text({ label: 'Tattoo — Description', multiline: true }),
        tattooList:      fields.array(fields.text({ label: 'Item' }), { label: 'Tattoo — List Items' }),
        tattooLinkLabel: fields.text({ label: 'Tattoo — Link Text' }),
        tattooLinkHref:  fields.text({ label: 'Tattoo — Link Href' }),

        barberTitle:     fields.text({ label: 'Barber — Title' }),
        barberDesc:      fields.text({ label: 'Barber — Description', multiline: true }),
        barberList:      fields.array(fields.text({ label: 'Item' }), { label: 'Barber — List Items' }),
        barberLinkLabel: fields.text({ label: 'Barber — Link Text' }),
        barberLinkHref:  fields.text({ label: 'Barber — Link Href' }),

        merchTitle:     fields.text({ label: 'Merch — Title' }),
        merchDesc:      fields.text({ label: 'Merch — Description', multiline: true }),
        merchList:      fields.array(fields.text({ label: 'Item' }), { label: 'Merch — List Items' }),
        merchLinkLabel: fields.text({ label: 'Merch — Link Text' }),
        merchLinkHref:  fields.text({ label: 'Merch — Link Href' }),
      },
    }),

    about: singleton({
      label: 'About',
      path: 'src/content/about',
      format: { data: 'json' },
      schema: {
        stat1Num:      fields.text({ label: 'Stat 1 — Number (e.g. 500+)' }),
        stat1Label:    fields.text({ label: 'Stat 1 — Label' }),
        stat2Num:      fields.text({ label: 'Stat 2 — Number' }),
        stat2Label:    fields.text({ label: 'Stat 2 — Label' }),
        stat3Num:      fields.text({ label: 'Stat 3 — Number' }),
        stat3Label:    fields.text({ label: 'Stat 3 — Label' }),
        storyP1:       fields.text({ label: 'Story — Paragraph 1', multiline: true }),
        storyP2:       fields.text({ label: 'Story — Paragraph 2', multiline: true }),
        value1Heading: fields.text({ label: 'Value 1 — Heading' }),
        value1Body:    fields.text({ label: 'Value 1 — Body' }),
        value2Heading: fields.text({ label: 'Value 2 — Heading' }),
        value2Body:    fields.text({ label: 'Value 2 — Body' }),
        value3Heading: fields.text({ label: 'Value 3 — Heading' }),
        value3Body:    fields.text({ label: 'Value 3 — Body' }),
      },
    }),
  },

  collections: {
    products: collection({
      label: 'Products',
      path: 'src/content/products/*',
      format: { data: 'json' },
      slugField: 'title',
      columns: ['category'],
      schema: {
        title:    fields.slug({ name: { label: 'Title' } }),
        desc:     fields.text({ label: 'Short Description', multiline: true }),
        detail:   fields.text({ label: 'Full Detail', multiline: true }),
        category: fields.text({ label: 'Category (Collectible / Apparel / Accessories)' }),
        badge:    fields.text({ label: 'Badge Label (leave blank for none)' }),
        badgeMod: fields.text({ label: 'Badge Colour (--cyan / --amber, blank = default)' }),
        imageSrc: fields.image({ label: 'Product Image', directory: 'public', publicPath: '/' }),
      },
    }),

    gallery: collection({
      label: 'Portfolio Gallery',
      path: 'src/content/gallery/*',
      format: { data: 'json' },
      slugField: 'label',
      columns: ['category'],
      schema: {
        label:            fields.slug({ name: { label: 'Label' } }),
        order:            fields.integer({ label: 'Display Order (lower = first)', defaultValue: 99 }),
        category:         fields.select({
          label: 'Category',
          options: [
            { label: 'Tattoo', value: 'tattoo' },
            { label: 'Barber', value: 'barber' },
          ],
          defaultValue: 'tattoo',
        }),
        imageSrc:         fields.image({ label: 'Gallery Image', directory: 'public', publicPath: '/' }),
        placeholderStyle: fields.text({ label: 'Placeholder Style (--cyan or --dark, only if no image)' }),
      },
    }),

    bts: collection({
      label: 'Behind the Scenes',
      path: 'src/content/bts/*',
      format: { data: 'json' },
      slugField: 'label',
      columns: ['featured'],
      schema: {
        label:    fields.slug({ name: { label: 'Label' } }),
        order:    fields.integer({ label: 'Display Order (lower = first)', defaultValue: 99 }),
        imageSrc: fields.image({ label: 'Photo', directory: 'public', publicPath: '/' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
      },
    }),
  },
})
