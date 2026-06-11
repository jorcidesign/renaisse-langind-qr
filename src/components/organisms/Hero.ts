import { injectStyles } from '../../core/dom';
import { renaisseData } from '../../data/renaisse';
import { waURL } from '../../core/whatsapp';

const css = `
  #hero {
    position: relative; 
    height: 100svh; 
    min-height: 600px;
    display: flex; 
    flex-direction: column; 
    justify-content: flex-end; 
    padding: 0 var(--sp-xl) var(--sp-2xl); 
    overflow: hidden;
  }

  @media (min-width: 520px) {
    #hero {
      height: 800px; 
      min-height: 800px;
    }
  }

  @media (min-width: 900px) {
    #hero {
      height: 90vh;
      min-height: 700px;
      padding: var(--sp-4xl) var(--sp-2xl) var(--sp-3xl);
      justify-content: center;
    }
    .hero-content {
      max-width: 700px;
      margin-bottom: 0;
    }
    .hero-badge-container { margin-bottom: var(--sp-xl); }
    .hero-headline {
      font-size: clamp(3.5rem, 6vw, 5.5rem);
      line-height: 0.95;
      margin-bottom: var(--sp-lg);
    }
    .hero-sub {
      max-width: 520px;
      font-size: var(--text-md);
    }
    .hero-cta-wrapper {
      justify-content: flex-start;
    }
  }

  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background: var(--c-dark);
  }
  .hero-bg img {
    width: 100%; height: 100%; 
    object-fit: cover; 
    object-position: center 30%; 
    filter: brightness(0.8);
  }
  .hero-bg::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(
      to bottom, 
      rgba(7,3,64,0.4) 0%, 
      transparent 25%, 
      transparent 55%, 
      var(--c-dark) 100%
    );
  }

  .hero-content { 
    position: relative; 
    z-index: 1; 
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    width: 100%;
    margin-bottom: var(--sp-2xl); 
  }

  .hero-badge-container {
    margin-bottom: var(--sp-md);
    z-index: 2;
    align-self: flex-start;
  }

  .hero-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(7, 3, 64, 0.6);
    border: 1px solid rgba(232,190,88,0.4);
    padding: 8px 14px;
    border-radius: 0;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 
      0 8px 32px rgba(0,0,0,0.4),
      inset 0 1px 0 rgba(232,190,88,0.15);

    /* ANIMACIÓN MEJORADA — float con ease cubic premium */
    animation: badge-float 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
  }

  /* KEYFRAME NUEVO — desaceleración orgánica en los extremos */
  @keyframes badge-float {
    0%   { 
      transform: translateY(0px); 
      box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(232,190,88,0.15), 0 0 0 0 rgba(232,190,88,0);
    }
    30%  { 
      transform: translateY(-5px);
    }
    50%  { 
      transform: translateY(-7px); 
      box-shadow: 0 16px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(232,190,88,0.2), 0 0 24px 0 rgba(232,190,88,0.12);
    }
    70%  { 
      transform: translateY(-5px);
    }
    100% { 
      transform: translateY(0px); 
      box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(232,190,88,0.15), 0 0 0 0 rgba(232,190,88,0);
    }
  }

  .badge-number {
    font-family: var(--font-serif);
    font-size: clamp(2rem, 6vw, 2.5rem);
    font-weight: 700;
    line-height: 1;
    background: linear-gradient(160deg, var(--c-gold-lt) 0%, var(--c-gold) 50%, var(--c-gold-dk) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 8px rgba(232,190,88,0.4));
    animation: shimmer 8s linear infinite;
    letter-spacing: -0.02em;
  }

  .badge-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(232,190,88,0.4), transparent);
    margin: 4px 0;
  }

  .badge-label {
    font-family: var(--font-sans);
    font-size: 0.55rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.75);
    white-space: nowrap;
  }

  .badge-off {
    font-family: var(--font-sans);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--c-gold);
    margin-bottom: 2px;
  }

  .hero-headline {
    font-family: var(--font-serif);
    font-size: clamp(2.5rem, 8vw, 4rem); 
    font-weight: 700;
    line-height: 0.9; 
    letter-spacing: -0.02em; 
    text-transform: uppercase;
    color: var(--c-white); 
    margin-bottom: var(--sp-sm);
  }
  .hero-headline em { 
    font-style: italic; 
    color: var(--c-gold);
  }
 
  .hero-sub {
    font-family: var(--font-sans);
    font-size: var(--text-sm); 
    color: rgba(255,255,255,0.7);
    max-width: 90%; 
    line-height: 1.5; 
  }
 
  .hero-cta-wrapper {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: var(--sp-sm);
  }
 
  .hero-cta {
    display: inline-flex; 
    align-items: center; 
    justify-content: center;
    background: var(--c-gold); 
    color: var(--c-dark);
    font-family: var(--font-sans); 
    font-weight: 700; 
    font-size: 0.85rem;
    letter-spacing: 0.15em; 
    text-transform: uppercase;
    padding: 16px 36px; 
    border-radius: 0; 
    width: 100%;
    max-width: 290px; 
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;
    border: none;
    box-shadow: 0 6px 20px rgba(232, 190, 88, 0.2);
  }
  
  .hero-cta:hover { 
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(232, 190, 88, 0.35); 
  }
 
  .hero-cta:active {
    transform: translateY(2px) scale(0.98);
    box-shadow: 0 4px 12px rgba(232, 190, 88, 0.15); 
  }
`;

export const renderHero = (): string => {
  injectStyles('hero', css);
  const { heroPromo, brand } = renaisseData;
  const waLink = waURL(brand.whatsappNumber, brand.whatsappMessage);

  const headlineHTML = heroPromo.headline
    .map((line, i) => `<span style="display:block">${i === 1 ? `<em>${line}</em>` : line}</span>`)
    .join('');

  const placeholderImg = "https://res.cloudinary.com/dhlkqt62w/image/upload/v1779158835/9a1ce629-f71d-49eb-8716-3c028a1e4845.png";

  return `
   <section id="hero" aria-label="Hero">
  <div class="hero-bg" id="hero-bg">
    <img src="${placeholderImg}" alt="Renaisse — Maquillaje profesional" fetchpriority="high" id="hero-img" />
  </div>
  
  <div class="hero-content">
    <div class="hero-badge-container reveal">
      <div class="hero-badge">
        <span class="badge-number">40% OFF</span>
        <div class="badge-divider"></div>
        <span class="badge-label">${heroPromo.badgeLabel}</span>
      </div>
    </div>
    <h1 class="hero-headline reveal reveal-delay-1" id="hero-headline">${headlineHTML}</h1>
    <p class="hero-sub reveal reveal-delay-2" id="hero-sub">${heroPromo.sub}</p>
  </div>

  <div class="hero-cta-wrapper reveal reveal-delay-3">
    <a class="hero-cta" id="hero-cta" href="${waLink}" target="_blank" rel="noopener noreferrer">
      Agendar por WhatsApp
    </a>
  </div>
</section>
  `;
};

export const initHeroShrink = () => { };