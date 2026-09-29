'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

export type GalleryItem = {
  slug: string
  label: string
  category: 'tattoo' | 'barber'
  imageSrc: string
  placeholderStyle: string
}

type Filter = 'all' | 'tattoo' | 'barber'

function getItemsPerPage(width: number) {
  if (width <= 480) return 1
  if (width <= 900) return 2
  return 4
}

export default function Work({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter]           = useState<Filter>('all')
  const [offset, setOffset]           = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [paused, setPaused]           = useState(false)

  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const visible = items.filter(i => filter === 'all' || i.category === filter)

  // Items that have real images (for lightbox navigation)
  const imageItems = visible.filter(i => i.imageSrc)

  const resetOffset = useCallback(() => setOffset(0), [])

  // Reset when filter changes
  useEffect(() => { resetOffset() }, [filter, resetOffset])

  // Reset on resize (items-per-page may change)
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

  function openLightbox(item: GalleryItem) {
    if (!item.imageSrc) return
    const idx = imageItems.findIndex(i => i.label === item.label)
    if (idx !== -1) setLightboxIdx(idx)
  }

  return (
    <section className="work" id="work">
      <div className="container">
        <div className="section-header section-header--light">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">THE WORK</h2>
        </div>

        <div className="work__tabs">
          {(['all', 'tattoo', 'barber'] as Filter[]).map(f => (
            <button
              key={f}
              className={`work__tab${filter === f ? ' work__tab--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="slider-outer" ref={outerRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div
            className="slider-track"
            ref={trackRef}
            style={{ transform: `translateX(${-offset}px)` }}
          >
            {visible.map(item => (
              <div
                key={item.slug}
                className="slider__item"
                data-category={item.category}
                onClick={() => openLightbox(item)}
                style={{ cursor: item.imageSrc ? 'zoom-in' : 'default' }}
              >
                {item.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.label}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className={`work__placeholder${item.placeholderStyle ? ' work__placeholder' + item.placeholderStyle : ''}`}>
                    <span className="work__placeholder-label">{item.category.toUpperCase()}</span>
                    <span className="work__placeholder-coming">Coming Soon</span>
                  </div>
                )}
                <div className="slider__overlay"><span>{item.label}</span></div>
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

        <div className="work__cta">
          <p>Want to see more? Hit us up on the socials.</p>
          <div className="work__socials">
            <a href="https://www.facebook.com/profile.php?id=61568755497348" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
            <a href="https://www.tiktok.com/@hunthreadscollection" target="_blank" rel="noopener noreferrer" className="social-link">TikTok</a>
          </div>
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          src={imageItems[lightboxIdx].imageSrc}
          alt={imageItems[lightboxIdx].label}
          onClose={() => setLightboxIdx(null)}
          onPrev={lightboxIdx > 0 ? () => setLightboxIdx(i => (i ?? 0) - 1) : undefined}
          onNext={lightboxIdx < imageItems.length - 1 ? () => setLightboxIdx(i => (i ?? 0) + 1) : undefined}
        />
      )}
    </section>
  )
}
