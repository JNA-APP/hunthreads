import { getBts } from '@/lib/db'
import { DeleteButton } from '../components/DeleteButton'

export default async function BtsAdmin() {
  const items = await getBts()

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">BTS Photos ({items.length})</h1>
        <a href="/admin/bts/new" className="ht-btn ht-btn--primary ht-btn--sm">+ Add Photo</a>
      </div>

      <div className="ht-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="ht-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>Image</th>
              <th>Label</th>
              <th style={{ width: 80 }}>Featured</th>
              <th style={{ width: 60 }}>Order</th>
              <th style={{ width: 120 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  {item.imageSrc
                    ? <img src={item.imageSrc} alt={item.label} className="ht-thumb" />
                    : <div className="ht-thumb" />
                  }
                </td>
                <td>{item.label}</td>
                <td>{item.featured ? 'Yes' : '—'}</td>
                <td>{item.order}</td>
                <td>
                  <div className="ht-table__actions">
                    <a href={`/admin/bts/${item.id}`} className="ht-btn ht-btn--ghost ht-btn--sm">Edit</a>
                    <DeleteBtsButton id={item.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function DeleteBtsButton({ id }: { id: string }) {
  async function deleteItem() {
    'use server'
    const { adminDb } = await import('@/lib/supabase')
    const { revalidatePath } = await import('next/cache')
    await adminDb.from('bts').delete().eq('id', id)
    revalidatePath('/admin/bts')
    revalidatePath('/')
  }
  return (
    <form action={deleteItem}>
      <DeleteButton message="Delete this BTS photo? This cannot be undone." />
    </form>
  )
}
