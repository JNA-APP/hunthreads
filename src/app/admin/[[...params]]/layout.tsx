import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function logout() {
  'use server'
  const jar = await cookies()
  jar.delete('ht-admin-auth')
  redirect('/admin-login')
}

export const metadata = { title: 'Hunthreads CMS' }

export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <form action={logout} style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        <button
          type="submit"
          style={{
            background: '#1c1c1c',
            color: '#888',
            border: '1px solid #333',
            padding: '8px 14px',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Log out
        </button>
      </form>
    </>
  )
}
