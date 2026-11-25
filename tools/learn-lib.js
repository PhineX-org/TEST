/* X Code learn — source parser + validator (Markdown → block JSON). See learn/src/SPEC.md */
'use strict';
const fs = require('fs');
const path = require('path');

const LEVELS = ['مبتدئ', 'متوسط', 'متقدم'];
const CALLOUTS = ['tip', 'warn', 'note', 'analogy', 'key'];
const LANGS = ['html', 'css', 'js', 'jsx', 'python', 'php', 'text', 'bash', 'json', 'sql'];
const MSA = /(يُعتبر|حيث إن|وذلك|\bلذا\b|قم بـ|\bيمكنك\b|\bسوف\b|لا يوجد|\bهذا\b|\bهذه\b|\bحشو\b|\bالمتصفح الخاص بك\b)/;

function parseFront(text) {
  text = text.replace(/\r\n?/g, '\n');
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!m) return { fm: null, body: text, off: 0 };
  const fm = {};
  m[1].split('\n').forEach(l => { const k = /^([A-Za-z_]+):\s*(.*)$/.exec(l); if (k) fm[k[1]] = k[2].trim(); });
  return { fm, body: text.slice(m[0].length), off: m[0].split('\n').length - 1 };
}

function parseArgs(s) {
  const o = {}; const re = /([A-Za-z_]+)=("([^"]*)"|(\S+))/g; let m;
  while ((m = re.exec(s))) o[m[1]] = m[3] != null ? m[3] : m[4];
  return o;
}

function fenceInfo(info) {
  const parts = info.trim().split(/\s+/).filter(Boolean), o = { lang: parts[0] || 'text', flags: {} };
  const rest = info.trim().slice((parts[0] || '').length);
  Object.assign(o.flags, parseArgs(rest));
  parts.slice(1).forEach(p => { if (!/=/.test(p)) o.flags[p] = true; });
  return o;
}

/* inline checks: balanced backticks / stars */
function lintInline(x, loc, err, warn) {
  if ((x.match(/`/g) || []).length % 2) err(loc, 'backtick غير متوازن في: ' + x.slice(0, 60));
  if ((x.match(/\*\*/g) || []).length % 2) err(loc, 'علامة ** غير متوازنة في: ' + x.slice(0, 60));
  const plain = x.replace(/`[^`]*`/g, '');
  const m = MSA.exec(plain); if (m) warn(loc, 'صياغة فصحى «' + m[1] + '» — اكتب بالمصري: ' + x.slice(0, 50));
  if (/<\/?[a-z][a-z0-9]*[^>]*>/i.test(plain)) err(loc, 'وسم HTML خام خارج backticks: ' + x.slice(0, 60));
}

/* lines: array of strings, base: 1-based line number of lines[0] in the file */
function parseBlocks(lines, base, ctx) {
  const blocks = [], err = ctx.err, warn = ctx.warn;
  let i = 0;
  const loc = n => ctx.file + ':' + (base + n);
  const emitP = (buf, at) => { if (!buf.length) return; const x = buf.join(' ').trim(); lintInline(x, loc(at), err, warn); blocks.push({ t: 'p', x }); };
  let para = [], paraAt = 0;
  const flush = () => { emitP(para, paraAt); para = []; };
  while (i < lines.length) {
    const ln = lines[i];
    if (!ln.trim()) { flush(); i++; continue; }
    /* fenced code */
    let m = /^```(.*)$/.exec(ln);
    if (m) {
      flush(); const info = fenceInfo(m[1]), start = i; i++; const code = [];
      while (i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i++]);
      if (i >= lines.length) err(loc(start), 'code fence مش مقفول');
      i++;
      let text = code.join('\n');
      if (info.lang === 'out') blocks.push({ t: 'out', x: text, title: info.flags.title });
      else {
        if (LANGS.indexOf(info.lang) < 0) err(loc(start), 'لغة غير معروفة في الـ code fence: ' + info.lang);
        const b = { t: 'code', lang: info.lang, code: text };
        if (info.flags.title) b.title = info.flags.title;
        if (info.flags.bad) b.bad = true; if (info.flags.good) b.good = true;
        if (info.flags.live) { if (info.lang !== 'html') err(loc(start), 'live بس للـ html'); b.t = 'live'; if (info.flags.h) b.h = +info.flags.h; delete b.lang; }
        if (text.split('\n').some(l => l.length > 90)) warn(loc(start), 'سطر كود أطول من 90 حرف (الموبايل)');
        blocks.push(b);
      }
      continue;
    }
    /* container ::: */
    m = /^:::(\w+)\s*(.*)$/.exec(ln);
    if (m) {
      flush(); const start = i, name = m[1], args = parseArgs(m[2]), argRaw = m[2]; i++; const inner = [];
      while (i < lines.length && !/^:::\s*$/.test(lines[i])) inner.push(lines[i++]);
      if (i >= lines.length) err(loc(start), '::: container مش مقفول');
      i++;
      const b = parseContainer(name, argRaw, args, inner, base + start + 1, ctx, loc(start));
      if (b) blocks.push(b);
      continue;
    }
    /* heading */
    m = /^(#{3,4})\s+(.*)$/.exec(ln);
    if (m) { flush(); lintInline(m[2], loc(i), err, warn); blocks.push({ t: 'h', x: m[2].trim() }); i++; continue; }
    if (/^#{1,2}\s/.test(ln)) { err(loc(i), 'عنوان ## / # مش مسموح هنا (الأقسام بتتحدد بالهيكل)'); i++; continue; }
    /* callout */
    m = /^>\s*\[!(\w+)\]\s?(.*)$/.exec(ln);
    if (m) {
      flush(); const kind = m[1].toLowerCase(); if (CALLOUTS.indexOf(kind) < 0) err(loc(i), 'callout غير معروف: ' + kind);
      const paras = []; let cur = [m[2]]; const at = i; i++;
      while (i < lines.length && /^>/.test(lines[i])) { const t = lines[i].replace(/^>\s?/, ''); if (!t.trim()) { paras.push(cur.join(' ').trim()); cur = []; } else cur.push(t); i++; }
      paras.push(cur.join(' ').trim()); const ps = paras.filter(Boolean);
      ps.forEach(p => lintInline(p, loc(at), err, warn));
      blocks.push({ t: 'callout', kind, paras: ps }); continue;
    }
    /* table */
    if (/^\|/.test(ln)) {
      flush(); const rows = []; const at = i;
      while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim())); i++; }
      if (rows.length < 2 || !rows[1].every(c => /^:?-{2,}:?$/.test(c))) { err(loc(at), 'الجدول لازم صف عناوين ثم صف |---|---|'); continue; }
      const head = rows[0], body = rows.slice(2);
      body.forEach(r => { if (r.length !== head.length) err(loc(at), 'صف جدول عدد أعمدته مختلف'); });
      blocks.push({ t: 'table', head, rows: body }); continue;
    }
    /* list */
    m = /^(\s*)([-*+~]|\d+[.)])\s+(.*)$/.exec(ln);
    if (m) {
      flush(); const first = m[2]; const kind = /\d/.test(first) ? 'ol' : first === '+' ? 'tick' : first === '~' ? 'cross' : 'ul';
      const items = []; const at = i;
      while (i < lines.length) {
        const mm = /^(\s*)([-*+~]|\d+[.)])\s+(.*)$/.exec(lines[i]);
        if (mm) { items.push(mm[3]); i++; }
        else if (/^\s{2,}\S/.test(lines[i]) && items.length) { items[items.length - 1] += ' ' + lines[i].trim(); i++; }
        else break;
      }
      items.forEach(x => lintInline(x, loc(at), err, warn));
      if (kind === 'ul' && items.every(x => /^\[[ x]\]\s/.test(x))) blocks.push({ t: 'check', items: items.map(x => x.replace(/^\[[ x]\]\s/, '')) });
      else if (kind === 'ol') blocks.push({ t: 'ol', items });
      else if (kind === 'ul') blocks.push({ t: 'ul', items });
      else blocks.push({ t: 'ul', cls: kind, items });
      continue;
    }
    /* image */
    m = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/.exec(ln);
    if (m) { flush(); blocks.push({ t: 'img', alt: m[1], src: m[2] }); i++; continue; }
    if (!para.length) paraAt = i; para.push(ln.trim()); i++;
  }
  flush();
  /* merge bad+good code pairs → compare */
  const out = [];
  for (let k = 0; k < blocks.length; k++) {
    const a = blocks[k], b = blocks[k + 1];
    if (a.t === 'code' && b && b.t === 'code' && ((a.bad && b.good) || (a.good && b.bad)) && a.lang === b.lang) {
      const bad = a.bad ? a : b, good = a.bad ? b : a;
      out.push({ t: 'compare', lang: a.lang, bad: { code: bad.code }, good: { code: good.code } }); k++;
    } else out.push(a);
  }
  return out;
}

function splitSub(inner) {
  const subs = { _: [] }; let cur = '_';
  inner.forEach(l => { const m = /^---(\w+)\s*$/.exec(l); if (m) { cur = m[1]; subs[cur] = []; } else subs[cur].push(l); });
  const o = {}; Object.keys(subs).forEach(k => { o[k] = subs[k].join('\n').replace(/^\n+|\n+$/g, ''); }); return o;
}
function parseTests(text, loc, err) {
  const tests = []; const lines = text.split('\n');
  lines.forEach(l => {
    if (!l.trim()) return;
    if (/^\s{2,}\S/.test(l) && tests.length) { tests[tests.length - 1][1] += '\n' + l.trim(); return; }
    const m = /^(.*?)\s*(?:@(\d+))?\s*::\s*([\s\S]*)$/.exec(l);
    if (!m || !m[1].trim() || !m[3].trim()) { err(loc, 'اختبار غلط الصيغة (المطلوب: وصف :: تعبير JS): ' + l.slice(0, 60)); return; }
    const t = [m[1].trim(), m[3].trim()]; if (m[2]) t.push({ vp: +m[2] }); tests.push(t);
  });
  tests.forEach(t => { try { new Function('H', 'src', 'errors', 'async function f(){with(H){' + (/(^|[\s;{(])return[\s(]/.test(t[1]) || /;\s*\S/.test(t[1]) || /\n/.test(t[1]) ? t[1] : 'return (' + t[1] + ')') + '\n}}'); } catch (e) { err(loc, 'اختبار فيه خطأ syntax: «' + t[0] + '» — ' + e.message); } });
  return tests;
}

function parseContainer(name, argRaw, args, inner, base, ctx, loc) {
  const err = ctx.err, warn = ctx.warn;
  if (name === 'steps' || name === 'terms') {
    const items = [];
    inner.forEach(l => { if (!l.trim()) return; const m = /^(.*?)\s::\s(.*)$/.exec(l); if (!m) { err(loc, name + ': كل سطر لازم "عنوان :: شرح"'); return; } items.push(name === 'steps' ? { t: m[1].trim(), x: m[2].trim() } : { k: m[1].trim(), v: m[2].trim() }); });
    items.forEach(it => { lintInline(it.x || it.v, loc, err, warn); });
    return { t: name, items };
  }
  if (name === 'try') {
    const lang = (argRaw.trim().split(/\s+/)[0]) || 'html';
    if (['html', 'css', 'js'].indexOf(lang) < 0) err(loc, 'try: اللغة لازم html أو css أو js');
    const s = splitSub(inner);
    const b = { t: 'try', lang, title: args.title || 'جرّب بنفسك' };
    if (args.h) b.h = +args.h;
    b.x = parseBlocks(s._.split('\n'), base, ctx);
    if (!b.x.length) err(loc, 'try: لازم نص المهمة قبل أول ---');
    b.starter = s.starter != null ? s.starter : ''; if (s.html != null) b.html = s.html;
    if (s.css != null && lang === 'html') b.css = s.css; if (s.js != null && lang === 'html') b.js = s.js;
    if (s.solution == null) err(loc, 'try: لازم ---solution');
    else b.solution = s.solution;
    if (s.tests == null) err(loc, 'try: لازم ---tests'); else { b.tests = parseTests(s.tests, loc, err); if (b.tests.length < 1) err(loc, 'try: محتاج اختبار واحد على الأقل'); }
    if (s.hint) b.hint = s.hint;
    return b;
  }
  err(loc, 'container غير معروف: ' + name); return null;
}

/* quiz questions (docs-style) */
function parseQuiz(lines, base, ctx) {
  const qs = []; let cur = null, i = 0; const err = ctx.err, warn = ctx.warn, loc = n => ctx.file + ':' + (base + n);
  const finish = () => {
    if (!cur) return;
    const correct = cur.o.map((o, k) => o.ok ? k : -1).filter(k => k >= 0);
    if (cur.o.length < 3 || cur.o.length > 5) err(loc(cur.at), 'سؤال: من 3 لـ 5 اختيارات');
    if (correct.length !== 1) err(loc(cur.at), 'سؤال: لازم اختيار واحد صح [x] بالظبط — «' + cur.q.slice(0, 40) + '»');
    if (!cur.why) warn(loc(cur.at), 'سؤال بدون شرح للإجابة');
    qs.push({ q: cur.q, o: cur.o.map(o => o.t), a: correct[0] != null ? correct[0] : 0, why: cur.why, code: cur.code });
    cur = null;
  };
  while (i < lines.length) {
    const ln = lines[i]; let m;
    if ((m = /^###\s+(.*)$/.exec(ln))) { finish(); cur = { q: m[1].trim(), o: [], why: '', at: i }; lintInline(cur.q, loc(i), err, warn); i++; continue; }
    if (!cur) { i++; continue; }
    if ((m = /^```(\w+)?/.exec(ln))) { const info = (m[1] || 'js'); const code = []; i++; while (i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i++]); i++; cur.code = { lang: info, code: code.join('\n') }; continue; }
    if ((m = /^-\s+\[( |x)\]\s+(.*)$/.exec(ln))) { cur.o.push({ ok: m[1] === 'x', t: m[2].trim() }); lintInline(m[2], loc(i), err, warn); i++; continue; }
    if (ln.trim()) { cur.why += (cur.why ? ' ' : '') + ln.trim(); }
    i++;
  }
  finish();
  qs.forEach(q => { if (q.o.some((o, k) => q.o.indexOf(o) !== k)) err(ctx.file, 'اختيارات مكررة في سؤال «' + q.q.slice(0, 40) + '»'); lintInline(q.why || '', ctx.file, err, warn); });
  return qs;
}

/* split "## " sections of a body */
function splitSections(lines) {
  const secs = []; let cur = { title: null, at: 0, lines: [] };
  lines.forEach((l, i) => { const m = /^##\s+(.*)$/.exec(l); if (m && !/^###/.test(l)) { secs.push(cur); cur = { title: m[1].trim(), at: i + 1, lines: [] }; } else cur.lines.push(l); });
  secs.push(cur); return secs.filter(s => s.title !== null || s.lines.some(x => x.trim()));
}
const EMOJI = /^(\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic})*)\s*/u;

function commonMeta(fm, file, id, err) {
  const need = ['id', 'type', 'title', 'summary'];
  need.forEach(k => { if (!fm[k]) err(file, 'front matter ناقص: ' + k); });
  if (fm.id && fm.id !== id) err(file, 'id (' + fm.id + ') لازم يساوي اسم الملف/الفولدر بدون الرقم (' + id + ')');
  if (fm.level && LEVELS.indexOf(fm.level) < 0) err(file, 'level لازم واحد من: ' + LEVELS.join(' / '));
  if (fm.runtime && ['tailwind', 'react', 'python', 'php'].indexOf(fm.runtime) < 0) err(file, 'runtime لازم tailwind / react / python / php');
  if (fm.summary && (fm.summary.length < 20 || fm.summary.length > 200)) err(file, 'summary من 20 لـ 200 حرف');
  return {
    id: fm.id, type: fm.type, title: fm.title, summary: fm.summary,
    time: fm.time ? +fm.time : undefined, level: fm.level || undefined, runtime: fm.runtime || undefined, tags: fm.tags ? fm.tags.split(/\s*,\s*/).filter(Boolean) : undefined
  };
}

function parseLesson(file, text, ctx0) {
  const errors = [], warns = [];
  const err = (l, m) => errors.push(l + ': ' + m), warn = (l, m) => warns.push(l + ': ' + m);
  const ctx = { file, err, warn };
  const { fm, body, off } = parseFront(text);
  if (!fm) { err(file, 'مفيش front matter'); return { errors, warns }; }
  const stem = path.basename(file, '.md').replace(/^\d+-/, '');
  const meta = commonMeta(fm, file, stem, err);
  const lines = body.split('\n'); const secs = splitSections(lines);
  const item = Object.assign({}, meta);
  if (fm.type === 'quiz') {
    const qs = []; secs.forEach(s => parseQuiz(s.lines, off + s.at + 1, ctx).forEach(q => qs.push(q)));
    if (qs.length < 8) err(file, 'اختبار الوحدة محتاج 8 أسئلة على الأقل (عندك ' + qs.length + ')');
    item.items = qs; return { item, errors, warns };
  }
  if (fm.type !== 'lesson') err(file, 'type لازم lesson أو quiz');
  item.sections = []; let hasTry = 0, chars = 0;
  secs.forEach(s => {
    if (s.title === null) { if (s.lines.some(x => x.trim())) err(file, 'فيه نص قبل أول ## قسم'); return; }
    if (/^(quiz|اختبر نفسك)$/i.test(s.title.replace(EMOJI, '').trim())) { item.quiz = parseQuiz(s.lines, off + s.at + 1, ctx); return; }
    const em = EMOJI.exec(s.title); const icon = em ? em[1] : '📌'; const title = s.title.replace(EMOJI, '').trim();
    const blocks = parseBlocks(s.lines, off + s.at + 1, ctx);
    blocks.forEach(b => { if (b.t === 'try') hasTry++; if (b.x && typeof b.x === 'string') chars += b.x.length; if (b.items) b.items.forEach(i => { chars += (typeof i === 'string' ? i : i.x || i.v || '').length; }); if (b.paras) b.paras.forEach(p => { chars += p.length; }); });
    if (!blocks.length) err(file, 'قسم فاضي: ' + title);
    item.sections.push({ title, icon, blocks });
  });
  if (item.sections.length < 3) err(file, 'الدرس محتاج 3 أقسام على الأقل');
  if (!hasTry) err(file, 'الدرس محتاج ":::try" واحد على الأقل (تمرين تفاعلي)');
  if (!item.quiz || item.quiz.length < 3) err(file, 'الدرس محتاج ## quiz فيه 3 أسئلة على الأقل');
  if (chars < 2500) warn(file, 'الشرح قصير (' + chars + ' حرف نثر) — الهدف ≥ 3000');
  if (!item.time) err(file, 'front matter: time (بالدقايق)');
  return { item, errors, warns };
}

/* ───── project markers ───── */
const OPEN = /^\s*(?:<!--\s*@(\d+)(?:-(\d+))?\s*-->|\/\*\s*@(\d+)(?:-(\d+))?\s*\*\/|\/\/\s*@(\d+)(?:-(\d+))?|#\s*@(\d+)(?:-(\d+))?)\s*$/;
const CLOSE = /^\s*(?:<!--\s*@\/\s*-->|\/\*\s*@\/\s*\*\/|\/\/\s*@\/|#\s*@\/)\s*$/;
function parseMarkers(text) {
  const lines = String(text).replace(/\r\n?/g, '\n').split('\n'), out = [], stack = [], errs = []; let max = 0;
  lines.forEach((ln, i) => {
    const m = OPEN.exec(ln);
    if (m) { let a, b; for (let q = 0; q < 4; q++) { const x = m[1 + 2 * q]; if (x != null) { a = +x; b = m[2 + 2 * q] != null ? +m[2 + 2 * q] : Infinity; } } stack.push([a, b]); max = Math.max(max, a, b === Infinity ? 0 : b); return; }
    if (CLOSE.test(ln)) { if (!stack.length) errs.push('سطر ' + (i + 1) + ': @/ زيادة'); stack.pop(); return; }
    out.push({ t: ln, r: stack.slice() });
  });
  if (stack.length) errs.push('region مش مقفول (@/ ناقصة)');
  return { max, errors: errs, at: k => out.filter(l => l.r.every(r => k >= r[0] && k <= r[1])).map(l => l.t).join('\n') };
}

function parseProject(dir, ctx0) {
  const file = path.join(dir, 'project.md');
  const errors = [], warns = [];
  const err = (l, m) => errors.push(l + ': ' + m), warn = (l, m) => warns.push(l + ': ' + m);
  const ctx = { file, err, warn };
  if (!fs.existsSync(file)) { err(dir, 'مفيش project.md'); return { errors, warns }; }
  const { fm, body, off } = parseFront(fs.readFileSync(file, 'utf8'));
  if (!fm) { err(file, 'مفيش front matter'); return { errors, warns }; }
  const stem = path.basename(dir).replace(/^\d+-/, '');
  const meta = commonMeta(fm, file, stem, err);
  if (fm.type !== 'project') err(file, 'type لازم project');
  const item = Object.assign({}, meta); item.steps = []; item.files = {};
  const lines = body.split('\n'), secs = splitSections(lines);
  secs.forEach(s => {
    if (s.title === null) { if (s.lines.some(x => x.trim())) err(file, 'فيه نص قبل أول ## قسم'); return; }
    const base = off + s.at + 1;
    if (s.title === 'about') item.about = parseBlocks(s.lines, base, ctx);
    else if (s.title === 'skills') { const bl = parseBlocks(s.lines, base, ctx); item.skills = [].concat.apply([], bl.filter(b => b.t === 'ul').map(b => b.items)); if (item.skills.length < 3) err(file, 'skills: 3 نقط على الأقل'); }
    else if (/^step:\s*/.test(s.title)) {
      const title = s.title.replace(/^step:\s*/, '').trim(); const st = { title, x: [], tests: [] };
      /* extract tests / hint / edit containers */
      const rest = []; let i = 0; const L = s.lines;
      while (i < L.length) {
        const m = /^:::(tests|hint|edit)\s*(.*)$/.exec(L[i]);
        if (m) {
          const inner = []; i++; while (i < L.length && !/^:::\s*$/.test(L[i])) inner.push(L[i++]); i++;
          if (m[1] === 'tests') st.tests = parseTests(inner.join('\n'), file + ':' + (base + i), err);
          else if (m[1] === 'hint') st.hint = inner.join(' ').trim();
          else st.edit = m[2].trim().split(/\s+/).filter(Boolean);
        } else { rest.push(L[i]); i++; }
      }
      st.x = parseBlocks(rest, base, ctx);
      if (!st.x.length) err(file, 'خطوة «' + title + '» من غير شرح');
      if (st.tests.length < 1) err(file, 'خطوة «' + title + '» من غير :::tests');
      item.steps.push(st);
    } else err(file, 'قسم غير معروف في project.md: ' + s.title + ' (المسموح: about / skills / step: ...)');
  });
  if (!item.about || !item.about.length) err(file, 'محتاج ## about');
  if (item.steps.length < 4) err(file, 'المشروع محتاج 4 خطوات على الأقل (عندك ' + item.steps.length + ')');
  if (!item.time) err(file, 'front matter: time (بالدقايق)');
  /* files */
  const files = fs.readdirSync(dir).filter(f => f !== 'project.md' && !f.startsWith('.') && fs.statSync(path.join(dir, f)).isFile());
  if (!files.length) err(dir, 'مفيش ملفات كود في فولدر المشروع');
  const n = item.steps.length; let any = false;
  files.forEach(f => {
    const txt = fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r\n?/g, '\n'); item.files[f] = txt;
    const pm = parseMarkers(txt); pm.errors.forEach(e => err(path.join(dir, f), e));
    if (pm.max > n) err(path.join(dir, f), 'marker @' + pm.max + ' أكبر من عدد الخطوات (' + n + ')');
    if (pm.max > 0) any = true;
    const fin = pm.at(n);
    if (/\.js$/.test(f)) { try { new Function(fin); } catch (e) { if (!/import|export|await/.test(e.message)) err(path.join(dir, f), 'syntax error في النسخة النهائية: ' + e.message); } }
    for (let k = 0; k <= n; k++) { const state = pm.at(k); if (/\.js$/.test(f) && state.trim()) { try { new Function(state); } catch (e) { if (!/import|export|await/.test(e.message)) warn(path.join(dir, f), 'syntax error بعد الخطوة ' + k + ': ' + e.message); } } }
  });
  if (!any) err(dir, 'مفيش ولا marker @N في ملفات المشروع');
  /* every step must change something */
  for (let k = 1; k <= n; k++) {
    let ch = false; files.forEach(f => { const pm = parseMarkers(item.files[f]); if (pm.at(k) !== pm.at(k - 1)) ch = true; });
    if (!ch) err(file, 'الخطوة ' + k + ' («' + item.steps[k - 1].title + '») مفيش marker بيغيّر أي ملف عندها');
  }
  files.forEach(f => { if (item.steps.some(s => s.edit && s.edit.some(e => !files.includes(e)))) err(file, ':::edit بيشاور على ملف مش موجود'); });
  return { item, errors, warns };
}

module.exports = { parseFront, parseBlocks, parseQuiz, parseLesson, parseProject, parseMarkers, LEVELS };
