import { qs, injectStyles } from '../../core/dom';
import { renaisseData } from '../../data/renaisse';
import { waURL } from '../../core/whatsapp';

const css = `
  #fab {
    position: fixed;
    bottom: var(--sp-xl);
    right: var(--sp-xl);
    z-index: var(--z-fab);
    width: 56px;        /* era: width: auto */
    height: 56px;
    padding: 0;         /* era: 0 24px 0 20px */
    border-radius: 50%; /* era: 28px */
    background: #25D366;
    color: var(--c-white);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 24px rgba(37,211,102,0.45);
    
    /* Estado inicial: Oculto y un poco más pequeño */
    opacity: 0;
    transform: scale(0.5) translateY(20px);
    pointer-events: none; /* Evita clics accidentales cuando está invisible */
    
    /* Transición suave para aparecer y para el hover */
    transition: transform 0.4s var(--ease-out-expo), 
                opacity 0.4s var(--ease-out-expo),
                box-shadow var(--dur-med);
  }

  /* Clase que se añade cuando el botón del Hero ya no se ve */
  #fab.is-visible {
    opacity: 1;
    transform: scale(1) translateY(0);
    pointer-events: auto;
  }

  #fab svg { width: 24px; height: 24px;  margin-right: 0;  }
  
  #fab .fab-text {
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 0.95rem;
    white-space: nowrap;
    letter-spacing: 0.05em;
  }
  #fab.is-visible:hover { 
    box-shadow: 0 10px 36px rgba(37,211,102,0.6); 
    transform: scale(1.05) translateY(0);
  }
  
  .fab-pulse { animation: pulse-glow 2.5s ease-in-out infinite; }
 
  @media (min-width: 520px) {
    #fab {
      right: calc(50% - 430px / 2 + var(--sp-xl));
    }
  }

  @media (min-width: 900px) {
    #fab {
      right: var(--sp-2xl);
    }
  }

  
`;

export const renderFab = (): string => {
  injectStyles('fab', css);
  const waLink = waURL(renaisseData.brand.whatsappNumber, renaisseData.brand.whatsappMessage);

  return `
    <a id="fab" href="${waLink}" class="fab-pulse" target="_blank" rel="noopener noreferrer" aria-label="Agendar por WhatsApp">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.548 4.1 1.504 5.833L0 24l6.335-1.654A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.358-.213-3.76.983 1.005-3.655-.234-.375A9.818 9.818 0 0112 2.182c5.428 0 9.818 4.39 9.818 9.818s-4.39 9.818-9.818 9.818z"/>
      </svg>
      
    </a>
  `;
};

export const initFab = () => {
  const fab = qs<HTMLElement>('#fab');
  const heroCta = qs<HTMLElement>('#hero-cta'); // Buscamos el botón del Hero

  if (!fab) return;

  // 1. Lógica de visibilidad (Aparece cuando el botón principal desaparece)
  if (heroCta) {
    const observer = new IntersectionObserver(
      (entries) => {
        const heroButtonEntry = entries[0];
        // Si el botón del hero NO se está intersectando con la pantalla (salió de la vista)
        if (!heroButtonEntry.isIntersecting) {
          fab.classList.add('is-visible');
        } else {
          // Si el botón del hero vuelve a aparecer, ocultamos el FAB
          fab.classList.remove('is-visible');
        }
      },
      {
        root: null, // Usa el viewport del navegador
        threshold: 0, // Se activa tan pronto como 1 píxel del botón entra o sale
      }
    );
    observer.observe(heroCta);
  } else {
    // Fallback: Si por alguna razón no hay botón hero, mostramos el fab siempre
    fab.classList.add('is-visible');
  }

  // 2. Lógica del efecto magnético original (se mantiene)
  const RADIUS = 80;
  document.addEventListener('mousemove', e => {
    // Solo aplicamos el efecto magnético si el FAB está visible
    if (!fab.classList.contains('is-visible')) return;

    const rect = fab.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < RADIUS) {
      const force = (RADIUS - dist) / RADIUS;
      const mx = dx * force * 0.35;
      const my = dy * force * 0.35;
      fab.style.transform = `translate(${mx}px, ${my}px) scale(${1 + force * 0.08})`;
      fab.style.boxShadow = `0 ${10 + force * 10}px ${30 + force * 20}px rgba(37,211,102,${0.45 + force * 0.3})`;
    } else {
      fab.style.transform = '';
      fab.style.boxShadow = '';
    }
  });

  fab.addEventListener('click', () => {
    fab.style.animation = 'gooey-burst 0.4s var(--ease-snap) forwards';
    setTimeout(() => { fab.style.animation = ''; }, 400);
  });
};