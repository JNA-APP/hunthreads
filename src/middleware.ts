import { NextRequest, NextResponse } from 'next/server'

// In production, Keystatic GitHub mode handles its own OAuth auth.
// In development, /admin is open (protected by local-only access).
export function middleware(_req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
