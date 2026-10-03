#!/usr/bin/env node
// Scans static/downloads/ for files named <topic-id>.pdf / .pptx / .ppt and
// writes src/data/generatedMaterials.json, consumed by the Course Materials
// page and by each lesson's "download the slides" link.
//
// Runs automatically before `npm start` and `npm run build` (see package.json
// "pre*" scripts) — nothing to run by hand. Re-run manually any time with:
//   node scripts/generate-materials-manifest.mjs
//
// To add material for a lesson: upload a file to static/downloads/ named
// exactly after that lesson's URL slug, e.g. integration-patterns.pdf.
//
// Keep this id list in sync with src/data/courseTopics.js — duplicated here
// (rather than imported) because that file uses ESM `export` syntax without
// "type": "module" in package.json, which plain Node can't import directly.
const TOPIC_IDS = [
  'inbound-vs-outbound',
  'protocols-explained',
  'request-response-anatomy',
  'json-xml-basics',
  'authentication-basics',
  'why-salesforce-is-different',
  'integration-terms',
  'glossary',
  'integration-patterns',
  'outbound-callouts',
  'salesforce-apis',
  'authentication',
  'inbound-apex-rest-soap',
  'declarative-options',
  'platform-events-cdc',
  'async-apex-limits',
  'salesforce-connect',
  'security-monitoring',
];

import {readdirSync, existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DOWNLOADS_DIR = join(ROOT, 'static', 'downloads');
const OUTPUT_PATH = join(ROOT, 'src', 'data', 'generatedMaterials.json');

const files = existsSync(DOWNLOADS_DIR) ? readdirSync(DOWNLOADS_DIR) : [];

function findMatch(topicId, extensions) {
  const match = files.find((f) => {
    const dot = f.lastIndexOf('.');
    if (dot === -1) return false;
    const base = f.slice(0, dot).toLowerCase();
    const ext = f.slice(dot + 1).toLowerCase();
    return base === topicId.toLowerCase() && extensions.includes(ext);
  });
  return match ? `/downloads/${match}` : null;
}

const manifest = {};
for (const topicId of TOPIC_IDS) {
  const pdf = findMatch(topicId, ['pdf']);
  const ppt = findMatch(topicId, ['ppt', 'pptx']);
  if (pdf || ppt) {
    manifest[topicId] = {pdf, ppt};
  }
}

mkdirSync(dirname(OUTPUT_PATH), {recursive: true});
writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2) + '\n');

const count = Object.keys(manifest).length;
console.log(
  `[materials-manifest] Found material for ${count} of ${TOPIC_IDS.length} lessons -> ${OUTPUT_PATH}`,
);
