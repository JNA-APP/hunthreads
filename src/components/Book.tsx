'use client'

import { useState, FormEvent } from 'react'

export default function Book() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setTimeout(() => {
        setStatus('idle')
        ;(e.target as HTMLFormElement).reset()
      }, 3000)
    }, 1200)
  }

  return (
    <section className="book" id="book">
      <div className="book__bg-text" aria-hidden="true">BOOK</div>
      <div className="container">
        <div className="section-header section-header--light">
          <span className="section-label">Get In The Chair</span>
          <h2 className="section-title">BOOK YOUR<br />SESSION</h2>
        </div>

        <div className="book__inner">
          <div className="book__info">
            <div className="book__info-item">
              <h4>Location</h4>
              <p>
                <a href="https://maps.app.goo.gl/FyBsdwSZD4HLuNL48" target="_blank" rel="noopener noreferrer">
                  View on Google Maps →
                </a>
              </p>
            </div>
            <div className="book__info-item">
              <h4>Hours</h4>
              <p>Monday – Sunday<br />10:00 AM – 7:00 PM</p>
            </div>
            <div className="book__info-item">
              <h4>Contact</h4>
              <p>
                <a href="tel:+639563676153">0956 367 6153</a>
                <br />DM us on Facebook or TikTok for fastest response.
              </p>
            </div>
            <div className="book__socials">
              <a href="https://www.facebook.com/profile.php?id=61568755497348" target="_blank" rel="noopener noreferrer" className="book__social">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-label="Facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </a>
              <a href="https://www.tiktok.com/@hunthreadscollection" target="_blank" rel="noopener noreferrer" className="book__social">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                </svg>
                TikTok
              </a>
            </div>
          </div>

          <form className="book__form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="service">Service</label>
              <select id="service" name="service" required defaultValue="">
                <option value="" disabled>Select a service</option>
                <option value="tattoo-consult">Tattoo — Free Consultation</option>
                <option value="tattoo-session">Tattoo — Full Session</option>
                <option value="barber-fade">Barber — Fade &amp; Shape-up</option>
                <option value="barber-beard">Barber — Beard Trim &amp; Line</option>
                <option value="barber-full">Barber — Full Package</option>
                <option value="merch">Merch — Custom Order</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Tell us more</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Describe what you're after — reference images, style, date preference..."
              />
            </div>
            <button
              type="submit"
              disabled={status !== 'idle'}
              className={`form-submit${status === 'sent' ? ' form-submit--sent' : ''}`}
            >
              {status === 'idle' && 'Send Booking Request'}
              {status === 'sending' && 'Sending...'}
              {status === 'sent' && 'Request Sent ✓'}
            </button>
            <p className="form-note">We&#39;ll get back to you within 24 hours to confirm your slot.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
