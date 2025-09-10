import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const input = process.argv[2] || join(root, 'data', 'comparisons.csv');
const output = join(root, 'data', 'comparisons.json');

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const header = lines.shift().split(',').map(h => h.trim());
  return lines.map(l => {
    const cells = l.split(',').map(c => c.trim());
    const obj = {};
    header.forEach((h, i) => (obj[h] = cells[i] ?? ''));
    return obj;
  });
}

const csv = readFileSync(input, 'utf-8');
const rows = parseCSV(csv);
const mapped = rows.map(r => ({
  slug: r.slug,
  title: r.title,
  productA: r.productA,
  productB: r.productB,
  summary: r.summary,
  tags: r.tags ? r.tags.split('|').map(t => t.trim()).filter(Boolean) : [],
  last_updated: r.last_updated || new Date().toISOString().slice(0, 10)
}));

writeFileSync(output, JSON.stringify(mapped, null, 2));
console.log(`Wrote ${mapped.length} entries to ${output}`);
