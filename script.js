/* ═══════════════════════════════════════════════
   HAIL THE SWOOP — Sacred Scripts
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Floating Feathers ──
  const featherContainer = document.getElementById('feather-container');
  const featherChars = ['🪶', '𓅃', '𓅂', '~', '·'];
  const MAX_FEATHERS = 15;
  let featherCount = 0;

  function spawnFeather() {
    if (featherCount >= MAX_FEATHERS) return;

    const feather = document.createElement('span');
    feather.classList.add('floating-feather');
    feather.textContent = featherChars[Math.floor(Math.random() * featherChars.length)];

    const startX = Math.random() * 100;
    const drift = (Math.random() - 0.5) * 200;
    const spin = Math.random() * 720 - 360;
    const duration = 10 + Math.random() * 15;
    const delay = Math.random() * 5;
    const size = 0.8 + Math.random() * 0.8;

    feather.style.left = `${startX}%`;
    feather.style.setProperty('--drift', `${drift}px`);
    feather.style.setProperty('--spin', `${spin}deg`);
    feather.style.animationDuration = `${duration}s`;
    feather.style.animationDelay = `${delay}s`;
    feather.style.fontSize = `${size}rem`;

    featherContainer.appendChild(feather);
    featherCount++;

    feather.addEventListener('animationend', () => {
      feather.remove();
      featherCount--;
    });
  }

  // Spawn feathers periodically
  function featherLoop() {
    if (document.visibilityState === 'visible') {
      spawnFeather();
    }
    setTimeout(featherLoop, 2000 + Math.random() * 3000);
  }

  // Initial burst
  for (let i = 0; i < 5; i++) {
    setTimeout(spawnFeather, i * 800);
  }
  setTimeout(featherLoop, 5000);

  // ── Hero Particles ──
  const particlesEl = document.getElementById('hero-particles');
  if (particlesEl) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('span');
      p.classList.add('hero-particle');
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${50 + Math.random() * 50}%`;
      p.style.setProperty('--pdrift', `${(Math.random() - 0.5) * 60}px`);
      p.style.animationDuration = `${3 + Math.random() * 5}s`;
      p.style.animationDelay = `${Math.random() * 5}s`;
      p.style.width = `${1 + Math.random() * 2}px`;
      p.style.height = p.style.width;
      particlesEl.appendChild(p);
    }
  }

  // ── Navigation ──
  const nav = document.getElementById('main-nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  let lastScrollY = 0;
  let ticking = false;

  function updateNav() {
    const scrollY = window.scrollY;

    // Auto-hide on scroll down, show on scroll up
    if (scrollY > lastScrollY && scrollY > 100) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }

    // Shadow when scrolled
    if (scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    // Active section highlight
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');
    let currentId = '';

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) {
        currentId = section.id;
      }
    });

    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close nav on link click
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  // ── Scroll Reveal ──
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
  });

  // Stagger creed cards
  document.querySelectorAll('.creed-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // Stagger hierarchy ranks
  document.querySelectorAll('.hierarchy-rank').forEach((rank, i) => {
    rank.style.transitionDelay = `${i * 0.15}s`;
  });

  // Stagger ritual cards
  document.querySelectorAll('.ritual-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // ── Report Flesh Ripper Button ──
  const reportBtn = document.getElementById('report-btn');
  const reportModal = document.getElementById('report-modal');
  const modalClose = document.getElementById('modal-close');

  reportBtn.addEventListener('click', () => {
    reportModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  modalClose.addEventListener('click', () => {
    reportModal.style.display = 'none';
    document.body.style.overflow = '';
  });

  reportModal.addEventListener('click', (e) => {
    if (e.target === reportModal) {
      reportModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // ── Pray Section ──
  const praySection = document.getElementById('pray');
  const prayLink = document.getElementById('pray-link');
  const prayBtn = document.getElementById('pray-btn');
  const prayResult = document.getElementById('pray-result');

  const blessings = [
    '🪶 Swoop hat deinen Crit-Chance um 0.001% erhöht. Wahrscheinlich.',
    '💨 Der Wind flüstert: „Nice transmog."',
    '✨ Dein nächster Dungeon wird sauber. Der Swoop hat es gesehen.',
    '🎲 RNG-Segen aktiviert. Gilt für die nächsten 3 Würfe. Vielleicht.',
    '🦅 Swoop nickt anerkennend. Das ist selten. Genieße es.',
    '💨 „Dein Pathing war akzeptabel." — Swoop, wahrscheinlich',
    '🪶 Eine goldene Feder fällt aus dem Nichts. Grey Item. Aber heilig.',
    '⚡ Swoop gewährt dir Immunität gegen Lag. (Gilt nicht bei WLAN.)',
    '🙏 Swoomen. Dein Gebet wurde erhört. Oder nicht. RNG halt.',
    '🦅 Der Schwarm erkennt dich. Du bist... akzeptabel.',
  ];

  prayLink.addEventListener('click', (e) => {
    e.preventDefault();
    praySection.style.display = 'block';
    setTimeout(() => {
      praySection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  });

  // Also allow typing /pray in the URL hash
  if (window.location.hash === '#pray') {
    praySection.style.display = 'block';
  }

  prayBtn.addEventListener('click', () => {
    prayBtn.disabled = true;
    prayBtn.textContent = '🙏 Betet...';
    prayResult.textContent = '';

    setTimeout(() => {
      const blessing = blessings[Math.floor(Math.random() * blessings.length)];
      prayResult.textContent = blessing;
      prayBtn.textContent = '🙏 /pray';
      prayBtn.disabled = false;

      // Spawn a burst of feathers
      for (let i = 0; i < 5; i++) {
        setTimeout(spawnFeather, i * 200);
      }
    }, 1500);
  });

  // ── Join the Schwarm ──
  const joinBtn = document.getElementById('join-btn');
  joinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Placeholder — could link to Discord
    const phrases = [
      'Der Schwarm erwartet dich. Bald™.',
      'Discord-Link kommt. Der Wind braucht Zeit.',
      'Geduld, Nestling. Der Swoop offenbart den Weg, wenn er bereit ist.',
      'Hast du den Kreisflug gemacht? Dann bist du bereit. Fast.',
    ];
    alert(phrases[Math.floor(Math.random() * phrases.length)]);
  });

  // ── Konami Code Easter Egg ──
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  let konamiProgress = 0;
  const konamiOverlay = document.getElementById('konami-overlay');
  const konamiClose = document.getElementById('konami-close');

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiProgress]) {
      konamiProgress++;
      if (konamiProgress === konamiCode.length) {
        konamiOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        konamiProgress = 0;

        // Screen shake effect
        document.body.style.animation = 'none';
      }
    } else {
      konamiProgress = 0;
    }
  });

  konamiClose.addEventListener('click', () => {
    konamiOverlay.style.display = 'none';
    document.body.style.overflow = '';
  });

  // ── Secret Console Messages ──
  console.log(
    '%c🪶 HAIL THE SWOOP 🪶',
    'color: #C4A44A; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 0 #8B7332;'
  );
  console.log(
    '%cDer Flügelschlag entscheidet.',
    'color: #6BB3D9; font-size: 14px; font-style: italic;'
  );
  console.log(
    '%c🔍 Du inspizierst den Code? Der Swoop schätzt Neugier.\n' +
    '   Tipp: Versuche den Konami Code. ↑↑↓↓←→←→BA\n' +
    '   Oder klick auf die Feder im Footer.',
    'color: #9B8E7A; font-size: 11px;'
  );

  // ── Parallax-lite on hero ──
  const heroContent = document.querySelector('.hero-content');
  let parallaxTicking = false;

  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          const offset = scrollY * 0.3;
          heroContent.style.transform = `translateY(${offset}px)`;
          heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
        }
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });

  // ── Page title easter egg ──
  let titleVisible = true;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      document.title = '🪶 Swoop sieht, dass du weg bist...';
      titleVisible = false;
    } else {
      if (!titleVisible) {
        document.title = '🪶 Willkommen zurück, Nestling!';
        setTimeout(() => {
          document.title = 'Hail the Swoop — Der Flügelschlag entscheidet.';
        }, 2000);
      }
      titleVisible = true;
    }
  });

  // ── Secret /pray hash route ──
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#pray') {
      praySection.style.display = 'block';
      setTimeout(() => {
        praySection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  });

  // ── Cursor trail on hero (subtle golden sparkles) ──
  const hero = document.getElementById('hero');
  let sparkleThrottle = false;

  hero.addEventListener('mousemove', (e) => {
    if (sparkleThrottle) return;
    sparkleThrottle = true;

    const sparkle = document.createElement('span');
    sparkle.textContent = '✦';
    sparkle.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      color: #C4A44A;
      font-size: ${8 + Math.random() * 8}px;
      pointer-events: none;
      z-index: 5;
      opacity: 0.8;
      transition: all 1s ease;
    `;
    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
      sparkle.style.opacity = '0';
      sparkle.style.transform = `translateY(-30px) scale(0)`;
    });

    setTimeout(() => sparkle.remove(), 1000);
    setTimeout(() => { sparkleThrottle = false; }, 80);
  });

  // ── Typing effect for hero title on load ──
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 300);
  }

  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
      heroSubtitle.style.transition = 'opacity 1s ease, transform 1s ease';
      heroSubtitle.style.opacity = '1';
      heroSubtitle.style.transform = 'translateY(0)';
    }, 700);
  }

  const heroCta = document.querySelector('.hero-cta');
  if (heroCta) {
    heroCta.style.opacity = '0';
    heroCta.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
      heroCta.style.transition = 'opacity 1s ease, transform 1s ease';
      heroCta.style.opacity = '1';
      heroCta.style.transform = 'translateY(0)';
    }, 1100);
  }

  // ── 7x click on logo: secret swoop sound ──
  let logoClicks = 0;
  let logoTimeout;
  const navLogo = document.querySelector('.nav-logo');

  navLogo.addEventListener('click', (e) => {
    logoClicks++;
    clearTimeout(logoTimeout);

    if (logoClicks >= 7) {
      e.preventDefault();
      logoClicks = 0;
      // Visual feedback: golden flash
      document.body.style.transition = 'background 0.3s ease';
      document.body.style.background = 'rgba(196, 164, 74, 0.1)';
      setTimeout(() => {
        document.body.style.background = '';
      }, 300);

      // Show prayer section
      praySection.style.display = 'block';
      praySection.scrollIntoView({ behavior: 'smooth' });
    }

    logoTimeout = setTimeout(() => {
      logoClicks = 0;
    }, 2000);
  });

  // ── Escape key closes modals ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (konamiOverlay.style.display === 'flex') {
        konamiOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }
      if (reportModal.style.display === 'flex') {
        reportModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
  });

})();
