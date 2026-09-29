import { redirect } from 'next/navigation'
import { getAbout } from '@/lib/db'
import { adminDb } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { SubmitButton } from '../components/SubmitButton'

export default async function AboutAdmin({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>
}) {
  const { saved } = await searchParams
  const d = await getAbout()

  async function save(formData: FormData) {
    'use server'
    await adminDb.from('about').upsert({
      id: 1,
      stat1_num:      formData.get('stat1_num')      as string,
      stat1_label:    formData.get('stat1_label')    as string,
      stat2_num:      formData.get('stat2_num')      as string,
      stat2_label:    formData.get('stat2_label')    as string,
      stat3_num:      formData.get('stat3_num')      as string,
      stat3_label:    formData.get('stat3_label')    as string,
      story_p1:       formData.get('story_p1')       as string,
      story_p2:       formData.get('story_p2')       as string,
      value1_heading: formData.get('value1_heading') as string,
      value1_body:    formData.get('value1_body')    as string,
      value2_heading: formData.get('value2_heading') as string,
      value2_body:    formData.get('value2_body')    as string,
      value3_heading: formData.get('value3_heading') as string,
      value3_body:    formData.get('value3_body')    as string,
      updated_at:     new Date().toISOString(),
    })
    revalidatePath('/')
    redirect('/admin/about?saved=1')
  }

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">About Section</h1>
        <a href="/admin" className="ht-btn ht-btn--ghost ht-btn--sm">← Dashboard</a>
      </div>

      {saved && <div className="ht-banner ht-banner--success">Changes saved.</div>}

      <form action={save} className="ht-form">
        <div className="ht-card">
          <p className="ht-card__title">Stats</p>
          <div className="ht-form-row">
            <div className="ht-field">
              <label className="ht-label">Stat 1 — Number</label>
              <input name="stat1_num" className="ht-input" defaultValue={d.stat1_num ?? ''} />
            </div>
            <div className="ht-field">
              <label className="ht-label">Stat 1 — Label</label>
              <input name="stat1_label" className="ht-input" defaultValue={d.stat1_label ?? ''} />
            </div>
          </div>
          <div className="ht-form-row" style={{ marginTop: 12 }}>
            <div className="ht-field">
              <label className="ht-label">Stat 2 — Number</label>
              <input name="stat2_num" className="ht-input" defaultValue={d.stat2_num ?? ''} />
            </div>
            <div className="ht-field">
              <label className="ht-label">Stat 2 — Label</label>
              <input name="stat2_label" className="ht-input" defaultValue={d.stat2_label ?? ''} />
            </div>
          </div>
          <div className="ht-form-row" style={{ marginTop: 12 }}>
            <div className="ht-field">
              <label className="ht-label">Stat 3 — Number</label>
              <input name="stat3_num" className="ht-input" defaultValue={d.stat3_num ?? ''} />
            </div>
            <div className="ht-field">
              <label className="ht-label">Stat 3 — Label</label>
              <input name="stat3_label" className="ht-input" defaultValue={d.stat3_label ?? ''} />
            </div>
          </div>
        </div>

        <div className="ht-card">
          <p className="ht-card__title">Story</p>
          <div className="ht-field">
            <label className="ht-label">Paragraph 1</label>
            <textarea name="story_p1" className="ht-textarea" rows={4} defaultValue={d.story_p1 ?? ''} />
          </div>
          <div className="ht-field" style={{ marginTop: 12 }}>
            <label className="ht-label">Paragraph 2</label>
            <textarea name="story_p2" className="ht-textarea" rows={4} defaultValue={d.story_p2 ?? ''} />
          </div>
        </div>

        <div className="ht-card">
          <p className="ht-card__title">Values</p>
          {[1, 2, 3].map(n => (
            <div key={n} style={{ marginBottom: n < 3 ? 16 : 0 }}>
              <div className="ht-form-row">
                <div className="ht-field">
                  <label className="ht-label">Value {n} — Heading</label>
                  <input name={`value${n}_heading`} className="ht-input"
                    defaultValue={(d as Record<string, unknown>)[`value${n}_heading`] as string ?? ''} />
                </div>
                <div className="ht-field">
                  <label className="ht-label">Value {n} — Body</label>
                  <input name={`value${n}_body`} className="ht-input"
                    defaultValue={(d as Record<string, unknown>)[`value${n}_body`] as string ?? ''} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <SubmitButton />
        </div>
      </form>
    </>
  )
}
