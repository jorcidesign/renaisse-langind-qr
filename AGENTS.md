# Renaisse Landing — Vanilla TypeScript + Vite

Landing page de maquillaje y peinado profesional. Sin framework, TypeScript vanilla con Vite.

## Stack

- **Runtime**: Node + TypeScript (compila a ES2020 vía `tsc && vite build`)
- **Build tool**: Vite 5
- **UI**: Vanilla TS — sin React, sin Vue, sin librerías externas
- **QR generation**: `qrcode` + `tsx` (solo para scripts)

## Arquitectura

Atomic Design modificado para vanilla TS:

```
src/
├── components/
│   ├── atoms/        ── Button, Fab, SectionLabel
│   ├── molecules/    ── ServiceCard, PackageCard, AccordionItem, SlideItem
│   └── organisms/    ── Nav, Hero, ServicesGrid, PackagesGrid, BridalGrid, PortfolioSlider, TermsAccordion, Footer
├── core/             ── dom.ts (qs/qsa/injectStyles), observers.ts (IntersectionObserver), whatsapp.ts (URL builder)
├── data/             ── renaisse.ts (todo el contenido estático)
└── design-system/    ── tokens.css, animations.css, global.css
```

## Patrón de componentes

Cada componente exporta dos funciones:

- `render*(): string` — Devuelve HTML. Usa `injectStyles(id, css)` para CSS scoped inline. Sin template literals anidados profundos.
- `init*(): void` — Opcional. Registra event listeners, IntersectionObservers, etc. Se llama desde `initInteractions()` en `main.ts`.

**Importaciones**: siempre con path absoluto desde `src/` (Vite resuelve), sin extensión.

Ejemplo:
```ts
import { injectStyles } from '../../core/dom';

const css = `#hero { ... }`;
export const renderHero = (): string => {
  injectStyles('hero', css);
  return `<section id="hero">...</section>`;
};
export const initHeroShrink = () => { /* interactions */ };
```

## Design System

Todo en CSS custom properties (`tokens.css`):

| Prefix | Uso |
|--------|-----|
| `--c-*` | Colores (`--c-dark`, `--c-gold`, `--c-gold-lt`, `--c-gold-dk`, `--c-white`) |
| `--sp-*` | Espaciado (`--sp-sm`, `--sp-md`, `--sp-lg`, `--sp-xl`, `--sp-2xl`, `--sp-4xl`) |
| `--text-*` | Font sizes (`--text-sm`, `--text-md`, `--text-lg`, `--text-xl`, `--text-2xl`) |
| `--font-*` | Familias (`--font-serif`: Cormorant Garamond, `--font-sans`: DM Sans) |
| `--z-*` | Z-index (`--z-fab`, etc.) |
| `--dur-*` / `--ease-*` | Animaciones |

## Convenciones

- **CSS**: inyectado via `injectStyles(id, css)` desde `core/dom.ts`. Cada componente lleva su propio CSS. Sin CSS modules ni preprocesadores.
- **No hooks / no estado**: la app es puramente declarativa. Se renderiza una vez y se añaden interacciones progresivamente.
- **Reveal animations**: usar clase `.reveal` y `.reveal-delay-1/2/3` en elementos. El `IntersectionObserver` en `observers.ts` añade `.is-visible`.
- **WhatsApp**: usar `waURL(numero, mensaje)` desde `core/whatsapp.ts`.
- **SEO**: los meta tags están en `index.html`. El contenido de redes/contacto en `renaisseData`.

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Dev server con HMR |
| `npm run build` | `tsc && vite build` → output en `dist/` |
| `npm run preview` | Preview del build de producción |
| `npm run generate-qrs` | Genera QRs via `scripts/generate-qrs.ts` |

## Skills de diseño disponibles

Skills instaladas en `.opencode/skills/`. Se cargan on-demand vía la herramienta `skill`:

| Skill | Install name | Propósito |
|-------|-------------|-----------|
| **taste-skill v1** | `design-taste-frontend-v1` | Skill base — layout, tipografía, motion, anti-slop |
| **soft-skill** | `high-end-visual-design` | UI calmada/lujosa — contraste suave, mucho espacio, premium |
| **minimalist-skill** | `minimalist-ui` | Toque editorial tipo Notion/Linear |
| **image-to-code-skill** | `image-to-code` | Pipeline imagen → análisis → implementación |
| **output-skill** | `full-output-enforcement` | Garantiza código completo sin placeholders |
| **stitch-skill** | `stitch-design-taste` | Compatibilidad con el patrón `render*`/`init*` |

Usar skill de diseño principal para UI nueva. Usar output-skill cuando el agente trunque código.

## Playwright MCP

El proyecto tiene configurado `@playwright/mcp` como MCP server local. Permite al agente:
- Navegar y hacer clic en URLs
- Tomar screenshots vía accesibilidad tree
- Inspeccionar el DOM/estado del navegador

Usar para verificar renders, testear responsive, o debuggear visualmente el output de `npm run dev`. Disponible en cualquier agente que tenga acceso a herramientas MCP.

## Tests

No hay test suite configurada. El proyecto se verifica visualmente en el navegador.

## Notas

- TypeScript estricto, pero `noUnusedLocals` y `noUnusedParameters` están en `false`.
- La app se monta en `<div id="app">` en `index.html` (mobile-first, max-width 430px en desktop).
- El FAB de WhatsApp usa efecto magnético con `mousemove` y aparece por IntersectionObserver cuando el CTA del Hero sale de pantalla.
