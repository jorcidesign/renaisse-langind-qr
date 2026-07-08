import { injectStyles } from '../../core/dom';
import comboSocial from '../../assets/images/combo-social.webp';
import comboDuo from '../../assets/images/combo-duo.webp';

const css = `
  .package-card {
    min-height: 250px;
    border-radius: var(--radius-lg);
    padding: var(--sp-xl);
    position: relative;
    overflow: hidden;
    border: 1px solid var(--c-border);
    background: var(--gradient-card);
    transition: transform var(--dur-med) var(--ease-out-expo),
                border-color var(--dur-med),
                box-shadow var(--dur-med) var(--ease-out-expo);
  }

  .package-card:hover {
    transform: translateY(-6px);
    border-color: rgba(232,190,88,0.55);
    box-shadow: 0 24px 80px rgba(0,0,0,.28), 0 0 34px rgba(232,190,88,0.12);
  }

  .package-card__image {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .package-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: right center;
    filter: brightness(0.84) saturate(0.96);
    transform: scale(1.01);
    transition: transform 0.7s var(--ease-out-expo);
  }

  .package-card:hover .package-card__image img {
    transform: scale(1.055);
  }

  .package-card__image::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(7,0,25,0.94) 0%, rgba(7,0,25,0.78) 44%, rgba(7,0,25,0.16) 100%),
      linear-gradient(180deg, rgba(7,0,25,0.12), rgba(7,0,25,0.72));
  }

  .package-card__content {
    position: relative;
    z-index: 1;
    max-width: 310px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .package-card--highlight {
    border-color: rgba(232,190,88,0.58);
    box-shadow: 0 0 40px rgba(232,190,88,0.08);
  }

  .package-card--highlight::before {
    content: 'Más solicitado';
    position: absolute;
    top: var(--sp-md);
    left: var(--sp-xl);
    z-index: 2;
    font-size: var(--text-2xs);
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #160900;
    background: var(--gradient-gold);
    padding: 6px var(--sp-sm);
  }

  .package-card--highlight .package-card__content {
    padding-top: var(--sp-xl);
  }

  .package-card__title {
    font-family: var(--font-serif);
    font-size: clamp(1.55rem, 2vw, 2rem);
    font-weight: 600;
    margin-bottom: var(--sp-sm);
    color: var(--c-text);
  }

  .package-card__tagline {
    display: none;
  }

  .package-card__desc {
    font-size: var(--text-sm);
    line-height: 1.65;
    color: var(--c-text-muted);
    margin-bottom: var(--sp-lg);
  }

  .package-card__bottom {
    margin-top: auto;
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

  .package-price span {
    font-size: var(--text-md);
    font-family: var(--font-sans);
    opacity: 0.65;
  }

  .package-savings {
    font-size: var(--text-2xs);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-text);
    border: 1px solid rgba(232,190,88,0.28);
    background: rgba(232,190,88,0.12);
    padding: 5px var(--sp-xs);
  }

  @media (min-width: 900px) {
    .package-card {
      min-height: 208px;
      padding: var(--sp-2xl);
    }
  }
`;

export const renderPackageCard = (p: any): string => {
  injectStyles('package-card', css);
  const modifier = p.highlight ? 'package-card--highlight' : 'package-card--normal';
  const image = p.highlight ? comboDuo : comboSocial;

  return `
    <article class="package-card ${modifier} reveal">
      <div class="package-card__image" aria-hidden="true">
        <img src="${image}" alt="" loading="lazy" />
      </div>
      <div class="package-card__content">
        <h3 class="package-card__title">${p.title}</h3>
        <p class="package-card__tagline">${p.tagline}</p>
        <p class="package-card__desc">${p.description}</p>
        <div class="package-card__bottom">
          <div class="package-price"><span>S/</span>${p.price}</div>
          <span class="package-savings">${p.savings}</span>
        </div>
      </div>
    </article>
  `;
};
