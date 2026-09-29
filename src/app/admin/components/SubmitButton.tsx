'use client'

import { useFormStatus } from 'react-dom'

interface Props {
  label?: string
  loadingLabel?: string
  className?: string
}

export function SubmitButton({
  label = 'Save Changes',
  loadingLabel = 'Saving...',
  className = 'ht-btn ht-btn--primary',
}: Props) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <>
          <span className="ht-spinner" style={{ marginRight: 6 }} />
          {loadingLabel}
        </>
      ) : label}
    </button>
  )
}
