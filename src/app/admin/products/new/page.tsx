import { redirect } from 'next/navigation'
import { adminDb } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

import { ImageUpload } from '../../components/ImageUpload'
import { SubmitButton } from '../../components/SubmitButton'

const CATEGORIES = ['Collectible', 'Apparel', 'Accessories', 'Digital Print']
const BADGES = ['', 'NEW', 'COLLECTOR', 'COLLAB', 'SOLD OUT']
const BADGE_MODS = ['', '--cyan', '--amber', '--red']

export default function NewProductPage() {
  async function create(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Date.now().toString(36)

    await adminDb.from('products').insert({
      slug,
      title,
      description:   formData.get('description')   as string,
      detail:        formData.get('detail')         as string,
      category:      formData.get('category')       as string,
      badge:         formData.get('badge')          as string,
      badge_mod:     formData.get('badge_mod')      as string,
      image_src:     formData.get('image_src')      as string,
      display_order: parseInt(formData.get('display_order') as string) || 99,
    })
    revalidatePath('/admin/products')
    revalidatePath('/shop')
    revalidatePath('/')
    redirect('/admin/products')
  }

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">New Product</h1>
        <a href="/admin/products" className="ht-btn ht-btn--ghost ht-btn--sm">← Products</a>
      </div>
      <ProductForm action={create} />
    </>
  )
}

function ProductForm({
  action,
  defaults,
}: {
  action: (f: FormData) => Promise<void>
  defaults?: Record<string, string | number>
}) {
  return (
    <div className="ht-card">
      <form action={action} className="ht-form">
        <div className="ht-form-row">
          <div className="ht-field">
            <label className="ht-label">Title *</label>
            <input name="title" className="ht-input" required defaultValue={(defaults?.title ?? '') as string} />
          </div>
          <div className="ht-field">
            <label className="ht-label">Category *</label>
            <select name="category" className="ht-select" defaultValue={(defaults?.category ?? '') as string}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="ht-field">
          <label className="ht-label">Short Description</label>
          <input name="description" className="ht-input" defaultValue={(defaults?.description ?? '') as string} />
        </div>
        <div className="ht-field">
          <label className="ht-label">Detail (long text)</label>
          <textarea name="detail" className="ht-textarea" rows={4} defaultValue={(defaults?.detail ?? '') as string} />
        </div>
        <div className="ht-form-row">
          <div className="ht-field">
            <label className="ht-label">Badge Text</label>
            <select name="badge" className="ht-select" defaultValue={(defaults?.badge ?? '') as string}>
              {BADGES.map(b => <option key={b} value={b}>{b || '(none)'}</option>)}
            </select>
          </div>
          <div className="ht-field">
            <label className="ht-label">Badge Colour</label>
            <select name="badge_mod" className="ht-select" defaultValue={(defaults?.badge_mod ?? '') as string}>
              {BADGE_MODS.map(m => <option key={m} value={m}>{m || 'Default'}</option>)}
            </select>
          </div>
        </div>
        <div className="ht-form-row">
          <div className="ht-field">
            <label className="ht-label">Image</label>
            <ImageUpload name="image_src" defaultValue={(defaults?.image_src ?? '') as string} />
          </div>
          <div className="ht-field">
            <label className="ht-label">Display Order</label>
            <input name="display_order" type="number" className="ht-input ht-input--small"
              defaultValue={(defaults?.display_order ?? 99) as number} />
            <span className="ht-hint">Lower = shown first</span>
          </div>
        </div>
        <div>
          <SubmitButton label="Save Product" loadingLabel="Saving..." />
        </div>
      </form>
    </div>
  )
}
