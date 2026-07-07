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
      width: min(1100px, calc(100vw - 48px));
      margin: 0 auto;
      height: 90vh;
      min-height: 700px;
      padding: var(--sp-4xl) clamp(2rem, 3vw, 3rem) var(--sp-3xl);
      justify-content: center;
      align-items: stretch;
      border-radius: 0;
    }
    .hero-bg {
      width: 100%;
      background: #000000;
      filter: brightness(0.72);
    }
    .hero-bg::after {
      background: linear-gradient(
        to right,
        rgba(0,0,0,0.96) 0%,
        rgba(0,0,0,0.88) 36%,
        rgba(0,0,0,0.26) 62%,
        rgba(0,0,0,0) 82%
      );
    }
    .hero-bg img {
      object-fit: cover;
      object-position: 74% center;
      filter: brightness(0.78) contrast(1.02) saturate(0.92);
      transform: none;
    }
    .hero-stage {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(360px, 0.88fr);
      align-items: center;
      gap: clamp(2rem, 4vw, 4rem);
      width: 100%;
      height: 100%;
    }
    .hero-content {
      position: relative;
      left: auto;
      top: auto;
      transform: none;
      padding-left: 0;
      max-width: 560px;
      margin: 0;
      align-self: center;
    }
    .hero-badge-container {
      margin-bottom: var(--sp-xl);
      align-self: flex-start;
    }
    .hero-headline {
      font-size: clamp(4rem, 5.8vw, 6.8rem);
      line-height: 0.92;
      letter-spacing: -0.02em;
      margin-bottom: var(--sp-lg);
      text-align: left;
    }
    .hero-sub {
      max-width: 36ch;
      font-size: var(--text-md);
      opacity: 0.82;
      text-align: left;
    }
    .hero-ornament {
      position: relative;
      display: block;
      height: 28px;
      margin-bottom: var(--sp-md);
      min-width: 150px;
    }
    .hero-word {
      font-family: var(--font-serif);
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--c-dark);
      position: absolute;
      white-space: nowrap;
      left: 0;
      top: 0;
      opacity: 0;
      animation: word-cycle 12s linear infinite;
    }
    .hero-word:nth-child(1) { animation-delay: 0s; }
    .hero-word:nth-child(2) { animation-delay: 3s; }
    .hero-word:nth-child(3) { animation-delay: 6s; }
    .hero-word:nth-child(4) { animation-delay: 9s; }
    @keyframes word-cycle {
      0%, 100% { opacity: 0; }
      10% { opacity: 1; }
      40% { opacity: 1; }
      50% { opacity: 0; }
    }
    .hero-cta-wrapper {
      justify-content: flex-start;
      margin-top: var(--sp-xl);
      align-self: flex-start;
    }
    .hero-cta {
      display: inline-block;
      max-width: 100%;
      width: auto;
      padding: 20px 40px;
      position: relative;
      overflow: hidden;
      border: none;
      background: var(--c-gold);
      color: var(--c-dark);
      font-size: var(--text-sm);
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      transition: transform var(--dur-med) var(--ease-out-expo), box-shadow var(--dur-med);
      box-shadow: 0 6px 20px rgba(232, 190, 88, 0.2);
    }
    .hero-cta:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-gold);
    }
  }

  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background: #000000;
  }
  .hero-bg img {
    width: 100%; height: 100%; 
    object-fit: cover; 
    object-position: center 30%; 
    filter: brightness(0.72);
  }
  .hero-bg::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(
      to bottom, 
      rgba(0,0,0,0.4) 0%, 
      transparent 25%, 
      transparent 55%, 
      #000000 100%
    );
  }

  .hero-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: var(--sp-3xl);
  }

  .hero-ornament {
    display: none;
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

  @media (min-width: 900px) {
    .hero-headline em {
      animation: none;
      background: linear-gradient(90deg,
              var(--c-gold-dk) 0%,
              var(--c-gold) 40%,
              var(--c-gold-lt) 55%,
              var(--c-gold) 70%,
              var(--c-gold-dk) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }
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
    justify-content: flex-start;
    margin-bottom: var(--sp-sm);
    margin-top: var(--sp-lg);
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
    white-space: nowrap;
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

  @media (max-width: 899px) {
    .hero-cta-wrapper {
      justify-content: center;
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

  const placeholderImg = "https://res.cloudinary.com/dhlkqt62w/image/upload/v1779158835/9a1ce629-f71d-49eb-8716-3c028a1e4845.png";

  return `
   <section id="hero" aria-label="Hero">
    <div class="hero-bg" id="hero-bg">
      <img src="${placeholderImg}" alt="Renaisse — Maquillaje profesional" fetchpriority="high" id="hero-img" />
    </div>

    <div class="hero-stage">
      <div class="hero-content">
        <div class="hero-badge-container reveal">
          <div class="hero-badge">
            <span class="badge-number">${heroPromo.badge}</span>
            <div class="badge-divider"></div>
            <span class="badge-label">${heroPromo.badgeLabel}</span>
          </div>
        </div>
        <h1 class="hero-headline reveal reveal-delay-1" id="hero-headline">${headlineHTML}</h1>
        <div class="hero-ornament reveal reveal-delay-2" id="hero-words">
          <div class="hero-word">Maquillaje</div>
          <div class="hero-word">Peinado</div>
          <div class="hero-word">Renacer</div>
          <div class="hero-word">Belleza</div>
        </div>
        <p class="hero-sub reveal reveal-delay-2" id="hero-sub">${heroPromo.sub}</p>

        <div class="hero-cta-wrapper reveal reveal-delay-3">
          <a class="hero-cta" id="hero-cta" href="${waLink}" target="_blank" rel="noopener noreferrer">
            Agendar Ahora
          </a>
        </div>
      </div>
    </div>
</section>
  `;
};

export const initHeroShrink = () => { };
