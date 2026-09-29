import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Image src="/logo.png" alt="Hunthreads" width={130} height={42} style={{ height: 'auto', marginBottom: '8px' }} />
          <p className="footer__tagline">TATTOO × BARBER × MERCH</p>
          <p className="footer__copy">&copy; {new Date().getFullYear()} Hunthreads. All rights reserved.</p>
        </div>
        <div className="footer__links">
          <h5>Services</h5>
          <a href="#services">Tattoo</a>
          <a href="#services">Barber</a>
          <a href="#merch">Merch</a>
          <a href="#book">Book</a>
        </div>
        <div className="footer__links">
          <h5>Studio</h5>
          <a href="#about">About</a>
          <a href="#work">Portfolio</a>
          <a href="#bts">Behind the Scenes</a>
          <a href="#book">Contact</a>
        </div>
        <div className="footer__links">
          <h5>Follow</h5>
          <a href="https://www.facebook.com/profile.php?id=61568755497348" target="_blank" rel="noopener noreferrer" className="footer__social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
            Facebook
          </a>
          <a href="https://www.tiktok.com/@hunthreadscollection" target="_blank" rel="noopener noreferrer" className="footer__social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
            </svg>
            TikTok
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <p>No shortcuts. No compromises. Just the work.</p>
      </div>
    </footer>
  )
}
