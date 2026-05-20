// src/main.ts — Renaisse (Arquitectura corregida, basada en Innograf)

// ── 1. Estilos Globales (El orden importa para Vite) ──────────────────
import './design-system/tokens.css';
import './design-system/animations.css';
import './design-system/global.css';

// ── 2. Datos y Utilidades ─────────────────────────────────────────────
import { qs } from './core/dom';
import { waURL } from './core/whatsapp';
import { renaisseData } from './data/renaisse';
import { initRevealObserver } from './core/observers';

// ── 3. Componentes ────────────────────────────────────────────────────
// import { renderCursor, initCursor } from './components/atoms/Cursor';
import { renderFab, initFab } from './components/atoms/Fab';
import { renderNav } from './components/organisms/Nav';
import { renderHero, initHeroShrink } from './components/organisms/Hero';
import { renderServicesGrid } from './components/organisms/ServicesGrid';
import { renderPackagesGrid } from './components/organisms/PackagesGrid';
import { renderBridalGrid } from './components/organisms/BridalGrid';
import { renderPortfolioSlider, initSlider } from './components/organisms/PortfolioSlider';
import { renderTermsAccordion, initAccordion } from './components/organisms/TermsAccordion';
import { renderFooter } from './components/organisms/Footer';

// ── 4. Componente CTA Final (ELIMINADO: ahora vive dentro de Footer.ts) ──

// ── 5. Construcción del DOM ───────────────────────────────────────────
const renderApp = () => {
  const app = document.getElementById('app');
  if (!app) throw new Error('[Renaisse] Elemento #app no encontrado.');

  app.innerHTML = `
    ${renderNav()}
    ${renderHero()}
    ${renderServicesGrid()}
    ${renderPackagesGrid()}
    ${renderBridalGrid()}
    ${renderPortfolioSlider()}
    ${renderTermsAccordion()}
    ${renderFooter()} ${renderFab()}
  `;
};

// ── 6. Lógica de Interacciones ────────────────────────────────────────
const initInteractions = () => {
  // initCursor();       // Cursor custom (estaba importado pero nunca montado)
  initHeroShrink();   // Efecto de encogimiento del hero al hacer scroll
  initSlider();       // Drag & parallax del portafolio
  initAccordion();    // Términos & condiciones
  initFab();          // Efecto magnético del botón WhatsApp

  // Disparamos el observer en el frame exacto de pintura
  // para evitar race conditions (igual que Innograf)
  requestAnimationFrame(() => {
    initRevealObserver();
  });
};

// ── 7. Orquestación y Control de Carga ───────────────────────────────
const init = () => {
  renderApp();

  const startTime = Date.now();
  const MIN_LOADER_MS = 600;
  const heroImg = qs<HTMLImageElement>('#hero-img');

  const onAppReady = () => {
    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, MIN_LOADER_MS - elapsed);
    setTimeout(() => {
      initInteractions();
    }, delay);
  };

  if (heroImg?.complete) {
    onAppReady();
  } else {
    heroImg?.addEventListener('load', onAppReady, { once: true });
    heroImg?.addEventListener('error', onAppReady, { once: true });
    setTimeout(onAppReady, 3000); // Fallback de seguridad
  }
};

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();