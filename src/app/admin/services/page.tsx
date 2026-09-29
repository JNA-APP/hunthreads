import { redirect } from 'next/navigation'
import { getServices } from '@/lib/db'
import { adminDb } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { SubmitButton } from '../components/SubmitButton'

export default async function ServicesAdmin({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>
}) {
  const { saved } = await searchParams
  const d = await getServices()

  async function save(formData: FormData) {
    'use server'
    const list = (name: string) =>
      (formData.get(name) as string)
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean)

    await adminDb.from('services').upsert({
      id: 1,
      tattoo_title:      formData.get('tattoo_title')      as string,
      tattoo_desc:       formData.get('tattoo_desc')        as string,
      tattoo_list:       list('tattoo_list'),
      tattoo_link_label: formData.get('tattoo_link_label')  as string,
      tattoo_link_href:  formData.get('tattoo_link_href')   as string,
      barber_title:      formData.get('barber_title')       as string,
      barber_desc:       formData.get('barber_desc')        as string,
      barber_list:       list('barber_list'),
      barber_link_label: formData.get('barber_link_label')  as string,
      barber_link_href:  formData.get('barber_link_href')   as string,
      merch_title:       formData.get('merch_title')        as string,
      merch_desc:        formData.get('merch_desc')         as string,
      merch_list:        list('merch_list'),
      merch_link_label:  formData.get('merch_link_label')   as string,
      merch_link_href:   formData.get('merch_link_href')    as string,
      updated_at:        new Date().toISOString(),
    })
    revalidatePath('/')
    redirect('/admin/services?saved=1')
  }

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">Services</h1>
        <a href="/admin" className="ht-btn ht-btn--ghost ht-btn--sm">← Dashboard</a>
      </div>

      {saved && <div className="ht-banner ht-banner--success">Changes saved.</div>}

      <form action={save} className="ht-form">
        {/* Tattoo */}
        <div className="ht-card">
          <p className="ht-card__title">Tattoo Card</p>
          <div className="ht-form" style={{ gap: 16 }}>
            <div className="ht-form-row">
              <div className="ht-field">
                <label className="ht-label">Title</label>
                <input name="tattoo_title" className="ht-input" defaultValue={d.tattoo_title ?? ''} />
              </div>
              <div className="ht-field">
                <label className="ht-label">Button Label</label>
                <input name="tattoo_link_label" className="ht-input" defaultValue={d.tattoo_link_label ?? ''} />
              </div>
            </div>
            <div className="ht-field">
              <label className="ht-label">Description</label>
              <textarea name="tattoo_desc" className="ht-textarea" rows={3} defaultValue={d.tattoo_desc ?? ''} />
            </div>
            <div className="ht-field">
              <label className="ht-label">List Items (one per line)</label>
              <textarea name="tattoo_list" className="ht-textarea" rows={4}
                defaultValue={(d.tattoo_list as string[] ?? []).join('\n')} />
            </div>
            <div className="ht-field">
              <label className="ht-label">Button Link</label>
              <input name="tattoo_link_href" className="ht-input" defaultValue={d.tattoo_link_href ?? ''} />
            </div>
          </div>
        </div>

        {/* Barber */}
        <div className="ht-card">
          <p className="ht-card__title">Barber Card</p>
          <div className="ht-form" style={{ gap: 16 }}>
            <div className="ht-form-row">
              <div className="ht-field">
                <label className="ht-label">Title</label>
                <input name="barber_title" className="ht-input" defaultValue={d.barber_title ?? ''} />
              </div>
              <div className="ht-field">
                <label className="ht-label">Button Label</label>
                <input name="barber_link_label" className="ht-input" defaultValue={d.barber_link_label ?? ''} />
              </div>
            </div>
            <div className="ht-field">
              <label className="ht-label">Description</label>
              <textarea name="barber_desc" className="ht-textarea" rows={3} defaultValue={d.barber_desc ?? ''} />
            </div>
            <div className="ht-field">
              <label className="ht-label">List Items (one per line)</label>
              <textarea name="barber_list" className="ht-textarea" rows={4}
                defaultValue={(d.barber_list as string[] ?? []).join('\n')} />
            </div>
            <div className="ht-field">
              <label className="ht-label">Button Link</label>
              <input name="barber_link_href" className="ht-input" defaultValue={d.barber_link_href ?? ''} />
            </div>
          </div>
        </div>

        {/* Merch */}
        <div className="ht-card">
          <p className="ht-card__title">Merch Card</p>
          <div className="ht-form" style={{ gap: 16 }}>
            <div className="ht-form-row">
              <div className="ht-field">
                <label className="ht-label">Title</label>
                <input name="merch_title" className="ht-input" defaultValue={d.merch_title ?? ''} />
              </div>
              <div className="ht-field">
                <label className="ht-label">Button Label</label>
                <input name="merch_link_label" className="ht-input" defaultValue={d.merch_link_label ?? ''} />
              </div>
            </div>
            <div className="ht-field">
              <label className="ht-label">Description</label>
              <textarea name="merch_desc" className="ht-textarea" rows={3} defaultValue={d.merch_desc ?? ''} />
            </div>
            <div className="ht-field">
              <label className="ht-label">List Items (one per line)</label>
              <textarea name="merch_list" className="ht-textarea" rows={4}
                defaultValue={(d.merch_list as string[] ?? []).join('\n')} />
            </div>
            <div className="ht-field">
              <label className="ht-label">Button Link</label>
              <input name="merch_link_href" className="ht-input" defaultValue={d.merch_link_href ?? ''} />
            </div>
          </div>
        </div>

        <div>
          <SubmitButton label="Save All Changes" />
        </div>
      </form>
    </>
  )
}
