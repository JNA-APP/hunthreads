import { getProducts } from '@/lib/db'
import { DeleteButton } from '../components/DeleteButton'

export default async function ProductsAdmin() {
  const products = await getProducts()

  return (
    <>
      <div className="ht-page-header">
        <h1 className="ht-page-title">Products ({products.length})</h1>
        <a href="/admin/products/new" className="ht-btn ht-btn--primary ht-btn--sm">+ Add Product</a>
      </div>

      <div className="ht-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="ht-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th style={{ width: 60 }}>Order</th>
              <th style={{ width: 120 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>
                  {p.imageSrc
                    ? <img src={p.imageSrc} alt={p.title} className="ht-thumb" />
                    : <div className="ht-thumb" />
                  }
                </td>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>{p.order}</td>
                <td>
                  <div className="ht-table__actions">
                    <a href={`/admin/products/${p.id}`} className="ht-btn ht-btn--ghost ht-btn--sm">Edit</a>
                    <DeleteProductButton id={p.id} />
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

function DeleteProductButton({ id }: { id: string }) {
  async function deleteProduct() {
    'use server'
    const { adminDb } = await import('@/lib/supabase')
    const { revalidatePath } = await import('next/cache')
    await adminDb.from('products').delete().eq('id', id)
    revalidatePath('/admin/products')
    revalidatePath('/shop')
    revalidatePath('/')
  }
  return (
    <form action={deleteProduct}>
      <DeleteButton message="Delete this product? This cannot be undone." />
    </form>
  )
}
