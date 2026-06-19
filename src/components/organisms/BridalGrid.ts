import { injectStyles } from '../../core/dom';
import { renderSectionLabel } from '../atoms/SectionLabel';
import { renderBridalCard } from '../molecules/BridalCard';
import { renaisseData } from '../../data/renaisse';

const css = `
  .bridal-grid { display: grid; grid-template-columns: 1fr; gap: var(--sp-md); }

  @media (min-width: 600px) {
    .bridal-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (min-width: 900px) {
    .bridal-grid {
      grid-template-columns: 1fr 1fr;
      align-items: stretch;
      gap: var(--sp-xl);
    }
    .bridal-card--highlight {
      border: 1px solid rgba(232,190,88,0.35);
      box-shadow: 0 0 40px rgba(232,190,88,0.08);
    }
  }
`;

export const renderBridalGrid = (): string => {
    injectStyles('bridal-grid', css);
    const cards = renaisseData.bridal.map((bridal, i) => {
      const cardHTML = renderBridalCard(bridal);
      const hasHighlight = 'highlight' in bridal && bridal.highlight;
      const cardClass = hasHighlight ? ' bridal-card--highlight reveal reveal-delay-' + (i + 1) : ' reveal reveal-delay-' + (i + 1);
      return cardHTML.replace('<div class="bridal-card"', `<div class="bridal-card${cardClass}"`);
    }).join('');

    return `
    <section class="section" aria-label="Novias">
      ${renderSectionLabel('03', 'Novias')}
      <h2 class="section-title reveal">Tu día <em>perfecto</em></h2>
      <div class="bridal-grid" id="bridal-grid">
        ${cards}
      </div>
    </section>
  `;
};