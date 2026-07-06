#!/usr/bin/env node

const path = require("path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const slug = process.argv[2] || "issue-01-owner-preview";
const mode = process.argv[3] || "full";
const issueDir = path.join(root, "dist", slug);
const isOnePage = mode === "one-page";
const input = `file://${path.join(issueDir, isOnePage ? "one-page.html" : "index.html")}`;
const suffix = isOnePage ? "one-page" : "full";
const pdfPath = path.join(issueDir, `suns-summer-league-pulse-issue-01-${suffix}.pdf`);
const pngPath = path.join(issueDir, `suns-summer-league-pulse-issue-01-${suffix}.png`);

(async () => {
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1800 }, deviceScaleFactor: 1 });
  await page.goto(input, { waitUntil: "networkidle" });
  await page.pdf({
    path: pdfPath,
    format: "Letter",
    landscape: isOnePage,
    printBackground: true,
    margin: isOnePage
      ? { top: "0", right: "0", bottom: "0", left: "0" }
      : { top: "0.32in", right: "0.32in", bottom: "0.32in", left: "0.32in" }
  });
  await page.screenshot({ path: pngPath, fullPage: true });
  await browser.close();
  console.log(`Exported ${path.relative(root, pdfPath)}`);
  console.log(`Exported ${path.relative(root, pngPath)}`);
})();
