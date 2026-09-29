import './admin.css'
import { createServerSupabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

async function signOut() {
  'use server'
  const supabase = await createServerSupabase()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

export const metadata = { title: 'Admin — Hunthreads' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <div className="ht-admin">{children}</div>
  }

  return (
    <div className="ht-admin ht-admin--auth">
      <aside className="ht-sidebar">
        <div className="ht-sidebar__brand">
          <span className="ht-sidebar__logo">HT</span>
          <span className="ht-sidebar__name">Admin</span>
        </div>

        <nav className="ht-sidebar__nav">
          <p className="ht-sidebar__section">Content</p>
          <a href="/admin" className="ht-sidebar__link">Dashboard</a>
          <a href="/admin/hero" className="ht-sidebar__link">Hero</a>
          <a href="/admin/services" className="ht-sidebar__link">Services</a>
          <a href="/admin/about" className="ht-sidebar__link">About</a>
          <a href="/admin/shop" className="ht-sidebar__link">Shop Page</a>

          <p className="ht-sidebar__section">Collections</p>
          <a href="/admin/products" className="ht-sidebar__link">Products</a>
          <a href="/admin/gallery" className="ht-sidebar__link">Gallery</a>
          <a href="/admin/bts" className="ht-sidebar__link">BTS Photos</a>
        </nav>

        <div className="ht-sidebar__footer">
          <span className="ht-sidebar__user">{user.email}</span>
          <form action={signOut}>
            <button className="ht-sidebar__logout">Sign out</button>
          </form>
        </div>
      </aside>

      <main className="ht-main">{children}</main>
    </div>
  )
}
