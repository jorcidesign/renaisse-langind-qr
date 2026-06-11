export const initScrollProgress = () => {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  Object.assign(bar.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '2px',
    background: 'linear-gradient(90deg, var(--c-gold-dk), var(--c-gold), var(--c-gold-lt))',
    width: '0%',
    zIndex: 'var(--z-progress, 99)',
    transition: 'width 50ms linear',
    pointerEvents: 'none',
  });
  document.body.prepend(bar);

  let ticking = false;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
};
