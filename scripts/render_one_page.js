#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const input = process.argv[2] || "data/issues/issue-01-owner-preview.json";
const dataPath = path.resolve(root, input);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function truncate(value, max = 160) {
  const text = String(value);
  return text.length > max ? `${text.slice(0, max - 1).trim()}...` : text;
}

function list(items, mapper) {
  return items.map(mapper).join("\n");
}

function render(issue) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(issue.product)} ${escapeHtml(issue.issue)} | One-Page Brief</title>
    <style>
      :root { --ink:#101218; --muted:#5f6875; --jet:#0d1017; --paper:#f4efe8; --panel:#fff; --line:rgba(16,18,24,.16); --red:#c92127; --orange:#e56020; --purple:#4b2c83; --gold:#d8a94a; }
      * { box-sizing:border-box; }
      body { margin:0; background:var(--paper); color:var(--ink); font-family:"Avenir Next", Avenir, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; letter-spacing:0; }
      .page { width:11in; height:8.5in; padding:.24in; background:#fff; display:grid; grid-template-rows:auto auto auto 1fr auto; gap:.1in; overflow:hidden; }
      header, footer { display:flex; align-items:center; justify-content:space-between; gap:.2in; background:var(--jet); color:white; padding:.12in .16in; }
      .brand { display:flex; align-items:center; gap:.1in; }
      .brand img { width:.32in; height:.32in; opacity:.86; }
      .brand strong, .meta strong { display:block; font-family:"Avenir Next Condensed", "Arial Narrow", "Avenir Next", sans-serif; font-size:10px; text-transform:uppercase; letter-spacing:.12em; }
      .brand span, .meta span, footer span, footer strong { color:rgba(255,255,255,.62); font-family:"Avenir Next Condensed", "Arial Narrow", "Avenir Next", sans-serif; font-size:7px; text-transform:uppercase; letter-spacing:.13em; }
      .meta { text-align:right; }
      .hero { display:grid; grid-template-columns:1fr .78in; gap:.2in; padding:.18in .2in; color:white; background:linear-gradient(120deg, rgba(13,16,23,.98), rgba(13,16,23,.9) 58%, rgba(75,44,131,.86)), linear-gradient(45deg,var(--red),var(--orange)); border-bottom:4px solid var(--red); }
      .hero img { width:.62in; align-self:center; justify-self:center; }
      .eyebrow { margin:0 0 .04in; color:var(--gold); font-family:"Avenir Next Condensed", "Arial Narrow", "Avenir Next", sans-serif; font-size:7px; font-weight:850; text-transform:uppercase; letter-spacing:.13em; }
      h1, h2, h3, p { margin-top:0; }
      h1 { margin-bottom:.05in; font-family:Didot, "Bodoni 72", Georgia, "Times New Roman", serif; font-size:36px; line-height:.86; letter-spacing:0; }
      .dek { margin:0; color:rgba(255,255,255,.78); font-size:9px; line-height:1.25; }
      .read { padding:.08in .12in; background:#fff7ef; border:1px solid var(--line); display:grid; grid-template-columns:1.28in 1fr; gap:.12in; align-items:center; }
      .read strong { color:var(--red); font-size:8px; text-transform:uppercase; letter-spacing:.12em; }
      .read p { margin:0; font-family:Didot, "Bodoni 72", Georgia, "Times New Roman", serif; font-size:15px; line-height:.98; font-weight:700; }
      .grid { display:grid; grid-template-columns:1.05fr 1fr 1.05fr; gap:.1in; min-height:0; }
      .panel { border:1px solid var(--line); padding:.095in; min-height:0; overflow:hidden; }
      .panel.dark { background:var(--jet); color:white; border-color:var(--jet); }
      .panel.soft { background:#faf8f4; }
      h2 { margin-bottom:.06in; font-family:Didot, "Bodoni 72", Georgia, "Times New Roman", serif; font-size:14px; line-height:1; }
      h3 { margin-bottom:.025in; font-size:8px; line-height:1.1; }
      p, li { color:#303640; font-size:7.2px; line-height:1.2; }
      .dark p, .dark li { color:rgba(255,255,255,.8); }
      .rows { display:grid; gap:.055in; }
      .row { padding-top:.045in; border-top:1px solid var(--line); }
      .row:first-child { padding-top:0; border-top:0; }
      .row span, .mini span, .watch span { display:block; margin-bottom:.02in; color:var(--purple); font-family:"Avenir Next Condensed", "Arial Narrow", "Avenir Next", sans-serif; font-size:5.8px; font-weight:850; text-transform:uppercase; letter-spacing:.1em; }
      .dark .row span, .dark .mini span { color:#ffba63; }
      .row p, .mini p { margin:0; }
      .mini-grid { display:grid; grid-template-columns:1fr 1fr; gap:.045in; }
      .mini { padding:.055in; background:#fff; border:1px solid var(--line); min-height:.62in; }
      .watch { display:grid; grid-template-columns:1fr 1fr; gap:.045in; }
      .watch article { padding:.055in; border:1px solid var(--line); background:#fff; min-height:.58in; }
      .watch h3 { margin:0 0 .02in; font-family:Didot, "Bodoni 72", Georgia, "Times New Roman", serif; font-size:9.5px; line-height:.96; }
      .watch p { margin:0; font-size:6.8px; line-height:1.16; }
      ul { margin:.03in 0 0; padding-left:.14in; }
      li { margin-bottom:.04in; }
      .bottom { display:grid; grid-template-columns:1.2fr .8fr 1fr; gap:.1in; }
      .question { margin-top:.06in; padding:.06in; background:#fff7ef; border-left:3px solid var(--red); font-weight:760; }
      footer { min-height:.36in; padding:.08in .14in; }
      footer img { width:1.05in; opacity:.66; }
      @page { size:Letter landscape; margin:0; }
      @media print { body { background:white; -webkit-print-color-adjust:exact; print-color-adjust:exact; } .page { page-break-after:avoid; } }
    </style>
  </head>
  <body>
    <main class="page">
      <header>
        <div class="brand">
          <img src="../../assets/brand/logos/AVC-icon-light.svg" alt="">
          <div><strong>${escapeHtml(issue.product)}</strong><span>${escapeHtml(issue.subtitle)}</span></div>
        </div>
        <div class="meta"><span>${escapeHtml(issue.audience)}</span><strong>${escapeHtml(issue.issue)} | ${escapeHtml(issue.type)} | ${escapeHtml(issue.date)}</strong></div>
      </header>
      <section class="hero">
        <div>
          <p class="eyebrow">${escapeHtml(issue.positioning)}</p>
          <h1>${escapeHtml(issue.title)}</h1>
          <p class="dek">${escapeHtml(issue.dek)}</p>
        </div>
        <img src="../../assets/teams/suns/phoenix-suns-logo.png" alt="Phoenix Suns logo">
      </section>
      <section class="read"><strong>The 5-Second Read</strong><p>${escapeHtml(issue.fiveSecondRead)}</p></section>
      <section class="grid">
        <div class="panel soft">
          <p class="eyebrow">Suns Snapshot</p>
          <h2>${escapeHtml(issue.sunsSnapshot.label)}</h2>
          <div class="rows">
            ${list(issue.sunsSnapshot.items, (item) => `<article class="row"><span>${escapeHtml(item.term)}</span><p>${escapeHtml(truncate(item.detail, 122))}</p></article>`)}
          </div>
        </div>
        <div class="panel">
          <p class="eyebrow">Suns Roster Pulse</p>
          <h2>Context around the Vegas read.</h2>
          <div class="mini-grid">
            ${list(issue.sunsRosterPulse, (item) => `<article class="mini"><span>${escapeHtml(item.label)}</span><h3>${escapeHtml(truncate(item.headline, 58))}</h3><p>${escapeHtml(truncate(item.body, 82))}</p></article>`)}
          </div>
        </div>
        <div class="panel">
          <p class="eyebrow">Development Signals</p>
          <h2>Signals inside Phoenix's group.</h2>
          <div class="watch">
            ${list(issue.playerWatchBoard, (item) => `<article><span>${escapeHtml(item.role)}</span><h3>${escapeHtml(truncate(item.name, 44))}</h3><p>${escapeHtml(truncate(item.signal, 82))}</p></article>`)}
          </div>
        </div>
      </section>
      <section class="bottom">
        <div class="panel">
          <p class="eyebrow">Around The League</p>
          <div class="mini-grid">
            ${list(issue.aroundTheLeague, (item) => `<article class="mini"><span>${escapeHtml(item.label)}</span><h3>${escapeHtml(truncate(item.headline, 62))}</h3><p>${escapeHtml(truncate(item.body, 78))}</p></article>`)}
          </div>
        </div>
        <div class="panel">
          <p class="eyebrow">Media & Public Sentiment</p>
          <div class="rows">
            <article class="row"><span>Local</span><p>${escapeHtml(truncate(issue.sentiment.local, 102))}</p></article>
            <article class="row"><span>National</span><p>${escapeHtml(truncate(issue.sentiment.national, 96))}</p></article>
            <article class="row"><span>Narrative</span><p>${escapeHtml(truncate(issue.sentiment.narrative, 96))}</p></article>
          </div>
        </div>
        <div class="panel dark">
          <p class="eyebrow">Ownership Radar</p>
          <ul>${list(issue.ownerRadar.slice(0, 4), (item) => `<li>${escapeHtml(truncate(item, 92))}</li>`)}</ul>
          <div class="question"><p>${escapeHtml(issue.internalQuestion)}</p></div>
        </div>
      </section>
      <footer>
        <span>Sources reviewed: ${escapeHtml(issue.sources.slice(0, 5).map((source) => source.label.split(":")[0]).join(" | "))}</span>
        <img src="../../assets/brand/logos/AVC-logo-horizontal-light.svg" alt="Accelerated Velocity Consulting">
        <strong>Public information. Owner-level clarity.</strong>
      </footer>
    </main>
  </body>
</html>`;
}

const issue = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const outDir = path.join(root, "dist", issue.slug);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "one-page.html"), render(issue));
console.log(`Rendered ${path.relative(root, path.join(outDir, "one-page.html"))}`);
