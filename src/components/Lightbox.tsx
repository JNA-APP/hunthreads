'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

type Props = {
  src: string
  alt: string
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

export default function Lightbox({ src, alt, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onPrev, onNext])

  const content = (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {onPrev && (
        <button className="lightbox__nav lightbox__nav--prev" onClick={e => { e.stopPropagation(); onPrev() }} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 4l-8 8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div className="lightbox__img" onClick={e => e.stopPropagation()}>
        <Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} sizes="100vw" priority />
      </div>

      {onNext && (
        <button className="lightbox__nav lightbox__nav--next" onClick={e => { e.stopPropagation(); onNext() }} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 4l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <p className="lightbox__label">{alt}</p>
    </div>
  )

  return createPortal(content, document.body)
}
