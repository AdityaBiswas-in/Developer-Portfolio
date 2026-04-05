/* ── Premium Custom Cursor ── */
const cursorDot     = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.matchMedia('(min-width: 900px)').matches && cursorDot && cursorOutline) {

  let mouseX = -100, mouseY = -100;
  let outlineX = -100, outlineY = -100;

  /* Track real mouse position */
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    /* Dot snaps instantly */
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top  = `${mouseY}px`;
  });

  /* Lerp-based trailing outline — smooth spring feel */
  const LERP = 0.12;
  function animateCursor() {
    outlineX += (mouseX - outlineX) * LERP;
    outlineY += (mouseY - outlineY) * LERP;
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top  = `${outlineY}px`;
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  /* Click burst effect */
  window.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  window.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

  /* Hover detection on interactive elements */
  const hoverTargets = 'a, button, .project-card, .hamburger, [role="button"], label, input, textarea, select';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  /* Hide cursor when leaving window */
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity     = '0';
    cursorOutline.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity     = '1';
    cursorOutline.style.opacity = '1';
  });
}


/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

/* ── Active nav link ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
updateActiveNav();

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

/* ── Reveal on scroll ── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));

/* ── Skill bars on scroll ── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(el => barObserver.observe(el));

/* ── Copy email ── */
function copyEmail() {
  navigator.clipboard.writeText('i.adityabiswas.in@gmail.com').then(() => {
    const btn = document.getElementById('copy-email-btn');
    btn.innerHTML = '<i class="fas fa-check"></i> Email Copied!';
    btn.style.background = 'var(--purple)';
    btn.style.borderColor = 'var(--purple)';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-copy"></i> Copy Email';
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 2500);
  });
}

/* ── Smooth hero entrance ── */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-inner .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 200);
  });
});
