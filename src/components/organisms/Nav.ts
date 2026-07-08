import { qs, injectStyles } from '../../core/dom';
import { renaisseData } from '../../data/renaisse';
import { waURL } from '../../core/whatsapp';

const css = `
  #nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: var(--z-nav);
    padding: var(--sp-xl) var(--sp-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    pointer-events: none;
    transition: background var(--dur-med), backdrop-filter var(--dur-med), box-shadow var(--dur-med), padding var(--dur-med);
  }

  #nav.is-sticky {
    position: fixed;
    background: rgba(7, 0, 25, 0.82);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow: 0 1px 0 rgba(232, 190, 88, 0.12);
    padding: var(--sp-md) var(--sp-lg);
  }

  .nav-logo {
    pointer-events: auto;
    font-family: var(--font-serif);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--c-gold);
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .nav-sub {
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(255,248,236,0.58);
  }

  .nav-links,
  .nav-cta {
    display: none;
  }

  @media (min-width: 900px) {
    #nav {
      left: 50%;
      transform: translateX(-50%);
      width: var(--container-wide);
      height: 72px;
      padding: 0;
      display: grid;
      grid-template-columns: 180px 1fr 180px;
      align-items: center;
      gap: var(--sp-xl);
    }

    #nav.is-sticky {
      left: 50%;
      transform: translateX(-50%);
      width: min(100% - 32px, 1240px);
      height: 64px;
      padding: 0 var(--sp-lg);
      border: 1px solid rgba(232, 190, 88, 0.12);
    }

    .nav-sub { display: none; }

    .nav-logo {
      font-size: 1.55rem;
      justify-self: start;
    }

    .nav-links {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(1.25rem, 2.4vw, 2.5rem);
      pointer-events: auto;
    }

    .nav-link {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(255,248,236,0.72);
      transition: color var(--dur-fast), transform var(--dur-fast);
    }

    .nav-link:hover {
      color: var(--c-gold);
      transform: translateY(-1px);
    }

    .nav-cta {
      display: inline-flex;
      justify-self: end;
      align-items: center;
      justify-content: center;
      height: 38px;
      padding: 0 18px;
      background: var(--gradient-gold);
      color: #160900;
      font-size: 0.66rem;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      pointer-events: auto;
      box-shadow: 0 12px 28px rgba(232, 190, 88, 0.18);
      transition: transform var(--dur-med) var(--ease-out-expo), box-shadow var(--dur-med);
    }

    .nav-cta:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-gold);
    }
  }
`;

export const renderNav = (): string => {
  injectStyles('nav', css);
  const { brand } = renaisseData;
  const waLink = waURL(brand.whatsappNumber, brand.whatsappMessage);

  return `
    <nav id="nav" aria-label="Navegación principal">
      <a class="nav-logo" href="#hero">${brand.name}</a>
      <span class="nav-sub">Maquillaje & Peinado</span>
      <div class="nav-links">
        <a class="nav-link" data-section="services">Servicios</a>
        <a class="nav-link" data-section="portfolio">Portafolio</a>
        <a class="nav-link" data-section="packages">Combos</a>
        <a class="nav-link" data-section="bridal">Ocasiones</a>
        <a class="nav-link" data-section="footer">Contacto</a>
      </div>
      <a class="nav-cta" href="${waLink}" target="_blank" rel="noopener noreferrer">Agendar ahora</a>
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
        nav.classList.toggle('is-sticky', window.scrollY > 80);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  nav.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      const target = section ? document.getElementById(`${section}-stack`) || document.getElementById(section) : null;
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });
};
