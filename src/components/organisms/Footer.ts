import { injectStyles } from '../../core/dom';
import { renaisseData } from '../../data/renaisse';
import { waURL } from '../../core/whatsapp';
import ctaBrushes from '../../assets/images/cta-brushes.webp';

const css = `
  .footer-parallax-wrapper {
    position: relative;
    border-top: 1px solid rgba(232,190,88,0.10);
  }

  #footer-cta {
    position: relative;
    min-height: 260px;
    display: grid;
    place-items: center;
    padding: var(--sp-4xl) var(--sp-lg);
    text-align: center;
    overflow: hidden;
    background: #070019;
  }

  #footer-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: var(--cta-image);
    background-size: cover;
    background-position: left center;
    filter: brightness(0.84) saturate(1.02);
    transform: scale(1.02);
  }

  #footer-cta::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(7,0,25,0.68), rgba(7,0,25,0.82)),
      radial-gradient(circle at 50% 50%, rgba(232,190,88,0.12), transparent 32%);
  }

  .footer-cta-inner {
    position: relative;
    z-index: 1;
  }

  .footer-cta-tagline {
    font-family: var(--font-serif);
    font-size: clamp(2.1rem, 4vw, 4rem);
    font-weight: 600;
    color: var(--c-text);
    margin-bottom: var(--sp-xl);
    letter-spacing: -0.035em;
  }

  .footer-cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 52px;
    padding: 0 34px;
    background: var(--gradient-gold);
    color: #160900;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    box-shadow: 0 16px 40px rgba(232,190,88,0.2);
    transition: transform var(--dur-med) var(--ease-out-expo), box-shadow var(--dur-med);
  }

  .footer-cta-btn:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-gold);
  }

  #footer {
    background: rgba(5,0,18,0.96);
    padding: var(--sp-3xl) var(--sp-lg) var(--sp-xl);
    border-top: 1px solid rgba(232,190,88,0.12);
    overflow: hidden;
  }

  .footer-inner {
    width: var(--container);
    margin: 0 auto;
  }

  .footer-grid {
    display: grid;
    gap: var(--sp-2xl);
  }

  .footer-logo {
    font-family: var(--font-serif);
    font-size: var(--text-3xl);
    font-weight: 700;
    color: var(--c-gold);
    line-height: 1;
    letter-spacing: -0.035em;
    margin-bottom: var(--sp-md);
  }

  .footer-slogan {
    max-width: 28ch;
    color: var(--c-text-muted);
    font-size: var(--text-sm);
    line-height: 1.7;
  }

  .footer-title {
    margin-bottom: var(--sp-md);
    color: var(--c-text-soft);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .footer-list {
    display: grid;
    gap: var(--sp-sm);
  }

  .footer-link,
  .footer-text {
    color: var(--c-text-muted);
    font-size: var(--text-sm);
    line-height: 1.5;
    transition: color var(--dur-fast);
  }

  .footer-link:hover {
    color: var(--c-gold);
  }

  .footer-bottom {
    margin-top: var(--sp-3xl);
    padding-top: var(--sp-lg);
    border-top: 1px solid rgba(255,255,255,0.08);
    display: flex;
    flex-direction: column;
    gap: var(--sp-sm);
    color: var(--c-text-soft);
    font-size: 0.72rem;
  }

  @media (min-width: 900px) {
    #footer-cta {
      min-height: 310px;
      padding: var(--sp-5xl) 0;
    }

    #footer {
      padding: var(--sp-3xl) 0 var(--sp-xl);
    }

    .footer-grid {
      grid-template-columns: 1.4fr 0.8fr 0.8fr 1fr;
      align-items: start;
    }

    .footer-bottom {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

export const renderFooter = (): string => {
  injectStyles('footer', css);
  const { brand } = renaisseData;
  const waLink = waURL(brand.whatsappNumber, brand.whatsappMessage);
  const year = new Date().getFullYear();

  return `
    <div class="footer-parallax-wrapper">
      <section id="footer-cta" style="--cta-image: url('${ctaBrushes}')">
        <div class="footer-cta-inner">
          <p class="footer-cta-tagline">¿Lista para brillar?</p>
          <a class="footer-cta-btn" href="${waLink}" target="_blank" rel="noopener noreferrer">Agendar mi cita ahora</a>
        </div>
      </section>

      <footer id="footer" aria-label="Footer">
        <div class="footer-inner">
          <div class="footer-grid">
            <div>
              <div class="footer-logo">${brand.name}</div>
              <p class="footer-slogan">Maquillaje & Peinado Profesional. Resalta tu esencia, vive tu mejor versión.</p>
            </div>

            <div>
              <p class="footer-title">Enlaces</p>
              <nav class="footer-list" aria-label="Enlaces de footer">
                <a class="footer-link" href="#services-stack">Servicios</a>
                <a class="footer-link" href="#portfolio">Portafolio</a>
                <a class="footer-link" href="#packages-stack">Combos</a>
                <a class="footer-link" href="#terms">Políticas</a>
              </nav>
            </div>

            <div>
              <p class="footer-title">Sígueme</p>
              <div class="footer-list">
                <a class="footer-link" href="${brand.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a class="footer-link" href="${brand.tiktok}" target="_blank" rel="noopener noreferrer">TikTok</a>
                <a class="footer-link" href="${waLink}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>

            <div>
              <p class="footer-title">Contacto</p>
              <div class="footer-list">
                <p class="footer-text">Lima, Perú</p>
                <a class="footer-link" href="${waLink}" target="_blank" rel="noopener noreferrer">+51 922 644 511</a>
                <a class="footer-link" href="mailto:${brand.email}">${brand.email}</a>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <p>© ${year} ${brand.name.replace('!', '')}. Todos los derechos reservados.</p>
            <a class="footer-link" href="#terms">Política de privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  `;
};
