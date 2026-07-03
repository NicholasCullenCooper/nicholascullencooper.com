# nicholascullencooper.com — task runner
#
# Run `just` (no args) or `just --list` to see all recipes.
# In your normal terminal these just work because fnm is activated in .zshrc.
# For non-interactive contexts (CI, scripts), prefix with `fnm exec --` to
# guarantee node is on PATH first.

default:
    @just --list

# --- Dev ---

dev:
    pnpm --filter web dev

build:
    pnpm --filter web build

preview:
    pnpm --filter web preview

check:
    pnpm --filter web check

# --- Quality ---

lint:
    pnpm lint

fmt:
    pnpm fmt

fmt-check:
    pnpm fmt:check

test:
    pnpm --filter web test

test-unit:
    pnpm --filter web test:unit

test-e2e:
    pnpm --filter web test:e2e

# --- Studio (Sanity) ---

studio:
    pnpm --filter studio dev

studio-build:
    pnpm --filter studio build

studio-deploy:
    pnpm --filter studio deploy

# --- Setup ---

# Install Node (via fnm) and all workspace deps. Run after cloning the repo.
setup:
    fnm use --install-if-missing
    corepack enable pnpm
    pnpm install
