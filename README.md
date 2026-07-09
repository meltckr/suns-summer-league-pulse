# Suns Summer League Pulse

Suns Summer League Pulse is a premium mobile-first private owner briefing series produced by Accelerated Velocity Consulting / AVC.

Audience: Mat Ishbia, owner of the Phoenix Suns.

Positioning: Public information. Owner-level clarity.

This is not a scouting report, coaching report, regular-season dashboard, or stats dump. Each issue turns verified public reporting into a lighter editorial briefing that can be sent as a GitHub Pages link and preview cleanly in iMessage.

## Live Site

Deployment URL:

https://meltckr.github.io/suns-summer-league-pulse/

Repository:

https://github.com/meltckr/suns-summer-league-pulse

## Structure

```text
suns-summer-league-pulse/
  index.html
  og-image.jpg
  og-preview.html
  README.md
  skill/
    suns-summer-league-pulse-skill.md
  issues/
    issue-01-owner-preview.html
  assets/
    README.md
    avc-logo-full-dark.svg
    phoenix-suns-logo.png
    vegas-courtside-v2.jpg
```

## Update The Live Issue

1. Edit `index.html`.
2. Copy the final live issue to `issues/issue-XX-name.html`.
3. Replace `og-image.jpg` with the matching 1200x630 preview image.
   - `og-preview.html` is the editable source layout for the current preview.
4. Confirm these metadata values before publishing:
   - `og:url` points to `https://meltckr.github.io/suns-summer-league-pulse/`
   - `og:image` and `twitter:image` point to `https://meltckr.github.io/suns-summer-league-pulse/og-image.jpg`
   - title and OG title match the issue title
5. Commit and push to `main`.

## Generate Future Issues

Use the issue skill in `skill/suns-summer-league-pulse-skill.md` as the editorial checklist.

Recommended flow:

1. Gather official NBA and team sources first.
2. Verify schedule, roster, broadcast, transaction, injury, and quote claims before writing.
3. Draft the briefing around owner-level signals, not volume.
4. Cut any detail that is not verified.
5. Create the new issue HTML from the existing accordion structure.
6. Generate or update the OG image.
7. Archive the issue under `issues/`.

## Accuracy Rule

Accuracy over volume. If a fact cannot be verified, omit it.

Do not invent tip times, broadcast info, stats, quotes, public sentiment, roster details, or internal team opinions.

## GitHub Pages Setup

GitHub Pages should publish from:

- Branch: `main`
- Folder: `/` root

No build step is required. The site is plain HTML/CSS/JS.
