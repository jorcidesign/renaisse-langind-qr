import { injectStyles } from '../../core/dom';
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
  }
  .nav-logo { 
    pointer-events: auto;
    font-family: var(--font-serif); /* Vuelve a tu fuente elegante */
    font-size: var(--text-2xl); 
    font-weight: 600; 
    color: var(--c-gold); /* Vuelve el dorado */
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

  @media (min-width: 520px) {
    #nav { padding-top: calc(var(--sp-2xl) + 12px); }
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