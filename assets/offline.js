/* X Code — "download the whole site for offline use"
 *
 * Nothing happens until the visitor presses the button: no service worker is registered and nothing is
 * cached. Pressing it fetches every file listed in offline-manifest.json into the browser's Cache Storage
 * and registers sw.js, which answers from that copy whenever the network is missing.
 * It is NOT an installable app: no manifest, no home-screen icon.
 *
 * Any element with [data-off] becomes an offline button (all of them stay in sync).
 *   data-off="icon"   round icon button (headers)      data-off="label"   full button with text
 *
 * Storage: Cache Storage  "xcode-offline-<version>"  +  localStorage "pxd:offline" = {v, n, bytes, at}
 */
(function () {
  'use strict';

  var SCRIPT = document.currentScript;
  var BASE = new URL('../', SCRIPT.src).href;                 // site root, works from any sub folder / host path
  var MANIFEST = BASE + 'offline-manifest.json';
  var SW_URL = BASE + 'sw.js';
  var PREFIX = 'xcode-offline-';
  var LS_KEY = 'pxd:offline';
  var CONCURRENCY = 6;

  /* ── tiny helpers ─────────────────────────────────────────────────────────── */
  function lsGet() { try { return JSON.parse(localStorage.getItem(LS_KEY)); } catch (e) { return null; } }
  function lsSet(v) { try { if (v) localStorage.setItem(LS_KEY, JSON.stringify(v)); else localStorage.removeItem(LS_KEY); } catch (e) { } }
  function nf(n) { return String(n).replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[d]; }); }
  function mb(b) { var m = b / 1048576; return nf(m < 10 ? m.toFixed(1) : Math.round(m)).replace('.', '٫') + ' ميجا'; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function ago(ts) {
    var s = (Date.now() - ts) / 1000;
    if (s < 90) return 'دلوقتي';
    if (s < 3600) return 'من ' + nf(Math.round(s / 60)) + ' دقيقة';
    if (s < 86400) return 'من ' + nf(Math.round(s / 3600)) + ' ساعة';
    return 'من ' + nf(Math.round(s / 86400)) + ' يوم';
  }

  var supportErr = (function () {
    if (location.protocol === 'file:') return 'file';
    if (!window.isSecureContext || !('serviceWorker' in navigator) || !('caches' in window)) return 'browser';
    return '';
  })();

  /* ── state ────────────────────────────────────────────────────────────────── */
  var st = {
    state: supportErr ? 'unsupported' : 'idle',   // unsupported | idle | busy | ready | update | error
    pct: 0, done: 0, total: 0, bytes: 0,
    meta: null,                                    // {v, n, bytes, at} of the stored copy
    remote: null,                                  // latest manifest (when known)
    msg: ''
  };
  var abort = null;
  var listeners = [];
  function set(patch) { for (var k in patch) st[k] = patch[k]; render(); }

  /* ── icons ────────────────────────────────────────────────────────────────── */
  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3v11"/><path d="m7.5 10 4.5 4.5 4.5-4.5"/><path d="M5 17.5v.5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.5"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';

  /* ── buttons ──────────────────────────────────────────────────────────────── */
  var btns = [];
  function labelFor() {
    switch (st.state) {
      case 'busy': return nf(st.pct) + '٪';
      case 'ready': return 'متاح أوفلاين';
      case 'update': return 'في تحديث';
      case 'error': return 'حاول تاني';
      default: return 'حمّل أوفلاين';
    }
  }
  function titleFor() {
    switch (st.state) {
      case 'busy': return 'بيتحمّل للأوفلاين… ' + nf(st.pct) + '٪';
      case 'ready': return 'الموقع متحمّل وبيفتح من غير نت';
      case 'update': return 'في نسخة أحدث من الموقع';
      case 'error': return 'حصلت مشكلة في التحميل';
      case 'unsupported': return 'الأوفلاين';
      default: return 'حمّل الموقع كله عشان يشتغل من غير نت';
    }
  }
  function bindButtons() {
    [].forEach.call(document.querySelectorAll('[data-off]'), function (b) {
      if (b.__off) return;
      b.__off = true;
      var label = b.getAttribute('data-off') === 'label';
      b.classList.add('off-btn');
      if (label) b.classList.add('off-lbl');
      b.setAttribute('type', 'button');
      b.setAttribute('aria-haspopup', 'dialog');
      b.innerHTML = '<span class="off-ic">' + ICON + CHECK + '</span><span class="off-t"></span>';
      b.addEventListener('click', function (ev) { ev.preventDefault(); togglePanel(b); });
      btns.push(b);
    });
  }

  /* ── panel ────────────────────────────────────────────────────────────────── */
  var panel = null, panelFor = null;
  function closePanel() {
    if (!panel) return;
    panel.remove(); panel = null;
    if (panelFor) panelFor.setAttribute('aria-expanded', 'false');
    panelFor = null;
    document.removeEventListener('keydown', onKey, true);
    document.removeEventListener('pointerdown', onOutside, true);
    window.removeEventListener('resize', place);
  }
  function onKey(e) { if (e.key === 'Escape') { var f = panelFor; closePanel(); if (f) f.focus(); } }
  function onOutside(e) { if (panel && !panel.contains(e.target) && !(panelFor && panelFor.contains(e.target))) closePanel(); }
  function togglePanel(btn) {
    if (panel && panelFor === btn) return closePanel();
    closePanel();
    panelFor = btn;
    btn.setAttribute('aria-expanded', 'true');
    panel = el('div', 'off-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'تحميل الموقع للأوفلاين');
    document.body.appendChild(panel);
    renderPanel();
    place();
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('pointerdown', onOutside, true);
    window.addEventListener('resize', place);
    var first = panel.querySelector('button'); if (first) first.focus({ preventScroll: true });
  }
  function place() {
    if (!panel || !panelFor) return;
    if (window.innerWidth <= 560) { panel.classList.add('sheet'); panel.style.cssText = ''; return; }
    panel.classList.remove('sheet');
    var r = panelFor.getBoundingClientRect(), w = Math.min(360, window.innerWidth - 24);
    var left = r.left + r.width / 2 - w / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - w - 12));
    panel.style.cssText = 'width:' + w + 'px;left:' + left + 'px;top:' + Math.round(r.bottom + 10) + 'px';
  }

  var FEATURES = '<ul class="off-ul tick">' +
    '<li>الكورسات والمشاريع والمرجع كلهم</li>' +
    '<li>بيتحمّل مرة واحدة بس لما تدوس الزرار</li>' +
    '<li>مش تطبيق ومفيش حاجة بتتحط على الشاشة الرئيسية</li>' +
    '<li>تقدر تمسح النسخة في أي وقت</li></ul>';

  function sizeText() {
    var b = (st.remote && st.remote.bytes) || (st.meta && st.meta.bytes) || 0;
    return b ? mb(b) : '';
  }

  function renderPanel() {
    if (!panel) return;
    var h = '';
    h += '<button class="off-x" type="button" data-a="close" aria-label="إغلاق">✕</button>';
    switch (st.state) {
      case 'unsupported':
        h += '<h3>الأوفلاين</h3>';
        if (supportErr === 'file') {
          h += '<p>انت فاتح الموقع من ملفات على جهازك، يعني هو شغّال من غير إنترنت أصلاً. الزرار ده بيشتغل لما الموقع يتفتح من رابط على الإنترنت.</p>';
        } else {
          h += '<p>المتصفح ده مش بيدعم تحميل الموقع للأوفلاين. جرّب نسخة حديثة من Chrome أو Edge أو Firefox أو Safari، والموقع لازم يكون مفتوح بـ https.</p>';
        }
        break;
      case 'busy':
        h += '<h3>بيتحمّل الموقع…</h3>' +
          '<div class="off-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + st.pct + '"><i style="width:' + st.pct + '%"></i></div>' +
          '<p class="off-sub">' + nf(st.pct) + '٪ — ' + nf(st.done) + ' من ' + nf(st.total) + ' ملف · ' + mb(st.bytes) + ' من ' + sizeText() + '</p>' +
          '<p class="off-note">سيب الصفحة مفتوحة لحد ما يخلص.</p>' +
          '<div class="off-row"><button class="btn ghost" type="button" data-a="cancel">إلغاء</button></div>';
        break;
      case 'ready':
        h += '<h3><span class="off-ok">' + CHECK + '</span> الموقع متحمّل</h3>' +
          '<p>الصفحات بتفتح من غير إنترنت على المتصفح ده. وانت أونلاين بتشوف دايماً أحدث نسخة.</p>' +
          '<p class="off-sub">' + (st.meta ? nf(st.meta.n) + ' ملف · ' + mb(st.meta.bytes) + ' · ' + ago(st.meta.at) : '') + '</p>' +
          '<div class="off-row"><button class="btn ghost" type="button" data-a="remove">امسح النسخة</button>' +
          '<button class="btn" type="button" data-a="check">دوّر على تحديث</button></div>';
        break;
      case 'update':
        h += '<h3>في نسخة أحدث</h3>' +
          '<p>الموقع اتحدّث من آخر مرة حمّلته. التحديث بينزّل الملفات اللي اتغيّرت بس.</p>' +
          '<div class="off-row"><button class="btn ghost" type="button" data-a="remove">امسح النسخة</button>' +
          '<button class="btn" type="button" data-a="download">حدّث دلوقتي</button></div>';
        break;
      case 'error':
        h += '<h3>التحميل وقف</h3><p>' + (st.msg || 'حصلت مشكلة.') + '</p>' +
          '<div class="off-row"><button class="btn" type="button" data-a="download">كمّل التحميل</button></div>';
        break;
      default:
        h += '<h3>اشتغل من غير إنترنت</h3>' +
          '<p>حمّل الموقع كله على المتصفح مرة واحدة، وبعدها يفتح ويشتغل حتى لو النت قاطع.</p>' + FEATURES +
          '<div class="off-row"><button class="btn" type="button" data-a="download">حمّل دلوقتي' + (sizeText() ? ' · ' + sizeText() : '') + '</button></div>';
    }
    panel.innerHTML = h;
    [].forEach.call(panel.querySelectorAll('[data-a]'), function (b) {
      b.addEventListener('click', function () {
        var a = b.getAttribute('data-a');
        if (a === 'close') { var f = panelFor; closePanel(); if (f) f.focus(); }
        else if (a === 'download') download();
        else if (a === 'cancel') cancel();
        else if (a === 'remove') remove();
        else if (a === 'check') check(true);
      });
    });
  }

  /* ── toast ────────────────────────────────────────────────────────────────── */
  var toastEl = null, toastT = 0;
  function toast(msg) {
    if (!toastEl) { toastEl = el('div', 'off-toast'); toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 3600);
  }

  /* ── render everything ────────────────────────────────────────────────────── */
  function render() {
    btns.forEach(function (b) {
      b.setAttribute('data-state', st.state);
      b.style.setProperty('--p', st.pct + '%');
      b.title = titleFor();
      b.setAttribute('aria-label', titleFor());
      var t = b.querySelector('.off-t'); if (t) t.textContent = labelFor();
    });
    renderPanel();
    listeners.forEach(function (fn) { try { fn(st); } catch (e) { } });
  }

  /* ── data ─────────────────────────────────────────────────────────────────── */
  function fetchManifest() {
    return fetch(MANIFEST, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('manifest ' + r.status);
      return r.json();
    });
  }
  function cacheName(v) { return PREFIX + v; }
  function url(p) { return BASE + p; }

  /* verify the stored copy still exists (the browser may evict it) and look for a newer version */
  function check(manual) {
    if (st.state === 'busy') return Promise.resolve();
    var meta = lsGet();
    var haveCache = meta && meta.v ? caches.has(cacheName(meta.v)) : Promise.resolve(false);
    return haveCache.then(function (ok) {
      if (!ok) { if (meta) lsSet(null); set({ meta: null, state: 'idle' }); }
      else if (st.state !== 'busy') set({ meta: meta, state: st.state === 'update' ? 'update' : 'ready' });
      if (!navigator.onLine) { if (manual) toast('مفيش إنترنت دلوقتي'); return; }
      return fetchManifest().then(function (m) {
        set({ remote: m });
        if (ok && m.version !== meta.v) set({ state: 'update' });
        else if (ok) { set({ state: 'ready' }); if (manual) toast('انت على أحدث نسخة ✓'); }
      }).catch(function () { if (manual) toast('معرفتش أوصل للسيرفر'); });
    });
  }

  function readStoredManifest(name) {
    return caches.open(name).then(function (c) { return c.match(BASE + '__manifest.json'); })
      .then(function (r) { return r ? r.json() : null; }).catch(function () { return null; });
  }

  function download() {
    if (st.state === 'busy' || supportErr) return;
    var prevMeta = lsGet();
    abort = { stop: false, ctrl: window.AbortController ? new AbortController() : null };
    var ctl = abort;
    set({ state: 'busy', pct: 0, done: 0, total: 0, bytes: 0, msg: '' });

    var manifest, cache, prevCache = null, prevHashes = {};
    fetchManifest().then(function (m) {
      manifest = m;
      set({ total: m.files.length, remote: m });
      return navigator.serviceWorker.register(SW_URL, { scope: BASE });
    }).then(function () {
      return navigator.serviceWorker.ready;
    }).then(function () {
      return caches.open(cacheName(manifest.version));
    }).then(function (c) {
      cache = c;
      // incremental update: files whose hash did not change are copied from the previous copy, not downloaded again
      if (prevMeta && prevMeta.v && prevMeta.v !== manifest.version) {
        return caches.has(cacheName(prevMeta.v)).then(function (has) {
          if (!has) return;
          return readStoredManifest(cacheName(prevMeta.v)).then(function (pm) {
            if (!pm) return;
            pm.files.forEach(function (f) { prevHashes[f[0]] = f[2]; });
            return caches.open(cacheName(prevMeta.v)).then(function (pc) { prevCache = pc; });
          });
        });
      }
    }).then(function () {
      var files = manifest.files, i = 0, done = 0, bytes = 0, total = manifest.bytes || 1, failed = null;
      function progress(size) {
        done++; bytes += size;
        set({ done: done, bytes: bytes, pct: Math.min(99, Math.floor(bytes * 100 / total)) });
      }
      function one(f, attempt) {
        var u = url(f[0]);
        return cache.match(u).then(function (have) {
          if (have && (have.headers.get('x-off-h') === f[2])) return progress(f[1]);          // resume after an interrupted download
          var reuse = prevCache && prevHashes[f[0]] === f[2] ? prevCache.match(u) : Promise.resolve(null);
          return reuse.then(function (old) {
            if (old) return tag(old, f[2]).then(function (r) { return cache.put(u, r); }).then(function () { progress(f[1]); });
            return fetch(u, { cache: 'reload', signal: ctl.ctrl ? ctl.ctrl.signal : undefined }).then(function (res) {
              if (!res.ok) throw new Error(f[0] + ' → ' + res.status);
              return tag(res, f[2]);
            }).then(function (r) { return cache.put(u, r); }).then(function () { progress(f[1]); });
          });
        }).catch(function (err) {
          if (ctl.stop) throw err;
          if (attempt < 2) return new Promise(function (ok) { setTimeout(ok, 400 * (attempt + 1)); }).then(function () { return one(f, attempt + 1); });
          throw err;
        });
      }
      function worker() {
        if (ctl.stop || failed) return Promise.resolve();
        var f = files[i++];
        if (!f) return Promise.resolve();
        return one(f, 0).then(worker, function (e) { failed = failed || e; });
      }
      var pool = [];
      for (var k = 0; k < CONCURRENCY; k++) pool.push(worker());
      return Promise.all(pool).then(function () {
        if (ctl.stop) throw new Error('cancelled');
        if (failed) throw failed;
      });
    }).then(function () {
      // finished: store the manifest next to the files (needed for the next incremental update), then drop old copies
      return cache.put(BASE + '__manifest.json', new Response(JSON.stringify(manifest), { headers: { 'Content-Type': 'application/json' } }));
    }).then(function () {
      var meta = { v: manifest.version, n: manifest.count, bytes: manifest.bytes, at: Date.now() };
      lsSet(meta);
      return caches.keys().then(function (names) {
        return Promise.all(names.filter(function (n) { return n.indexOf(PREFIX) === 0 && n !== cacheName(manifest.version); })
          .map(function (n) { return caches.delete(n); }));
      }).then(function () {
        set({ state: 'ready', meta: meta, pct: 100, done: manifest.count });
        toast('اتحمّل الموقع ✓ دلوقتي بيشتغل من غير نت');
      });
    }).catch(function (err) {
      if (ctl.stop) return;
      var offline = !navigator.onLine;
      set({
        state: prevMeta ? 'update' : 'error',
        msg: offline ? 'النت فصل في النص. وصّل تاني واضغط «كمّل التحميل» — اللي اتحمّل قبل كده مش هيتحمّل تاني.' : 'مقدرتش أحمّل كل الملفات (' + (err && err.message || 'خطأ') + '). جرّب تاني.'
      });
      if (prevMeta) toast('التحديث وقف — جرّب تاني');
    }).then(function () { if (abort === ctl) abort = null; });
  }

  // store a response with the hash that was in the manifest, so an interrupted download can resume
  function tag(res, hash) {
    return res.blob().then(function (b) {
      var h = new Headers(res.headers);
      h.set('x-off-h', hash);
      return new Response(b, { status: 200, statusText: 'OK', headers: h });
    });
  }

  function cancel() {
    if (abort) { abort.stop = true; if (abort.ctrl) abort.ctrl.abort(); }
    abort = null;
    var meta = lsGet();
    set({ state: meta ? 'update' : 'idle', pct: 0, done: 0, bytes: 0 });
    // the half-finished copy is kept: pressing download again resumes from where it stopped
  }

  function remove() {
    var tasks = [];
    tasks.push(caches.keys().then(function (names) {
      return Promise.all(names.filter(function (n) { return n.indexOf(PREFIX) === 0; }).map(function (n) { return caches.delete(n); }));
    }));
    tasks.push(navigator.serviceWorker.getRegistrations().then(function (regs) {
      return Promise.all(regs.filter(function (r) { return r.scope === BASE; }).map(function (r) { return r.unregister(); }));
    }));
    return Promise.all(tasks).catch(function () { }).then(function () {
      lsSet(null);
      set({ state: 'idle', meta: null, pct: 0, done: 0, bytes: 0 });
      toast('اتمسحت النسخة الأوفلاين');
    });
  }

  /* ── connection hint ──────────────────────────────────────────────────────── */
  window.addEventListener('offline', function () {
    if (st.state === 'ready' || st.state === 'update') toast('انت أوفلاين — بتتصفح النسخة المحمّلة');
  });
  window.addEventListener('online', function () { if (!supportErr && lsGet()) check(false); });

  /* ── start ────────────────────────────────────────────────────────────────── */
  function init() {
    bindButtons();
    render();
    if (supportErr) return;
    check(false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.XFOffline = {
    state: function () { return st; },
    download: download, remove: remove, check: check, cancel: cancel,
    onChange: function (fn) { listeners.push(fn); }
  };
})();
