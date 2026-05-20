export const qs = <T extends Element>(sel: string, ctx: ParentNode = document) => ctx.querySelector<T>(sel)!;
export const qsa = <T extends Element>(sel: string, ctx: ParentNode = document) => [...ctx.querySelectorAll<T>(sel)];

// Evita inyectar el mismo CSS múltiples veces si renderizamos varios componentes iguales
const injectedStyles = new Set<string>();

export const injectStyles = (id: string, css: string) => {
    if (injectedStyles.has(id)) return;
    const style = document.createElement('style');
    style.id = `style-${id}`;
    style.textContent = css;
    document.head.appendChild(style);
    injectedStyles.add(id);
};