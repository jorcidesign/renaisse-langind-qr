import { injectStyles } from '../../core/dom';
import { renaisseData } from '../../data/renaisse';
import { waURL } from '../../core/whatsapp';

const css = `
  /* * ESTRUCTURA PARALLAX 
   * El contenedor envuelve el CTA (que fluye normal) y el Footer (que se queda pegado al fondo) 
   */
  .footer-parallax-wrapper {
    position: relative;
    z-index: 1;
    /* Se asegura de estar sobre el contenido anterior */
  }

  /* ── CTA Section (Azul Marino) ── */
  #footer-cta {
    background: var(--c-dark);
    padding: var(--sp-5xl) var(--sp-lg);
    text-align: center;
    position: relative;
    z-index: 2; /* Debe estar por ENCIMA del footer dorado */
    border-bottom: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 10px 40px rgba(0,0,0,0.5); /* Sombra para dar profundidad al deslizar */
  }

  #footer-cta::before {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 40px; height: 2px;
    background: var(--c-gold);
    border-radius: 2px;
  }

  .footer-cta-tagline {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: var(--text-xl);
    color: rgba(255,255,255,0.7);
    margin-bottom: var(--sp-2xl);
    letter-spacing: 0.01em;
  }

  .footer-cta-btn {
    display: inline-block;
    background: var(--c-gold);
    color: var(--c-dark);
    font-family: var(--font-sans);
    font-size: var(--text-2xs);
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 20px 40px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: none;
    transition: transform var(--dur-med) var(--ease-out-expo), box-shadow var(--dur-med);
  }

  .footer-cta-btn:hover { 
    transform: translateY(-4px); 
    box-shadow: var(--shadow-gold);
  }

  /* ── Footer principal (Dorado) ── */
  /* La magia del parallax está en 'sticky' y 'bottom: 0' */
  #footer {
    background: var(--c-gold);
    padding: var(--sp-3xl) var(--sp-lg) var(--sp-xl);
    position: sticky;
    bottom: 0;
    z-index: 0; /* Por DEBAJO del CTA */
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 400px;
  }

  /* Nombre en background — efecto editorial Awwwards */
  .footer-bg-name {
    position: absolute;
    bottom: -0.1em; /* Ligeramente recortado abajo */
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-serif);
    font-size: clamp(6rem, 25vw, 10rem); /* Gigante y responsivo */
    font-weight: 700;
    line-height: 1;
    color: rgba(7,3,64,0.06); /* Apenas visible, súper sutil */
    letter-spacing: -0.04em;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    z-index: 0;
  }

  .footer-inner {
    position: relative;
    z-index: 1;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .footer-logo-block { margin-bottom: var(--sp-3xl); text-align: left; }
  
  .footer-logo {
    font-family: var(--font-serif);
    font-size: var(--text-3xl);
    font-weight: 700;
    color: var(--c-dark);
    line-height: 1;
    letter-spacing: -0.02em;
    margin-bottom: var(--sp-xs);
  }

  .footer-slogan {
    font-family: var(--font-sans);
    font-size: var(--text-2xs);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(7,3,64,0.6);
  }

  /* Nav links tipo lista editorial con flecha ↗ */
  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: var(--sp-3xl);
  }

  .footer-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid rgba(7,3,64,0.12);
    position: relative;
    overflow: hidden;
    color: rgba(7,3,64,0.85);
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    transition: color var(--dur-fast);
  }

  .footer-link:first-child { border-top: 1px solid rgba(7,3,64,0.12); }
  
  /* Animación de fondo al pasar el cursor */
  .footer-link::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(7,3,64,0.05);
    transform: translateX(-100%);
    transition: transform var(--dur-med) var(--ease-out-expo);
    z-index: -1;
  }

  .footer-link:hover { color: var(--c-dark); }
  .footer-link:hover::before { transform: translateX(0); }

  .footer-link-arrow {
    font-size: 1.2rem;
    font-weight: 400;
    color: rgba(7,3,64,0.4);
    transition: transform var(--dur-med) var(--ease-out-expo), color var(--dur-fast);
  }

  .footer-link:hover .footer-link-arrow {
    transform: translate(3px, -3px);
    color: var(--c-dark);
  }

  /* Textos inferiores */
  .footer-bottom {
    display: flex;
    flex-direction: column;
    gap: var(--sp-sm);
    margin-top: auto;
    text-align: center;
  }

  .footer-copy {
    font-family: var(--font-sans);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(7,3,64,0.5);
  }

  .footer-credit {
    font-family: var(--font-sans);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(7,3,64,0.35);
  }

  .footer-credit span {
    font-weight: 700;
    color: var(--c-dark);
  }
`;

export const renderFooter = (): string => {
  injectStyles('footer', css);
  const { brand } = renaisseData;
  const waLink = waURL(brand.whatsappNumber, brand.whatsappMessage);
  const year = new Date().getFullYear();
  const links = [
    { label: 'Instagram', href: brand.instagram },
    { label: 'TikTok', href: brand.tiktok },
    { label: 'Email', href: `mailto:${brand.email}` },
  ];

  const linksHTML = links.map(l => `
      <a class="footer-link" href="${l.href}" target="_blank" rel="noopener noreferrer">
        <span>${l.label}</span>
        <span class="footer-link-arrow">↗</span>
      </a>
    `).join('');

  return `
    <div class="footer-parallax-wrapper">
      <section id="footer-cta">
        <p class="footer-cta-tagline">¿Lista para brillar?</p>
        <a class="footer-cta-btn" href="${waLink}" target="_blank" rel="noopener noreferrer">Agendar mi cita ahora</a>
      </section>

      <footer id="footer" aria-label="Footer">
        <div class="footer-bg-name" aria-hidden="true">${brand.name.replace('!', '')}</div>
        
        <div class="footer-inner">
          <div class="footer-logo-block">
            <div class="footer-logo">${brand.name}</div>
            <p class="footer-slogan">${brand.slogan}</p>
          </div>
          
          <nav class="footer-links" aria-label="Social links">
            ${linksHTML}
          </nav>
          
          <div class="footer-bottom">
            <p class="footer-copy">© ${year} ${brand.name.replace('!', '')} — Todos los derechos reservados.</p>
            <p class="footer-credit">Digital Experience by <span>Astostudios</span></p>
          </div>
        </div>
      </footer>
    </div>
  `;
};