/* PhineX Docs — core: data registry, helpers, inline markup, syntax highlighter */
(function () {
  'use strict';
  var PXD = window.PXD = { idx: {}, byId: {}, order: {}, data: {}, loaded: {}, waiters: {}, ver: '1' };

  /* ── helpers ── */
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k === 'text') e.textContent = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    });
    (kids || []).forEach(function (c) { if (c != null) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('pxd:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('pxd:' + k, JSON.stringify(v)); } catch (e) { } }
  };
  var AR_FIX = function (s) {
    return String(s || '').toLowerCase().replace(/[ً-ٰٟ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ـ/g, '');
  };
  PXD.esc = esc; PXD.$ = $; PXD.$$ = $$; PXD.h = h; PXD.store = store; PXD.norm = AR_FIX;

  /* ── registry ── */
  PXD.setIndex = function (lib, idx) {
    PXD.idx[lib] = idx; PXD.byId[lib] = {}; PXD.order[lib] = [];
    PXD.data[lib] = PXD.data[lib] || {};
    idx.cats.forEach(function (c) {
      c.items.forEach(function (it) {
        it.lib = lib; it.cat = c.id; it.catName = c.name; it.catIcon = c.icon;
        PXD.byId[lib][it.id] = it;
        PXD.order[lib].push(it.id);
      });
    });
  };
  PXD.provide = function (lib, cat, arr) {
    PXD.data[lib] = PXD.data[lib] || {};
    arr.forEach(function (e) { PXD.data[lib][e.id] = e; });
    PXD.loaded[lib + ':' + cat] = true;
    var w = PXD.waiters[lib + ':' + cat]; if (w) { w.forEach(function (f) { f(); }); delete PXD.waiters[lib + ':' + cat]; }
  };
  PXD.load = function (lib, cat) {
    var key = lib + ':' + cat;
    return new Promise(function (res, rej) {
      if (PXD.loaded[key]) return res();
      (PXD.waiters[key] = PXD.waiters[key] || []).push(res);
      if (PXD.waiters[key].length > 1) return;
      var s = document.createElement('script');
      s.src = 'data/' + lib + '/c-' + cat + '.js?v=' + PXD.ver;
      s.onerror = function () { delete PXD.waiters[key]; rej(new Error('load ' + key)); };
      document.head.appendChild(s);
    });
  };
  PXD.info = function (id, lib) { return (PXD.byId[lib || 'html'] || {})[id] || null; };
  PXD.href = function (id, sec, lib) { return '#/' + (lib || 'html') + '/' + id + (sec ? '/' + sec : ''); };
  PXD.hrefOf = function (it, sec) { return PXD.href(it.id, sec, it.lib); };
  /* exact-text → entry map for auto-linking `:hover`, `@media`, `calc()`, `margin-top`… inside code spans */
  var refMap = null;
  PXD.refMap = function () {
    if (refMap) return refMap;
    refMap = {};
    Object.keys(PXD.byId).forEach(function (lib) {
      if (lib === 'html') return;
      PXD.order[lib].forEach(function (id) {
        var it = PXD.byId[lib][id], c = it.chip;
        if (!c || it.kind === 'guide') return;
        var ok = /^(:|@)/.test(c) || /\)$/.test(c) || (it.kind === 'property' && /^-?[a-z]+(-[a-z]+)+$/.test(c)) || it.kind === 'datatype';
        if (ok && !refMap[c]) refMap[c] = it;
      });
    });
    return refMap;
  };
  PXD.resolve = function (ref, lib) {
    var m = /^(html|css):(.+)$/.exec(ref);
    if (m) return PXD.info(m[2].trim(), m[1]);
    return PXD.info(ref, lib || 'html') || null;
  };
  PXD.label = function (it) {
    if (it.kind === 'element') return '<' + it.tag + '>';
    return it.chip || it.label || it.title;
  };

  /* ── inline markup ── */
  function itLink(it, label, ctx) {
    var self = ctx && ctx.self === it.id && (ctx.lib || 'html') === it.lib;
    var cls = it.pending ? ' pend' : '', lbl = it.lib === 'html' && it.kind === 'element' ? '<' + it.tag + '>' : null;
    var attrs = ' href="' + PXD.hrefOf(it) + '" data-id="' + it.id + '" data-lib="' + it.lib + '"';
    if (ctx && ctx.noLink) return label ? esc(label) : (lbl ? '<code>' + esc(lbl) + '</code>' : esc(it.title));
    if (!label && lbl) {
      if (self) return '<code class="self">' + esc(lbl) + '</code>';
      return '<a class="el-link' + cls + '"' + attrs + '><code>' + esc(lbl) + '</code></a>';
    }
    if (!label && it.lib === 'css' && it.kind !== 'guide' && it.chip && !/\s/.test(it.chip)) {
      if (self) return '<code class="self">' + esc(it.chip) + '</code>';
      return '<a class="el-link' + cls + '"' + attrs + '><code>' + esc(it.chip) + '</code></a>';
    }
    return '<a class="doc-link' + cls + '"' + attrs + '>' + (label || esc(it.title)) + '</a>';
  }
  function docLink(id, label, ctx) {
    var it = PXD.resolve(id, ctx && ctx.lib);
    if (!it) return esc(label || id);
    return itLink(it, label, ctx);
  }
  function rich(s, ctx) {
    s = esc(s);
    s = s.replace(/\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g, function (m, id, label) { return docLink(id.trim(), label, ctx); });
    s = s.replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[\s(،«])\*([^*\s][^*]*?)\*(?=[\s).،,:;!؟?»]|$)/g, '$1<em>$2</em>');
    return s;
  }
  function codeSpan(raw, ctx) {
    if (ctx && ctx.noLink) return '<code>' + esc(raw) + '</code>';
    var cl = (ctx && ctx.lib) || 'html', me = ctx && ctx.self;
    var it = null, id = null, m = /^<\/?([a-zA-Z][a-zA-Z0-9-]*)(\s[^>]*)?\/?>$/.exec(raw);
    var rm = PXD.refMap();
    if (rm[raw]) it = rm[raw];
    else if (m) { id = m[1].toLowerCase(); it = PXD.info(id, 'html'); }
    else if (/^<!doctype(\s+html)?>$/i.test(raw)) it = PXD.info('doctype', 'html');
    else if (/^<!--[\s\S]*-->$/.test(raw)) it = PXD.info('comment', 'html');
    if (it && !(me === it.id && cl === it.lib)) {
      return '<a class="el-link' + (it.pending ? ' pend' : '') + '" href="' + PXD.hrefOf(it) + '" data-id="' + it.id + '" data-lib="' + it.lib + '"><code>' + esc(raw) + '</code></a>';
    }
    return '<code' + (it && me === it.id && cl === it.lib ? ' class="self"' : '') + '>' + esc(raw) + '</code>';
  }
  PXD.inline = function (text, ctx) {
    var spans = [];
    text = String(text).replace(/`([^`]+)`/g, function (m, c) { spans.push(c); return '\u0001' + (spans.length - 1) + '\u0002'; });
    function fin(s, c) { return rich(s, c).replace(/\u0001(\d+)\u0002/g, function (_, i) { return codeSpan(spans[+i], c); }); }
    var out = '', last = 0, re = /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g, m, plain = { noLink: true };
    while ((m = re.exec(text))) {
      out += fin(text.slice(last, m.index), ctx) + '<a href="' + esc(m[2]) + '" target="_blank" rel="noopener noreferrer">' + fin(m[1], plain) + '</a>';
      last = m.index + m[0].length;
    }
    return out + fin(text.slice(last), ctx);
  };

  /* ── syntax highlighter ── */
  var RTL_RUN = '[\\u0590-\\u08FF\\uFB1D-\\uFDFF\\uFE70-\\uFEFF\\u200F]';
  var RTL_RE = RTL_RUN + '(?:[^\\n]*' + RTL_RUN + ')?';
  function rtlWrap(s, f) {
    var re = new RegExp(RTL_RE, 'g'), out = '', last = 0, m;
    while ((m = re.exec(s))) { out += f(s.slice(last, m.index)) + '<bdi>' + f(m[0]) + '</bdi>'; last = m.index + m[0].length; }
    return out + f(s.slice(last));
  }
  function escEnt(x) { return esc(x).replace(/&amp;([#\w]+;)/g, '<span class="t-ent">&amp;$1</span>'); }
  function sp(c, s) { return '<span class="t-' + c + '">' + rtlWrap(s, esc) + '</span>'; }
  var JS_KW = /^(?:var|let|const|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|super|this|typeof|instanceof|in|of|import|export|from|default|try|catch|finally|throw|async|await|yield|delete|void|static|get|set)$/;
  var JS_CONST = /^(?:true|false|null|undefined|NaN|Infinity)$/;
  function hlJs(src) {
    var out = '', re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\[\s\S]|[^`\\])*`)|(\b\d[\d_]*\.?\d*(?:e[+-]?\d+)?\b|\b0x[0-9a-f]+\b)|([A-Za-z_$][\w$]*)|([\s\S])/gi, m;
    while ((m = re.exec(src))) {
      if (m[1]) out += sp('com', m[1]);
      else if (m[2]) out += sp('str', m[2]);
      else if (m[3]) out += sp('num', m[3]);
      else if (m[4]) {
        var w = m[4];
        if (JS_KW.test(w)) out += sp('kw', w);
        else if (JS_CONST.test(w)) out += sp('num', w);
        else if (src.charAt(re.lastIndex) === '(') out += sp('fn', w);
        else out += esc(w);
      } else out += /[{}()[\];,.=+\-*\/<>!&|?:]/.test(m[5]) ? sp('pun', m[5]) : esc(m[5]);
    }
    return out;
  }
  function hlCss(src) {
    var out = '', re = /(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(\s+)|([{};:,()])|([^\s{};:,()"'\/]+|\/)/g, m;
    var stack = [], pre = '', inVal = false, ctxDecl = false;
    function top() { return stack.length ? stack[stack.length - 1] : 'rules'; }
    while ((m = re.exec(src))) {
      if (m[1]) { out += sp('com', m[1]); continue; }
      if (m[2]) { out += sp('str', m[2]); if (top() === 'rules') pre += m[2]; continue; }
      if (m[3]) { out += esc(m[3]); if (top() === 'rules') pre += m[3]; continue; }
      if (m[4]) {
        var c = m[4];
        if (c === '{') {
          var p = pre.trim();
          stack.push(/^@(media|supports|layer|container|keyframes|-webkit-keyframes|document|scope)\b/.test(p) ? 'rules' : 'decl');
          pre = ''; inVal = false;
        } else if (c === '}') { stack.pop(); pre = ''; inVal = false; }
        else if (c === ';') { inVal = false; if (top() === 'rules') pre = ''; }
        else if (c === ':' && top() === 'decl' && !inVal) { inVal = true; }
        else if (top() === 'rules') pre += c;
        out += sp('pun', c); continue;
      }
      var t = m[5];
      if (top() === 'rules') {
        pre += t;
        out += t.charAt(0) === '@' ? sp('kw', t) : sp('sel', t);
      } else if (!inVal) {
        out += sp('prop', t);
      } else {
        if (/^-?\d*\.?\d+(%|[a-z]+)?$/i.test(t) || /^#[0-9a-f]{3,8}$/i.test(t)) out += sp('num', t);
        else if (/^!important$/i.test(t)) out += sp('kw', t);
        else if (src.charAt(re.lastIndex) === '(') out += sp('fn', t);
        else out += esc(t);
      }
    }
    return out;
  }
  var reWs = /\s+/y, reAttr = /[^\s"'<>\/=]+/y, reEq = /\s*=\s*/y, reQ = /"[^"]*"|'[^']*'/y, reUnq = /[^\s"'=<>`]+/y, reEnd = /\/?>/y;
  function hlHtml(src) {
    var out = '', i = 0, n = src.length;
    function mt(re, pos) { re.lastIndex = pos; return re.exec(src); }
    while (i < n) {
      var ch = src.charAt(i);
      if (ch === '<') {
        if (src.substr(i, 4) === '<!--') { var e = src.indexOf('-->', i + 4); e = e < 0 ? n : e + 3; out += sp('com', src.slice(i, e)); i = e; continue; }
        var dm = /^<!doctype[^>]*>/i.exec(src.slice(i, i + 200));
        if (dm) { out += sp('dt', dm[0]); i += dm[0].length; continue; }
        var tm = /^<(\/?)([a-zA-Z][\w:-]*)/.exec(src.slice(i, i + 80));
        if (tm) {
          var name = tm[2], closing = !!tm[1], j = i + tm[0].length, r;
          out += sp('pun', '<' + tm[1]) + sp('tag', name);
          for (var guard = 0; j < n && guard < 4000; guard++) {
            if ((r = mt(reWs, j))) { out += esc(r[0]); j += r[0].length; continue; }
            if ((r = mt(reEnd, j))) { out += sp('pun', r[0]); j += r[0].length; break; }
            if ((r = mt(reAttr, j))) {
              out += sp('attr', r[0]); j += r[0].length;
              if ((r = mt(reEq, j))) {
                out += sp('pun', r[0]); j += r[0].length;
                if ((r = mt(reQ, j)) || (r = mt(reUnq, j))) {
                  out += '<span class="t-val">' + rtlWrap(r[0], escEnt) + '</span>'; j += r[0].length;
                }
              }
              continue;
            }
            out += esc(src.charAt(j)); j++;
          }
          i = j;
          var lname = name.toLowerCase();
          if (!closing && (lname === 'script' || lname === 'style')) {
            var rx = new RegExp('</' + lname + '\\b', 'i'), rest = src.slice(i), em = rx.exec(rest);
            var raw = em ? rest.slice(0, em.index) : rest;
            out += lname === 'script' ? hlJs(raw) : hlCss(raw);
            i += raw.length;
          }
          continue;
        }
      }
      var k = src.indexOf('<', i + 1); if (k < 0) k = n;
      out += rtlWrap(src.slice(i, k), escEnt);
      i = k;
    }
    return out;
  }
  PXD.highlight = function (code, lang) {
    try {
      if (lang === 'html') return hlHtml(code);
      if (lang === 'css') return hlCss(code);
      if (lang === 'js') return hlJs(code);
    } catch (e) { }
    return esc(code);
  };
})();
