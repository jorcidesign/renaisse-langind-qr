# Renaisse Landing — Setup & Configuración

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

## Skills de Diseño

Los skills están instalados en `.opencode/skills/` y configurados en `.claude/settings.json`:

| Skill | ID | Propósito |
|-------|------|-----------|
| **Design Taste** | `design-taste-frontend-v1` | Skill base — layout, tipografía, motion, anti-slop (PRIMARY) |
| **Soft/Premium** | `high-end-visual-design` | UI calmada/lujosa — contraste suave, mucho espacio, premium |
| **Minimalist** | `minimalist-ui` | Toque editorial tipo Notion/Linear |
| **Image to Code** | `image-to-code` | Pipeline imagen → análisis → implementación |
| **Output Enforcement** | `full-output-enforcement` | Garantiza código completo sin placeholders |
| **Stitch** | `stitch-design-taste` | Compatibilidad con el patrón `render*`/`init*` |

### Usar en prompts

Para cambiar de skill en un prompt, menciona el nombre o ID:
```
/sketch "Nueva sección hero" using minimalist-ui
/code "Implementar footer" using soft-skill (high-end-visual-design)
```

El skill primario (`design-taste-frontend-v1`) se usa por defecto si no se especifica.

## Playwright MCP

Configurado en `opencode.json`. Permite al agente:
- Navegar y hacer clic en URLs (`navigate`, `click`)
- Tomar screenshots vía accesibilidad tree
- Inspeccionar el DOM/estado del navegador

**Uso**: Disponible automáticamente en agentes que tengan acceso a MCPs. Ideal para:
- Verificar renders en `npm run dev`
- Testear responsive design
- Debuggear visualmente output de componentes

## Tests

No hay test suite configurada. El proyecto se verifica visualmente en el navegador.

## Notas

- TypeScript estricto, pero `noUnusedLocals` y `noUnusedParameters` están en `false`.
- La app se monta en `<div id="app">` en `index.html` (mobile-first, max-width 430px en desktop).
- El FAB de WhatsApp usa efecto magnético con `mousemove` y aparece por IntersectionObserver cuando el CTA del Hero sale de pantalla.

---

**Última actualización**: 2026-06-18  
**Configuración verificada**: ✅ MCP Playwright, ✅ 6 Skills de diseño instalados, ✅ Settings al nivel de proyecto
