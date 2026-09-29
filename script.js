// Theme toggle
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('ht-theme') || 'light';
html.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ht-theme', next);
});

// Nav scroll behaviour
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.service-card, .work__item, .merch__card, .about__value, .book__info-item');
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 3 === 1) el.classList.add('reveal-delay-1');
  if (i % 3 === 2) el.classList.add('reveal-delay-2');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Work filter tabs
const tabs = document.querySelectorAll('.work__tab');
const items = document.querySelectorAll('.work__item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('work__tab--active'));
    tab.classList.add('work__tab--active');
    const filter = tab.dataset.tab;
    items.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.display = show ? '' : 'none';
    });
  });
});

// Form submit (demo — replace with your backend/Formspree endpoint)
const form = document.getElementById('book-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Request Sent';
    btn.style.background = '#2BBECB';
    btn.style.borderColor = '#2BBECB';
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
    }, 3000);
  }, 1200);
});

// Burger open/close animation
const burgerStyle = document.createElement('style');
burgerStyle.textContent = `
  .nav__burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav__burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav__burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .nav__burger span { transition: all 0.3s ease; transform-origin: center; }
`;
document.head.appendChild(burgerStyle);
