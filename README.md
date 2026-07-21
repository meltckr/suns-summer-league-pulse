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
    issue-02-game-01-postgame.html
    issue-03-game-02-pregame.html
    issue-04-game-02-postgame.html
    ...
    issue-09-game-05-postgame.html
    issue-10-vegas-final-report.html
  dist/
    issue-01-owner-preview/
      index.html
    issue-02-game-01-postgame/
      index.html
    issue-03-game-02-pregame/
      index.html
    issue-04-game-02-postgame/
      index.html
    ...
    issue-10-vegas-final-report/
      index.html
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
   - `og:image` and `twitter:image` point to the absolute GitHub Pages URL for the matching edition image
   - title and OG title match the issue title
5. Commit and push to `main`.

The current live edition is `Issue 10 / Vegas Final Report`. It is also preserved at `issues/issue-10-vegas-final-report.html` and `dist/issue-10-vegas-final-report/`. Delivered archive files are immutable except for disclosed factual corrections.

## Generate Future Issues

Use the issue skill in `skill/suns-summer-league-pulse-skill.md` as the editorial checklist.

Recommended flow:

1. Gather official NBA and team sources first.
2. Verify schedule, roster, broadcast, transaction, injury, and quote claims before writing.
3. Choose the pregame, postgame, or one-off Vegas Final Report structure in the skill.
4. Draft a claim inventory so every idea has one section owner and one source.
5. Draft the briefing around owner-level signals, not volume.
6. Run the redundancy gate and cut repeated or unverified material.
7. Add only new Summer League finals to the collapsed Vegas Scoreboard and record its cutoff.
8. For a final report, add an attributed Media Read only when enough directly sourced local and national coverage exists.
9. Create the new issue HTML from the existing accordion structure.
10. Generate or update the OG image.
11. Test the mobile-first gate and archive the issue under `issues/`.

For a final report, keep the outgoing live postgame issue at the root while the wrap-up is reviewed at its own `dist/` route. Promote the final report to `index.html` only after the tournament close, official honors scan, accuracy check, and OG verification.

For each game, the postgame issue should answer the prior pregame signals and carry unresolved questions into the next pregame brief.

## Accuracy Rule

Accuracy over volume. If a fact cannot be verified, omit it.

Do not invent tip times, broadcast info, stats, quotes, public sentiment, roster details, or internal team opinions.

## GitHub Pages Setup

GitHub Pages should publish from:

- Branch: `main`
- Folder: `/` root

No build step is required. The site is plain HTML/CSS/JS.
