'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleTheme() {
    const html = document.documentElement
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', next)
    try { localStorage.setItem('ht-theme', next) } catch {}
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav__inner">
      <a href="#" className="nav__logo">
        <Image src="/logo.png" alt="Hunthreads" width={100} height={32} priority style={{ height: 'auto' }} />
      </a>

      <ul className={`nav__links${open ? ' open' : ''}`}>
        <li><a href="#services" onClick={() => setOpen(false)}>Services</a></li>
        <li><a href="#work" onClick={() => setOpen(false)}>Work</a></li>
        <li><a href="#merch" onClick={() => setOpen(false)}>Merch</a></li>
        <li><a href="#bts" onClick={() => setOpen(false)}>Behind the Scenes</a></li>
        <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
        <li><a href="#book" className="nav__cta" onClick={() => setOpen(false)}>Book Now</a></li>
      </ul>

      <div className="nav__right">
        <button className="nav__theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>

        <button
          className={`nav__burger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
      </div>
    </nav>
  )
}
