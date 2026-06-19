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
      grid-template-columns: repeat(3, 1fr);
      gap: var(--sp-lg);
    }
    .service-card--featured {
      transform: scale(1.05);
      border: 2px solid var(--c-gold);
      box-shadow: 0 20px 60px rgba(232, 190, 88, 0.2);
    }
    .service-card--featured.card-shine::before {
      border-radius: 12px;
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