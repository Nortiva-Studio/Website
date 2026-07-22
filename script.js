/* =============================================================
   NORTIVA STUDIO — script.js
   JavaScript puro, sem dependências.
============================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. Header: efeito ao rolar
  --------------------------------------------------------- */
  var header = document.getElementById('siteHeader');

  function handleHeaderScroll() {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* ---------------------------------------------------------
     2. Menu mobile
  --------------------------------------------------------- */
  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---------------------------------------------------------
     3. Revelar elementos ao entrar na tela
  --------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = (Array.prototype.indexOf.call(
              el.parentNode.children,
              el
            ) % 4) * 80;
            setTimeout(function () {
              el.classList.add('in-view');
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: sem IntersectionObserver, apenas exibe tudo
    revealEls.forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  /* ---------------------------------------------------------
     4. Botão "voltar ao topo"
  --------------------------------------------------------- */
  var backToTop = document.getElementById('backToTop');

  function handleBackToTopVisibility() {
    if (window.scrollY > 640) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  handleBackToTopVisibility();
  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------------
     5. Fecha o menu mobile ao redimensionar para desktop
  --------------------------------------------------------- */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 760) {
      closeMobileNav();
    }
  });

  /* ---------------------------------------------------------
     6. Ano dinâmico no rodapé
  --------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
