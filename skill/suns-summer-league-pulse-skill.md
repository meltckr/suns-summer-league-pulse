# Suns Summer League Pulse Skill

Use this skill to create future issues of Suns Summer League Pulse.

Last updated: July 11, 2026

## Product Identity

- Name: Suns Summer League Pulse
- Subtitle: Private Owner Briefing
- Producer: Accelerated Velocity Consulting / AVC
- Audience: Mat Ishbia, owner of the Phoenix Suns
- Positioning: Public information. Owner-level clarity.

## Core Rule

Accuracy over volume. If a fact cannot be verified, omit it.

Do not invent:

- Tip times
- Broadcast information
- Stats
- Quotes
- Public sentiment
- Roster details
- Internal team opinions

Anything uncertain should be cut, not hedged.

## Source Hierarchy

Use sources in this order:

1. Official NBA and team schedule, roster, game, transaction, and news pages.
2. Official league or team documents and direct public statements.
3. Reputable secondary reporting only when it adds a necessary fact that cannot be established through a primary source.

Every issue should include a verification date. Separate verified facts from AVC interpretation through clear labels such as `Game Facts`, `Source Ledger`, and `AVC Interpretation`.

Do not use uncertain language such as `if reporting holds`. Verify the claim or remove it.

## Same-Day Update Scan

Run a focused update scan before every publication and again immediately before delivery when meaningful time has passed.

Check only the surfaces that can materially change the briefing:

1. Official NBA schedule, game, venue, tip-time, and broadcast listings.
2. Official Suns and opponent roster pages.
3. Official team news, transactions, and direct public availability statements.
4. The latest completed Summer League finals for the Vegas Scoreboard.
5. The prior Pulse issue for unresolved questions and promised follow-up.

Record the verification date and cutoff. If no verified change is found, preserve the existing briefing and report `No verified material update`; do not manufacture freshness by adding weaker facts or more commentary.

When a verified update is found:

- Change Game Facts first.
- Change the 5-Second Read only when the update alters the owner-level conclusion.
- Update Signals, Viewing Lens, or Owner Radar only when their evaluation logic changes.
- Add the source to Source Ledger and remove any superseded claim.
- Run the redundancy gate again after the update.

## Tone

Write like a concise owner intelligence product:

- Premium
- Editorial
- Mobile-first
- Clear enough to read quickly on an iPhone
- Public-source only
- No claim of private team information

Use owner-level language such as:

- Signal to monitor
- Public read
- Roster-planning context
- Development layer
- Question to consider internally

Avoid regular-season dashboard language, coaching directives, scouting grades, and dense stats blocks.

## Publishing Cadence

Create two distinct briefing modes around each Summer League game:

### Pregame

Publish after the same-day schedule, broadcast, venue, and roster check. Use language such as `listed on the roster`; do not state or imply that a player will appear unless participation is officially confirmed.

Recommended structure:

1. Cover thesis: a short framing line, not a second summary.
2. The 5-Second Read: the single owner-level conclusion.
3. Game Facts: opponent, date, Phoenix time, venue, and broadcast.
4. Context: only transaction, development, or opponent context needed to understand the thesis.
5. Three Signals: team-level patterns to monitor.
6. Viewing Lens: concise player-specific evaluation criteria.
7. Owner Radar: forward-looking questions or decisions, not a recap.
8. Vegas Scoreboard: recently completed league results, secondary and collapsed.
9. Source Ledger: primary sources and verification date.

### Postgame

Publish only after the official box score is available. Do not rush to fill sections before facts are stable.

Recommended structure:

1. Cover conclusion: the result of the evaluation, not merely the game result.
2. The 5-Second Read: what changed in the owner view.
3. Verified Result: final score and only the statistics needed to support the conclusion.
4. What Translated: two or three repeatable signals.
5. What Remains Unresolved: questions the game could not answer.
6. Context vs. Noise: distinguish structure from one-game shooting, highlights, opponent quality, and lineup effects.
7. Next-Game Implication: what deserves deliberate follow-up.
8. Owner Checkpoint: one or two questions with decision relevance.
9. Vegas Scoreboard: non-Phoenix finals completed since the pregame issue.
10. Source Ledger: official box score, official game material, direct public statements, and verification date.

The first accordion section should open by default. Keep one live issue at `index.html` and archive each edition under `issues/` using descriptive names such as `issue-02-game-01-pregame.html` and `issue-03-game-01-postgame.html`.

## Issue Integrity

- Treat `index.html` as the current live edition.
- Archive the exact published edition before replacing it with the next issue.
- Do not silently rewrite an archived issue after it has been delivered.
- Correct a material factual error when necessary and add a short correction note with the date and source.
- Keep the supported compatibility path synchronized with the current live edition.
- Make the issue number, game number, mode, verification date, and scoreboard cutoff internally consistent.

## Redundancy Gate

Every issue must pass a redundancy review before publication.

### One Claim, One Home

- The cover previews the thesis in one short line; it does not explain it.
- The 5-Second Read owns the conclusion.
- Game Facts or Verified Result owns schedule, score, venue, broadcast, and statistical facts.
- Context owns transaction lineage or opponent background.
- Three Signals owns team-level evaluation patterns.
- Viewing Lens owns player names and player-specific criteria.
- Owner Radar owns decisions, implications, and next questions.
- Vegas Scoreboard owns non-Phoenix results and does not interpret the Suns.
- The closing line must add a new caution or implication; remove it if it only restates the thesis.
- The source ledger cites evidence without repeating the narrative.

### Required Review

1. Create a short claim inventory before drafting: `claim`, `section owner`, and `source`.
2. After drafting, identify every idea or player name that appears in three or more body sections.
3. Consolidate repeated ideas into their section owner unless each appearance adds a clearly different angle.
4. Search for repeated phrases of six or more words and rewrite or remove accidental duplication.
5. Ask of every section: `What new information or decision does this add?` Delete the section if the answer is unclear.
6. Remove delivery copy, update-process notes, and summaries that explain material already visible on the page.

Repetition is acceptable only for navigation, accessibility, metadata, or a deliberate short callback. Repetition is not acceptable as a substitute for new evidence.

## Vegas Scoreboard Rules

The scoreboard is a convenience layer, not the editorial center of the briefing.

- Place it after Owner Radar and before Source Ledger.
- Keep it collapsed by default.
- Include only finals completed since the prior issue; never publish a cumulative tournament dump.
- For postgame issues, exclude the Phoenix result because Verified Result already owns it.
- Label the exact cutoff date and number of games.
- Use one stable row per game: winner, score, loser, and one factual sentence.
- Keep each sentence to roughly 16 words or fewer.
- Derive the sentence from verified score or box-score data; do not add sentiment, scouting conclusions, or narrative prediction.
- Prefer neutral comparisons such as closest margin, widest margin, highest total, lowest total, or number of 100-point teams.
- Avoid labels such as `marquee`, `statement win`, `surprise`, `dominant`, or `impressive` unless directly attributed to a cited source and editorially necessary.
- Link each row to the official NBA game page.
- Use a reputable scoreboard only as a cross-check when official live data is unavailable, and disclose it in Source Ledger.
- Do not repeat scoreboard facts in The 5-Second Read, Three Signals, Owner Radar, or the closing line unless a result directly changes the Phoenix thesis.

## Mobile-First Gate

Before publishing, test at 320px, 393px, 430px, and a desktop viewport.

- Require `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- Allow horizontal scrolling only inside the section navigation.
- Keep primary touch targets at least 44px high.
- Confirm headline, metadata, and game facts do not clip or overlap.
- Confirm the first accordion opens by default and single-open behavior works.
- Confirm closed panels are inert and their links cannot receive keyboard focus.
- Confirm visible keyboard focus and reduced-motion behavior.
- Confirm the hero and AVC assets load without layout shift.
- Keep the pregame issue concise enough to scan in roughly one minute; add depth only where it changes the owner read.

## Pregame-to-Postgame Development Thread

The postgame issue should answer the pregame issue, not repeat it.

- Carry forward the three pregame signals as questions.
- Convert each into `confirmed`, `not confirmed`, or `unresolved` only when public evidence supports that label.
- Do not repeat the pregame background unless it is necessary to explain the postgame conclusion.
- Record what changed from the pregame owner view.
- Preserve unresolved questions for the next game's pregame issue.

This creates a continuous intelligence record across the Summer League schedule without turning each issue into a standalone recap.

## Build Workflow

1. Choose `pregame` or `postgame` mode and identify the game number.
2. For a postgame issue, import the unresolved questions and three signals from the prior pregame issue.
3. Run the same-day update scan.
4. Gather primary sources, verify the scoreboard cutoff, and record the verification time.
5. Create the claim inventory with one section owner and one source per factual claim.
6. Draft the 5-Second Read before drafting supporting sections.
7. Add only the facts and evidence needed to support that read.
8. Run the redundancy gate, accuracy review, and mobile-first gate.
9. Archive the outgoing issue, update `index.html`, and synchronize any supported compatibility path.
10. Update `og-preview.html` and regenerate the 1200x630 `og-image.jpg`.
11. Confirm live HTML, image assets, metadata, and accordion behavior after deployment.
12. Run a final pre-send update scan if the issue was prepared materially earlier than delivery.

Use these title patterns:

- Pregame: `Suns Summer League Pulse | Game 01 Pregame`
- Postgame: `Suns Summer League Pulse | Game 01 Postgame`

The page title, OG title, archive filename, and iMessage description should identify the same game and mode.

## Verification Checklist

Before publishing:

- Confirm page title and OG title.
- Confirm `og:url` is the live GitHub Pages URL.
- Confirm OG and Twitter images use the absolute GitHub Pages image URL.
- Confirm AVC appears in header and footer.
- Confirm footer says prepared for Mat and includes the accuracy-over-volume rule.
- Confirm the accordion works on mobile.
- Confirm the first section opens by default.
- Confirm all factual claims map to public sources.
- Confirm primary sources support schedule, roster, player, and transaction facts whenever available.
- Confirm editorial inference is clearly identified as AVC interpretation.
- Confirm the issue uses the correct pregame or postgame structure.
- Confirm the postgame issue directly answers the prior pregame signals.
- Confirm the same-day update scan was completed and its cutoff is visible.
- Confirm the Vegas Scoreboard contains only new finals, excludes duplicated Phoenix results, and links to official game pages.
- Confirm scoreboard one-liners are score- or box-score-derived and contain no unsupported narrative labels.
- Complete the redundancy gate and remove claims that do not have a single section owner.
- Confirm no player or idea appears in three or more body sections without a distinct purpose.
- Confirm the issue passes the mobile-first gate at 320px, 393px, 430px, and desktop.
- Remove anything uncertain.

## Delivery

Run the final pre-send update scan before composing the message. The final iMessage should be short, direct, and include the live GitHub Pages link.
