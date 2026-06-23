/* ==========================================
   NARZPOOL SCRIPT — CLEAN VERSION
   ========================================== */

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
if (navbar && !navbar.dataset.inner) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ===== HAMBURGER + OVERLAY ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
let overlay     = document.querySelector('.nav-overlay');

if (!overlay) {
  overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);
}

const openNav = () => {
  navLinks.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
};

const closeNav = () => {
  navLinks.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
};

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () =>
    navLinks.classList.contains('open') ? closeNav() : openNav()
  );
  overlay.addEventListener('click', closeNav);
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  // Swipe to close
  let tx = 0;
  navLinks.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  navLinks.addEventListener('touchend', e => {
    if (e.changedTouches[0].clientX - tx > 60) closeNav();
  }, { passive: true });
}

/* ===== COUNTER ANIMATION ===== */
function countUp(el, target, duration = 1600) {
  let n = 0;
  const step = target / (duration / 16);
  const run = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(run); }
    el.textContent = Math.floor(n);
  }, 16);
}

// Hero counters — animasikan dari 0
const heroIds = [['c1',500],['c2',15],['c3',200],['c4',50]];
let heroDone = false;
setTimeout(() => {
  if (heroDone) return;
  heroDone = true;
  heroIds.forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) { el.textContent = '0'; countUp(el, val); }
  });
}, 400);

// Stats section counters
const statsSection = document.querySelector('.stats');
let statsDone = false;
if (statsSection) {
  new IntersectionObserver(([e]) => {
    if (!e.isIntersecting || statsDone) return;
    statsDone = true;
    statsSection.querySelectorAll('.stat-item h2').forEach((el, i) => {
      const vals = [500, 15, 200, 50];
      const suffix = el.textContent.replace(/\d/g, '');
      el.textContent = '0' + suffix;
      const proxy = { set textContent(v) { el.textContent = v + suffix; } };
      countUp(proxy, vals[i]);
    });
  }, { threshold: 0.3 }).observe(statsSection);
}

/* ===== SCROLL REVEAL ===== */
const revealTargets = document.querySelectorAll(
  '.preview-card, .layanan-card, .galeri-card, .paket-card-page, ' +
  '.maintenance-card, .testi-card-full, .info-card, .proses-card, ' +
  '.showcase-item, .about-grid, .cta-box, .rating-box, .faq-item'
);

const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (!e.isIntersecting) return;
    setTimeout(() => {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }, (i % 4) * 80);
    io.unobserve(e.target);
  });
}, { threshold: 0.08 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .55s ease, transform .55s ease';
  io.observe(el);
});

/* ===== GALERI FILTER ===== */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    let n = 0;
    document.querySelectorAll('.galeri-card').forEach(c => {
      const show = f === 'all' || c.dataset.category === f;
      c.style.display = show ? '' : 'none';
      if (show) n++;
    });
    const nr = document.getElementById('noResult');
    if (nr) nr.style.display = n === 0 ? 'block' : 'none';
  });
});

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-question');
  const a = item.querySelector('.faq-answer');
  if (!q || !a) return;
  q.addEventListener('click', () => {
    const open = q.classList.contains('open');
    document.querySelectorAll('.faq-question.open').forEach(el => {
      el.classList.remove('open');
      el.nextElementSibling?.classList.remove('open');
    });
    if (!open) { q.classList.add('open'); a.classList.add('open'); }
  });
});

/* ===== FORM SUBMIT ===== */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
    btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
