/* ============================================================
   e-Trentin — JavaScript condiviso (main.js)
   Caricato su tutte le pagine
   ============================================================ */

/* ────────────────────────────────────────────
   1. NAVBAR: hamburger mobile + link attivo
   ──────────────────────────────────────────── */
(function initNavbar() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  if (!toggle || !links) return;

  /* Apri/chiudi menu mobile */
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  /* Chiudi il menu cliccando fuori */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#navbar')) {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* Evidenzia voce di menu attiva confrontando l'URL */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();


/* ────────────────────────────────────────────
   2. SCROLL: aggiungi ombra alla navbar
   ──────────────────────────────────────────── */
(function initNavbarShadow() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(26,26,20,.25)'
      : '';
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ────────────────────────────────────────────
   3. SCROLL-SPY: sidebar pagine interne
   Evidenzia la voce della sidebar corrispondente
   alla sezione visibile nello schermo
   ──────────────────────────────────────────── */
(function initScrollSpy() {
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
  if (!sidebarLinks.length) return;

  const sections = Array.from(sidebarLinks).map(link =>
    document.querySelector(link.getAttribute('href'))
  ).filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        /* Rimuovi active da tutti */
        sidebarLinks.forEach(l => l.classList.remove('active'));
        /* Aggiungi active al link corrispondente */
        const id = '#' + entry.target.id;
        const activeLink = document.querySelector(`.sidebar-nav a[href="${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px', /* considera "visibile" il terzo superiore */
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));
})();


/* ────────────────────────────────────────────
   4. ANIMAZIONI: fade-in al primo scroll
   Gli elementi con classe .animate-on-scroll
   diventano visibili quando entrano nel viewport
   ──────────────────────────────────────────── */
(function initScrollAnimations() {
  /* Seleziona tutti gli elementi da animare */
  const targets = document.querySelectorAll(
    '.card, .stat-item, .team-card, .result-card, .content-section'
  );

  if (!targets.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observer.unobserve(entry.target); /* anima solo una volta */
      }
    });
  }, { threshold: 0.1 });

  /* Nascondi inizialmente e poi osserva */
  targets.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
})();


/* ────────────────────────────────────────────
   5. CONTATORI ANIMATI per "#numeri"
   ──────────────────────────────────────────── */
/**
 * Anima un numero da 0 al valore target
 * @param {HTMLElement} el  - elemento che mostra il numero
 * @param {number}      end - valore finale
 * @param {number}      duration - durata in ms
 */
function animateCounter(el, end, duration = 1600) {
  const start     = 0;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    /* Easing: ease-out quadratico */
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (end - start) * eased).toLocaleString('it-IT');

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* Avvia i contatori quando la sezione #numeri è visibile */
(function initCounters() {
  const statsSection = document.getElementById('numeri');
  if (!statsSection) return;

  let started = false;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      statsSection.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        animateCounter(el, target);
      });
    }
  }, { threshold: 0.3 });

  observer.observe(statsSection);
})();


/* ────────────────────────────────────────────
   6. UTILITÀ: notifica toast leggera
   ──────────────────────────────────────────── */
/**
 * Mostra un breve messaggio "toast" in basso a destra
 * @param {string} message - testo del messaggio
 * @param {'success'|'error'|'info'} type
 * @param {number} duration - ms prima che scompaia
 */
function showToast(message, type = 'info', duration = 3000) {
  /* Crea il container se non esiste */
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed; bottom: 1.5rem; right: 1.5rem;
      z-index: 999; display: flex; flex-direction: column; gap: 0.5rem;
    `;
    document.body.appendChild(container);
  }

  const colors = {
    success: { bg: '#2d4a2d', border: '#c9a84c' },
    error:   { bg: '#7a1a1a', border: '#e07070' },
    info:    { bg: '#1a2a4a', border: '#70a0d0' }
  };

  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    padding: 0.75rem 1.25rem;
    background: ${colors[type].bg};
    color: #f5f0e8;
    border-left: 3px solid ${colors[type].border};
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    box-shadow: 0 4px 16px rgba(0,0,0,.25);
    animation: fadeInUp 0.3s ease both;
    max-width: 300px;
  `;

  container.appendChild(toast);

  /* Rimozione automatica */
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* Rendi showToast accessibile globalmente */
window.showToast = showToast;
