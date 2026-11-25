/* X Code — learn core: registry, progress, project step states, syntax highlighters, sandboxed runner + tests.
   Requires docs/assets/px-core.js (PXD: h, esc, inline, highlight, store). */
(function () {
  'use strict';
  var PXD = window.PXD, esc = PXD.esc, store = PXD.store;
  var XF = window.XF = { index: null, trk: {}, data: {}, loaded: {}, ver: '1' };

  /* ───────────── registry ───────────── */
  /* unit files call XF.items(track, unit, [ {type:'lesson'|'project'|'quiz', id, …}, … ]) */
  XF.items = function (track, unit, arr) {
    var k = track + '/' + unit;
    (XF.data[k] = XF.data[k] || []);
    arr.forEach(function (it) { it.track = track; it.unit = unit; XF.data[k].push(it); });
  };
  XF.setIndex = function (idx) {
    XF.index = idx; XF.trk = {}; XF.flat = {}; XF.meta = {};
    idx.tracks.forEach(function (t) {
      XF.trk[t.id] = t; XF.flat[t.id] = []; XF.meta[t.id] = {};
      t.units.forEach(function (u) {
        u.items.forEach(function (it) {
          it.track = t.id; it.unit = u.id; it.unitTitle = u.title;
          XF.flat[t.id].push(it); XF.meta[t.id][it.id] = it;
        });
      });
    });
  };
  XF.base = (function () { var s = document.currentScript; return s && s.src ? s.src.replace(/assets\/[^\/]*$/, '') : ''; })();
  function loadScript(src) {
    return new Promise(function (res, rej) {
      if (XF.loaded[src]) return XF.loaded[src].then(res, rej);
      var p = XF.loaded[src] = new Promise(function (ok, no) {
        var s = document.createElement('script'); s.src = src; s.async = true;
        s.onload = function () { ok(); }; s.onerror = function () { delete XF.loaded[src]; no(new Error('load ' + src)); };
        document.head.appendChild(s);
      });
      p.then(res, rej);
    });
  }
  XF.loadScript = loadScript;
  XF.getItem = function (track, id) {
    var m = XF.meta[track] && XF.meta[track][id]; if (!m) return Promise.resolve(null);
    return loadScript(XF.base + 'data/' + track + '/' + (m.f || id + '.js')).then(function () {
      var arr = XF.data[track + '/' + m.unit] || [];
      for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
      return null;
    });
  };
  XF.neighbors = function (track, id) {
    var f = XF.flat[track] || [], i = -1;
    for (var k = 0; k < f.length; k++) if (f[k].id === id) { i = k; break; }
    return { prev: i > 0 ? f[i - 1] : null, next: i >= 0 && i < f.length - 1 ? f[i + 1] : null, i: i, n: f.length };
  };
  XF.href = function (track, id, step) { return '#/' + track + (id ? '/' + id : '') + (step ? '/' + step : ''); };

  /* ───────────── progress ───────────── */
  var P = XF.prog = {
    all: function (track) { return store.get('lp:' + track, {}) || {}; },
    isDone: function (track, id) { return !!P.all(track)[id]; },
    done: function (track, id, v) { var a = P.all(track); if (v === false) delete a[id]; else a[id] = Date.now(); store.set('lp:' + track, a); store.set('last', { track: track, id: id, t: Date.now() }); },
    step: function (track, proj) { return +(store.get('ps:' + track + ':' + proj, 0)) || 0; },       /* highest completed step */
    setStep: function (track, proj, n) { if (n > P.step(track, proj)) store.set('ps:' + track + ':' + proj, n); store.set('last', { track: track, id: proj, t: Date.now() }); },
    resetProj: function (track, proj) { store.set('ps:' + track + ':' + proj, 0); },
    code: function (track, proj, n) { return store.get('code:' + track + ':' + proj + ':' + n, null); },
    saveCode: function (track, proj, n, files) { store.set('code:' + track + ':' + proj + ':' + n, files); },
    ls: function (track, proj) { return store.get('ls:' + track + ':' + proj, {}) || {}; },
    saveLs: function (track, proj, o) { store.set('ls:' + track + ':' + proj, o); },
    last: function () { return store.get('last', null); },
    /* track completion: { done, total, pct } — projects count by completed steps / total steps */
    summary: function (track) {
      var f = XF.flat[track] || [], a = P.all(track), done = 0, total = 0;
      f.forEach(function (it) {
        if (it.type === 'project') { var w = it.steps || 1, s = Math.min(w, P.step(track, it.id)); total += w; done += s; }
        else { total += 1; if (a[it.id]) done += 1; }
      });
      return { done: done, total: total, pct: total ? Math.round(done / total * 100) : 0 };
    },
    itemState: function (track, it) {
      if (it.type === 'project') { var s = P.step(track, it.id); return s >= (it.steps || 1) ? 'done' : s > 0 ? 'part' : ''; }
      return P.isDone(track, it.id) ? 'done' : '';
    }
  };

  /* ───────────── step markers (project files) ─────────────
     A project's files are written ONCE, as the finished code. Regions say from which step a block exists
     (marker lines — HTML: comment with @N; CSS: block comment with @N; JS/PHP: line comment //@N; Python: #@N; close with @/):
        @3 = from step 3 on · @3-8 = only steps 3..8 (replaced later by another region)   Regions may nest.
     stateAt(k) = the file as it looks AFTER step k (k=0 → only the unmarked lines). */
  var OPEN = /^\s*(?:<!--\s*@(\d+)(?:-(\d+))?\s*-->|\/\*\s*@(\d+)(?:-(\d+))?\s*\*\/|\/\/\s*@(\d+)(?:-(\d+))?|#\s*@(\d+)(?:-(\d+))?)\s*$/;
  var CLOSE = /^\s*(?:<!--\s*@\/\s*-->|\/\*\s*@\/\s*\*\/|\/\/\s*@\/|#\s*@\/)\s*$/;
  XF.parseMarkers = function (text) {
    var lines = String(text).replace(/\r\n?/g, '\n').split('\n'), out = [], stack = [], maxStep = 0, errs = [];
    lines.forEach(function (ln, i) {
      var m = OPEN.exec(ln);
      if (m) {
        var g = [0, 1, 2].map(function (n) { return [m[1 + 2 * n], m[2 + 2 * n]]; });
        var a, b; for (var q = 0; q < 4; q++) { var x = m[1 + 2 * q]; if (x != null) { a = +x; b = m[2 + 2 * q] != null ? +m[2 + 2 * q] : Infinity; } }
        stack.push([a, b]); maxStep = Math.max(maxStep, a, b === Infinity ? 0 : b); return;
      }
      if (CLOSE.test(ln)) { if (!stack.length) errs.push('line ' + (i + 1) + ': unmatched close'); stack.pop(); return; }
      out.push({ t: ln, r: stack.slice() });
    });
    if (stack.length) errs.push('unclosed region');
    return {
      max: maxStep, errors: errs,
      at: function (k) {
        return out.filter(function (l) { return l.r.every(function (r) { return k >= r[0] && k <= r[1]; }); }).map(function (l) { return l.t; }).join('\n');
      }
    };
  };
  /* project → { n, files:[names], at(k) → {name:text}, parsed } */
  XF.projModel = function (proj) {
    var names = Object.keys(proj.files), parsed = {}, max = 0, errors = [];
    names.forEach(function (f) { parsed[f] = XF.parseMarkers(proj.files[f]); max = Math.max(max, parsed[f].max); parsed[f].errors.forEach(function (e) { errors.push(f + ' ' + e); }); });
    var n = proj.steps && proj.steps.length ? proj.steps.length : max;
    return {
      n: n, names: names, max: max, errors: errors, parsed: parsed,
      at: function (k) { var o = {}; names.forEach(function (f) { o[f] = parsed[f].at(k); }); return o; }
    };
  };
  /* lines of b that are not in a (LCS) → what a learner has to add; returns [{file, lines:[…], after:'prev line'}] */
  XF.diffAdded = function (a, b) {
    var A = String(a || '').split('\n'), B = String(b || '').split('\n'), n = A.length, m = B.length;
    if (n * m > 4e6) return [{ lines: B, after: '' }];
    var L = []; for (var i = 0; i <= n; i++) L.push(new Int32Array(m + 1));
    for (i = n - 1; i >= 0; i--) for (var j = m - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    var hunks = [], cur = null; i = 0; j = 0;
    while (j < m) {
      if (i < n && A[i] === B[j]) { cur = null; i++; j++; }
      else if (i < n && L[i + 1][j] >= L[i][j + 1]) { i++; }
      else { if (!cur) { cur = { lines: [], after: j > 0 ? B[j - 1] : '' }; hunks.push(cur); } cur.lines.push(B[j]); j++; }
    }
    return hunks;
  };

  /* ───────────── highlighters (python / php; html/css/js come from PXD) ───────────── */
  function sp(c, s) { return '<span class="t-' + c + '">' + esc(s) + '</span>'; }
  var PY_KW = /^(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield|match|case)$/;
  var PY_CONST = /^(?:True|False|None|self|cls)$/;
  var PHP_KW = /^(?:abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|final|finally|fn|for|foreach|function|global|if|implements|include|include_once|instanceof|interface|isset|list|match|namespace|new|or|print|private|protected|public|readonly|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)$/i;
  var PHP_CONST = /^(?:true|false|null|__DIR__|__FILE__|PHP_EOL|PHP_INT_MAX)$/i;
  function tokenize(code, rules) {
    var out = '', i = 0, n = code.length;
    outer: while (i < n) {
      for (var k = 0; k < rules.length; k++) {
        var r = rules[k]; r.re.lastIndex = i; var m = r.re.exec(code);
        if (m && m.index === i && m[0].length) { out += r.f(m[0], m); i += m[0].length; continue outer; }
      }
      out += esc(code[i]); i++;
    }
    return out;
  }
  function rtlSafe(s) { return /[\u0590-\u08FF]/.test(s) ? s.replace(/([\u0590-\u08FF][^\n<]*[\u0590-\u08FF]|[\u0590-\u08FF])/g, '<bdi>$1</bdi>') : s; }
  function hlPy(code) {
    return tokenize(code, [
      { re: /#[^\n]*/y, f: function (s) { return rtlSafe(sp('com', s)); } },
      { re: /[rRbBfF]{0,2}("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')/y, f: function (s) { return rtlSafe(sp('str', s)); } },
      { re: /@[A-Za-z_][\w.]*/y, f: function (s) { return sp('fn', s); } },
      { re: /\b\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y, f: function (s) { return sp('num', s); } },
      { re: /[A-Za-z_]\w*/y, f: function (s, m) { var nx = code.charAt(rules_i(m)); return PY_KW.test(s) ? sp('kw', s) : PY_CONST.test(s) ? sp('kw', s) : /^\s*\(/.test(code.slice(m.index + s.length, m.index + s.length + 3)) ? sp('fn', s) : esc(s); } },
      { re: /[{}()\[\]:,.=+\-*\/%<>!&|^~]+/y, f: function (s) { return sp('pun', s); } }
    ]);
  }
  function rules_i(m) { return m.index; }
  function hlPhp(code) {
    return tokenize(code, [
      { re: /<\?php|<\?=|\?>/y, f: function (s) { return sp('kw', s); } },
      { re: /(?:\/\/|#)[^\n]*|\/\*[\s\S]*?\*\//y, f: function (s) { return rtlSafe(sp('com', s)); } },
      { re: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y, f: function (s) { return rtlSafe(sp('str', s)); } },
      { re: /\$[A-Za-z_]\w*/y, f: function (s) { return sp('attr', s); } },
      { re: /\b\d+(?:\.\d+)?\b/y, f: function (s) { return sp('num', s); } },
      { re: /[A-Za-z_]\w*/y, f: function (s, m) { return PHP_KW.test(s) ? sp('kw', s) : PHP_CONST.test(s) ? sp('num', s) : /^\s*\(/.test(code.slice(m.index + s.length, m.index + s.length + 3)) ? sp('fn', s) : esc(s); } },
      { re: /[{}()\[\];:,.=+\-*\/%<>!&|^~?]+/y, f: function (s) { return sp('pun', s); } }
    ]);
  }
  var baseHL = PXD.highlight;
  PXD.highlight = XF.highlight = function (code, lang) {
    try {
      if (lang === 'python' || lang === 'py') return hlPy(code);
      if (lang === 'php') return hlPhp(code);
      if (lang === 'jsx') return baseHL(code, 'js');
    } catch (e) { }
    return baseHL(code, lang === 'javascript' ? 'js' : lang);
  };

  /* ───────────── sandboxed runner ─────────────
     The learner's page runs in <iframe sandbox="allow-scripts allow-forms allow-modals"> (opaque origin: it can't touch the app).
     Tests are plain JS strings executed INSIDE the frame by an injected runtime, results come back via postMessage.
     localStorage inside the frame is a shim (the real one is blocked by the sandbox) persisted by the app per project. */
  function frameRuntime(ID, LS, CFG) {
    CFG = CFG || {};
    var AF = Object.getPrototypeOf(async function () { }).constructor;
    function post(m) { m.xf = ID; try { parent.postMessage(m, '*'); } catch (e) { } }
    /* storage shim */
    try {
      var mem = {}; for (var k in LS) mem[k] = String(LS[k]);
      var sync = function () { post({ t: 'ls', v: mem }); };
      var shim = {
        getItem: function (k) { return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null; },
        setItem: function (k, v) { mem[k] = String(v); sync(); },
        removeItem: function (k) { delete mem[k]; sync(); },
        clear: function () { mem = {}; sync(); },
        key: function (i) { return Object.keys(mem)[i] || null; },
        get length() { return Object.keys(mem).length; }
      };
      Object.defineProperty(window, 'localStorage', { configurable: true, get: function () { return shim; } });
      Object.defineProperty(window, 'sessionStorage', { configurable: true, get: function () { return shim; } });
    } catch (e) { }
    /* console + errors */
    var errs = [], LOGS = [];
    function fmt(v) {
      try {
        if (typeof v === 'string') return v;
        if (v && v.nodeType === 1) return v.outerHTML;
        if (v instanceof Error) return v.name + ': ' + v.message;
        return JSON.stringify(v, function (k, x) { return typeof x === 'function' ? '[Function]' : x; });
      } catch (e) { return String(v); }
    }
    ['log', 'info', 'warn', 'error', 'debug'].forEach(function (k) {
      var o = console[k]; console[k] = function () { var a = [].slice.call(arguments), msg = a.map(fmt).join(' '); LOGS.push(msg); post({ t: 'log', k: k === 'info' || k === 'debug' ? 'log' : k, m: msg }); try { o.apply(console, a); } catch (e) { } };
    });
    window.addEventListener('error', function (e) { var m = (e.message || 'Error') + (e.lineno ? ' (line ' + e.lineno + ')' : ''); errs.push(m); post({ t: 'log', k: 'error', m: m }); });
    window.addEventListener('unhandledrejection', function (e) { var m = 'Unhandled: ' + fmt(e.reason); errs.push(m); post({ t: 'log', k: 'error', m: m }); });
    /* blocked navigation hint */
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
      var hr = a.getAttribute('href');
      if (/^#/.test(hr) || /^javascript:/i.test(hr)) return;
      e.preventDefault(); post({ t: 'nav', href: hr });
    }, true);
    document.addEventListener('submit', function (e) { if (!e.defaultPrevented) { e.preventDefault(); post({ t: 'log', k: 'warn', m: 'الـ form اتبعت (submit) — في المعاينة مفيش صفحة تانية تتفتح.' }); } }, true);
    /* helpers handed to tests */
    var H = {
      $: function (s) { return document.querySelector(s); },
      $$: function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); },
      css: function (s, p) { var e = document.querySelector(s); if (!e) return ''; var cs = getComputedStyle(e); return (cs.getPropertyValue(p) || cs[p] || '').trim(); },
      txt: function (s) { var e = typeof s === 'string' ? document.querySelector(s) : s; return e ? (e.textContent || '').replace(/\s+/g, ' ').trim() : ''; },
      rgb: function (c) {  /* any CSS colour (hex, rgb, hsl, oklch, named, color()) → normalised 'rgb(r, g, b)' via a canvas pixel */
        try {
          var cv = document.createElement('canvas'); cv.width = cv.height = 1; var x = cv.getContext('2d', { willReadFrequently: true });
          x.fillStyle = '#123456'; x.fillStyle = String(c); if (x.fillStyle === '#123456' && !/^#?123456$/i.test(String(c).trim())) return '';
          x.clearRect(0, 0, 1, 1); x.fillRect(0, 0, 1, 1); var d = x.getImageData(0, 0, 1, 1).data;
          return d[3] === 0 ? 'transparent' : 'rgb(' + d[0] + ', ' + d[1] + ', ' + d[2] + ')' + (d[3] < 255 ? '/' + d[3] : '');
        } catch (e) { return ''; }
      },
      colorIs: function (s, p, c) {  /* same colour, ±4 per channel (oklch → sRGB rounding) */
        var a = /(\d+), (\d+), (\d+)/.exec(H.rgb(H.css(s, p))), b = /(\d+), (\d+), (\d+)/.exec(H.rgb(c));
        if (!a || !b) return H.rgb(H.css(s, p)) === H.rgb(c) && !!H.rgb(c);
        return Math.abs(a[1] - b[1]) <= 4 && Math.abs(a[2] - b[2]) <= 4 && Math.abs(a[3] - b[3]) <= 4;
      },
      rect: function (s) { var e = document.querySelector(s); return e ? e.getBoundingClientRect() : null; },
      wait: function (ms) { return new Promise(function (r) { setTimeout(r, ms || 0); }); },
      click: function (s) { var e = typeof s === 'string' ? document.querySelector(s) : s; if (e) e.click(); return !!e; },
      type: function (s, v) { var e = typeof s === 'string' ? document.querySelector(s) : s; if (!e) return false; e.focus && e.focus(); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); return true; },
      check: function (s, v) { var e = document.querySelector(s); if (!e) return false; e.checked = v !== false; e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); return true; },
      submit: function (s) { var f = typeof s === 'string' ? document.querySelector(s) : s; if (!f) return false; var ev = new Event('submit', { bubbles: true, cancelable: true }); f.dispatchEvent(ev); return true; },
      key: function (s, k) { var e = document.querySelector(s) || document; e.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true })); e.dispatchEvent(new KeyboardEvent('keyup', { key: k, bubbles: true })); },
      ls: function (k) { return shim ? shim.getItem(k) : null; },
      logs: LOGS, out: function () { return LOGS.join('\n'); },
      ev: function (code) { return (0, eval)(code); },   /* evaluate in the learner's global scope: sees top-level let / const / function too */
      win: window, doc: document
    };
    window.addEventListener('message', function (e) {
      var d = e.data; if (!d || d.xf !== ID) return;
      if (d.t === 'run') {
        (async function () {
          var res = []; if (CFG.settle) await new Promise(function (r) { setTimeout(r, CFG.settle); });
          for (var i = 0; i < d.tests.length; i++) {
            var body = String(d.tests[i]), ok = false, msg = '';
            try {
              var code = /(^|[\s;{(])return[\s(]/.test(body) || /;\s*\S/.test(body.trim()) || /\n/.test(body.trim()) ? body : 'return (' + body + ')';
              var fn = new AF('H', 'src', 'errors', 'with(H){' + code + '\n}');
              var r = await fn(H, d.src || {}, errs.slice());
              ok = !!r; if (typeof r === 'string' && r) { ok = false; msg = r; }
            } catch (er) { ok = false; msg = String(er && er.message || er); }
            res.push({ ok: ok, msg: msg });
          }
          post({ t: 'results', id: d.id, res: res });
        })();
      } else if (d.t === 'ping') post({ t: 'pong', id: d.id });
    });
    window.addEventListener('load', function () { post({ t: 'load' }); });
    if (document.readyState === 'complete') post({ t: 'load' });
  }
  XF.frameRuntime = frameRuntime;

  /* runtimes: vendored browser builds are inlined into the (sandboxed, opaque-origin) preview when the learner includes the matching CDN <script> tag */
  XF.vendor = XF.vendor || {};
  XF.needVendor = function (name) { return XF.vendor[name] ? Promise.resolve() : loadScript(XF.base + 'vendor/' + name + '.str.js'); };
  function inlineScript(code) { return '<script data-vendor>' + code.replace(/<\/script/gi, '<\\/script') + '<' + '/script>'; }
  XF.runtimes = {
    tailwind: {
      settle: 140, vendor: 'tailwind',
      rewrite: function (src) { return src.replace(/<script\b[^>]*\bsrc\s*=\s*["']?https?:\/\/cdn\.jsdelivr\.net\/npm\/@tailwindcss\/browser[^"'\s>]*["']?[^>]*>\s*<\/script>/gi, function () { return inlineScript(XF.vendor.tailwind || ''); }); }
    },
    react: { settle: 120 }
  };
  var BASE_STYLE = '<style data-xf>:root{color-scheme:light}html{background:#fff}body{font-family:"Segoe UI",Tahoma,Arial,system-ui,sans-serif;line-height:1.7}</style>';
  /* files → one srcdoc. <link href="x.css"> and <script src="x.js"> that point at a project file are inlined; unlinked files are NOT applied
     (so "link your stylesheet" is a real step). */
  XF.buildDoc = function (files, entry, id, ls, o) {
    o = o || {};
    var src = files[entry] != null ? files[entry] : '';
    var runtime = o.runtime || '', RT = XF.runtimes[runtime] || {};
    var rt = '<script>(' + frameRuntime.toString() + ')(' + JSON.stringify(id) + ',' + JSON.stringify(ls || {}) + ',' + JSON.stringify({ settle: RT.settle || 0 }) + ')<' + '/script>';
    var dir = /^(?:\.\/)?/;
    src = src.replace(/<link\b[^>]*>/gi, function (tag) {
      var h = /href\s*=\s*["']?([^"'\s>]+)/i.exec(tag), rel = /rel\s*=\s*["']?stylesheet/i.test(tag);
      if (!h || !rel) return tag;
      var f = h[1].replace(/^\.\//, ''); return files[f] != null ? '<style data-file="' + esc(f) + '">\n' + files[f] + '\n</style>' : tag;
    });
    src = src.replace(/<script\b([^>]*?)\bsrc\s*=\s*["']?([^"'\s>]+)["']?([^>]*)>\s*<\/script>/gi, function (tag, a, f, b) {
      f = f.replace(/^\.\//, ''); if (files[f] == null) return tag;
      var type = /type\s*=\s*["']([^"']+)/i.exec(a + b);
      return '<script' + (type ? ' type="' + type[1] + '"' : '') + ' data-file="' + esc(f) + '">\n' + files[f].replace(/<\/script/gi, '<\\/script') + '\n</' + 'script>';
    });
    if (RT.rewrite) src = RT.rewrite(src);
    if (o.extraHead) rt = o.extraHead + rt;
    var full = /<!doctype|<html[\s>]/i.test(src);
    if (full) {
      if (/<head[^>]*>/i.test(src)) return src.replace(/<head[^>]*>/i, function (m) { return m + rt; });
      if (/<html[^>]*>/i.test(src)) return src.replace(/<html[^>]*>/i, function (m) { return m + '<head>' + rt + '</head>'; });
      return rt + src;
    }
    return '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + BASE_STYLE + rt + '</head><body>' + src + '</body></html>';
  };

  /* Preview: owns one iframe. load(files, entry) re-renders; run(tests, src) → Promise<[{ok,msg}]>; onlog(k, m); onstore(v); onnav(href) */
  var uid = 0, previews = {};
  window.addEventListener('message', function (e) {
    var d = e.data; if (!d || !d.xf) return; var pv = previews[d.xf]; if (!pv || e.source !== pv.frame.contentWindow) return;
    if (d.t === 'load') { pv._loaded = true; var w = pv._wait; pv._wait = []; w.forEach(function (f) { f(); }); }
    else if (d.t === 'log') pv.onlog && pv.onlog(d.k, d.m);
    else if (d.t === 'ls') pv.onstore && pv.onstore(d.v);
    else if (d.t === 'nav') pv.onnav && pv.onnav(d.href);
    else if (d.t === 'results') { var cb = pv._res[d.id]; if (cb) { delete pv._res[d.id]; cb(d.res); } }
  });
  XF.Preview = function (frame, opts) {
    opts = opts || {};
    var id = 'pv' + (++uid), self = { id: id, frame: frame, _loaded: false, _wait: [], _res: {}, ls: opts.ls || {}, onlog: opts.onlog, onstore: null, onnav: opts.onnav };
    previews[id] = self; var seq = 0, loadSeq = 0;
    self.onstore = function (v) { self.ls = v; opts.onstore && opts.onstore(v); };
    self.load = function (files, entry) {
      self._loaded = false; self._wait = []; var my = ++loadSeq, RT = XF.runtimes[opts.runtime || ''];
      frame.setAttribute('sandbox', 'allow-scripts allow-forms allow-modals');
      (RT && RT.vendor ? XF.needVendor(RT.vendor) : Promise.resolve()).catch(function () { }).then(function () {
        if (my !== loadSeq) return; frame.srcdoc = XF.buildDoc(files, entry, id, self.ls, { runtime: opts.runtime });
      });
    };
    self.ready = function () { return new Promise(function (r) { if (self._loaded) r(); else self._wait.push(r); setTimeout(r, 4000); }); };
    self.run = function (tests, src) {
      return self.ready().then(function () {
        return new Promise(function (res) {
          var rid = ++seq, to = setTimeout(function () { delete self._res[rid]; res(tests.map(function () { return { ok: false, msg: 'timeout' }; })); }, 8000);
          self._res[rid] = function (r) { clearTimeout(to); res(r); };
          setTimeout(function () { try { frame.contentWindow.postMessage({ xf: id, t: 'run', id: rid, tests: tests, src: src }, '*'); } catch (e) { res([]); } }, 30);
        });
      });
    };
    self.destroy = function () { delete previews[id]; };
    return self;
  };

  /* tests are [desc, js] or [desc, js, {vp}]. They run in a FRESH off-screen copy of the page (fixed width 900px, or the test's own vp width),
     so results never depend on the learner's screen size or on what they clicked in the visible preview.
     cfg = { files, entry, runtime, ls } → Promise<[{d, ok, msg}]> */
  function runGroup(cfg, js, src, width) {
    return new Promise(function (done) {
      var f = document.createElement('iframe'); f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1; f.title = 'test-runner';
      f.style.cssText = 'position:fixed;left:-12000px;top:0;width:' + width + 'px;height:700px;border:0;opacity:0;pointer-events:none';
      document.body.appendChild(f);
      var pv = XF.Preview(f, { runtime: cfg.runtime, ls: JSON.parse(JSON.stringify(cfg.ls || {})) });
      pv.load(cfg.files, cfg.entry);
      pv.run(js, src).then(function (r) { pv.destroy(); f.remove(); done(r); }, function () { pv.destroy(); f.remove(); done([]); });
    });
  }
  XF.runTests = function (cfg, tests) {
    var srcFiles = cfg.files, src = { files: srcFiles }; Object.keys(srcFiles).forEach(function (f) { var ext = f.split('.').pop(); src[ext] = srcFiles[f]; if (/^index\./.test(f)) src.main = srcFiles[f]; });
    var groups = {}, order = [];
    tests.forEach(function (t, i) { var vp = (t[2] && t[2].vp) || 900; if (!groups[vp]) { groups[vp] = []; order.push(vp); } groups[vp].push(i); });
    var out = new Array(tests.length);
    return order.reduce(function (p, vp) {
      return p.then(function () {
        var idxs = groups[vp];
        return runGroup(cfg, idxs.map(function (i) { return tests[i][1]; }), src, +vp).then(function (r) { idxs.forEach(function (ti, k) { out[ti] = { d: tests[ti][0], ok: !!(r[k] && r[k].ok), msg: (r[k] && r[k].msg) || '' }; }); });
      });
    }, Promise.resolve()).then(function () { return out; });
  };

  XF.fmtTime = function (m) { return m >= 60 ? Math.floor(m / 60) + ' ساعة' + (m % 60 ? ' و' + (m % 60) + ' دقيقة' : '') : m + ' دقيقة'; };
})();
