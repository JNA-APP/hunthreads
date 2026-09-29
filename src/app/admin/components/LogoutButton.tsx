'use client'

export function LogoutButton() {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!window.confirm('Sign out of the admin panel?')) e.preventDefault()
  }
  return (
    <button type="submit" onClick={handleClick} className="ht-sidebar__logout">
      Sign out
    </button>
  )
}
