'use client'

import { useFormStatus } from 'react-dom'

interface Props {
  label?: string
  message?: string
}

export function DeleteButton({
  label = 'Delete',
  message = 'Delete this item? This cannot be undone.',
}: Props) {
  const { pending } = useFormStatus()

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!window.confirm(message)) e.preventDefault()
  }

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={handleClick}
      className="ht-btn ht-btn--danger ht-btn--sm"
    >
      {pending ? <span className="ht-spinner ht-spinner--sm" /> : label}
    </button>
  )
}
