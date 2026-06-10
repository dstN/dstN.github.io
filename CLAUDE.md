# CLAUDE.md — dstn.github.io Portfolio

> **Das Gesetzbuch für dieses Projekt.** Jeder Prompt, jede Änderung, jedes Feature muss diesen Regeln folgen.

---

## 1. Tech-Stack

| Layer | Technology | Version | Notes |
|:---|:---|:---|:---|
| **Framework** | Astro | 6.4.x | Static output, zero-JS-by-default, Islands Architecture |
| **Language** | TypeScript | 5.x | Strict Mode via Astro preset |
| **Styling** | Vanilla CSS | Native | CSS nesting, oklch(), custom properties — no Tailwind |
| **CSS Minification** | LightningCSS | latest | Via Vite integration |
| **Fonts** | Local (via @dstn/fli) | latest | GDPR-compliant, self-hosted Lexend |
| **Icons** | Inline SVGs | — | No external icon library |
| **Contact** | Web3Forms | — | Client-side form submission |
| **AI Skills** | impeccable (pbakaus) | latest | Design language skill installed via `npx skills add` |
| **Deployment** | GitHub Pages | — | `dist/` output via GitHub Actions |

---

## 2. Architecture Principles

### Zero-JS-by-Default

```
Astro components render to static HTML by default.
JavaScript is only added via <script> tags for interactive islands.

Interactive components (have <script> tags):
✅ Navigation (scroll spy, mobile menu, theme toggle)
✅ HeroSection (role crossfade, email obfuscation)
✅ ContactSection (form validation, Web3Forms submission)
✅ Footer (legal modal open/close)

Static components (zero JS):
✅ AboutSection (static markup)
✅ ProjectsSection (static markup)
✅ SkillsSection (static markup)
✅ ResumeSection (static markup)
```

### Component Pattern

All components use the `.astro` single-file format:

```astro
---
// Frontmatter: TypeScript, runs at build time
const data = [...];
---

<!-- Template: HTML with Astro expressions -->
<section>
  {data.map(item => <div>{item.name}</div>)}
</section>

<!-- Client-side JS (optional — this is the "island") -->
<script>
  document.getElementById(...)
</script>
```

---

## 3. Coding Standards

### TypeScript

- **Strict Mode** is enabled via `extends: "astro/tsconfigs/strict"`
- **No `any` types.** Use `unknown` + type guards
- Path alias: `@/*` maps to `src/*`

### CSS

- **No Tailwind.** All styling uses vanilla CSS with custom properties
- **No hardcoded color values in components.** Always use `var(--token)` or `oklch(from var(--token) ...)`
- **CSS nesting** is used for component scoping

```css
/* ✅ CORRECT */
color: var(--primary);
background: oklch(from var(--primary) l c h / 0.15);

/* ❌ FORBIDDEN */
color: #ff00ff;
color: oklch(0.65 0.25 330);  /* hardcoded, use variable */
```

### Interactivity

- **No React, Vue, or any framework runtime.**
- Interactive features use vanilla TypeScript in `<script>` tags
- DOM queries use `document.getElementById()` / `document.querySelectorAll()`

---

## 4. Design System

### Identity: PCB Green + Copper ("Drenched")

The design language is **"circuit board under a macro lens"** — technically dense, structurally elegant, slightly alien. Not performing "developer" — being one.

**Color strategy: Drenched.** The background environment IS the brand. Color is not an accent; it is the atmospheric space content lives within.

| Role | Dark Mode | Light Mode | Usage |
|:---|:---|:---|:---|
| **Background** | `oklch(0.13 0.02 160)` | `oklch(0.97 0.008 160)` | Body, page bg |
| **Surface 1** | `oklch(0.18 0.02 160)` | `oklch(0.99 0.005 160)` | Cards, elevated panels |
| **Surface 2** | `oklch(0.22 0.025 160)` | `oklch(0.95 0.008 160)` | Hover states, inputs |
| **Surface 3** | `oklch(0.26 0.025 160)` | `oklch(0.92 0.01 160)` | Active states |
| **Primary** | `oklch(0.62 0.10 160)` | `oklch(0.42 0.10 160)` | Links, buttons, roles |
| **Accent (copper)** | `oklch(0.72 0.14 65)` | `oklch(0.55 0.14 65)` | Logo dot, highlights, current markers |
| **Text** | `oklch(0.93 0.01 160)` | `oklch(0.18 0.015 160)` | Body text |
| **Muted** | `oklch(0.65 0.015 160)` | `oklch(0.45 0.015 160)` | Secondary text |
| **Border** | `oklch(0.28 0.02 160)` | `oklch(0.85 0.01 160)` | Dividers, card edges |

**Rules:**
- Every neutral is chromatic — zero pure grays. All neutrals carry chroma `0.01–0.025` at hue 160°.
- No indigo anywhere. Indigo is an AI-default dark pattern.
- Copper accent is surgical — logo dot, "current" badge, hover underlines, timeline node. Not a flood.
- Dark mode is the primary design target (default, no class). Light mode adds `.light` class.
- Dark mode reduces body text weight to 350 (light text on dark reads heavier).

### Typography

- **Font:** Lexend (self-hosted, weights 400/500/600/700)
- **Display:** `clamp()` fluid sizing, `letter-spacing: -0.02em` to `-0.03em` max
- **Body:** 1rem / 1.65 line-height, `max-width: 65ch`, `text-wrap: pretty`
- **Headings:** `text-wrap: balance`, weight 700, line-height 1.15

### Theme System

- Dark = default (no class on `<html>`)
- Light = `.light` class on `<html>`
- FOUC prevention: inline `<script>` in `<head>` checks `localStorage("theme")` before paint
- Toggle stores preference in `localStorage`
- `prefers-color-scheme` honored as initial default

### Three CSS Files

| File | Purpose |
|:---|:---|
| `src/styles/global.css` | Design tokens, @font-face, base reset, atmospheric gradients |
| `src/styles/animations.css` | @keyframes, reduced-motion fallbacks |
| `src/styles/components.css` | Component-level styles (nav, sections, buttons, forms) |

---

## 5. Design Anti-Patterns (from impeccable audit)

These are **banned** in this project. If you're about to write any of these, stop and restructure.

### Structural bans
- **The Six Identical Sections pattern.** Hero → About → Projects → Skills → Experience → Contact in the same order with the same layout rhythm. Vary widths, density, and spacing.
- **"Section header" + content block repetition.** Not every section needs an h2 + subtitle paragraph banner.
- **Identical card grids.** Cards with rounded corners in a 2-col grid. Cards are the lazy answer. Use lists, tables, or dense typography instead.
- **Pill tag grids for skills.** Two columns of rounded pills. Use a spec-sheet or comma-separated inline format.
- **Vertical timeline with dots.** Every portfolio uses this for experience. Use a horizontal layout, compact list, or table.
- **Contact = form on right, info on left.** The template layout.

### CSS bans (from impeccable absolute bans)
- **Side-stripe borders.** `border-left/right > 1px` as accent. Use full borders, tints, or nothing.
- **Gradient text.** `background-clip: text` with gradients. Use solid colors.
- **Glassmorphism as default.** Blurs and glass cards decoratively. Rare and purposeful only.
- **Ghost cards.** `border: 1px solid X` + `box-shadow: 0 Npx Mpx` with blur ≥16px on the same element.
- **Over-rounded cards.** `border-radius > 16px` on cards/sections. Cards top out at 12-16px.
- **Tiny uppercase tracked eyebrow above every section.** One named kicker is voice; every section is AI grammar.
- **Numbered section markers (01 / 02 / 03).** Numbers earn their place only when the section IS a sequence.

### Content bans
- **Fabricated experience descriptions.** Only real data: titles, dates, companies, tech skills.
- **"I'm a passionate developer" copy.** Show, don't declare.
- **Rotating role text.** Decorative, not functional.
- **Stock "developer" imagery.** Terminal mockups, matrix rain, scan lines, blinking cursors.

---

## 6. File Structure

```
src/
├── layouts/
│   └── BaseLayout.astro         # Root HTML, meta, font preloads, CSS imports
├── components/
│   ├── Navigation.astro         # Fixed nav + scroll spy + mobile menu + theme toggle
│   ├── HeroSection.astro        # Name + role + description + CTAs + social
│   ├── AboutSection.astro       # Profile image + bio text
│   ├── ProjectsSection.astro    # Project showcase (6 projects)
│   ├── SkillsSection.astro      # Tech stack display
│   ├── ResumeSection.astro      # Work experience timeline
│   ├── ContactSection.astro     # Contact form + info
│   └── Footer.astro             # Footer + legal modal
├── styles/
│   ├── global.css               # Design tokens + PCB palette
│   ├── animations.css           # Keyframes + reduced-motion
│   └── components.css           # Component styles
└── pages/
    └── index.astro              # Single-page assembly

public/
├── fonts/
│   └── lexend/                  # Self-hosted (via @dstn/fli)
├── images/
│   └── dustin-profile.webp
├── logo.svg
├── manifest.json
├── web-app-manifest-192x192.png
└── web-app-manifest-512x512.png

.agents/skills/impeccable/       # Design language skill
```

---

## 7. Performance Budget

| Metric | Target |
|:---|:---|
| Lighthouse Performance | 100 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| Build Time | < 2s |
| JS Shipped | Only interactive islands (~5KB total) |
| External Requests | Zero (fonts, icons all self-hosted) |

### Rules

- Zero external CDN requests (GDPR compliance)
- Profile image: `loading="eager"`, `decoding="async"`
- All other images: `loading="lazy"`
- Font preloading for critical weights (400, 700)
- `font-display: swap` on all @font-face

---

## 8. Workflow — Adding New Features

### Checklist:

1. **Is it static or interactive?**
   - Default: Static Astro component (zero JS)
   - Only add `<script>` if browser interactivity is needed

2. **Design-Check (impeccable):**
   - Does NOT match any anti-pattern from Section 5
   - Uses CSS custom properties (no hardcoded values)
   - Respects dark/light mode (`.light` class, not `.dark`)
   - Respects `prefers-reduced-motion`
   - Mobile-first responsive
   - Passes the "could someone say AI made this?" test — if yes, redesign

3. **TypeScript-Check:**
   - No `any` types
   - Build passes: `npm run build`

4. **Build-Check:**
   ```bash
   npm run build  # Must complete with zero errors
   ```

---

## 9. Git Conventions

```
feat: neue Sektion/Feature
fix: Bugfix
refactor: Code-Umbau ohne Funktionsänderung
perf: Performance-Optimierung
style: Styling-Änderung (kein Code-Logic-Change)
chore: Dependency Updates, Config
docs: Dokumentation
```

---

> **Letzte Aktualisierung:** Juni 2026
> **Maintainer:** Dustin
> **Stack-Migration:** Next.js 16 → Astro 6.4 (Juni 2026)
