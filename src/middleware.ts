import { NextRequest, NextResponse } from 'next/server'

const COOKIE = 'ht-admin-auth'

async function expectedToken(): Promise<string> {
  const pass = process.env.KEYSTATIC_ADMIN_PASSWORD ?? ''
  const data = new TextEncoder().encode(pass + 'ht-salt')
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value
  if (token && token === await expectedToken()) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = '/admin-login'
  url.searchParams.set('from', req.nextUrl.pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*'],
}
