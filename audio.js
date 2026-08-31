/**
 * ============================================================
 * CONTROLE DE ÁUDIO — Convite Susane & Adilson
 * ============================================================
 */

const AudioController = (() => {

  let audio = null;
  let isPlaying = false;
  let hasInteracted = false;

  /** Inicializa o elemento de áudio */
  function init() {
    audio = new Audio(window.CONFIG.musicPath);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';

    // Atualiza ícone quando o áudio pausa/toca por qualquer razão
    audio.addEventListener('play', () => {
      isPlaying = true;
      updateUI(true);
    });
    audio.addEventListener('pause', () => {
      isPlaying = false;
      updateUI(false);
    });
    audio.addEventListener('error', () => {
      // Se o arquivo não existir, o botão fica oculto silenciosamente
      const btn = document.getElementById('audio-toggle');
      if (btn) btn.style.display = 'none';
    });
  }

  /** Inicia a música com fade-in suave (chamado no clique de abertura) */
  function startWithFade(duration = 2000) {
    if (!audio || hasInteracted) return;
    hasInteracted = true;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        fadeVolume(0, window.CONFIG.musicVolume, duration);
      }).catch(() => {
        // Autoplay bloqueado — o botão de toggle ainda funciona manualmente
      });
    }
  }

  /** Fade suave de volume de 'from' para 'to' em 'duration' ms */
  function fadeVolume(from, to, duration) {
    if (!audio) return;
    const steps = 60;
    const stepTime = duration / steps;
    const delta = (to - from) / steps;
    let current = from;
    audio.volume = from;

    const interval = setInterval(() => {
      current += delta;
      if ((delta > 0 && current >= to) || (delta < 0 && current <= to)) {
        audio.volume = Math.max(0, Math.min(1, to));
        clearInterval(interval);
      } else {
        audio.volume = Math.max(0, Math.min(1, current));
      }
    }, stepTime);
  }

  /** Alterna play/pause com fade */
  function toggle() {
    if (!audio) return;
    if (isPlaying) {
      fadeVolume(audio.volume, 0, 600);
      setTimeout(() => audio.pause(), 650);
    } else {
      audio.play().then(() => {
        fadeVolume(0, window.CONFIG.musicVolume, 800);
      }).catch(() => {});
    }
  }

  /** Atualiza visualmente o botão de controle */
  function updateUI(playing) {
    const btn = document.getElementById('audio-toggle');
    if (!btn) return;
    const icon = btn.querySelector('.audio-icon');
    const label = btn.querySelector('.audio-label');
    if (icon) icon.textContent = playing ? '♪' : '♩';
    if (label) label.textContent = playing ? 'Pausar' : 'Música';
    btn.classList.toggle('is-playing', playing);
  }

  return { init, startWithFade, toggle };

})();

window.AudioController = AudioController;
