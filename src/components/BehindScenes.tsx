'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

export type BtsPhoto = {
  slug: string
  label: string
  imageSrc: string
  featured: boolean
}

export default function BehindScenes({ photos }: { photos: BtsPhoto[] }) {
  const [offset, setOffset]           = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [paused, setPaused]           = useState(false)

  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const resetOffset = useCallback(() => setOffset(0), [])

  useEffect(() => {
    function onResize() { resetOffset() }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [resetOffset])

  const advance = useCallback(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return
    const pageW = outer.clientWidth
    const maxOffset = Math.max(0, track.scrollWidth - pageW)
    setOffset(prev => prev >= maxOffset ? 0 : Math.min(prev + pageW, maxOffset))
  }, [])

  useEffect(() => {
    if (paused || lightboxIdx !== null) return
    const id = setInterval(advance, 3500)
    return () => clearInterval(id)
  }, [paused, lightboxIdx, advance])

  function scroll(dir: 'prev' | 'next') {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return
    const pageW = outer.clientWidth
    const maxOffset = Math.max(0, track.scrollWidth - pageW)
    setOffset(prev => {
      const next = dir === 'next' ? prev + pageW : prev - pageW
      return Math.max(0, Math.min(next, maxOffset))
    })
  }

  return (
    <section className="bts" id="bts">
      <div className="bts__bg-text" aria-hidden="true">BTS</div>
      <div className="container">
        <div className="section-header section-header--light">
          <span className="section-label">Behind the Scenes</span>
          <h2 className="section-title">IN THE<br />STUDIO</h2>
        </div>

        <div className="slider-outer" ref={outerRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div
            className="slider-track"
            ref={trackRef}
            style={{ transform: `translateX(${-offset}px)` }}
          >
            {photos.map((photo, i) => (
              <div
                key={photo.slug}
                className={`slider__item${photo.featured ? ' slider__item--featured' : ''}`}
                onClick={() => setLightboxIdx(i)}
                style={{ cursor: 'zoom-in' }}
              >
                <Image
                  src={photo.imageSrc}
                  alt={photo.label}
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
                {photo.featured && (
                  <div className="bts__featured-badge">&#9733; Featured</div>
                )}
                <div className="slider__overlay"><span>{photo.label}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="slider__controls">
          <button className="slider__btn" onClick={() => scroll('prev')} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="slider__btn" onClick={() => scroll('next')} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="bts__cta">
          <p>The crew. The culture. The work.</p>
          <div className="work__socials">
            <a href="https://www.facebook.com/profile.php?id=61568755497348" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
            <a href="https://www.tiktok.com/@hunthreadscollection" target="_blank" rel="noopener noreferrer" className="social-link">TikTok</a>
          </div>
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          src={photos[lightboxIdx].imageSrc}
          alt={photos[lightboxIdx].label}
          onClose={() => setLightboxIdx(null)}
          onPrev={lightboxIdx > 0 ? () => setLightboxIdx(i => (i ?? 0) - 1) : undefined}
          onNext={lightboxIdx < photos.length - 1 ? () => setLightboxIdx(i => (i ?? 0) + 1) : undefined}
        />
      )}
    </section>
  )
}
