import { injectStyles } from '../../core/dom';

const css = `
  .slide-item {
    flex-shrink: 0;
    width: min(80vw, 320px);
    height: 440px;
    overflow: hidden;
    position: relative;
    background: var(--c-dark);
    border: 1px solid rgba(232,190,88,0.12);
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
    filter: brightness(0.38) contrast(0.92);
    transition: filter 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
    cursor: pointer;
    user-select: none;
    -webkit-user-drag: none;
  }

  .slide-item.is-focused .slide-item__inner img,
  .slide-item:hover .slide-item__inner img {
    filter: brightness(1) contrast(1.05);
  }

  .slide-item:hover .slide-item__inner img {
    transform: scale(1.045);
  }

  .slide-item__meta {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--sp-2xl) var(--sp-lg) var(--sp-lg);
    background: linear-gradient(to top, rgba(7,0,25,0.92) 0%, rgba(7,0,25,0.28) 62%, transparent 100%);
    pointer-events: none;
    opacity: 0.45;
    transition: opacity 0.6s var(--ease-out-expo);
  }

  .slide-item.is-focused .slide-item__meta,
  .slide-item:hover .slide-item__meta {
    opacity: 1;
  }

  .slide-item__label {
    font-family: var(--font-serif);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--c-text);
    line-height: 1.1;
  }

  .slide-item__year {
    font-size: var(--text-2xs);
    letter-spacing: 0.2em;
    color: var(--c-gold);
    text-transform: uppercase;
    margin-top: var(--sp-2xs);
  }

  @media (min-width: 900px) {
    .slide-item {
      width: auto;
      height: auto;
      aspect-ratio: 3/4;
      box-shadow: 0 24px 80px rgba(0,0,0,0.18);
    }

    .slide-item__inner {
      width: 100%;
      left: 0;
      transform: none !important;
    }

    .slide-item__inner img {
      filter: brightness(0.9) contrast(1.02);
    }

    .slide-item__meta {
      opacity: 1;
    }
  }
`;

export const renderSlideItem = (item: any, i: number): string => {
  injectStyles('slide-item', css);
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
