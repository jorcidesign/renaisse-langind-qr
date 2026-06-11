import { qs, injectStyles } from '../../core/dom';
import { renaisseData } from '../../data/renaisse';

const css = `
  #nav {
    position: absolute;
    top: 0; left: 0; width: 100%;
    z-index: var(--z-nav);
    padding: var(--sp-2xl) var(--sp-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    pointer-events: none;
    transition: background var(--dur-med), backdrop-filter var(--dur-med), box-shadow var(--dur-med), padding var(--dur-med);
  }
  #nav.is-sticky {
    position: fixed;
    background: rgba(7, 3, 64, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 1px 0 rgba(232, 190, 88, 0.08);
    padding: var(--sp-lg) var(--sp-xl);
  }
  .nav-logo {
    pointer-events: auto;
    font-family: var(--font-serif);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--c-gold);
    line-height: 1;
    transition: font-size var(--dur-med);
  }
  #nav.is-sticky .nav-logo {
    font-size: var(--text-xl);
  }
  .nav-sub {
    font-family: var(--font-sans);
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
  }

  @media (min-width: 520px) {
    #nav { padding: calc(var(--sp-2xl) + 12px) var(--sp-lg); }
    #nav.is-sticky { padding: var(--sp-lg) var(--sp-xl); }
  }
`;

export const renderNav = (): string => {
  injectStyles('nav', css);
  return `
    <nav id="nav" aria-label="Navegación principal">
      <span class="nav-logo">${renaisseData.brand.name}</span>
      <span class="nav-sub">Maquillaje & Peinado</span>
    </nav>
  `;
};

export const initNav = () => {
  const nav = qs<HTMLElement>('#nav');
  if (!nav) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('is-sticky', window.scrollY > 100);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
};