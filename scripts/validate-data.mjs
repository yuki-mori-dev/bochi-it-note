#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const products = JSON.parse(readFileSync(join(root, 'data', 'products.json'), 'utf-8'));
const comparisons = JSON.parse(readFileSync(join(root, 'data', 'comparisons.json'), 'utf-8'));

const allowedCategories = new Set(['DevOps','Source Control','Hosting','Serverless','Identity','SSO','Communication','Collaboration','Productivity','Docs']);
const allowedAudit = new Set(['basic','advanced']);
const allowedResidency = new Set(['jp','eu','us','multiple']);

let errors = [];

// index products by slug
const slugSet = new Set(products.map(p => p.slug));

// product validation
for (const p of products) {
  if (!p.slug || !p.name || !p.vendor || !p.website) {
    errors.push(`product missing fields: ${p.slug || JSON.stringify(p)}`);
  }
  if (!Array.isArray(p.category) || p.category.length === 0) {
    errors.push(`product category missing: ${p.slug}`);
  } else {
    for (const c of p.category) {
      if (!allowedCategories.has(c)) {
        errors.push(`product category not allowed: ${p.slug} -> ${c}`);
      }
    }
  }
  const f = p.features || {};
  if (f.auditLog && !allowedAudit.has(String(f.auditLog))) {
    errors.push(`product features.auditLog invalid: ${p.slug} -> ${f.auditLog}`);
  }
  if (f.dataResidency && !allowedResidency.has(String(f.dataResidency))) {
    errors.push(`product features.dataResidency invalid: ${p.slug} -> ${f.dataResidency}`);
  }
  if (!Array.isArray(p.sources) || p.sources.length === 0) {
    errors.push(`product sources missing: ${p.slug}`);
  }
}

// comparisons validation
for (const c of comparisons) {
  if (!c.slug || !c.productA || !c.productB) {
    errors.push(`comparison missing fields: ${JSON.stringify(c)}`);
  }
  if (!slugSet.has(c.productA)) {
    errors.push(`comparison productA not found: ${c.slug} -> ${c.productA}`);
  }
  if (!slugSet.has(c.productB)) {
    errors.push(`comparison productB not found: ${c.slug} -> ${c.productB}`);
  }
}

if (errors.length) {
  console.error(`\nValidation failed with ${errors.length} error(s):`);
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
} else {
  console.log('Data validation passed.');
}


