import { injectStyles } from '../../core/dom';

const css = `
  .slide-item {
    flex-shrink: 0;
    width: min(80vw, 320px);
    height: 440px;
    overflow: hidden;
    position: relative;
    background: var(--c-dark);
    border-radius: 0;
  }

  @media (min-width: 900px) {
    .slide-item {
      width: 340px;
      height: 480px;
    }
  }

  .slide-item__inner {
    width: 120%;
    height: 100%;
    position: absolute;
    top: 0;
    left: -10%; 
    will-change: transform;
  }

  .slide-item__inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    
    /* ESTADO BASE: Oscurecido */
    filter: brightness(0.35) contrast(0.9);
    transition: filter 0.6s var(--ease-out-expo);
    display: block;

    cursor: pointer;
    user-select: none;
    -webkit-user-drag: none;
  }

  /* ESTADO ENFOCADO: Se ilumina la tarjeta central */
  .slide-item.is-focused .slide-item__inner img {
    filter: brightness(1) contrast(1.05);
  }

  .slide-item__meta {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--sp-2xl) var(--sp-lg) var(--sp-lg);
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
    pointer-events: none; 
    
    opacity: 0.4;
    transition: opacity 0.6s var(--ease-out-expo);
  }

  .slide-item.is-focused .slide-item__meta {
    opacity: 1;
  }

  .slide-item__label {
    font-family: var(--font-serif);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--c-white);
    line-height: 1.1;
  }

  .slide-item__year {
    font-family: var(--font-sans);
    font-size: var(--text-2xs);
    letter-spacing: 0.2em;
    color: var(--c-gold);
    text-transform: uppercase;
    margin-top: var(--sp-2xs);
  }
`;

export const renderSlideItem = (item: any, i: number): string => {
  injectStyles('slide-item', css);
  // CORRECCIÓN: Se eliminó la clase 'reveal' para evitar que el contenedor recorte las tarjetas
  return `
    <div class="slide-item" data-index="${i}">
      <div class="slide-item__inner" data-parallax="true">
        <img src="${item.image}" alt="${item.label}" loading="lazy" draggable="false" />
      </div>
      <div class="slide-item__meta">
        <p class="slide-item__label">${item.label}</p>
        <p class="slide-item__year">${item.year}</p>
      </div>
    </div>
  `;
};