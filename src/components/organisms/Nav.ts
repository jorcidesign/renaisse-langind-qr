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
  }
  .nav-sub {
    font-family: var(--font-sans);
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
  }

  .nav-links {
    display: none;
  }

  @media (min-width: 520px) {
    #nav { padding: calc(var(--sp-2xl) + 12px) var(--sp-lg); }
    #nav.is-sticky { padding: var(--sp-lg) var(--sp-xl); }
  }

  @media (min-width: 900px) {
    #nav {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: var(--sp-xl) var(--sp-3xl);
      left: 50%;
      transform: translateX(-50%);
      width: min(1100px, calc(100vw - 48px));
    }
    #nav.is-sticky {
      position: fixed;
      left: 50%;
      right: auto;
      transform: translateX(-50%);
      width: min(1100px, calc(100vw - 48px));
      padding: var(--sp-xl) var(--sp-3xl);
    }
    .nav-logo {
      pointer-events: auto;
    }
    .nav-sub {
      display: none;
    }
    .nav-links {
      display: flex;
      gap: var(--sp-xl);
      align-items: center;
      pointer-events: auto;
    }
    .nav-link {
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      transition: color var(--dur-med) ease;
      cursor: pointer;
    }
    .nav-link:hover {
      color: var(--c-gold);
    }
  }
`;

export const renderNav = (): string => {
  injectStyles('nav', css);
  return `
    <nav id="nav" aria-label="Navegación principal">
      <div class="nav-logo">${renaisseData.brand.name}</div>
      <span class="nav-sub">Maquillaje & Peinado</span>
      <div class="nav-links">
        <a class="nav-link" data-section="services">Servicios</a>
        <a class="nav-link" data-section="packages">Paquetes</a>
        <a class="nav-link" data-section="portfolio">Portafolio</a>
        <a class="nav-link" data-section="terms">Términos</a>
      </div>
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

  // Smooth scroll a secciones en desktop
  const navLinks = nav.querySelectorAll<HTMLAnchorElement>('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      const target = section ? document.getElementById(section + '-stack') || document.getElementById(section) : null;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
};
