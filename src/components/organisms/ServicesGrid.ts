import { injectStyles } from '../../core/dom';
import { renderSectionLabel } from '../atoms/SectionLabel';
import { renderServiceCard } from '../molecules/ServiceCard';
import { renaisseData } from '../../data/renaisse';

const css = `
  #services-stack { padding: 0 var(--sp-lg); max-width: var(--container); margin: 0 auto var(--sp-4xl); }
  .services-grid { display: grid; grid-template-columns: 1fr; gap: var(--sp-md); }

  @media (min-width: 600px) {
    .services-grid { grid-template-columns: 1fr 1fr; }
  }
`;

export const renderServicesGrid = (): string => {
    injectStyles('services-grid', css);
    const cards = renaisseData.services.map(renderServiceCard).join('');

    return `
    <section id="services-stack" aria-label="Servicios">
      ${renderSectionLabel('01', 'Servicios')}
      <h2 class="section-title reveal">Lo que <em>hacemos</em></h2>
      <div class="services-grid" id="services-grid">
        ${cards}
      </div>
    </section>
  `;
};