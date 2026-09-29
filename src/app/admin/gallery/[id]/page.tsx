import { redirect, notFound } from 'next/navigation'
import { adminDb } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: item } = await adminDb.from('gallery').select('*').eq('id', id).single()
  if (!item) notFound()

  async function update(formData: FormData) {
    'use server'
    await adminDb.from('gallery').update({
      label:             formData.get('label')             as string,
      category:          formData.get('category')          as string,
      image_src:         formData.get('image_src')         as string,
      placeholder_style: formData.get('placeholder_style') as string,
      display_order:     parseInt(formData.get('display_order') as string) || 99,
      updated_at:        new Date().toISOString(),
    }).eq('id', id)
    revalidatePath('/admin/gallery')
    revalidatePath('/')
    redirect('/admin/gallery')
  }

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">Edit Gallery Image</h1>
        <a href="/admin/gallery" className="ht-btn ht-btn--ghost ht-btn--sm">← Gallery</a>
      </div>

      <div className="ht-card">
        <form action={update} className="ht-form">
          <div className="ht-form-row">
            <div className="ht-field">
              <label className="ht-label">Label *</label>
              <input name="label" className="ht-input" required defaultValue={item.label} />
            </div>
            <div className="ht-field">
              <label className="ht-label">Category *</label>
              <select name="category" className="ht-select" defaultValue={item.category}>
                <option value="tattoo">Tattoo</option>
                <option value="barber">Barber</option>
              </select>
            </div>
          </div>
          <div className="ht-field">
            <label className="ht-label">Image Path or URL</label>
            {item.image_src && (
              <img src={item.image_src} alt={item.label} className="ht-upload-preview" />
            )}
            <input name="image_src" className="ht-input" defaultValue={item.image_src ?? ''} />
          </div>
          <div className="ht-form-row">
            <div className="ht-field">
              <label className="ht-label">Placeholder Style</label>
              <select name="placeholder_style" className="ht-select" defaultValue={item.placeholder_style ?? ''}>
                <option value="">Default</option>
                <option value="--cyan">Cyan</option>
                <option value="--dark">Dark</option>
              </select>
            </div>
            <div className="ht-field">
              <label className="ht-label">Display Order</label>
              <input name="display_order" type="number" className="ht-input ht-input--small"
                defaultValue={item.display_order ?? 99} />
              <span className="ht-hint">Lower = shown first</span>
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
