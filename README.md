# Suns Summer League Pulse

Premium owner-facing Summer League briefing system for Accelerated Velocity Consulting.

Product:

- **Suns Summer League Pulse**
- **Private Owner Briefing**
- Positioning line: **Public information. Owner-level clarity.**

Audience: Mat Ishbia / Phoenix Suns ownership.

## What This Is

This is a concise public-information intelligence brief, not a scouting report, coaching report, GM memo, or insider document. Each issue should save ownership time by turning public reporting, schedule context, media framing, and public sentiment into a polished one-page read.

## Project Structure

- `data/issues/` contains one JSON file per issue.
- `scripts/render.js` renders an issue JSON file into a static HTML page and text-message file.
- `scripts/build_og_image.py` generates a dynamic editorial cover / OG image from each issue's `cover` metadata.
- `styles.css` controls the premium AVC-branded briefing system.
- `assets/brand/logos/` stores AVC logo assets reused from the existing Suns briefing repo.
- `assets/teams/suns/` stores the Suns context logo.
- `dist/` contains generated review-ready issue pages.

## Current Prototype

Issue 01:

- Source data: `data/issues/issue-01-owner-preview.json`
- Generated page: `dist/issue-01-owner-preview/index.html`
- One-page PDF: `dist/issue-01-owner-preview/suns-summer-league-pulse-issue-01-one-page.pdf`
- One-page preview image: `dist/issue-01-owner-preview/suns-summer-league-pulse-issue-01-one-page.png`
- OG/iMessage preview image: `dist/issue-01-owner-preview/og-suns-summer-league-pulse-issue-01.png`
- Text-message version: `dist/issue-01-owner-preview/text-message-version.txt`

## Generate An Issue

From this folder:

```bash
node scripts/render.js data/issues/issue-01-owner-preview.json
node scripts/render_one_page.js data/issues/issue-01-owner-preview.json
python3 scripts/build_og_image.py data/issues/issue-01-owner-preview.json
```

## Dynamic Cover System

Each issue can define a `cover` block in its JSON:

- `image`: the OG / iMessage preview image filename.
- `kicker`: the edition label, such as `Vegas Issue`, `Game Day Pulse`, or `Postgame Pulse`.
- `coverLine`: the sharp editorial line used in link previews and the generated cover.
- `visualLabel`: the short label on the cover plate.
- `subjects`: the names or themes stacked on the cover.
- `updatedThrough`: the current-through timestamp or date.

The same cover metadata powers the report hero, Open Graph metadata, Twitter card metadata, and generated preview image.

## PDF Export

The generated page is print-optimized. For the compact owner attachment, render the one-page HTML and export it to PDF:

```bash
node scripts/render_one_page.js data/issues/issue-01-owner-preview.json
NODE_PATH=/Users/meltucker/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules /Users/meltucker/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/export_pdf.js issue-01-owner-preview one-page
```

Use the full HTML page when more detail is useful; use the one-page PDF for quick iMessage or email delivery.

## Editorial Guardrails

- Use official language only when the source is official.
- Use `reported`, `expected`, `scheduled`, or `pending confirmation` when appropriate.
- Do not overstate access or imply private team information.
- Maintain a humble, signal-oriented ownership tone: organize what may be useful to monitor or consider, without telling ownership what it should do.
- Prefer `signals to monitor`, `may be useful`, `worth considering`, and `question to consider internally`.
- Keep the AVC mark present but discreet.
- Keep the brief scannable enough to read in under three minutes.
- Make the text-message version useful on its own.
