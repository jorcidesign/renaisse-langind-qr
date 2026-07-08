import { injectStyles } from '../../core/dom';

const css = `
  .service-card {
    min-height: 100%;
    background: var(--gradient-card);
    border: 1px solid var(--c-border);
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
    background:
      radial-gradient(circle at 18% 16%, rgba(232,190,88,0.14), transparent 28%),
      linear-gradient(135deg, var(--c-gold-08), transparent 60%);
    opacity: 0;
    transition: opacity var(--dur-med);
  }
  .service-card:hover { 
    border-color: rgba(232,190,88,0.55);
    background: linear-gradient(145deg, rgba(255,255,255,.095), rgba(255,255,255,.035));
    transform: translateY(-6px);
    box-shadow: 0 24px 80px rgba(0,0,0,.25), 0 0 34px rgba(232,190,88,0.12);
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
  .service-card__icon {
    width: 34px;
    height: 34px;
    color: var(--c-gold);
    margin-bottom: var(--sp-lg);
  }
  .service-card__icon svg {
    width: 100%;
    height: 100%;
    display: block;
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
    font-size: clamp(1.7rem, 2vw, 2.05rem);
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
    color: var(--c-text-muted);
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
    color: var(--c-text-soft);
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

  @media (min-width: 900px) {
    .service-card {
      padding: var(--sp-xl);
      display: flex;
      flex-direction: column;
    }
    .service-card__prices { margin-top: auto; }
  }
`;

export const renderServiceCard = (s: any): string => {
    injectStyles('service-card', css);

    const icons: Record<string, string> = {
      'makeup-social': '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l1.7 3.9L18 8.5l-4.3 1.6L12 14l-1.7-3.9L6 8.5l4.3-1.6L12 3zM6 14l.9 2.1L9 17l-2.1.9L6 20l-.9-2.1L3 17l2.1-.9L6 14zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9L18 14z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
      'hair-pro': '<svg viewBox="0 0 24 24" fill="none"><path d="M6 20c7-1 11-5 11-12V4M11 20c5-2 8-6 8-12M7 4h10l2 4H5l2-4z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      'hair-others': '<svg viewBox="0 0 24 24" fill="none"><path d="M4 12c2-3 4.6-4.5 8-4.5S18 9 20 12c-2 3-4.6 4.5-8 4.5S6 15 4 12z" stroke="currentColor" stroke-width="1.4"/><path d="M7 8.5c1 2.4 2.7 3.6 5 3.6s4-1.2 5-3.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
      'image-consulting': '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l1.2 3.2L16.5 7.5l-3.3 1.3L12 12l-1.2-3.2-3.3-1.3 3.3-1.3L12 3zM18 11l.8 2.2L21 14l-2.2.8L18 17l-.8-2.2L15 14l2.2-.8L18 11zM6 13l.8 2.2L9 16l-2.2.8L6 19l-.8-2.2L3 16l2.2-.8L6 13z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    };

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
      <div class="service-card__icon" aria-hidden="true">${icons[s.id] ?? icons['makeup-social']}</div>
      <p class="service-card__category">${s.category}</p>
      <h3 class="service-card__title">${s.title}</h3>
      <p class="service-card__tagline">${s.tagline}</p>
      <p class="service-card__desc">${s.description}</p>
      <div class="service-card__prices">${priceHTML}</div>
    </article>
  `;
};
