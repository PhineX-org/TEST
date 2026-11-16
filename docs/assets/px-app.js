/* PhineX Docs — app: router, sidebar tree, search, mobile UI, reading prefs (multi-library: HTML + CSS) */
(function () {
  'use strict';
  var PXD = window.PXD, h = PXD.h, $ = PXD.$, $$ = PXD.$$, esc = PXD.esc, store = PXD.store, norm = PXD.norm, V = PXD.view, ICONS = PXD.icons;
  if (!PXD.idx.html) { document.body.innerHTML = '<p style="padding:30px;font-family:sans-serif">تعذّر تحميل فهرس التوثيق (data/html/index.js).</p>'; return; }

  /* ═════════ libraries ═════════ */
  var META = {
    html: { id: 'html', short: 'HTML', name: 'مرجع HTML', logo: 'H', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/' },
    css: { id: 'css', short: 'CSS', name: 'مرجع CSS', logo: 'C', mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/' }
  };
  var libs = ['html', 'css'].filter(function (l) { return !!PXD.idx[l]; });
  var LIB = 'html', idx, BY, ORDER, MDN;
  function useLib(l) { LIB = l; idx = PXD.idx[l]; BY = PXD.byId[l]; ORDER = PXD.order[l]; MDN = META[l].mdn; }
  useLib('html');
  var mqDesk = window.matchMedia('(min-width:1000px)');
  var canHover = window.matchMedia('(hover:hover)');
  var main = $('#main'), tree = $('#tree'), sres = $('#sres'), body = document.body, layout = $('#layout');
  var cur = { t: null, id: null, lib: 'html' }, tok = 0, keepDrawer = false;

  /* precompute normalized fields (all libraries) */
  libs.forEach(function (l) {
    PXD.order[l].forEach(function (id) {
      var it = PXD.byId[l][id];
      it._t = norm(it.title); it._tag = (it.tag || '').toLowerCase();
      it._key = '';
      if (l === 'html' && (it.kind === 'attribute' || it.kind === 'inputtype')) it._key = it.id.replace(/^(attr|input)-/, '');
      else if (l === 'css' && it.kind !== 'guide' && it.chip) it._key = it.chip.toLowerCase().replace(/^[:@]+/, '').replace(/\(\)$/, '').replace(/[<>]/g, '');
    });
  });
  function itemKey(it) { return it.lib + ':' + it.id; }
  function itemByKey(k) {
    var m = /^(html|css):(.+)$/.exec(String(k)); if (m) return PXD.info(m[2], m[1]);
    return PXD.info(String(k), 'html');
  }

  /* ═════════ prefs ═════════ */
  var THEMES = [
    ['dusk', 'داكن دافئ', '#1d1916', '#e8dccb', '#e3a35f'],
    ['paper', 'ورقي فاتح', '#f1e9d9', '#2f261c', '#a8501b'],
    ['sepia', 'سيبيا', '#e6d6b4', '#3a2c18', '#8a4a1e']
  ];
  var FS_MIN = 12, FS_MAX = 28, FS_DEF = 16;
  function validTheme(t) { return t === 'dark' ? 'dusk' : t === 'light' ? 'paper' : (t === 'dusk' || t === 'paper' || t === 'sepia') ? t : 'dusk'; }
  var prefs = { theme: validTheme(store.get('theme', 'dusk')), fs: +store.get('fs', FS_DEF) || FS_DEF, lh: +store.get('lh', 1.95) || 1.95, side: store.get('side', 'left') };
  prefs.fs = Math.min(FS_MAX, Math.max(FS_MIN, Math.round(prefs.fs)));
  var SV = function (p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>'; };
  var ICON = {
    sun: SV('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: SV('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'),
    cup: SV('<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3"/>'),
    list: SV('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'),
    search: SV('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
    chev: SV('<path d="m9 6 6 6-6 6"/>'),
    star: SV('<path d="m12 2.8 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6 6.2 20.7l1.1-6.5L2.6 9.6l6.5-.9Z"/>')
  };
  var THEME_ICON = { dusk: ICON.moon, paper: ICON.sun, sepia: ICON.cup };
  var fsDec = $('#fs-dec'), fsInc = $('#fs-inc'), fsVal = $('#fs-val');
  function applyPrefs() {
    var r = document.documentElement;
    r.setAttribute('data-theme', prefs.theme);
    r.style.setProperty('--fs', prefs.fs + 'px');
    r.style.setProperty('--lh', String(prefs.lh));
    layout.classList.toggle('side-right', prefs.side === 'right');
    var th = THEMES.filter(function (t) { return t[0] === prefs.theme; })[0] || THEMES[0];
    var m = $('meta[name=theme-color]'); if (m) m.setAttribute('content', th[2]);
    var bt = $('#btn-theme'); if (bt) { bt.innerHTML = THEME_ICON[prefs.theme]; bt.setAttribute('aria-label', 'المظهر: ' + th[1] + ' — اضغط للتغيير'); bt.setAttribute('title', 'المظهر: ' + th[1]); }
    fsVal.textContent = prefs.fs; fsDec.disabled = prefs.fs <= FS_MIN; fsInc.disabled = prefs.fs >= FS_MAX;
    window.dispatchEvent(new Event('pxd:prefs'));
  }
  function setPref(k, v) { prefs[k] = v; store.set(k, v); applyPrefs(); }
  function setFs(v) { v = Math.min(FS_MAX, Math.max(FS_MIN, Math.round(v))); if (v !== prefs.fs) setPref('fs', v); }
  function nextTheme() { var i = 0; THEMES.forEach(function (t, k) { if (t[0] === prefs.theme) i = k; }); setPref('theme', THEMES[(i + 1) % THEMES.length][0]); PXD.toast('المظهر: ' + THEMES[(i + 1) % THEMES.length][1]); }

  /* ═════════ favorites / recents (keys are "lib:id"; legacy plain ids = html) ═════════ */
  function favs() { return store.get('fav', []).map(function (k) { return /^(html|css):/.test(k) ? k : 'html:' + k; }); }
  function isFav(it) { return favs().indexOf(itemKey(it)) >= 0; }
  function toggleFav(it) {
    var f = favs(), k = itemKey(it), i = f.indexOf(k);
    if (i >= 0) f.splice(i, 1); else f.unshift(k);
    store.set('fav', f); renderFavs();
    PXD.toast(i >= 0 ? 'اتشالت من المفضلة' : 'اتضافت للمفضلة ⭐');
    return i < 0;
  }
  function recents() { return store.get('recent', []).map(function (k) { return /^(html|css):/.test(k) ? k : 'html:' + k; }).map(itemByKey).filter(Boolean); }
  function pushRecent(it) {
    var k = itemKey(it), r = store.get('recent', []).map(function (x) { return /^(html|css):/.test(x) ? x : 'html:' + x; }).filter(function (x) { return x !== k; }); r.unshift(k); store.set('recent', r.slice(0, 12));
  }

  /* ═════════ sidebar tree ═════════ */
  var openAll = store.get('open2', null);
  if (!openAll || typeof openAll !== 'object' || Array.isArray(openAll)) openAll = { html: ['start'], css: ['start'] };
  function openList() { if (!openAll[LIB]) openAll[LIB] = ['start']; return openAll[LIB]; }
  function saveOpen() { store.set('open2', openAll); }
  var sbLibs = $('#sb-libs'), libtabs = $('#libtabs'), treeLib = null;
  function labelOf(it) { return it.kind === 'guide' ? null : PXD.label(it); }
  function dotClass(it) { return it.pending ? '' : it.status === 'obsolete' ? 'obs' : it.status === 'deprecated' ? 'dep' : it.status === 'experimental' ? 'exp' : 'done'; }
  function cleanTitle(t) { return t.replace(/\s*\([A-Za-z0-9 .\-]+\)\s*$/, ''); }
  function itemLink(it) {
    var cls = [];
    if (it.kind === 'guide') cls.push('guide');
    if (it.status === 'deprecated' || it.status === 'obsolete') cls.push('dep');
    if (it.pending) cls.push('pend');
    var kids = [h('i', { class: 'dot ' + dotClass(it) })];
    if (it.kind !== 'guide') kids.push(h('span', { class: 'tg' }, [labelOf(it)]));
    if (!it.pending || it.kind === 'guide') kids.push(h('span', { class: 'ti' }, [it.kind === 'guide' ? it.title : cleanTitle(it.title)]));
    return h('a', { href: PXD.hrefOf(it), 'data-id': it.id, 'data-lib': it.lib, class: cls.join(' ') }, kids);
  }
  function setCat(catEl, open) {
    catEl.classList.toggle('open', open);
    catEl.querySelector('.tr-head').setAttribute('aria-expanded', open);
    var id = catEl.getAttribute('data-cat'), L = openList(), i = L.indexOf(id);
    if (open && i < 0) L.push(id); else if (!open && i >= 0) L.splice(i, 1);
    saveOpen();
  }
  var favHost = h('div', { class: 'tr-fav', hidden: true });
  var catsHost = h('div', { class: 'tr-cats' });
  function renderLibTabs() {
    sbLibs.innerHTML = '';
    libs.forEach(function (l) {
      var b = h('button', { type: 'button', role: 'tab', 'aria-selected': String(l === LIB) }, [h('span', { class: 'lg ' + l }, [META[l].logo]), h('span', {}, [META[l].short]), h('span', { class: 'n' }, [String(PXD.order[l].length)])]);
      b.onclick = function () { if (l === LIB) return; keepDrawer = body.classList.contains('drawer'); location.hash = '#/' + l; };
      sbLibs.appendChild(b);
    });
    $$('a', libtabs).forEach(function (a) {
      var l = a.getAttribute('data-lib');
      a.hidden = libs.indexOf(l) < 0;
      if (l === LIB && cur.t !== 'home') a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  function buildTree() {
    treeLib = LIB; tree.innerHTML = '';
    var ctl = h('div', { class: 'tr-label', style: 'display:flex;gap:10px;align-items:center' }, [
      h('span', {}, ['التصنيفات']),
      h('button', { type: 'button', class: 'mini', onclick: function () { $$('.tr-cat', catsHost).forEach(function (c) { setCat(c, true); }); } }, ['فتح الكل']),
      h('button', { type: 'button', class: 'mini', onclick: function () { $$('.tr-cat', catsHost).forEach(function (c) { setCat(c, false); }); } }, ['طيّ الكل'])
    ]);
    tree.appendChild(favHost);
    tree.appendChild(h('div', { class: 'tr-title' }, [h('span', { class: 'lg ' + LIB, style: 'width:24px;height:24px;border-radius:7px;display:grid;place-items:center;font:800 .6rem JetBrains Mono,monospace;color:#fff6e8' }, [META[LIB].logo]), h('span', {}, [META[LIB].name]), h('small', {}, [String(ORDER.length)])]));
    tree.appendChild(ctl);
    catsHost.innerHTML = '';
    var L = openList();
    idx.cats.forEach(function (c) {
      var open = L.indexOf(c.id) >= 0;
      var written = c.items.filter(function (i) { return !i.pending; }).length;
      var head = h('button', { class: 'tr-head', type: 'button', 'aria-expanded': open }, [
        h('span', { class: 'chev', html: ICON.chev }), h('span', { class: 'ic', 'aria-hidden': 'true' }, [c.icon]), h('span', { class: 'nm' }, [c.name]),
        h('span', { class: 'n', title: written + ' جاهز من ' + c.items.length }, [c.items.length + ''])
      ]);
      var ul = h('ul', { class: 'tr-list' }, c.items.map(function (it) { return h('li', {}, [itemLink(it)]); }));
      var el = h('div', { class: 'tr-cat' + (open ? ' open' : ''), 'data-cat': c.id }, [head, ul]);
      head.onclick = function () { setCat(el, !el.classList.contains('open')); };
      catsHost.appendChild(el);
    });
    tree.appendChild(catsHost);
    renderLibTabs();
    renderFavs();
  }
  function renderFavs() {
    var f = favs().map(itemByKey).filter(Boolean);
    favHost.innerHTML = '';
    favHost.hidden = !f.length;
    if (!f.length) return;
    favHost.appendChild(h('div', { class: 'tr-label' }, ['⭐ المفضلة']));
    favHost.appendChild(h('ul', { class: 'tr-list', style: 'display:block' }, f.map(function (it) { return h('li', {}, [itemLink(it)]); })));
    markActiveLinks();
  }
  function markActiveLinks() {
    $$('a[aria-current]', tree).forEach(function (a) { a.removeAttribute('aria-current'); });
    if (cur.t !== 'entry') return;
    $$('a[data-id="' + cur.id + '"][data-lib="' + cur.lib + '"]', tree).forEach(function (a) { a.setAttribute('aria-current', 'page'); });
  }
  function revealActive(center) {
    markActiveLinks();
    if (cur.t === 'entry' && cur.lib === LIB) {
      var it = BY[cur.id];
      if (it) { var ce = $('.tr-cat[data-cat="' + it.cat + '"]', catsHost); if (ce && !ce.classList.contains('open')) setCat(ce, true); }
    }
    var a = $('.tr-cat a[aria-current]', tree);
    if (a && tree.offsetParent !== null && !tree.hidden) {
      var top = a.offsetTop, h2 = a.offsetHeight;
      if (center || top < tree.scrollTop + 40 || top + h2 > tree.scrollTop + tree.clientHeight - 80) tree.scrollTop = Math.max(0, top - tree.clientHeight / 2 + h2 / 2);
    }
  }

  /* ═════════ search (across both libraries) ═════════ */
  function search(raw) {
    raw = String(raw);
    var pm = /^\s*([:@]+)/.exec(raw), pfx = pm ? pm[1] : '';
    var q = norm(raw.replace(/[<>\/()]/g, ' ').replace(/^\s*[:@]+/, '')).replace(/\s+/g, ' ').trim();
    if (!q) return null;
    var toks = q.split(' '), out = [], n = 0;
    libs.forEach(function (l) {
      PXD.order[l].forEach(function (id) {
        var it = PXD.byId[l][id], hay = it.q, all = hay + ' ' + (it.qs || ''), sc = 0, tag = it._tag; n++;
        if (q.length < 2) { if (!(tag && tag.indexOf(q) === 0)) return; sc = tag === q ? 1000 : 700; }
        else {
          for (var k = 0; k < toks.length; k++) if (all.indexOf(toks[k]) < 0) return;
          if (tag === q || it.id === q) sc = 1000;
          else if (it._key && it._key === q) sc = 950;
          else if (tag && tag.indexOf(q) === 0) sc = 800 - tag.length;
          else if (it._key && it._key.indexOf(q) === 0) sc = 760 - it._key.length * 0.1;
          else if (it.id.indexOf(q) === 0) sc = 700;
          else if (tag && tag.indexOf(q) >= 0) sc = 600;
          else if (it._t.indexOf(q) >= 0) sc = 450;
          else if (hay.indexOf(q) >= 0) sc = 350;
          else if (toks.every(function (t) { return hay.indexOf(t) >= 0; })) sc = 250;
          else sc = 100;
        }
        if (it.pending) sc -= 5;
        if (pfx && it.chip && it.chip.indexOf(pfx) === 0) sc += 70;
        if (l === LIB) sc += 25;
        if (it.kind === 'guide') sc -= 8;
        out.push([sc - n * 0.0005, it]);
      });
    });
    out.sort(function (a, b) { return b[0] - a[0]; });
    return { q: q, toks: toks, list: out.slice(0, 80).map(function (r) { return r[1]; }) };
  }
  function hl(text, toks) {
    var n = norm(text);
    if (n.length !== text.length) return esc(text);
    var marks = [];
    toks.forEach(function (t) { if (!t) return; var p = 0, i; while ((i = n.indexOf(t, p)) >= 0) { marks.push([i, i + t.length]); p = i + t.length; } });
    if (!marks.length) return esc(text);
    marks.sort(function (a, b) { return a[0] - b[0]; });
    var merged = [marks[0]];
    for (var i = 1; i < marks.length; i++) { var l = merged[merged.length - 1]; if (marks[i][0] <= l[1]) l[1] = Math.max(l[1], marks[i][1]); else merged.push(marks[i]); }
    var out = '', pos = 0;
    merged.forEach(function (m) { out += esc(text.slice(pos, m[0])) + '<mark>' + esc(text.slice(m[0], m[1])) + '</mark>'; pos = m[1]; });
    return out + esc(text.slice(pos));
  }
  function renderResults(res, host) {
    host.innerHTML = '';
    if (!res.list.length) {
      host.appendChild(h('div', { class: 'empty' }, [h('b', {}, ['مفيش نتيجة']), 'جرّب الاسم بالإنجليزي (مثلاً img أو flex أو :hover) أو كلمة عربي (مثلاً صورة، جدول، ظل، مسافة).']));
      return;
    }
    var ul = h('ul', { class: 'res', role: 'listbox' });
    res.list.forEach(function (it, i) {
      var isG = it.kind === 'guide';
      var tg = isG ? h('span', { class: 'tg g' }, ['دليل']) : h('span', { class: 'tg', html: hl(labelOf(it), res.toks) });
      var t1 = h('span', { class: 't1', html: it.pending && !isG ? esc('صفحته لسه بتتجهز') : hl(it.title, res.toks) });
      if (libs.length > 1) t1.appendChild(h('span', { class: 'lib ' + it.lib }, [META[it.lib].short]));
      var tx = h('span', { class: 'tx' }, [t1]);
      if (it.summary) tx.appendChild(h('span', { class: 't2', style: 'display:-webkit-box' }, [it.summary]));
      tx.appendChild(h('span', { class: 'cat', style: 'display:block' }, [it.catIcon + ' ' + it.catName + (it.pending ? ' · قريباً' : '')]));
      ul.appendChild(h('li', { role: 'option' }, [h('a', { href: PXD.hrefOf(it), class: i === 0 ? 'sel' : '' }, [tg, tx])]));
    });
    host.appendChild(ul);
  }
  function moveSel(host, d) {
    var as = $$('.res a', host); if (!as.length) return;
    var i = as.findIndex(function (a) { return a.classList.contains('sel'); });
    if (i >= 0) as[i].classList.remove('sel');
    i = (i + d + as.length) % as.length; as[i].classList.add('sel');
    var sc = host.closest('.tree,.sov-body') || host;
    var r = as[i].getBoundingClientRect(), pr = sc.getBoundingClientRect();
    if (r.top < pr.top + 8) sc.scrollTop -= pr.top + 8 - r.top; else if (r.bottom > pr.bottom - 8) sc.scrollTop += r.bottom - pr.bottom + 8;
  }
  function wireSearch(input, host, onChange, closeOnPick) {
    var box = input.closest('.sbox');
    function run() {
      var v = input.value; box.classList.toggle('has', !!v);
      var res = search(v);
      onChange(res, v);
      if (res) renderResults(res, host);
    }
    input.addEventListener('input', run);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveSel(host, 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveSel(host, -1); }
      else if (e.key === 'Enter') { var a = $('.res a.sel', host) || $('.res a', host); if (a) { e.preventDefault(); location.hash = a.getAttribute('href'); if (!closeOnPick) input.blur(); } }
      else if (e.key === 'Escape') { if (input.value) { input.value = ''; run(); } else { input.blur(); closeSearch(); } }
    });
    var clr = $('.clr', box); if (clr) clr.onclick = function () { input.value = ''; run(); input.focus(); };
    return run;
  }
  var qTop = $('#q-top'), qOv = $('#q-ov'), ovRes = $('#ovres');
  wireSearch(qTop, sres, function (res) { sres.hidden = !res; tree.hidden = !!res; }, false);
  wireSearch(qOv, ovRes, function (res) { if (!res) ovHome(); }, true);
  var POPULAR = {
    html: ['div', 'a', 'img', 'p', 'span', 'button', 'input', 'form', 'label', 'table', 'ul', 'li', 'h1', 'section', 'header', 'nav', 'footer', 'select', 'textarea', 'video', 'iframe', 'script', 'link', 'meta'],
    css: ['display', 'margin', 'padding', 'color', 'background', 'border', 'width', 'font-size', 'flex', 'grid', 'position', 'box-sizing', 'hover', 'media', 'transition', 'animation', 'var', 'calc', 'border-radius', 'box-shadow', 'z-index', 'overflow', 'gap', 'opacity']
  };
  function popularItems(l) { return (POPULAR[l] || []).map(function (id) { return PXD.info(id, l); }).filter(Boolean); }
  function chipList(items) {
    return h('div', { class: 'chips' }, items.filter(Boolean).map(function (it) {
      return h('a', { class: 'chip' + (it.kind === 'guide' ? '' : ' tag'), href: PXD.hrefOf(it), style: it.pending ? 'opacity:.6' : '' }, [it.kind === 'guide' ? it.title : labelOf(it)]);
    }));
  }
  function ovHome() {
    ovRes.innerHTML = '';
    var wrap = h('div', { class: 'sov-hint' }, [h('b', {}, ['ابحث بالاسم أو بالمعنى'])]);
    wrap.appendChild(h('p', { style: 'margin:4px 0 0' }, ['اكتب اسم العنصر أو الخاصية (مثلاً ', h('code', {}, ['img']), ' أو ', h('code', {}, ['flex']), ' أو ', h('code', {}, [':hover']), ') أو وصفه بالعربي (مثلاً «ظل»، «جدول»، «مسافة»).']));
    var rec = recents().slice(0, 8);
    if (rec.length) { wrap.appendChild(h('h4', { style: 'margin:16px 0 0;font-size:.85rem' }, ['شفتها قريب'])); wrap.appendChild(chipList(rec)); }
    libs.forEach(function (l) { wrap.appendChild(h('h4', { style: 'margin:16px 0 0;font-size:.85rem' }, ['الأكتر استخداماً في ' + META[l].short])); wrap.appendChild(chipList(popularItems(l))); });
    ovRes.appendChild(wrap);
  }
  function openSearch() {
    closeDrawer(); closeSheet();
    if (mqDesk.matches) { qTop.focus(); qTop.select(); return; }
    body.classList.add('search-open');
    if (!qOv.value) ovHome();
    setTimeout(function () { qOv.focus(); }, 30);
  }
  function closeSearch() { body.classList.remove('search-open'); }

  /* ═════════ drawer / sheet ═════════ */
  function openDrawer() { closeSheet(); closeSearch(); body.classList.add('drawer'); revealActive(true); }
  function closeDrawer() { body.classList.remove('drawer'); }
  var sheet = $('#sheet'), sheetBody = $('#sheet-body'), sheetTitle = $('#sheet-title');
  function openSheet(title, node) {
    closeDrawer(); closeSearch();
    sheetTitle.textContent = title; sheetBody.innerHTML = ''; sheetBody.appendChild(node);
    body.classList.add('sheet-open');
  }
  function closeSheet() { body.classList.remove('sheet-open'); }
  function closeUI() { closeDrawer(); closeSearch(); closeSheet(); }
  $('#scrim').addEventListener('click', closeUI);
  $('#sb-close').addEventListener('click', closeDrawer);
  $('#sheet-x').addEventListener('click', closeSheet);
  $('#sb-search').addEventListener('focus', function () { this.blur(); openSearch(); });
  $('#sb-search').addEventListener('click', openSearch);
  $('#ov-close').addEventListener('click', function () { closeSearch(); });

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
    /* theme cards */
    var themeBtns = THEMES.map(function (t) {
      var b = h('button', { type: 'button', class: t[0] === prefs.theme ? 'on' : '', 'aria-pressed': String(t[0] === prefs.theme), 'data-t': t[0] }, [
        h('span', { class: 'sw', style: 'background:' + t[2] + ';color:' + t[3] }, ['نص تجريبي', h('i', { style: 'background:' + t[4] }), h('i', { style: 'background:' + t[3] })]),
        h('span', {}, [t[1]])
      ]);
      b.onclick = function () { setPref('theme', t[0]); };
      return b;
    });
    var themes = h('div', { class: 'themes' }, themeBtns);
    /* font size */
    var range = h('input', { type: 'range', min: FS_MIN, max: FS_MAX, step: 1, value: prefs.fs, 'aria-label': 'حجم الخط' });
    var dec = h('button', { type: 'button', class: 'stp', 'aria-label': 'صغّر الخط' }, ['A−']), inc = h('button', { type: 'button', class: 'stp', 'aria-label': 'كبّر الخط' }, ['A+']);
    dec.onclick = function () { setFs(prefs.fs - 1); }; inc.onclick = function () { setFs(prefs.fs + 1); };
    range.addEventListener('input', function () { setFs(+range.value); });
    var fsLbl = h('small', {}, [prefs.fs + 'px']);
    var prev = h('div', { class: 'fs-prev' }, ['ده مثال على حجم الخط اللي هتقرا بيه الشرح. ظبّطه لحد ما عينك ترتاح: ', h('code', {}, ['font-size']), ' بيتحكم في حجم الكلام كله.']);
    var lhSeg = seg([[1.7, 'ضيّق'], [1.95, 'عادي'], [2.2, 'مريح']], prefs.lh, function (v) { setPref('lh', +v); }, true);
    var box = h('div', {}, [
      h('div', { class: 'set-row col' }, [h('div', { class: 'lbl' }, [h('span', {}, ['المظهر (ألوان مريحة للعين)'])]), themes]),
      h('div', { class: 'set-row col' }, [
        h('div', { class: 'lbl' }, [h('span', {}, ['حجم الخط']), fsLbl]),
        h('div', { class: 'fs-ctl' }, [dec, range, inc]),
        prev,
        h('button', { class: 'btn ghost', type: 'button', style: 'align-self:flex-start', onclick: function () { setFs(FS_DEF); } }, ['رجّعه للحجم العادي (' + FS_DEF + ')'])
      ]),
      h('div', { class: 'set-row col' }, [h('div', { class: 'lbl' }, [h('span', {}, ['تباعد الأسطر'])]), lhSeg]),
      h('div', { class: 'set-row' }, [h('span', {}, ['مكان القائمة الجانبية']), seg([['left', 'شمال'], ['right', 'يمين']], prefs.side, function (v) { setPref('side', v); })]),
      h('div', { class: 'set-row', style: 'flex-wrap:wrap' }, [
        h('a', { class: 'btn ghost', href: '../index.html' }, ['← رجوع للموقع']),
        h('button', { class: 'btn ghost', type: 'button', onclick: function () {
          if (!confirm('تمسح المفضلة ونتايج الاختبارات وآخر صفحة؟')) return;
          ['fav', 'recent', 'last', 'open', 'open2'].forEach(function (k) { try { localStorage.removeItem('pxd:' + k); } catch (e) { } });
          Object.keys(localStorage).forEach(function (k) { if (k.indexOf('pxd:quiz:') === 0) localStorage.removeItem(k); });
          openAll = { html: ['start'], css: ['start'] }; buildTree(); revealActive(); PXD.toast('اتمسح ✓');
        } }, ['مسح بياناتي'])
      ])
    ]);
    if (mqDesk.matches) box.appendChild(h('p', { class: 'muted', style: 'padding:0 18px 14px;margin:0;font-size:.8rem;color:var(--muted)' }, ['اختصارات: ', h('kbd', {}, ['/']), ' أو ', h('kbd', {}, ['Ctrl+K']), ' للبحث · ', h('kbd', {}, ['Esc']), ' للإغلاق']));
    settingsSync = function () {
      range.value = prefs.fs; fsLbl.textContent = prefs.fs + 'px'; dec.disabled = prefs.fs <= FS_MIN; inc.disabled = prefs.fs >= FS_MAX;
      themeBtns.forEach(function (b) { var on = b.getAttribute('data-t') === prefs.theme; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
    };
    settingsSync();
    openSheet('الإعدادات', box);
  }
  function openSaved() {
    var box = h('div', { style: 'padding:0 14px 16px;overflow-y:auto' });
    var f = favs().map(itemByKey).filter(Boolean), r = recents();
    box.appendChild(h('h4', { style: 'margin:6px 4px' }, ['⭐ المفضلة']));
    box.appendChild(f.length ? chipList(f) : h('p', { style: 'color:var(--muted);margin:4px;font-size:.9rem' }, ['لسه مفيش. اضغط على النجمة ⭐ في أي صفحة.']));
    box.appendChild(h('h4', { style: 'margin:16px 4px 6px' }, ['🕘 شفتها قريب']));
    box.appendChild(r.length ? chipList(r) : h('p', { style: 'color:var(--muted);margin:4px;font-size:.9rem' }, ['ابدأ تصفّح وهتظهر هنا.']));
    openSheet('محفوظاتك', box);
  }
  function openToc() {
    var navs = currentNav; if (!navs || !navs.length) return openSaved();
    var ol = h('ol', {}, navs.map(function (n) {
      return h('li', {}, [h('a', { href: PXD.href(cur.id, n.id, cur.lib), 'data-sec': n.id, class: n.id === curSec ? 'on' : '', onclick: function (e) { e.preventDefault(); closeSheet(); goSec(n.id, true); } }, [h('i', {}, [n.icon]), n.title])]);
    }));
    openSheet('أقسام الصفحة', ol);
  }
  $('#btn-theme').addEventListener('click', nextTheme);
  $('#btn-set').addEventListener('click', openSettings);
  fsDec.addEventListener('click', function () { setFs(prefs.fs - 1); });
  fsInc.addEventListener('click', function () { setFs(prefs.fs + 1); });
  fsVal.addEventListener('click', function () { setFs(FS_DEF); PXD.toast('حجم الخط رجع للعادي (' + FS_DEF + ')'); });
  $('#bb-idx').addEventListener('click', openDrawer);
  $('#bb-search').addEventListener('click', openSearch);
  $('#bb-sec').addEventListener('click', openToc);
  $('#fab').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  $('#brand').addEventListener('click', function (e) { if (location.hash && location.hash !== '#/' && location.hash !== '#') return; e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ═════════ section helpers ═════════ */
  var currentNav = [], curSec = '';
  function goSec(sec, smooth) {
    var el = null;
    if (!sec) { window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'instant' }); return; }
    if (sec.indexOf('attr-') === 0 || sec.indexOf('val-') === 0) { el = document.getElementById(sec); if (el && el.tagName === 'DETAILS') el.open = true; }
    else el = document.getElementById('s-' + sec);
    if (!el) return;
    el.scrollIntoView({ block: 'start', behavior: smooth ? 'smooth' : 'instant' });
    try { history.replaceState(null, '', PXD.href(cur.id, sec, cur.lib)); } catch (e) { }
  }
  var spyRaf = 0;
  function spy() {
    if (spyRaf) return; spyRaf = requestAnimationFrame(function () {
      spyRaf = 0;
      var fab = $('#fab'); if (fab) fab.classList.toggle('show', window.pageYOffset > 700);
      if (cur.t !== 'entry') return;
      var secs = $$('.sec', main); if (!secs.length) return;
      var line = (mqDesk.matches ? 120 : 130), pick = secs[0].getAttribute('data-sec');
      for (var i = 0; i < secs.length; i++) { if (secs[i].getBoundingClientRect().top <= line) pick = secs[i].getAttribute('data-sec'); else break; }
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4) pick = secs[secs.length - 1].getAttribute('data-sec');
      if (pick === curSec) return; curSec = pick;
      $$('.secnav a').forEach(function (a) {
        var on = a.getAttribute('data-sec') === pick; a.classList.toggle('on', on);
        if (on) { var nv = a.parentNode, nr = nv.getBoundingClientRect(), ar = a.getBoundingClientRect(); nv.scrollLeft += (ar.left + ar.width / 2) - (nr.left + nr.width / 2); }
      });
    });
  }
  window.addEventListener('scroll', spy, { passive: true });
  window.addEventListener('resize', spy);

  /* ═════════ page builders ═════════ */
  var STATUS = {
    stable: ['مستقر ✓', 'st-stable'], deprecated: ['قديم (Deprecated)', 'st-deprecated'], obsolete: ['ملغي (Obsolete)', 'st-obsolete'], experimental: ['تجريبي (Experimental)', 'st-experimental']
  };
  var DISPLAY = { block: 'Block — بياخد سطر كامل', inline: 'Inline — بيمشي مع النص', 'inline-block': 'Inline-block', none: 'مش بيتعرض', 'list-item': 'List-item', table: 'Table', 'table-row': 'Table-row', 'table-cell': 'Table-cell', contents: 'Contents', flex: 'Flex', grid: 'Grid' };
  var KIND_BADGE = {
    guide: '📘 دليل', attribute: '🏷️ خاصية HTML', inputtype: '🎛️ نوع حقل input', property: '🎨 خاصية CSS', selector: '🎯 محدد (Selector)',
    pseudoclass: '🔘 Pseudo-class', pseudoelement: '✨ Pseudo-element', atrule: '📜 At-rule', function: 'ƒ دالة CSS', datatype: '🧩 نوع قيمة'
  };
  var NOT_ELEMENT = { attribute: 1, inputtype: 1, property: 1, selector: 1, pseudoclass: 1, pseudoelement: 1, atrule: 1, function: 1, datatype: 1 };
  var CSS_KIND = { property: 1, selector: 1, pseudoclass: 1, pseudoelement: 1, atrule: 1, function: 1, datatype: 1 };

  function pageTitle(t) { document.title = t + ' | PhineX Docs'; }
  function mount(node) {
    main.innerHTML = ''; main.appendChild(node);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function prevNext(id) {
    var i = ORDER.indexOf(id), p = i > 0 ? BY[ORDER[i - 1]] : null, n = i >= 0 && i < ORDER.length - 1 ? BY[ORDER[i + 1]] : null;
    return { p: p, n: n };
  }
  function pnLink(it, dir) {
    if (!it) return h('span');
    var guide = it.kind === 'guide';
    return h('a', { href: PXD.hrefOf(it), class: dir === 'n' ? 'nx' : 'pv' }, [
      h('small', {}, [dir === 'n' ? 'التالي ←' : '→ السابق']),
      h('b', { class: guide ? 'ar' : '' }, [guide ? it.title : labelOf(it)]),
      guide ? null : h('span', {}, [cleanTitle(it.title)])
    ]);
  }
  function buildPN(id) {
    var pn = prevNext(id);
    return h('div', { class: 'pn' }, [pnLink(pn.p, 'p'), pnLink(pn.n, 'n')]);
  }
  function setBottomNav(id) {
    var pn = id ? prevNext(id) : { p: null, n: null };
    [['#bb-prev', pn.p], ['#bb-next', pn.n]].forEach(function (x) {
      var a = $(x[0]); if (x[1]) { a.setAttribute('href', PXD.hrefOf(x[1])); a.removeAttribute('aria-disabled'); } else { a.setAttribute('href', '#/' + (cur.t === 'home' ? '' : LIB)); a.setAttribute('aria-disabled', 'true'); }
    });
    var secBtn = $('#bb-sec'), isE = cur.t === 'entry' && currentNav.length;
    secBtn.innerHTML = (isE ? ICON.list : ICON.star) + '<span>' + (isE ? 'الأقسام' : 'محفوظاتي') + '</span>';
  }
  function setFooterBar(parts, mdn) {
    var bar = $('#cbbar'); bar.innerHTML = '';
    parts.forEach(function (p, i) { if (i) bar.appendChild(h('i', {}, ['›'])); bar.appendChild(i === parts.length - 1 ? h('b', {}, [p]) : h('span', {}, [p])); });
    bar.appendChild(h('span', { style: 'margin-inline-start:auto;display:flex;gap:14px;align-items:center' }, [
      mdn ? h('a', { href: mdn, target: '_blank', rel: 'noopener noreferrer', style: 'color:var(--muted)' }, ['MDN ↗']) : null,
      h('span', { style: 'opacity:.7' }, ['اضغط ', h('kbd', {}, ['/']), ' للبحث'])
    ]));
  }
  function mdnUrl(it) {
    var base = META[it.lib].mdn;
    if (it.mdn) return base + it.mdn;
    if (it.lib === 'css') return 'https://developer.mozilla.org/en-US/docs/Web/CSS';
    if (it.kind === 'element') return base + 'Elements/' + it.tag;
    if (it.id === 'global-attributes') return base + 'Global_attributes';
    if (it.id === 'doctype') return 'https://developer.mozilla.org/en-US/docs/Glossary/Doctype';
    if (it.id === 'comment') return 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Comments';
    return 'https://developer.mozilla.org/en-US/docs/Web/HTML';
  }
  function stat(n, label) { return h('div', { class: 'stat' }, [h('b', {}, [String(n)]), h('span', {}, [label])]); }
  function libCounts(l) {
    var c = { total: 0, guides: 0, ready: 0, live: 0, props: 0, sels: 0, el: 0, at: 0 };
    var ix = PXD.idx[l]; if (!ix) return c;
    PXD.order[l].forEach(function (id) {
      var it = PXD.byId[l][id]; c.total++;
      if (!it.pending) c.ready++;
      if (it.kind === 'guide') c.guides++;
      else if (it.kind === 'element') c.el++;
      else if (it.kind === 'property') c.props++;
      else if (it.kind === 'selector' || it.kind === 'pseudoclass' || it.kind === 'pseudoelement') c.sels++;
      else c.at++;
    });
    c.live = ix.stats ? ix.stats.live : 0;
    return c;
  }
  function heroSearch() {
    var heroInput = h('input', { type: 'search', placeholder: 'ابحث عن أي عنصر أو خاصية… مثلاً img أو flex', 'aria-label': 'بحث', readonly: true });
    heroInput.addEventListener('focus', function () { heroInput.blur(); openSearch(); });
    heroInput.addEventListener('click', openSearch);
    return h('div', { class: 'sbox' }, [h('span', { html: ICON.search, style: 'display:grid;width:18px' }), heroInput, h('kbd', {}, ['/'])]);
  }
  function resumeCard(host) {
    var last = store.get('last', null), li = last ? itemByKey(last) : null;
    if (li) host.appendChild(h('a', { class: 'resume', href: PXD.hrefOf(li) }, [h('span', { style: 'font-size:1.4rem' }, ['↩']), h('span', {}, ['كمّل من حيث وقفت: ', h('b', {}, [li.kind === 'guide' ? li.title : labelOf(li)]), libs.length > 1 ? ' (' + META[li.lib].short + ')' : ''])]));
  }
  var PATHS = {
    html: ['intro-html', 'anatomy', 'block-inline', 'semantic-html', 'a', 'img', 'form'],
    css: ['intro-css', 'adding-css', 'css-syntax', 'selectors-guide', 'box-model', 'specificity', 'units', 'colors-guide', 'flexbox-guide', 'grid-guide', 'responsive-guide']
  };
  var PATH_DESC = {
    'intro-html': 'يعني إيه HTML وإزاي الصفحة بتتبني', 'anatomy': 'تشريح الوسم: افتتاحي، ختامي، خصائص', 'block-inline': 'الفرق بين Block و Inline', 'semantic-html': 'ليه نستخدم العناصر ذات المعنى',
    'a': 'الروابط وأهم عنصر في الويب', 'img': 'الصور وإزاي تضيفها صح', 'form': 'استقبال بيانات من المستخدم',
    'intro-css': 'يعني إيه CSS وبيعمل إيه', 'adding-css': 'تلات طرق تربط بيها CSS بالصفحة', 'css-syntax': 'تشريح قاعدة CSS: محدد وخاصية وقيمة', 'selectors-guide': 'إزاي تختار العنصر اللي عايز تنسّقه',
    'box-model': 'الصندوق: محتوى وحشو وحد وهامش', 'specificity': 'لو قاعدتين اتعارضوا، مين يكسب؟', 'units': 'px و rem و % و vw — إمتى تستخدم إيه', 'colors-guide': 'ألوان الويب: hex و rgb و hsl',
    'flexbox-guide': 'ترتيب العناصر في صف أو عمود بسهولة', 'grid-guide': 'تصميم الصفحة بشبكة صفوف وأعمدة', 'responsive-guide': 'خلّي الصفحة تظبط على الموبايل والكمبيوتر'
  };
  function pathBlock(l, max) {
    var items = PATHS[l].map(function (id) { return PXD.info(id, l); }).filter(Boolean).slice(0, max || 6);
    if (!items.length) return null;
    return h('ol', { class: 'path' }, items.map(function (it) {
      return h('li', {}, [h('a', { href: PXD.hrefOf(it) }, [h('div', {}, [h('b', {}, [libs.length > 1 ? h('span', { class: 'tr ' + l }, [META[l].short]) : null, it.kind === 'guide' ? it.title : (labelOf(it) + ' — ' + cleanTitle(it.title))]), h('span', {}, [PATH_DESC[it.id] || it.summary || ''])])])]);
    }));
  }
  function itemCard(it) {
    var guide = it.kind === 'guide';
    var st = STATUS[it.status];
    var tcls = 'tgl' + (it.kind === 'function' ? ' fn' : it.kind === 'pseudoclass' || it.kind === 'pseudoelement' ? ' pc' : '') + ((labelOf(it) || '').length > 14 ? ' pl' : '');
    return h('a', { class: 'card', href: PXD.hrefOf(it), style: it.pending ? 'opacity:.7' : '' }, [
      h('span', { class: 'ct' }, [guide ? h('span', { class: 'ci' }, [it.catIcon]) : h('span', { class: tcls }, [labelOf(it)]), guide || !it.pending ? h('span', {}, [cleanTitle(it.title)]) : null]),
      h('p', {}, [it.pending ? 'الصفحة دي لسه بتتجهز.' : (it.summary || '')]),
      !it.pending && it.status && it.status !== 'stable' ? h('span', { class: 'pill ' + st[1], style: 'align-self:flex-start' }, [st[0]]) : null
    ]);
  }
  function catCard(c, l) {
    var done = c.items.filter(function (i) { return !i.pending; }).length;
    return h('a', { class: 'card', href: '#/' + l + '/cat/' + c.id }, [
      h('span', { class: 'ct' }, [h('span', { class: 'ci' }, [c.icon]), h('span', {}, [c.name]), h('span', { class: 'cn' }, [done === c.items.length ? String(c.items.length) : done + '/' + c.items.length])]),
      h('p', {}, [c.desc || ''])
    ]);
  }

  /* global home */
  function renderHome() {
    cur = { t: 'home', id: null, lib: LIB }; currentNav = []; curSec = '';
    pageTitle('مرجع HTML و CSS بالعربي');
    var cH = libCounts('html'), cC = libCounts('css'), allLive = (PXD.idx.html.stats ? PXD.idx.html.stats.live : 0) + (PXD.idx.css && PXD.idx.css.stats ? PXD.idx.css.stats.live : 0);
    var hero = h('section', { class: 'hero' }, [
      h('span', { class: 'kicker' }, ['PhineX Academy · X-Library']),
      h('h1', { html: 'مرجع <em>HTML</em> و <em class="c">CSS</em> بالعربي<br>من الصفر… بالمصري' }),
      h('p', {}, ['كل عنصر وخاصية ومحدد في HTML و CSS بيتشرح بالمصري ببساطة ومن غير تعقيد، مع أمثلة تفاعلية تعدّل عليها وتشوف النتيجة فوراً، وأخطاء شائعة، واختبار سريع في آخر كل صفحة. والألوان دافئة ومريحة للعين، وتقدر تكبّر الخط أو تصغّره من فوق.']),
      heroSearch(),
      h('div', { class: 'stats' }, [stat(cH.total + cC.total, 'صفحة شرح'), stat(cH.el, 'عنصر HTML'), stat(cC.props, 'خاصية CSS'), stat(allLive, 'مثال تفاعلي')])
    ]);
    resumeCard(hero);
    var home = h('div', { class: 'home' }, [hero]);
    home.appendChild(h('h2', {}, ['📚 اختار المرجع']));
    var cards = libs.map(function (l) {
      var c = l === 'html' ? cH : cC, M = META[l];
      var desc = l === 'html' ? 'هيكل الصفحة والنصوص والروابط والصور والجداول والنماذج، وكل عنصر وخاصية ونوع حقل، من أول <!DOCTYPE> لحد آخر عنصر.' : 'التنسيق والتصميم: الألوان والخطوط والـ Box Model والـ Flexbox والـ Grid والحركة والتصميم المتجاوب، وكل خاصية ومحدد ودالة.';
      var lst = l === 'html' ? [[c.el, 'عنصر'], [c.total - c.el - c.guides, 'خاصية ونوع حقل'], [c.guides, 'دليل']] : [[c.props, 'خاصية'], [c.sels, 'محدد'], [c.at, 'قاعدة ودالة ونوع'], [c.guides, 'دليل']];
      return h('a', { class: 'lcard ' + l, href: '#/' + l }, [
        h('div', { class: 'lh' }, [h('span', { class: 'lg ' + l }, [M.logo]), h('h3', {}, [M.name, h('small', {}, [l === 'html' ? 'HyperText Markup Language' : 'Cascading Style Sheets'])])]),
        h('p', {}, [desc]),
        h('div', { class: 'lst' }, lst.map(function (x) { return h('span', {}, [h('b', {}, [String(x[0])]), x[1]]); })),
        h('span', { class: 'go' }, ['ابدأ ←'])
      ]);
    });
    if (libs.indexOf('css') < 0) cards.push(h('div', { class: 'lcard css off' }, [h('div', { class: 'lh' }, [h('span', { class: 'lg css' }, ['C']), h('h3', {}, ['مرجع CSS', h('small', {}, ['قريباً'])])])]));
    home.appendChild(h('div', { class: 'libcards' }, cards));
    libs.forEach(function (l) {
      var p = pathBlock(l, 6); if (!p) return;
      home.appendChild(h('h2', {}, [l === 'html' ? '🧭 مسار تعلّم HTML' : '🎨 مسار تعلّم CSS']));
      home.appendChild(p);
    });
    libs.forEach(function (l) {
      home.appendChild(h('h2', {}, ['🔥 الأكتر استخداماً في ' + META[l].short]));
      home.appendChild(chipList(popularItems(l)));
    });
    mount(home);
    setFooterBar(['PhineX Docs']); setBottomNav(null); renderLibTabs(); markActiveLinks();
  }

  /* library home */
  function renderLibHome() {
    cur = { t: 'lib', id: null, lib: LIB }; currentNav = []; curSec = '';
    var M = META[LIB], c = libCounts(LIB);
    pageTitle(M.name);
    var hero = h('section', { class: 'hero' }, [
      h('span', { class: 'kicker' }, [LIB === 'html' ? 'HyperText Markup Language' : 'Cascading Style Sheets']),
      h('h1', { html: LIB === 'html' ? 'مرجع <em>HTML</em> بالعربي<br>لكل عنصر… من الصفر' : 'مرجع <em class="c">CSS</em> بالعربي<br>لكل خاصية… من الصفر' }),
      h('p', {}, [LIB === 'html'
        ? 'كل عنصر وخاصية ونوع حقل في HTML بيتشرح بالمصري ببساطة ومن غير تعقيد، مع أمثلة تفاعلية تعدّل عليها وتشوف النتيجة فوراً، وأخطاء شائعة، واختبار سريع في آخر كل صفحة.'
        : 'كل خاصية ومحدد ودالة وقاعدة في CSS بتتشرح بالمصري من الصفر: إيه اللي بتعمله، وإزاي المتصفح بيفهمها، وأمثلة حيّة تغيّر فيها وتشوف النتيجة قدامك، وأخطاء شائعة واختبار سريع.']),
      heroSearch(),
      h('div', { class: 'stats' }, LIB === 'html'
        ? [stat(c.el, 'عنصر HTML'), stat(c.total - c.el - c.guides, 'خاصية ونوع حقل'), stat(c.live, 'مثال تفاعلي'), stat(c.ready + '/' + c.total, 'صفحة جاهزة')]
        : [stat(c.props, 'خاصية CSS'), stat(c.sels, 'محدد'), stat(c.live, 'مثال تفاعلي'), stat(c.ready + '/' + c.total, 'صفحة جاهزة')])
    ]);
    resumeCard(hero);
    var home = h('div', { class: 'home' }, [hero]);
    var start = idx.cats.filter(function (x) { return x.id === 'start'; })[0];
    var pb = pathBlock(LIB, 7);
    if (pb) { home.appendChild(h('h2', {}, ['🧭 المسار المقترح للمبتدئ'])); home.appendChild(pb); }
    if (start) {
      home.appendChild(h('h2', {}, ['🚀 ابدأ من هنا']));
      home.appendChild(h('div', { class: 'cgrid' }, start.items.map(function (it) { return itemCard(it); })));
    }
    home.appendChild(h('h2', {}, ['📚 التصنيفات']));
    home.appendChild(h('div', { class: 'cgrid' }, idx.cats.filter(function (x) { return x.id !== 'start'; }).map(function (x) { return catCard(x, LIB); })));
    home.appendChild(h('h2', {}, ['🔥 الأكتر استخداماً']));
    home.appendChild(chipList(popularItems(LIB)));
    mount(home);
    setFooterBar(['PhineX Docs', M.short]); setBottomNav(null); renderLibTabs(); markActiveLinks();
  }

  function renderCategory(cid) {
    var c = idx.cats.filter(function (x) { return x.id === cid; })[0];
    if (!c) return renderNotFound(cid);
    cur = { t: 'cat', id: cid, lib: LIB }; currentNav = []; curSec = '';
    pageTitle(c.name);
    var done = c.items.filter(function (i) { return !i.pending; }).length;
    var wrap = h('div', { class: 'home' }, [
      h('nav', { class: 'crumbs' }, [h('a', { href: '#/' + LIB }, [META[LIB].short]), h('i', {}, ['›']), h('span', {}, [c.name])]),
      h('section', { class: 'hero', style: 'padding-block:20px' }, [
        h('h1', { style: 'font-size:1.5rem' }, [c.icon + ' ' + c.name]),
        h('p', { style: 'margin:0' }, [c.desc || '']),
        h('div', { class: 'stats' }, [stat(c.items.length, 'صفحة'), stat(done + '/' + c.items.length, 'جاهز')])
      ]),
      h('h2', {}, ['الصفحات']),
      h('div', { class: 'cgrid' }, c.items.map(function (it) { return itemCard(it); }))
    ]);
    mount(wrap);
    var ce = $('.tr-cat[data-cat="' + cid + '"]', catsHost); if (ce && !ce.classList.contains('open')) setCat(ce, true);
    setFooterBar([META[LIB].short, c.name]); setBottomNav(null); renderLibTabs(); markActiveLinks();
  }
  function renderNotFound(id) {
    cur = { t: 'nf', id: id, lib: LIB }; currentNav = [];
    pageTitle('مش لاقيها');
    mount(h('div', { class: 'home' }, [h('div', { class: 'pending' }, [h('div', { class: 'big' }, ['🧭']), h('h2', {}, ['الصفحة دي مش موجودة']), h('p', {}, ['مفيش صفحة باسم «' + id + '» في التوثيق. جرّب البحث أو ارجع للرئيسية.']),
      h('a', { class: 'btn', href: '#/' }, ['الرئيسية']), ' ', h('button', { class: 'btn ghost', type: 'button', onclick: openSearch }, ['ابحث'])])]));
    setFooterBar([META[LIB].short, '404']); setBottomNav(null); renderLibTabs(); markActiveLinks();
  }
  function crumbs(it) {
    return h('nav', { class: 'crumbs', 'aria-label': 'مسار الصفحة' }, [h('a', { href: '#/' + it.lib }, [META[it.lib].short]), h('i', {}, ['›']), h('a', { href: '#/' + it.lib + '/cat/' + it.cat }, [it.catIcon + ' ' + it.catName]), h('i', {}, ['›']), h('span', {}, [it.kind === 'guide' ? it.title : labelOf(it)])]);
  }
  function renderPending(it) {
    currentNav = []; curSec = '';
    pageTitle((it.kind === 'guide' ? it.title : labelOf(it)));
    var doc = h('div', { class: 'doc' }, [crumbs(it),
      h('div', { class: 'pending' }, [h('div', { class: 'big' }, ['🚧']),
        h('h2', {}, [it.kind === 'guide' ? it.id : labelOf(it)]),
        h('p', {}, ['صفحة الشرح العربي دي لسه بتتجهز، وهتتضاف قريباً بالشرح المبسّط والأمثلة.']),
        h('a', { class: 'btn ghost', href: mdnUrl(it), target: '_blank', rel: 'noopener noreferrer' }, ['شوفه على MDN ↗'])]),
      buildPN(it.id)]);
    mount(doc);
    setFooterBar([META[it.lib].short, it.catName, it.kind === 'guide' ? it.id : labelOf(it)], mdnUrl(it)); setBottomNav(it.id);
  }
  function banner(cls, ic, strong, text) {
    return h('div', { class: 'banner ' + cls }, [h('span', { class: 'bi' }, [ic]), h('div', {}, [h('b', {}, [strong]), text])]);
  }
  function renderEntry(e, it) {
    var r = V.renderEntry(e);
    currentNav = r.nav; curSec = '';
    pageTitle(e.kind === 'guide' ? e.title : (labelOf(it) + ' — ' + cleanTitle(e.title)));
    var badges = h('div', { class: 'badges' });
    var st = STATUS[e.status] || STATUS.stable;
    badges.appendChild(h('span', { class: 'pill ' + st[1] }, [st[0]]));
    badges.appendChild(h('span', { class: 'pill lb' }, [META[it.lib].short]));
    if (KIND_BADGE[e.kind] && (e.kind !== 'guide' || true)) badges.appendChild(h('span', { class: 'pill' }, [KIND_BADGE[e.kind]]));
    if (e.display && DISPLAY[e.display]) badges.appendChild(h('span', { class: 'pill' }, ['العرض: ' + DISPLAY[e.display]]));
    if (e.void) badges.appendChild(h('span', { class: 'pill' }, ['Void — من غير وسم إغلاق']));
    if (e.support === 'all' && e.status !== 'obsolete') badges.appendChild(h('span', { class: 'pill st-stable' }, ['✅ شغّال في كل المتصفحات']));
    var fav = h('button', { class: 'fav', type: 'button', 'aria-pressed': isFav(it), 'aria-label': 'أضف للمفضلة', html: ICONS.star });
    fav.onclick = function () { fav.setAttribute('aria-pressed', toggleFav(it)); };
    var top = h('div', { class: 'dh-top' });
    if (e.kind !== 'guide') top.appendChild(h('span', { class: 'tagchip' }, [labelOf(it)]));
    top.appendChild(h('h1', {}, [cleanTitle(e.title), e.en ? h('span', { class: 'en' }, [e.en]) : null]));
    top.appendChild(fav);
    var dh = h('header', { class: 'dh' }, [top, badges]);
    var AK = !!NOT_ELEMENT[e.kind] && e.kind !== 'guide';
    var AN = e.kind === 'inputtype' ? ['نوع ملغي', 'نوع قديم', 'نوع تجريبي'] : CSS_KIND[e.kind] ? ['ميزة ملغية', 'ميزة قديمة', 'ميزة تجريبية'] : ['خاصية ملغية', 'خاصية قديمة', 'خاصية تجريبية'];
    if (AK && e.status === 'obsolete') dh.appendChild(banner('none', '⛔', AN[0] + ' (Obsolete)', 'اتشالت من المعيار ومعظم المتصفحات مبقتش بتدعمها. اتعرّف عليها علشان لو قابلتها في كود قديم، لكن متستخدمهاش.'));
    else if (AK && e.status === 'deprecated') dh.appendChild(banner('limited', '⚠️', AN[1] + ' (Deprecated)', 'لسه بتشتغل في المتصفحات لكنها اتشالت من المعيار، فمتستخدمهاش في أي مشروع جديد.'));
    else if (AK && e.status === 'experimental') dh.appendChild(banner('exp', '🧪', AN[2] + ' (Experimental)', 'لسه مش مدعومة في كل المتصفحات وممكن يتغيّر شكلها. جرّبها للتعلّم بس، ومتعتمدش عليها في موقع حقيقي من غير ما تتأكد من الدعم.'));
    else if (e.status === 'obsolete') dh.appendChild(banner('none', '⛔', 'عنصر ملغي (Obsolete)', 'اتشال من معيار HTML ومعظم المتصفحات مبقتش بتدعمه. اتعرّف عليه علشان لو قابلته في كود قديم، لكن متستخدموش. شوف قسم «استخدم إيه بداله؟».'));
    else if (e.status === 'deprecated') dh.appendChild(banner('limited', '⚠️', 'عنصر قديم (Deprecated)', 'لسه بيشتغل في المتصفحات لكن اتشال من المعيار، فمتستخدموش في أي مشروع جديد. شوف قسم «استخدم إيه بداله؟».'));
    else if (e.status === 'experimental') dh.appendChild(banner('exp', '🧪', 'عنصر تجريبي (Experimental)', 'لسه مش مدعوم في كل المتصفحات وممكن يتغيّر شكله. جرّبه للتعلّم بس، ومتعتمدش عليه في موقع حقيقي من غير ما تتأكد من الدعم.'));
    if (e.support === 'limited' && e.status === 'stable') dh.appendChild(banner('limited', '🌐', 'دعم المتصفحات محدود', e.supportNote || 'مش كل المتصفحات بتدعمه، اتأكد قبل ما تعتمد عليه.'));
    else if (e.supportNote && e.status !== 'stable' && e.support !== 'all') dh.appendChild(h('div', { class: 'banner ' + (e.support === 'none' ? 'none' : 'limited') }, [h('span', { class: 'bi' }, ['🌐']), h('div', {}, [e.supportNote])]));
    if (e.summary) dh.appendChild(h('p', { class: 'summary', html: PXD.inline(e.summary, { self: e.id, lib: e.lib || it.lib }) }));
    var navEl = h('nav', { class: 'secnav', 'aria-label': 'أقسام الصفحة' }, r.nav.map(function (n) {
      return h('a', { href: PXD.href(e.id, n.id, it.lib), 'data-sec': n.id, onclick: function (ev) { ev.preventDefault(); goSec(n.id, true); } }, [n.icon + ' ' + n.label]);
    }));
    var doc = h('article', { class: 'doc' }, [crumbs(it), dh, navEl, r.el, buildPN(e.id)]);
    mount(doc);
    setFooterBar([META[it.lib].short, it.catName, e.kind === 'guide' ? e.id : labelOf(it)], mdnUrl(it)); setBottomNav(e.id);
  }

  /* ═════════ router ═════════ */
  function parseHash() {
    var m = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(function (s) { try { return decodeURIComponent(s); } catch (e) { return s; } });
    if (!m.length || !META[m[0]] || libs.indexOf(m[0]) < 0) return { t: 'home' };
    if (m.length === 1) return { t: 'lib', lib: m[0] };
    if (m[1] === 'cat' && m[2]) return { t: 'cat', lib: m[0], id: m[2] };
    return { t: 'entry', lib: m[0], id: m[1], sec: m[2] || '' };
  }
  function route() {
    var r = parseHash(), my = ++tok;
    if (!keepDrawer) closeUI(); else { closeSheet(); closeSearch(); }
    keepDrawer = false;
    if (r.lib && r.lib !== LIB) useLib(r.lib);
    if (r.lib && treeLib !== LIB) { buildTree(); }
    if (r.t === 'home') { renderHome(); return; }
    if (r.t === 'lib') { renderLibHome(); return; }
    if (r.t === 'cat') { renderCategory(r.id); return; }
    var it = BY[r.id];
    if (!it) { renderNotFound(r.id); return; }
    if (cur.t === 'entry' && cur.id === r.id && cur.lib === LIB && $('.doc', main)) { goSec(r.sec, true); return; }
    cur = { t: 'entry', id: r.id, lib: LIB };
    store.set('last', itemKey(it)); pushRecent(it);
    renderLibTabs(); revealActive();
    if (it.pending) { renderPending(it); return; }
    main.innerHTML = '<div class="home"><div class="pending"><div class="big">⏳</div><p>بيتحمّل…</p></div></div>';
    var lib = LIB;
    PXD.load(lib, it.cat).then(function () {
      if (my !== tok) return;
      var e = PXD.data[lib][r.id];
      if (!e) { renderPending(it); return; }
      renderEntry(e, it);
      if (r.sec) requestAnimationFrame(function () { goSec(r.sec, false); setTimeout(function () { if (my === tok) goSec(r.sec, false); }, 450); });
      spy();
    }, function () {
      if (my !== tok) return;
      main.innerHTML = ''; main.appendChild(h('div', { class: 'home' }, [h('div', { class: 'pending' }, [h('div', { class: 'big' }, ['📡']), h('h2', {}, ['مقدرتش أحمّل الصفحة']), h('p', {}, ['اتأكد إن ملفات data موجودة جنب الصفحة، وجرّب تاني.']), h('button', { class: 'btn', type: 'button', onclick: route }, ['إعادة المحاولة'])])]));
    });
  }
  window.addEventListener('hashchange', route);

  /* ═════════ tooltips (desktop hover) ═════════ */
  var tip = h('div', { class: 'tip', role: 'tooltip' }); document.body.appendChild(tip);
  var tipT = 0;
  function showTip(a) {
    var it = PXD.info(a.getAttribute('data-id'), a.getAttribute('data-lib') || 'html'); if (!it) return;
    var sum = it.pending ? 'صفحته لسه بتتجهز.' : (it.summary || '');
    if (sum.length > 150) sum = sum.slice(0, 148).replace(/\s+\S*$/, '') + '…';
    tip.innerHTML = (it.kind === 'guide' ? '' : '<b class="tg">' + esc(labelOf(it)) + '</b> ') + '<span class="tt">' + esc(cleanTitle(it.title)) + '</span><p>' + esc(sum) + '</p>';
    var r = a.getBoundingClientRect(), w = Math.min(320, window.innerWidth - 16);
    tip.style.maxWidth = w + 'px'; tip.classList.add('show');
    var th = tip.offsetHeight, tw = tip.offsetWidth;
    var x = Math.min(Math.max(8, r.left + r.width / 2 - tw / 2), window.innerWidth - tw - 8);
    var y = r.bottom + 8; if (y + th > window.innerHeight - 40) y = r.top - th - 8;
    tip.style.left = x + 'px'; tip.style.top = Math.max(8, y) + 'px';
  }
  main.addEventListener('mouseover', function (e) {
    if (!canHover.matches || !mqDesk.matches) return;
    var a = e.target.closest ? e.target.closest('a[data-id]') : null; if (!a) return;
    clearTimeout(tipT); tipT = setTimeout(function () { showTip(a); }, 260);
  });
  main.addEventListener('mouseout', function (e) { var a = e.target.closest ? e.target.closest('a[data-id]') : null; if (!a) return; clearTimeout(tipT); tip.classList.remove('show'); });
  window.addEventListener('scroll', function () { tip.classList.remove('show'); }, { passive: true });

  /* ═════════ keyboard & gestures ═════════ */
  document.addEventListener('keydown', function (e) {
    var t = e.target, typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
    if ((e.key === '/' && !typing && !e.ctrlKey && !e.metaKey) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); openSearch(); }
    else if (e.key === 'Escape') { if (body.classList.contains('drawer') || body.classList.contains('sheet-open') || body.classList.contains('search-open')) closeUI(); }
  });
  var tx0 = null, ty0 = 0;
  document.addEventListener('touchstart', function (e) { if (e.touches.length !== 1 || mqDesk.matches) { tx0 = null; return; } tx0 = e.touches[0].clientX; ty0 = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (tx0 == null) return; var t = e.changedTouches[0], dx = t.clientX - tx0, dy = Math.abs(t.clientY - ty0), W = window.innerWidth, right = prefs.side === 'right';
    var open = body.classList.contains('drawer');
    if (dy < 50) {
      if (!open && !body.classList.contains('sheet-open') && !body.classList.contains('search-open')) {
        if (!right && tx0 < 22 && dx > 70) openDrawer(); else if (right && tx0 > W - 22 && dx < -70) openDrawer();
      } else if (open) { if ((!right && dx < -70) || (right && dx > 70)) closeDrawer(); }
    }
    tx0 = null;
  }, { passive: true });
  /* ignore swipe when starting inside a horizontally scrollable code block */
  document.addEventListener('touchstart', function (e) { if (e.target.closest && e.target.closest('pre,.secnav,textarea,input[type=range]')) tx0 = null; }, { passive: true, capture: true });

  /* sidebar links: close drawer on tap (route() also does it) */
  tree.addEventListener('click', function (e) { var a = e.target.closest('a'); if (a && a.getAttribute('href') === location.hash) closeDrawer(); });
  sres.addEventListener('click', function (e) { var a = e.target.closest('a'); if (a && a.getAttribute('href') === location.hash) closeDrawer(); });

  /* ═════════ boot ═════════ */
  applyPrefs();
  (function () { var r = parseHash(); if (r.lib) useLib(r.lib); })();
  buildTree();
  ovHome();
  route();
  spy();
  var ld = $('#boot'); if (ld) ld.remove();
})();
