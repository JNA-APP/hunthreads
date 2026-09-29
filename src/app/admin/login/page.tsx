import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  async function signIn(formData: FormData) {
    'use server'
    const supabase = await createServerSupabase()
    const { error } = await supabase.auth.signInWithPassword({
      email:    formData.get('email')    as string,
      password: formData.get('password') as string,
    })
    if (error) redirect('/admin/login?error=1')
    redirect('/admin')
  }

  return (
    <div className="ht-login">
      <div className="ht-login__card">
        <div className="ht-login__logo">HT</div>
        <h1 className="ht-login__title">Hunthreads Admin</h1>
        <p className="ht-login__sub">Sign in to manage your content</p>

        {error && (
          <div className="ht-banner ht-banner--error" style={{ marginBottom: 20 }}>
            Invalid email or password.
          </div>
        )}

        <form action={signIn} className="ht-form">
          <div className="ht-field">
            <label className="ht-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="ht-input"
            />
          </div>
          <div className="ht-field">
            <label className="ht-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="ht-input"
            />
          </div>
          <button type="submit" className="ht-btn ht-btn--primary" style={{ marginTop: 4 }}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
