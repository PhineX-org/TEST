#!/usr/bin/env node
/* X Code learn — behavioural verifier (Playwright).
 *   node tools/learn-verify.js [track[/id]] [--projects] [--lessons] [-v]
 * Needs `node tools/learn.js build` first. For every project step: the step's tests must PASS on the solution state (after the step)
 * and at least one must FAIL on the starter state (before the step). For every lesson "try" block: solution passes, starter fails. */
'use strict';
const path = require('path');
const fs = require('fs'), os = require('os');
const { chromium } = require('playwright');
const { buildAll } = require('./learn.js');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2), flags = args.filter(a => a.startsWith('-')), pos = args.filter(a => !a.startsWith('-'))[0] || '';
let [fTrack, fSel] = pos.split('/'); fSel = fSel || '';
const fUnit = /^u\d/.test(fSel) ? fSel : '', fId = fUnit ? '' : fSel; const V = flags.includes('-v');
const onlyP = flags.includes('--projects'), onlyL = flags.includes('--lessons');

/* private copy of the app (symlinks) with data built ONLY for the requested scope — so parallel authors never touch each other / learn/data */
function mkSite() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'xfv-')), L = path.join(tmp, 'learn');
  fs.mkdirSync(L); fs.mkdirSync(path.join(tmp, 'docs'));
  fs.symlinkSync(path.join(ROOT, 'assets'), path.join(tmp, 'assets')); fs.symlinkSync(path.join(ROOT, 'docs', 'assets'), path.join(tmp, 'docs', 'assets'));
  fs.readdirSync(path.join(ROOT, 'learn')).forEach(n => { if (n !== 'data' && n !== 'src') fs.symlinkSync(path.join(ROOT, 'learn', n), path.join(L, n)); });
  const r = buildAll(true, { out: path.join(L, 'data'), only: { track: fTrack, unit: fUnit, id: fId }, lenient: true });
  return { tmp, L, errors: r.errors };
}
(async () => {
  const site = mkSite(); if (site.errors.length) { console.log('  (تحذير: ملفات فيها errors اتجاهلت — شغّل check):'); site.errors.slice(0, 6).forEach(e => console.log('    ' + e)); }
  const browser = await chromium.launch(); const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const perr = []; page.on('pageerror', e => perr.push(e.message)); page.on('console', m => { if (m.type() === 'error' && !/ERR_TUNNEL|Failed to load resource/.test(m.text())) perr.push(m.text().slice(0, 200)); });
  await page.goto('file://' + path.join(site.L, 'index.html') + '#/'); await page.waitForFunction(() => window.XF && XF.index);
  const list = await page.evaluate(() => { const o = []; XF.index.tracks.forEach(t => t.units.forEach(u => u.items.forEach(i => o.push({ track: t.id, id: i.id, type: i.type })))); return o; });
  let fails = 0, warns = 0, nStep = 0, nTry = 0;
  for (const it of list) {
    if (fTrack && it.track !== fTrack) continue; if (fId && it.id !== fId) continue;
    if (it.type === 'project' && onlyL) continue; if (it.type !== 'project' && onlyP) continue;
    if (it.type === 'quiz') continue;
    const out = await page.evaluate(async ({ track, id, type }) => {
      const item = await XF.getItem(track, id), report = [];
      const mkFrame = () => { const f = document.createElement('iframe'); f.style.cssText = 'position:fixed;left:0;top:0;width:900px;height:700px;opacity:0;pointer-events:none'; document.body.appendChild(f); return f; };
      if (type === 'project') {
        const model = XF.projModel(item), names = model.names, entry = names.filter(f => /^index\.html?$/.test(f))[0] || names[0];
        for (let k = 1; k <= model.n; k++) {
          const tests = item.steps[k - 1].tests, r = { step: k, title: item.steps[k - 1].title, tests: tests.length };
          for (const [label, st] of [['solution', k], ['starter', k - 1]]) {
            const files = model.at(st), errs = [];
            const res = await XF.runTests({ files, entry, runtime: item.runtime, ls: {} }, tests);
            if (label === 'solution') { const f = mkFrame(), pv = XF.Preview(f, { ls: {}, runtime: item.runtime }); pv.onlog = (kk, m) => { if (kk === 'error') errs.push(m); }; pv.load(files, entry); await pv.ready(); await new Promise(rr => setTimeout(rr, 350)); pv.destroy(); f.remove(); }
            if (label === 'solution') { r.bad = res.filter(x => !x.ok).map(x => x.d + (x.msg ? ' → ' + x.msg : '')); r.errs = errs; }
            else { r.startPass = res.every(x => x.ok); }
          }
          report.push(r);
        }
      } else {
        let n = 0;
        for (const s of item.sections || []) for (const b of s.blocks) if (b.t === 'try') {
          n++; const ctx = { track, id, n: 0, runtime: item.runtime }, el = XF.view.tryBlock(b, ctx); el.style.cssText = 'position:fixed;left:0;top:0;width:900px;opacity:0;pointer-events:none'; document.body.appendChild(el);
          await XF.needEditor(); await new Promise(r => setTimeout(r, 500));
          const W = el.__ws, r = { try: n, title: b.title, tests: b.tests.length };
          const a = await W.check(); r.startPass = a;
          const sol = {}; W.names.forEach(nm => { sol[nm] = null; });
          W.solve(); await new Promise(rr => setTimeout(rr, 500)); const ok = await W.check();
          r.solPass = ok; if (!ok) r.bad = [].map.call(el.querySelectorAll('.ws-tl li.t-no .tx'), x => x.textContent);
          W.destroy(); el.remove(); report.push(r);
        }
      }
      return report;
    }, it).catch(e => [{ fatal: String(e.message || e).slice(0, 300) }]);
    for (const r of out) {
      if (r.fatal) { fails++; console.log('FAIL  ' + it.track + '/' + it.id + ' — ' + r.fatal); continue; }
      if (r.step) {
        nStep++;
        if (r.bad && r.bad.length) { fails++; console.log('FAIL  ' + it.track + '/' + it.id + ' step ' + r.step + ' «' + r.title + '»: الحل مش بيعدّي — ' + r.bad.join(' | ')); }
        else if (r.errs && r.errs.length) { warns++; console.log('  warn  ' + it.track + '/' + it.id + ' step ' + r.step + ': JS error في الحل: ' + r.errs[0]); }
        if (r.startPass) { fails++; console.log('FAIL  ' + it.track + '/' + it.id + ' step ' + r.step + ' «' + r.title + '»: الاختبارات بتعدّي من غير ما المتعلم يعمل حاجة (starter بيعدّي)'); }
        else if (V) console.log('  ok    ' + it.track + '/' + it.id + ' step ' + r.step);
      } else if (r.try) {
        nTry++;
        if (!r.solPass) { fails++; console.log('FAIL  ' + it.track + '/' + it.id + ' try#' + r.try + ' «' + r.title + '»: الحل مش بيعدّي — ' + (r.bad || []).join(' | ')); }
        if (r.startPass) { fails++; console.log('FAIL  ' + it.track + '/' + it.id + ' try#' + r.try + ': بيعدّي من غير حل (starter)'); }
        else if (V && r.solPass) console.log('  ok    ' + it.track + '/' + it.id + ' try#' + r.try);
      }
    }
  }
  if (perr.length) { warns++; console.log('  page errors:\n    ' + [...new Set(perr)].slice(0, 8).join('\n    ')); }
  console.log('\nverified ' + nStep + ' steps + ' + nTry + ' try-blocks — ' + fails + ' FAIL, ' + warns + ' warn');
  await browser.close(); try { fs.rmSync(site.tmp, { recursive: true, force: true }); } catch (e) { }
  if (!nStep && !nTry && !fails) console.log('  (مفيش حاجة اتفحصت — اتأكد من الـ track/unit/id، أو إن الملف مفيهوش errors في check)');
  process.exit(fails ? 1 : 0);
})();
