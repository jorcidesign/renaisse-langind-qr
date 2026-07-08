import { qs, qsa, injectStyles } from '../../core/dom';
import { renderSectionLabel } from '../atoms/SectionLabel';
import { renderAccordionItem } from '../molecules/AccordionItem';
import { renaisseData } from '../../data/renaisse';

const css = `
  #terms {
    padding: var(--sp-4xl) var(--sp-lg);
    max-width: var(--container);
    margin: 0 auto;
    border-top: 1px solid rgba(232,190,88,0.10);
  }
  .accordion-list { display: flex; flex-direction: column; }
  .terms-copy {
    color: var(--c-text-muted);
    font-size: var(--text-sm);
    line-height: 1.8;
    max-width: 32ch;
    margin-top: calc(var(--sp-2xl) * -0.45);
  }

  @media (min-width: 900px) {
    #terms {
      width: var(--container);
      max-width: none;
      padding: clamp(72px, 8vw, 118px) 0;
      display: grid;
      grid-template-columns: 0.85fr 1.15fr;
      gap: var(--sp-4xl);
      align-items: start;
    }
    #terms .section-title { margin-bottom: var(--sp-xl); }
    .terms-copy { margin-top: 0; }
  }
`;

export const renderTermsAccordion = (): string => {
  injectStyles('terms-accordion', css);
  const items = renaisseData.termsAndConditions.map((tc, i) => renderAccordionItem(tc, i)).join('');

  return `
    <section id="terms" aria-label="Términos y condiciones">
      <div>
        ${renderSectionLabel('05', 'Políticas')}
        <h2 class="section-title reveal">Políticas del <em>servicio</em></h2>
        <p class="terms-copy reveal reveal-delay-1">Para una mejor experiencia, te invitamos a conocer nuestras políticas antes de agendar tu cita.</p>
      </div>
      <div class="accordion-list" id="accordion-list">
        ${items}
      </div>
    </section>
  `;
};

export const initAccordion = () => {
  const list = qs('#accordion-list');
  if (!list) return;

  list.addEventListener('click', e => {
    const trigger = (e.target as HTMLElement).closest('.accordion-trigger');
    if (!trigger) return;

    const currentItem = trigger.closest('.accordion-item') as HTMLElement;
    const wasOpen = currentItem.classList.contains('is-open');

    // 1. Cerramos TODOS los items limpiamente y reseteamos su altura
    qsa('.accordion-item', list).forEach(item => {
      item.classList.remove('is-open');
      item.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
      const body = item.querySelector('.accordion-body') as HTMLElement;
      if (body) {
        body.style.maxHeight = '0px';
      }
    });

    // 2. Si el item que clickeamos NO estaba abierto, lo abrimos y calculamos su altura real
    if (!wasOpen) {
      currentItem.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      const body = currentItem.querySelector('.accordion-body') as HTMLElement;
      if (body) {
        body.style.maxHeight = `${body.scrollHeight}px`;
      }
    }
  });
};
