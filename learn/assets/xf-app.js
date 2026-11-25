/* X Code — learn app: shell (header, sidebar, bottom bar, sheet, search, prefs) + router + pages. */
(function () {
  'use strict';
  var PXD = window.PXD, XF = window.XF, V = XF.view, h = PXD.h, $ = PXD.$, $$ = PXD.$$, esc = PXD.esc, store = PXD.store, body = document.body, root = document.documentElement;
  var main = $('#main'), layout = $('#layout'), tree = $('#tree'), cbbar = $('#cbbar');
  var TYPE = { lesson: ['📖', 'درس'], project: ['🛠️', 'مشروع'], quiz: ['🏆', 'اختبار'], lab: ['🧪', 'تدريب'] };
  var LEVEL = { 'مبتدئ': 'good', 'متوسط': 'warn', 'متقدم': 'bad' };

  /* ═════════ prefs (same keys as docs: theme / fs / lh / side) ═════════ */
  var THEMES = [
    ['dusk', 'داكن دافئ', '#1d1916', '#e8dccb', '#e3a35f'],
    ['paper', 'ورقي فاتح', '#f1e9d9', '#2f261c', '#a8501b'],
    ['sepia', 'سيبيا', '#e6d6b4', '#3a2c18', '#8a4a1e']
  ];
  var FS_MIN = 12, FS_MAX = 28, FS_DEF = 16;
  function validTheme(t) { return t === 'dark' || t === 'glass' ? 'dusk' : t === 'light' ? 'paper' : t === 'kindle' ? 'sepia' : (t === 'dusk' || t === 'paper' || t === 'sepia') ? t : 'dusk'; }
  var prefs = { theme: validTheme(store.get('theme', 'dusk')), fs: Math.min(FS_MAX, Math.max(FS_MIN, Math.round(+store.get('fs', FS_DEF) || FS_DEF))), lh: +store.get('lh', 1.95) || 1.95, side: store.get('side', 'left') };
  var SV = function (p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>'; };
  var ICON = {
    moon: SV('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'),
    sun: SV('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    cup: SV('<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3"/>'),
    book: SV('<path d="M4 19.5V5.5A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/><path d="M12 7.2v4.4M9.8 9.4h4.4" opacity=".75"/>'),
    chev: SV('<path d="m9 6 6 6-6 6"/>'),
    list: SV('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'),
    search: SV('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
    left: SV('<path d="m15 18-6-6 6-6"/>'), right: SV('<path d="m9 18 6-6-6-6"/>'),
    check: SV('<path d="M20 6 9 17l-5-5"/>'),
    code: SV('<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12"/>'),
    eye: SV('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'),
    book2: SV('<path d="M4 19.5V5.5A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5Z"/><path d="M8 7h8M8 11h5"/>'),
    steps: SV('<path d="M4 6h4v4H4zM10 14h4v4h-4zM16 6h4v4h-4z"/><path d="M8 8h2a2 2 0 0 1 2 2v4M12 14v-1M16 8h-2a2 2 0 0 0-2 2"/>')
  };
  var THEME_ICON = { dusk: ICON.moon, paper: ICON.sun, sepia: ICON.cup };
  var fsDec = $('#fs-dec'), fsInc = $('#fs-inc'), fsVal = $('#fs-val');
  function applyPrefs() {
    root.setAttribute('data-theme', prefs.theme);
    root.style.setProperty('--fs', prefs.fs + 'px'); root.style.setProperty('--lh', String(prefs.lh));
    layout.classList.toggle('side-right', prefs.side === 'right');
    var th = THEMES.filter(function (t) { return t[0] === prefs.theme; })[0] || THEMES[0];
    var m = $('meta[name=theme-color]'); if (m) m.setAttribute('content', th[2]);
    var bt = $('#btn-theme'); if (bt) { bt.innerHTML = THEME_ICON[prefs.theme]; bt.setAttribute('aria-label', 'المظهر: ' + th[1] + ' — اضغط للتغيير'); bt.setAttribute('title', 'المظهر: ' + th[1]); }
    fsVal.textContent = prefs.fs; fsDec.disabled = prefs.fs <= FS_MIN; fsInc.disabled = prefs.fs >= FS_MAX;
    window.dispatchEvent(new Event('pxd:prefs'));
  }
  function setPref(k, v) { prefs[k] = v; store.set(k, v); applyPrefs(); }
  function setFs(v) { v = Math.min(FS_MAX, Math.max(FS_MIN, Math.round(v))); if (v !== prefs.fs) setPref('fs', v); }
  function nextTheme() { var i = 0; THEMES.forEach(function (t, k) { if (t[0] === prefs.theme) i = k; }); var n = THEMES[(i + 1) % THEMES.length]; setPref('theme', n[0]); PXD.toast('المظهر: ' + n[1]); }
  window.addEventListener('storage', function (e) {
    if (e.key === 'pxd:theme' || e.key === 'pxd:fs') { try { prefs.theme = validTheme(JSON.parse(localStorage.getItem('pxd:theme'))); prefs.fs = +JSON.parse(localStorage.getItem('pxd:fs')) || prefs.fs; applyPrefs(); } catch (x) { } }
  });

  /* ═════════ small helpers ═════════ */
  function lgo(name, size) { return h('span', { class: 'lg', style: 'width:' + size + 'px;height:' + size + 'px;display:inline-grid;flex-shrink:0', html: XFB.logo(name) }); }
  function pill(t, cls) { return h('span', { class: 'pill' + (cls ? ' ' + cls : '') }, [t]); }
  function prog(pct, cls) { return h('div', { class: 'xprog ' + (cls || '') , role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100 }, [h('i', { style: 'width:' + pct + '%' })]); }
  function allItems() { var a = []; Object.keys(XF.flat).forEach(function (t) { a = a.concat(XF.flat[t]); }); return a; }
  function stats() {
    var s = { tracks: XF.index.tracks.length, lessons: 0, projects: 0, steps: 0, quizzes: 0 };
    allItems().forEach(function (it) { if (it.type === 'project') { s.projects++; s.steps += it.steps || 0; } else if (it.type === 'quiz') s.quizzes++; else s.lessons++; });
    return s;
  }
  function setTitle(t) { document.title = (t ? t + ' | ' : '') + 'X Code'; }
  function itemTime(it) { return it.type === 'project' ? (it.steps || 0) + ' خطوة' : it.time ? XF.fmtTime(it.time) : ''; }
  function setCrumbs(parts) { cbbar.innerHTML = ''; parts.forEach(function (p, i) { if (i) cbbar.appendChild(h('i', {}, ['›'])); cbbar.appendChild(i === parts.length - 1 ? h('b', {}, [p]) : h('span', {}, [p])); }); }

  /* ═════════ drawer / sheet / search ═════════ */
  var sheet = $('#sheet'), sheetBody = $('#sheet-body'), sheetTitle = $('#sheet-title');
  function openDrawer() { closeSheet(); closeSearch(); body.classList.add('drawer'); }
  function closeDrawer() { body.classList.remove('drawer'); }
  function openSheet(title, node) { closeDrawer(); closeSearch(); sheetTitle.textContent = title; sheetBody.innerHTML = ''; sheetBody.appendChild(node); body.classList.add('sheet-open'); }
  function closeSheet() { body.classList.remove('sheet-open'); }
  function closeSearch() { body.classList.remove('search-open'); }
  function closeUI() { closeDrawer(); closeSearch(); closeSheet(); }
  $('#scrim').addEventListener('click', closeUI);
  $('#sb-close').addEventListener('click', closeDrawer);
  $('#sheet-x').addEventListener('click', closeSheet);
  $('#ov-close').addEventListener('click', closeSearch);
  XF.ui = { openSheet: openSheet, closeSheet: closeSheet };

  var qOv = $('#q-ov'), ovRes = $('#ovres'), qTop = $('#q-top'), sbSearch = $('#sb-search');
  function searchItems(q) {
    var toks = PXD.norm(q).split(/\s+/).filter(Boolean); if (!toks.length) return null;
    var out = [];
    allItems().forEach(function (it) {
      var tm = XF.trk[it.track], hay = PXD.norm([it.title, it.summary, (it.tags || []).join(' '), it.id, tm.name, tm.en, it.unitTitle].join(' ')), ti = PXD.norm(it.title + ' ' + it.id), sc = 0;
      for (var i = 0; i < toks.length; i++) { if (hay.indexOf(toks[i]) < 0) { sc = -1; break; } sc += ti.indexOf(toks[i]) >= 0 ? 6 : 1; if (ti.indexOf(toks[i]) === 0) sc += 3; }
      if (sc > 0) out.push([sc, it]);
    });
    out.sort(function (a, b) { return b[0] - a[0]; });
    return out.slice(0, 40).map(function (x) { return x[1]; });
  }
  function renderResults(list) {
    ovRes.innerHTML = '';
    if (!list) {
      var w = h('div', { class: 'sov-hint' }, [h('b', {}, ['ابحث في الدروس والمشاريع']), h('p', { style: 'margin:4px 0 0' }, ['اكتب موضوع (مثلاً ', h('code', {}, ['flexbox']), ' أو ', h('code', {}, ['login']), ' أو ', h('code', {}, ['fetch']), ') أو اسم مشروع.'])]);
      var ch = h('div', { class: 'chips' });
      ['flexbox', 'grid', 'form', 'login', 'array', 'function', 'fetch', 'landing', 'jokes', 'async'].forEach(function (k) { ch.appendChild(h('button', { type: 'button', class: 'chip tag', onclick: function () { qOv.value = k; qOv.dispatchEvent(new Event('input')); qOv.focus(); } }, [k])); });
      w.appendChild(ch); ovRes.appendChild(w); return;
    }
    if (!list.length) { ovRes.appendChild(h('div', { class: 'empty' }, [h('b', {}, ['مفيش نتيجة']), 'جرّب كلمة تانية بالعربي أو الإنجليزي.'])); return; }
    var ul = h('ul', { class: 'res', role: 'listbox' });
    list.forEach(function (it, i) {
      var ty = TYPE[it.type] || TYPE.lesson, tm = XF.trk[it.track];
      ul.appendChild(h('li', { role: 'option' }, [h('a', { href: XF.href(it.track, it.id), class: i === 0 ? 'sel' : '' }, [
        h('span', { class: 'tg g' }, [ty[0] + ' ' + ty[1]]),
        h('span', { class: 'tx' }, [h('span', { class: 't1' }, [it.title]), it.summary ? h('span', { class: 't2', style: 'display:-webkit-box' }, [it.summary]) : null, h('span', { class: 'cat', style: 'display:block' }, [tm.name + ' · ' + it.unitTitle])])
      ])]));
    });
    ovRes.appendChild(ul);
  }
  function wireSearch(input) {
    var box = input.closest('.sbox');
    function run() { var v = input.value; box.classList.toggle('has', !!v); renderResults(searchItems(v)); }
    input.addEventListener('input', run);
    input.addEventListener('keydown', function (e) {
      var as = $$('.res a', ovRes), i = as.findIndex(function (a) { return a.classList.contains('sel'); });
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (i >= 0) as[i].classList.remove('sel'); i = (i + (e.key === 'ArrowDown' ? 1 : -1) + as.length) % as.length; if (as[i]) { as[i].classList.add('sel'); as[i].scrollIntoView({ block: 'nearest' }); } }
      else if (e.key === 'Enter') { var a = $('.res a.sel', ovRes) || as[0]; if (a) { e.preventDefault(); location.hash = a.getAttribute('href'); closeSearch(); } }
      else if (e.key === 'Escape') { if (input.value) { input.value = ''; run(); } else closeSearch(); }
    });
    var clr = $('.clr', box); if (clr) clr.onclick = function () { input.value = ''; run(); input.focus(); };
  }
  wireSearch(qOv);
  ovRes.addEventListener('click', function (e) { if (e.target.closest('a')) closeSearch(); });
  function openSearch() { closeDrawer(); closeSheet(); body.classList.add('search-open'); if (!qOv.value) renderResults(null); setTimeout(function () { qOv.focus(); }, 30); }
  [qTop, sbSearch].forEach(function (el) { el.addEventListener('focus', function () { this.blur(); openSearch(); }); el.addEventListener('click', openSearch); });

  /* ═════════ settings ═════════ */
  function seg(opts, val, cb, wide) {
    var el = h('div', { class: 'seg' + (wide ? ' wide' : ''), role: 'group' });
    opts.forEach(function (o) {
      var b = h('button', { type: 'button', class: String(o[0]) === String(val) ? 'on' : '', 'aria-pressed': String(o[0]) === String(val) }, [o[1]]);
      b.onclick = function () { cb(o[0]); $$('button', el).forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); }); b.classList.add('on'); b.setAttribute('aria-pressed', 'true'); };
      el.appendChild(b);
    });
    return el;
  }
  var settingsSync = null;
  window.addEventListener('pxd:prefs', function () { if (settingsSync) settingsSync(); });
  function openSettings() {
    var themeBtns = THEMES.map(function (t) {
      var b = h('button', { type: 'button', class: t[0] === prefs.theme ? 'on' : '', 'aria-pressed': String(t[0] === prefs.theme), 'data-t': t[0] }, [
        h('span', { class: 'sw', style: 'background:' + t[2] + ';color:' + t[3] }, ['نص تجريبي', h('i', { style: 'background:' + t[4] }), h('i', { style: 'background:' + t[3] })]), h('span', {}, [t[1]])]);
      b.onclick = function () { setPref('theme', t[0]); }; return b;
    });
    var range = h('input', { type: 'range', min: FS_MIN, max: FS_MAX, step: 1, value: prefs.fs, 'aria-label': 'حجم الخط' });
    var dec = h('button', { type: 'button', class: 'stp', 'aria-label': 'صغّر الخط' }, ['A−']), inc = h('button', { type: 'button', class: 'stp', 'aria-label': 'كبّر الخط' }, ['A+']);
    dec.onclick = function () { setFs(prefs.fs - 1); }; inc.onclick = function () { setFs(prefs.fs + 1); };
    range.addEventListener('input', function () { setFs(+range.value); });
    var fsLbl = h('small', {}, [prefs.fs + 'px']);
    var box = h('div', {}, [
      h('div', { class: 'set-row col' }, [h('div', { class: 'lbl' }, [h('span', {}, ['المظهر (ألوان مريحة للعين)'])]), h('div', { class: 'themes' }, themeBtns)]),
      h('div', { class: 'set-row col' }, [h('div', { class: 'lbl' }, [h('span', {}, ['حجم الخط']), fsLbl]), h('div', { class: 'fs-ctl' }, [dec, range, inc]),
        h('div', { class: 'fs-prev' }, ['ده مثال على حجم الخط اللي هتقرا بيه الشرح: ', h('code', {}, ['font-size']), ' بيتحكم في حجم الكلام كله.']),
        h('button', { class: 'btn ghost', type: 'button', style: 'align-self:flex-start', onclick: function () { setFs(FS_DEF); } }, ['رجّعه للحجم العادي (' + FS_DEF + ')'])]),
      h('div', { class: 'set-row col' }, [h('div', { class: 'lbl' }, [h('span', {}, ['تباعد الأسطر'])]), seg([[1.7, 'ضيّق'], [1.95, 'عادي'], [2.2, 'مريح']], prefs.lh, function (v) { setPref('lh', +v); }, true)]),
      h('div', { class: 'set-row' }, [h('span', {}, ['مكان القائمة الجانبية']), seg([['left', 'شمال'], ['right', 'يمين']], prefs.side, function (v) { setPref('side', v); })]),
      h('div', { class: 'set-row', style: 'flex-wrap:wrap' }, [
        h('a', { class: 'btn ghost', href: '../index.html' }, ['← الصفحة الرئيسية']),
        h('button', { class: 'btn ghost', type: 'button', onclick: function () {
          if (!confirm('تمسح تقدّمك في كل الكورسات وكودك المحفوظ؟')) return;
          Object.keys(localStorage).forEach(function (k) { if (/^pxd:(lp|ps|code|ls|try|chk|quiz|last)/.test(k)) localStorage.removeItem(k); });
          PXD.toast('اتمسح ✓'); route();
        } }, ['مسح تقدّمي'])])
    ]);
    settingsSync = function () {
      range.value = prefs.fs; fsLbl.textContent = prefs.fs + 'px'; dec.disabled = prefs.fs <= FS_MIN; inc.disabled = prefs.fs >= FS_MAX;
      themeBtns.forEach(function (b) { var on = b.getAttribute('data-t') === prefs.theme; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
    };
    settingsSync(); openSheet('الإعدادات', box);
  }
  $('#btn-theme').addEventListener('click', nextTheme);
  $('#btn-set').addEventListener('click', openSettings);
  fsDec.addEventListener('click', function () { setFs(prefs.fs - 1); });
  fsInc.addEventListener('click', function () { setFs(prefs.fs + 1); });
  fsVal.addEventListener('click', function () { setFs(FS_DEF); PXD.toast('حجم الخط رجع للعادي (' + FS_DEF + ')'); });
  $('#bb-idx').addEventListener('click', openDrawer);
  $('#bb-search').addEventListener('click', openSearch);
  $('#fab').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  window.addEventListener('scroll', function () { $('#fab').classList.toggle('show', window.scrollY > 700); }, { passive: true });
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase(), typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
    if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); openSearch(); }
    else if (e.key === 'Escape') closeUI();
  });

  /* ═════════ bottom bar ═════════ */
  var bbPrev = $('#bb-prev'), bbNext = $('#bb-next'), bbSec = $('#bb-sec');
  function setBottomNav(prev, next, sec) {
    function set(a, it) { if (it) { a.setAttribute('href', XF.href(it.track, it.id)); a.removeAttribute('aria-disabled'); } else { a.setAttribute('href', '#/'); a.setAttribute('aria-disabled', 'true'); } }
    set(bbPrev, prev); set(bbNext, next);
    bbSec.innerHTML = ''; bbSec.style.visibility = 'visible';
    if (sec) { bbSec.innerHTML = sec.icon + '<span>' + sec.label + '</span>'; bbSec.onclick = sec.fn; } else { bbSec.innerHTML = ICON.search.replace('<svg', '<svg style="opacity:0"') + '<span style="opacity:0">.</span>'; bbSec.onclick = null; bbSec.style.visibility = 'hidden'; }
  }

  /* ═════════ sidebar tree ═════════ */
  var treeTrack = null;
  function buildTree(trackId, curId) {
    tree.innerHTML = '';
    if (!trackId) {
      tree.appendChild(h('div', { class: 'tr-label' }, ['المسارات']));
      XF.index.tracks.forEach(function (t) {
        var s = XF.prog.summary(t.id);
        tree.appendChild(h('a', { class: 'tr-root', href: XF.href(t.id) }, [lgo(t.logo || t.id, 26), h('span', {}, [t.name]), h('span', { class: 'n' }, [s.pct + '%'])]));
      });
      tree.appendChild(h('div', { class: 'tr-label' }, ['أقسام تانية']));
      tree.appendChild(h('a', { class: 'tr-root', href: '#/projects' }, [lgo('project', 26), h('span', {}, ['كل المشاريع'])]));
      tree.appendChild(h('a', { class: 'tr-root', href: '../docs/index.html' }, [lgo('docs', 26), h('span', {}, ['مرجع HTML و CSS'])]));
      return;
    }
    var t = XF.trk[trackId], s = XF.prog.summary(trackId);
    tree.appendChild(h('a', { class: 'tr-root', href: '#/', style: 'font-size:.8rem;color:var(--muted)' }, [h('span', {}, ['← كل المسارات'])]));
    tree.appendChild(h('a', { class: 'tr-title', href: XF.href(trackId), style: 'text-decoration:none' }, [lgo(t.logo || t.id, 28), h('span', {}, [t.name]), h('small', {}, [s.pct + '%'])]));
    var curUnit = XF.meta[trackId][curId] && XF.meta[trackId][curId].unit;
    t.units.forEach(function (u) {
      var done = 0; u.items.forEach(function (it) { if (XF.prog.itemState(trackId, it) === 'done') done++; });
      var open = curUnit ? u.id === curUnit : u === t.units[0];
      var head = h('button', { class: 'tr-head', type: 'button', 'aria-expanded': open }, [h('span', { class: 'chev', html: ICON.chev }), h('span', { class: 'ic', 'aria-hidden': 'true' }, [u.icon || '📘']), h('span', { class: 'nm' }, [u.title]), h('span', { class: 'n' }, [done + '/' + u.items.length])]);
      var ul = h('ul', { class: 'tr-list' }, u.items.map(function (it) {
        var st = XF.prog.itemState(trackId, it), ty = TYPE[it.type] || TYPE.lesson;
        return h('li', {}, [h('a', { href: XF.href(trackId, it.id), 'data-id': it.id, class: 'guide ' + st }, [h('span', { class: 'dot ' + (st === 'done' ? 'done' : st === 'part' ? 'exp' : '') }), h('span', { class: 'ti' }, [(it.type === 'lesson' ? '' : ty[0] + ' ') + it.title])])]);
      }));
      var el = h('div', { class: 'tr-cat' + (open ? ' open' : '') }, [head, ul]);
      head.onclick = function () { var o = !el.classList.contains('open'); el.classList.toggle('open', o); head.setAttribute('aria-expanded', o); };
      tree.appendChild(el);
    });
    markActive(curId);
  }
  function markActive(id) {
    $$('a[aria-current]', tree).forEach(function (a) { a.removeAttribute('aria-current'); });
    if (!id) return;
    var a = $('a[data-id="' + id + '"]', tree);
    if (a) { a.setAttribute('aria-current', 'page'); var c = a.closest('.tr-cat'); if (c) c.classList.add('open'); setTimeout(function () { try { a.scrollIntoView({ block: 'center' }); } catch (e) { } }, 40); }
  }

  /* ═════════ pages ═════════ */
  var cleanup = null;
  function setPage(node, cls) {
    main.innerHTML = ''; main.className = 'main'; var w = h('div', { class: cls || 'doc xf-page' }); w.appendChild(node); main.appendChild(w); return w;
  }
  function loading() { main.innerHTML = ''; main.appendChild(h('div', { class: 'doc' }, [h('div', { class: 'xf-skel', style: 'height:34px;width:60%;margin:20px 0' }), h('div', { class: 'xf-skel', style: 'height:140px;margin-bottom:14px' }), h('div', { class: 'xf-skel', style: 'height:240px' })])); }
  function crumbsEl(parts) {
    var c = h('nav', { class: 'crumbs', 'aria-label': 'مسار الصفحة' });
    parts.forEach(function (p, i) { if (i) c.appendChild(h('i', {}, ['›'])); c.appendChild(p.href ? h('a', { href: p.href }, [p.t]) : h('span', {}, [p.t])); });
    return c;
  }

  /* ───── home ───── */
  function trackCard(t) {
    var s = XF.prog.summary(t.id), n = { l: 0, p: 0, st: 0, min: 0 };
    XF.flat[t.id].forEach(function (it) { if (it.type === 'project') { n.p++; n.st += it.steps || 0; } else if (it.type === 'lesson') { n.l++; n.min += it.time || 0; } });
    var a = h('a', { class: 'tcard', href: XF.href(t.id), style: '--tc:' + (t.color || 'var(--ac)') }, [
      h('div', { class: 'tc-h' }, [lgo(t.logo || t.id, 54), h('div', {}, [h('h3', {}, [t.name]), h('small', { class: 'mono' }, [t.en || ''])]), t.level ? h('span', { class: 'pill', style: 'margin-inline-start:auto' }, [t.level]) : null]),
      h('p', {}, [t.desc]),
      h('div', { class: 'tc-n' }, [h('span', {}, [h('b', {}, [String(n.l)]), ' درس']), h('span', {}, [h('b', {}, [String(n.p)]), ' مشروع']), h('span', {}, [h('b', {}, [String(n.st)]), ' خطوة']), n.min ? h('span', {}, [h('b', {}, [String(Math.round(n.min / 60) || 1)]), ' ساعة']) : null]),
      h('div', { class: 'tc-p' }, [prog(s.pct), h('span', {}, [s.pct ? s.pct + '% خلصت' : 'ابدأ دلوقتي'])])
    ]);
    return a;
  }
  function projectCard(it) {
    var t = XF.trk[it.track], st = XF.prog.step(it.track, it.id), n = it.steps || 0;
    return h('a', { class: 'pcard', href: XF.href(it.track, it.id), style: '--tc:' + (t.color || 'var(--ac)') }, [
      h('div', { class: 'pc-top' }, [lgo(t.logo || t.id, 30), h('span', { class: 'pc-tr' }, [t.name]), h('span', { class: 'pill', style: 'margin-inline-start:auto' }, [n + ' خطوة'])]),
      h('h3', {}, [it.title]), h('p', {}, [it.summary || '']),
      h('div', { class: 'pc-tags' }, (it.tags || []).slice(0, 4).map(function (x) { return h('span', { class: 'chip tag' }, [x]); })),
      h('div', { class: 'tc-p' }, [prog(n ? Math.round(st / n * 100) : 0), h('span', {}, [st >= n && n ? 'خلّصته ✓' : st ? 'الخطوة ' + st + ' من ' + n : 'لسه ماتبدأش'])])
    ]);
  }
  function renderHome() {
    var s = stats(), w = h('div', { class: 'home' });
    var hero = h('section', { class: 'hero' }, [
      h('span', { class: 'kicker' }, ['X Code · اتعلّم · ابني · احترف']),
      h('h1', {}, ['اتعلّم البرمجة ', h('em', {}, ['من الصفر']), ' لحد ما ', h('em', { class: 'c' }, ['تشتغل'])]),
      h('p', {}, ['كورسات بالعربي المصري على طريقة freeCodeCamp: شرح عميق لكل فكرة، وخطوات صغيرة بتكتب فيها الكود بنفسك والمنصة بتجرّبه وتقولك صح ولا غلط، ومشاريع حقيقية بتتبني من أول سطر لآخر سطر.']),
      h('div', { class: 'hero-cta' }, [h('a', { class: 'btn', href: XF.href(XF.index.tracks[0].id) }, ['ابدأ من ' + XF.index.tracks[0].name + ' ←']), h('a', { class: 'btn ghost', href: '#/projects' }, ['شوف المشاريع'])]),
      h('div', { class: 'stats' }, [['tracks', 'مسار'], ['lessons', 'درس'], ['projects', 'مشروع'], ['steps', 'خطوة تفاعلية']].map(function (k) { return h('div', { class: 'stat' }, [h('b', {}, [String(s[k[0]])]), h('span', {}, [k[1]])]); }))
    ]);
    w.appendChild(hero);
    var last = XF.prog.last();
    if (last && XF.meta[last.track] && XF.meta[last.track][last.id]) {
      var it = XF.meta[last.track][last.id], stp = it.type === 'project' ? XF.prog.step(it.track, it.id) : 0;
      var href = it.type === 'project' ? XF.href(it.track, it.id, Math.min(it.steps, stp + 1)) : XF.href(it.track, it.id);
      w.appendChild(h('a', { class: 'resume', href: href }, [h('span', { style: 'font-size:1.4rem' }, ['▶️']), h('span', {}, ['كمّل من حيث وقفت: ', h('b', {}, [it.title]), h('small', { style: 'display:block;color:var(--muted)' }, [XF.trk[it.track].name + (it.type === 'project' ? ' · الخطوة ' + Math.min(it.steps, stp + 1) + ' من ' + it.steps : '')])])]));
    }
    w.appendChild(h('h2', {}, ['🧭 المسارات']));
    w.appendChild(h('div', { class: 'tgrid xf-in' }, XF.index.tracks.map(trackCard)));
    var projs = allItems().filter(function (i) { return i.type === 'project'; });
    if (projs.length) {
      w.appendChild(h('h2', {}, ['🛠️ مشاريع هتبنيها خطوة بخطوة']));
      w.appendChild(h('div', { class: 'pgrid xf-in' }, projs.slice(0, 6).map(projectCard)));
      if (projs.length > 6) w.appendChild(h('p', { style: 'text-align:center;margin-top:14px' }, [h('a', { class: 'btn ghost', href: '#/projects' }, ['كل المشاريع (' + projs.length + ') ←'])]));
    }
    w.appendChild(h('h2', {}, ['🎓 بتتعلم إزاي هنا؟']));
    w.appendChild(h('ol', { class: 'howto xf-in' }, [
      ['اقرا الدرس', 'شرح بالمصري، أمثلة بتشغّلها وتعدّل عليها، وتشبيهات تثبّت الفكرة.'],
      ['جرّب بنفسك', 'تمارين صغيرة جوه الدرس: بتكتب، والمنصة بتختبر كودك فوراً.'],
      ['ابني مشروع', 'من الصفر لآخر خطوة: كل خطوة سطرين تلاتة وبتشوف النتيجة قدامك.'],
      ['اختبر نفسك', 'أسئلة في آخر كل درس وكل وحدة تأكدلك إنك فاهم قبل ما تكمّل.']
    ].map(function (x) { return h('li', {}, [h('div', { class: 'pth' }, [h('b', {}, [x[0]]), h('span', {}, [x[1]])])]); })));
    setPage(w, 'home xf-page');
    setTitle('اتعلّم البرمجة من الصفر'); setCrumbs(['X Code']); setBottomNav(null, null, null); buildTree(null);
  }

  /* ───── projects hub ───── */
  function renderProjects() {
    var w = h('div', {});
    w.appendChild(crumbsEl([{ t: 'الكورسات', href: '#/' }, { t: 'المشاريع' }]));
    w.appendChild(h('header', { class: 'dh' }, [h('div', { class: 'dh-top' }, [lgo('project', 46), h('h1', {}, ['مشاريع خطوة بخطوة'])]), h('p', { class: 'summary' }, ['كل مشروع بيتبني من الصفر لآخر خطوة: بتكتب الكود بنفسك في محرر حقيقي، والمنصة بتختبره وتقولك لو فيه حاجة ناقصة. في الآخر بيبقى معاك شغل تحطه في الـ Portfolio.'])]));
    XF.index.tracks.forEach(function (t) {
      var ps = XF.flat[t.id].filter(function (i) { return i.type === 'project'; });
      if (!ps.length) return;
      w.appendChild(h('h2', { class: 'hub-h' }, [lgo(t.logo || t.id, 28), ' ' + t.name]));
      w.appendChild(h('div', { class: 'pgrid xf-in' }, ps.map(projectCard)));
    });
    setPage(w); setTitle('المشاريع'); setCrumbs(['X Code', 'المشاريع']); setBottomNav(null, null, null); buildTree(null);
  }

  /* ───── track map ───── */
  function renderTrack(id) {
    var t = XF.trk[id], s = XF.prog.summary(id), f = XF.flat[id], w = h('div', {});
    var n = { l: 0, p: 0, st: 0, min: 0 }; f.forEach(function (it) { if (it.type === 'project') { n.p++; n.st += it.steps || 0; n.min += (it.steps || 0) * 3; } else if (it.type === 'lesson') { n.l++; n.min += it.time || 0; } });
    w.appendChild(crumbsEl([{ t: 'الكورسات', href: '#/' }, { t: t.name }]));
    var first = f.filter(function (it) { return XF.prog.itemState(id, it) !== 'done'; })[0] || f[0];
    var cta = first ? (first.type === 'project' ? XF.href(id, first.id, Math.max(1, Math.min(first.steps || 1, XF.prog.step(id, first.id) + 1))) : XF.href(id, first.id)) : '#/';
    w.appendChild(h('header', { class: 'dh' }, [
      h('div', { class: 'dh-top' }, [lgo(t.logo || t.id, 52), h('h1', {}, [t.name, t.en ? h('span', { class: 'en' }, [t.en]) : null])]),
      h('div', { class: 'badges' }, [t.level ? pill(t.level, 'st-stable') : null, pill(n.l + ' درس'), pill(n.p + ' مشروع'), pill(n.st + ' خطوة تفاعلية'), pill('≈ ' + Math.max(1, Math.round(n.min / 60)) + ' ساعة')]),
      h('p', { class: 'summary' }, [t.desc]),
      h('div', { class: 'tprog' }, [prog(s.pct), h('span', {}, [s.pct + '% — ' + s.done + ' من ' + s.total]), h('a', { class: 'btn', href: cta }, [s.done ? 'كمّل التعلّم ←' : 'ابدأ الكورس ←'])])
    ]));
    if (t.goals && t.goals.length) w.appendChild(h('section', { class: 'sec' }, [h('h2', {}, [h('span', { class: 'hi' }, ['🎯']), h('span', {}, ['هتتعلم إيه في الكورس ده؟'])]), h('div', { class: 'pr' }, [h('ul', { class: 'tick two' }, t.goals.map(function (g) { return h('li', { html: PXD.inline(g, { noLink: true }) }); }))])]));
    t.units.forEach(function (u, ui) {
      var done = u.items.filter(function (it) { return XF.prog.itemState(id, it) === 'done'; }).length;
      var sec = h('section', { class: 'sec unit', id: 'u-' + u.id }, [
        h('h2', {}, [h('span', { class: 'hi' }, [u.icon || '📘']), h('span', {}, [(ui + 1) + '. ' + u.title]), h('span', { class: 'un' }, [done + '/' + u.items.length])]),
        u.desc ? h('p', { class: 'ud' }, [u.desc]) : null,
        h('ol', { class: 'items' }, u.items.map(function (it) {
          var st = XF.prog.itemState(id, it), ty = TYPE[it.type] || TYPE.lesson, stp = it.type === 'project' ? XF.prog.step(id, it.id) : 0;
          return h('li', {}, [h('a', { class: 'itm ' + st + ' t-' + it.type, href: XF.href(id, it.id) }, [
            h('span', { class: 'ist', html: st === 'done' ? ICON.check : '' }, st === 'done' ? null : [it.type === 'project' ? '' : '']),
            h('span', { class: 'ity', 'aria-hidden': 'true' }, [ty[0]]),
            h('span', { class: 'itx' }, [h('b', {}, [it.title]), it.summary ? h('small', {}, [it.summary]) : null]),
            h('span', { class: 'imeta' }, [it.type === 'project' ? (stp ? stp + '/' + it.steps + ' خطوة' : it.steps + ' خطوة') : itemTime(it)])
          ])]);
        }))
      ]);
      w.appendChild(sec);
    });
    setPage(w, 'doc xf-page'); setTitle(t.name); setCrumbs(['X Code', t.name]); setBottomNav(null, null, null); buildTree(id);
  }

  /* ───── lesson ───── */
  function secNav(secs) {
    var nav = h('nav', { class: 'secnav', 'aria-label': 'أقسام الدرس' }, secs.map(function (s, i) { return h('a', { href: '#s-' + s.id, 'data-sec': s.id, class: i === 0 ? 'on' : '' }, [s.icon + ' ' + s.nav]); }));
    nav.addEventListener('click', function (e) { var a = e.target.closest('a'); if (!a) return; e.preventDefault(); goSec(a.getAttribute('data-sec')); });
    return nav;
  }
  function goSec(id) { var el = document.getElementById('s-' + id); if (el) { var y = el.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(root).getPropertyValue('--top')) || 68) - 70; window.scrollTo({ top: y, behavior: 'smooth' }); } }
  function spy(secs, nav) {
    if (!('IntersectionObserver' in window)) return function () { };
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { var id = en.target.getAttribute('data-sec'); $$('a', nav).forEach(function (a) { var on = a.getAttribute('data-sec') === id; a.classList.toggle('on', on); if (on) { try { a.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (e) { } } }); } }); }, { rootMargin: '-20% 0px -65% 0px' });
    secs.forEach(function (s) { var el = document.getElementById('s-' + s.id); if (el) io.observe(el); });
    return function () { io.disconnect(); };
  }
  function pager(track, id) {
    var nb = XF.neighbors(track, id), pn = h('nav', { class: 'pn', 'aria-label': 'التنقّل' });
    function card(it, nx) { return h('a', { href: XF.href(it.track, it.id), class: nx ? 'nx' : '' }, [h('small', {}, [nx ? 'التالي ←' : '→ السابق']), h('b', { class: 'ar' }, [(TYPE[it.type] || TYPE.lesson)[0] + ' ' + it.title]), h('span', {}, [it.unitTitle])]); }
    if (nb.prev) pn.appendChild(card(nb.prev, false)); else pn.appendChild(h('span'));
    if (nb.next) pn.appendChild(card(nb.next, true));
    return pn;
  }
  function renderLesson(item) {
    var track = item.track, t = XF.trk[track], w = h('div', {}), nb = XF.neighbors(track, item.id);
    var secs = (item.sections || []).map(function (s, i) { return { id: 'sec' + (i + 1), nav: s.nav || s.title.replace(/[(（].*$/, '').slice(0, 22), icon: s.icon || '📌', title: s.title, blocks: s.blocks }; });
    if (item.quiz && item.quiz.length) secs.push({ id: 'quiz', nav: 'اختبر نفسك', icon: '🏆', title: 'اختبر نفسك', quiz: item.quiz });
    var ctx = { track: track, id: item.id, n: 0, runtime: item.runtime };
    w.appendChild(crumbsEl([{ t: 'الكورسات', href: '#/' }, { t: t.name, href: XF.href(track) }, { t: item.unitTitle }, { t: item.title }]));
    var done = XF.prog.isDone(track, item.id);
    w.appendChild(h('header', { class: 'dh' }, [
      h('div', { class: 'dh-top' }, [h('span', { class: 'tagchip' }, ['#' + (nb.i + 1)]), h('h1', {}, [item.title])]),
      h('div', { class: 'badges' }, [pill('📖 درس'), item.time ? pill('⏱ ' + XF.fmtTime(item.time)) : null, item.level ? pill(item.level, LEVEL[item.level] === 'good' ? 'st-stable' : '') : null, pill(t.name)]),
      item.summary ? h('p', { class: 'summary', html: PXD.inline(item.summary, { noLink: true }) }) : null
    ]));
    var nav = secs.length > 1 ? secNav(secs) : null; if (nav) w.appendChild(nav);
    secs.forEach(function (s) {
      var sec = h('section', { class: 'sec', id: 's-' + s.id, 'data-sec': s.id }, [h('h2', {}, [h('span', { class: 'hi', 'aria-hidden': 'true' }, [s.icon]), h('span', {}, [s.title])])]);
      var pr = h('div', { class: 'pr' });
      if (s.quiz) pr.appendChild(V.quiz(s.quiz, ctx, { id: item.id, onDone: function (sc, tot, ok) { if (ok) { markDone(true); } } }));
      else pr.appendChild(V.blocks(s.blocks, ctx));
      sec.appendChild(pr); w.appendChild(sec);
    });
    var fin = h('div', { class: 'finish' }), btn;
    function markDone(v) { XF.prog.done(track, item.id, v); done = v; paintFin(); if (v) V.confetti(fin); buildTree(track, item.id); }
    function paintFin() { fin.innerHTML = ''; fin.className = 'finish' + (done ? ' on' : ''); fin.appendChild(h('div', {}, [h('b', {}, [done ? '✅ خلّصت الدرس ده' : 'خلّصت الدرس؟']), h('small', {}, [done ? 'اتسجّل في تقدّمك.' : 'علّم عليه علشان تتابع تقدّمك.'])])); btn = h('button', { type: 'button', class: 'btn' + (done ? ' ghost' : '') , onclick: function () { markDone(!done); } }, [done ? 'إلغاء العلامة' : 'علّم إنه خلص ✓']); fin.appendChild(btn); }
    paintFin(); w.appendChild(fin);
    w.appendChild(pager(track, item.id));
    setPage(w); setTitle(item.title); setCrumbs(['X Code', t.name, item.title]);
    var stopSpy = nav ? spy(secs, nav) : function () { };
    cleanup = function () { stopSpy(); };
    setBottomNav(nb.prev, nb.next, secs.length > 1 ? { icon: ICON.list, label: 'الأقسام', fn: function () { var ol = h('ol', {}, secs.map(function (s) { return h('li', {}, [h('a', { href: '#s-' + s.id, onclick: function (e) { e.preventDefault(); closeSheet(); goSec(s.id); } }, [h('i', {}, [s.icon]), s.title])]); })); openSheet('أقسام الدرس', ol); } } : null);
    buildTree(track, item.id);
  }

  /* ───── quiz item ───── */
  function renderQuizItem(item) {
    var track = item.track, t = XF.trk[track], w = h('div', {}), nb = XF.neighbors(track, item.id);
    w.appendChild(crumbsEl([{ t: 'الكورسات', href: '#/' }, { t: t.name, href: XF.href(track) }, { t: item.title }]));
    w.appendChild(h('header', { class: 'dh' }, [h('div', { class: 'dh-top' }, [h('span', { class: 'tagchip' }, ['🏆']), h('h1', {}, [item.title])]), h('div', { class: 'badges' }, [pill(item.items.length + ' سؤال'), pill('النجاح من 70%')]), item.summary ? h('p', { class: 'summary' }, [item.summary]) : null]));
    w.appendChild(h('section', { class: 'sec' }, [h('div', { class: 'pr' }, [V.quiz(item.items, { track: track, id: item.id }, { id: item.id, onDone: function (sc, tot, ok) { if (ok) { XF.prog.done(track, item.id); buildTree(track, item.id); } } })])]));
    w.appendChild(pager(track, item.id));
    setPage(w); setTitle(item.title); setCrumbs(['X Code', t.name, item.title]); setBottomNav(nb.prev, nb.next, null); buildTree(track, item.id);
  }

  /* ───── project overview ───── */
  function renderProject(item) {
    var track = item.track, t = XF.trk[track], w = h('div', {}), nb = XF.neighbors(track, item.id), model = XF.projModel(item), n = model.n, st = XF.prog.step(track, item.id);
    w.appendChild(crumbsEl([{ t: 'الكورسات', href: '#/' }, { t: t.name, href: XF.href(track) }, { t: item.title }]));
    var go = Math.max(1, Math.min(n, st + 1));
    w.appendChild(h('header', { class: 'dh' }, [
      h('div', { class: 'dh-top' }, [h('span', { class: 'tagchip' }, ['🛠️']), h('h1', {}, [item.title])]),
      h('div', { class: 'badges' }, [pill(n + ' خطوة'), item.time ? pill('⏱ ' + XF.fmtTime(item.time)) : null, item.level ? pill(item.level, LEVEL[item.level] === 'good' ? 'st-stable' : '') : null].concat((item.tags || []).map(function (x) { return pill(x, 'mono'); }))),
      item.summary ? h('p', { class: 'summary', html: PXD.inline(item.summary, { noLink: true }) }) : null,
      h('div', { class: 'tprog' }, [prog(Math.round(st / n * 100)), h('span', {}, [st + ' من ' + n + ' خطوة']), h('a', { class: 'btn', href: XF.href(track, item.id, go) }, [st >= n ? 'راجع المشروع ←' : st ? 'كمّل من الخطوة ' + go + ' ←' : 'ابدأ المشروع ←'])])
    ]));
    /* what you'll build: live preview of the finished project */
    var fin = model.at(n), frame = h('iframe', { class: 'ws-frame pv-final', title: 'شكل المشروع في الآخر', loading: 'lazy' });
    var entry = model.names.filter(function (f) { return /^index\.html?$/.test(f); })[0] || model.names[0];
    var pv = XF.Preview(frame, { ls: {}, runtime: item.runtime });
    w.appendChild(h('section', { class: 'sec' }, [h('h2', {}, [h('span', { class: 'hi' }, ['🎯']), h('span', {}, ['هتبني إيه؟'])]), h('div', { class: 'pr' })]));
    var secBuild = w.lastChild, prEl = $('.pr', secBuild);
    prEl.appendChild(item.about ? V.blocks(item.about, { track: track, id: item.id }) : V.blocks([{ t: 'p', x: item.summary || '' }], {}));
    prEl.appendChild(h('div', { class: 'ex' }, [h('div', { class: 'ex-bar' }, [h('span', { class: 'el' }, ['الشكل النهائي (شغّال)'])]), h('div', { class: 'ex-out' }, [frame])]));
    setTimeout(function () { try { pv.load(fin, entry); } catch (e) { } }, 0);
    if (item.skills && item.skills.length) w.appendChild(h('section', { class: 'sec' }, [h('h2', {}, [h('span', { class: 'hi' }, ['🧠']), h('span', {}, ['هتتدرّب على'])]), h('div', { class: 'pr' }, [h('ul', { class: 'tick two' }, item.skills.map(function (s) { return h('li', { html: PXD.inline(s, { noLink: true }) }); }))])]));
    w.appendChild(h('section', { class: 'sec' }, [h('h2', {}, [h('span', { class: 'hi' }, ['🪜']), h('span', {}, ['خطوات المشروع'])]),
      h('ol', { class: 'items steps' }, (item.steps || []).map(function (s, i) { var done = i < st; return h('li', {}, [h('a', { class: 'itm ' + (done ? 'done' : i === st ? 'part' : ''), href: XF.href(track, item.id, i + 1) }, [h('span', { class: 'ist', html: done ? ICON.check : '' }, done ? null : [String(i + 1)]), h('span', { class: 'itx' }, [h('b', {}, [s.title])])])]); }))]));
    w.appendChild(pager(track, item.id));
    setPage(w); setTitle(item.title); setCrumbs(['X Code', t.name, item.title]); setBottomNav(nb.prev, nb.next, null); buildTree(track, item.id);
    cleanup = function () { pv.destroy(); };
  }

  /* ───── project step (IDE) ───── */
  function stepSheet(track, item, k) {
    var st = XF.prog.step(track, item.id);
    var ol = h('ol', {}, item.steps.map(function (s, i) { return h('li', {}, [h('a', { href: XF.href(track, item.id, i + 1), class: i + 1 === k ? 'on' : '', onclick: function () { closeSheet(); } }, [h('i', {}, [i < st ? '✓' : String(i + 1)]), s.title])]); }));
    openSheet('خطوات المشروع', ol);
    var on = $('a.on', sheetBody); if (on) setTimeout(function () { on.scrollIntoView({ block: 'center' }); }, 60);
  }
  function renderStep(item, k) {
    var track = item.track, t = XF.trk[track], model = XF.projModel(item), n = model.n;
    k = Math.max(1, Math.min(n, k));
    var step = item.steps[k - 1], start = model.at(k - 1), sol = model.at(k), names = model.names;
    var visible = names.filter(function (f) { return sol[f].trim() !== '' || start[f].trim() !== ''; }); if (!visible.length) visible = names;
    var changed = visible.filter(function (f) { return start[f] !== sol[f]; });
    var editable = step.edit || (changed.length ? changed : visible);
    var saved = XF.prog.code(track, item.id, k), files = {};
    visible.forEach(function (f) { files[f] = saved && saved[f] != null ? saved[f] : start[f]; });
    var passedBefore = XF.prog.step(track, item.id) >= k;
    var ide = h('div', { class: 'ide', 'data-pane': 'ins' });
    var entry = visible.filter(function (f) { return /^index\.html?$/.test(f); })[0] || visible[0];
    var W = XF.Workspace({
      runtime: item.runtime, files: files, order: visible, editable: editable, entry: entry, tests: step.tests || [], solution: (function () { var o = {}; visible.forEach(function (f) { o[f] = sol[f]; }); return o; })(), starter: (function () { var o = {}; visible.forEach(function (f) { o[f] = start[f]; }); return o; })(),
      ls: XF.prog.ls(track, item.id), onStore: function (v) { XF.prog.saveLs(track, item.id, v); },
      focus: editable[0],
      onChange: function (fl) { XF.prog.saveCode(track, item.id, k, fl); },
      onPass: function () { onPass(); }
    });
    W.hintFn = function (cur) {
      var box = h('div', {});
      if (step.hint) box.appendChild(h('p', { html: PXD.inline(step.hint, { noLink: true }) }));
      var any = false;
      editable.forEach(function (f) {
        XF.diffAdded(start[f], sol[f]).forEach(function (hk) {
          any = true;
          box.appendChild(h('p', { class: 'hint-w' }, [hk.after ? h('span', {}, ['في ', h('code', {}, [f]), ' بعد السطر:']) : h('span', {}, ['في أول ', h('code', {}, [f]), ':']), hk.after ? h('code', { class: 'hint-after' }, [hk.after.trim().slice(0, 80) || '(سطر فاضي)']) : null]));
          box.appendChild(PXD.codeBlock(hk.lines.join('\n').replace(/^\n+|\n+$/g, ''), f.split('.').pop() === 'js' ? 'js' : f.split('.').pop() === 'css' ? 'css' : f.split('.').pop() === 'html' ? 'html' : 'text'));
        });
      });
      if (!any && !step.hint) box.appendChild(h('p', {}, ['الخطوة دي بتعدّل في كود موجود — اقرا التعليمات بتقولك تغيّر إيه.']));
      return box;
    };
    /* instruction column */
    var done = passedBefore;
    var insBody = h('div', { class: 'pr ide-x' });
    var ctx = { track: track, id: item.id, n: 0, runtime: item.runtime };
    insBody.appendChild(V.blocks(step.x || [], ctx));
    var nextBtn = h('a', { class: 'btn ide-next', href: k < n ? XF.href(track, item.id, k + 1) : XF.href(track, item.id) , hidden: !done }, [k < n ? 'الخطوة التالية ←' : 'خلّصت المشروع 🎉']);
    var doneBox = h('div', { class: 'ide-done', hidden: true });
    var ins = h('section', { class: 'ide-ins', 'aria-label': 'التعليمات' }, [
      h('div', { class: 'ide-k' }, [h('span', { class: 'kn' }, ['خطوة ' + k]), h('span', { class: 'kt' }, ['من ' + n])]),
      h('h2', {}, [step.title]), insBody, h('h3', { class: 'ide-th' }, ['✅ اختبارات الخطوة']), W.testsEl, nextBtn, doneBox
    ]);
    function onPass() {
      var wasDone = XF.prog.step(track, item.id) >= k;
      XF.prog.setStep(track, item.id, k); nextBtn.hidden = false; done = true; paintBar();
      if (!wasDone) { V.confetti(ins); }
      if (k >= n) {
        doneBox.hidden = false; doneBox.innerHTML = '';
        var all = h('button', { type: 'button', class: 'btn ghost', onclick: function () { var txt = names.map(function (f) { return '/* ===== ' + f + ' ===== */\n' + sol[f]; }).join('\n\n'); try { navigator.clipboard.writeText(txt); PXD.toast('اتنسخ كل كود المشروع ✓'); } catch (e) { PXD.toast('مقدرتش أنسخ'); } } }, ['📋 انسخ كود المشروع كله']);
        var nx = XF.neighbors(track, item.id).next;
        doneBox.appendChild(h('div', { class: 'xf-pop' }, [h('b', {}, ['🎉 مبروك! خلّصت المشروع كله']), h('p', {}, ['ده شغل حقيقي تقدر تضيفه في الـ Portfolio.']), all, nx ? h('a', { class: 'btn', href: XF.href(track, nx.id) }, ['الدرس اللي بعده ←']) : null]));
      }
      setTimeout(function () { nextBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 200);
      buildTree(track, item.id);
    }
    /* header bar */
    var bar = h('div', { class: 'ide-bar' });
    var barProg = h('div', { class: 'xprog' }, [h('i')]);
    function paintBar() { var st = XF.prog.step(track, item.id); barProg.firstChild.style.width = Math.round(Math.max(st, k - 1) / n * 100) + '%'; }
    var prevA = h('a', { class: 'ib', href: k > 1 ? XF.href(track, item.id, k - 1) : XF.href(track, item.id), 'aria-label': 'الخطوة السابقة', html: ICON.right }), nextA = h('a', { class: 'ib', href: k < n ? XF.href(track, item.id, k + 1) : XF.href(track, item.id), 'aria-label': 'الخطوة التالية', html: ICON.left });
    bar.appendChild(h('a', { class: 'ib', href: XF.href(track, item.id), 'aria-label': 'صفحة المشروع', title: 'صفحة المشروع', html: ICON.book2 }));
    bar.appendChild(h('div', { class: 'ide-t' }, [h('b', {}, [item.title]), h('small', {}, [t.name])]));
    bar.appendChild(barProg);
    bar.appendChild(h('button', { type: 'button', class: 'ide-steps', onclick: function () { stepSheet(track, item, k); } }, [h('span', { html: ICON.steps }), h('span', {}, ['خطوة ' + k + ' / ' + n])]));
    bar.appendChild(prevA); bar.appendChild(nextA);
    paintBar();
    /* panes */
    var codeCol = h('section', { class: 'ide-code', 'aria-label': 'الكود' }, [W.editEl]);
    var prevCol = h('section', { class: 'ide-prev', 'aria-label': 'المعاينة' }, [W.prevEl]);
    var tabs = h('div', { class: 'ide-tabs', role: 'tablist' }, [['ins', 'التعليمات', ICON.book2], ['code', 'الكود', ICON.code], ['prev', 'المعاينة', ICON.eye]].map(function (p) {
      return h('button', { type: 'button', role: 'tab', 'data-p': p[0], class: p[0] === 'ins' ? 'on' : '', onclick: function () { pane(p[0]); } }, [h('span', { html: p[2] }), h('span', {}, [p[1]])]);
    }));
    function pane(p) { ide.setAttribute('data-pane', p); $$('button', tabs).forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-p') === p); }); if (p === 'code') { try { W.show(W.names.filter(function (f) { return editable.indexOf(f) >= 0; })[0] || W.names[0]); } catch (e) { } } }
    /* mobile quick bar */
    var mb = h('div', { class: 'ide-mb' }, [h('button', { type: 'button', class: 'btn', onclick: function () { W.check().then(function (ok) { if (ok) pane('ins'); else $('.ws-tl', ide) && pane('ins'); }); } }, ['▶ اختبر الكود']), h('button', { type: 'button', class: 'btn ghost', onclick: function () { pane('prev'); } }, ['👁 المعاينة'])]);
    ide.appendChild(bar); ide.appendChild(tabs); ide.appendChild(h('div', { class: 'ide-grid' }, [ins, codeCol, prevCol])); ide.appendChild(mb);
    ide.__ws = W; main.innerHTML = ''; main.className = 'main ide-main'; main.appendChild(ide);
    body.classList.add('ide-mode');
    setTitle(item.title + ' — خطوة ' + k); setCrumbs(['X Code', t.name, item.title, 'خطوة ' + k]); setBottomNav(null, null, null); buildTree(track, item.id);
    var onKey = function (e) { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); W.check(); } };
    document.addEventListener('keydown', onKey);
    cleanup = function () { document.removeEventListener('keydown', onKey); W.destroy(); body.classList.remove('ide-mode'); };
    if (passedBefore) W.testsEl.classList.add('was-done');
  }

  /* ═════════ router ═════════ */
  function parse() {
    var p = location.hash.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean).map(decodeURIComponent);
    if (!p.length) return { t: 'home' };
    if (p[0] === 'projects') return { t: 'projects' };
    if (!XF.trk[p[0]]) return { t: '404' };
    if (!p[1]) return { t: 'track', track: p[0] };
    if (p[2]) return { t: 'step', track: p[0], id: p[1], step: +p[2] || 1 };
    return { t: 'item', track: p[0], id: p[1] };
  }
  function render404() { setPage(h('div', { class: 'pending' }, [h('div', { class: 'big' }, ['🧭']), h('h2', {}, ['الصفحة دي مش موجودة']), h('p', {}, [h('a', { class: 'btn', href: '#/' }, ['ارجع للمسارات'])])])); setTitle('مش موجودة'); setBottomNav(null, null, null); buildTree(null); }
  var routeSeq = 0;
  function route() {
    var mine = ++routeSeq;
    if (cleanup) { try { cleanup(); } catch (e) { } cleanup = null; }
    closeUI(); body.classList.remove('ide-mode');
    var r = parse(); window.scrollTo(0, 0);
    body.setAttribute('data-view', r.t);
    var nav = $$('#libtabs a'); nav.forEach(function (a) { var on = (a.getAttribute('data-nav') === 'home' && (r.t === 'home' || r.t === 'track' || r.t === 'item' || r.t === 'step')) || (a.getAttribute('data-nav') === 'projects' && r.t === 'projects'); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    if (r.t === 'home') return renderHome();
    if (r.t === 'projects') return renderProjects();
    if (r.t === 'track') return renderTrack(r.track);
    if (r.t === 'item' || r.t === 'step') {
      var m = XF.meta[r.track][r.id]; if (!m) return render404();
      loading();
      XF.getItem(r.track, r.id).then(function (item) {
        if (mine !== routeSeq) return; if (!item) return render404();
        if (item.type === 'project') { if (r.t === 'step') renderStep(item, r.step); else renderProject(item); }
        else if (item.type === 'quiz') renderQuizItem(item);
        else renderLesson(item);
      }).catch(function () { if (mine === routeSeq) setPage(h('div', { class: 'pending' }, [h('div', { class: 'big' }, ['⚠️']), h('h2', {}, ['مقدرتش أحمّل الدرس']), h('p', {}, ['اتأكد إن الملفات كاملة وجرّب Refresh.'])])); });
      return;
    }
    render404();
  }
  window.addEventListener('hashchange', route);
  window.addEventListener('pxd:prefs', function () { });
  $('#boot') && $('#boot').remove();
  applyPrefs();
  if (!XF.index) { main.innerHTML = '<div class="pending"><h2>مفيش بيانات للمنهج</h2></div>'; return; }
  route();
})();
