#!/usr/bin/env node
// Inventory metadata only. Never follows paths, opens referenced files, or authenticates provenance.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
export function auditRinfo(root = resolve(here, '../..')) {
  const bytes = readFileSync(resolve(root, 'rinfo.json'));
  const data = JSON.parse(bytes.toString('utf8'));
  const patterns = [
    'vnesheconombank|promsvyaz|zaporizh|shnaider|schnaider|midland|toronto|exim',
    'внешэконом|промсвязь|запорож|шнайдер|мидланд|торонто|эксим',
    '(^|[^a-z0-9])(veb|psb|a7|a71|shor)([^a-z0-9]|$)',
  ];
  const matchers = patterns.map(p => new RegExp(p, 'i'));
  let dictionaries = 0, leaves = 0, matchingKeyPaths = 0;
  const leafValues = {};
  function visit(value, keys) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      dictionaries++;
      for (const [key, child] of Object.entries(value)) {
        const next = [...keys, key];
        if (matchers.some(re => re.test(next.join('/')))) matchingKeyPaths++;
        visit(child, next);
      }
    } else {
      leaves++;
      const label = typeof value === 'string' ? value : `[${typeof value}]`;
      leafValues[label] = (leafValues[label] ?? 0) + 1;
    }
  }
  visit(data, []);
  return {
    source_path: 'rinfo.json', base_commit: '730b1f25dba8900743fc67eee42300d9e6dda1a7',
    sha256: createHash('sha256').update(bytes).digest('hex'), bytes: bytes.length,
    parts: Object.fromEntries(Object.entries(data).map(([k,v]) => [k,Object.keys(v).length])),
    dictionaries, leaves, leaf_values: leafValues, search_patterns: patterns,
    matching_key_paths: matchingKeyPaths,
    coverage: 'Entire JSON parsed and key paths searched; metadata only.',
    limitation: 'Referenced documents were not obtained, searched or authenticated. No inference about their contents or lawful provenance. Matching paths are not published.',
  };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(auditRinfo(), null, 2));
}
