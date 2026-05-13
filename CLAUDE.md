# CLAUDE.md — dstn.github.io Portfolio

> **Das Gesetzbuch für dieses Projekt.** Jeder Prompt, jede Änderung, jedes Feature muss diesen Regeln folgen.

---

## 1. Tech-Stack

| Layer | Technology | Version | Notes |
|:---|:---|:---|:---|
| **Framework** | Next.js | 16.x | App Router, Turbopack, `output: 'export'` (GitHub Pages) |
| **Runtime** | React | 19.x | React Compiler aktiv, Server Components default |
| **Language** | TypeScript | 5.x | Strict Mode, keine `any` Types |
| **Styling** | Tailwind CSS | 4.x | CSS-First Config, `@theme inline`, oklch() |
| **Animations** | tw-animate-css | latest | Ersetzt tailwindcss-animate |
| **UI Primitives** | radix-ui | unified | Einzelne `@radix-ui/react-*` sind deprecated |
| **Icons** | lucide-react | 1.x | Tree-shakable — Brand Icons als Custom SVGs (`components/icons.tsx`) |
| **Validation** | Zod | 4.x | Client-Side Validation (kein Server bei static export) |
| **Email** | — | — | mailto: Fallback (static export, kein Server-Backend) |
| **Analytics** | @vercel/analytics | latest | Nur wenn auf Vercel deployed |

---

## 2. Architecture Principles

### Server-First Ansatz

```
Jede neue Komponente startet als Server Component.
"use client" wird NUR hinzugefügt wenn eine dieser Bedingungen zutrifft:

✅ useState / useReducer / useActionState
✅ useEffect / useLayoutEffect
✅ Browser APIs (window, document, navigator)
✅ Event Handlers (onClick, onChange, onScroll)
✅ React Context (useContext)

❌ NICHT für: Datums-Formatierung, statische Listen, Layouts, Icons
```

### Component Hierarchy

```
Server Component (default)
├── Rendert statisches Markup, Layouts, Daten
├── Kann async sein (await fetch, await db.query)
├── Kann "use cache" Directive nutzen
│
└── Client Component ("use client")
    ├── So klein wie möglich halten
    ├── Nur interaktive UI-Elemente
    └── Keine Daten-Fetching-Logik
```

### Hybrid Component Pattern

Für Sections die sowohl statischen Content als auch Interaktivität haben:

```tsx
// ✅ RICHTIG: Server Component mit eingebettetem Client Component
// components/projects-section.tsx (Server Component — KEIN "use client")
import { ProjectCarousel } from "./project-carousel" // Client Component

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32">
      <h2>Featured Projects</h2>           {/* Server-rendered */}
      <ProjectCarousel projects={data} />   {/* Client Island */}
    </section>
  )
}

// components/project-carousel.tsx
"use client"
// Nur der interaktive Carousel-State lebt hier
```

```tsx
// ❌ FALSCH: Gesamte Section als Client Component
"use client"
export function ProjectsSection() {
  // ... alles als Client Component
}
```

---

## 3. Coding Standards

### TypeScript

- **Strict Mode** ist Pflicht (`"strict": true` in tsconfig)
- **Keine `any` Types.** Wenn der Typ unklar ist, `unknown` + Type Guard verwenden
- **`ignoreBuildErrors: true` ist VERBOTEN** in next.config
- Server Action Return Types explizit typisieren:

```typescript
type ActionState = {
  success: boolean
  error?: string | Record<string, string[]>
}
```

### React 19 — Verbotene Patterns

Der React Compiler übernimmt die Memoization. Diese manuellen Optimierungen sind **verboten** in Custom-Code:

```tsx
// ❌ VERBOTEN in Custom Components
useMemo(() => ..., [deps])
useCallback(() => ..., [deps])
React.memo(Component)

// ✅ RICHTIG: Einfach den Code schreiben, Compiler optimiert
const computedValue = expensiveComputation(data)
const handler = () => doSomething()
```

> **Ausnahme:** shadcn/ui Basis-Komponenten (`components/ui/`) dürfen diese Patterns behalten, da sie extern maintained sind.

### React 19 — Bevorzugte Patterns

```tsx
// ✅ Form Handling mit useActionState
const [state, formAction, isPending] = useActionState(serverAction, initialState)

// ✅ Form Status in Child Components
function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>Submit</button>
}

// ✅ Optimistic Updates
const [optimisticItems, addOptimistic] = useOptimistic(items)

// ❌ VERALTETES Pattern
const [isLoading, setIsLoading] = useState(false)
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  // ...
}
```

### Client-Side Validation (Static Export)

Da das Projekt als statischer Export auf GitHub Pages deployed wird, gibt es keine Server Actions.
Formulare nutzen Client-Side Zod Validation + mailto: Fallback:

```typescript
// ✅ Client-Side Validation für Static Export
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
})

// Im Client Component:
const result = schema.safeParse(formData)
if (!result.success) {
  // Field-level Errors anzeigen
}
```

> **Upgrade-Pfad:** Wenn das Deployment zu Vercel wechselt, können Server Actions
> mit `useActionState` und `useFormStatus` eingeführt werden. Die Zod-Schemas
> können dann direkt in Server Actions wiederverwendet werden.

---

## 4. Styling Guidelines

### Tailwind v4 — CSS-First Configuration

Alle Design-Tokens leben in `app/globals.css` unter `@theme inline`:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.12 0.01 270);
  --primary: oklch(0.75 0.25 330);         /* Neon Magenta */
  --secondary: oklch(0.7 0.18 180);        /* Neon Turquoise */
  --neon-magenta: oklch(0.75 0.25 330);
  --neon-turquoise: oklch(0.7 0.18 180);
  /* ... */
}

@theme inline {
  --color-primary: var(--primary);
  --color-neon-magenta: var(--neon-magenta);
  /* Tailwind nutzt diese automatisch als Utility-Klassen */
}
```

### Regeln

1. **Keine hardcoded Farbwerte in Komponenten:**

```tsx
// ❌ VERBOTEN
className="text-[#ff00ff]"
style={{ color: "oklch(0.75 0.25 330)" }}

// ✅ RICHTIG
className="text-primary"
className="text-neon-magenta"
```

2. **Keine `style jsx`** — alles über Tailwind oder `globals.css`

3. **Utility-Klassen für Custom Effects** in `globals.css`:

```css
.glass { ... }
.neon-glow-magenta { ... }
.text-glow-magenta { ... }
```

4. **Responsive Design:** Mobile-First mit Tailwind Breakpoints (`sm:`, `md:`, `lg:`, `xl:`)

5. **`prefers-reduced-motion`** respektieren:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-glow-pulse,
  .animate-float,
  .animate-flicker {
    animation: none;
  }
}
```

---

## 5. File Structure

```
app/
├── globals.css          # Design System (Tailwind @theme, Custom Utilities)
├── layout.tsx           # Root Layout (Server Component)
└── page.tsx             # Home Page (Server Component)

components/
├── icons.tsx            # Brand Icon SVGs (Github, Linkedin, X)
├── navigation.tsx       # Client Component (Scroll + Mobile Menu)
├── hero-section.tsx     # Client Component (Mouse Tracking)
├── about-section.tsx    # Server Component
├── projects-section.tsx # Server Component (Shell) + ProjectCarousel (Client)
├── project-carousel.tsx # Client Component (Carousel State)
├── skills-section.tsx   # Server Component (CSS-only Animations)
├── resume-section.tsx   # Server Component (Shell) + ResumeTimeline (Client)
├── resume-timeline.tsx  # Client Component (Accordion State)
├── contact-section.tsx  # Server Component (Shell) + ContactForm (Client)
├── contact-form.tsx     # Client Component (Form State + Zod Validation)
├── footer.tsx           # Server Component
└── scan-line.tsx        # Server Component (CSS-only Animation)

hooks/
├── use-in-view.ts       # IntersectionObserver Hook (Client)
└── use-mobile.ts        # Mobile Detection Hook (Client)

lib/
└── utils.ts             # cn() Utility
```

---

## 6. Performance Budget

| Metric | Target |
|:---|:---|
| Lighthouse Performance | 100 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| First Contentful Paint | < 1.0s |
| Largest Contentful Paint | < 2.0s |
| Cumulative Layout Shift | < 0.05 |
| Total Blocking Time | < 50ms |

### Image Rules
- Profile Image: `priority`, `sizes="(max-width: 640px) 112px, (max-width: 768px) 160px, (max-width: 1024px) 224px, 256px"`
- Project Images: `loading="lazy"`, `sizes` prop, WebP/AVIF Format
- Dekorative Bilder: `aria-hidden="true"`, `alt=""`

### Bundle Rules
- Kein Import von gesamten Icon-Libraries
- Dynamic Imports für schwere Client Components
- Kein Barrel-File Re-Export

---

## 7. Workflow — Neue Features implementieren

### Checkliste für jede neue Komponente:

1. **Ist sie ein Server oder Client Component?**
   - Default: Server Component
   - Nur Client wenn Browser-API nötig

2. **Braucht sie `"use cache"`?**
   - Statische Daten die sich selten ändern → ja
   - Request-spezifische Daten → nein

3. **Styling-Check:**
   - Nur Theme-Variablen verwenden
   - Keine hardcoded Farben
   - Mobile-First responsive
   - `prefers-reduced-motion` berücksichtigen

4. **TypeScript-Check:**
   - Props Interface definiert?
   - Keine `any` Types?
   - Return Types explizit?

5. **Performance-Check:**
   - Images mit `next/image` + `sizes`?
   - Keine unnötigen Client Boundaries?
   - Keine manuellen `useMemo`/`useCallback`?

6. **Build-Check:**
   ```bash
   npx tsc --noEmit && npm run build
   ```

---

## 8. Git Conventions

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

> **Letzte Aktualisierung:** Mai 2026
> **Maintainer:** Dustin
