# nicholascullencooper.com — Design Identity

> **Provisional (v0.4).** Decisions below are committed but not final. Anything marked _"for now"_ should be revisited as the site develops. Canonical tokens above; rationale + research log below.
>
> **Current interim state (2026-04-29):** the site is pared to a single landing page + a private `/styleguide`. With volumes shifted to a retrospective model (no forward cadence promised), the landing's volume framing has been stripped — the _tag_ ("Writing, photography, engineering, and the things in between.") is elevated to cover hero in the absence of a featured retrospective. When the first retrospective publishes (target: end of summer 2026), the volume title returns as cover hero and the tag drops back to its standfirst role. Light mode is the canonical default with a user toggle.
>
> **See also:** [CONTENT-STRATEGY.md](./CONTENT-STRATEGY.md) for the persistent-sections + retrospective-volumes model that the design implements.
>
> Last updated: 2026-04-29

---

## Part 1: The Brief

The site's design identity is captured in four words, author-supplied:

**Confident · Warm · Decisive · Editorial**

With an explicit reference cluster: **indie print magazines**, especially the design-forward end of that category. The site represents a polymath (writer, photographer, developer), and the design must funnel a cold visitor toward whichever of those tracks they're there for — without breaking whatever design paradigm is chosen.

---

## Part 2: Canonical Decisions

### 2.1 Typography

| Role                          | Face               | Source                                                                             | Cost                 |
| ----------------------------- | ------------------ | ---------------------------------------------------------------------------------- | -------------------- |
| Serif (display + body)        | **Sentient**       | [Fontshare](https://www.fontshare.com/fonts/sentient)                              | Free (commercial OK) |
| Sans (UI, labels, small caps) | **Switzer**        | [Fontshare](https://www.fontshare.com/fonts/switzer)                               | Free (commercial OK) |
| Mono (code, metadata)         | **JetBrains Mono** | [@fontsource-variable/jetbrains-mono](https://fontsource.org/fonts/jetbrains-mono) | Free (OFL)           |

Rationale in §3.1. Upgrade path (if licensed faces ever wanted) in §3.2.

### 2.2 Color — "Inkwell on Cream"

One committed accent. Warm neutrals, not pure white/black. Both light and dark modes first-class; light is primary.

| Token                | Light     | Dark      | Role                                               |
| -------------------- | --------- | --------- | -------------------------------------------------- |
| `--color-paper`      | `#fdfbf6` | `#17140f` | Page background — warm off-white / warm near-black |
| `--color-ink`        | `#1a1716` | `#f5f1e8` | Primary text — warm charcoal / warm bone           |
| `--color-ink-muted`  | `#6b655f` | `#9a958c` | Secondary text, captions, metadata                 |
| `--color-rule`       | `#c9c1b1` | `#312b24` | Hairline rules, dividers                           |
| `--color-accent`     | `#c14a2a` | `#e37a5a` | **Vermillion.** One color, earned.                 |
| `--color-accent-ink` | `#ffffff` | `#17140f` | Text on accent fills                               |

The accent is vermillion — the editorial color of The Fence, 032c, rubricated medieval capitals, and red-pencil edits. Warm, confident, immediately recognizable.

### 2.3 Motion

Slow, deliberate, never bouncy. No whole-page transitions on content routes. Motion is reserved for future interactive/playground routes where a different bundle budget lives.

| Token               | Value                            | Use                                           |
| ------------------- | -------------------------------- | --------------------------------------------- |
| `--ease-editorial`  | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Soft-start, gentle-arrival — the house easing |
| `--duration-quick`  | `240ms`                          | Link hovers, small state changes              |
| `--duration-medium` | `320ms`                          | Fades, opacity transitions                    |
| `--duration-slow`   | `480ms`                          | Larger elements, reveals                      |

All animations must respect `prefers-reduced-motion` and degrade to instant state changes.

### 2.4 Signature Moves

Three, validated against the indie magazine reference cluster. **Current state: only #1 and #3 are implemented** — #2 is deferred until the site has actual sections worth listing.

1. **Typographic opening spread.** The landing page is written as the opening of a small publication: a quiet masthead (name, top-left), a confident display-typography statement (Sentient, 5xl–8xl), and a short editorial note. It takes cues from editorialnew.com — the page itself is the identity, not a directory.
2. **Numbered departments index (deferred).** When Writing / Projects / Photography / About / Now exist with real content, a numbered-contents treatment (`01 Writing · …`) can be added on the landing or a dedicated `/contents` page. Directly borrowed from MacGuffin, Delayed Gratification, Migrant Journal. This is the polymath-funneling mechanism but premature without content behind it.
3. **Drop caps + small caps + hairline rules.** The inherited editorial vocabulary. Sentient supports small caps and old-style figures. Rules between sections. Drop cap on the first paragraph of long-form pieces (visible in `/styleguide` §04).

Deferred/optional signature (not required for v0.1):

- Subtle paper grain on `--color-paper` (SVG noise, barely visible) — a 2026 editorial trend. Revisit once the visual identity is in place to see if it adds or subtracts.

### 2.5 Layout Philosophy

- **Generous outer container.** Max-width `6xl` (~72rem / 1152px) with side padding that grows with viewport (`px-6` → `sm:px-10` → `md:px-16`). The _container_ is wide; the _reading column_ inside it is narrower (`max-w-2xl` for prose, `max-w-4xl` for display).
- **Text-forward single column** for writing. Max ~65ch reading measure.
- **Two- or three-column grids** only for photography and index/archive pages.
- **Generous vertical rhythm** above section heads (mag-like "breathing", `space-y-24` / `space-y-32` between major blocks); tight paragraph rhythm within prose.
- **Photography as _plates_** — full-bleed or near-full-bleed, captioned small, one-per-screen on desktop. Not thumbnail grids (except explicitly archival contexts).
- **Don't build a complex grid system.** Lean on Tailwind's `grid` utilities + two or three canonical layouts.

### 2.6 Theme Handling

- **Light is the canonical default.** The `<html>` element ships with `data-theme="light"` in [src/app.html](src/app.html).
- **User toggle wins over system preference.** A small `ThemeToggle` component in the header cycles `Light → Dark → System → Light`. Choice is persisted in `localStorage` under `theme-preference`.
- **No flash on first paint.** An inline script in [src/app.html](src/app.html) reads `localStorage` and sets `data-theme` before any stylesheet or React/Svelte hydration runs.
- **Dark mode is a derivative of light.** Design decisions are made against light first; dark is adjusted for warmth (never pure black) and equivalent contrast.
- **Tailwind 4's `dark:` variant** is keyed to `[data-theme="dark"]` via `@custom-variant` in [layout.css](src/routes/layout.css), so `dark:bg-x` works off the attribute rather than the media query.

### 2.7 Accessibility (inherited from SITE-ARCHITECTURE.md §1.7)

- WCAG 2.2 AA minimum (4.5:1 body text contrast).
- Every animation respects `prefers-reduced-motion`.
- Semantic HTML (`<main>`, `<article>`, `<nav>`) on every page.
- Visible focus indicators — not suppressed by design.
- `alt` text required in the Sanity `photo` schema.

---

## Part 3: Rationale

### 3.1 Why Sentient + Switzer + JetBrains Mono

**Sentient** is Fontshare's humanist old-style serif — warm, calligraphic-influenced, with moderate contrast designed for extended reading while retaining display interest. It's the closest free-for-commercial-use face to the Windsor/Cooper/Fraunces lineage but with more editorial reserve (less "quirk," more "paper"). Released through Fontshare in 2021 (designers: Noopur Choksi, Barbara Bigosińska). This matches _warm + editorial_ directly.

**Switzer** is a neo-grotesk with 18 styles (9 weights × regular/italic), explicitly designed for editorial systems. Full body weights, small caps, and consistent quality across weights — the entire typographic system of a publication can be built from Switzer alone. Pairs cleanly with Sentient without either fighting the other.

**JetBrains Mono** is the mono. Warm, readable at small sizes, variable-font via `@fontsource-variable/jetbrains-mono`. Free (OFL).

**What this avoids:**

- **Inter** (SaaS default; active designer pushback in 2025–2026 about its "soul-stripping" neutrality for non-UI contexts).
- **Söhne on off-white** (the 2021–2024 design-forward-SaaS tell — already dated).
- **Recoleta** (beautiful but saturated in D2C/Substack-startup territory; signals "newsletter" more than "publication").
- **Fraunces** (strong free option, genuinely considered, but more popular on indie personal blogs than indie _magazines_ — Sentient reads more editorial, less "personal site of a creative").
- **System fonts only** (Iowan Old Style + Seravek): deliberately austere, good for a writer-only site, undersells _photography-serious_ and _design-forward_ which are equally true for this one.

### 3.2 Upgrade Path (if licensed faces are ever wanted)

The CSS tokens are face-agnostic. A future pair swap is a token swap, not a code change. Strongest upgrade candidates:

| Slot  | Free (today)   | Mid-tier licensed     | Premium licensed                  |
| ----- | -------------- | --------------------- | --------------------------------- |
| Serif | Sentient       | PP Editorial New      | GT Sectra (Display + Text + Fine) |
| Sans  | Switzer        | PP Neue Montreal      | GT America                        |
| Mono  | JetBrains Mono | PP Neue Montreal Mono | (keep JetBrains Mono)             |

No code change required; only `--font-serif`, `--font-sans`, `--font-mono` values change. Review triggers: site begins feeling under-specified; a specific project wants more display impact; licensing budget becomes available.

### 3.3 Why Vermillion

The indie editorial reference cluster converges on _one accent + warm neutrals_. The Fence runs orange-red. 032c runs yellow/red (Pantone 032c itself is vermillion). Delayed Gratification runs teal-orange. Migrant Journal used metallic inks. The pattern across all of them: _one color, committed, meaningful._

Vermillion (`#c14a2a`) sits at the intersection of:

- **Warm** (not the cool blues/teals)
- **Confident** (saturated enough to read as a decision, not a hedge)
- **Decisive** (doesn't apologize or flirt with pastel)
- **Editorial** (direct lineage from rubrication in medieval manuscripts, red ink in editors' pencils, 032c's Pantone, The Fence's signature)

Rejected alternatives, with reasons preserved:

- **Oxblood (`#7a1e1e`)** — more literary but darker, risks leaning "academic" rather than "editorial." Keep in reserve.
- **Cobalt (`#2647a4`)** — classic print blue; _cool_, which fights the _warm_ brief.
- **Ochre (`#b8802e`)** — autumnal and warm but risks reading _Kinfolk-minimalist_, and the reference cluster explicitly moved away from that register.

### 3.4 Why "Editorial-Magazine Web" Specifically (and not Editorial-Content-Site)

Generic "editorial" on the web has become a saturated look — large serif heads, white space, sans body, one accent. The Fence / MacGuffin / Happy Reader register is _narrower and more specific_:

- Rules as structural furniture, not decoration
- Small caps + old-style figures as competence signals
- Numbered indexes / department-marker labels
- Photography plates, not image grids
- Masthead-level typographic identity, not merely "a big serif at the top"
- One committed color, not a palette

These are the moves that distinguish _this register_ from generic "editorial design site." The signature moves in §2.4 are chosen from this narrower vocabulary.

---

## Part 4: Reference Cluster

### 4.1 Print (the primary references)

Documented at research-pass detail in §5.1 (research log). The working reference cluster:

- **MacGuffin** — deep thematic issues, confident typography, archive + commissioned photography
- **The Fence** — two-color print, rules, redrawn masthead per issue, wit
- **Apartamento** — warm, authentic, full-bleed photography, same typefaces since 2008
- **The Happy Reader** — Penguin-midcentury references, 64-page consistency with shifting layout
- **Delayed Gratification** — rigorous infographics, newspaper typography, slow journalism
- **Migrant Journal** — Swiss sensibility, custom type, archival discipline
- **Eye magazine** — typographic authority, design discourse
- **Kinfolk** (post-2021 redesign) — moved _away_ from minimalism toward editorial specificity

Avoided reference clusters and why:

- **032c / Editorial Magazine / Civilization** — anti-grid chaos. Exciting but doesn't match _warm_.
- **Kinfolk 2012-era** — all-white minimalism. Dated; even Kinfolk itself moved away.
- **Condé Nast glossies** — commercial / corporate register; wrong weight.

### 4.2 Web

**Primary inspiration flagged by author:**

- **[editorialnew.com](https://editorialnew.com)** — Pangram Pangram × Locomotive specimen site for PP Editorial New. A live demonstration of what an editorial-magazine-feeling site looks like on the web. _Not the end-all reference, but noted as particularly strong._

**Other editorial-register web references documented:**

- [The Gentlewoman](https://thegentlewoman.co.uk)
- [Real Review](https://real-review.org)
- [The Creative Independent](https://thecreativeindependent.com)
- [Aeon](https://aeon.co)
- [Eye on Design](https://eyeondesign.aiga.org)
- [The Fence (online)](https://www.the-fence.com)

**Personal-site references with editorial character:**

- [Matthew Butterick — practicaltypography.com](https://practicaltypography.com)
- [Oliver Reichenstein — ia.net/topics](https://ia.net/topics)
- [Alec Soth — alecsoth.com](https://alecsoth.com)

More will be added as the author encounters additional reference sites during development.

---

## Part 5: Research Log

### 5.1 Verified typeface choices in the reference cluster

Source-cited, April 2026:

- MacGuffin uses **Churchward Newstype** (Joseph Churchward, NZ) — [Stack](https://stackmagazines.com/art-design/behind-scenes-macguffin-take-2/)
- Apartamento uses **Clearface Serial** + **Futura** since 2008 — [Fonts In Use](https://fontsinuse.com/uses/6839/apartamento-magazine-2008)
- Kinfolk (2021 redesign) uses bespoke family by **Schick Toikka** — [It's Nice That](https://www.itsnicethat.com/news/kinfolk-tenth-anniversary-redesign-schick-toikka-publication-graphic-design-230621)
- The Fence uses **Abyme Foundry display** + **Jannon revival**, masthead redrawn per issue — [Abduzeedo](https://abduzeedo.com/index.php/fence-magazine-typography-masthead-reborn-each-issue)
- 032c uses **Roumald** (Erkin Karamemet) print / **Neue Haas Grotesk** web — [Fonts In Use](https://fontsinuse.com/uses/56987/032c-magazine-42-drain-gang)
- Delayed Gratification uses **Miller** (Scotch Roman) + **Basic Sans** — [slow-journalism.com](https://www.slow-journalism.com/from-the-team/how-to-redesign-dg)
- Migrant Journal uses custom **Migrant Grotesk** (Offshore Studio) — [Eye on Design](https://eyeondesign.aiga.org/meet-offshore-a-design-studio-for-the-new-era-of-globalization/)
- Slanted uses **Suisse Int'l / Works / Neue** — [Fonts In Use](https://fontsinuse.com/uses/17183/slanted-magazine-identity)

### 5.2 The recurring vocabulary (across all references)

- **Grid**: 6- or 7-column underlying; 2-column collapse for reading; 60–75ch measure
- **Drop caps**: near-universal on story openings
- **Hairline rules**: between byline / standfirst / body
- **Pull quotes**: display face, large, sometimes italic, often hanging outside measure
- **Numbered/lettered contents**: Delayed Gratification, MacGuffin, Migrant Journal
- **Signature colors**: one accent + black, never a full palette
- **Paper**: uncoated / cream / occasional newsprint
- **Small caps + old-style figures**: the "we care" signal

### 5.3 Typeface pairings considered

Six-option menu evaluated against the brief; see commit history / prior conversation for full reasoning. Summary of ranking:

1. **Sentient + Switzer + JetBrains Mono** (Fontshare, free) — **chosen**
2. **PP Editorial New + PP Neue Montreal + PP Neue Montreal Mono** — licensed upgrade path
3. **GT Sectra + GT America** — premium licensed upgrade path
4. **Fraunces + IBM Plex Sans** (free, Google Fonts) — rejected as too "personal blog" flavored
5. **Iowan Old Style + Seravek** (system fonts only) — rejected as undersells design-forward ambitions
6. **Hatton + Neue Montreal** (part-free) — deferred, possibly revisited for a future photography-focused redesign

### 5.4 Tools used during research

- [Typewolf](https://www.typewolf.com) (per-typeface combinations, Site of the Day)
- [Fonts In Use](https://fontsinuse.com) (real-world usage validation)
- [Fontshare](https://www.fontshare.com) (Indian Type Foundry's free-commercial catalog — genuinely changed prior conclusions)
- [Modern Font Stacks](https://modernfontstacks.com) (system-font baseline)
- [Pangram Pangram](https://pangrampangram.com) / [Grilli Type](https://www.grillitype.com) (upgrade-path specimens)
- [Fraunces specimen (Undercase Type)](https://fraunces.undercase.xyz)
- [Editorial New specimen (Locomotive)](https://editorialnew.com)
- [colorhexa.com](https://www.colorhexa.com) / [realtimecolors.com](https://www.realtimecolors.com) / [coolors.co](https://coolors.co) (color preview + palette construction)

---

## Part 6: Open Questions and Deferred Decisions

Things marked _for now_ or deliberately unbuilt:

- **Self-host vs. Fontshare CDN.** v0.1 loads Sentient + Switzer from Fontshare's CDN for speed-of-implementation. **TODO:** migrate to self-hosted woff2 files under `/static/fonts/` before production DNS cutover. This removes a third-party request and improves privacy posture.
- **Landing copy is placeholder.** The headline ("A personal archive, slowly made.") and editorial note are author-tunable placeholders. They are set in [src/routes/+page.svelte](src/routes/+page.svelte) and should be rewritten in the author's own voice when ready.
- **Section stubs intentionally absent.** Writing / Projects / Photography / About / Now routes are deleted, not hidden. They return only when content earns the space — and will re-enter through Sanity, not as further hardcoded stubs.
- **Numbered departments index** — see §2.4, deferred.
- **Paper grain.** Listed as 2026 trend; deferred until the base identity is live and we can assess whether it adds or subtracts.
- **Section-specific masthead variation.** Mechanism outlined in earlier drafts; deferred until there is more than one section's worth of real content to test against.
- **Drop cap implementation.** Pure CSS (`::first-letter`) works for the v0.2 styleguide; a Svelte `<DropCap />` component may emerge if usage patterns justify it.
- **Accent color tension.** Vermillion committed _for now_. If as real content fills in it reads too red-signal / too warning-like, oxblood is the first alternate to audition.
- **Type pairing revisit.** If, after several months of real use, the site feels under-specified, PP Editorial New + PP Neue Montreal is the licensed upgrade trigger. Commit Sentient+Switzer until that signal appears.
- **Responsive type scale.** Currently uses Tailwind's default scale with responsive breakpoint modifiers on the landing display (e.g. `text-5xl sm:text-6xl md:text-7xl lg:text-8xl`). A fluid type scale (`clamp()`-based) is deferred until multiple page types exist and stress-test the current approach.

---

## Part 7: Implementation Reference

### 7.1 Font loading

Sentient + Switzer: loaded from Fontshare's CSS API in [src/app.html](src/app.html) via `<link>`.
JetBrains Mono: loaded via `@fontsource-variable/jetbrains-mono` (self-hosted bundle).

### 7.2 Tokens

All design tokens defined in [src/routes/layout.css](src/routes/layout.css) under `@theme`. Dark-mode overrides via `@media (prefers-color-scheme: dark)` at `:root`.

### 7.3 Styleguide

Live token + primitive preview lives at [`/styleguide`](src/routes/styleguide/+page.svelte) for internal reference. Marked `noindex` so search engines don't pick it up, but reachable via a footer link. Counts as a "colophon for the design system."

### 7.4 Theme toggle

Implemented in [src/lib/theme.svelte.ts](src/lib/theme.svelte.ts) (state + persistence) and [src/lib/ThemeToggle.svelte](src/lib/ThemeToggle.svelte) (UI). Bootstrap-before-paint script in [src/app.html](src/app.html) avoids FOUC. Cycle order: `Light → Dark → System → Light`.

---

## Appendix: Principles (summary)

1. **One author, one voice.** No palette where one accent works; no five typefaces where three works.
2. **Editorial vocabulary over editorial aesthetic.** Rules, small caps, drop caps, old-style figures, numbered departments — the specific moves, not the general vibe.
3. **Warm paper, warm ink.** Never pure `#ffffff` / `#000000`.
4. **Light primary, dark derived.** Design _for_ light; make dark first-class but secondary in intent.
5. **Motion is reserved.** Content routes stay calm. Motion drama lives in playground routes.
6. **Photography as plates.** Full-bleed or near-full-bleed; thumbnails only in archival contexts.
7. **Token swaps, not code changes.** Every identity parameter is a variable; no identity decision is hardcoded into component logic.
8. **Every decision is provisional until it earns permanence.** Version this document; revisit the "for now" notes after real content accretes.
