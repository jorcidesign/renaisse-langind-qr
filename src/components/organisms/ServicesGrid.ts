import { injectStyles } from '../../core/dom';
import { renderSectionLabel } from '../atoms/SectionLabel';
import { renderServiceCard } from '../molecules/ServiceCard';
import { renaisseData } from '../../data/renaisse';

const css = `
  #services-stack { padding: var(--sp-4xl) var(--sp-lg); max-width: var(--container); margin: 0 auto; }
  .services-copy {
    color: var(--c-text-muted);
    font-size: var(--text-sm);
    line-height: 1.7;
    margin: calc(var(--sp-2xl) * -0.75) 0 var(--sp-2xl);
    max-width: 44ch;
  }
  .services-grid { display: grid; grid-template-columns: 1fr; gap: var(--sp-md); }

  @media (min-width: 600px) and (max-width: 899px) {
    .services-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (min-width: 900px) {
    #services-stack {
      width: var(--container);
      max-width: none;
      padding: clamp(72px, 8vw, 118px) 0;
    }
    .services-head {
      display: grid;
      grid-template-columns: 1fr minmax(260px, 0.9fr);
      align-items: end;
      gap: var(--sp-3xl);
      margin-bottom: var(--sp-3xl);
    }
    .services-head .section-title { margin-bottom: 0; }
    .services-copy { margin: 0; }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--sp-lg);
    }
    .service-card--featured {
      border-color: rgba(232, 190, 88, 0.48);
      box-shadow: 0 20px 60px rgba(232, 190, 88, 0.12);
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
      return cardHTML.replace('<article class="service-card"', `<article class="service-card${cardClass}"`);
    }).join('');

    return `
    <section id="services-stack" aria-label="Servicios">
      <div class="services-head">
        <div>
          ${renderSectionLabel('01', 'Servicios')}
          <h2 class="section-title reveal">Lo que <em>hacemos</em></h2>
        </div>
        <p class="services-copy reveal reveal-delay-1">Experiencias de belleza personalizadas para cada etapa y momento especial de tu vida.</p>
      </div>
      <div class="services-grid" id="services-grid">
        ${cards}
      </div>
    </section>
  `;
};
