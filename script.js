// Floating CTA
window.addEventListener('scroll', () => {
  document.getElementById('floatingCta').classList.toggle('show', window.scrollY > 300);
});

// Mobile menu
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.07) + 's';
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .why-feature').forEach(el => revealObserver.observe(el));

// Process steps stagger
const ps = document.querySelector('.process-steps');
if (ps) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting)
        entry.target.querySelectorAll('.process-step').forEach((s, i) =>
          setTimeout(() => s.classList.add('visible'), i * 130));
    });
  }, { threshold: 0.2 }).observe(ps);
}

// Gallery filter
function filterGallery(btn, cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    const match = cat === 'all' || item.dataset.cat === cat;
    item.style.opacity = match ? '1' : '0.18';
    item.style.filter = match ? '' : 'grayscale(100%)';
    item.style.transition = 'opacity 0.4s, filter 0.4s';
  });
}

// Form submit
function submitForm() {
  const fname = document.getElementById('fname').value;
  const phone = document.getElementById('phone').value;
  if (!fname || !phone) { alert('Prosím vyplňte alespoň jméno a telefon.'); return; }
  const notif = document.getElementById('notification');
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 4000);
  ['fname','lname','phone','email','message'].forEach(id => document.getElementById(id).value = '');
}

// Hero parallax
window.addEventListener('scroll', () => {
  const bg = document.querySelector('.hero-bg');
  if (bg && window.scrollY < window.innerHeight)
    bg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
});
