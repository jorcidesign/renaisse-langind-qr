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

  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background: var(--c-dark); /* Fondo base azul marino */
  }
  .hero-bg img {
    width: 100%; height: 100%; 
    object-fit: cover; 
    object-position: center 30%; 
    filter: brightness(0.8); /* Oscurece un poquito para leer bien */
  }
  /* Gradiente que se funde con tu azul oscuro (--c-dark) */
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

  .hero-eyebrow {
    font-family: var(--font-sans); 
    font-size: var(--text-2xs);
    letter-spacing: 0.2em; 
    text-transform: uppercase; 
    color: var(--c-gold);
    opacity: 0.85; 
    margin-bottom: var(--sp-xs);
  }

  .hero-headline {
    font-family: var(--font-serif); /* Regresa la tipografía Serif */
    font-size: var(--text-4xl); 
    font-weight: 700;
    line-height: 0.9; 
    letter-spacing: -0.02em; 
    text-transform: uppercase;
    color: var(--c-white); 
    margin-bottom: var(--sp-sm);
  }
  .hero-headline em { 
    font-style: italic; 
    color: var(--c-gold); /* El toque dorado original */
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

  /* Botón brutalista pero con los colores de tu marca */
  .hero-cta {
    display: inline-flex; 
    align-items: center; 
    justify-content: center;
    background: var(--c-gold); 
    color: var(--c-dark);
    font-family: var(--font-sans); 
    font-weight: 700; 
    font-size: 0.75rem;
    letter-spacing: 0.15em; 
    text-transform: uppercase;
    padding: 20px 40px; 
    border-radius: 0; /* Rectangular editorial */
    width: 100%;
    max-width: 320px; 
    transition: transform var(--dur-med), box-shadow var(--dur-med);
    border: none;
  }
  
  .hero-cta:hover { 
    transform: translateY(-2px);
    box-shadow: var(--shadow-gold); 
  }
`;

export const renderHero = (): string => {
  injectStyles('hero', css);
  const { heroPromo, brand } = renaisseData;
  const waLink = waURL(brand.whatsappNumber, brand.whatsappMessage);

  // Reconstruimos el título para que la segunda palabra vuelva a ser cursiva dorada
  const headlineHTML = heroPromo.headline
    .map((line, i) => `<span style="display:block">${i === 1 ? `<em>${line}</em>` : line}</span>`)
    .join('');

  // Imagen de prueba temporal
  const placeholderImg = "https://res.cloudinary.com/dhlkqt62w/image/upload/v1779158835/9a1ce629-f71d-49eb-8716-3c028a1e4845.png";

  return `
    <section id="hero" aria-label="Hero">
      <div class="hero-bg" id="hero-bg">
        <img src="${placeholderImg}" alt="Renaisse — Maquillaje profesional" fetchpriority="high" id="hero-img" />
      </div>
      
      <div class="hero-content">
        <p class="hero-eyebrow reveal">40% OFF Primera Vez</p>
        <h1 class="hero-headline reveal reveal-delay-1" id="hero-headline">${headlineHTML}</h1>
        <p class="hero-sub reveal reveal-delay-2" id="hero-sub">${heroPromo.description}</p>
      </div>

      <div class="hero-cta-wrapper reveal reveal-delay-3">
        <a class="hero-cta" id="hero-cta" href="${waLink}" target="_blank" rel="noopener noreferrer">
          Agendar por WhatsApp
        </a>
      </div>
    </section>
  `;
};

// Se mantiene vacía para que no se deforme al hacer scroll
export const initHeroShrink = () => { };