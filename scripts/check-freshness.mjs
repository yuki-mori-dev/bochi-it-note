#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const productsPath = join(root, 'data', 'products.json');
const freshnessPath = join(root, 'data', 'freshness.json');

const nowIso = new Date().toISOString();

/** @type {Array<any>} */
const products = JSON.parse(readFileSync(productsPath, 'utf-8'));

async function head(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) throw new Error(`HEAD ${res.status}`);
    return {
      ok: true,
      lastModified: res.headers.get('last-modified') || null,
      etag: res.headers.get('etag') || null,
      contentLength: res.headers.get('content-length') || null
    };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

function parseDateLike(s) {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

const result = {};

for (const p of products) {
  const lastVerified = parseDateLike(p.last_verified);
  const details = [];
  let needsReview = false;
  if (Array.isArray(p.sources)) {
    for (const s of p.sources) {
      // eslint-disable-next-line no-await-in-loop
      const h = await head(s.url);
      let lastModified = null;
      if (h.ok) {
        lastModified = h.lastModified;
        const lm = parseDateLike(lastModified);
        if (lm && lastVerified && lm.getTime() > lastVerified.getTime()) {
          needsReview = true;
        }
      } else {
        // 失敗時は判定できないため現状維持
      }
      details.push({ url: s.url, ok: h.ok, lastModified: lastModified, etag: h.etag || null });
    }
  }
  result[p.slug] = {
    needsReview,
    lastChecked: nowIso,
    details
  };
}

const previous = existsSync(freshnessPath) ? JSON.parse(readFileSync(freshnessPath, 'utf-8')) : {};
const changed = JSON.stringify(previous) !== JSON.stringify(result);

writeFileSync(freshnessPath, JSON.stringify(result, null, 2));

console.log(`Freshness written to data/freshness.json (${changed ? 'changed' : 'unchanged'}) at ${nowIso}`);


