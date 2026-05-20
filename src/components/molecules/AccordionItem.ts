import { injectStyles } from '../../core/dom';

const css = `
  .accordion-item {
    border-bottom: 1px solid rgba(232,190,88,0.2);
  }
  .accordion-trigger {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--sp-lg) 0;
    text-align: left;
    cursor: pointer;
    transition: color var(--dur-fast);
  }
  .accordion-trigger:hover .acc-title { color: var(--c-gold); }
  
  .acc-title {
    font-family: var(--font-sans);
    font-size: var(--text-md);
    font-weight: 400; /* Look limpio sin negritas */
    color: var(--c-white);
    transition: color var(--dur-fast);
  }
  
  .acc-icon {
    flex-shrink: 0;
    width: 20px; height: 20px;
    position: relative;
    transition: transform var(--dur-med) var(--ease-out-expo);
  }
  .acc-icon::before,
  .acc-icon::after {
    content: '';
    position: absolute;
    background: var(--c-gold);
    border-radius: 2px;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    transition: transform var(--dur-med) var(--ease-out-expo),
                opacity var(--dur-med);
  }
  .acc-icon::before { width: 12px; height: 1.5px; }
  .acc-icon::after  { width: 1.5px; height: 12px; }
  
  .accordion-item.is-open .acc-icon::after { opacity: 0; transform: translate(-50%,-50%) rotate(90deg); }
  
  /* Contenedor principal: maneja solo la altura */
  .accordion-body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s var(--ease-out-expo);
  }
  .accordion-item.is-open .accordion-body { 
    max-height: 400px; 
  } 
  
  .accordion-body-inner {
    padding-bottom: var(--sp-lg);
  }
  
  .accordion-body p {
    font-size: var(--text-sm);
    line-height: 1.7;
    color: rgba(255,255,255,0.75);
  }
  
  /* Animación del texto interior más ligera (evita el bloqueo del navegador) */
  .accordion-body-line {
    display: block;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s ease, transform 0.4s var(--ease-out-expo);
  }
  
  .accordion-item.is-open .accordion-body-line {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 100ms; /* Espera un instante a que el contenedor empiece a abrirse */
  }
`;

export const renderAccordionItem = (tc: any, i: number): string => {
  injectStyles('accordion-item', css);
  return `
    <div class="accordion-item" data-index="${i}">
      <button class="accordion-trigger" aria-expanded="false">
        <span class="acc-title">${tc.title}</span>
        <span class="acc-icon" aria-hidden="true"></span>
      </button>
      <div class="accordion-body" role="region">
        <div class="accordion-body-inner">
          <p class="accordion-body-line">${tc.body}</p>
        </div>
      </div>
    </div>
  `;
};