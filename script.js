// ─── Floating CTA ───
window.addEventListener('scroll', () => {
  document.getElementById('floatingCta').classList.toggle('show', window.scrollY > 300);
});

// ─── Mobile menu ───
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ─── Scroll reveal ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Why features slide-in ───
const whyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.1) + 's';
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.why-feature').forEach(el => whyObserver.observe(el));

// ─── Process steps stagger ───
const ps = document.querySelector('.process-steps');
if (ps) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.process-step').forEach((s, i) =>
          setTimeout(() => s.classList.add('visible'), i * 130));
      }
    });
  }, { threshold: 0.15 }).observe(ps);
}

// ─── Gallery filter ───
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

// ─── Form submit (Formspree ready) ───
function submitForm() {
  const fname = document.getElementById('fname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if (!fname || !phone) {
    alert('Prosím vyplňte alespoň jméno a telefon.');
    return;
  }
  // Sem dej svůj Formspree endpoint: 'https://formspree.io/f/TVOJE_ID'
  const FORMSPREE_URL = '';

  if (FORMSPREE_URL) {
    const data = {
      jmeno: fname + ' ' + document.getElementById('lname').value,
      telefon: phone,
      email: document.getElementById('email').value,
      sluzba: document.getElementById('service').value,
      plocha: document.getElementById('area').value,
      zprava: document.getElementById('message').value
    };
    fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) showNotification();
      else alert('Chyba při odesílání, zkuste znovu.');
    }).catch(() => alert('Chyba připojení.'));
  } else {
    // fallback bez backendu
    showNotification();
  }

  ['fname','lname','phone','email','message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function showNotification() {
  const notif = document.getElementById('notification');
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 4000);
}

// ─── Hero parallax ───
window.addEventListener('scroll', () => {
  const bg = document.querySelector('.hero-bg');
  if (bg && window.scrollY < window.innerHeight) {
    bg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
  }
});

// ─── Media lightbox (fotky) ───
(function() {
  // Vytvoří lightbox overlay
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = `
    <div id="lb-backdrop"></div>
    <div id="lb-content">
      <button id="lb-close">✕</button>
      <button id="lb-prev">‹</button>
      <img id="lb-img" src="" alt="">
      <button id="lb-next">›</button>
      <div id="lb-info">
        <span id="lb-date"></span>
        <p id="lb-caption"></p>
      </div>
    </div>
  `;
  document.body.appendChild(lb);

  let photos = [];
  let current = 0;

  function openLightbox(index) {
    current = index;
    const p = photos[current];
    document.getElementById('lb-img').src = p.src;
    document.getElementById('lb-date').textContent = p.date;
    document.getElementById('lb-caption').textContent = p.caption;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showPhoto(dir) {
    current = (current + dir + photos.length) % photos.length;
    const p = photos[current];
    const img = document.getElementById('lb-img');
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = p.src;
      document.getElementById('lb-date').textContent = p.date;
      document.getElementById('lb-caption').textContent = p.caption;
      img.style.opacity = '1';
    }, 180);
  }

  document.addEventListener('DOMContentLoaded', () => {
    photos = Array.from(document.querySelectorAll('.media-photo')).map(el => ({
      src: el.querySelector('img').src,
      date: el.querySelector('.media-date') ? el.querySelector('.media-date').textContent : '',
      caption: el.querySelector('.media-caption') ? el.querySelector('.media-caption').textContent : ''
    }));

    document.querySelectorAll('.media-photo').forEach((el, i) => {
      el.addEventListener('click', () => openLightbox(i));
    });

    document.getElementById('lb-close').addEventListener('click', closeLightbox);
    document.getElementById('lb-backdrop').addEventListener('click', closeLightbox);
    document.getElementById('lb-prev').addEventListener('click', () => showPhoto(-1));
    document.getElementById('lb-next').addEventListener('click', () => showPhoto(1));

    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPhoto(-1);
      if (e.key === 'ArrowRight') showPhoto(1);
    });
  });
})();
