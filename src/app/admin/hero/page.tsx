import { redirect } from 'next/navigation'
import { getHero } from '@/lib/db'
import { adminDb } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { ImageUpload } from '../components/ImageUpload'

export default async function HeroAdmin({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>
}) {
  const { saved } = await searchParams
  const hero = await getHero()

  async function save(formData: FormData) {
    'use server'
    await adminDb.from('hero').upsert({
      id:         1,
      eyebrow:    formData.get('eyebrow')    as string,
      tagline:    formData.get('tagline')    as string,
      mascot_src: formData.get('mascot_src') as string,
      updated_at: new Date().toISOString(),
    })
    revalidatePath('/')
    redirect('/admin/hero?saved=1')
  }

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">Hero Section</h1>
        <a href="/admin" className="ht-btn ht-btn--ghost ht-btn--sm">← Dashboard</a>
      </div>

      {saved && (
        <div className="ht-banner ht-banner--success">Changes saved.</div>
      )}

      <div className="ht-card">
        <form action={save} className="ht-form">
          <div className="ht-field">
            <label className="ht-label" htmlFor="eyebrow">Eyebrow Text</label>
            <input id="eyebrow" name="eyebrow" className="ht-input" defaultValue={hero.eyebrow} required />
            <span className="ht-hint">Small text above the tagline e.g. EST. 2024</span>
          </div>
          <div className="ht-field">
            <label className="ht-label" htmlFor="tagline">Tagline</label>
            <input id="tagline" name="tagline" className="ht-input" defaultValue={hero.tagline} required />
            <span className="ht-hint">Use × as the separator e.g. TATTOO × BARBER × MERCH</span>
          </div>
          <div className="ht-field">
            <label className="ht-label">Mascot Image</label>
            <ImageUpload name="mascot_src" defaultValue={hero.mascot_src} />
          </div>
          <div>
            <button type="submit" className="ht-btn ht-btn--primary">Save Changes</button>
          </div>
        </form>
      </div>
    </>
  )
}
