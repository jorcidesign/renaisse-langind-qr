import { injectStyles } from '../../core/dom';

const css = `
  .package-card {
    border-radius: var(--radius-lg);
    padding: var(--sp-xl);
    position: relative;
    overflow: hidden;
    border: 1px solid transparent;
    transition: transform var(--dur-med) var(--ease-out-expo),
                box-shadow var(--dur-med) var(--ease-out-expo);
  }
  .package-card:hover {
    transform: translateY(-6px);
  }
  .package-card--normal {
    background: rgba(255,255,255,0.04);
    border-color: rgba(255,255,255,0.08);
  }
  .package-card--normal:hover { box-shadow: var(--shadow-card); }
  
  .package-card--highlight {
    background: var(--c-dark);
    border-color: var(--c-gold);
    box-shadow: var(--shadow-gold);
  }
  .package-card--highlight:hover { box-shadow: var(--shadow-card), var(--shadow-gold); }
  
  .package-card--highlight::before {
    content: 'Recomendado';
    position: absolute;
    top: 0; right: var(--sp-xl);
    font-size: var(--text-2xs);
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--c-dark);
    background: var(--c-gold);
    padding: 3px var(--sp-sm);
    border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  }
  .package-card__title {
    font-family: var(--font-serif);
    font-size: var(--text-2xl);
    font-weight: 600;
    margin-bottom: var(--sp-xs);
  }
  .package-card--highlight .package-card__title { color: var(--c-gold); }
  .package-card__tagline {
    font-size: var(--text-xs);
    color: rgba(255,255,255,0.5);
    font-style: italic;
    margin-bottom: var(--sp-sm);
  }
  .package-card__desc {
    font-size: var(--text-sm);
    line-height: 1.65;
    color: rgba(255,255,255,0.6);
    margin-bottom: var(--sp-lg);
  }
  .package-card__bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--sp-sm);
  }
  .package-price {
    font-family: var(--font-serif);
    font-size: var(--text-3xl);
    font-weight: 700;
    color: var(--c-gold);
    line-height: 1;
  }
  .package-price span { font-size: var(--text-md); font-family: var(--font-sans); opacity: 0.6; }
  .package-savings {
    font-size: var(--text-2xs);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--c-white);
    background: rgba(232,190,88,0.15);
    border: 1px solid rgba(232,190,88,0.3);
    padding: 3px var(--sp-xs);
    border-radius: var(--radius-full);
  }

  @media (min-width: 900px) {
    .package-card { padding: var(--sp-2xl); }
  }
`;

export const renderPackageCard = (p: any): string => {
    injectStyles('package-card', css);
    const modifier = p.highlight ? 'package-card--highlight' : 'package-card--normal';

    return `
    <article class="package-card ${modifier} reveal">
      <h3 class="package-card__title">${p.title}</h3>
      <p class="package-card__tagline">${p.tagline}</p>
      <p class="package-card__desc">${p.description}</p>
      <div class="package-card__bottom">
        <div class="package-price"><span>S/</span>${p.price}</div>
        <span class="package-savings">${p.savings}</span>
      </div>
    </article>
  `;
};