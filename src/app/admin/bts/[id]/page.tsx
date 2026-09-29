import { redirect, notFound } from 'next/navigation'
import { adminDb } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { ImageUpload } from '../../components/ImageUpload'

export default async function EditBtsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: item } = await adminDb.from('bts').select('*').eq('id', id).single()
  if (!item) notFound()

  async function update(formData: FormData) {
    'use server'
    await adminDb.from('bts').update({
      label:         formData.get('label')     as string,
      image_src:     formData.get('image_src') as string,
      featured:      formData.get('featured') === 'on',
      display_order: parseInt(formData.get('display_order') as string) || 99,
      updated_at:    new Date().toISOString(),
    }).eq('id', id)
    revalidatePath('/admin/bts')
    revalidatePath('/')
    redirect('/admin/bts')
  }

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">Edit BTS Photo</h1>
        <a href="/admin/bts" className="ht-btn ht-btn--ghost ht-btn--sm">← BTS Photos</a>
      </div>

      <div className="ht-card">
        <form action={update} className="ht-form">
          <div className="ht-field">
            <label className="ht-label">Label *</label>
            <input name="label" className="ht-input" required defaultValue={item.label} />
          </div>
          <div className="ht-field">
            <label className="ht-label">Image</label>
            <ImageUpload name="image_src" defaultValue={item.image_src ?? ''} />
          </div>
          <div className="ht-form-row">
            <div className="ht-field">
              <label className="ht-label">Display Order</label>
              <input name="display_order" type="number" className="ht-input ht-input--small"
                defaultValue={item.display_order ?? 99} />
              <span className="ht-hint">Lower = shown first</span>
            </div>
            <div className="ht-field" style={{ justifyContent: 'flex-end' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginTop: 'auto', paddingBottom: 10 }}>
                <input type="checkbox" name="featured" defaultChecked={item.featured ?? false} />
                <span className="ht-label" style={{ margin: 0 }}>Featured</span>
              </label>
            </div>
          </div>
          <div>
            <button type="submit" className="ht-btn ht-btn--primary">Save Changes</button>
          </div>
        </form>
      </div>
    </>
  )
}
