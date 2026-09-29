import { redirect } from 'next/navigation'
import { adminDb } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { ImageUpload } from '../../components/ImageUpload'
import { SubmitButton } from '../../components/SubmitButton'

export default function NewBtsPage() {
  async function create(formData: FormData) {
    'use server'
    const label = formData.get('label') as string
    const slug = label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Date.now().toString(36)

    await adminDb.from('bts').insert({
      slug,
      label,
      image_src:     formData.get('image_src')     as string,
      featured:      formData.get('featured') === 'on',
      display_order: parseInt(formData.get('display_order') as string) || 99,
    })
    revalidatePath('/admin/bts')
    revalidatePath('/')
    redirect('/admin/bts')
  }

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">New BTS Photo</h1>
        <a href="/admin/bts" className="ht-btn ht-btn--ghost ht-btn--sm">← BTS Photos</a>
      </div>
      <BtsForm action={create} />
    </>
  )
}

function BtsForm({
  action,
  defaults,
}: {
  action: (f: FormData) => Promise<void>
  defaults?: Record<string, string | number | boolean>
}) {
  return (
    <div className="ht-card">
      <form action={action} className="ht-form">
        <div className="ht-field">
          <label className="ht-label">Label *</label>
          <input name="label" className="ht-input" required
            defaultValue={(defaults?.label ?? '') as string} />
        </div>
        <div className="ht-field">
          <label className="ht-label">Image</label>
          <ImageUpload name="image_src" defaultValue={(defaults?.image_src ?? '') as string} />
        </div>
        <div className="ht-form-row">
          <div className="ht-field">
            <label className="ht-label">Display Order</label>
            <input name="display_order" type="number" className="ht-input ht-input--small"
              defaultValue={(defaults?.display_order ?? 99) as number} />
            <span className="ht-hint">Lower = shown first</span>
          </div>
          <div className="ht-field" style={{ justifyContent: 'flex-end' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginTop: 'auto', paddingBottom: 10 }}>
              <input type="checkbox" name="featured"
                defaultChecked={(defaults?.featured ?? false) as boolean} />
              <span className="ht-label" style={{ margin: 0 }}>Featured (shown first)</span>
            </label>
          </div>
        </div>
        <div>
          <SubmitButton label="Save Photo" loadingLabel="Saving..." />
        </div>
      </form>
    </div>
  )
}
