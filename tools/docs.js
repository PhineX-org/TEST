#!/usr/bin/env node
/* PhineX Docs — source parser, validator and bundler.
 *
 *   node tools/docs.js check  <file.md ...>   validate entry files (prints file:line: message)
 *   node tools/docs.js build                  validate everything + write docs/data/<lib>/*.js
 *   node tools/docs.js status                 which entries are written / missing
 *   node tools/docs.js ids                    print every known id
 *
 * Source format is described in docs-src/SPEC.md
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'docs-src');
const OUT = path.join(ROOT, 'docs', 'data');

const KINDS_BY_LIB = {
  html: ['element', 'guide', 'doctype', 'comment', 'attribute', 'inputtype'],
  css: ['guide', 'property', 'selector', 'pseudoclass', 'pseudoelement', 'atrule', 'function', 'datatype']
};
const KINDS = Array.from(new Set([].concat(...Object.values(KINDS_BY_LIB))));
const CSS_KINDS = ['property', 'selector', 'pseudoclass', 'pseudoelement', 'atrule', 'function', 'datatype'];
const isAttrKind = k => k === 'attribute' || k === 'inputtype' || CSS_KINDS.includes(k);
const LIB_LIST = ['html', 'css'];
const STATUSES = ['stable', 'deprecated', 'obsolete', 'experimental'];
const SUPPORTS = ['all', 'limited', 'none'];
const CALLOUTS = ['tip', 'warn', 'note', 'analogy', 'key'];
const RULE_KEYS = ['parents', 'children', 'closing', 'role', 'dom', 'layout'];
const LANGS = ['html', 'css', 'js', 'text'];
const ATTR_FLAGS = ['deprecated', 'required', 'boolean', 'experimental'];

const SECTIONS = {
  intro: { type: 'blocks' },
  try: { type: 'blocks' },
  syntax: { type: 'blocks' },
  values: { type: 'items' },
  use: { type: 'list' },
  avoid: { type: 'list' },
  attributes: { type: 'items' },
  examples: { type: 'items' },
  rules: { type: 'kv' },
  mistakes: { type: 'items' },
  a11y: { type: 'blocks' },
  tips: { type: 'blocks' },
  instead: { type: 'blocks' },
  quiz: { type: 'items' },
  refs: { type: 'list' }
};
const CANON_ORDER = ['intro', 'try', 'syntax', 'values', 'use', 'avoid', 'instead', 'attributes', 'examples', 'rules', 'mistakes', 'a11y', 'tips', 'section', 'quiz', 'refs'];

/* ───────────────────────── helpers ───────────────────────── */
const AR = /[؀-ۿ]/;
const splitList = s => String(s || '').split(/[,،]/).map(x => x.trim()).filter(Boolean);

function loadCategories(lib) {
  const p = path.join(SRC, lib, 'categories.json');
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
function libMaps() {
  const m = {};
  LIB_LIST.forEach(l => { if (fs.existsSync(path.join(SRC, l, 'categories.json'))) m[l] = idMap(loadCategories(l)); });
  return m;
}
function hasId(ctx, ref) {
  const m = /^(html|css):(.+)$/.exec(String(ref).trim());
  if (m) return !!(ctx.libMaps && ctx.libMaps[m[1]] && ctx.libMaps[m[1]][m[2].trim()]);
  return !!ctx.idToCat[String(ref).trim()];
}
function idMap(cats) {
  const m = {};
  cats.cats.forEach(c => c.items.forEach(id => { m[id] = c.id; }));
  return m;
}

/* ───────────────────────── block parser ───────────────────────── */
function parseFenceInfo(info) {
  const toks = info.trim().split(/\s+/).filter(Boolean);
  const out = { lang: toks[0] || 'text', live: null, bad: false, good: false, h: 0, bad_flags: [] };
  toks.slice(1).forEach(t => {
    if (t === 'live') out.live = true;
    else if (t === 'nolive') out.live = false;
    else if (t === 'bad') out.bad = true;
    else if (t === 'good') out.good = true;
    else if (/^h=\d{2,4}$/.test(t)) out.h = parseInt(t.slice(2), 10);
    else out.bad_flags.push(t);
  });
  return out;
}

/** parse an array of {n,text} lines into blocks */
function parseBlocks(lines, err) {
  const blocks = [];
  let i = 0;
  const isBullet = s => /^[-*+]\s+/.test(s);
  const isOrdered = s => /^\d+[.)]\s+/.test(s);
  const isFence = s => /^ {0,3}```/.test(s);
  const isQuote = s => /^>/.test(s);
  const isHeading = s => /^#{1,6}\s/.test(s);
  while (i < lines.length) {
    const L = lines[i];
    const t = L.text;
    if (!t.trim()) { i++; continue; }
    if (isFence(t)) {
      const info = t.replace(/^ {0,3}```/, '');
      const startLine = L.n;
      const body = [];
      i++;
      let closed = false;
      while (i < lines.length) {
        if (/^ {0,3}```\s*$/.test(lines[i].text)) { closed = true; i++; break; }
        body.push(lines[i].text);
        i++;
      }
      if (!closed) err(startLine, 'code fence is never closed (missing closing ```)');
      const fi = parseFenceInfo(info);
      if (!LANGS.includes(fi.lang)) err(startLine, 'unknown code language "' + fi.lang + '" (use html, css, js or text)');
      fi.bad_flags.forEach(f => err(startLine, 'unknown fence flag "' + f + '" (allowed: live, nolive, bad, good, h=NNN)'));
      blocks.push({ t: 'code', lang: fi.lang, live: fi.live, bad: fi.bad, good: fi.good, h: fi.h, code: body.join('\n').replace(/\s+$/, ''), line: startLine });
      continue;
    }
    if (isHeading(t)) { err(L.n, 'unexpected heading here: ' + t.slice(0, 40)); i++; continue; }
    if (isQuote(t)) {
      const q = [];
      const start = L.n;
      while (i < lines.length && isQuote(lines[i].text)) { q.push(lines[i].text.replace(/^>\s?/, '')); i++; }
      let kind = null;
      const m = /^\[!(\w+)\]\s*(.*)$/.exec(q[0] || '');
      if (!m) { err(start, 'blockquote must start with a callout marker, e.g. "> [!tip] ..." (kinds: ' + CALLOUTS.join(', ') + ')'); kind = 'note'; }
      else {
        kind = m[1];
        if (!CALLOUTS.includes(kind)) err(start, 'unknown callout kind "' + kind + '" (allowed: ' + CALLOUTS.join(', ') + ')');
        q[0] = m[2];
      }
      const paras = [];
      let cur = [];
      q.forEach(x => { if (!x.trim()) { if (cur.length) paras.push(cur.join(' ')); cur = []; } else cur.push(x.trim()); });
      if (cur.length) paras.push(cur.join(' '));
      if (!paras.length) err(start, 'empty callout');
      blocks.push({ t: 'callout', kind, paras, line: start });
      continue;
    }
    if (isBullet(t) || isOrdered(t)) {
      const ordered = isOrdered(t);
      const start = L.n;
      const items = [];
      while (i < lines.length) {
        const s = lines[i].text;
        if (!s.trim()) {
          // blank line: list continues only if next non-blank is a bullet of same kind
          let j = i + 1;
          while (j < lines.length && !lines[j].text.trim()) j++;
          if (j < lines.length && (ordered ? isOrdered(lines[j].text) : isBullet(lines[j].text))) { i = j; continue; }
          break;
        }
        if (ordered ? isOrdered(s) : isBullet(s)) {
          items.push({ x: s.replace(ordered ? /^\d+[.)]\s+/ : /^[-*+]\s+/, '').trim(), line: lines[i].n });
          i++;
        } else if (/^\s{2,}\S/.test(s) && items.length) {
          items[items.length - 1].x += ' ' + s.trim();
          i++;
        } else break;
      }
      blocks.push({ t: ordered ? 'ol' : 'ul', items, line: start });
      continue;
    }
    // paragraph
    const start = L.n;
    const para = [];
    while (i < lines.length) {
      const s = lines[i].text;
      if (!s.trim() || isFence(s) || isBullet(s) || isOrdered(s) || isQuote(s) || isHeading(s)) break;
      para.push(s.trim());
      i++;
    }
    blocks.push({ t: 'p', x: para.join(' '), line: start });
  }
  return blocks;
}

/* ───────────────────────── file parser ───────────────────────── */
function parseEntry(file, text, ctx) {
  const errors = [];
  const warns = [];
  const err = (n, m) => errors.push({ n, m });
  const warn = (n, m) => warns.push({ n, m });
  text = text.replace(/\r\n?/g, '\n');
  const all = text.split('\n');

  /* front matter */
  if (all[0].trim() !== '---') { err(1, 'file must start with front matter (---)'); return { errors, warns, entry: null }; }
  let end = -1;
  for (let k = 1; k < all.length; k++) if (all[k].trim() === '---') { end = k; break; }
  if (end < 0) { err(1, 'front matter is not closed with ---'); return { errors, warns, entry: null }; }
  const fm = {};
  for (let k = 1; k < end; k++) {
    const ln = all[k];
    if (!ln.trim()) continue;
    const m = /^([a-z_]+)\s*:\s*(.*)$/.exec(ln);
    if (!m) { err(k + 1, 'bad front-matter line: ' + ln); continue; }
    fm[m[1]] = m[2].trim();
  }
  const known = ['id', 'kind', 'cat', 'tag', 'label', 'chip', 'title', 'en', 'status', 'display', 'void', 'support', 'support_note', 'summary', 'keywords', 'related', 'size', 'mdn'];
  Object.keys(fm).forEach(k => { if (!known.includes(k)) err(1, 'unknown front-matter key "' + k + '"'); });

  const base = path.basename(file, '.md');
  const dir = path.basename(path.dirname(file));
  const e = {
    id: fm.id, kind: fm.kind || 'element', cat: fm.cat, tag: fm.tag, label: fm.label, chip: fm.chip,
    title: fm.title, en: fm.en, status: fm.status || 'stable', display: fm.display, void: /^(yes|true)$/i.test(fm.void || ''),
    support: fm.support, supportNote: fm.support_note, summary: fm.summary, keywords: splitList(fm.keywords), related: splitList(fm.related),
    size: fm.size || 'normal', mdn: fm.mdn, lib: ctx.lib || 'html'
  };
  if (isAttrKind(e.kind) && !e.label) e.label = e.chip;
  if (!e.id) err(1, 'missing id');
  else if (e.id !== base) err(1, 'id "' + e.id + '" must equal the file name "' + base + '"');
  if (!(KINDS_BY_LIB[e.lib] || KINDS).includes(e.kind)) err(1, 'kind must be one of ' + (KINDS_BY_LIB[e.lib] || KINDS).join('|') + ' (library ' + e.lib + ')');
  if (!e.cat) err(1, 'missing cat'); else if (ctx.idToCat[e.id] && ctx.idToCat[e.id] !== e.cat) err(1, 'cat "' + e.cat + '" does not match categories.json (' + ctx.idToCat[e.id] + ')');
  if (e.cat && dir !== e.cat && dir !== 'tmp') err(1, 'file is in folder "' + dir + '" but cat is "' + e.cat + '"');
  if (e.id && !ctx.idToCat[e.id]) err(1, 'id "' + e.id + '" is not listed in categories.json');
  if (!STATUSES.includes(e.status)) err(1, 'status must be one of ' + STATUSES.join('|'));
  if (!['normal', 'compact'].includes(e.size)) err(1, 'size must be normal|compact');
  if (!e.title) err(1, 'missing title (Arabic title)');
  else if (!AR.test(e.title)) err(1, 'title must be Arabic');
  if (!e.en) err(1, 'missing en (official English name)');
  if (!e.summary) err(1, 'missing summary');
  else {
    if (e.summary.length < 20 || e.summary.length > 170) err(1, 'summary must be 20–170 characters (is ' + e.summary.length + ')');
    if (!AR.test(e.summary)) err(1, 'summary must be Arabic');
    if (/[<>]/.test(e.summary)) err(1, 'summary must be plain text (no < or >)');
  }
  if (e.kind === 'element') {
    if (!e.tag) err(1, 'element needs tag');
    else if (!/^[a-z][a-z0-9-]*$/.test(e.tag)) err(1, 'tag must be lowercase name without <>');
    if (e.tag && e.id && e.tag !== e.id) err(1, 'for kind=element, tag must equal id');
    if (!e.display) err(1, 'element needs display (block|inline|inline-block|none|table|table-row|table-cell|list-item|contents|other…)');
    if (!fm.void) err(1, 'element needs void: yes|no');
    if (!SUPPORTS.includes(e.support)) err(1, 'element needs support: all|limited|none');
  } else if (e.kind === 'guide') {
    if (e.tag) err(1, 'guides have no tag');
  } else if (isAttrKind(e.kind)) {
    if (!e.chip) err(1, e.kind + ' needs chip (short code shown in the sidebar/header, e.g. class or type="email")');
    if (!SUPPORTS.includes(e.support)) err(1, e.kind + ' needs support: all|limited|none');
    if (!e.mdn) err(1, e.kind + ' needs mdn (path after ' + (e.lib === 'css' ? '.../docs/Web/CSS/, e.g. margin or :hover' : '.../Web/HTML/Reference/, e.g. Global_attributes/class') + ')');
    if (e.tag) err(1, e.kind + ' has no tag');
  } else { // doctype / comment
    if (!e.chip) err(1, e.kind + ' needs chip (what appears inside the header chip)');
    if (!e.label) err(1, e.kind + ' needs label (sidebar label)');
    if (!SUPPORTS.includes(e.support)) err(1, 'needs support: all|limited|none');
  }
  if (e.status === 'obsolete' && e.support !== 'none') err(1, 'obsolete entries must have support: none');
  if (e.status === 'experimental' && e.support !== 'limited') err(1, 'experimental entries must have support: limited');
  if (e.keywords.length < 3) err(1, 'keywords: at least 3 (Arabic + English search words, comma separated)');
  if (!e.related.length && e.kind !== 'guide') err(1, 'related: at least 2 related ids');
  e.related.forEach(r => { if (!hasId(ctx, r)) err(1, 'related id "' + r + '" does not exist in categories.json'); if (r === e.id) err(1, 'related must not contain itself'); });
  if ((e.kind === 'element' || isAttrKind(e.kind)) && e.related.length < 2) err(1, 'related: at least 2 ids');

  /* body → sections */
  const body = [];
  for (let k = end + 1; k < all.length; k++) body.push({ n: k + 1, text: all[k] });
  const secs = []; // {key,title,lines:[], n}
  let cur = null, inFence = false;
  body.forEach(L => {
    if (/^ {0,3}```/.test(L.text)) inFence = !inFence;
    if (!inFence) {
      const m2 = /^## (.+?)\s*$/.exec(L.text);
      if (m2) {
        let key = m2[1].trim();
        let title = null;
        const g = /^section\s*:\s*(.+)$/.exec(key);
        if (g) { key = 'section'; title = g[1].trim(); }
        cur = { key, title, lines: [], n: L.n };
        secs.push(cur);
        return;
      }
    }
    if (!cur) { if (L.text.trim()) err(L.n, 'text before the first "## section" heading'); return; }
    cur.lines.push(L);
  });

  const sections = [];
  const seen = {};
  secs.forEach(s => {
    if (s.key !== 'section' && !SECTIONS[s.key]) { err(s.n, 'unknown section "## ' + s.key + '" (allowed: ' + Object.keys(SECTIONS).join(', ') + ', "section: Title")'); return; }
    if (s.key !== 'section' && seen[s.key]) err(s.n, 'duplicate section "## ' + s.key + '"');
    seen[s.key] = true;
    const spec = SECTIONS[s.key] || { type: 'generic' };
    const out = { key: s.key, n: s.n };
    if (s.key === 'section') {
      out.title = s.title;
      if (!AR.test(s.title)) err(s.n, 'section title must be Arabic');
    }
    if (spec.type === 'items') {
      // split by ### (outside fences)
      const pre = [], items = [];
      let curItem = null, f = false;
      s.lines.forEach(L => {
        if (/^ {0,3}```/.test(L.text)) f = !f;
        const m3 = !f && /^### (.+?)\s*$/.exec(L.text);
        if (m3) { curItem = { title: m3[1].trim(), lines: [], n: L.n }; items.push(curItem); return; }
        (curItem ? curItem.lines : pre).push(L);
      });
      out.pre = parseBlocks(pre, err);
      out.items = items.map(it => ({ title: it.title, n: it.n, blocks: parseBlocks(it.lines, err) }));
    } else {
      let lines = s.lines;
      if (s.key === 'section') {
        out.blocks = [];
        // allow ### sub headings → heading blocks
        const parts = []; let f = false, bucket = [];
        lines.forEach(L => {
          if (/^ {0,3}```/.test(L.text)) f = !f;
          const m3 = !f && /^### (.+?)\s*$/.exec(L.text);
          if (m3) { parts.push({ lines: bucket }); bucket = []; parts.push({ h: m3[1].trim(), n: L.n }); return; }
          bucket.push(L);
        });
        parts.push({ lines: bucket });
        parts.forEach(p => { if (p.h) out.blocks.push({ t: 'h', x: p.h, line: p.n }); else out.blocks.push(...parseBlocks(p.lines, err)); });
      } else if (spec.type === 'kv') {
        out.blocks = parseBlocks(lines, err);
      } else {
        out.blocks = parseBlocks(lines, err);
      }
    }
    sections.push(out);
  });
  e.sections = sections;

  validateEntry(e, fm, ctx, err, warn);
  return { errors, warns, entry: e };
}

/* ───────────────────────── validation ───────────────────────── */
function lintInline(x, n, ctx, err, warn, opt) {
  opt = opt || {};
  if (typeof x !== 'string') return;
  const ticks = (x.match(/`/g) || []).length;
  if (ticks % 2) { err(n, 'odd number of backticks in: ' + x.slice(0, 60)); return; }
  const stripped = x.replace(/`[^`]*`/g, '');
  if (/<\/?[a-zA-Z!]/.test(stripped)) err(n, 'raw HTML tag outside backticks (wrap tags in `backticks` so they become links): ' + stripped.slice(0, 70));
  const re = /\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g;
  let m;
  while ((m = re.exec(stripped))) {
    if (!hasId(ctx, m[1])) err(n, 'unknown link target [[' + m[1] + ']]');
  }
  const m2 = stripped.replace(/\[\[[^\]]*\]\]/g, '');
  const re2 = /\[([^\]]+)\]\(([^)]*)\)/g;
  while ((m = re2.exec(m2))) { if (!/^https:\/\//.test(m[2])) err(n, 'external links must be https:// (got ' + m[2] + ')'); }
  if (/\b(TODO|TBD|FIXME|lorem ipsum)\b/i.test(x)) err(n, 'placeholder text found');
  if ((stripped.match(/\*\*/g) || []).length % 2) warn(n, 'unbalanced ** in: ' + x.slice(0, 50));
  if (!opt.allowLatin && !AR.test(stripped.replace(/\[\[[^\]]*\]\]/g, 'x')) && stripped.replace(/[\s\W\d_]/g, '').length > 12) warn(n, 'prose should be Arabic: ' + x.slice(0, 60));
}

function proseText(blocks) {
  let s = '';
  (blocks || []).forEach(b => {
    if (b.t === 'p') s += b.x + ' ';
    else if (b.t === 'ul' || b.t === 'ol') b.items.forEach(i => { s += i.x + ' '; });
    else if (b.t === 'callout') s += b.paras.join(' ') + ' ';
  });
  return s;
}

function lintBlocks(blocks, ctx, err, warn, secKey, secSpecLive) {
  (blocks || []).forEach(b => {
    const lo = { allowLatin: secKey === 'refs' };
    if (b.t === 'p') lintInline(b.x, b.line, ctx, err, warn, lo);
    else if (b.t === 'ul' || b.t === 'ol') b.items.forEach(i => lintInline(i.x, i.line, ctx, err, warn, lo));
    else if (b.t === 'callout') b.paras.forEach(p => lintInline(p, b.line, ctx, err, warn));
    else if (b.t === 'h') lintInline(b.x, b.line, ctx, err, warn);
    else if (b.t === 'code') {
      if (!b.code.trim()) err(b.line, 'empty code block');
      if (b.live === true && b.lang !== 'html') err(b.line, 'only html code blocks can be live');
      if (b.live === null) b.live = !!(secSpecLive && b.lang === 'html' && !b.bad && !b.good);
      if (b.bad && b.good) err(b.line, 'a code block cannot be both bad and good');
      b.code.split('\n').forEach((ln, idx) => { if (ln.length > 96) warn(b.line + idx + 1, 'code line longer than 96 chars (hard to read on phones)'); });
      if (b.lang === 'html' && b.live) {
        if (/<script[^>]+src=["']https?:/i.test(b.code) || /<link[^>]+href=["']https?:/i.test(b.code)) warn(b.line, 'live example loads an external resource');
        if (/<\/?(?:html|head|body)\b/i.test(b.code) && !/<!doctype/i.test(b.code)) warn(b.line, 'full documents should start with <!DOCTYPE html>');
      }
    }
  });
}

function validateEntry(e, fm, ctx, err, warn) {
  const by = {};
  e.sections.forEach(s => { by[s.key] = by[s.key] || s; });
  const has = k => !!by[k];
  const isOld = e.status === 'obsolete' || e.status === 'deprecated';
  const compact = e.size === 'compact';
  const live = k => k === 'try' || k === 'examples';

  /* which sections are required / allowed */
  let required = [];
  if (e.kind === 'element' || e.kind === 'doctype' || e.kind === 'comment') {
    if (e.status === 'obsolete') required = ['intro', 'instead', 'examples'];
    else if (e.status === 'deprecated') required = ['intro', 'try', 'syntax', 'use', 'avoid', 'instead', 'examples', 'mistakes', 'refs'];
    else required = ['intro', 'try', 'syntax', 'use', 'avoid', 'attributes', 'examples', 'rules', 'mistakes', 'a11y', 'quiz', 'refs'];
  } else if (CSS_KINDS.includes(e.kind)) {
    required = ['intro', 'try', 'syntax', 'use', 'avoid', 'examples', 'mistakes', 'quiz', 'refs'];
    if (e.kind === 'property') required.push('values');
  } else if (isAttrKind(e.kind)) required = ['intro', 'try', 'syntax', 'use', 'avoid', 'examples', 'mistakes', 'a11y', 'quiz', 'refs'];
  else required = ['intro', 'examples'];
  required.forEach(k => { if (!has(k)) err(1, 'missing required section "## ' + k + '"'); });
  if (e.kind === 'guide') ['attributes', 'rules'].forEach(k => { if (has(k)) err(by[k].n, 'section "' + k + '" is not allowed in guides'); });
  if (isAttrKind(e.kind) && has('rules')) err(by.rules.n, 'section "rules" is only for elements');
  if (has('values') && e.kind === 'guide') err(by.values.n, 'section "values" is not allowed in guides');
  if (has('values') && !CSS_KINDS.includes(e.kind)) err(by.values.n, 'section "values" is only for CSS entries (use "attributes" in HTML)');
  if (!isOld && has('instead') && !isAttrKind(e.kind)) err(by.instead.n, '"## instead" is only for deprecated/obsolete entries');

  e.sections.forEach(s => {
    const spec = SECTIONS[s.key] || { type: 'generic' };
    const isLive = live(s.key);
    if (spec.type === 'blocks' || s.key === 'section') {
      lintBlocks(s.blocks, ctx, err, warn, s.key, isLive);
      if (!(s.blocks || []).length) err(s.n, 'section "' + s.key + '" is empty');
    }
    if (spec.type === 'list') {
      const bl = s.blocks || [];
      if (bl.length !== 1 || bl[0].t !== 'ul') err(s.n, 'section "' + s.key + '" must contain exactly one bullet list (- item)');
      lintBlocks(bl, ctx, err, warn, s.key, false);
    }
    if (spec.type === 'kv') {
      const bl = s.blocks || [];
      if (bl.length !== 1 || bl[0].t !== 'ul') err(s.n, 'section "rules" must be one bullet list of "- key: value"');
      else {
        const seenK = {};
        bl[0].items.forEach(it => {
          const m = /^([a-z]+)\s*:\s*(.+)$/.exec(it.x);
          if (!m) { err(it.line, 'rules item must look like "- parents: ..." (keys: ' + RULE_KEYS.join(', ') + ')'); return; }
          if (!RULE_KEYS.includes(m[1])) err(it.line, 'unknown rules key "' + m[1] + '" (allowed: ' + RULE_KEYS.join(', ') + ')');
          if (seenK[m[1]]) err(it.line, 'duplicate rules key ' + m[1]);
          seenK[m[1]] = true;
          lintInline(m[2], it.line, ctx, err, warn, { allowLatin: true });
          it.key = m[1]; it.x = m[2].trim();
        });
        s.rules = bl[0].items.filter(i => i.key).map(i => ({ k: i.key, x: i.x }));
        if (!isOld && !compact && s.rules.length < 3) err(s.n, 'rules needs at least 3 items');
      }
    }
    if (spec.type === 'items') {
      lintBlocks(s.pre, ctx, err, warn, s.key, false);
      s.items.forEach(it => {
        lintInline(it.title, it.n, ctx, err, warn, { allowLatin: s.key === 'attributes' || s.key === 'values' });
        lintBlocks(it.blocks, ctx, err, warn, s.key, isLive);
        if (s.key === 'attributes') {
          const m = /^(\S+?)(?:\s+\{([^}]*)\})?$/.exec(it.title);
          if (!m) { err(it.n, 'attribute heading must be "### name" or "### name {flag, flag}"'); return; }
          it.name = m[1];
          it.flags = splitList(m[2] || '');
          it.flags.forEach(f => { if (!ATTR_FLAGS.includes(f)) err(it.n, 'unknown attribute flag "' + f + '" (allowed: ' + ATTR_FLAGS.join(', ') + ')'); });
          if (!/^[A-Za-z][\w:-]*(\*)?$/.test(it.name)) err(it.n, 'attribute name looks wrong: ' + it.name);
          if (!it.blocks.some(b => b.t === 'p')) err(it.n, 'attribute "' + it.name + '" needs a description paragraph');
          delete it.title;
        }
        if (s.key === 'values') {
          const m = /^(.+?)(?:\s+\{([^}]*)\})?$/.exec(it.title);
          if (!m) { err(it.n, 'value heading must be "### value" or "### value {flag}"'); return; }
          it.name = m[1].trim().replace(/^`|`$/g, '');
          it.flags = splitList(m[2] || '');
          it.flags.forEach(f => { if (!['deprecated', 'experimental'].includes(f)) err(it.n, 'unknown value flag "' + f + '" (allowed: deprecated, experimental)'); });
          if (it.name.length > 48) err(it.n, 'value name is too long: ' + it.name);
          if (!it.blocks.some(b => b.t === 'p')) err(it.n, 'value "' + it.name + '" needs a description paragraph');
          delete it.title;
        }
        if (s.key === 'examples') {
          if (!it.blocks.some(b => b.t === 'code' && ['html', 'css', 'js'].includes(b.lang))) err(it.n, 'example "' + it.title + '" needs a code block');
          if (!it.blocks.some(b => b.t === 'p')) err(it.n, 'example "' + it.title + '" needs an explanation paragraph');
        }
        if (s.key === 'mistakes') {
          const bad = it.blocks.filter(b => b.t === 'code' && b.bad).length;
          const good = it.blocks.filter(b => b.t === 'code' && b.good).length;
          if (bad !== 1 || good !== 1) err(it.n, 'mistake "' + it.title + '" needs exactly one ```html bad block and one ```html good block');
          if (!it.blocks.some(b => b.t === 'p')) err(it.n, 'mistake "' + it.title + '" needs a paragraph explaining why');
        }
        if (s.key === 'quiz') {
          const lists = it.blocks.filter(b => b.t === 'ul');
          if (lists.length !== 1) err(it.n, 'quiz question needs exactly one option list');
          else {
            const opts = lists[0].items;
            if (opts.length < 3 || opts.length > 5) err(it.n, 'quiz question needs 3–5 options');
            let correct = 0;
            opts.forEach(o => {
              const m = /^\[( |x)\]\s*(.+)$/.exec(o.x);
              if (!m) { err(o.line, 'quiz option must start with "[ ]" or "[x]"'); return; }
              if (m[1] === 'x') correct++;
              o.ok = m[1] === 'x'; o.x = m[2];
            });
            if (correct !== 1) err(it.n, 'quiz question needs exactly one [x] option (has ' + correct + ')');
          }
          if (!it.blocks.some(b => b.t === 'p')) err(it.n, 'quiz question needs an explanation paragraph after the options');
        }
      });
    }
  });

  /* minimum amounts */
  const introLen = proseText(by.intro && by.intro.blocks).replace(/`[^`]*`/g, 'x').length;
  const minIntro = e.kind === 'guide' ? 600 : isAttrKind(e.kind) ? (compact ? 320 : 500) : (e.status === 'obsolete' ? 220 : (compact ? 380 : 650));
  if (has('intro') && introLen < minIntro) err(by.intro.n, 'intro is too short (' + introLen + ' chars, need ≥ ' + minIntro + '). Explain deeper, for absolute beginners.');
  const cnt = k => (by[k] ? (by[k].items || by[k].blocks || [])[0] && by[k].items ? by[k].items.length : 0 : 0);
  const listLen = k => (by[k] && by[k].blocks && by[k].blocks[0] && by[k].blocks[0].items ? by[k].blocks[0].items.length : 0);
  const need = (k, n, what) => { if (has(k) && cnt(k) < n) err(by[k].n, what + ' needs ≥ ' + n + ' (has ' + cnt(k) + ')'); };
  const needList = (k, n) => { if (has(k) && listLen(k) < n) err(by[k].n, '"## ' + k + '" needs ≥ ' + n + ' bullets (has ' + listLen(k) + ')'); };
  if (e.kind === 'guide') { need('examples', 3, 'examples'); }
  else if (isAttrKind(e.kind)) { if (e.kind === 'property') need('values', compact ? 2 : 3, 'values'); need('examples', compact ? 3 : 4, 'examples'); need('mistakes', compact ? 1 : 2, 'mistakes'); need('quiz', compact ? 2 : 3, 'quiz questions'); needList('use', compact ? 2 : 3); needList('avoid', compact ? 1 : 2); needList('a11y', 0); }
  else if (e.status === 'obsolete') { need('examples', 1, 'examples'); }
  else if (isOld) { need('examples', 2, 'examples'); need('mistakes', 1, 'mistakes'); }
  else { need('examples', compact ? 3 : 5, 'examples'); need('mistakes', compact ? 1 : 2, 'mistakes'); need('quiz', compact ? 2 : 3, 'quiz questions'); needList('use', compact ? 2 : 3); needList('avoid', compact ? 1 : 2); needList('a11y', 0); }
  if (has('quiz') && !isOld) { /* ok */ }
  if (has('refs')) needList('refs', 1);
  if (has('try')) {
    const codes = (by.try.blocks || []).filter(b => b.t === 'code');
    if (codes.length !== 1) err(by.try.n, '"## try" needs exactly one code block (has ' + codes.length + ')');
  }
  if (has('syntax')) {
    const bl = by.syntax.blocks || [];
    if (!bl.some(b => b.t === 'code')) err(by.syntax.n, '"## syntax" needs a code block');
    if (!bl.some(b => b.t === 'ul')) err(by.syntax.n, '"## syntax" needs a bullet list explaining each part of the code');
  }
  if (has('a11y')) { const bl = (by.a11y.blocks || []).find(b => b.t === 'ul'); if (!bl || bl.items.length < 2) err(by.a11y.n, '"## a11y" needs a bullet list with ≥ 2 items'); }

  /* Egyptian/Arabic content sanity: at least some Arabic inside each example explanation */
  if (has('examples')) by.examples.items.forEach(it => {
    const p = proseText(it.blocks);
    if (p.replace(/`[^`]*`/g, '').length < 60) warn(it.n, 'example "' + it.title + '" has a very short explanation — explain what happens and why');
  });
  e.stats = {
    examples: has('examples') ? by.examples.items.length : 0,
    liveBlocks: e.sections.reduce((a, s) => a + (s.blocks || []).concat(...(s.items || []).map(i => i.blocks)).filter(b => b.t === 'code' && b.live).length, 0),
    chars: JSON.stringify(e.sections).length
  };
  /* canonical ordering of sections */
  e.sections.sort((a, b) => CANON_ORDER.indexOf(a.key) - CANON_ORDER.indexOf(b.key));
  e.sections.forEach(s => { if (s.items) s.items.forEach(it => { delete it.n; }); delete s.n; });
}

/* ───────────────────────── commands ───────────────────────── */
function walk(dir) {
  let out = [];
  if (!fs.existsSync(dir)) return out;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) out = out.concat(walk(p));
    else if (d.name.endsWith('.md') && d.name !== 'SPEC.md') out.push(p);
  });
  return out;
}

function libOfFile(f) {
  const rel = path.relative(SRC, path.resolve(f)).split(path.sep);
  return LIB_LIST.includes(rel[0]) ? rel[0] : 'html';
}
function makeCtx(lib) {
  const cats = loadCategories(lib);
  return { lib, idToCat: idMap(cats), cats, libMaps: libMaps() };
}
function checkFiles(files, libArg) {
  const ctxs = {};
  let bad = 0;
  files.forEach(f => {
    const lib = libArg || libOfFile(f);
    const ctx = ctxs[lib] || (ctxs[lib] = makeCtx(lib));
    const r = parseEntry(f, fs.readFileSync(f, 'utf8'), ctx);
    const rel = path.relative(process.cwd(), f);
    r.errors.forEach(x => console.log(rel + ':' + x.n + ': ERROR ' + x.m));
    r.warns.forEach(x => console.log(rel + ':' + x.n + ': warn  ' + x.m));
    if (r.errors.length) bad++;
    else console.log(rel + ': OK' + (r.warns.length ? ' (' + r.warns.length + ' warnings)' : '') + '  [' + r.entry.stats.examples + ' examples, ' + r.entry.stats.liveBlocks + ' live, ' + Math.round(r.entry.stats.chars / 1024) + 'KB]');
  });
  return bad;
}

function build(lib) {
  lib = lib || 'html';
  const ctx = makeCtx(lib), cats = ctx.cats;
  const files = walk(path.join(SRC, lib));
  const entries = {};
  let bad = 0, warnCount = 0;
  files.forEach(f => {
    const r = parseEntry(f, fs.readFileSync(f, 'utf8'), ctx);
    const rel = path.relative(ROOT, f);
    r.errors.forEach(x => console.log(rel + ':' + x.n + ': ERROR ' + x.m));
    warnCount += r.warns.length;
    if (r.errors.length) { bad++; return; }
    if (entries[r.entry.id]) { console.log(rel + ': ERROR duplicate id ' + r.entry.id); bad++; return; }
    entries[r.entry.id] = r.entry;
  });
  const missing = [];
  cats.cats.forEach(c => c.items.forEach(id => { if (!entries[id]) missing.push(c.id + '/' + id); }));
  /* duplicate ids across categories */
  const seenIds = {}; cats.cats.forEach(c => c.items.forEach(id => { if (seenIds[id]) { console.log('categories.json: ERROR duplicate id ' + id + ' (' + seenIds[id] + ' & ' + c.id + ')'); bad++; } seenIds[id] = c.id; }));
  const onlyWritten = process.argv.includes('--written');
  if (missing.length) console.log('MISSING ' + missing.length + ' entries' + (onlyWritten || missing.length > 40 ? '' : ': ' + missing.join(' ')));
  if (bad) { console.log('\n' + bad + ' file(s) have errors — nothing written.'); return 1; }
  if (missing.length && !process.argv.includes('--partial') && !onlyWritten) { console.log('\nIncomplete — nothing written (use --partial to build what exists).'); return 2; }

  const outDir = path.join(OUT, lib);
  fs.mkdirSync(outDir, { recursive: true });
  fs.readdirSync(outDir).forEach(f => { if (/\.js$/.test(f)) fs.unlinkSync(path.join(outDir, f)); });

  /* index (small, loaded up-front) */
  const norm = s => String(s || '').toLowerCase().replace(/[ً-ٰٟ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ـ/g, '');
  const index = { lib, title: cats.title, cats: [], total: 0, stats: { examples: 0, live: 0 } };
  cats.cats.forEach(c0 => {
    /* --written: hide pages that have no file yet (no "coming soon" stubs) and empty categories */
    const c = onlyWritten ? Object.assign({}, c0, { items: c0.items.filter(id => entries[id]) }) : c0;
    if (onlyWritten && !c.items.length) return;
    const items = c.items.map(id => {
      const e = entries[id];
      if (!e) {
        index.pending = (index.pending || 0) + 1;
        const isCss = lib === 'css';
        const isGuide = c.id === 'start' || /^meta-/.test(id) || c.kind === 'guide';
        return { id, pending: true, kind: isGuide ? 'guide' : (isCss ? (c.kind || 'property') : 'element'), tag: isGuide || isCss ? null : id, label: id, chip: isCss && !isGuide ? id : null, title: id, en: '', status: 'stable', support: null, display: null, void: false, summary: '', q: norm(id), qs: '' };
      }
      index.total++;
      index.stats.examples += e.stats.examples; index.stats.live += e.stats.liveBlocks;
      return {
        id: e.id, kind: e.kind, tag: e.tag || null, label: e.label || e.tag || e.title, chip: e.chip || null, mdn: e.mdn || null, title: e.title, en: e.en, status: e.status,
        support: e.support || null, display: e.display || null, void: e.void, summary: e.summary,
        q: norm([e.id, e.tag, e.label, e.chip, e.title, e.en, e.keywords.join(' ')].join(' ')),
        qs: norm(e.summary)
      };
    });
    index.cats.push({ id: c.id, name: c.name, icon: c.icon, desc: c.desc, items });
    const bundle = c.items.filter(id => entries[id]).map(id => {
      const e = Object.assign({}, entries[id]); delete e.stats; return e;
    });
    fs.writeFileSync(path.join(outDir, 'c-' + c.id + '.js'),
      'PXD.provide(' + JSON.stringify(lib) + ',' + JSON.stringify(c.id) + ',' + JSON.stringify(bundle) + ');\n');
  });
  fs.writeFileSync(path.join(outDir, 'index.js'), 'PXD.setIndex(' + JSON.stringify(lib) + ',' + JSON.stringify(index) + ');\n');
  console.log('Built ' + index.total + ' entries (' + index.stats.examples + ' examples, ' + index.stats.live + ' live blocks), ' + warnCount + ' warnings → docs/data/' + lib);
  return 0;
}

function status(lib) {
  lib = lib || 'html';
  const cats = loadCategories(lib);
  let done = 0, total = 0;
  cats.cats.forEach(c => {
    const have = c.items.filter(id => fs.existsSync(path.join(SRC, lib, c.id, id + '.md')));
    done += have.length; total += c.items.length;
    console.log(c.id.padEnd(12) + have.length + '/' + c.items.length + (have.length === c.items.length ? '' : '   missing: ' + c.items.filter(i => !have.includes(i)).join(' ')));
  });
  console.log('TOTAL ' + done + '/' + total);
}

const argv = process.argv.slice(2);
const libFlag = (() => { const i = argv.findIndex(a => a === '--lib' || a.startsWith('--lib=')); if (i < 0) return null; return argv[i].includes('=') ? argv[i].split('=')[1] : argv[i + 1]; })();
const cmd = argv[0];
const positional = argv.slice(1).filter(a => !a.startsWith('--') && a !== libFlag);
if (cmd === 'check') {
  if (!positional.length) { console.log('usage: node tools/docs.js check <file.md ...>'); process.exit(1); }
  process.exit(checkFiles(positional, libFlag) ? 1 : 0);
} else if (cmd === 'build') {
  const targets = libFlag ? [libFlag] : (positional[0] === 'all' ? LIB_LIST.filter(l => fs.existsSync(path.join(SRC, l, 'categories.json'))) : [positional[0] || 'html']);
  let rc = 0; targets.forEach(l => { rc = rc || build(l); });
  process.exit(rc);
} else if (cmd === 'status') {
  (libFlag ? [libFlag] : [positional[0] || 'html']).forEach(l => { console.log('── ' + l); status(l); });
} else if (cmd === 'ids') {
  const l = libFlag || positional[0] || 'html';
  loadCategories(l).cats.forEach(x => console.log(x.id + ': ' + x.items.join(' ')));
} else {
  console.log('usage: node tools/docs.js check|build|status|ids [--lib html|css] [--partial]');
}
