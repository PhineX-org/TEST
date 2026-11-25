/* X Code — learn view helpers: lesson blocks, quiz, checklists, small effects. */
(function () {
  'use strict';
  var PXD = window.PXD, XF = window.XF, h = PXD.h, esc = PXD.esc, store = PXD.store;
  var V = XF.view = XF.view || {};
  var inl = function (s, c) { return PXD.inline(s == null ? '' : s, c || { noLink: true }); };
  var CO = { tip: ['💡', 'نصيحة'], warn: ['⚠️', 'تحذير'], note: ['📌', 'ملحوظة'], analogy: ['🎯', 'تشبيه'], key: ['🔑', 'المهم'] };
  var LNAME = { html: 'HTML', css: 'CSS', js: 'JavaScript', javascript: 'JavaScript', jsx: 'JSX', python: 'Python', py: 'Python', php: 'PHP', text: 'TEXT', bash: 'TERMINAL', json: 'JSON' };

  function code(b) {
    var el = PXD.codeBlock(b.code, b.lang || 'text', b.bad ? 'bad' : b.good ? 'good' : '');
    var l = el.querySelector('.lang'); if (l) l.textContent = b.title ? b.title : (LNAME[b.lang] || b.lang || 'TEXT');
    if (b.title && l) l.style.textTransform = 'none';
    return el;
  }

  /* blocks(arr, ctx) → DocumentFragment. ctx = {track, id, n (block counter), onTry} */
  V.blocks = function (arr, ctx) {
    ctx = ctx || {}; ctx.n = ctx.n || 0;
    var frag = document.createDocumentFragment();
    (arr || []).forEach(function (b) {
      if (typeof b === 'string') b = { t: 'p', x: b };
      ctx.n++;
      var t = b.t, el = null;
      if (t === 'p') el = h('p', { html: inl(b.x, ctx) });
      else if (t === 'h') el = h('h3', { html: inl(b.x, ctx) });
      else if (t === 'ul' || t === 'ol') {
        el = h(t, { class: b.cls || '' }, (b.items || []).map(function (i) { return h('li', { html: inl(typeof i === 'string' ? i : i.x, ctx) }); }));
      } else if (t === 'callout') {
        var c = CO[b.kind] || CO.note, paras = b.paras || [b.x];
        el = h('div', { class: 'co ' + (b.kind || 'note') }, [h('span', { class: 'ci', 'aria-hidden': 'true' }, [c[0]]),
          h('div', { class: 'cb' }, [h('span', { class: 'ch' }, [b.title || c[1]])].concat(paras.map(function (p) { return h('p', { html: inl(p, ctx) }); })))]);
      } else if (t === 'code') el = code(b);
      else if (t === 'live') {
        var tmp = PXD.view.blocks([{ t: 'code', live: true, lang: 'html', code: b.code, h: b.h }]);
        el = h('div', { class: 'livex' }); el.appendChild(tmp);
        if (b.title) el.insertBefore(h('div', { class: 'livex-t' }, [b.title]), el.firstChild);
      } else if (t === 'out') {
        el = h('div', { class: 'outx' }, [h('span', { class: 'outx-h' }, [b.title || 'الناتج']), h('pre', {}, [b.x != null ? b.x : b.code])]);
      } else if (t === 'table') {
        el = h('table', { class: 'xt' }, [
          h('thead', {}, [h('tr', {}, (b.head || []).map(function (c) { return h('th', { html: inl(c, ctx) }); }))]),
          h('tbody', {}, (b.rows || []).map(function (r) { return h('tr', {}, r.map(function (c) { return h('td', { html: inl(c, ctx) }); })); }))
        ]);
      } else if (t === 'steps') {
        el = h('ol', { class: 'stepsx' }, (b.items || []).map(function (i) {
          return h('li', {}, [h('b', { html: inl(i.t || i.title || '', ctx) }), i.x ? h('span', { html: inl(i.x, ctx) }) : null]);
        }));
      } else if (t === 'terms') {
        el = h('dl', {}, [].concat.apply([], (b.items || []).map(function (i) { return [h('dt', { html: inl(i.k, ctx) }), h('dd', { html: inl(i.v, ctx) })]; })));
      } else if (t === 'compare') {
        el = h('div', { class: 'mk' }, [b.title ? h('h3', { html: inl(b.title, ctx) }) : null,
          h('div', { class: 'pair' }, [
            h('div', {}, [h('span', { class: 'lbl b' }, [b.badLabel || '❌ غلط']), code({ code: b.bad.code, lang: b.bad.lang || b.lang || 'html', bad: true }), b.bad.x ? h('p', { class: 'cmp-x', html: inl(b.bad.x, ctx) }) : null]),
            h('div', {}, [h('span', { class: 'lbl g' }, [b.goodLabel || '✅ صح']), code({ code: b.good.code, lang: b.good.lang || b.lang || 'html', good: true }), b.good.x ? h('p', { class: 'cmp-x', html: inl(b.good.x, ctx) }) : null])
          ])]);
      } else if (t === 'check') {
        var key = 'chk:' + (ctx.track || '') + ':' + (ctx.id || '') + ':' + ctx.n, saved = store.get(key, []);
        el = h('ul', { class: 'chklist' }, (b.items || []).map(function (i, k) {
          var cb = h('input', { type: 'checkbox' }); cb.checked = saved.indexOf(k) >= 0;
          cb.addEventListener('change', function () { var s = store.get(key, []).filter(function (x) { return x !== k; }); if (cb.checked) s.push(k); store.set(key, s); });
          return h('li', {}, [h('label', { class: 'chk' }, [cb, h('span', { html: inl(i, ctx) })])]);
        }));
      } else if (t === 'quiz') el = V.quiz(b.items, ctx, { id: b.id || ('q' + ctx.n), title: b.title });
      else if (t === 'try') el = V.tryBlock(b, ctx);
      else if (t === 'img') el = h('figure', { class: 'figx' }, [h('img', { src: b.src, alt: b.alt || '', loading: 'lazy' }), b.cap ? h('figcaption', {}, [b.cap]) : null]);
      if (el) frag.appendChild(el);
    });
    return frag;
  };

  /* ───────────── quiz ───────────── */
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* items: [{q, o:[…], a:index, why, code:{lang,code}}]   opts: {id, title, onDone(score,total), pass:0.7, noShuffle} */
  V.quiz = function (items, ctx, opts) {
    opts = opts || {}; ctx = ctx || {};
    var key = 'quiz:' + (ctx.track || '') + ':' + (opts.id || ctx.id || 'q'), total = items.length, i = 0, score = 0, order = [], answered = false;
    var root = h('div', { class: 'qz' });
    var best = store.get(key, null);
    function start() { i = 0; score = 0; order = items.map(function (q, k) { return k; }); if (!opts.noShuffle) shuffle(order); draw(); }
    function draw() {
      root.innerHTML = ''; answered = false;
      if (i >= total) return done();
      var q = items[order[i]];
      var opt = q.o.map(function (txt, k) { return k; }); if (!opts.noShuffle) shuffle(opt);
      var bar = h('div', { class: 'qz-h' }, [h('span', {}, ['سؤال ' + (i + 1) + ' من ' + total]), h('div', { class: 'qz-bar' }, [h('i', { style: 'width:' + Math.round(i / total * 100) + '%' })]), best != null ? h('span', { class: 'qz-best' }, ['أعلى نتيجة: ' + best + '/' + total]) : null]);
      var body = h('div', { class: 'qz-b' });
      body.appendChild(h('p', { class: 'qz-q', html: inl(q.q) }));
      if (q.code) body.appendChild(code({ code: q.code.code, lang: q.code.lang || 'js' }));
      var ox = h('div', { class: 'qz-o', role: 'group' }), ex = h('div', { class: 'qz-ex', hidden: true }), foot = h('div', { class: 'qz-f' });
      var next = h('button', { type: 'button', class: 'btn', hidden: true, onclick: function () { i++; draw(); } }, [i + 1 >= total ? 'شوف النتيجة' : 'السؤال التالي ←']);
      opt.forEach(function (k, n) {
        var b = h('button', { type: 'button' }, [h('span', { class: 'k' }, ['ابجدهوز'[n] || n + 1]), h('span', { html: inl(q.o[k]) })]);
        b.addEventListener('click', function () {
          if (answered) return; answered = true;
          var ok = k === q.a; if (ok) score++;
          [].forEach.call(ox.children, function (bb, m) { bb.disabled = true; if (opt[m] === q.a) bb.classList.add('ok'); });
          if (!ok) { b.classList.add('no', 'xf-shake'); } else b.classList.add('xf-pop');
          ex.hidden = false; ex.innerHTML = '<p><b>' + (ok ? '✅ إجابة صح!' : '❌ لأ.') + '</b> ' + (q.why ? inl(q.why) : '') + '</p>';
          next.hidden = false; next.focus({ preventScroll: true });
        });
        ox.appendChild(b);
      });
      foot.appendChild(next);
      body.appendChild(ox); body.appendChild(ex);
      root.appendChild(bar); root.appendChild(body); root.appendChild(foot);
    }
    function done() {
      var pass = opts.pass || 0.7, ok = score / total >= pass;
      if (best == null || score > best) { best = score; store.set(key, score); }
      var msg = score === total ? 'ممتاز! كل الإجابات صح 🎉' : ok ? 'شاطر — عديت الاختبار 👏' : 'محتاج تراجع الدرس وتحاول تاني 💪';
      var res = h('div', { class: 'qz-res xf-pop' }, [h('div', { class: 'big' }, [score + '/' + total]), h('p', {}, [msg]),
        h('div', { class: 'qz-f', style: 'justify-content:center;padding:6px 0 0' }, [h('button', { type: 'button', class: 'btn ghost', onclick: start }, ['حاول تاني ↻'])])]);
      root.innerHTML = ''; root.appendChild(h('div', { class: 'qz-h' }, [h('span', {}, ['النتيجة']), h('div', { class: 'qz-bar' }, [h('i', { style: 'width:100%' })])])); root.appendChild(res);
      if (ok) { root.classList.add('passed'); V.confetti(res); }
      opts.onDone && opts.onDone(score, total, ok);
    }
    start();
    return root;
  };

  /* ───────────── small confetti (canvas, 1.4s) ───────────── */
  V.confetti = function (anchor) {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var cv = h('canvas', { class: 'confetti', 'aria-hidden': 'true' });
    (anchor || document.body).appendChild(cv);
    var r = cv.parentNode.getBoundingClientRect(), W = cv.width = Math.max(260, r.width), H = cv.height = Math.max(160, Math.min(r.height, 320));
    var x = cv.getContext('2d'), cols = ['#e65a2c', '#2f64d8', '#f2a20c', '#15735e', '#8a4a1e', '#4f5bd0', '#1f8fcc'], ps = [];
    for (var i = 0; i < 70; i++) ps.push({ x: W / 2 + (Math.random() - .5) * 60, y: H * .35, vx: (Math.random() - .5) * 9, vy: -Math.random() * 8 - 2, s: 4 + Math.random() * 5, c: cols[i % cols.length], a: Math.random() * 6, va: (Math.random() - .5) * .4 });
    var t0 = performance.now();
    (function tick(t) {
      var el = t - t0; x.clearRect(0, 0, W, H);
      ps.forEach(function (p) { p.vy += .32; p.x += p.vx; p.y += p.vy; p.a += p.va; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.globalAlpha = Math.max(0, 1 - el / 1500); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .6); x.restore(); });
      if (el < 1500) requestAnimationFrame(tick); else cv.remove();
    })(t0);
  };
})();
