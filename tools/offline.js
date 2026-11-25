#!/usr/bin/env node
/* Builds offline-manifest.json: the list of every file the "download for offline" button fetches.
 *
 *   node tools/offline.js          write offline-manifest.json
 *   node tools/offline.js --list   print what would be included
 *
 * Run it LAST (after `node tools/learn.js build` / `node tools/docs.js build`) so the version hash
 * reflects the final files. The version changes only when a file's content changes, so visitors who
 * already downloaded the site see "update available" only when something really changed — and the
 * update only re-downloads the changed files.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const EXT = new Set(['.html', '.css', '.js', '.json', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.woff2', '.woff', '.txt', '.mp3', '.mp4', '.vtt']);
const SKIP_DIRS = new Set(['node_modules', 'tools', 'docs-src', 'courses', '_patches', '.git']);
const SKIP_PATHS = new Set([
  'sw.js', 'offline-manifest.json',
  'learn/src',                                                     // authoring sources
  'assets/tokens.css', 'assets/site.css', 'assets/lesson.css', 'assets/site.js', // legacy files of the old courses
]);

function walk(dir, rel, out) {
  for (const name of fs.readdirSync(dir).sort()) {
    const full = path.join(dir, name);
    const r = rel ? rel + '/' + name : name;
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name) || SKIP_PATHS.has(r)) continue;
      walk(full, r, out);
    } else {
      if (SKIP_PATHS.has(r)) continue;
      if (!EXT.has(path.extname(name).toLowerCase())) continue;
      if (!rel && name !== 'index.html') continue;                  // only index.html at the very top level
      out.push({ p: r, size: st.size, h: crypto.createHash('sha1').update(fs.readFileSync(full)).digest('hex').slice(0, 10) });
    }
  }
}

const files = [];
walk(ROOT, '', files);

const version = crypto.createHash('sha1').update(files.map(f => f.p + ':' + f.h).join('|')).digest('hex').slice(0, 10);
const bytes = files.reduce((a, f) => a + f.size, 0);

if (process.argv.includes('--list')) {
  files.forEach(f => console.log(String(f.size).padStart(9), f.p));
  console.log(`\n${files.length} files, ${(bytes / 1048576).toFixed(2)} MB, version ${version}`);
  process.exit(0);
}

const manifest = { version, generated: new Date().toISOString(), count: files.length, bytes, files: files.map(f => [f.p, f.size, f.h]) };
fs.writeFileSync(path.join(ROOT, 'offline-manifest.json'), JSON.stringify(manifest));
console.log(`offline-manifest.json: ${files.length} files, ${(bytes / 1048576).toFixed(2)} MB, version ${version}`);
