/**
 * ============================================================
 * ANIMAÇÃO DE ABERTURA — Convite Susane & Adilson
 * ============================================================
 *
 * Sequência:
 *  1. Usuário clica no botão-fecho
 *  2. Botão pulsa e desaparece
 *  3. Aba superior do envelope levanta (CSS 3D perspective)
 *  4. Convite interno sobe da envelope
 *  5. Envelope retrai / fundo transiciona
 *  6. Conteúdo do convite entra com fade progressivo por seção
 * ============================================================
 */

const InvitationAnimation = (() => {

  let opened = false;

  function init() {
    const sealBtn = document.getElementById('seal-btn');
    if (!sealBtn) return;
    sealBtn.addEventListener('click', open);
    sealBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  }

  function open() {
    if (opened) return;
    opened = true;

    const sealBtn    = document.getElementById('seal-btn');
    const envelopeEl = document.getElementById('envelope');
    const flapEl     = document.getElementById('envelope-flap');
    const cardEl     = document.getElementById('invitation-card');
    const coverEl    = document.getElementById('cover-screen');
    const contentEl  = document.getElementById('invitation-content');
    const audioBtn   = document.getElementById('audio-toggle');

    // Inicia áudio aproveitando o clique
    if (window.AudioController) {
      window.AudioController.startWithFade(2500);
    }

    // ── Fase 1: Botão pulsa e some (0–400ms) ──
    sealBtn.classList.add('seal-clicked');
    setTimeout(() => { sealBtn.style.display = 'none'; }, 400);

    // ── Fase 2: Aba do envelope levanta (400–1200ms) ──
    setTimeout(() => {
      flapEl.classList.add('flap-open');
    }, 400);

    // ── Fase 3: Convite sobe da envelope (900–1600ms) ──
    setTimeout(() => {
      cardEl.classList.add('card-rising');
    }, 900);

    // ── Fase 4: Envelope recua / cover some (1500–2200ms) ──
    setTimeout(() => {
      envelopeEl.classList.add('envelope-recede');
      coverEl.classList.add('cover-fade-out');
    }, 1500);

    // ── Fase 5: Conteúdo do convite revela (2000ms+) ──
    setTimeout(() => {
      contentEl.classList.add('content-visible');
      revealSections();
      if (audioBtn) {
        audioBtn.classList.add('visible');
      }
    }, 2000);

    // ── Fase 6: Remove cover do DOM (2800ms) ──
    setTimeout(() => {
      if (coverEl) coverEl.style.display = 'none';
    }, 2800);
  }

  function revealSections() {
    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('revealed');
      }, index * 180);
    });
  }

  // Animação sutil de flutuação dos elementos decorativos
  function initFloatAnimations() {
    const floaters = document.querySelectorAll('.float-element');
    floaters.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.7}s`;
    });
  }

  // Parallax sutil no scroll
  function initScrollParallax() {
    const decorElements = document.querySelectorAll('[data-parallax]');
    if (!decorElements.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          decorElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.1;
            el.style.transform = `translateY(${scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // RSVP — abre aplicativo de e-mail para susaneadilson@gmail.com
  function initRSVP() {
    const rsvpBtn = document.getElementById('rsvp-btn');
    if (!rsvpBtn) return;
    
    const cfg = window.CONFIG || {};
    const email = "susaneadilson@gmail.com";
    const subject = cfg.rsvpSubject || "Confirmação de Presença — Casamento Susane & Adilson";
    const body = cfg.rsvpBody || `Olá, Susane e Adilson!

Confirmo minha presença na celebração do casamento de vocês no dia 10 de outubro de 2026.

Nome(s): 
Número de acompanhantes: 

Com carinho,`;

    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (rsvpBtn.tagName.toLowerCase() === 'a') {
      rsvpBtn.href = mailto;
    } else {
      rsvpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = mailto;
      });
    }
  }

  function initMapLinks() {
    const churchLink = document.getElementById('map-church');
    const receptionLink = document.getElementById('map-reception');
    const cfg = window.CONFIG;
    if (churchLink && cfg.mapChurch) {
      churchLink.href = cfg.mapChurch;
    }
    if (receptionLink && cfg.mapReception) {
      receptionLink.href = cfg.mapReception;
    }
  }

  function initAudioToggle() {
    const btn = document.getElementById('audio-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (window.AudioController) window.AudioController.toggle();
    });
  }

  function start() {
    AudioController.init();
    init();
    initFloatAnimations();
    initScrollParallax();
    initRSVP();
    initMapLinks();
    initAudioToggle();
  }

  return { start };

})();

document.addEventListener('DOMContentLoaded', () => {
  InvitationAnimation.start();
});
