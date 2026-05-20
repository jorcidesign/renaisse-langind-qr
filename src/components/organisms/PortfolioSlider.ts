import { qs, qsa, injectStyles } from '../../core/dom';
import { renderSectionLabel } from '../atoms/SectionLabel';
import { renderSlideItem } from '../molecules/SlideItem';
import { renaisseData } from '../../data/renaisse';

const css = `
  #portfolio { overflow: hidden; padding: var(--sp-4xl) 0; }

  .portfolio-header {
    padding: 0 var(--sp-xl);
    max-width: var(--container);
    margin: 0 auto var(--sp-2xl);
  }

  .portfolio-title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--sp-md);
  }

  .portfolio-title-row .section-title {
    margin-bottom: 0; 
  }

  .slider-arrows {
    display: flex;
    gap: 8px;
    padding-bottom: 6px; 
  }

  .slider-arrow {
    width: 44px; 
    height: 44px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 0; 
    color: var(--c-white);
    cursor: pointer;
    display: grid; 
    place-items: center;
    transition: all var(--dur-fast);
  }

  .slider-arrow:hover {
    border-color: var(--c-gold);
    background: var(--c-gold);
    color: var(--c-dark);
  }

  .slider-arrow svg { pointer-events: none; display: block; }

  @media (max-width: 768px) { .slider-arrows { display: none; } }

  .slider-track {
    display: flex;
    gap: var(--sp-md);
    padding: 0 var(--sp-xl) var(--sp-md);
    cursor: grab;
    user-select: none;
    will-change: transform;
    
    /* SCROLL NATIVO: Rápido y fluido */
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch; 
    
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-snap-type: x mandatory;
    position: relative; 
  }

  .slider-track::-webkit-scrollbar { display: none; }
  .slider-track:active { cursor: grabbing; scroll-snap-type: none; }
  .slider-track > * { scroll-snap-align: center; } 

  .slider-hint {
    text-align: center; font-size: var(--text-2xs); letter-spacing: 0.16em;
    text-transform: uppercase; color: rgba(255,255,255,0.4); margin-top: var(--sp-md);
  }

  @media (min-width: 769px) { .slider-hint { display: none; } }
`;

export const renderPortfolioSlider = (): string => {
  injectStyles('portfolio-slider', css);
  const slides = renaisseData.portfolio.map((item, i) => renderSlideItem(item, i)).join('');

  return `
    <section id="portfolio" aria-label="Portafolio">
      <div class="portfolio-header">
        ${renderSectionLabel('04', 'Portafolio')}
        <div class="portfolio-title-row">
          <h2 class="section-title reveal">Nuestra <em>obra</em></h2>
          <div class="slider-arrows reveal">
            <button class="slider-arrow" id="slider-btn-prev" aria-label="Anterior">
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>
              </svg>
            </button>
            <button class="slider-arrow" id="slider-btn-next" aria-label="Siguiente">
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="slider-track reveal reveal-delay-1" id="slider-track">
        ${slides}
      </div>
      <p class="slider-hint reveal reveal-delay-2">← Desliza para explorar →</p>
    </section>
  `;
};

export const initSlider = () => {
  const track = qs<HTMLElement>('#slider-track');
  if (!track) return;

  track.addEventListener('dragstart', e => e.preventDefault());
  track.addEventListener('selectstart', e => e.preventDefault());

  // 1. CONTROLADOR DE FOCO (Ilumina la tarjeta central)
  const focusObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-focused');
      } else {
        entry.target.classList.remove('is-focused');
      }
    });
  }, {
    root: track,
    threshold: 0.6
  });

  qsa('.slide-item', track).forEach(slide => focusObserver.observe(slide));

  // 2. LÓGICA DE ARRASTRE DE ESCRITORIO
  let isDragging = false, startX = 0, scrollLeft = 0;

  track.addEventListener('mousedown', (e: MouseEvent) => {
    isDragging = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
    track.style.scrollSnapType = 'none';
  });

  const stopDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = 'grab';
    setTimeout(() => track.style.removeProperty('scroll-snap-type'), 50);
  };

  document.addEventListener('mouseup', stopDrag);
  track.addEventListener('mouseleave', stopDrag);

  track.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // 3. BOTONES DE NAVEGACIÓN
  const btnPrev = qs<HTMLElement>('#slider-btn-prev');
  const btnNext = qs<HTMLElement>('#slider-btn-next');

  const scrollByCard = (direction: number) => {
    const firstCard = track.querySelector<HTMLElement>('.slide-item');
    if (!firstCard) return;

    const gap = parseInt(getComputedStyle(track).gap) || 16;
    const scrollAmount = (firstCard.offsetWidth + gap) * direction;

    track.style.scrollSnapType = 'none';
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(() => track.style.removeProperty('scroll-snap-type'), 400);
  };

  btnPrev?.addEventListener('click', () => scrollByCard(-1));
  btnNext?.addEventListener('click', () => scrollByCard(1));

  // 4. PARALLAX OPTIMIZADO
  function updateParallax() {
    const trackWidth = track.clientWidth;
    const trackCenter = track.scrollLeft + trackWidth / 2;

    qsa<HTMLElement>('.slide-item', track).forEach(slide => {
      const inner = slide.querySelector<HTMLElement>('[data-parallax="true"]');
      if (!inner) return;

      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const offset = (slideCenter - trackCenter) / trackWidth;

      const moveX = Math.max(-10, Math.min(10, offset * -10));
      inner.style.transform = `translateX(${moveX}%)`;
    });
  }

  let ticking = false;
  track.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  requestAnimationFrame(updateParallax);
};