import { redirect } from 'next/navigation'
import { adminDb } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export default function NewGalleryPage() {
  async function create(formData: FormData) {
    'use server'
    const label = formData.get('label') as string
    const slug = label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Date.now().toString(36)

    await adminDb.from('gallery').insert({
      slug,
      label,
      category:         formData.get('category')       as string,
      image_src:        formData.get('image_src')       as string,
      placeholder_style: formData.get('placeholder_style') as string,
      display_order:    parseInt(formData.get('display_order') as string) || 99,
    })
    revalidatePath('/admin/gallery')
    revalidatePath('/')
    redirect('/admin/gallery')
  }

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">New Gallery Image</h1>
        <a href="/admin/gallery" className="ht-btn ht-btn--ghost ht-btn--sm">← Gallery</a>
      </div>
      <GalleryForm action={create} />
    </>
  )
}

function GalleryForm({
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
            <label className="ht-label">Label *</label>
            <input name="label" className="ht-input" required
              defaultValue={(defaults?.label ?? '') as string} />
          </div>
          <div className="ht-field">
            <label className="ht-label">Category *</label>
            <select name="category" className="ht-select"
              defaultValue={(defaults?.category ?? 'tattoo') as string}>
              <option value="tattoo">Tattoo</option>
              <option value="barber">Barber</option>
            </select>
          </div>
        </div>
        <div className="ht-field">
          <label className="ht-label">Image Path or URL</label>
          {defaults?.image_src && (
            <img src={defaults.image_src as string} alt="" className="ht-upload-preview" />
          )}
          <input name="image_src" className="ht-input" placeholder="/01-traditional-flash/imageSrc.jpg"
            defaultValue={(defaults?.image_src ?? '') as string} />
        </div>
        <div className="ht-form-row">
          <div className="ht-field">
            <label className="ht-label">Placeholder Style</label>
            <select name="placeholder_style" className="ht-select"
              defaultValue={(defaults?.placeholder_style ?? '') as string}>
              <option value="">Default</option>
              <option value="--cyan">Cyan</option>
              <option value="--dark">Dark</option>
            </select>
          </div>
          <div className="ht-field">
            <label className="ht-label">Display Order</label>
            <input name="display_order" type="number" className="ht-input ht-input--small"
              defaultValue={(defaults?.display_order ?? 99) as number} />
            <span className="ht-hint">Lower = shown first</span>
          </div>
        </div>
        <div>
          <button type="submit" className="ht-btn ht-btn--primary">Save Image</button>
        </div>
      </form>
    </div>
  )
}
