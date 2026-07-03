# nicholascullencooper.com

Source for [nicholascullencooper.com](https://nicholascullencooper.com) — the personal site of Nicholas Cullen Cooper. Writing, photography, engineering, and the things in between.

This is a public work-in-progress.

## Stack

- **SvelteKit 2** with **Svelte 5** (runes), TypeScript
- **Tailwind CSS 4**
- **Cloudflare Workers** via `@sveltejs/adapter-cloudflare`
- **Sanity** for photography content (project `pkxizwtb`, dataset `production`)
- **Markdown in git** for writing, notes, projects, reading, pages, volumes
- **Cloudflare R2** for photography originals (planned)
- **oxlint** + **oxfmt** for linting and formatting

See [`SITE-ARCHITECTURE.md`](./SITE-ARCHITECTURE.md), [`CONTENT-STRATEGY.md`](./CONTENT-STRATEGY.md), and [`DESIGN-IDENTITY.md`](./DESIGN-IDENTITY.md) for the canonical decisions and their rationale.

## Repo layout

This is a **pnpm workspace monorepo** matching Sanity's official `sanity-template-sveltekit-clean` shape.

```
.
├── web/        # SvelteKit app (public site) — pnpm filter: web
├── studio/     # Sanity Studio (content editor) — pnpm filter: studio
├── Justfile    # Task runner (`just --list`)
└── *.md        # Canonical docs (architecture, content, identity)
```

Each package deploys independently:

- `web/` → Cloudflare Workers (Workers Builds)
- `studio/` → Sanity Studio hosting (or Cloudflare deploy), eventually at `studio.nicholascullencooper.com`

## Toolchain

- **Node** managed via [**fnm**](https://github.com/Schniz/fnm). Version pinned in [`web/.node-version`](web/.node-version).
- **pnpm** via corepack (ships with Node). Auto-enabled by `just setup`.
- **Task runner**: [**just**](https://just.systems). Recipes in [`Justfile`](./Justfile).
- Lint / format: **oxlint** + **oxfmt** (with `.svelte` files deferred to editor formatting — see note below).

## Develop

First time on a machine:

```sh
brew install fnm just            # if not already installed
cd nicholascullencooper.com
just setup                       # installs Node (via fnm) + pnpm + workspace deps
```

After that, in your terminal:

```sh
just dev          # SvelteKit site at http://localhost:5173
just studio       # Sanity Studio at http://localhost:3333
```

> **Shell setup.** fnm needs activation in your shell init to auto-switch Node when you `cd` into the repo. Add to `~/.zshrc`: `eval "$(fnm env --use-on-cd --shell zsh)"`.

## Tasks

| Command              | What it does                                           |
| -------------------- | ------------------------------------------------------ |
| `just dev`           | SvelteKit dev server at http://localhost:5173          |
| `just build`         | Production build for Cloudflare Workers                |
| `just preview`       | Preview the production build locally                   |
| `just check`         | `svelte-check` type + a11y diagnostics                 |
| `just lint`          | `oxlint` over TS / JS / `<script>` blocks (whole repo) |
| `just fmt`           | `oxfmt` over non-Svelte source files                   |
| `just fmt-check`     | `oxfmt --check` (no writes; for CI)                    |
| `just test`          | Vitest + Playwright                                    |
| `just test-unit`     | Vitest only                                            |
| `just test-e2e`      | Playwright only                                        |
| `just studio`        | Sanity Studio dev at http://localhost:3333             |
| `just studio-build`  | Build Sanity Studio                                    |
| `just studio-deploy` | Deploy Sanity Studio                                   |
| `just setup`         | First-time setup (Node + pnpm + deps)                  |

For non-interactive contexts (CI, scripts, AI coding tools), prefix with `fnm exec --` to guarantee Node is on `PATH`:

```sh
fnm exec -- just check
fnm exec --using=24.15.0 -- pnpm --filter web build
```

### A note on `oxfmt` and `.svelte` files

As of oxfmt 0.45, formatting `.svelte` files requires Prettier plugin support that is not yet implemented. `.svelte` files are excluded from `oxfmt` via `.oxfmtignore` and are formatted by the editor (VSCode Svelte extension) until oxfmt ships Svelte support.

## License

- Source code: MIT (see `LICENSE`, when added)
- Content (writing, photography, prose): &copy; Nicholas Cullen Cooper, all rights reserved
