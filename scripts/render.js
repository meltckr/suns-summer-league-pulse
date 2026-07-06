#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const input = process.argv[2] || "data/issues/issue-01-owner-preview.json";
const dataPath = path.resolve(root, input);

function readIssue(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
}

function renderSnapshot(items) {
  return items
    .map(
      (item) => `
        <div class="snapshot-row">
          <span>${escapeHtml(item.term)}</span>
          <p>${escapeHtml(item.detail)}</p>
        </div>`
    )
    .join("\n");
}

function renderAroundLeague(items) {
  return items
    .map(
      (item) => `
        <article class="brief-card">
          <span class="eyebrow">${escapeHtml(item.label)}</span>
          <h3>${escapeHtml(item.headline)}</h3>
          <p>${escapeHtml(item.body)}</p>
        </article>`
    )
    .join("\n");
}

function renderPulse(items) {
  return items
    .map(
      (item) => `
        <article class="pulse-item">
          <span>${escapeHtml(item.label)}</span>
          <h3>${escapeHtml(item.headline)}</h3>
          <p>${escapeHtml(item.body)}</p>
        </article>`
    )
    .join("\n");
}

function renderWatchBoard(items) {
  return items
    .map(
      (item) => `
        <article class="watch-item">
          <div>
            <span>${escapeHtml(item.role)}</span>
            <h3>${escapeHtml(item.name)}</h3>
          </div>
          <p>${escapeHtml(item.signal)}</p>
        </article>`
    )
    .join("\n");
}

function renderSources(items) {
  return items
    .map(
      (item) => `
        <li><a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a></li>`
    )
    .join("\n");
}

function normalizeCover(issue) {
  return {
    image: issue.cover?.image || `og-${issue.slug}.png`,
    kicker: issue.cover?.kicker || issue.type,
    coverLine: issue.cover?.coverLine || issue.fiveSecondRead,
    visualLabel: issue.cover?.visualLabel || "Issue Focus",
    subjects: issue.cover?.subjects || [],
    updatedThrough: issue.cover?.updatedThrough || issue.status || issue.date,
  };
}

function renderCoverSubjects(subjects) {
  return subjects
    .map((subject) => `<li>${escapeHtml(subject)}</li>`)
    .join("\n");
}

function renderHtml(issue) {
  const cover = normalizeCover(issue);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow,noarchive">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="${escapeHtml(issue.product)}">
    <meta property="og:title" content="${escapeHtml(issue.product)} ${escapeHtml(issue.issue)}: ${escapeHtml(issue.title)}">
    <meta property="og:description" content="${escapeHtml(cover.coverLine)}">
    <meta property="og:image" content="${escapeHtml(cover.image)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(issue.product)} ${escapeHtml(issue.issue)}: ${escapeHtml(issue.title)}">
    <meta name="twitter:description" content="${escapeHtml(cover.coverLine)}">
    <meta name="twitter:image" content="${escapeHtml(cover.image)}">
    <title>${escapeHtml(issue.product)} ${escapeHtml(issue.issue)} | ${escapeHtml(issue.title)}</title>
    <meta name="description" content="${escapeHtml(issue.dek)}">
    <link rel="stylesheet" href="../../styles.css">
  </head>
  <body>
    <main class="brief-shell">
      <header class="brief-header">
        <div class="brand-lockup">
          <img src="../../assets/brand/logos/AVC-icon-light.svg" alt="" aria-hidden="true">
          <div>
            <strong>${escapeHtml(issue.product)}</strong>
            <span>${escapeHtml(issue.subtitle)}</span>
          </div>
        </div>
        <div class="prepared-for">
          <span>${escapeHtml(issue.audience)}</span>
          <strong>${escapeHtml(issue.issue)} | ${escapeHtml(issue.type)}</strong>
        </div>
      </header>

      <section class="hero-band">
        <div>
          <p class="eyebrow">${escapeHtml(cover.kicker)} | ${escapeHtml(issue.positioning)}</p>
          <h1>${escapeHtml(issue.title)}</h1>
          <p class="dek">${escapeHtml(issue.dek)}</p>
        </div>
        <div class="cover-plate" aria-label="Issue cover details">
          <span>${escapeHtml(cover.visualLabel)}</span>
          <strong>${escapeHtml(cover.coverLine)}</strong>
          <ul>
            ${renderCoverSubjects(cover.subjects)}
          </ul>
          <small>${escapeHtml(cover.updatedThrough)}</small>
        </div>
      </section>

      <section class="lead-grid">
        <article class="five-read">
          <span class="eyebrow">The 5-Second Read</span>
          <p>${escapeHtml(issue.fiveSecondRead)}</p>
        </article>

        <article class="snapshot">
          <span class="eyebrow">Suns Snapshot</span>
          <h2>${escapeHtml(issue.sunsSnapshot.label)}</h2>
          ${renderSnapshot(issue.sunsSnapshot.items)}
        </article>

        <article class="whats-next">
          <span class="eyebrow">What's Next</span>
          <h2>${escapeHtml(issue.whatsNext.headline)}</h2>
          <p>${escapeHtml(issue.whatsNext.body)}</p>
        </article>
      </section>

      <section class="two-column">
        <div class="main-column">
          <section class="section-block roster-pulse">
            <div class="section-heading">
              <span class="eyebrow">Suns Roster Pulse</span>
              <h2>Recent roster context that can inform the Vegas read.</h2>
            </div>
            <div class="pulse-grid">
              ${renderPulse(issue.sunsRosterPulse)}
            </div>
          </section>

          <section class="section-block watch-board">
            <div class="section-heading">
              <span class="eyebrow">Development Signals</span>
              <h2>Signals to monitor inside the Suns' Summer League group.</h2>
            </div>
            <div class="watch-list">
              ${renderWatchBoard(issue.playerWatchBoard)}
            </div>
          </section>

          <section class="section-block">
            <div class="section-heading">
              <span class="eyebrow">Around The League</span>
              <h2>Signals worth tracking beyond Phoenix.</h2>
            </div>
            <div class="card-grid">
              ${renderAroundLeague(issue.aroundTheLeague)}
            </div>
          </section>

          <section class="section-block sentiment-block">
            <div class="section-heading">
              <span class="eyebrow">Media & Public Sentiment</span>
              <h2>What to listen for once coverage starts moving.</h2>
            </div>
            <div class="sentiment-grid">
              <article>
                <span>Local</span>
                <p>${escapeHtml(issue.sentiment.local)}</p>
              </article>
              <article>
                <span>National</span>
                <p>${escapeHtml(issue.sentiment.national)}</p>
              </article>
              <article>
                <span>Public</span>
                <p>${escapeHtml(issue.sentiment.public)}</p>
              </article>
              <article>
                <span>Narrative</span>
                <p>${escapeHtml(issue.sentiment.narrative)}</p>
              </article>
            </div>
          </section>
        </div>

        <aside class="owner-column">
          <section class="owner-panel">
            <span class="eyebrow">Owner Radar</span>
            <ul>
              ${renderList(issue.ownerRadar)}
            </ul>
          </section>

          <section class="question-panel">
            <span class="eyebrow">Question to Consider Internally</span>
            <p>${escapeHtml(issue.internalQuestion)}</p>
          </section>

          <section class="sources-panel">
            <span class="eyebrow">Sources Reviewed</span>
            <ul>
              ${renderSources(issue.sources)}
            </ul>
          </section>
        </aside>
      </section>

      <footer class="brief-footer">
        <span>Prepared by</span>
        <img src="../../assets/brand/logos/AVC-logo-horizontal-light.svg" alt="Accelerated Velocity Consulting">
        <strong>${escapeHtml(issue.product)} | ${escapeHtml(issue.subtitle)}</strong>
      </footer>
    </main>
  </body>
</html>`;
}

const issue = readIssue(dataPath);
const outDir = path.join(root, "dist", issue.slug);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "index.html"), renderHtml(issue));
fs.writeFileSync(path.join(outDir, "text-message-version.txt"), `${issue.textMessage}\n`);
console.log(`Rendered ${path.relative(root, outDir)}/index.html`);
