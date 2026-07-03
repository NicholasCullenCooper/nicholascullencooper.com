# nicholascullencooper.com -- Site Architecture

> **Canonical decisions above the fold. Exploration and alternatives considered below in Part 2 (reference only).**
>
> Last updated: 2026-04-14

---

# Part 1: Canonical Decisions

## 1.1 The Stack (Summary)

| Layer                             | Choice                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| Framework                         | **SvelteKit 2** with **Svelte 5** (runes), TypeScript                                          |
| Adapter                           | **`@sveltejs/adapter-cloudflare`** (not `adapter-static`)                                      |
| Rendering                         | Prerender by default per route; SSR for preview/draft routes                                   |
| Styling                           | **Tailwind CSS 4**                                                                             |
| CMS                               | **Sanity** (hosted)                                                                            |
| Content rendering                 | **`@portabletext/svelte`** for Portable Text; **mdsvex** only if local Markdown becomes needed |
| Image delivery (display)          | **Sanity's image CDN** (URL-based transforms)                                                  |
| Image source-of-truth (originals) | **Cloudflare R2** (separate from Sanity; see §1.5)                                             |
| Hosting                           | **Cloudflare Workers** via **Workers Builds** + **Static Assets**                              |
| DNS                               | **Cloudflare DNS** (domains remain registered at Namecheap)                                    |
| Email                             | **Cloudflare Email Routing** forwarding `hello@nicholascullencooper.com`                       |
| Analytics                         | **Cloudflare Web Analytics**                                                                   |
| Repo name                         | `nicholascullencooper.com`                                                                     |
| Repo visibility                   | Public                                                                                         |

### Deferred — Do Not Build Preemptively

| Capability                                        | Chosen tool                                 | Trigger to add                                           |
| ------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------- |
| Scroll/timeline animation beyond Svelte built-ins | **GSAP**                                    | First page that needs ScrollTrigger or complex timelines |
| 3D / WebGL                                        | **Threlte**                                 | First page with a Three.js scene                         |
| Newsletter                                        | **Buttondown**                              | 3+ months of consistent writing cadence                  |
| Site search                                       | **Pagefind**                                | Content index exceeds ~30 pieces                         |
| Digital product sales                             | **Lemon Squeezy**                           | First thing to sell (ebook, guide, preset pack)          |
| Print sales — mid tier                            | **Prodigi**                                 | First print you want to sell (API-first POD)             |
| Print sales — premium                             | **WhiteWall** (validate with samples first) | When premium prints justify the margin                   |
| Unified cart                                      | **Snipcart**                                | Only if selling multiple product types via one cart      |
| Form-spam protection                              | **Cloudflare Turnstile**                    | First public form (contact, newsletter signup)           |

---

## 1.2 Why SvelteKit (Not Astro, Not Next.js, Not Analog)

This is documented so the decision is defensible on paper, not only in conversation history.

### Stated requirements that drove the choice

- **Design-forward intent.** The site is not only a content archive; it explicitly aspires to include a "design playground" section, interactive pages, and photography exhibitions. Full-page interactive experiences are expected to appear, not just isolated interactive islands within otherwise static pages.
- **Motion and 3D are in-scope.** GSAP, Three.js, scroll-driven animation, and potential WebGL scenes are anticipated, even if deferred to after launch.
- **Content is ambitious in breadth.** Writing, notes, reviews, experiments, projects, photography galleries — but with long-term cadence, not daily publishing.
- **Sustainability matters.** This is a one-maintainer site expected to live and evolve for years. The framework's "fun to write" / "pleasant to return to" factor is a real consideration.

### Why SvelteKit fits these

- **Full-page interaction is native.** Unlike Astro's islands model, SvelteKit treats every page as a fully reactive component. A scroll-driven animation spanning hero, body, and footer is just a component, not an architectural fight.
- **Built-in animation is first-class.** `transition:`, `animate:`, `svelte/motion` (springs, tweens) are part of the component syntax, not a library you wire up. For the 80% of animation that isn't GSAP-complex, nothing extra is needed.
- **Threlte is the cleanest Three.js DX in any framework.** Declarative, signal-reactive, and paired with `@threlte/rapier` (physics), `@threlte/theatre` (animation studio), and `@threlte/extras` (helpers). Widely considered the best-in-class 3D integration outside React Three Fiber.
- **Smallest output.** ~5KB runtime vs ~45KB for React/Angular. Matters for a site where every page has different interactive requirements.
- **93% developer satisfaction in State of JS 2025.** The highest of any framework surveyed. Sustainability concern addressed.
- **Sanity has official, first-class SvelteKit support.** Not a community integration — an official template, `@portabletext/svelte`, and documented Presentation Tool integration.

### Why not Astro

Astro _can_ work with Sanity. Astro _can_ host a content site well. The decision against Astro was not "Astro is incapable"; it was "Astro's architecture fights the design-forward ambitions":

- **Islands are isolated by design.** A full-page scroll-triggered animation that starts in the header, continues through the main content, and terminates in the footer does not map cleanly to isolated islands. You can work around this with `client:only` on a whole-page island, but at that point you are circumventing Astro's architectural premise.
- **Astro's sweet spot is "content-first with occasional interactivity."** The stated requirements lean toward "content-first AND design-forward AND occasional full-page interactive." SvelteKit is better-positioned for the third element.

If the ambitions were scoped down to "blog + project pages + photography gallery, no interactive playground, no full-page motion," Astro would be the correct choice. That is not the scoping here.

### Why not Next.js

- **Larger runtime, larger framework surface.** React Server Components, `"use client"` boundaries, and caching directives all add cognitive overhead unnecessary for this use case.
- **No Vercel lock-in concern at the static level, but SSR via OpenNext on Cloudflare adds friction** that SvelteKit's native Cloudflare adapter avoids.
- **React familiarity was considered.** It's real but doesn't outweigh Svelte's advantages for this specific site type. The React knowledge stays useful in other contexts (diverge, sediment).

### Why not Analog (Angular)

- **Career-strategic value is real** but belongs on a dedicated Angular side project where it can be the focus.
- **Animation ecosystem is the thinnest of the three candidates.** `@angular/animations` was deprecated in v20.2; `angular-three` is niche; Motion has no Angular binding.
- **No design-forward Analog sites exist publicly** — you would be pioneering the aesthetic direction alone, on top of learning the framework.

---

## 1.3 Framework Specifics

### Versions and patterns

- **Svelte 5** with runes (`$state`, `$derived`, `$effect`, `$props`) — not Svelte 4 reactivity
- **SvelteKit 2** current
- **TypeScript** throughout. Prop typing via `$props<Props>()` is clean in Svelte 5 stable; earlier rough edges from the release candidates are resolved.
- **Tailwind 4** via `@tailwindcss/vite` (the officially recommended path per Tailwind's SvelteKit guide)
- File-based routing under `src/routes/`
- Load functions in `+page.server.ts` (SSR) or `+page.ts` (universal) for content fetches
- **Scaffolded via `sv` — the current official Svelte CLI.** Use `pnpm dlx sv create` (or `npx sv create`). The older `create-svelte` / `pnpm create svelte@latest` package is superseded. During scaffolding, select the `tailwindcss`, `prettier`, `eslint`, and `vitest` add-ons; add the Cloudflare adapter via `sv add sveltekit-adapter` (choose `cloudflare`) rather than installing it manually.

### Adapter decision: `@sveltejs/adapter-cloudflare`, not `adapter-static`

**Why not pure static:** Sanity's Presentation Tool / Visual Editing works best when preview routes can render server-side on demand. Pure static export requires a rebuild to see draft content, which breaks the live-preview workflow.

**What `adapter-cloudflare` gives us:**

- Static prerendering for public content routes (`export const prerender = true`)
- SSR on Cloudflare Workers for preview/draft routes
- Access to Cloudflare platform bindings (R2, KV, D1, Workers) if needed later
- Single adapter, single deployment target

**Default posture per route type:**

| Route type                                             | Rendering                              |
| ------------------------------------------------------ | -------------------------------------- |
| `/`, `/about`, `/now`, `/projects/*`, `/photography/*` | Prerendered at build time              |
| `/writing` index, `/writing/[slug]`                    | Prerendered; rebuild on Sanity webhook |
| `/preview/*` or any draft-mode route                   | SSR                                    |
| Form submission endpoints                              | SSR (Cloudflare Worker)                |

### Build triggers

Sanity webhooks → Workers Build trigger (or CI deploy) → rebuild static routes. Preview routes render fresh server-side, so no rebuild needed for draft content during editing.

---

## 1.4 Content Architecture

### Source of truth

**Sanity is the canonical content store** for everything written and editable: writing (notes, posts, essays, reviews, experiments), project pages, photography metadata (titles, captions, series membership), site configuration (navigation, about page, now page).

Content schema defined in TypeScript under the Sanity Studio configuration. The Studio is deployed as a subdomain (e.g., `studio.nicholascullencooper.com`) via Sanity's free hosting or your own Cloudflare deployment.

### Content types (initial)

| Type         | Purpose                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `writing`    | All written content (notes, posts, essays, reviews, experiments). Differentiated by a `kind` field. |
| `project`    | Project pages (software, design, photography series, creative)                                      |
| `photo`      | Individual photograph with metadata, references the original in R2                                  |
| `exhibition` | Themed photography exhibition grouping `photo` references with curatorial text                      |
| `page`       | Singleton editable pages (about, now, colophon)                                                     |
| `tag`        | Tags for cross-content taxonomy                                                                     |

### Portable Text rendering

Rich text stored as Portable Text (structured JSON, not HTML). Rendered via `@portabletext/svelte` with custom block serializers for:

- Code blocks (syntax highlighting)
- Image blocks (using Sanity image URLs with responsive `srcset`)
- Callouts / asides
- Embeds (YouTube, Bluesky posts, links with rich preview)
- Photo-set / inline gallery blocks

### Local Markdown (probably not needed)

**mdsvex is available** if a specific piece of content benefits from living in-repo as Markdown (e.g., a legal page, a manifesto written in an editor). Default to Sanity; use mdsvex only if there is a reason.

---

## 1.5 Photography: Display Copies vs. Originals

### The distinction

Sanity is the correct home for **display copies** of photographs (web-optimized, for site rendering).

Sanity is the **wrong home** for **originals** (full-resolution RAW, TIFF, or JPEG masters). The rationale is _archive-vs-editorial_, not free-tier capacity:

- **Sanity is a content platform, not a photography archive.** Originals need versioning, retention policy, and download control that a content CMS is not designed to prioritize. RAW files have no place in an editor's asset picker.
- **Mixing masters with editorial images creates operational ambiguity.** If everything is in Sanity, there is no clear line between "asset referenced by a post" and "long-term archive of your photographic work." That line should be load-bearing.
- **Print/licensing workflows want direct object storage.** Sending a master to a print lab should be a signed-URL off R2, not an export from a CMS.
- **Backup hygiene.** Sanity content is exportable but optimized for editorial assets; R2 + a separate offsite copy is the appropriate durability posture for irreplaceable masters.

(Sanity's free tier is currently 100GB asset storage, 100GB bandwidth, and 1M CDN requests/month — generous for display copies. Capacity is not the concern; category fit is.)

### The split

| Asset                                                    | Lives in                                                          | Access                                                                                                                                                          |
| -------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Originals** (RAW, full-res JPEG/TIFF)                  | **Cloudflare R2** with versioning. Private bucket.                | Never served publicly. Backed up separately (local + offsite). Used as the source when uploading to Sanity, sending to print labs, or producing display copies. |
| **Display copies** (web-sized, optimized JPEG)           | **Sanity assets**                                                 | Served publicly via Sanity's image CDN with URL-based transforms. This is what the site renders.                                                                |
| **Print masters** (for specific prints sold or produced) | **Cloudflare R2** with signed URLs when transmitted to print labs | Not on the website.                                                                                                                                             |

### Workflow

```
Take/edit photo
    ↓
Export full-res JPEG (sRGB, quality 95) from Lightroom/Capture One
    ↓
Upload original → Cloudflare R2 (private, versioned)
    ↓
Upload display copy → Sanity (via Studio or script)
    ↓
Reference `photo` document in Sanity content → SvelteKit renders via Sanity CDN
```

A small CLI tool or script can automate the dual-upload. Not required on day 1.

### Backup posture

- R2 is durable but not a backup by itself. Maintain at least one additional copy of originals (local NAS, external drive, or a second cloud provider).
- Sanity's content is exportable via their CLI (`sanity dataset export`); schedule periodic exports.

### Preview-route authentication

Since `/preview/*` routes SSR draft content from Sanity, they must be gated — otherwise drafts are publicly scrapable:

- Use a Sanity preview secret (env var, never committed) validated on the server-side load function for any draft-mode route.
- The Studio's Presentation Tool passes this secret when opening preview URLs; requests without it return 404.
- Treat the secret like any other production credential: stored in Cloudflare Workers secrets, rotated if exposed.

---

## 1.6 Hosting, Domain, and Email

### Hosting

**Cloudflare Workers** using **Workers Builds** and **Static Assets**. This is Cloudflare's current preferred path for new projects. Public routes can still be prerendered, SSR routes still run on Workers, and branch previews remain available via Workers preview URLs / non-production builds.

### Domain and DNS

- **Registration stays at Namecheap.** No transfer. Not worth the friction.
- **DNS moves to Cloudflare.** Change nameservers at Namecheap to Cloudflare's assigned pair. Manage all records (A, CNAME, MX, TXT) in Cloudflare.
- **Apex and www:** `nicholascullencooper.com` is the canonical apex; `www.` redirects to apex.
- **Reserved subdomains** (do not use for unrelated projects):
  - `studio.nicholascullencooper.com` — Sanity Studio
  - `api.nicholascullencooper.com` — possible future API endpoint
  - `newsletter.nicholascullencooper.com` — possible future newsletter archive
  - `photos.nicholascullencooper.com` — possible future direct photo service

### Email

- **Cloudflare Email Routing** (free) forwards `hello@nicholascullencooper.com` to your personal inbox.
- If outbound sending is needed later (transactional email from forms, newsletter delivery), add SES / Postmark / Resend at that point.

---

## 1.7 Operational Decisions

### Secrets management

- All secrets (Sanity project ID/token, Buttondown API key, Cloudflare R2 credentials, Turnstile keys) live in **Cloudflare Workers environment variables / secrets** configured via Wrangler environments and the Cloudflare dashboard.
- `.env.local` for local dev, never committed.
- `.env.example` committed with placeholder keys so contributors (and future-you) know what's needed.

### Forms (contact, newsletter signup)

- **Endpoint:** SvelteKit `+server.ts` route running on Cloudflare Workers (part of `adapter-cloudflare`).
- **Spam protection:** Cloudflare Turnstile (free, privacy-respecting; replacement for reCAPTCHA). Add a hidden honeypot field as a second layer.
- **Rate limiting:** Cloudflare Workers rate limiting via KV or D1 (when we add a form).
- **Delivery:**
  - Contact form → email via Cloudflare Email Workers or a transactional service (SES/Resend)
  - Newsletter signup → Buttondown API (when newsletter exists)
- **Validation:** Server-side schema validation with `zod` or `valibot` on all submissions.

### Accessibility target

**WCAG 2.2 AA.** Specifically:

- Semantic HTML (`<main>`, `<article>`, `<nav>`, `<header>`, `<footer>`) on every page
- `alt` text on every image (required field in the Sanity `photo` schema)
- Keyboard navigation works on every interactive component
- Visible focus indicators (not suppressed by design)
- Sufficient color contrast (4.5:1 minimum for body text)
- `prefers-reduced-motion` respected by all animations (including GSAP and Threlte scenes)

### Performance budgets

| Page type                        | LCP target | CLS target | JS shipped                         |
| -------------------------------- | ---------- | ---------- | ---------------------------------- |
| Home, About, Now                 | < 1.5s     | < 0.05     | < 30 KB                            |
| Writing index, individual pieces | < 2.0s     | < 0.1      | < 50 KB                            |
| Project pages                    | < 2.0s     | < 0.1      | < 50 KB                            |
| Photography gallery              | < 2.5s     | < 0.1      | < 80 KB                            |
| Interactive / playground pages   | < 3.0s     | < 0.1      | Allowed higher (document per-page) |

Measured via Cloudflare Web Analytics + Lighthouse CI in PR previews (optional; add if budgets start slipping).

### Vendor claim validation

Claims about print labs, newsletter platforms, and commerce services in this doc are based on public reputation and research as of early 2026. **Before committing to any vendor:**

- Order sample prints from Prodigi _and_ WhiteWall before deciding which to use. Quality claims from the internet are not sufficient for your own work.
- Verify current pricing at time of signup; pricing changes.
- Test Sanity's free-tier limits against actual usage before assuming they'll hold.

---

## 1.8 Repo Conventions

- **Name:** `nicholascullencooper.com`
- **Visibility:** Public
- **Structure:** **pnpm workspace monorepo**, matching Sanity's official `sanity-template-sveltekit-clean` layout:
  - `/web` — SvelteKit app (public site)
  - `/studio` — Sanity Studio (content editor)
  - Root `pnpm-workspace.yaml` declares both packages; each deploys independently.
- **License:** Not decided yet. Source of site is likely MIT; content (writing, photography) should remain copyrighted to Nicholas Cooper with `All rights reserved`. Add both notices in README.
- **Branch strategy:** `main` is deployed. Feature branches for non-trivial work. Preview URLs via Workers Builds / non-production branch deployments.
- **Commit style:** Conventional commits optional; honest short messages are fine.
- **README should explain:** what the repo is, the stack, the monorepo layout, how to run locally (both packages), where content lives (Sanity), where originals live (R2), and that the site is a public work-in-progress.

---

## 1.9 Implementation Plan (SvelteKit-Flavored)

### Phase 1 — Ship Nothing Ugly (Week 1–2)

**Phase 1a — landing only (current interim).**

1. SvelteKit scaffolded at repo root with `pnpm dlx sv create`, add-ons `tailwindcss`, `vitest`, `playwright`, `mcp`.
2. Lint/format via `oxlint` + `oxfmt` (Svelte-file formatting deferred to editor until oxfmt ships Svelte support).
3. `@sveltejs/adapter-cloudflare` wired; adapter-auto removed.
4. Identity implemented (Sentient + Switzer + JetBrains Mono, vermillion accent, light-default theme with user toggle) — see [DESIGN-IDENTITY.md](./DESIGN-IDENTITY.md).
5. Content model committed: persistent sections + periodic volumes — see [CONTENT-STRATEGY.md](./CONTENT-STRATEGY.md).
6. Single landing page at `/` (volume masthead + persistent-section map) + private `/styleguide`.

**Phase 1b — Hybrid content infrastructure (markdown for writing, Sanity for photos).**

7. **Done (2026-05-10):** restructured to a pnpm workspace monorepo with `/web` (SvelteKit) and `/studio` (Sanity Studio) as siblings — matches Sanity's official `sanity-template-sveltekit-clean` layout.
8. **Done (2026-05-10):** Sanity Studio scaffolded into `/studio` via `pnpm create sanity@latest --project pkxizwtb --dataset production --template clean --typescript`. Project ID `pkxizwtb`, dataset `production`.
9. **Done (2026-05-11):** committed to **hybrid content model** per CONTENT-STRATEGY.md §2 — markdown in git for writing/notes/projects/reading/pages/volumes; Sanity for photos/series/exhibitions only.
10. **Done (2026-05-11):** photo, series, and exhibition schemas defined in `/studio/schemaTypes/`. Verified the Studio surfaces them.
11. **Done (2026-05-11):** installed `@sanity/client`, `@sanity/image-url`, `@portabletext/svelte` in `/web`; client wrapper at `web/src/lib/sanity.ts` with `getPhotos()` / `getPhoto(slug)` helpers.
12. **Done (2026-05-11):** installed and configured `mdsvex` + `zod` in `/web`. `web/src/content/writing/*.md` is the writing source-of-truth; loader at `web/src/lib/content/writing.ts` validates frontmatter and exports `getEssays()` / `getEssay(slug)`.
13. **Done (2026-05-11):** `/writing` index + `/writing/[slug]` routes rendering mdsvex output; `/photography` index + `/photography/[slug]` routes fetching from Sanity. One sample essay (`2026-05-11-on-beginning.md`) ships as a placeholder until real content arrives.
14. **Next:** stand up the remaining persistent-section routes (`/notes`, `/projects`, `/reading`, `/about`, `/now`, `/colophon`) with their own frontmatter schemas + content loaders, following the writing pattern.
15. Deploy Sanity Studio (subdomain `studio.nicholascullencooper.com`).
16. (Once notes/projects/etc. exist, see step 14.)
17. Add the periodic volume layer (`/volumes`, `/volumes/[slug]`) when the first retrospective is ready to publish (target: end of summer 2026 per CONTENT-STRATEGY.md §3).
18. Move DNS for `nicholascullencooper.com` from Namecheap to Cloudflare.
19. Deploy SvelteKit to Cloudflare Workers (Workers Builds from the repo, pointed at `/web`), bind apex domain.
20. Set up Cloudflare Email Routing for `hello@nicholascullencooper.com`.
21. Set up RSS feed (`web/src/routes/feed.xml/+server.ts`) once there is at least one piece of writing to list. Possibly per-section feeds per CONTENT-STRATEGY.md.

### Phase 2 — Content Seed (Weeks 3–4)

11. Write and publish 2 project pages (starting with csaw)
12. Write and publish 3–5 pieces across subjects (mix of technical and non-technical)
13. Add `/photography` page with 6–8 curated images (upload originals to R2, display copies to Sanity)
14. Add `/now` page
15. Enable Cloudflare Web Analytics

### Phase 3 — Infrastructure Depth (Month 2–3)

16. Add `photo` and `exhibition` content types; build gallery and exhibition pages
17. Build the dual-upload workflow script (original → R2, display → Sanity)
18. Implement Sanity webhook → Workers Build trigger (or CI deploy) for content updates
19. Set up the Sanity Presentation Tool for visual editing on preview routes

### Phase 4 — Distribution & Interaction (Month 3+)

20. Add Pagefind when writing index exceeds ~30 pieces
21. Add Buttondown newsletter if cadence has proven out
22. Add first interactive/design-playground page (whichever idea has most earned it)
23. Add commerce (Lemon Squeezy embed, or Snipcart, or Prodigi integration) only if there is something real to sell

---

## 1.10 What I Will Not Do

- **Build the photo-original pipeline before there are photos to store.** In Phase 1, originals can live on your local machine; R2 sync comes in Phase 3.
- **Build the newsletter before there is writing cadence.** Six months of a site that posts monthly justifies a newsletter. A newsletter with no archive does not.
- **Design the perfect layout before shipping.** Ship a minimal, clean, imperfect v1. The content is the product.
- **Adopt every tool in the deferred list preemptively.** Each one gets added only when the triggering condition is met.
- **Mix interactive playground pages into the content stream.** They live as distinct routes (e.g., `/playground/*` or their own top-level URLs) with their own performance budgets and bundle sizes.

---

---

# Part 2: Exploration and Alternatives Considered (Reference Only)

> Everything below is historical exploration that led to the decisions in Part 1. It is preserved for context and in case any of these alternatives need to be revisited. **It is not current recommendations.** Where Part 1 and Part 2 conflict, Part 1 wins.

## 2.1 Framework Alternatives Considered

### Astro

Evaluated as the default for content-forward sites. Strong content collection API, excellent image story via `astro:assets`, first-class Cloudflare deployment. Content loaders (current API, not stale `@astrojs/image`) can consume Sanity.

**Why not chosen:** The islands model is designed for "content-first with isolated interactive pieces," which conflicts with the stated ambition for design-forward full-page interaction, design playground sections, and motion-heavy pages. For a scoped-down version of the site (pure content, minimal interactivity), Astro would be a defensible choice.

**Important note:** Astro was acquired by Cloudflare in January 2026. The framework now has strong long-term institutional backing and deepening Cloudflare integration. This strengthens Astro's position for content sites specifically. It does not change the design-forward architectural argument.

### Next.js

Evaluated for the largest ecosystem and best Sanity integration (`next-sanity` with visual editing).

**Why not chosen:** Heavier framework surface, RSC/caching mental overhead, and no Angular career transfer to justify the weight. For a content-and-creative site where Svelte's primitives and Threlte handle the same jobs with less runtime and less complexity, Next.js is more framework than the site needs.

### Analog (Angular meta-framework)

Evaluated for day-job career alignment.

**Why not chosen:** The animation ecosystem is the thinnest of the three candidates (`@angular/animations` deprecated; `angular-three` is niche; no Motion equivalent). No public examples of design-forward Analog sites. The career value is real but belongs on a dedicated Angular side project ("Workbench" dashboard is the current leading candidate) rather than the public-identity site.

### Vite + TypeScript without framework

Evaluated for maximum design freedom.

**Why not chosen:** Reinventing routing, content management, SSG, and SEO for a 50+ page content site is work that frameworks exist to eliminate. A "framework-less creative portfolio" is a legitimate niche, but this site is a hybrid content + creative site where the content side would suffer.

---

## 2.2 CMS Alternatives Considered

A full survey was conducted covering 25+ options. Key alternatives:

- **Payload CMS** — Meaningfully stronger in 2026 than earlier drafts assumed. Code-first TypeScript schema (lives in-repo), Lexical-based rich text with first-class Markdown↔JSON↔MDX conversion, official S3 storage adapter that works with R2, and a now-published path for running the entire CMS on Cloudflare Workers ([Cloudflare blog, Jan 2026](https://blog.cloudflare.com/payload-cms-workers/)). The genuine trade-offs vs. Sanity are: (a) **no built-in image CDN** — you'd serve raw R2 or pay for Cloudflare Images — which matters for a photography-heavy site; (b) **no SvelteKit-specific visual-editing story** comparable to Sanity's Presentation Tool; (c) self-hosting still means standing up a DB (D1 or external Postgres), migrations, and admin auth. Reconsider Payload if Sanity's pricing or posture changes, or if "everything in TypeScript in one repo" becomes more valuable than the image/preview tooling Sanity provides out of the box.
- **Strapi** — As of 2026 the official `@strapi/provider-upload-aws-s3` supports Cloudflare R2 as a first-class target, so the earlier "R2 support is third-party" objection is resolved. Rejection now rests on fit: admin UX is marketing-ops flavored rather than writing-first, and running a long-lived Node + DB server for a personal site is disproportionate ops overhead for one maintainer.
- **Ghost** — Best writing experience, built-in newsletter. Rejected because fixed content model (only posts/pages/tags) can't express distinct content types (experiments, reviews, projects, photography).
- **Directus** — Strong image transformation API with signed URLs and presets; S3/R2 storage is supported. Rejected because the admin is a data-management surface rather than a writing surface — wrong tool for a writer-first site, regardless of its image capabilities.
- **Contentful, Hygraph, Storyblok, Cosmic** — Variously expensive, rigid, or wrong-vibed for a writer-first personal site.
- **Keystatic** — Git-backed, zero infrastructure. Would be the answer if the framework were Astro and the image pipeline were handled externally. For SvelteKit with photography-heavy content, Sanity is better.
- **TinaCMS, Sveltia CMS, Decap, Outstatic** — Git-backed editing layers on top of Markdown. Fine for simpler scopes.

Sanity won on: zero operational burden (hosted), built-in image CDN for display copies (decisive for photography content), generous free tier (100GB assets / 100GB bandwidth / 1M CDN req per month), official SvelteKit template and Presentation Tool for live preview, framework-agnostic portability, and content-modeling flexibility.

---

## 2.3 Newsletter Alternatives Considered

- **Ghost (built-in)** — Would be the answer if Ghost were the CMS. It's not.
- **listmonk** — Free, self-hosted, powerful. Rejected because operational overhead isn't worth it for a personal newsletter.
- **Resend + React Email** — Maximum design control, but React Email doesn't help a SvelteKit site, and manual subscriber management is overhead.
- **Substack** — Walled garden, 10% revenue cut, no headless API. Not aligned with the owned-identity principle.
- **Beehiiv, ConvertKit, Mailchimp** — Creator-economy / marketing-team vibe. Wrong fit.

Buttondown won on: Markdown-native, indie-run, privacy-respecting, API-first, clean aesthetic. Note: RSS-to-email integration details and free-tier feature list should be verified at signup time; vendor plans change.

---

## 2.4 Commerce Alternatives Considered

- **Gumroad** — 10% fee + $0.50/transaction. Too expensive relative to Lemon Squeezy.
- **Payhip** — Lower fees at scale, but requires monthly plan to get there.
- **Shopify Storefront API** — Overkill for a personal site selling occasional digital goods or prints.
- **Medusa.js** — Open-source headless commerce. Powerful, self-hosted, too complex for the scope.
- **Podia / Teachable / Kajabi** — Course platforms. Wrong tool unless courses become primary.

Recommended path: **Lemon Squeezy** for digital products (ebooks, presets, guides) via their checkout overlay. **Prodigi** (API-first POD) for print fulfillment, with **WhiteWall** as a premium upgrade path once sample quality is validated. **Snipcart** only if a unified cart across product types becomes necessary.

Pricing details in the deferred tools table should be re-verified at time of adoption.

---

## 2.5 Image Delivery Alternatives Considered

- **Cloudinary** — Excellent transformation pipeline. Rejected in favor of Sanity's built-in CDN for display copies (avoids an extra service) and R2 for originals (avoids Cloudinary's bandwidth-based pricing at scale).
- **imgix** — Professional-grade, expensive.
- **Cloudflare Images** — Paid add-on. Sanity's CDN suffices for display.
- **R2 + Sharp at build time only** — Possible but creates a second pipeline parallel to Sanity. Simpler to keep Sanity for display and R2 only for originals/archive.

The "Sanity for display, R2 for originals" split was chosen to separate the editorial-web use case from the photographic-archive use case, which have different requirements.

---

## 2.6 Hosting Alternatives Considered

- **Vercel** — First-class for Next.js, equivalent to Cloudflare for SvelteKit. Chose Cloudflare for DNS/R2/Workers consolidation.
- **Netlify** — Fine, equivalent, no reason to prefer over Cloudflare given the consolidation argument.
- **GitHub Pages** — No serverless functions, no env vars, no preview deploys. Too limited.
- **Self-hosted on homelab** — Explicitly rejected. Public identity needs reliable global delivery.

---

## 2.7 Domain Registrar Alternatives Considered

- **Transfer to Cloudflare Registrar** for at-cost pricing. Evaluated and rejected: the $5–15/year savings do not justify migration friction, and Namecheap is a well-functioning registrar with existing account infrastructure.

The registrar choice is effectively irrelevant once DNS moves to Cloudflare. DNS is where the operational decisions live; registration is just renewal billing.

---

## 2.8 Missing Decisions (Now Addressed in Part 1)

Earlier drafts of this document omitted:

- Adapter specificity (now: `adapter-cloudflare`)
- Originals-storage policy (now: R2 for originals, Sanity for display)
- Form spam/security posture (now: Turnstile + honeypot + server validation)
- Secrets management (now: Cloudflare Workers environment variables / secrets)
- Accessibility target (now: WCAG 2.2 AA)
- Performance budgets (now: per-page-type targets in §1.7)
- Vendor claim validation (now: explicit "validate with samples" for print labs)
- License posture (now: MIT for source, rights-reserved for content)
- Preview-route authentication (now: Sanity preview secret gating on SSR draft routes, §1.5)
- Repo structure (now: pnpm workspace monorepo with `/web` and `/studio` siblings, §1.8)

Earlier drafts also contained claims that have since been corrected against primary-source verification:

- **Sanity free-tier numbers.** An earlier draft stated "10GB assets, 500K CDN req/month" as the trigger to split originals off to R2. Current Sanity pricing is 100GB assets + 100GB bandwidth + 1M CDN req/month. The R2-split is still correct, but on archive-vs-editorial grounds — not capacity.
- **SvelteKit scaffolding CLI.** An earlier draft referenced `pnpm create svelte@latest`. The current official CLI is `sv` — invoked via `pnpm dlx sv create` (or `npx sv create`). The older `create-svelte` package is superseded.
- **Svelte 5 TypeScript DX.** An earlier draft cautioned about "rough edges" in prop typing. Those were pre-stable rough edges; `$props<Props>()` in Svelte 5 stable is clean.
- **Strapi / Directus R2 support.** Earlier framing treated R2 support as a weakness for both. As of 2026 both have first-class S3-compatible R2 paths. Their rejection now rests on fit (writing UX, ops burden), not on storage capability.

These are all now captured in Part 1.
