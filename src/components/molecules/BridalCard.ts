import { injectStyles } from '../../core/dom';

const css = `
  .bridal-card {
    position: relative;
    background: linear-gradient(135deg, rgba(232,190,88,0.06) 0%, rgba(7,3,64,0.4) 100%);
    border: 1px solid rgba(232,190,88,0.2);
    border-radius: var(--radius-lg);
    padding: var(--sp-xl);
    overflow: hidden;
    transition: transform var(--dur-med) var(--ease-out-expo),
                box-shadow var(--dur-med) var(--ease-out-expo);
  }
  .bridal-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-card), var(--shadow-gold);
  }
  .bridal-card::after {
    content: '♦';
    position: absolute;
    bottom: var(--sp-md);
    right: var(--sp-lg);
    font-size: 4rem;
    color: var(--c-gold);
    opacity: 0.06;
    font-family: var(--font-serif);
  }
  .bridal-card__title {
    font-family: var(--font-serif);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--c-gold);
    margin-bottom: var(--sp-md);
  }
  .bridal-card__desc {
    font-size: var(--text-sm);
    line-height: 1.7;
    color: rgba(255,255,255,0.65);
    margin-bottom: var(--sp-xl);
  }
  .bridal-price {
    font-family: var(--font-serif);
    font-size: var(--text-3xl);
    font-weight: 700;
    color: var(--c-white);
  }
  .bridal-price span { font-size: var(--text-md); font-family: var(--font-sans); opacity: 0.5; }
`;

export const renderBridalCard = (b: any): string => {
    injectStyles('bridal-card', css);
    return `
    <article class="bridal-card reveal">
      <h3 class="bridal-card__title">${b.title}</h3>
      <p class="bridal-card__desc">${b.description}</p>
      <div class="bridal-price"><span>S/</span>${b.price}</div>
    </article>
  `;
};