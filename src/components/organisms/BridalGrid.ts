import { injectStyles } from '../../core/dom';
import { renderSectionLabel } from '../atoms/SectionLabel';
import { renderBridalCard } from '../molecules/BridalCard';
import { renaisseData } from '../../data/renaisse';

const css = `
  .bridal-grid { display: flex; flex-direction: column; gap: var(--sp-md); }
`;

export const renderBridalGrid = (): string => {
    injectStyles('bridal-grid', css);
    const cards = renaisseData.bridal.map(renderBridalCard).join('');

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