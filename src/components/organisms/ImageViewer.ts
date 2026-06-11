import { qs, qsa, injectStyles } from '../../core/dom';

const css = `
  #image-viewer {
    display: none;
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
  }
  #image-viewer.is-open { display: flex; }

  .viewer-backdrop {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .viewer-close {
    position: absolute;
    top: var(--sp-xl);
    right: var(--sp-xl);
    z-index: 2;
    width: 44px; height: 44px;
    display: grid; place-items: center;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: var(--c-white);
    font-size: 1.25rem;
    cursor: pointer;
    transition: background var(--dur-fast);
  }
  .viewer-close:hover { background: rgba(255,255,255,0.15); }

  .viewer-stage {
    position: relative;
    z-index: 1;
    width: 100%; height: 100%;
    display: grid; place-items: center;
    overflow: hidden;
    padding: var(--sp-4xl);
  }

  .viewer-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: transform 0.2s var(--ease-out-expo);
    will-change: transform;
    cursor: grab;
  }
  .viewer-image:active { cursor: grabbing; }

  .viewer-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    width: 48px; height: 48px;
    display: grid; place-items: center;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: var(--c-white);
    font-size: 1.75rem;
    cursor: pointer;
    transition: background var(--dur-fast);
  }
  .viewer-nav:hover { background: rgba(255,255,255,0.15); }

  .viewer-prev { left: var(--sp-xl); }
  .viewer-next { right: var(--sp-xl); }

  .viewer-zoom-controls {
    position: absolute;
    bottom: var(--sp-2xl);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    align-items: center;
    gap: var(--sp-sm);
    background: rgba(0,0,0,0.6);
    border: 1px solid rgba(255,255,255,0.1);
    padding: var(--sp-xs) var(--sp-sm);
  }

  .viewer-zoom-btn {
    width: 36px; height: 36px;
    display: grid; place-items: center;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.15);
    color: var(--c-white);
    font-size: 1rem;
    cursor: pointer;
    transition: background var(--dur-fast);
  }
  .viewer-zoom-btn:hover { background: rgba(255,255,255,0.1); }

  .viewer-zoom-level {
    font-family: var(--font-sans);
    font-size: var(--text-2xs);
    color: rgba(255,255,255,0.6);
    min-width: 36px;
    text-align: center;
    letter-spacing: 0.05em;
  }

  @media (max-width: 768px) {
    .viewer-nav { display: none; }
  }
`;

export const renderImageViewer = (): string => {
  injectStyles('image-viewer', css);
  return `
    <div id="image-viewer" aria-hidden="true">
      <div class="viewer-backdrop"></div>
      <button class="viewer-close" aria-label="Cerrar">✕</button>
      <button class="viewer-nav viewer-prev" aria-label="Anterior">‹</button>
      <button class="viewer-nav viewer-next" aria-label="Siguiente">›</button>
      <div class="viewer-stage">
        <img class="viewer-image" src="" alt="" />
      </div>
      <div class="viewer-zoom-controls">
        <button class="viewer-zoom-btn" data-zoom="out">−</button>
        <span class="viewer-zoom-level">100%</span>
        <button class="viewer-zoom-btn" data-zoom="in">+</button>
      </div>
    </div>
  `;
};

export const initImageViewer = () => {
  const viewer = qs<HTMLElement>('#image-viewer');
  const backdrop = qs<HTMLElement>('.viewer-backdrop');
  const closeBtn = qs<HTMLElement>('.viewer-close');
  const prevBtn = qs<HTMLElement>('.viewer-prev');
  const nextBtn = qs<HTMLElement>('.viewer-next');
  const stageImg = qs<HTMLImageElement>('.viewer-image');
  const zoomLevel = qs<HTMLElement>('.viewer-zoom-level');
  const zoomOut = qs<HTMLElement>('[data-zoom="out"]');
  const zoomIn = qs<HTMLElement>('[data-zoom="in"]');
  if (!viewer || !stageImg) return;

  let images: { src: string; label: string }[] = [];
  let currentIndex = 0;
  let scale = 1;
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 5;
  const STEP = 0.25;

  const open = (index: number) => {
    if (index < 0 || index >= images.length) return;
    currentIndex = index;
    scale = 1;
    stageImg.src = images[currentIndex].src;
    stageImg.alt = images[currentIndex].label;
    stageImg.style.transform = 'scale(1)';
    zoomLevel.textContent = '100%';
    viewer.setAttribute('aria-hidden', 'false');
    viewer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    scale = 1;
    stageImg.style.transform = 'scale(1)';
  };

  const prev = () => {
    if (currentIndex > 0) open(currentIndex - 1);
  };

  const next = () => {
    if (currentIndex < images.length - 1) open(currentIndex + 1);
  };

  const updateZoom = () => {
    stageImg.style.transform = `scale(${scale})`;
    zoomLevel.textContent = `${Math.round(scale * 100)}%`;
  };

  const zoom = (dir: number) => {
    scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + dir * STEP));
    updateZoom();
  };

  const zoomTo = (s: number) => {
    scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));
    updateZoom();
  };

  backdrop?.addEventListener('click', close);
  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);
  zoomOut?.addEventListener('click', () => zoom(-1));
  zoomIn?.addEventListener('click', () => zoom(1));

  stageImg.addEventListener('wheel', (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1;
    zoom(delta);
  }, { passive: false });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!viewer.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowLeft') { prev(); return; }
    if (e.key === 'ArrowRight') { next(); return; }
    if (e.key === '+' || e.key === '=') { zoom(1); return; }
    if (e.key === '-') { zoom(-1); return; }
  });

  const slides = qsa<HTMLElement>('.slide-item');
  images = slides.map(s => ({
    src: (s.querySelector('img')?.getAttribute('src') || '') as string,
    label: s.querySelector('.slide-item__label')?.textContent || '',
  }));

  slides.forEach((s, i) => {
    s.addEventListener('click', () => open(i));
    s.style.cursor = 'pointer';
  });
};
