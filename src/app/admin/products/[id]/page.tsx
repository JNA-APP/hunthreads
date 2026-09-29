import { redirect, notFound } from 'next/navigation'
import { adminDb } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { ImageUpload } from '../../components/ImageUpload'
import { SubmitButton } from '../../components/SubmitButton'

const CATEGORIES = ['Collectible', 'Apparel', 'Accessories', 'Digital Print']
const BADGES = ['', 'NEW', 'COLLECTOR', 'COLLAB', 'SOLD OUT']
const BADGE_MODS = ['', '--cyan', '--amber', '--red']

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: p } = await adminDb.from('products').select('*').eq('id', id).single()
  if (!p) notFound()

  async function update(formData: FormData) {
    'use server'
    await adminDb.from('products').update({
      title:         formData.get('title')        as string,
      description:   formData.get('description')  as string,
      detail:        formData.get('detail')        as string,
      category:      formData.get('category')      as string,
      badge:         formData.get('badge')         as string,
      badge_mod:     formData.get('badge_mod')     as string,
      image_src:     formData.get('image_src')     as string,
      display_order: parseInt(formData.get('display_order') as string) || 99,
      updated_at:    new Date().toISOString(),
    }).eq('id', id)
    revalidatePath('/admin/products')
    revalidatePath('/shop')
    revalidatePath('/')
    redirect('/admin/products')
  }

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">Edit Product</h1>
        <a href="/admin/products" className="ht-btn ht-btn--ghost ht-btn--sm">← Products</a>
      </div>

      <div className="ht-card">
        <form action={update} className="ht-form">
          <div className="ht-form-row">
            <div className="ht-field">
              <label className="ht-label">Title *</label>
              <input name="title" className="ht-input" required defaultValue={p.title} />
            </div>
            <div className="ht-field">
              <label className="ht-label">Category *</label>
              <select name="category" className="ht-select" defaultValue={p.category}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="ht-field">
            <label className="ht-label">Short Description</label>
            <input name="description" className="ht-input" defaultValue={p.description ?? ''} />
          </div>
          <div className="ht-field">
            <label className="ht-label">Detail (long text)</label>
            <textarea name="detail" className="ht-textarea" rows={4} defaultValue={p.detail ?? ''} />
          </div>
          <div className="ht-form-row">
            <div className="ht-field">
              <label className="ht-label">Badge Text</label>
              <select name="badge" className="ht-select" defaultValue={p.badge ?? ''}>
                {BADGES.map(b => <option key={b} value={b}>{b || '(none)'}</option>)}
              </select>
            </div>
            <div className="ht-field">
              <label className="ht-label">Badge Colour</label>
              <select name="badge_mod" className="ht-select" defaultValue={p.badge_mod ?? ''}>
                {BADGE_MODS.map(m => <option key={m} value={m}>{m || 'Default'}</option>)}
              </select>
            </div>
          </div>
          <div className="ht-form-row">
            <div className="ht-field">
              <label className="ht-label">Image</label>
              <ImageUpload name="image_src" defaultValue={p.image_src ?? ''} />
            </div>
            <div className="ht-field">
              <label className="ht-label">Display Order</label>
              <input name="display_order" type="number" className="ht-input ht-input--small"
                defaultValue={p.display_order ?? 99} />
              <span className="ht-hint">Lower = shown first</span>
            </div>
          </div>
          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </>
  )
}
