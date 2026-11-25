/* X Code — learn IDE: Workspace (editor tabs + live preview + tests) used by project steps and inline "try" blocks. */
(function () {
  'use strict';
  var PXD = window.PXD, XF = window.XF, h = PXD.h, esc = PXD.esc;

  /* ───────────── lazy editor ───────────── */
  var edP = null;
  XF.needEditor = function () {
    if (window.XFEditor) return Promise.resolve();
    return edP || (edP = XF.loadScript(XF.base + 'vendor/cm.js').catch(function (e) { edP = null; throw e; }));
  };
  var LANG_OF = { html: 'html', htm: 'html', css: 'css', js: 'js', jsx: 'jsx', mjs: 'js', json: 'js', py: 'python', php: 'php', txt: 'text' };
  var FILE_ICON = { html: '🌐', css: '🎨', js: '⚡', jsx: '⚛️', py: '🐍', php: '🐘', json: '📦' };
  function ext(f) { return String(f).split('.').pop().toLowerCase(); }

  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M7 4.8v14.4a1 1 0 0 0 1.5.9l12-7.2a1 1 0 0 0 0-1.8l-12-7.2A1 1 0 0 0 7 4.8Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>',
    term: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 5 4-5 4M13 17h6"/><rect x="2.5" y="4" width="19" height="16" rx="3"/></svg>'
  };
  XF.icons = ICON;

  /* ───────────── Workspace ─────────────
     o = { files:{name:text}, order:[names], editable:[names]|null, entry, tests:[[desc,js]…], solution:{…}, ls:{…},
           h: preview height (px, inline use), onChange(files), onPass(), onStore(ls), label }
     returns { editEl, prevEl, testsEl, check(), solve(), get(), set(files), reload(), destroy(), onResult }                   */
  XF.Workspace = function (o) {
    var names = o.order || Object.keys(o.files), entry = o.entry || (names.filter(function (f) { return /^index\.html?$/.test(f); })[0] || names[0]);
    var editable = o.editable || names, cur = {}, eds = {}, active = null, timer = 0, ready = false, dead = false;
    names.forEach(function (f) { cur[f] = o.files[f] != null ? o.files[f] : ''; });
    var W = { names: names, entry: entry, tests: o.tests || [], passed: false };

    /* editor column */
    var tabs = h('div', { class: 'ws-tabs', role: 'tablist', 'aria-label': 'ملفات المشروع' });
    var edBox = h('div', { class: 'ws-eds' }, [h('div', { class: 'ws-sk xf-skel' })]);
    W.editEl = h('div', { class: 'ws-edit' }, [tabs, edBox]);
    names.forEach(function (f) {
      var vis = editable.indexOf(f) >= 0;
      var b = h('button', { type: 'button', role: 'tab', class: 'ws-tab' + (vis ? '' : ' ro'), 'data-f': f, onclick: function () { show(f); } }, [h('span', { class: 'fi', 'aria-hidden': 'true' }, [FILE_ICON[ext(f)] || '📄']), h('span', { class: 'fn' }, [f]), vis ? null : h('span', { class: 'ro-t' }, ['للقراءة'])]);
      tabs.appendChild(b);
    });
    function show(f) {
      active = f;
      [].forEach.call(tabs.children, function (b) { var on = b.getAttribute('data-f') === f; b.classList.toggle('on', on); b.setAttribute('aria-selected', String(on)); });
      names.forEach(function (n) { if (eds[n]) eds[n].host.hidden = n !== f; });
      if (eds[f] && eds[f].ed) { try { eds[f].ed.view.requestMeasure(); } catch (e) { } }
    }
    W.show = show;

    /* preview column */
    var frame = h('iframe', { class: 'ws-frame', title: 'المعاينة', sandbox: 'allow-scripts allow-forms allow-modals' });
    if (o.h) frame.style.height = o.h + 'px';
    var con = h('div', { class: 'ws-con', 'aria-label': 'Console' });
    var conHead = h('button', { type: 'button', class: 'ws-con-h', onclick: function () { conBox.classList.toggle('open'); } }, [h('span', { html: ICON.term }), h('span', {}, ['Console']), h('span', { class: 'cnt' }, ['0'])]);
    var conBox = h('div', { class: 'ws-conbox' }, [conHead, con]);
    var navHint = h('div', { class: 'ws-nav', hidden: true });
    W.prevEl = h('div', { class: 'ws-prev' }, [h('div', { class: 'ob' }, [h('i'), h('span', {}, ['المعاينة'])]), frame, navHint, conBox]);
    var nLog = 0;
    var pv = W.pv = XF.Preview(frame, {
      ls: o.ls || {}, runtime: o.runtime,
      onlog: function (k, m) { nLog++; conHead.querySelector('.cnt').textContent = String(nLog); con.appendChild(h('div', { class: 'l ' + (k === 'error' ? 'err' : k === 'warn' ? 'warn' : '') }, [m])); con.scrollTop = con.scrollHeight; if (k === 'error') conBox.classList.add('open', 'has-err'); },
      onstore: function (v) { o.onStore && o.onStore(v); },
      onnav: function (href) { navHint.hidden = false; navHint.textContent = 'اللينك ' + href + ' مش هيفتح هنا — دي معاينة المشروع بس.'; setTimeout(function () { navHint.hidden = true; }, 3000); }
    });
    function reload() {
      nLog = 0; con.innerHTML = ''; conHead.querySelector('.cnt').textContent = '0'; conBox.classList.remove('has-err'); if (o.openConsole) conBox.classList.add('open');
      pv.load(cur, entry);
    }
    W.reload = reload;

    /* tests column */
    var list = h('ul', { class: 'ws-tl' });
    var msg = h('div', { class: 'ws-msg', 'aria-live': 'polite' });
    var bCheck = h('button', { type: 'button', class: 'btn ws-check', html: ICON.play + '<span>اختبر الكود</span>', onclick: function () { W.check(); } });
    var bHint = o.hint === false ? null : h('button', { type: 'button', class: 'btn ghost', html: ICON.bulb + '<span>تلميح</span>', onclick: function () { W.hint(); } });
    var bSolve = o.solution ? h('button', { type: 'button', class: 'btn ghost', html: ICON.check + '<span>حلّها لي</span>', onclick: function () { W.solve(); } }) : null;
    var bReset = h('button', { type: 'button', class: 'btn ghost', html: ICON.reset + '<span>رجّع الأصل</span>', onclick: function () { W.reset(); } });
    var hintBox = h('div', { class: 'ws-hint', hidden: true });
    W.testsEl = h('div', { class: 'ws-tests' }, [list, msg, h('div', { class: 'ws-act' }, [bCheck, bHint, bSolve, bReset]), hintBox]);
    function drawTests(res) {
      list.innerHTML = '';
      (W.tests || []).forEach(function (t, i) {
        var r = res && res[i], st = !res ? 'wait' : r.ok ? 'ok' : 'no';
        list.appendChild(h('li', { class: 't-' + st }, [h('span', { class: 'ti', html: st === 'ok' ? ICON.check : st === 'no' ? ICON.x : '' }), h('span', { class: 'tx', html: PXD.inline(t[0]) })]));
      });
    }
    drawTests(null);
    W.drawTests = drawTests;

    W.get = function () { var o2 = {}; names.forEach(function (f) { o2[f] = eds[f] && eds[f].ed ? eds[f].ed.get() : cur[f]; }); return o2; };
    W.set = function (files, quiet) {
      names.forEach(function (f) { if (files[f] != null) { cur[f] = files[f]; if (eds[f] && eds[f].ed) eds[f].ed.set(files[f], true); } });
      if (!quiet) reload();
    };
    W.reset = function () { W.set(o.starter || o.files); W.passed = false; drawTests(null); msg.className = 'ws-msg'; msg.textContent = ''; hintBox.hidden = true; o.onChange && o.onChange(W.get()); };
    W.solve = function () { if (!o.solution) return; W.set(o.solution); o.onChange && o.onChange(W.get()); msg.className = 'ws-msg info'; msg.textContent = 'الحل اتحط في المحرر — اضغط «اختبر الكود» وكمّل.'; };
    W.hint = function () {
      if (!o.hintFn) { hintBox.hidden = false; hintBox.textContent = 'اقرا التعليمات تاني بالراحة — والاختبارات اللي تحت بتقولك إيه المطلوب بالظبط.'; return; }
      hintBox.hidden = false; hintBox.innerHTML = ''; hintBox.appendChild(o.hintFn(W.get()));
    };
    var busy = false;
    W.check = function () {
      if (busy || dead) return Promise.resolve(false); busy = true; bCheck.disabled = true;
      var files = W.get();
      return XF.runTests({ files: files, entry: entry, runtime: o.runtime, ls: pv.ls }, W.tests).then(function (res) {
        busy = false; bCheck.disabled = false; drawTests(res);
        var bad = res.filter(function (r) { return !r.ok; }), ok = !bad.length && res.length > 0;
        if (!res.length) { ok = true; }
        W.passed = ok;
        msg.className = 'ws-msg ' + (ok ? 'ok xf-pop' : 'no xf-shake');
        msg.textContent = ok ? 'تمام! كل الاختبارات عدّت ✓' : 'لسه فيه ' + bad.length + ' اختبار مش متحقق — راجع اللي بالأحمر.';
        if (!ok) { var first = list.querySelector('.t-no'); first && first.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
        if (ok && o.onPass) o.onPass(files);
        return ok;
      }).catch(function () { busy = false; bCheck.disabled = false; return false; });
    };
    W.destroy = function () { dead = true; clearTimeout(timer); pv.destroy(); Object.keys(eds).forEach(function (f) { try { eds[f].ed && eds[f].ed.destroy(); } catch (e) { } }); };

    /* build editors once CodeMirror is loaded */
    XF.needEditor().then(function () {
      if (dead) return;
      edBox.innerHTML = '';
      names.forEach(function (f) {
        var host = h('div', { class: 'ws-ed', hidden: true, 'data-f': f }); edBox.appendChild(host);
        var ro = editable.indexOf(f) < 0;
        var ed = window.XFEditor.create(host, {
          doc: cur[f], lang: LANG_OF[ext(f)] || 'text', readOnly: ro, label: 'محرر ' + f,
          onChange: function () {
            clearTimeout(timer); W.passed = false;
            timer = setTimeout(function () { var fl = W.get(); names.forEach(function (n) { cur[n] = fl[n]; }); reload(); o.onChange && o.onChange(fl); }, 450);
          }
        });
        eds[f] = { ed: ed, host: host };
      });
      var first = names.filter(function (f) { return editable.indexOf(f) >= 0; })[0] || names[0];
      show(o.focus && names.indexOf(o.focus) >= 0 ? o.focus : first);
      ready = true; reload();
    }).catch(function () { edBox.innerHTML = '<p class="ws-err">محرر الكود ماتحمّلش — جرّب تعمل Refresh.</p>'; });
    return W;
  };

  /* ───────────── inline "try" block ─────────────
     {t:'try', title, x:[blocks]|'text', lang:'html'|'css'|'js', starter, solution, html (page for css/js tasks), css, js, tests, hint, h} */
  XF.view = XF.view || {};
  XF.view.tryBlock = function (b, ctx) {
    var lang = b.lang || 'html', files = {}, edit;
    if (lang === 'html') { files['index.html'] = b.starter || ''; if (b.css != null) files['style.css'] = b.css; if (b.js != null) files['script.js'] = b.js; edit = ['index.html']; }
    else if (lang === 'css') { files['index.html'] = b.html || '<p>مثال</p>'; files['style.css'] = b.starter || ''; edit = ['style.css']; }
    else { files['index.html'] = b.html || '<div id="out"></div>'; files['script.js'] = b.starter || ''; edit = ['script.js']; }
    if (lang === 'css' && !/<link[^>]+style\.css/.test(files['index.html'])) files['index.html'] = '<link rel="stylesheet" href="style.css">\n' + files['index.html'];
    if (lang === 'js' && !/<script[^>]+script\.js/.test(files['index.html'])) files['index.html'] = files['index.html'] + '\n<script src="script.js"><' + '/script>';
    var sol = null;
    if (b.solution != null) { sol = {}; Object.keys(files).forEach(function (f) { sol[f] = files[f]; }); sol[edit[0]] = b.solution; }
    var key = 'try:' + ctx.track + ':' + ctx.id + ':' + (b.id || ctx.n);
    var root = h('div', { class: 'tryx' });
    var head = h('div', { class: 'tryx-h' }, [h('span', { class: 'tryx-i', html: ICON.bulb }), h('b', {}, [b.title || 'جرّب بنفسك']), h('span', { class: 'tryx-st' }, [PXD.store.get(key, 0) ? '✓ اتحلّ' : ''])]);
    var body = h('div', { class: 'tryx-x pr' });
    body.appendChild(XF.view.blocks(typeof b.x === 'string' ? [{ t: 'p', x: b.x }] : (b.x || []), ctx));
    var W = XF.Workspace({
      openConsole: lang === 'js', runtime: ctx.runtime, files: files, editable: edit, order: Object.keys(files).filter(function (f) { return edit.indexOf(f) >= 0; }).concat(Object.keys(files).filter(function (f) { return edit.indexOf(f) < 0 && f !== 'index.html'; })),
      entry: 'index.html', tests: b.tests || [], solution: sol, h: b.h || 200, hint: b.hint !== false,
      onPass: function () { PXD.store.set(key, 1); head.querySelector('.tryx-st').textContent = '✓ اتحلّ'; root.classList.add('done'); ctx.onTry && ctx.onTry(); }
    });
    if (b.hint) W.hintFn = null;
    if (b.hint) { var oh = W.hint; W.hint = function () { var bx = W.testsEl.querySelector('.ws-hint'); bx.hidden = false; bx.innerHTML = PXD.inline(b.hint); }; }
    root.appendChild(head); root.appendChild(body);
    root.appendChild(h('div', { class: 'tryx-g' }, [W.editEl, W.prevEl]));
    root.appendChild(W.testsEl);
    root.__ws = W;
    return root;
  };
})();
