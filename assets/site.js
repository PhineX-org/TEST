/* PhineX — site.js
   Shared behaviour for the landing page, course menus and lessons:
   theme switch (same key as the docs: pxd:theme), font size, reading-tools button, mobile nav, bidi fix.

   Themes (one button cycles through them): dusk → داكن هادئ · paper → فاتح هادئ · sepia → سيبيا
   Everything is wrapped in try/catch so the pages still work with storage blocked (file:// / private mode). */
(function () {
  'use strict';
  var root = document.documentElement;
  var script = document.currentScript;
  var base = script && script.src ? script.src.replace(/[^\/]*$/, '') : '';

  var SV = function (p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; };
  var ICON = {
    moon: SV('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'),
    drop: SV('<path d="M12 3c3.6 4.3 6 7.1 6 10.2A6 6 0 0 1 6 13.2C6 10.1 8.4 7.3 12 3Z"/><path d="M9.2 14.2a3 3 0 0 0 2.3 2.2" opacity=".7"/>'),
    sun: SV('<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    cup: SV('<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5v3M12 2.5v3"/>'),
    book: SV('<path d="M4 19.5V5.5A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/><path d="M12 7.2v4.4M9.8 9.4h4.4" opacity=".75"/>')
  };
  // key, full name, short label (tab bar), browser theme-color, swatch (shown in the toast)
  var THEMES = [
    { k: 'dusk',  name: 'داكن هادئ', short: 'داكن',  color: '#14181e', sw: 'linear-gradient(135deg,#14181e 52%,#6fc3a3 52%)', icon: ICON.moon },
    { k: 'paper', name: 'فاتح هادئ', short: 'فاتح',  color: '#eef0f5', sw: 'linear-gradient(135deg,#eef0f5 52%,#15735e 52%)', icon: ICON.sun },
    { k: 'sepia', name: 'سيبيا',     short: 'سيبيا', color: '#e9dfc7', sw: 'linear-gradient(135deg,#e9dfc7 52%,#2f6b57 52%)', icon: ICON.cup }
  ];

  function get(k) { try { return JSON.parse(localStorage.getItem('pxd:' + k)); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem('pxd:' + k, JSON.stringify(v)); } catch (e) {} }

  // old keys: dark / glass / kindle → dusk, light → paper; anything unknown → dusk
  function norm(t) {
    if (t === 'dark' || t === 'glass' || t === 'kindle') return 'dusk';
    if (t === 'light') return 'paper';
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].k === t) return t;
    return 'dusk';
  }
  function info(t) { for (var i = 0; i < THEMES.length; i++) if (THEMES[i].k === t) return THEMES[i]; return THEMES[0]; }
  function cur() { return norm(root.getAttribute('data-theme')); }

  function paintButtons(t) {
    var th = info(t), bs = document.querySelectorAll('[data-px-cycle]');
    for (var i = 0; i < bs.length; i++) {
      var b = bs[i];
      b.setAttribute('aria-label', 'المظهر: ' + th.name + ' — اضغط للتغيير');
      b.setAttribute('title', 'المظهر: ' + th.name + ' — اضغط للتغيير');
      var old = b.querySelector('svg');
      if (old) old.outerHTML = th.icon; else b.insertAdjacentHTML('afterbegin', th.icon);
      var lab = b.querySelector('span');
      if (lab) lab.textContent = th.short;
    }
  }
  function applyTheme(t) {
    t = norm(t);
    root.setAttribute('data-theme', t);
    var m = document.querySelector('meta[name=theme-color]');
    if (m) m.setAttribute('content', info(t).color);
    paintButtons(t);
    try { window.dispatchEvent(new Event('pxd:theme')); } catch (e) {}
  }
  function applyFs(n) {
    n = Math.max(13, Math.min(24, n));
    root.style.setProperty('--px-fs', n + 'px');
    root.style.fontSize = n + 'px';
    var el = document.querySelector('[data-px-fs-val]'); if (el) el.textContent = n;
  }

  var toastEl, toastTimer;
  function toast(th) {
    if (!document.body) return;
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'px-toast'; toastEl.setAttribute('role', 'status'); toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = '<i style="background:' + th.sw + '"></i><span>المظهر: ' + th.name + '</span>';
    // restart the transition
    toastEl.classList.remove('show'); void toastEl.offsetWidth; toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1600);
  }
  function nextTheme() {
    var c = cur(), idx = 0;
    for (var k = 0; k < THEMES.length; k++) if (THEMES[k].k === c) idx = k;
    var nx = THEMES[(idx + 1) % THEMES.length];
    applyTheme(nx.k); set('theme', nx.k); toast(nx);
  }
  window.pxTheme = { list: THEMES, get: cur, set: function (t) { applyTheme(t); set('theme', norm(t)); }, next: nextTheme };

  // 1) early (before first paint)
  applyTheme(get('theme'));
  var fs = get('fs');
  if (fs >= 12 && fs <= 28) applyFs(fs);

  // 2) after DOM is ready
  function ready() {
    // reading tools on lesson pages (builds its own theme button before the buttons are bound)
    if (document.body.hasAttribute('data-px-tools')) buildTools();

    // theme button(s): <button data-px-cycle> — any number per page
    var cyc = document.querySelectorAll('[data-px-cycle]');
    for (var i = 0; i < cyc.length; i++) cyc[i].addEventListener('click', nextTheme);
    paintButtons(cur());

    // mobile nav
    var mb = document.querySelector('[data-px-menu]');
    var nav = document.querySelector('[data-px-nav]');
    if (mb && nav) {
      mb.addEventListener('click', function () {
        var o = nav.classList.toggle('open');
        mb.setAttribute('aria-expanded', String(o));
      });
      nav.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('a')) { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); }
      });
    }

    // back to top
    var btt = document.querySelector('[data-px-top]');
    if (btt) {
      var on = function () { btt.classList.toggle('show', window.scrollY > 600); };
      window.addEventListener('scroll', on, { passive: true }); on();
      btt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); });
    }

    // gentle reveal on scroll (disabled for reduced-motion)
    var rev = document.querySelectorAll('[data-px-reveal]');
    if (rev.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -8% 0px' });
      for (var r = 0; r < rev.length; r++) io.observe(rev[r]);
    } else {
      for (var q = 0; q < rev.length; q++) rev[q].classList.add('in');
    }
  }

  function buildTools() {
    var w = document.createElement('div'); w.className = 'px-tools';
    var fsNow = parseInt(getComputedStyle(root).fontSize, 10) || 16;
    w.innerHTML =
      '<button type="button" class="px-theme-fab" data-px-cycle aria-label="تغيير المظهر"></button>' +
      '<button type="button" class="px-tools-fab" aria-label="حجم الخط" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 19 8.5 5 14 19M5 14.5h7"/><path d="M15.5 19l3-8 3 8M16.7 16.5h3.6"/></svg></button>' +
      '<div class="px-tools-panel" role="dialog" aria-label="حجم الخط">' +
      '<h6>حجم الخط</h6><div class="px-tools-row"><button type="button" data-fs="-1" aria-label="تصغير الخط">A−</button><button type="button" data-px-fs-val data-fs="0" aria-label="الحجم العادي">' + fsNow + '</button><button type="button" data-fs="1" aria-label="تكبير الخط">A+</button></div>' +
      '</div>';
    document.body.appendChild(w);
    var fab = w.querySelector('.px-tools-fab');
    fab.addEventListener('click', function () { var o = w.classList.toggle('open'); fab.setAttribute('aria-expanded', String(o)); });
    document.addEventListener('click', function (e) { if (!w.contains(e.target)) { w.classList.remove('open'); fab.setAttribute('aria-expanded', 'false'); } });
    w.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-fs')) {
        var d = parseInt(b.getAttribute('data-fs'), 10), n = d === 0 ? 16 : (parseInt(getComputedStyle(root).fontSize, 10) || 16) + d;
        n = Math.max(13, Math.min(24, n)); applyFs(n); set('fs', n);
      }
    });
  }

  // keep several open tabs in sync (landing in one tab, a lesson in another)
  window.addEventListener('storage', function (e) {
    if (e.key === 'pxd:theme') { try { applyTheme(JSON.parse(e.newValue)); } catch (x) {} }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();

  // 3) bidi fix (loaded from the same folder)
  if (base && !window.pxBidi) {
    var s = document.createElement('script'); s.src = base + 'bidi.js'; s.async = false;
    (document.head || root).appendChild(s);
  }
})();
