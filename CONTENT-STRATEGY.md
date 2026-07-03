# nicholascullencooper.com — Content Strategy

> **Provisional (v0.4).** The model is committed (including the hybrid markdown/Sanity split below); the publication name, the full section list, and the precise rhythm of retrospectives remain open. Anything marked _open_ should be revisited as the site develops.
>
> Last updated: 2026-05-11

---

## Part 1: The Model

The site is a **permanent archive**. Volumes are **post-hoc retrospectives** — looking back, not promising forward.

This single sentence resolves the tension between three competing instincts:

- The **magazine instinct** (issued, finite, polished, ritualistic) — gives the site editorial rhythm and a sense of artifact.
- The **archive instinct** (additive, permanent, categorically organized) — respects that real content lives at stable URLs forever.
- The **garden instinct** (interconnected, evolving, never frozen) — respects that some thinking _is the evolution_, not a deliverable.

The model accommodates all three by separating **substance** (which is permanent) from **curation** (which is opportunistic).

### The two layers

**Persistent layer — the substance.** Every piece of content lives at a stable URL forever. Writing accumulates in `/writing`, photography in `/photography`, notes evolve in `/notes`, and so on. These sections grow, never close. They are the site's body.

**Periodic layer — the retrospectives.** When a quarter ends and there is enough material worth looking back on, a volume is published as a _retrospective_. It is **a lens, not a box** — it does not contain content, it _selects from it_. A retrospective is a one-page editorial act: a short letter, a chosen feature, a chosen plate, a few notes worth flagging from the period. Pieces continue to live in their permanent sections; the volume features them at a moment in time, in retrospect.

**Why retrospective, not prospective.** Forward-cadence pressure ("Vol. II promised by June 21") risks turning the magazine layer from artifact into embarrassment. Retrospective volumes have no such pressure: if a quarter was quiet, no volume is published. If a quarter was rich, the retrospective is written _after_ the period ends, looking back honestly. This keeps the editorial ritual without breaking the sustainability that makes a one-author site work for years.

### What this preserves

- A reader can navigate the site by **section** (`/photography` is a real photographer's gallery, not "volume III's photography").
- A reader can also navigate by **volume** (an editorial view of _what mattered this quarter_).
- Pieces have **history as published objects** — an essay can carry "Featured in Vol. I · Spring 2026" as metadata.
- The garden grows. The link aggregator aggregates. The portfolio accumulates. None of this is held hostage to a publication cycle.

### Why this is distinct from a blog, a portfolio, a garden

- A **blog** is reverse-chronological all the way down; nothing is curated.
- A **portfolio** is curated but timeless — no rhythm, no editorial voice in time.
- A **digital garden** is interconnected and evolving but lacks the ritual of "publication."

This site is **all three at once**: blog-like sections accumulate, portfolio-like polish exists where it earns it, garden-like notes evolve — and a quarterly volume sits on top, reading as the editor's quarterly opinion about what was worth attention.

---

## Part 2: Persistent Sections (the substance)

These have stable URLs, accumulate over time, and exist independent of any volume.

### Hybrid storage model (locked v0.4)

Content storage splits along the line where each tool genuinely earns its place:

| URL            | Storage             | What it holds                                        | Why this tool                                                                                                                        |
| -------------- | ------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `/writing`     | **markdown in git** | Essays, reviews, notes-as-essays                     | Writing is what matters most long-term. Git gives sovereignty, diffable history, and "edit in any editor" portability.               |
| `/notes`       | **markdown in git** | Digital garden — interconnected, evolving thinking   | Notes need git's edit-anywhere workflow more than they need a polished CMS.                                                          |
| `/projects`    | **markdown in git** | Software, design, things made                        | Project case-studies are essentially writing with screenshots. Markdown.                                                             |
| `/reading`     | **markdown in git** | Running cabinet of recommendations / link aggregator | Trivial data shape (title + URL + tags + note); no CMS justified.                                                                    |
| `/photography` | **Sanity**          | Photographs — single plates, series, exhibitions     | Sanity is best-in-class at image authoring: drag-drop upload, hotspot/focal-point, EXIF metadata, URL transforms, structured series. |

Smaller persistent objects (markdown in git, low ceremony):

| URL              | What it holds                                                          |
| ---------------- | ---------------------------------------------------------------------- |
| `/about`         | Who Nicholas is, what the site is for                                  |
| `/now`           | What's currently happening — overwritten frequently, no history        |
| `/colophon`      | How the site is made (typography, tools, credits)                      |
| `/drafts`        | Visible work-in-progress (the "show your hand" move; opt-in per piece) |
| `/calling-cards` | Reader guestbook — names + one-sentence introductions                  |
| `/index`         | Complete inventory of every piece ever published                       |

### Why hybrid

Considered three positions:

1. **All Sanity** — fastest setup, but the sovereignty concern about writing is real (one-author site running for years means the _writing_ needs to be the most portable thing).
2. **All git** — maximum sovereignty, but photography at the user's stated volume (200/quarter) means building a photo pipeline (CF Images + sharp transforms + EXIF + hotspot UI) that is real engineering against a problem Sanity already solves well.
3. **Hybrid: markdown for writing, Sanity for photos only** — preserves git sovereignty where it matters most (the text), uses Sanity where it genuinely earns its weight (image-heavy authoring), keeps the vendor surface narrow.

Hybrid wins. Sovereignty concern is addressed for the most-precious content (writing); engineering tax is minimized for the highest-volume content (photography). Migration off Sanity later remains tractable — only photo metadata and display copies live there. Originals stay archived in R2.

**Open:** `/notes` and `/reading` may merge or split. `/drafts` is brave but not committed. `/calling-cards` is a yes-if-it-feels-right.

### Each persistent section can have its own dialect

Within the overall identity (Sentient + Switzer + vermillion + warm paper), each section can be set in a slightly different register:

- `/photography` — bigger plates, minimal text, full-bleed photographs, dense captions.
- `/writing` — long single-column reading measure, drop caps, generous leading.
- `/notes` — denser, lower ceremony, backlinks visible, non-chronological.
- `/projects` — case-study layout, more sans, screenshots/diagrams treated as plates.
- `/reading` — list-dense, minimal ornament, scannable.

Same identity, different dialects per room. Compare the cover, contents, feature, and back-matter pages of an indie magazine — each spread has its own typographic register while sharing a masthead.

---

## Part 3: Periodic Retrospectives (the curation)

A retrospective is a **one-page editorial act** that selects from the persistent sections, _after the fact_.

### Naming

For now, retrospectives are called **Volumes**. A bound book Volume _is_ a retrospective collection in publishing — the term fits even when nothing is promised forward. The first retrospective will be **Volume I**, with a per-volume title (working candidate: _In the Beginning._).

**Open: a future formal publication name.** The site may eventually adopt a magazinish name — something like _The Cullen Review_ (illustrative, not committed). Until then, the site is Nicholas Cullen Cooper and volumes carry their own per-volume titles. Naming is a decision that costs nothing to defer.

### Cover hierarchy

The site has no separate publication name yet. **The site is Nicholas Cullen Cooper.** The landing has two states:

#### State A — current (no retrospective yet)

1. **Masthead — `Nicholas Cullen Cooper`.** Small-caps Switzer, persistent across every page (lives in the SvelteKit layout).
2. **Tag (cover hero) — _"Writing, photography, engineering, and the things in between."_** Sentient display at hero size. The publication's permanent statement, elevated to cover hero in the absence of a featured volume.
3. **The map of persistent sections.**
4. **Correspondence.**

No "Volume I · In preparation" framing. No anticipatory volume title. The cover is honest about being early — the publication's character is on display, but no retrospective is being promised.

#### State B — when a retrospective is featured

1. **Masthead — `Nicholas Cullen Cooper`.** Same.
2. **Volume metadata (eyebrow) — `Volume I · Spring 2026 · in retrospect`.** Small-caps Switzer, muted.
3. **Volume title (cover hero) — `In the Beginning.`** Sentient display. The retrospective's voice for that period.
4. **Tag (returns to standfirst role) — _"Writing, photography, engineering, and the things in between."_** Sentient italic, muted. Beneath the volume title.
5. **Editor's letter** — short paragraph reflecting on the period.
6. **Retrospective body** — Feature, Plate, Dispatch, Notes from the Quarter, Correspondence (described below).

The tag is **always present** — its position shifts. When no retrospective features, the tag _is_ the cover. When a retrospective features, the volume title is the cover and the tag returns to its standfirst role beneath.

### Structure of a volume page (the body, below the cover)

Below the cover, every volume page contains some combination of:

1. **The Feature** — one essay, called out as the volume's centerpiece. Linked to its permanent URL in `/writing`.
2. **The Plate** — one photograph or photo essay, presented large. Linked to `/photography`.
3. **A Dispatch** — a project update, written as correspondence. Linked to `/projects`.
4. **Notes from the Quarter** — 3–7 selected items pulled from `/notes` or `/reading`, each one a one-line gloss.
5. **Correspondence** — replies to earlier volumes, selected emails, letters received.
6. **Colophon footer** — typography, build info, accent color of the volume (if it shifted).

Not every volume contains every block. A photography-heavy volume might omit the Dispatch; a writing-heavy volume might use Plate sparingly. The structure is a permission set, not a checklist.

### URL structure

```
/                              → the current volume's masthead page
/volumes                       → list of all volumes (most recent first)
/volumes/i-spring-2026         → Volume I, permanent
/volumes/ii-summer-2026        → Volume II, when it drops
…
```

When a new volume publishes, `/` reflects the new volume; the previous volume freezes at its permanent URL.

### Cadence — opportunistic, not committed

The model's commitment is to **publish a retrospective when one is earned**, not on a fixed timetable. There is no public promise that Volume II will publish on a specific date. This is the structural feature that makes the model sustainable for one author.

Working targets (for planning, not promising):

- **First retrospective (Volume I):** **end of summer 2026** (≈ September 21, autumn equinox), looking back at the launch period. Earlier if May/June 2026 is unusually productive — could ship as a Spring retrospective in late June.
- **Subsequent retrospectives:** roughly seasonal (quarterly), but no fixed calendar. A quiet quarter produces no retrospective; a rich quarter produces one.

The phrase to use internally: _"a retrospective when there's something worth looking back on."_ If pressed on cadence externally: _"roughly seasonal, when earned."_

### Theme — open

A volume can carry a **loose theme** (a mood, an obsession, a phrase) that suggests but does not constrain. Themes signal editorial intent without imposing it on content that wants to wander.

Volume I might be **Beginnings** — a self-aware first issue. Subsequent themes might emerge naturally from what's been accumulating in the persistent sections.

Themes are NOT mandatory. If no theme emerges, the volume can just publish.

---

## Part 4: Brave Moves (revised against the model)

From a working list of 8 + 6 brave moves explored in conversation. Re-audited against the persistent-substance + periodic-curation model:

### Live (compatible with the model, worth keeping on the table)

1. **Quarterly volumes** — see cadence above.
2. **Loose theme per volume** — see theme above.
3. **Visible drafts at `/drafts`** — permanent room, opt-in per piece. A standing invitation to peek behind the curtain.
4. **Marginalia layer** — small running notes (books read, tools used, phrases returning to) that appear in the margins of essays and accumulate over time. A second slower text alongside the primary one.
5. **Print-on-demand per volume** — each volume exports as a designed PDF; can be ordered as a small zine through Newspaper Club or similar. Digital → physical loop.
6. **Calling cards instead of comments** — `/calling-cards` accumulates reader introductions; volumes can feature favorites in the Correspondence block.
7. **Masthead rebinds per volume** — small typographic shift each quarter (accent color, weight, italic). Same identity, different season.
8. **One commissioned piece per year** — a guest contributor (writer, photographer, illustrator). Lives in `/writing` permanently; headlines its volume.
9. **Each section has its own dialect** (see §2) — `/photography` doesn't look like `/writing` doesn't look like `/notes`, even though all share the identity.
10. **The volume reads as an index into the permanent site** — Volume I's masthead links to permanent URLs in `/writing`, `/photography`, etc. Both an editorial view _and_ a wayfinder.
11. **Reading paths through the garden** — a volume can publish a _path_ — "if you only read three notes from this quarter, follow these." A web-native magazine move enabled by interconnected notes.
12. **"Still in print" metadata** — each piece at its permanent URL displays the volumes it has been featured in (sometimes more than one).
13. **Section-scoped subscriptions** (when newsletter ships) — subscribe to `/photography` only, `/writing` only, or the full quarterly volume.
14. **`/index` — the inventory page** — a dense, machine-readable, human-scannable register of every piece ever published. End-matter of an annual bound volume.

### Open (not yet decided whether to commit)

- **Show drafts publicly** — bravery cost is real. Some authors thrive with it; others would never publish if it were the norm. Test on one piece before committing the whole site.
- **Print runs** — operational overhead is real (designing the PDF, ordering, handling). Do once, see how it feels.
- **Refuse analytics** — Cloudflare Web Analytics is privacy-respecting but it's still tracking. The bravest move is no analytics at all. Counter-argument: no signal about what readers find. Open question.
- **A photo of Nicholas on the site** — writer-photographer site without a face is unusual. Could go on `/about` or as a quiet portrait in the colophon.

---

## Part 5: The Cadence Test (kept, simplified)

Because the model is now retrospective rather than prospective, this test is no longer load-bearing — it's a sanity check, not a gate. The point is to confirm there _will be_ something worth looking back on by end of summer 2026.

When approaching the first retrospective window (mid-summer onward), ask:

1. Could I draft an editor's letter looking back at this period? Three to five sentences, honest.
2. Could I name a Feature, a Plate, and a Dispatch from what's actually been added to the persistent sections in the quarter?
3. Are there 3–7 notes worth highlighting from the period?

If yes, ship Volume I. If no, wait. The persistent sections continue regardless. **There is no public deadline to embarrass.**

---

## Part 6: Open Questions

1. **Formal publication name** — keep "Volume" + author masthead, or eventually adopt a magazinish name (e.g., _The Cullen Review_, illustrative)? Costs nothing to defer.
2. **Section list** — is `/notes` separate from `/reading`? Is `/drafts` a real public commitment? Is `/calling-cards` happening?
3. **Theme structure** — every volume carries a theme, or only some?
4. **Landing once content exists** — does the section map evolve into a "recent items" view, or stay as a static list of rooms?
5. **Newsletter / RSS** — does a retrospective trigger an email? Just RSS? Both? None?
6. **Comments / engagement** — calling cards are the leaning answer. Anything else (replies, reactions, threaded discussion) explicitly off the table.

---

## Part 7: Principles (summary)

1. **Substance is permanent. Curation is periodic.**
2. **A volume is a lens, not a box.**
3. **Pieces live at stable URLs forever; volumes can re-feature them.**
4. **Each section can speak its own dialect; the identity is the masthead they share.**
5. **Don't promise cadence you haven't tested.**
6. **The site is a publication, but only if cadence is real. Otherwise it's an archive — also good.**
7. **Brave moves earn permanence. Decorative ones get cut.**
