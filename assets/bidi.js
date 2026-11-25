/* PhineX — bidi.js
   Keeps English / code tokens readable inside Arabic text.
   Problem: in an RTL paragraph, neutral characters next to a Latin word — "()", ":", "-", "." —
   take the paragraph direction, so  "linear-gradient()"  shows up as  "()linear-gradient".
   Fix: wrap every Latin run (a word, a function call, or a short English phrase) in
   <bdi dir="ltr" class="px-l"> so it becomes an isolated LTR island and keeps its own order. */
(function () {
  'use strict';
  if (window.pxBidi) return;

  var W = "[A-Za-z0-9@#$_./<][A-Za-z0-9@#$_.\\/%+*=<>:()\\[\\]{}'\"~^|\\\\&!?,;\\-]*";
  var RE = new RegExp(W + "(?:[ \\u00a0]+" + W + ")*", "g");
  var SKIP = /^(CODE|PRE|SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|OPTION|BDI|SVG|KBD|SAMP|IFRAME|NOSCRIPT|CANVAS|TITLE|HEAD)$/;
  var HAS_LATIN = /[A-Za-z]/;
  var HAS_AR = /[؀-ۿ]/;

  function balance(tok) {
    // trim trailing sentence punctuation and unmatched closing brackets
    var changed = true;
    while (changed) {
      changed = false;
      var t = tok.replace(/[.,:;!?]+$/, '');
      if (t !== tok) { tok = t; changed = true; }
      var last = tok.charAt(tok.length - 1);
      var pairs = { ')': '(', ']': '[', '}': '{' };
      if (pairs[last]) {
        var open = pairs[last], o = 0, c = 0;
        for (var i = 0; i < tok.length; i++) { var ch = tok.charAt(i); if (ch === open) o++; else if (ch === last) c++; }
        if (c > o) { tok = tok.slice(0, -1); changed = true; }
      }
    }
    // trim leading unmatched '<' that is not a tag/arrow (e.g. "<=" is fine, lone "<" is not)
    return tok;
  }

  function skipNode(node) {
    var p = node.parentNode;
    while (p && p.nodeType === 1) {
      if (SKIP.test(p.nodeName.toUpperCase())) return true;
      if (p.hasAttribute && (p.hasAttribute('data-no-bidi') || p.getAttribute('contenteditable') === 'true')) return true;
      if (p.getAttribute && p.getAttribute('dir') === 'ltr') return true;
      p = p.parentNode;
    }
    return false;
  }

  function wrapText(tn) {
    var s = tn.nodeValue;
    if (!s || !HAS_LATIN.test(s)) return;
    // only needed when the text node is mixed with Arabic or sits next to Arabic siblings
    var mixed = HAS_AR.test(s);
    if (!mixed) {
      var sib = tn.previousSibling, nxt = tn.nextSibling;
      mixed = (sib && HAS_AR.test(sib.textContent || '')) || (nxt && HAS_AR.test(nxt.textContent || '')) ||
              (tn.parentNode && HAS_AR.test((tn.parentNode.textContent || '').slice(0, 400)));
    }
    // Latin-only text still garbles when it carries brackets/colons ("linear-gradient()") in an RTL page
    if (!mixed && !/[^A-Za-z0-9 \u00a0]/.test(s.trim())) return;
    RE.lastIndex = 0;
    var m, last = 0, frag = null;
    while ((m = RE.exec(s))) {
      var raw = m[0], tok = balance(raw);
      if (!HAS_LATIN.test(tok)) continue;
      var start = m.index;
      if (!frag) frag = document.createDocumentFragment();
      if (start > last) frag.appendChild(document.createTextNode(s.slice(last, start)));
      var b = document.createElement('bdi');
      b.setAttribute('dir', 'ltr'); b.className = 'px-l';
      b.textContent = tok;
      frag.appendChild(b);
      last = start + tok.length;
      RE.lastIndex = last;
    }
    if (!frag) return;
    if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
    var par = tn.parentNode, out = frag;
    // in a flex/grid container every child becomes its own flex item: keep the text as ONE item (like before)
    try {
      if (par.nodeType === 1 && /flex|grid/.test(getComputedStyle(par).display)) {
        var sp = document.createElement('span'); sp.className = 'px-t'; sp.appendChild(frag); out = sp;
      }
    } catch (e) {}
    par.replaceChild(out, tn);
  }

  function run(root) {
    root = root || document.body;
    if (!root) return;
    if (root.nodeType === 3) { if (!skipNode(root)) wrapText(root); return; }
    if (root.nodeType !== 1 && root.nodeType !== 11) return;
    var tw = document.createTreeWalker(root, 4, {
      acceptNode: function (n) {
        if (!HAS_LATIN.test(n.nodeValue)) return 3;
        return skipNode(n) ? 3 : 1;
      }
    });
    var list = [], n;
    while ((n = tw.nextNode())) list.push(n);
    for (var i = 0; i < list.length; i++) wrapText(list[i]);
  }

  var busy = false, queue = [], timer = 0, obs = null;
  function flush() {
    timer = 0; busy = true;
    var q = queue; queue = [];
    for (var i = 0; i < q.length; i++) { if (q[i].isConnected) run(q[i]); }
    if (obs) obs.takeRecords();
    busy = false;
  }
  function start() {
    run(document.body);
    if (!window.MutationObserver) return;
    obs = new MutationObserver(function (recs) {
      if (busy) return;
      for (var i = 0; i < recs.length; i++) {
        var a = recs[i].addedNodes;
        for (var j = 0; j < a.length; j++) {
          var nd = a[j];
          if (nd.nodeType === 3 || (nd.nodeType === 1 && nd.nodeName !== 'BDI')) queue.push(nd);
        }
      }
      if (queue.length && !timer) timer = (window.requestAnimationFrame || setTimeout)(flush);
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  window.pxBidi = { run: run };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
