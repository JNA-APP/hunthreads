import { redirect } from 'next/navigation'
import { getShopPage } from '@/lib/db'
import { adminDb } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { SubmitButton } from '../components/SubmitButton'

export default async function ShopAdmin({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>
}) {
  const { saved } = await searchParams
  const d = await getShopPage()

  async function save(formData: FormData) {
    'use server'
    await adminDb.from('shop_page').upsert({
      id:          1,
      eyebrow:     formData.get('eyebrow')     as string,
      title:       formData.get('title')       as string,
      sub:         formData.get('sub')         as string,
      footer_note: formData.get('footer_note') as string,
      updated_at:  new Date().toISOString(),
    })
    revalidatePath('/shop')
    redirect('/admin/shop?saved=1')
  }

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">Shop Page</h1>
        <a href="/admin" className="ht-btn ht-btn--ghost ht-btn--sm">← Dashboard</a>
      </div>

      {saved && <div className="ht-banner ht-banner--success">Changes saved.</div>}

      <div className="ht-card">
        <form action={save} className="ht-form">
          <div className="ht-field">
            <label className="ht-label" htmlFor="eyebrow">Eyebrow</label>
            <input id="eyebrow" name="eyebrow" className="ht-input" defaultValue={d.eyebrow ?? ''} />
          </div>
          <div className="ht-field">
            <label className="ht-label" htmlFor="title">Page Title</label>
            <input id="title" name="title" className="ht-input" defaultValue={d.title ?? ''} />
          </div>
          <div className="ht-field">
            <label className="ht-label" htmlFor="sub">Subtitle</label>
            <textarea id="sub" name="sub" className="ht-textarea" rows={3} defaultValue={d.sub ?? ''} />
          </div>
          <div className="ht-field">
            <label className="ht-label" htmlFor="footer_note">Footer Note</label>
            <input id="footer_note" name="footer_note" className="ht-input" defaultValue={d.footer_note ?? ''} />
          </div>
          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </>
  )
}
