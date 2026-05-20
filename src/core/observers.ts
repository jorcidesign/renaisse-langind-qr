// src/core/observers.ts
import { qsa } from './dom';

export const initRevealObserver = () => {
    /*
      CORRECCIÓN:
      - Se elimina `root: scroller` porque ya no existe el div#scroller.
      - Con root: null (o sin root), el IntersectionObserver usa el VIEWPORT,
        que es el comportamiento estándar y el que usa Innograf.
      - Antes, al buscar #scroller y no encontrarlo (o encontrar uno que no
        hacía scroll real), el observer fallaba silenciosamente y nada
        se animaba al entrar en pantalla.
    */
    const io = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    qsa('.reveal').forEach(el => io.observe(el));

    // Revelar inmediatamente los primeros elementos above-the-fold
    qsa('.reveal').slice(0, 4).forEach(el => el.classList.add('is-visible'));
};