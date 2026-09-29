import { getGallery } from '@/lib/db'
import { DeleteButton } from '../components/DeleteButton'

export default async function GalleryAdmin() {
  const items = await getGallery()

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">Gallery ({items.length})</h1>
        <a href="/admin/gallery/new" className="ht-btn ht-btn--primary ht-btn--sm">+ Add Image</a>
      </div>

      <div className="ht-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="ht-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>Image</th>
              <th>Label</th>
              <th>Category</th>
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
                <td style={{ textTransform: 'capitalize' }}>{item.category}</td>
                <td>{item.order}</td>
                <td>
                  <div className="ht-table__actions">
                    <a href={`/admin/gallery/${item.id}`} className="ht-btn ht-btn--ghost ht-btn--sm">Edit</a>
                    <DeleteGalleryButton id={item.id} />
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

function DeleteGalleryButton({ id }: { id: string }) {
  async function deleteItem() {
    'use server'
    const { adminDb } = await import('@/lib/supabase')
    const { revalidatePath } = await import('next/cache')
    await adminDb.from('gallery').delete().eq('id', id)
    revalidatePath('/admin/gallery')
    revalidatePath('/')
  }
  return (
    <form action={deleteItem}>
      <DeleteButton message="Delete this gallery image? This cannot be undone." />
    </form>
  )
}
