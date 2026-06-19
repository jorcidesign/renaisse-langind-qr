import { injectStyles } from '../../core/dom';
import { renderSectionLabel } from '../atoms/SectionLabel';
import { renderServiceCard } from '../molecules/ServiceCard';
import { renaisseData } from '../../data/renaisse';

const css = `
  #services-stack { padding: 0 var(--sp-lg); max-width: var(--container); margin: 0 auto var(--sp-4xl); }
  .services-grid { display: grid; grid-template-columns: 1fr; gap: var(--sp-md); }

  @media (min-width: 600px) and (max-width: 899px) {
    .services-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (min-width: 900px) {
    #services-stack {
      padding: var(--sp-5xl) var(--sp-3xl);
      margin-bottom: 0;
    }
    .services-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: auto;
      gap: var(--sp-lg);
    }
    .service-card--featured {
      grid-column: 1;
      grid-row: 1 / span 2;
    }
    .service-card--featured.card-shine::before {
      border-radius: 12px;
    }
    .service-card:not(.service-card--featured) {
      grid-column: 2;
    }
  }
`;

export const renderServicesGrid = (): string => {
    injectStyles('services-grid', css);
    const cards = renaisseData.services.map((service, i) => {
      const hasTag = 'tag' in service && service.tag;
      const cardHTML = renderServiceCard(service);
      const cardClass = hasTag ? ' service-card--featured card-shine' : '';
      return cardHTML.replace('<div class="service-card"', `<div class="service-card${cardClass}"`);
    }).join('');

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