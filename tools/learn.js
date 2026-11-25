#!/usr/bin/env node
/* X Code learn — validator + bundler.
 *   node tools/learn.js check <file.md | project-dir | track | unit-dir> ...   validate (file:line: message)
 *   node tools/learn.js build                                                  validate everything → learn/data/
 *   node tools/learn.js status                                                 counts per track / unit
 * Source format: learn/src/SPEC.md */
'use strict';
const fs = require('fs');
const path = require('path');
const L = require('./learn-lib.js');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'learn', 'src');
const OUT = path.join(ROOT, 'learn', 'data');

function readJSON(f, errors) { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { errors.push(f + ': ' + e.message); return null; } }
function listUnit(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).sort().map(n => path.join(dir, n)).filter(p => (fs.statSync(p).isFile() && /\.md$/.test(p)) || (fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'project.md'))));
}
function parseAny(p) {
  return fs.statSync(p).isDirectory() ? L.parseProject(p) : L.parseLesson(p, fs.readFileSync(p, 'utf8'));
}
function loadTracks(errors) {
  if (!fs.existsSync(SRC)) return [];
  return fs.readdirSync(SRC).filter(n => fs.existsSync(path.join(SRC, n, 'track.json'))).sort().map(n => {
    const t = readJSON(path.join(SRC, n, 'track.json'), errors); if (t) t._dir = path.join(SRC, n); return t;
  }).filter(Boolean);
}
function validTrack(t, errors) {
  ['id', 'name', 'logo', 'color', 'level', 'desc'].forEach(k => { if (!t[k]) errors.push(t._dir + '/track.json: ناقص ' + k); });
  if (!Array.isArray(t.goals) || t.goals.length < 4) errors.push(t._dir + '/track.json: goals (4 على الأقل)');
  if (!Array.isArray(t.units) || !t.units.length) errors.push(t._dir + '/track.json: units');
  (t.units || []).forEach(u => ['id', 'title', 'icon', 'desc'].forEach(k => { if (!u[k]) errors.push(t._dir + '/track.json: unit ' + (u.id || '?') + ' ناقص ' + k); }));
}

/* opts: { out: dir (default learn/data), only: {track, unit, id}, lenient: skip broken items instead of failing } */
function buildAll(write, opts) {
  opts = opts || {}; const only = opts.only || {}, outDir = opts.out || OUT;
  const errors = [], warns = [], tracks = loadTracks(errors).filter(t => !only.track || t.id === only.track), index = { tracks: [] }, outFiles = [];
  tracks.forEach(t => {
    validTrack(t, errors);
    const tr = { id: t.id, name: t.name, en: t.en, logo: t.logo, color: t.color, level: t.level, desc: t.desc, goals: t.goals, units: [] }; const ids = {};
    (t.units || []).forEach(u => {
      const dir = path.join(t._dir, u.id), items = [];
      if (!fs.existsSync(dir)) { warns.push(dir + ': مفيش فولدر للوحدة لسه'); }
      listUnit(dir).forEach(p => {
        if (only.unit && u.id !== only.unit) return;
        const r = parseAny(p); r.errors.forEach(e => errors.push(e)); r.warns.forEach(w => warns.push(w));
        if (!r.item || (opts.lenient && r.errors.length)) return; const it = r.item;
        if (only.id && it.id !== only.id) return;
        if (ids[it.id]) errors.push(p + ': id مكرر في المسار: ' + it.id); ids[it.id] = 1;
        items.push(it);
      });
      const meta = items.map(it => { const m = { id: it.id, type: it.type, title: it.title, summary: it.summary, f: it.id + '.js' }; if (it.time) m.time = it.time; if (it.level) m.level = it.level; if (it.tags) m.tags = it.tags; if (it.type === 'project') m.steps = it.steps.length; if (it.type === 'quiz') m.n = it.items.length; return m; });
      tr.units.push({ id: u.id, title: u.title, icon: u.icon, desc: u.desc, items: meta });
      items.forEach(it => outFiles.push([path.join('data', t.id, it.id + '.js'), 'XF.items(' + JSON.stringify(t.id) + ',' + JSON.stringify(u.id) + ',[' + JSON.stringify(it) + ']);\n']));
    });
    index.tracks.push(tr);
  });
  if (write && (opts.lenient || !errors.length)) {
    fs.rmSync(outDir, { recursive: true, force: true }); fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.js'), 'XF.setIndex(' + JSON.stringify(index) + ');\n');
    outFiles.forEach(([f, c]) => { const p = path.join(outDir, f.replace(/^data[\\/]/, '')); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c); });
  }
  return { errors, warns, index, n: outFiles.length };
}

module.exports = { buildAll, ROOT };
const [cmd, ...args] = require.main === module ? process.argv.slice(2) : [];
if (cmd === 'check') {
  let errors = [], warns = [];
  const targets = [];
  args.forEach(a => { const p = path.resolve(a); if (!fs.existsSync(p)) { errors.push(a + ': مش موجود'); return; }
    if (fs.statSync(p).isFile() || fs.existsSync(path.join(p, 'project.md'))) targets.push(p);
    else { const walk = d => fs.readdirSync(d).sort().forEach(n => { const q = path.join(d, n); if (fs.statSync(q).isDirectory()) { if (fs.existsSync(path.join(q, 'project.md'))) targets.push(q); else walk(q); } else if (/\.md$/.test(q) && !/SPEC\.md$/.test(q)) targets.push(q); }); walk(p); } });
  targets.forEach(p => { const r = parseAny(p); r.errors.forEach(e => errors.push(e)); r.warns.forEach(w => warns.push(w)); });
  warns.forEach(w => console.log('  warn  ' + w));
  errors.forEach(e => console.log('ERROR  ' + e));
  console.log(targets.length + ' ملف/مشروع — ' + errors.length + ' error — ' + warns.length + ' warn');
  process.exit(errors.length ? 1 : 0);
} else if (cmd === 'build') {
  const r = buildAll(true);
  r.warns.forEach(w => console.log('  warn  ' + w)); r.errors.forEach(e => console.log('ERROR  ' + e));
  if (r.errors.length) { console.log('البناء اتوقف: ' + r.errors.length + ' error'); process.exit(1); }
  console.log('built ' + r.n + ' items → learn/data  (' + r.index.tracks.length + ' tracks, ' + r.warns.length + ' warn)');
  // refresh the list of files the "download for offline" button fetches
  require('child_process').spawnSync(process.execPath, [require('path').join(__dirname, 'offline.js')], { stdio: 'inherit' });
} else if (cmd === 'status') {
  const r = buildAll(false);
  r.index.tracks.forEach(t => { let l = 0, p = 0, q = 0, s = 0; console.log('\n' + t.name + ' (' + t.id + ')');
    t.units.forEach(u => { const c = { lesson: 0, project: 0, quiz: 0 }; u.items.forEach(i => { c[i.type]++; if (i.steps) s += i.steps; }); l += c.lesson; p += c.project; q += c.quiz; console.log('  ' + u.id.padEnd(22) + ' lessons ' + c.lesson + '  projects ' + c.project + '  quizzes ' + c.quiz); });
    console.log('  = ' + l + ' lessons, ' + p + ' projects (' + s + ' steps), ' + q + ' quizzes'); });
  console.log('\nerrors ' + r.errors.length + ', warns ' + r.warns.length);
} else console.log('usage: node tools/learn.js check|build|status');
