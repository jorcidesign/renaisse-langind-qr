import { injectStyles } from '../../core/dom';

const css = `
  .section-label {
    display: flex;
    align-items: center;
    gap: var(--sp-sm);
    margin-bottom: var(--sp-2xl);
  }
  .section-label__num {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--c-gold);
    opacity: 0.6;
  }
  .section-label__line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, var(--c-gold-20), transparent);
  }
  .section-label__text {
    font-family: var(--font-sans);
    font-size: var(--text-2xs);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
  }
`;

export const renderSectionLabel = (num: string, text: string): string => {
    injectStyles('section-label', css);
    return `
    <div class="section-label reveal">
      <span class="section-label__num">${num}</span>
      <span class="section-label__line"></span>
      <span class="section-label__text">${text}</span>
    </div>
  `;
};