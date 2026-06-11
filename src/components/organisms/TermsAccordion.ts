import { qs, qsa, injectStyles } from '../../core/dom';
import { renderSectionLabel } from '../atoms/SectionLabel';
import { renderAccordionItem } from '../molecules/AccordionItem';
import { renaisseData } from '../../data/renaisse';

const css = `
  #terms { padding: var(--sp-4xl) var(--sp-lg); max-width: var(--container); margin: 0 auto; }
  .accordion-list { display: flex; flex-direction: column; }

  @media (min-width: 900px) {
    #terms { padding: var(--sp-5xl) var(--sp-2xl); }
  }
`;

export const renderTermsAccordion = (): string => {
  injectStyles('terms-accordion', css);
  const items = renaisseData.termsAndConditions.map((tc, i) => renderAccordionItem(tc, i)).join('');

  return `
    <section id="terms" aria-label="Términos y condiciones">
      ${renderSectionLabel('05', 'Términos & Condiciones')}
      <h2 class="section-title reveal">Políticas del <em>servicio</em></h2>
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