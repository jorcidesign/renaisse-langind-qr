import { injectStyles } from '../../core/dom';
import { renderSectionLabel } from '../atoms/SectionLabel';
import { renderPackageCard } from '../molecules/PackageCard';
import { renaisseData } from '../../data/renaisse';

const css = `
  .packages-grid { display: grid; grid-template-columns: 1fr; gap: var(--sp-md); }

  @media (min-width: 600px) {
    .packages-grid { grid-template-columns: 1fr 1fr; }
  }
`;

export const renderPackagesGrid = (): string => {
    injectStyles('packages-grid', css);
    const cards = renaisseData.packages.map(renderPackageCard).join('');

    return `
    <section class="section" aria-label="Paquetes">
      ${renderSectionLabel('02', 'Paquetes')}
      <h2 class="section-title reveal">Combos <em>irresistibles</em></h2>
      <div class="packages-grid" id="packages-grid">
        ${cards}
      </div>
    </section>
  `;
};