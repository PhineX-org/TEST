/* PhineX Docs — entry renderer: sections, live examples, quiz */
(function () {
  'use strict';
  var PXD = window.PXD, h = PXD.h, esc = PXD.esc, $ = PXD.$, $$ = PXD.$$, store = PXD.store;

  /* ── toast ── */
  var toastEl, toastT;
  PXD.toast = function (msg) {
    if (!toastEl) { toastEl = h('div', { class: 'toast', role: 'status', 'aria-live': 'polite' }); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  };

  var ICONS = {
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    run: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="m12 2.8 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6 6.2 20.7l1.1-6.5L2.6 9.6l6.5-.9Z"/></svg>',
    starO: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 2.8 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6 6.2 20.7l1.1-6.5L2.6 9.6l6.5-.9Z"/></svg>'
  };
  PXD.icons = ICONS;

  /* ── code blocks ── */
  function copyText(t, btn) {
    function ok() { PXD.toast('اتنسخ ✓'); if (btn) { btn.classList.add('ok'); setTimeout(function () { btn.classList.remove('ok'); }, 1200); } }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, fallback); else fallback();
    function fallback() {
      var ta = h('textarea', { style: 'position:fixed;opacity:0' }); ta.value = t; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { PXD.toast('مقدرتش أنسخ'); } ta.remove();
    }
  }
  var LANG_NAME = { html: 'HTML', css: 'CSS', js: 'JavaScript', text: 'TEXT' };
  function codeBlock(code, lang, cls) {
    var pre = h('pre', { class: 'code', tabindex: '0' }, [h('code', { html: PXD.highlight(code, lang) })]);
    var cp = h('button', { class: 'cp', type: 'button', 'aria-label': 'نسخ الكود', html: ICONS.copy, onclick: function () { copyText(code, cp); } });
    return h('div', { class: 'cw' + (cls ? ' ' + cls : '') }, [h('span', { class: 'lang' }, [LANG_NAME[lang] || lang]), cp, pre]);
  }
  PXD.codeBlock = codeBlock;

  /* ── live preview ── */
  var ASSETS = new URL('assets/media/', document.baseURI).href;
  var VTT = 'WEBVTT\n\n00:00.000 --> 00:02.000\nمرحباً! دي ترجمة تجريبية\n\n00:02.000 --> 00:04.000\nالترجمة اتحملت من عنصر track\n';
  var BASE_STYLE = '<style>:root{color-scheme:light}html{background:transparent}body{margin:0;padding:14px 16px;font:16px/1.8 "Segoe UI",Tahoma,Arial,system-ui,sans-serif;color:#2f2820;background:transparent}</style>';
  function pxHelper(ID) {
    function post(m) { m.pxid = ID; try { parent.postMessage(m, '*'); } catch (e) { } }
    var last = -1, pend = false;
    function measure() {
      var b = document.body; if (!b) return;
      var cs = getComputedStyle(b), r = b.getBoundingClientRect(), sy = window.pageYOffset || 0;
      var hh = r.bottom + sy + (parseFloat(cs.marginBottom) || 0);
      if (b.scrollHeight > b.clientHeight + 1) hh = Math.max(hh, b.scrollHeight + r.top + sy);
      hh = Math.ceil(hh);
      if (Math.abs(hh - last) > 1) { last = hh; post({ t: 'h', h: hh }); }
    }
    function sched() { if (pend) return; pend = true; requestAnimationFrame(function () { pend = false; measure(); }); }
    function fmt(v) {
      if (typeof v === 'string') return v;
      if (v && v.nodeType === 1) return v.outerHTML;
      try { var s = JSON.stringify(v); if (s !== undefined) return s; } catch (e) { }
      return String(v);
    }
    ['log', 'info', 'warn', 'error', 'debug'].forEach(function (k) {
      var o = console[k];
      console[k] = function () { post({ t: 'log', k: k, m: [].slice.call(arguments).map(fmt).join(' ') }); try { o.apply(console, arguments); } catch (e) { } };
    });
    window.alert = function (m) { post({ t: 'log', k: 'info', m: 'alert: ' + m }); };
    window.confirm = function (m) { post({ t: 'log', k: 'info', m: 'confirm: ' + m + ' → true' }); return true; };
    window.prompt = function (m, d) { post({ t: 'log', k: 'info', m: 'prompt: ' + m }); return d || ''; };
    window.addEventListener('error', function (e) { if (e.message) post({ t: 'log', k: 'error', m: e.message }); });
    window.addEventListener('unhandledrejection', function (e) { post({ t: 'log', k: 'error', m: String(e.reason) }); });
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href],area[href]') : null;
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) === '#') {
        e.preventDefault();
        if (href.length > 1) { var id = decodeURIComponent(href.slice(1)); var t = document.getElementById(id) || document.getElementsByName(id)[0]; if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        else window.scrollTo(0, 0);
        return;
      }
      if (/^javascript:/i.test(href)) return;
      e.preventDefault();
      post({ t: 'link', href: href, dl: a.hasAttribute('download') });
    }, true);
    document.addEventListener('submit', function (e) {
      var f = e.target; if (f && f.method === 'dialog') return;
      e.preventDefault(); post({ t: 'toast', m: '(تجريبي) الفورم اتبعت — مفيش سيرفر هنا' });
    }, true);
    document.addEventListener('error', function (e) {
      var t = e.target; if (!t || t.tagName !== 'IMG' || t.__px) return; t.__px = 1;
      var src = t.getAttribute('src') || (t.currentSrc || ''); var name = (src.split('/').pop() || 'image').split('?')[0].slice(0, 28) || 'image';
      var w = parseInt(t.getAttribute('width'), 10) || 300, hh = parseInt(t.getAttribute('height'), 10) || Math.round(w * 0.6);
      w = Math.min(Math.max(w, 40), 900); hh = Math.min(Math.max(hh, 30), 700);
      var fs = Math.max(10, Math.min(22, Math.round(w / 14)));
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + hh + '" viewBox="0 0 ' + w + ' ' + hh + '"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efe3cc"/><stop offset="1" stop-color="#dcc9a6"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><path d="M0 ' + (hh * .78) + ' L' + (w * .3) + ' ' + (hh * .45) + ' L' + (w * .5) + ' ' + (hh * .66) + ' L' + (w * .68) + ' ' + (hh * .5) + ' L' + w + ' ' + (hh * .8) + ' L' + w + ' ' + hh + ' L0 ' + hh + 'Z" fill="#c9b189" opacity=".7"/><circle cx="' + (w * .8) + '" cy="' + (hh * .25) + '" r="' + Math.max(6, hh * .08) + '" fill="#fbf3e2" opacity=".85"/><text x="50%" y="' + (hh * .9) + '" text-anchor="middle" font-family="monospace" font-size="' + fs + '" fill="#6b573a">' + name.replace(/[<>&"]/g, '') + '</text></svg>';
      var p = t.parentNode;
      if (p && p.tagName === 'PICTURE') [].slice.call(p.querySelectorAll('source')).forEach(function (s) { s.remove(); });
      t.removeAttribute('srcset'); t.removeAttribute('sizes');
      t.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }, true);
    document.addEventListener('DOMContentLoaded', function () {
      measure();
      if (window.ResizeObserver) new ResizeObserver(sched).observe(document.body);
      if (window.MutationObserver) new MutationObserver(sched).observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
    });
    window.addEventListener('load', function () { measure(); setTimeout(measure, 250); });
    document.addEventListener('toggle', sched, true);
    document.addEventListener('transitionend', sched, true);
  }
  function buildSrcdoc(code, id) {
    var helper = '<script>(' + pxHelper.toString() + ')(' + JSON.stringify(id) + ')<' + '/script>';
    var base = '<base href="' + ASSETS + '">';
    var c = code.replace(/(<track\b[^>]*?\bsrc\s*=\s*)(["'])sample\.vtt\2/gi, function (m, a, q) { return a + q + 'data:text/vtt;charset=utf-8,' + encodeURIComponent(VTT) + q; });
    var full = /<!doctype|<html[\s>]/i.test(c);
    if (full) {
      var inj = (/<base[\s>]/i.test(c) ? '' : base) + helper;
      if (/<head[^>]*>/i.test(c)) return c.replace(/<head[^>]*>/i, function (m) { return m + inj; });
      if (/<html[^>]*>/i.test(c)) return c.replace(/<html[^>]*>/i, function (m) { return m + '<head>' + inj + '</head>'; });
      return inj + c;
    }
    return '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8">' + base + BASE_STYLE + helper + '</head><body>' + c + '</body></html>';
  }
  PXD.buildSrcdoc = buildSrcdoc;

  var live = {}, uid = 0;
  window.addEventListener('message', function (e) {
    var d = e.data; if (!d || typeof d !== 'object' || !d.pxid) return;
    var ex = live[d.pxid]; if (!ex || e.source !== ex.frame.contentWindow) return;
    if (d.t === 'h') ex.setH(d.h);
    else if (d.t === 'log') ex.log(d.k, d.m);
    else if (d.t === 'toast') PXD.toast(d.m);
    else if (d.t === 'link') PXD.toast((d.dl ? '(تجريبي) هيتنزّل: ' : 'رابط تجريبي — مش هيفتح هنا: ') + d.href);
  });
  var lazy = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { lazy.unobserve(en.target); if (en.target.__run) en.target.__run(); } });
  }, { rootMargin: '500px 0px' }) : null;

  function makeExample(b) {
    var id = 'ex' + (++uid), orig = b.code, code = b.code, editing = false, timer = 0;
    var frame = null;
    var lblEl = h('span', { class: 'el' }, [LANG_NAME[b.lang] || 'HTML']);
    var bCopy = h('button', { type: 'button', html: ICONS.copy + '<span>نسخ</span>', onclick: function () { copyText(code); } });
    var bEdit = h('button', { type: 'button', html: ICONS.edit + '<span>عدّل وجرّب</span>', 'aria-pressed': 'false' });
    var bRun = h('button', { type: 'button', html: ICONS.run + '<span>شغّل</span>', onclick: function () { run(); } });
    var bReset = h('button', { type: 'button', html: ICONS.reset + '<span>إعادة</span>', style: 'display:none', onclick: function () { code = orig; ta.value = code; refreshCode(); autoH(); run(); } });
    var bar = h('div', { class: 'ex-bar' }, [lblEl, bReset, bRun, bCopy, bEdit]);
    var codeHost = h('div');
    var ta = h('textarea', { class: 'ed', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', 'aria-label': 'محرر الكود', dir: 'ltr' });
    ta.value = code;
    function refreshCode() { codeHost.innerHTML = ''; codeHost.appendChild(editing ? ta : codeBlock(code, 'html')); }
    function autoH() { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight + 4, 520) + 'px'; }
    bEdit.onclick = function () {
      editing = !editing; bEdit.setAttribute('aria-pressed', editing);
      bEdit.classList.toggle('on', editing); bEdit.querySelector('span').textContent = editing ? 'الكود المنسّق' : 'عدّل وجرّب';
      bReset.style.display = editing ? '' : 'none';
      refreshCode(); if (editing) { autoH(); ta.focus(); }
    };
    ta.addEventListener('input', function () { code = ta.value; autoH(); clearTimeout(timer); timer = setTimeout(run, 350); });
    ta.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); var s = ta.selectionStart, en = ta.selectionEnd; ta.setRangeText('  ', s, en, 'end'); ta.dispatchEvent(new Event('input')); }
    });
    var con = h('div', { class: 'ex-con', 'aria-label': 'ناتج console' });
    var holder = h('div', { class: 'ex-sk' }, ['… بيتحمّل']);
    var out = h('div', { class: 'ex-out' }, [h('div', { class: 'ob' }, [h('i'), h('span', {}, ['النتيجة'])]), holder, con]);
    var root = h('div', { class: 'ex' }, [bar, codeHost, out]);
    refreshCode();
    var obj = {
      get frame() { return frame; },
      setH: function (v) { if (b.h) return; frame.style.height = Math.max(60, Math.min(v, 640)) + 'px'; },
      log: function (k, m) {
        if (!con.classList.contains('show')) { con.classList.add('show'); con.innerHTML = '<div class="h">Console</div>'; }
        con.appendChild(h('div', { class: 'l ' + (k === 'error' ? 'err' : k === 'warn' ? 'warn' : '') }, [m]));
        con.scrollTop = con.scrollHeight;
      }
    };
    live[id] = obj;
    function run() {
      con.classList.remove('show'); con.innerHTML = '';
      if (!frame) {
        frame = h('iframe', { class: 'ex-frame', title: 'نتيجة المثال', sandbox: 'allow-scripts allow-forms allow-popups' + (location.protocol === 'file:' ? ' allow-same-origin' : ''), loading: 'lazy' });
        if (b.h) frame.style.height = Math.min(b.h, 700) + 'px';
        holder.replaceWith(frame);
      }
      frame.setAttribute('srcdoc', buildSrcdoc(code, id));
    }
    root.__run = run;
    if (lazy) lazy.observe(root); else run();
    return root;
  }

  /* ── blocks ── */
  var CO = { tip: ['💡', 'نصيحة'], warn: ['⚠️', 'تحذير'], note: ['📌', 'ملحوظة'], analogy: ['🎯', 'تشبيه'], key: ['🔑', 'المهم'] };
  function blocks(arr, ctx) {
    var frag = document.createDocumentFragment();
    (arr || []).forEach(function (b) {
      if (b.t === 'p') frag.appendChild(h('p', { html: PXD.inline(b.x, ctx) }));
      else if (b.t === 'ul' || b.t === 'ol') frag.appendChild(h(b.t, {}, b.items.map(function (i) { return h('li', { html: PXD.inline(i.x, ctx) }); })));
      else if (b.t === 'h') frag.appendChild(h('h3', { html: PXD.inline(b.x, ctx) }));
      else if (b.t === 'callout') {
        var c = CO[b.kind] || CO.note;
        frag.appendChild(h('div', { class: 'co ' + b.kind }, [h('span', { class: 'ci', 'aria-hidden': 'true' }, [c[0]]),
          h('div', { class: 'cb' }, [h('span', { class: 'ch' }, [c[1]])].concat(b.paras.map(function (p) { return h('p', { html: PXD.inline(p, ctx) }); })))]));
      } else if (b.t === 'code') {
        if (b.live && b.lang === 'html') frag.appendChild(makeExample(b));
        else frag.appendChild(codeBlock(b.code, b.lang, b.bad ? 'bad' : b.good ? 'good' : ''));
      }
    });
    return frag;
  }
  function prose(arr, ctx) { var d = h('div', { class: 'pr' }); d.appendChild(blocks(arr, ctx)); return d; }

  /* ── sections ── */
  var META = {
    intro: ['نظرة عامة', '📖', 'نظرة عامة'], try: ['جرّبها بنفسك', '⚡', 'جرّبها'], syntax: ['الصيغة (Syntax)', '🧬', 'الصيغة'],
    use: ['إمتى تستخدمه؟ وإمتى لأ؟', '🎯', 'الاستخدام'], instead: ['استخدم إيه بداله؟', '🔁', 'البديل'], attributes: ['الخصائص (Attributes)', '🎛️', 'الخصائص'], values: ['القيم المتاحة (Values)', '🎚️', 'القيم'],
    examples: ['أمثلة خطوة بخطوة', '🧪', 'أمثلة'], rules: ['قواعد الاستخدام', '📐', 'القواعد'], mistakes: ['أخطاء شائعة', '🐞', 'أخطاء'],
    a11y: ['إمكانية الوصول (Accessibility)', '♿', 'الإتاحة'], tips: ['نصايح', '💡', 'نصايح'], quiz: ['اختبر نفسك', '🏆', 'اختبار'], refs: ['مصادر للتوسع', '🔗', 'مصادر']
  };
  var RULE_LBL = { parents: 'يتحط جوه إيه', children: 'إيه اللي ينفع يتحط جواه', closing: 'وسم الإغلاق', role: 'الـ Role الافتراضي (ARIA)', dom: 'واجهة DOM', layout: 'سلوك العرض الافتراضي' };

  function section(id, title, icon, kids) {
    var s = h('section', { class: 'sec', id: 's-' + id, 'data-sec': id }, [
      h('h2', {}, [h('span', { class: 'hi', 'aria-hidden': 'true' }, [icon]), h('span', {}, [title])])
    ]);
    kids.forEach(function (k) { if (k) s.appendChild(k); });
    return s;
  }

  function slug(n) { return 'val-' + String(n).replace(/[^\w-]+/g, '_').replace(/^_+|_+$/g, ''); }
  function renderAttributes(sec, ctx, isVal) {
    var kids = [];
    if (sec.pre && sec.pre.length) kids.push(prose(sec.pre, ctx));
    var items = sec.items || [];
    if (!items.length) return kids;
    var openAll = items.length <= 5, idOf = function (a) { return isVal ? slug(a.name) : 'attr-' + a.name; };
    if (items.length > 4) {
      kids.push(h('div', { class: 'aidx' + (isVal ? ' vals' : '') }, items.map(function (a) {
        return h('a', { href: PXD.href(ctx.self, idOf(a), ctx.lib), class: a.flags.indexOf('deprecated') >= 0 ? 'dp' : '', 'data-attr': a.name }, [a.name]);
      })));
      kids.push(h('div', { class: 'at-ctl' }, [
        h('button', { type: 'button', onclick: function () { $$('details.at', wrap).forEach(function (d) { d.open = true; }); } }, ['فتح الكل']),
        h('button', { type: 'button', onclick: function () { $$('details.at', wrap).forEach(function (d) { d.open = false; }); } }, ['قفل الكل'])
      ]));
    }
    var wrap = h('div', { class: 'atl' });
    items.forEach(function (a, i) {
      var fl = a.flags || [], dp = fl.indexOf('deprecated') >= 0;
      var sum = h('summary', {}, [h('code', { class: 'an' }, [a.name])]);
      if (fl.indexOf('required') >= 0) sum.appendChild(h('span', { class: 'pill st-obsolete' }, ['مطلوبة']));
      if (fl.indexOf('boolean') >= 0) sum.appendChild(h('span', { class: 'pill' }, ['Boolean — وجودها كفاية']));
      if (dp) sum.appendChild(h('span', { class: 'pill st-deprecated' }, ['قديمة']));
      if (fl.indexOf('experimental') >= 0) sum.appendChild(h('span', { class: 'pill st-experimental' }, ['تجريبية']));
      var d = h('details', { class: 'at' + (dp ? ' dp' : ''), id: idOf(a) }, [sum, h('div', { class: 'at-b pr' }, [blocks(a.blocks, ctx)])]);
      if (openAll || i < 3) d.open = true;
      wrap.appendChild(d);
    });
    kids.push(wrap);
    return kids;
  }

  function renderQuiz(sec, ctx, entryId) {
    var qs = sec.items, i = 0, score = 0;
    var box = h('div', { class: 'qz' });
    function show() {
      box.innerHTML = '';
      if (i >= qs.length) {
        var best = Math.max(store.get('quiz:' + entryId, 0), score); store.set('quiz:' + entryId, best);
        document.dispatchEvent(new CustomEvent('pxd:quiz', { detail: { id: entryId } }));
        box.appendChild(h('div', { class: 'qz-res' }, [h('div', { class: 'big' }, [score + ' / ' + qs.length]),
          h('p', {}, [score === qs.length ? 'ممتاز! فاهم العنصر ده كويس 🎉' : score >= qs.length / 2 ? 'كويس جداً! راجع الأسئلة اللي غلطت فيها وجرّب تاني.' : 'مفيش مشكلة، ارجع اقرا الصفحة وجرّب تاني — التكرار بيثبّت المعلومة.']),
          h('button', { class: 'btn', type: 'button', onclick: function () { i = 0; score = 0; show(); } }, ['↻ ابدأ من الأول'])]));
        return;
      }
      var q = qs[i], opts = q.blocks.filter(function (b) { return b.t === 'ul'; })[0].items, expl = q.blocks.filter(function (b) { return b.t === 'p'; });
      box.appendChild(h('div', { class: 'qz-h' }, [h('span', {}, ['سؤال ' + (i + 1) + ' من ' + qs.length]), h('div', { class: 'qz-bar' }, [h('i', { style: 'width:' + Math.round(i / qs.length * 100) + '%' })])]));
      var body = h('div', { class: 'qz-b' }, [h('p', { class: 'qz-q', html: PXD.inline(q.title, ctx) })]);
      var list = h('div', { class: 'qz-o' }), foot = h('div', { class: 'qz-f' }), exBox = null, answered = false;
      var next = h('button', { class: 'btn', type: 'button', disabled: true, onclick: function () { i++; show(); } }, [i === qs.length - 1 ? 'شوف النتيجة' : 'السؤال التالي ←']);
      opts.forEach(function (o, k) {
        var btn = h('button', { type: 'button' }, [h('span', { class: 'k' }, ['ABCDE'.charAt(k)]), h('span', { html: PXD.inline(o.x, ctx) })]);
        btn.onclick = function () {
          if (answered) return; answered = true;
          if (o.ok) score++;
          $$('button', list).forEach(function (bb, kk) { bb.disabled = true; if (opts[kk].ok) bb.classList.add('ok'); else if (bb === btn) bb.classList.add('no'); });
          exBox = h('div', { class: 'qz-ex' }, [h('p', { html: '<strong>' + (o.ok ? '✅ صح! ' : '❌ لأ. ') + '</strong>' })]);
          expl.forEach(function (p) { exBox.appendChild(h('p', { html: PXD.inline(p.x, ctx) })); });
          body.appendChild(exBox); next.disabled = false;
        };
        list.appendChild(btn);
      });
      body.appendChild(list); box.appendChild(body); foot.appendChild(h('span', { class: 'muted' }, [])); foot.appendChild(next); box.appendChild(foot);
    }
    show();
    return [box];
  }

  function renderEntry(e) {
    var ctx = { self: e.id, lib: e.lib || 'html' };
    var by = {}; e.sections.forEach(function (s) { if (s.key !== 'section') by[s.key] = s; });
    var customs = e.sections.filter(function (s) { return s.key === 'section'; });
    var out = h('div', { class: 'secs' }), nav = [];
    function add(id, title, icon, chip, kids) { out.appendChild(section(id, title, icon, kids)); nav.push({ id: id, label: chip, icon: icon, title: title }); }
    var M = META;
    if (by.intro) add('intro', M.intro[0], M.intro[1], M.intro[2], [prose(by.intro.blocks, ctx)]);
    if (by.try) add('try', M.try[0], M.try[1], M.try[2], [prose(by.try.blocks, ctx)]);
    if (by.syntax) add('syntax', M.syntax[0], M.syntax[1], M.syntax[2], [prose(by.syntax.blocks, ctx)]);
    if (by.use || by.avoid) {
      var ua = h('div', { class: 'ua' });
      if (by.use) ua.appendChild(h('div', { class: 'bx u' }, [h('h3', {}, ['✅ استخدمه لما…']), h('ul', {}, by.use.blocks[0].items.map(function (i) { return h('li', { html: PXD.inline(i.x, ctx) }); }))]));
      if (by.avoid) ua.appendChild(h('div', { class: 'bx a' }, [h('h3', {}, ['🚫 متستخدموش لما…']), h('ul', {}, by.avoid.blocks[0].items.map(function (i) { return h('li', { html: PXD.inline(i.x, ctx) }); }))]));
      add('use', M.use[0], M.use[1], M.use[2], [ua]);
    }
    if (by.instead) add('instead', M.instead[0], M.instead[1], M.instead[2], [prose(by.instead.blocks, ctx)]);
    if (by.values) add('values', M.values[0], M.values[1], M.values[2], renderAttributes(by.values, ctx, true));
    if (by.attributes) add('attributes', M.attributes[0], M.attributes[1], M.attributes[2], renderAttributes(by.attributes, ctx));
    if (by.examples) {
      var kids = [];
      if (by.examples.pre && by.examples.pre.length) kids.push(prose(by.examples.pre, ctx));
      by.examples.items.forEach(function (it, n) {
        kids.push(h('div', { class: 'ex-head' }, [h('span', { class: 'num' }, [String(n + 1)]), h('h3', { html: PXD.inline(it.title.replace(/^\s*\d+\s*[)\-.:]\s*/, ''), ctx) })]));
        kids.push(prose(it.blocks, ctx));
      });
      add('examples', M.examples[0], M.examples[1], M.examples[2], kids);
    }
    if (by.rules) {
      var rk = [];
      if (by.rules.rules && by.rules.rules.length) rk.push(h('dl', { class: 'rules' }, by.rules.rules.map(function (r) {
        return h('div', { class: 'rule' }, [h('dt', {}, [RULE_LBL[r.k] || r.k]), h('dd', { html: PXD.inline(r.x, ctx) })]);
      })));
      if (by.rules.blocks && by.rules.blocks.length) { var rp = prose(by.rules.blocks, ctx); rp.style.marginTop = '14px'; rk.push(rp); }
      add('rules', M.rules[0], M.rules[1], M.rules[2], rk);
    }
    if (by.mistakes) {
      var mk = [];
      if (by.mistakes.pre && by.mistakes.pre.length) mk.push(prose(by.mistakes.pre, ctx));
      by.mistakes.items.forEach(function (it) {
        var bad = it.blocks.filter(function (b) { return b.t === 'code' && b.bad; })[0], good = it.blocks.filter(function (b) { return b.t === 'code' && b.good; })[0];
        var rest = it.blocks.filter(function (b) { return !(b.t === 'code' && (b.bad || b.good)); });
        var card = h('div', { class: 'mk' }, [h('h3', { html: PXD.inline(it.title, ctx) }),
          h('div', { class: 'pair' }, [
            h('div', {}, [h('span', { class: 'lbl b' }, ['❌ غلط']), codeBlock(bad.code, bad.lang, 'bad')]),
            h('div', {}, [h('span', { class: 'lbl g' }, ['✅ صح']), codeBlock(good.code, good.lang, 'good')])
          ]), h('div', { class: 'pr', style: 'margin-top:12px' }, [blocks(rest, ctx)])]);
        mk.push(card);
      });
      add('mistakes', M.mistakes[0], M.mistakes[1], M.mistakes[2], mk);
    }
    if (by.a11y) add('a11y', M.a11y[0], M.a11y[1], M.a11y[2], [prose(by.a11y.blocks, ctx)]);
    if (by.tips) add('tips', M.tips[0], M.tips[1], M.tips[2], [prose(by.tips.blocks, ctx)]);
    customs.forEach(function (c, n) { add('x' + n, c.title, '📌', c.title.length > 16 ? c.title.slice(0, 15) + '…' : c.title, [prose(c.blocks, ctx)]); });
    if (by.quiz) {
      var qk = [];
      if (by.quiz.pre && by.quiz.pre.length) qk.push(prose(by.quiz.pre, ctx));
      qk = qk.concat(renderQuiz(by.quiz, ctx, e.id));
      add('quiz', M.quiz[0], M.quiz[1], M.quiz[2], qk);
    }
    if (by.refs) add('refs', M.refs[0], M.refs[1], M.refs[2], [prose(by.refs.blocks, ctx)]);
    return { el: out, nav: nav };
  }

  PXD.view = { renderEntry: renderEntry, blocks: blocks, prose: prose };
})();
