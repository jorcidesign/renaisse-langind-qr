import { injectStyles } from '../../core/dom';

const css = `
  .service-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(232,190,88,0.12);
    border-radius: var(--radius-lg);
    padding: var(--sp-xl);
    position: relative;
    overflow: hidden;
    transition: border-color var(--dur-med),
                background var(--dur-med),
                transform var(--dur-med) var(--ease-out-expo),
                box-shadow var(--dur-med) var(--ease-out-expo);
  }
  .service-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--c-gold-08), transparent 60%);
    opacity: 0;
    transition: opacity var(--dur-med);
  }
  .service-card:hover { 
    border-color: rgba(232,190,88,0.4); 
    transform: translateY(-6px);
    box-shadow: var(--shadow-card), var(--shadow-gold);
  }
  .service-card:hover::before { opacity: 1; }
  .service-card__tag {
    position: absolute;
    top: var(--sp-md);
    right: var(--sp-md);
    font-size: var(--text-2xs);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-dark);
    background: var(--c-gold);
    padding: 2px var(--sp-xs);
    border-radius: var(--radius-full);
    font-weight: 700;
  }
  .service-card__category {
    font-size: var(--text-2xs);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--c-gold);
    opacity: 0.8;
    margin-bottom: var(--sp-xs);
  }
  .service-card__title {
    font-family: var(--font-serif);
    font-size: var(--text-2xl);
    font-weight: 600;
    line-height: 1.1;
    margin-bottom: var(--sp-xs);
  }
  .service-card__tagline {
    font-size: var(--text-xs);
    color: rgba(255,255,255,0.5);
    margin-bottom: var(--sp-md);
    font-style: italic;
  }
  .service-card__desc {
    font-size: var(--text-sm);
    line-height: 1.65;
    color: rgba(255,255,255,0.65);
    margin-bottom: var(--sp-lg);
  }
  .service-card__prices {
    display: flex;
    gap: var(--sp-md);
    flex-wrap: wrap;
  }
  .price-pill {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .price-pill__label {
    font-size: var(--text-2xs);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }
  .price-pill__value {
    font-family: var(--font-serif);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--c-gold);
  }
  .price-pill__value span {
    font-size: var(--text-sm);
    font-family: var(--font-sans);
    font-weight: 400;
    opacity: 0.6;
  }
`;

export const renderServiceCard = (s: any): string => {
    injectStyles('service-card', css);

    const priceHTML = 'base' in s.prices
        ? `<div class="price-pill">
        <span class="price-pill__label">Desde</span>
        <span class="price-pill__value"><span>S/</span>${s.prices.base}</span>
      </div>`
        : `
      <div class="price-pill">
        <span class="price-pill__label">Domicilio</span>
        <span class="price-pill__value"><span>S/</span>${s.prices.domicilio}</span>
      </div>
      <div class="price-pill">
        <span class="price-pill__label">Estudio</span>
        <span class="price-pill__value"><span>S/</span>${s.prices.estudio}</span>
      </div>`;

    return `
    <article class="service-card reveal">
      ${s.tag ? `<span class="service-card__tag">${s.tag}</span>` : ''}
      <p class="service-card__category">${s.category}</p>
      <h3 class="service-card__title">${s.title}</h3>
      <p class="service-card__tagline">${s.tagline}</p>
      <p class="service-card__desc">${s.description}</p>
      <div class="service-card__prices">${priceHTML}</div>
    </article>
  `;
};