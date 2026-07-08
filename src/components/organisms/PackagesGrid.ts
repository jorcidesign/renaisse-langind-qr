import { injectStyles } from '../../core/dom';
import { renderSectionLabel } from '../atoms/SectionLabel';
import { renderPackageCard } from '../molecules/PackageCard';
import { renaisseData } from '../../data/renaisse';

const css = `
  #packages-stack {
    border-top: 1px solid rgba(232,190,88,0.10);
  }
  .packages-grid { display: grid; grid-template-columns: 1fr; gap: var(--sp-md); }

  @media (min-width: 600px) {
    .packages-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (min-width: 900px) {
    .packages-grid {
      grid-template-columns: 1fr 1.25fr;
      align-items: stretch;
      gap: var(--sp-xl);
    }
    .package-card--highlight {
      border: 1px solid rgba(232,190,88,0.35);
      box-shadow: 0 0 40px rgba(232,190,88,0.08);
    }
  }
`;

export const renderPackagesGrid = (): string => {
    injectStyles('packages-grid', css);
    const cards = renaisseData.packages.map((pkg, i) => {
      const cardHTML = renderPackageCard(pkg);
      const hasHighlight = 'highlight' in pkg && pkg.highlight;
      const cardClass = hasHighlight ? ' package-card--highlight reveal reveal-delay-' + (i + 1) : ' reveal reveal-delay-' + (i + 1);
      return cardHTML.replace('<article class="package-card"', `<article class="package-card${cardClass}"`);
    }).join('');

    return `
    <section class="section" id="packages-stack" aria-label="Paquetes">
      ${renderSectionLabel('02', 'Paquetes')}
      <h2 class="section-title reveal">Combos <em>irresistibles</em></h2>
      <div class="packages-grid" id="packages-grid">
        ${cards}
      </div>
    </section>
  `;
};
