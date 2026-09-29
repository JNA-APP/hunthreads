import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHash } from 'crypto'

function makeToken(password: string) {
  return createHash('sha256')
    .update(password + 'ht-salt')
    .digest('hex')
}

async function login(data: FormData) {
  'use server'
  const password = (data.get('password') as string) ?? ''
  const from     = (data.get('from')     as string) || '/admin'

  const expected  = makeToken(process.env.KEYSTATIC_ADMIN_PASSWORD ?? '')
  const submitted = makeToken(password)

  if (submitted !== expected) {
    const err = new URL('/admin-login', 'http://x')
    err.searchParams.set('from', from)
    err.searchParams.set('error', '1')
    redirect(err.pathname + err.search)
  }

  const jar = await cookies()
  jar.set('ht-admin-auth', expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  redirect(from)
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>
}) {
  const { from = '/admin', error } = await searchParams

  return (
    <html lang="en">
      <head>
        <title>Hunthreads CMS — Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ width: '100%', maxWidth: 380, padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ color: '#2BBECB', fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', margin: '0 0 12px' }}>
              Hunthreads
            </p>
            <h1 style={{ color: '#F5F5F0', fontSize: 22, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>
              CMS Admin
            </h1>
          </div>

          <form action={login}>
            <input type="hidden" name="from" value={from} />

            {error && (
              <p style={{ color: '#E03030', fontSize: 13, textAlign: 'center', marginBottom: 16 }}>
                Wrong password.
              </p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              autoFocus
              required
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: '#1c1c1c',
                border: '1px solid #333',
                color: '#F5F5F0',
                padding: '14px 16px',
                fontSize: 15,
                outline: 'none',
                marginBottom: 12,
              }}
            />

            <button
              type="submit"
              style={{
                width: '100%',
                background: '#2BBECB',
                color: '#fff',
                border: 'none',
                padding: '14px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Enter
            </button>
          </form>
        </div>
      </body>
    </html>
  )
}
