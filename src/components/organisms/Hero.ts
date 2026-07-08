import { injectStyles } from '../../core/dom';
import { renaisseData } from '../../data/renaisse';
import { waURL } from '../../core/whatsapp';
import heroImage from '../../assets/images/hero-renaisse.webp';
import heroMobileImage from '../../assets/images/hero-renaisse-mobile.webp';

const css = `
  #hero {
    position: relative;
    min-height: 100svh;
    overflow: hidden;
    padding: 8rem var(--sp-lg) var(--sp-2xl);
    display: flex;
    align-items: flex-end;
    background:
      radial-gradient(circle at 16% 18%, rgba(108,43,255,0.42), transparent 34%),
      radial-gradient(circle at 78% 12%, rgba(74,12,88,0.44), transparent 34%),
      linear-gradient(180deg, #070019 0%, #12042f 100%);
    border-bottom: 1px solid rgba(232,190,88,0.14);
  }

  #hero::before {
    content: 'Renaisse';
    position: absolute;
    right: -0.08em;
    top: 10%;
    font-family: var(--font-serif);
    font-size: clamp(7rem, 18vw, 18rem);
    font-weight: 700;
    line-height: 0.8;
    color: rgba(255,248,236,0.035);
    writing-mode: vertical-rl;
    pointer-events: none;
    z-index: 1;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-bg picture,
  .hero-bg img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .hero-bg img {
    object-fit: cover;
    object-position: 58% center;
    filter: brightness(0.86) contrast(1.04) saturate(0.96);
  }

  .hero-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(7,0,25,0.08) 0%, rgba(7,0,25,0.08) 44%, rgba(7,0,25,0.94) 100%),
      linear-gradient(90deg, rgba(7,0,25,0.74) 0%, rgba(7,0,25,0.18) 62%, rgba(7,0,25,0.04) 100%);
  }

  .hero-stage {
    position: relative;
    z-index: 2;
    width: 100%;
  }

  .hero-content {
    width: min(100%, 560px);
  }

  .hero-eyebrow {
    margin-bottom: var(--sp-md);
    color: var(--c-gold);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .hero-headline {
    font-family: var(--font-serif);
    font-size: clamp(3.1rem, 15vw, 5.7rem);
    font-weight: 700;
    line-height: 0.92;
    letter-spacing: -0.045em;
    color: var(--c-text);
    margin-bottom: var(--sp-lg);
    text-transform: none;
  }

  .hero-headline em {
    color: var(--c-gold);
    font-style: italic;
    font-weight: 600;
  }

  .hero-sub {
    max-width: 38ch;
    color: var(--c-text-muted);
    font-size: var(--text-sm);
    line-height: 1.7;
    margin-bottom: var(--sp-xl);
  }

  .hero-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 52px;
    padding: 0 28px;
    background: var(--gradient-gold);
    color: #160900;
    font-weight: 800;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    box-shadow: 0 16px 40px rgba(232,190,88,0.2);
    transition: transform var(--dur-med) var(--ease-out-expo), box-shadow var(--dur-med);
  }

  .hero-cta::after {
    content: '↗';
    margin-left: 10px;
    font-size: 1rem;
    line-height: 1;
    transition: transform var(--dur-med) var(--ease-out-expo);
  }

  .hero-cta:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-gold);
  }

  .hero-cta:hover::after {
    transform: translate(3px, -3px);
  }

  .hero-benefits {
    display: grid;
    gap: var(--sp-md);
    margin-top: var(--sp-2xl);
    color: rgba(255,248,236,0.72);
  }

  .hero-benefit {
    display: flex;
    align-items: center;
    gap: var(--sp-sm);
    font-size: 0.74rem;
    line-height: 1.35;
  }

  .hero-benefit svg {
    flex: 0 0 auto;
    width: 22px;
    height: 22px;
    color: var(--c-gold);
  }

  @media (min-width: 768px) {
    #hero {
      min-height: 780px;
      padding-inline: var(--sp-2xl);
    }

    .hero-benefits {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      max-width: 720px;
    }
  }

  @media (min-width: 1024px) {
    #hero {
      min-height: 760px;
      height: 100svh;
      padding: 72px 0 0;
      align-items: center;
    }

    .hero-bg img {
      object-position: 74% center;
    }

    .hero-bg::after {
      background:
        linear-gradient(180deg, rgba(7,0,25,0.18) 0%, rgba(7,0,25,0) 58%, rgba(7,0,25,0.88) 100%),
        linear-gradient(90deg, rgba(7,0,25,0.98) 0%, rgba(13,3,40,0.88) 32%, rgba(13,3,40,0.22) 62%, rgba(7,0,25,0.2) 100%);
    }

    .hero-stage {
      width: var(--container-wide);
      margin-inline: auto;
      display: grid;
      grid-template-columns: 0.92fr 1.08fr;
      align-items: center;
      min-height: 760px;
    }

    .hero-content {
      padding-top: 2rem;
    }

    .hero-headline {
      font-size: clamp(4.5rem, 8vw, 8.5rem);
      max-width: 8ch;
    }

    .hero-sub {
      font-size: 1rem;
    }

    .hero-benefits {
      margin-top: var(--sp-3xl);
      max-width: 760px;
      gap: var(--sp-lg);
    }
  }
`;

export const renderHero = (): string => {
  injectStyles('hero', css);
  const { heroPromo, brand } = renaisseData;
  const waLink = waURL(brand.whatsappNumber, brand.whatsappMessage);

  const headlineHTML = heroPromo.headline
    .map((line, i) => `<span style="display:block">${i === 1 ? `<em>${line}</em>` : line}</span>`)
    .join('');

  return `
    <section id="hero" aria-label="Hero">
      <div class="hero-bg" id="hero-bg">
        <picture>
          <source srcset="${heroImage}" media="(min-width: 768px)" />
          <img src="${heroMobileImage}" alt="Renaisse — Maquillaje profesional" fetchpriority="high" id="hero-img" />
        </picture>
      </div>

      <div class="hero-stage">
        <div class="hero-content">
          <p class="hero-eyebrow reveal">Realza tu esencia</p>
          <h1 class="hero-headline reveal reveal-delay-1" id="hero-headline">${headlineHTML}</h1>
          <p class="hero-sub reveal reveal-delay-2" id="hero-sub">${heroPromo.sub}</p>
          <a class="hero-cta reveal reveal-delay-3" id="hero-cta" href="${waLink}" target="_blank" rel="noopener noreferrer">
            ${heroPromo.cta}
          </a>

          <div class="hero-benefits reveal reveal-delay-3">
            <div class="hero-benefit">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l2.2 4.7 5.1.6-3.8 3.5 1 5-4.5-2.5-4.5 2.5 1-5-3.8-3.5 5.1-.6L12 3z" stroke="currentColor" stroke-width="1.4"/></svg>
              <span>Productos premium<br />Alta duración</span>
            </div>
            <div class="hero-benefit">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-7-4.4-7-11a4 4 0 017-2.6A4 4 0 0119 10c0 6.6-7 11-7 11z" stroke="currentColor" stroke-width="1.4"/></svg>
              <span>Atención personalizada<br />100% a tu medida</span>
            </div>
            <div class="hero-benefit">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 12l3 3 7-8M12 22a10 10 0 100-20 10 10 0 000 20z" stroke="currentColor" stroke-width="1.4"/></svg>
              <span>Estilo que te representa<br />Natural o glam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
};

export const initHeroShrink = () => { };
