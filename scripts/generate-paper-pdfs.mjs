// Generate a print-styled PDF for every built paper, into public/papers/<slug>.pdf
// — the exact path the slug-derived download link points to.
//
// Run AFTER `hugo` has produced ./public and BEFORE the Pages artifact upload.
// Uses headless Chromium (Playwright) so client-side JS runs and Mermaid diagrams
// render to SVG before printing. The site is built with the production baseURL, so
// its assets are referenced at https://joelbmarks.com/… — we intercept that origin
// and serve it from local ./public (the Mermaid CDN and any other origin pass
// through to the network). Print media + a light colour scheme are emulated so the
// `@media print` rules apply and the output is light regardless of theme.

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..', 'public');
const PAPERS_DIR = join(ROOT, 'papers');
const ORIGIN = process.env.SITE_BASEURL || 'https://joelbmarks.com';
const ORIGIN_HOST = new URL(ORIGIN).host;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function fileForPath(pathname) {
  let p = join(ROOT, decodeURIComponent(pathname));
  if (pathname.endsWith('/')) p = join(p, 'index.html');
  else if (!extname(p) && existsSync(join(p, 'index.html'))) p = join(p, 'index.html');
  return p;
}

// Papers are public/papers/<slug>/index.html. A directory with an index.html is a
// paper; the section index public/papers/index.html is a file, so it is excluded.
// Future-dated/unbuilt papers are simply absent from public/, so they get no PDF.
async function listPaperSlugs() {
  const entries = await readdir(PAPERS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && existsSync(join(PAPERS_DIR, e.name, 'index.html')))
    .map((e) => e.name)
    .sort();
}

async function main() {
  if (!existsSync(PAPERS_DIR)) {
    console.log('No public/papers directory; nothing to generate.');
    return;
  }
  const slugs = await listPaperSlugs();
  if (slugs.length === 0) {
    console.log('No papers under public/papers/*/index.html; nothing to generate.');
    return;
  }
  console.log(`Generating ${slugs.length} paper PDF(s): ${slugs.join(', ')}`);

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.emulateMedia({ media: 'print', colorScheme: 'light' });

    // Serve the production origin from local ./public; let other origins (e.g. the
    // Mermaid CDN) reach the network.
    await page.route('**/*', async (route) => {
      const url = new URL(route.request().url());
      if (url.host !== ORIGIN_HOST) return route.continue();
      try {
        const file = fileForPath(url.pathname);
        const body = await readFile(file);
        await route.fulfill({
          status: 200,
          headers: { 'content-type': MIME[extname(file)] || 'application/octet-stream' },
          body,
        });
      } catch {
        await route.fulfill({ status: 404, body: 'Not found' });
      }
    });

    for (const slug of slugs) {
      const url = `${ORIGIN}/papers/${slug}/`;
      console.log(`  ${slug} → papers/${slug}.pdf`);
      await page.goto(url, { waitUntil: 'networkidle' });

      // If the paper has Mermaid diagrams, wait for them to render to SVG.
      if ((await page.locator('.mermaid').count()) > 0) {
        await page
          .waitForSelector('.mermaid svg', { timeout: 15000 })
          .catch(() => console.warn(`    (mermaid svg not detected for ${slug}; continuing)`));
      }
      // Small safety delay for fonts/layout to settle.
      await page.waitForTimeout(400);

      await page.pdf({
        path: join(PAPERS_DIR, `${slug}.pdf`),
        format: 'A4',
        printBackground: true,
        margin: { top: '2cm', right: '2cm', bottom: '2cm', left: '2cm' },
      });
    }
  } finally {
    await browser.close();
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
