/* ════════════════════════════════════════════════════════════════════
   EL JASUS — INBOX  (window.EJInbox)
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.EJInbox) return;

  var DB_MODULE = 'https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js';
  var KEY = {
    pos:  'ej_inbox_pos_v1',
    fab:  'ej_inbox_fab_v1',
    big:  'ej_inbox_big_v1',
    tab:  'ej_inbox_tab_v1',
    read: function (uid) { return 'ej_inbox_read_v1_' + uid; }
  };
  var DAY = 86400000;

  var CATS = {
    update:       { label: 'تحديث',    cls: 'c-update' },
    announcement: { label: 'إعلان',    cls: 'c-ann'    },
    event:        { label: 'حدث',      cls: 'c-event'  },
    maintenance:  { label: 'صيانة',    cls: 'c-maint'  },
    notice:       { label: 'رسالة لك', cls: 'c-notice' }
  };

  /* ───────────────────────── helpers ───────────────────────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
  function arDigits(n) { return String(n).replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[d]; }); }

  function ago(ts) {
    if (!ts) return '';
    var s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (s < 60) return 'الآن';
    if (s < 3600) return 'منذ ' + arDigits(Math.floor(s / 60)) + ' د';
    if (s < DAY / 1000) return 'منذ ' + arDigits(Math.floor(s / 3600)) + ' س';
    if (s < 2 * DAY / 1000) return 'أمس';
    if (s < 30 * DAY / 1000) return 'منذ ' + arDigits(Math.floor(s / 86400)) + ' يوم';
    return new Date(ts).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  function longDate(ts) {
    if (!ts) return '';
    return new Date(ts).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  function mmss(ms) {
    var s = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(s / 60), r = s % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  // Tiny, safe formatter for admin-written text:  ## heading, - bullets, **bold**, https links, blank line = new paragraph
  function inline(s) {
    return s
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  }
  function formatBody(text) {
    var lines = esc(text).split(/\r?\n/), out = '', para = [], inList = false;
    function flushP() { if (para.length) { out += '<p>' + inline(para.join('<br>')) + '</p>'; para = []; } }
    function flushL() { if (inList) { out += '</ul>'; inList = false; } }
    lines.forEach(function (raw) {
      var l = raw.trim();
      if (!l) { flushP(); flushL(); return; }
      if (/^##\s+/.test(l)) { flushP(); flushL(); out += '<h4>' + inline(l.replace(/^##\s+/, '')) + '</h4>'; return; }
      if (/^[-•*]\s+/.test(l)) { flushP(); if (!inList) { out += '<ul>'; inList = true; } out += '<li>' + inline(l.replace(/^[-•*]\s+/, '')) + '</li>'; return; }
      flushL(); para.push(l);
    });
    flushP(); flushL();
    return out;
  }
  function safeUrl(u) {
    u = String(u || '').trim();
    if (!u) return '';
    if (/^https:\/\//i.test(u)) return u;
    if (/^[\w\-./]+\.html(\?[\w=&%\-]*)?$/i.test(u)) return u;   // same-site page
    return '';
  }
  function plain(text) { return String(text || '').replace(/[#*`>_-]+/g, ' ').replace(/\s+/g, ' ').trim(); }

  /* ───────────────────────── styles ───────────────────────── */
  var CSS = '\
#ej-inbox-root{--ej-cyan:#00f2ff;--ej-lime:#a3e635;--ej-ink:#000;--ej-line:rgba(0,242,255,.22);--ej-dim:rgba(255,255,255,.62);--ej-faint:rgba(255,255,255,.4);font-family:"Cairo",system-ui,sans-serif;color:#fff;-webkit-tap-highlight-color:transparent}\
#ej-inbox-root *{box-sizing:border-box}\
:where(#ej-inbox-root) button{font-family:inherit;color:inherit;cursor:pointer;border:0;background:none;padding:0}\
#ej-inbox-root button:focus-visible,#ej-inbox-root a:focus-visible{outline:2px solid var(--ej-cyan);outline-offset:2px}\
\
.ej-fab{position:fixed;z-index:9984;width:56px;height:56px;border-radius:18px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.92);border:1px solid rgba(0,242,255,.5);box-shadow:0 6px 24px rgba(0,0,0,.55),0 0 0 1px rgba(0,0,0,.6);touch-action:none;user-select:none;-webkit-user-select:none;transition:border-color .15s,box-shadow .15s}\
.ej-fab:hover{border-color:var(--ej-cyan);box-shadow:0 6px 28px rgba(0,242,255,.25)}\
.ej-fab svg{width:26px;height:26px;stroke:var(--ej-cyan);fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}\
.ej-fab .ej-badge{position:absolute;top:-7px;inset-inline-start:-7px;min-width:22px;height:22px;padding:0 6px;border-radius:11px;background:var(--ej-lime);color:#000;font:800 12px/22px "Cairo",sans-serif;text-align:center;box-shadow:0 0 0 2px #000}\
.ej-fab .ej-badge[hidden]{display:none}\
.ej-fab.has-invite{border-color:var(--ej-lime)}\
.ej-fab.has-invite svg{stroke:var(--ej-lime)}\
\
.ej-win{position:fixed;z-index:9985;display:none;flex-direction:column;direction:ltr;width:min(980px,calc(100vw - 24px));height:min(640px,calc(100vh - 24px));background:rgba(0,0,0,.96);border:1px solid var(--ej-line);border-radius:18px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.7),0 0 0 1px rgba(0,0,0,.8);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}\
.ej-win.big{width:min(1280px,calc(100vw - 16px));height:min(860px,calc(100vh - 16px))}\
.ej-win.open{display:flex;animation:ej-pop .16s ease-out}\
@keyframes ej-pop{from{opacity:0;transform:translateY(8px) scale(.985)}to{opacity:1;transform:none}}\
.ej-win::before{content:"";position:absolute;inset:0 0 auto 0;height:2px;background:linear-gradient(90deg,var(--ej-cyan),var(--ej-lime));z-index:2}\
\
.ej-head{direction:rtl;display:flex;align-items:center;gap:12px;padding:14px 16px 12px;border-bottom:1px solid var(--ej-line);cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;flex-shrink:0}\
.ej-head.dragging{cursor:grabbing}\
.ej-head h2{font-size:17px;font-weight:900;margin:0;line-height:1.2}\
.ej-head .ej-sub{font-size:11.5px;color:var(--ej-faint);margin-top:1px}\
.ej-grip{display:grid;grid-template-columns:repeat(2,4px);gap:3px;opacity:.45;flex-shrink:0}\
.ej-grip i{width:4px;height:4px;border-radius:50%;background:#fff;display:block}\
.ej-head-title{flex:1;min-width:0}\
.ej-ibtn{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;border:1px solid transparent;color:var(--ej-dim);flex-shrink:0}\
.ej-ibtn:hover{color:var(--ej-cyan);border-color:var(--ej-line);background:rgba(0,242,255,.06)}\
.ej-ibtn svg{width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\
.ej-back{display:none}\
\
.ej-body{flex:1;min-height:0;display:grid;grid-template-columns:minmax(260px,340px) 1fr;direction:ltr}\
.ej-win.big .ej-body{grid-template-columns:minmax(300px,400px) 1fr}\
.ej-side{direction:rtl;display:flex;flex-direction:column;min-height:0;border-right:1px solid var(--ej-line);background:rgba(255,255,255,.015)}\
.ej-tabs{display:flex;gap:4px;padding:10px 10px 0;border-bottom:1px solid var(--ej-line);flex-shrink:0}\
.ej-tab{flex:1;padding:9px 8px 10px;font-size:13px;font-weight:800;color:var(--ej-dim);border-bottom:2px solid transparent;margin-bottom:-1px;display:flex;align-items:center;justify-content:center;gap:7px}\
.ej-tab:hover{color:#fff}\
.ej-tab[aria-selected="true"]{color:var(--ej-cyan);border-bottom-color:var(--ej-cyan)}\
.ej-tab .n{min-width:20px;height:20px;padding:0 6px;border-radius:10px;font:800 11px/20px "Cairo",sans-serif;background:rgba(255,255,255,.1);color:var(--ej-dim)}\
.ej-tab .n.hot{background:var(--ej-lime);color:#000}\
.ej-toolbar{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;font-size:11.5px;color:var(--ej-faint);border-bottom:1px solid rgba(255,255,255,.06);flex-shrink:0}\
.ej-toolbar button{font-size:11.5px;font-weight:700;color:var(--ej-dim);padding:3px 0}\
.ej-toolbar button:hover{color:var(--ej-cyan)}\
.ej-list{flex:1;overflow-y:auto;overscroll-behavior:contain;outline:none}\
.ej-list::-webkit-scrollbar,.ej-detail::-webkit-scrollbar{width:7px}\
.ej-list::-webkit-scrollbar-thumb,.ej-detail::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:7px}\
\
.ej-item{position:relative;width:100%;display:grid;grid-template-columns:10px minmax(0,1fr) auto;gap:10px;align-items:start;text-align:start;padding:13px 14px 13px 16px;border-bottom:1px solid rgba(255,255,255,.06);background:transparent}\
.ej-item:hover{background:rgba(255,255,255,.035)}\
.ej-item .ej-dot{width:8px;height:8px;border-radius:50%;margin-top:8px;background:transparent}\
.ej-item.unread .ej-dot{background:var(--ej-lime);box-shadow:0 0 8px rgba(163,230,53,.7)}\
.ej-item-title{display:block;font-size:14px;font-weight:700;line-height:1.5;color:rgba(255,255,255,.88);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\
.ej-item.unread .ej-item-title{font-weight:900;color:#fff}\
.ej-item-prev{display:block;margin-top:2px;font-size:12px;line-height:1.5;color:var(--ej-faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
.ej-item-side{display:flex;flex-direction:column;align-items:flex-start;gap:5px;padding-top:2px}\
.ej-item-side time{font-size:11px;color:var(--ej-faint);white-space:nowrap}\
.ej-item[aria-selected="true"]{background:linear-gradient(270deg,rgba(0,242,255,.14),rgba(0,242,255,.04));box-shadow:inset -3px 0 0 var(--ej-cyan)}\
.ej-pin{display:inline-block;width:11px;height:11px;margin-inline-start:6px;vertical-align:-1px;stroke:var(--ej-cyan);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\
\
.ej-chip{display:inline-block;padding:2px 9px;border-radius:999px;font-size:11px;font-weight:800;line-height:1.6;white-space:nowrap;border:1px solid}\
.ej-chip.tag{font-family:"Orbitron",sans-serif;font-weight:700;letter-spacing:.3px;font-size:10.5px}\
.c-update{color:#000;background:var(--ej-lime);border-color:var(--ej-lime)}\
.c-ann{color:var(--ej-cyan);background:rgba(0,242,255,.1);border-color:rgba(0,242,255,.45)}\
.c-event{color:#fff;background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.35)}\
.c-maint{color:#67e8f9;background:rgba(8,145,178,.2);border-color:rgba(8,145,178,.7)}\
.c-notice{color:var(--ej-lime);background:rgba(163,230,53,.1);border-color:rgba(163,230,53,.5);border-style:dashed}\
.c-tag{color:var(--ej-dim);background:transparent;border-color:rgba(255,255,255,.22)}\
\
.ej-detail{direction:rtl;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:28px 34px 34px;background:#000}\
.ej-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;margin-bottom:14px}\
.ej-meta .d{font-size:12px;color:var(--ej-faint)}\
.ej-detail h3{font-size:clamp(20px,2.4vw,27px);font-weight:900;line-height:1.45;margin:0 0 18px;max-width:40ch}\
.ej-prose{max-width:62ch;font-size:15px;line-height:2;color:rgba(255,255,255,.86)}\
.ej-prose p{margin:0 0 14px}\
.ej-prose h4{font-size:16px;font-weight:900;color:var(--ej-cyan);margin:22px 0 8px}\
.ej-prose ul{margin:0 0 14px;padding:0 20px 0 0;list-style:none}\
.ej-prose li{position:relative;margin-bottom:6px;padding-inline-start:0}\
.ej-prose li::before{content:"";position:absolute;right:-16px;top:.85em;width:6px;height:6px;border-radius:2px;background:var(--ej-lime)}\
.ej-prose strong{color:#fff;font-weight:900}\
.ej-prose a{color:var(--ej-cyan);text-decoration:underline;text-underline-offset:3px;word-break:break-all}\
.ej-foot{margin-top:26px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08);display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;max-width:62ch}\
.ej-foot .by{font-size:12px;color:var(--ej-faint)}\
.ej-btn{text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 22px;border-radius:12px;font-size:14px;font-weight:900;border:1px solid transparent;transition:filter .15s,border-color .15s,background .15s}\
.ej-btn.primary{background:var(--ej-lime);color:#000}\
.ej-btn.primary:hover{filter:brightness(1.08)}\
.ej-btn.ghost{border-color:rgba(255,255,255,.22);color:var(--ej-dim)}\
.ej-btn.ghost:hover{border-color:var(--ej-cyan);color:var(--ej-cyan)}\
.ej-btn.cyan{background:rgba(0,242,255,.1);border-color:rgba(0,242,255,.5);color:var(--ej-cyan)}\
.ej-btn.cyan:hover{background:rgba(0,242,255,.18)}\
.ej-btn:disabled{opacity:.5;cursor:not-allowed}\
\
.ej-invite{max-width:460px}\
.ej-invite .from{font-size:13px;color:var(--ej-faint);margin-bottom:4px}\
.ej-invite .who{font-size:clamp(24px,3vw,32px);font-weight:900;line-height:1.3;margin-bottom:22px;word-break:break-word}\
.ej-code{display:inline-flex;flex-direction:column;gap:4px;padding:14px 22px;border:1px dashed rgba(0,242,255,.5);border-radius:14px;background:rgba(0,242,255,.05);margin-bottom:22px}\
.ej-code span{font-size:11.5px;color:var(--ej-faint)}\
.ej-code b{font-family:"Orbitron",sans-serif;font-size:30px;letter-spacing:8px;color:var(--ej-cyan);direction:ltr;text-align:center}\
.ej-left{margin-bottom:22px}\
.ej-left .row{display:flex;justify-content:space-between;font-size:12.5px;color:var(--ej-dim);margin-bottom:7px}\
.ej-left .row b{font-family:"Orbitron",sans-serif;color:#fff;direction:ltr}\
.ej-bar{height:5px;border-radius:3px;background:rgba(255,255,255,.1);overflow:hidden}\
.ej-bar i{display:block;height:100%;background:linear-gradient(90deg,var(--ej-cyan),var(--ej-lime));transition:width .9s linear}\
.ej-actions{display:flex;flex-wrap:wrap;gap:10px}\
\
.ej-empty{height:100%;min-height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px;color:var(--ej-faint);gap:8px}\
.ej-empty svg{width:46px;height:46px;stroke:rgba(0,242,255,.45);fill:none;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;margin-bottom:6px}\
.ej-empty b{font-size:15px;color:var(--ej-dim);font-weight:800}\
.ej-empty p{margin:0;font-size:12.5px;line-height:1.8;max-width:30ch}\
\
.ej-toasts{position:fixed;z-index:9986;display:flex;flex-direction:column;gap:8px;width:min(340px,calc(100vw - 24px));pointer-events:none;direction:rtl}\
.ej-toast{pointer-events:auto;display:flex;gap:11px;align-items:center;text-align:start;padding:12px 14px;border-radius:14px;background:rgba(0,0,0,.96);border:1px solid rgba(163,230,53,.55);box-shadow:0 10px 34px rgba(0,0,0,.6);animation:ej-pop .2s ease-out;width:100%}\
.ej-toast.news{border-color:rgba(0,242,255,.55)}\
.ej-toast .ic{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(163,230,53,.12);flex-shrink:0}\
.ej-toast.news .ic{background:rgba(0,242,255,.12)}\
.ej-toast .ic svg{width:18px;height:18px;stroke:var(--ej-lime);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\
.ej-toast.news .ic svg{stroke:var(--ej-cyan)}\
.ej-toast .t{flex:1;min-width:0}\
.ej-toast .t b{display:block;font-size:13px;font-weight:900;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
.ej-toast .t span{display:block;font-size:11.5px;color:var(--ej-faint)}\
\
@media (max-width:720px){\
  .ej-win,.ej-win.big{inset:0!important;left:0!important;top:0!important;width:100%;height:100%;height:100dvh;border-radius:0;border:0;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}\
  .ej-win::before{top:env(safe-area-inset-top)}\
  .ej-head{cursor:default;padding:14px 12px 12px}\
  .ej-grip,.ej-size{display:none}\
  .ej-body{grid-template-columns:1fr}\
  .ej-win.big .ej-body{grid-template-columns:1fr}\
  .ej-side{border-right:0}\
  .ej-detail{display:none;padding:20px 18px 40px}\
  .ej-win.m-detail .ej-side{display:none}\
  .ej-win.m-detail .ej-detail{display:block}\
  .ej-win.m-detail .ej-back{display:flex}\
  .ej-item{padding:14px 14px 14px 12px}\
  .ej-item[aria-selected="true"]{background:transparent;box-shadow:none}\
  .ej-ibtn{width:40px;height:40px}\
  .ej-tab{padding:12px 8px 13px;font-size:14px}\
  .ej-btn{padding:14px 22px;width:100%}\
  .ej-actions{flex-direction:column}\
  .ej-fab{width:52px;height:52px}\
}\
@media (prefers-reduced-motion:reduce){.ej-win.open,.ej-toast{animation:none}.ej-bar i{transition:none}}\
';

  var ICON = {
    mail:  '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>',
    news:  '<svg viewBox="0 0 24 24"><path d="M5 4h11a3 3 0 0 1 3 3v12H7a2 2 0 0 1-2-2V4z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    big:   '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>',
    small: '<svg viewBox="0 0 24 24"><path d="M20 10h-6V4M4 14h6v6M14 10l7-7M10 14l-7 7"/></svg>',
    back:  '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
    pin:   '<svg class="ej-pin" viewBox="0 0 24 24"><path d="M12 17v5M8 3h8l-1 7 3 3H6l3-3-1-7z"/></svg>',
    room:  '<svg viewBox="0 0 24 24"><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M2 21h20M12 12h.01"/></svg>'
  };

  /* ───────────────────────── state ───────────────────────── */
  var S = null;   // created on init

  function newState(db, user, opts, api) {
    return {
      db: db, uid: user.uid, user: user, opts: opts || {}, api: api,
      news: {}, userNews: {}, banner: null, invites: {},
      tab: lsGet(KEY.tab, 'news'), sel: { news: null, invites: null },
      open: false, big: !!lsGet(KEY.big, false), mobileDetail: false,
      read: lsGet(KEY.read(user.uid), {}),
      ready: { news: false, userNews: false, invites: false, banner: false },
      seen: {}, unsubs: [], timers: [], el: {}, dragMoved: false
    };
  }

  /* ───────────────────────── data ───────────────────────── */
  function normalize(id, raw, source) {
    if (!raw || typeof raw !== 'object') return null;
    if (raw.visible === false) return null;
    if (raw.expiresAt && raw.expiresAt < Date.now()) return null;
    var title = String(raw.title || '').trim();
    var body = String(raw.body || raw.message || raw.text || '').trim();
    if (!title && !body) return null;
    var cat = CATS[raw.category] ? raw.category : (source === 'user' ? 'notice' : 'announcement');
    return {
      id: source + ':' + id, source: source, title: title || plain(body).slice(0, 60),
      body: body, category: cat, tag: String(raw.tag || '').trim().slice(0, 14),
      ts: Number(raw.timestamp || raw.sentAt || 0), pinned: !!raw.pinned, author: raw.author || raw.sentBy || '',
      actionLabel: String(raw.actionLabel || '').trim().slice(0, 30), actionUrl: safeUrl(raw.actionUrl)
    };
  }
  function newsItems() {
    var out = [];
    Object.keys(S.news).forEach(function (k) { var n = normalize(k, S.news[k], 'news'); if (n) out.push(n); });
    Object.keys(S.userNews).forEach(function (k) { var n = normalize(k, S.userNews[k], 'user'); if (n) out.push(n); });
    var b = S.banner;
    if (b && b.active !== false && !b.newsId && (b.text || b.message) && Number(b.sentAt || 0) > Date.now() - DAY) {
      var n2 = normalize('banner', { title: 'إعلان من الإدارة', body: b.text || b.message, category: 'announcement', timestamp: b.sentAt, author: b.sentBy }, 'banner');
      if (n2) out.push(n2);
    }
    out.sort(function (a, c) { return (c.pinned - a.pinned) || (c.ts - a.ts); });
    return out;
  }
  function inviteItems() {
    var out = [], now = Date.now();
    Object.keys(S.invites).forEach(function (k) {
      var v = S.invites[k];
      if (!v || typeof v !== 'object') return;
      if (v.status && v.status !== 'pending') return;
      if (v.expiresAt && v.expiresAt <= now) return;
      if (!v.roomCode) return;
      out.push({ id: 'inv:' + k, key: k, from: v.fromName || 'صديق', fromUid: v.fromUid, roomCode: String(v.roomCode).toUpperCase(), ts: Number(v.timestamp || 0), expiresAt: Number(v.expiresAt || 0) });
    });
    out.sort(function (a, c) { return c.ts - a.ts; });
    return out;
  }
  function isUnread(item) {
    if (S.read[item.id]) return false;
    return item.ts > Date.now() - 30 * DAY;
  }
  function unreadNews() { return newsItems().filter(isUnread).length; }
  function markRead(id) {
    if (S.read[id]) return;
    S.read[id] = Date.now();
    // keep the map small
    var keys = Object.keys(S.read);
    if (keys.length > 300) { keys.sort(function (a, b) { return S.read[a] - S.read[b]; }).slice(0, keys.length - 300).forEach(function (k) { delete S.read[k]; }); }
    lsSet(KEY.read(S.uid), S.read);
  }

  /* ───────────────────────── DOM ───────────────────────── */
  function build() {
    if (!document.getElementById('ej-inbox-style')) {
      var st = document.createElement('style'); st.id = 'ej-inbox-style'; st.textContent = CSS; document.head.appendChild(st);
    }
    var root = document.createElement('div');
    root.id = 'ej-inbox-root';
    root.innerHTML =
      '<button class="ej-fab" type="button" aria-label="صندوق الوارد" aria-expanded="false">' + ICON.mail + '<span class="ej-badge" hidden>0</span></button>' +
      '<section class="ej-win" role="dialog" aria-label="صندوق الوارد">' +
        '<header class="ej-head">' +
          '<div class="ej-grip" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
          '<button class="ej-ibtn ej-back" type="button" aria-label="رجوع إلى القائمة">' + ICON.back + '</button>' +
          '<div class="ej-head-title"><h2>صندوق الوارد</h2><div class="ej-sub"></div></div>' +
          '<button class="ej-ibtn ej-size" type="button" aria-label="تكبير النافذة" title="تكبير / تصغير"></button>' +
          '<button class="ej-ibtn ej-x" type="button" aria-label="إغلاق">' + ICON.close + '</button>' +
        '</header>' +
        '<div class="ej-body">' +
          '<div class="ej-side">' +
            '<div class="ej-tabs" role="tablist">' +
              '<button class="ej-tab" type="button" role="tab" data-tab="news">الأخبار <span class="n"></span></button>' +
              '<button class="ej-tab" type="button" role="tab" data-tab="invites">الدعوات <span class="n"></span></button>' +
            '</div>' +
            '<div class="ej-toolbar"><span class="ej-count"></span><button type="button" class="ej-markall">تعليم الكل كمقروء</button></div>' +
            '<div class="ej-list" role="listbox" tabindex="0"></div>' +
          '</div>' +
          '<article class="ej-detail" aria-live="polite"></article>' +
        '</div>' +
      '</section>' +
      '<div class="ej-toasts" aria-live="polite"></div>';
    document.body.appendChild(root);
    var q = function (s) { return root.querySelector(s); };
    S.el = { root: root, fab: q('.ej-fab'), badge: q('.ej-badge'), win: q('.ej-win'), head: q('.ej-head'), sub: q('.ej-sub'),
      size: q('.ej-size'), x: q('.ej-x'), back: q('.ej-back'), tabs: root.querySelectorAll('.ej-tab'),
      list: q('.ej-list'), detail: q('.ej-detail'), count: q('.ej-count'), markall: q('.ej-markall'), toasts: q('.ej-toasts') };
    S.el.win.classList.toggle('big', S.big);
    S.el.size.innerHTML = S.big ? ICON.small : ICON.big;
    placeFab();
    bind();
  }

  function isMobile() { return window.matchMedia && window.matchMedia('(max-width:720px)').matches; }

  /* ─────────── positions (draggable) ─────────── */
  function placeFab() {
    var f = S.el.fab, p = lsGet(KEY.fab, null), w = 56, h = 56;
    var mob = isMobile();
    var x = p ? p.x : 16;
    var y = p ? p.y : window.innerHeight - h - (mob ? 88 : 20);
    f.style.left = clamp(x, 8, window.innerWidth - w - 8) + 'px';
    f.style.top = clamp(y, 8, window.innerHeight - h - 8) + 'px';
    positionToasts();
  }
  function positionToasts() {
    var r = S.el.fab.getBoundingClientRect(), t = S.el.toasts;
    var below = r.top > window.innerHeight / 2;
    t.style.left = clamp(r.left, 12, Math.max(12, window.innerWidth - 352)) + 'px';
    if (below) { t.style.top = 'auto'; t.style.bottom = (window.innerHeight - r.top + 10) + 'px'; }
    else { t.style.bottom = 'auto'; t.style.top = (r.bottom + 10) + 'px'; }
  }
  function placeWin(forceCenter) {
    if (isMobile()) return;
    var w = S.el.win, p = forceCenter ? null : lsGet(KEY.pos, null);
    var r = w.getBoundingClientRect(), ww = r.width || 980, wh = r.height || 640;
    var x = p ? p.x : Math.round((window.innerWidth - ww) / 2);
    var y = p ? p.y : Math.round((window.innerHeight - wh) / 2);
    w.style.left = clamp(x, 0, Math.max(0, window.innerWidth - ww)) + 'px';
    w.style.top = clamp(y, 0, Math.max(0, window.innerHeight - wh)) + 'px';
  }
  function makeDraggable(el, handle, opts) {
    opts = opts || {};
    handle.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (opts.ignore && e.target.closest(opts.ignore)) return;
      if (opts.enabled && !opts.enabled()) return;
      var rect = el.getBoundingClientRect(), dx = e.clientX - rect.left, dy = e.clientY - rect.top;
      var sx = e.clientX, sy = e.clientY, moved = false;
      try { handle.setPointerCapture(e.pointerId); } catch (err) {}
      function move(ev) {
        if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 5) return;
        moved = true; handle.classList.add('dragging');
        var r = el.getBoundingClientRect();
        el.style.left = clamp(ev.clientX - dx, 0, Math.max(0, window.innerWidth - r.width)) + 'px';
        el.style.top = clamp(ev.clientY - dy, 0, Math.max(0, window.innerHeight - r.height)) + 'px';
        if (opts.onMove) opts.onMove();
      }
      function up() {
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
        handle.removeEventListener('pointercancel', up);
        handle.classList.remove('dragging');
        try { handle.releasePointerCapture(e.pointerId); } catch (err) {}
        if (moved && opts.onEnd) opts.onEnd({ x: parseFloat(el.style.left), y: parseFloat(el.style.top) });
        opts.moved = moved;
      }
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
      handle.addEventListener('pointercancel', up);
    });
  }

  /* ─────────── events ─────────── */
  function bind() {
    var E = S.el;
    var fabDrag = { onMove: positionToasts, onEnd: function (p) { lsSet(KEY.fab, p); positionToasts(); }, moved: false };
    makeDraggable(E.fab, E.fab, fabDrag);
    E.fab.addEventListener('click', function () {
      if (fabDrag.moved) { fabDrag.moved = false; return; }
      toggle();
    });
    makeDraggable(E.win, E.head, {
      ignore: 'button', enabled: function () { return !isMobile(); },
      onEnd: function (p) { lsSet(KEY.pos, p); }
    });
    E.x.addEventListener('click', close);
    E.size.addEventListener('click', function () {
      S.big = !S.big; lsSet(KEY.big, S.big);
      E.win.classList.toggle('big', S.big); E.size.innerHTML = S.big ? ICON.small : ICON.big;
      placeWin(false);
    });
    E.back.addEventListener('click', function () { S.mobileDetail = false; E.win.classList.remove('m-detail'); });
    E.tabs.forEach(function (t) { t.addEventListener('click', function () { setTab(t.dataset.tab); }); });
    E.markall.addEventListener('click', function () {
      newsItems().forEach(function (n) { markRead(n.id); });
      renderAll();
    });
    E.list.addEventListener('click', function (e) {
      var it = e.target.closest('.ej-item'); if (!it) return;
      select(it.dataset.id, true);
    });
    E.list.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      var items = Array.prototype.slice.call(E.list.querySelectorAll('.ej-item')); if (!items.length) return;
      var i = items.findIndex(function (n) { return n.getAttribute('aria-selected') === 'true'; });
      i = clamp(i + (e.key === 'ArrowDown' ? 1 : -1), 0, items.length - 1);
      e.preventDefault(); select(items[i].dataset.id, false); items[i].scrollIntoView({ block: 'nearest' });
    });
    E.detail.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return;
      var act = b.dataset.act;
      if (act === 'accept') acceptInvite(b.dataset.key);
      else if (act === 'decline') declineInvite(b.dataset.key);
      else if (act === 'unread') { delete S.read[b.dataset.id]; lsSet(KEY.read(S.uid), S.read); renderAll(); }
    });
    document.addEventListener('keydown', S.onKey = function (e) { if (e.key === 'Escape' && S.open) close(); });
    window.addEventListener('resize', S.onResize = function () { placeFab(); if (S.open) placeWin(false); });
  }

  function setTab(tab) {
    S.tab = tab === 'invites' ? 'invites' : 'news'; lsSet(KEY.tab, S.tab);
    S.mobileDetail = false; S.el.win.classList.remove('m-detail');
    if (S.tab === 'news' && S.sel.news && !isMobile()) markRead(S.sel.news);
    renderAll();
  }
  function select(id, userClick) {
    S.sel[S.tab] = id;
    if (S.tab === 'news') markRead(id);
    if (isMobile() && userClick) { S.mobileDetail = true; S.el.win.classList.add('m-detail'); S.el.detail.scrollTop = 0; }
    renderAll(true);
  }

  /* ─────────── open / close ─────────── */
  function open(tab, id) {
    if (!S) return;
    if (tab) S.tab = tab === 'invites' ? 'invites' : 'news';
    if (id) S.sel[S.tab] = id;
    S.open = true;
    S.el.win.classList.add('open'); S.el.fab.setAttribute('aria-expanded', 'true');
    S.el.fab.style.visibility = isMobile() ? 'hidden' : 'visible';
    if (isMobile()) { document.documentElement.style.overflow = 'hidden'; }
    S.mobileDetail = !!(id && isMobile()); S.el.win.classList.toggle('m-detail', S.mobileDetail);
    if (S.tab === 'news' && S.sel.news && (!isMobile() || S.mobileDetail)) markRead(S.sel.news);   // already-selected item is now visible
    placeWin(false); renderAll();
    setTimeout(function () { try { S.el.list.focus({ preventScroll: true }); } catch (e) {} }, 30);
  }
  function close() {
    if (!S) return;
    S.open = false; S.el.win.classList.remove('open', 'm-detail'); S.el.fab.setAttribute('aria-expanded', 'false');
    S.el.fab.style.visibility = 'visible'; document.documentElement.style.overflow = '';
    S.mobileDetail = false;
  }
  function toggle() { S.open ? close() : open(); }

  /* ─────────── rendering ─────────── */
  function chipFor(n) {
    var c = CATS[n.category] || CATS.announcement;
    return '<span class="ej-chip ' + c.cls + '">' + c.label + '</span>';
  }
  function renderAll(keepScroll) {
    if (!S || !S.el.root) return;
    var news = newsItems(), inv = inviteItems();

    var items = S.tab === 'news' ? news : inv;
    // ensure a valid selection (desktop auto-selects the first item)
    var selId = S.sel[S.tab];
    if (!items.some(function (i) { return i.id === selId; })) {
      selId = (!isMobile() && items.length) ? items[0].id : null;
      S.sel[S.tab] = selId;
      if (selId && S.tab === 'news' && S.open) markRead(selId);   // it is now on screen
    }
    var un = news.filter(isUnread).length;

    // badge + launcher
    var total = un + inv.length;
    S.el.badge.textContent = total > 99 ? '99+' : total;
    S.el.badge.hidden = total === 0;
    S.el.fab.classList.toggle('has-invite', inv.length > 0);
    S.el.fab.setAttribute('aria-label', 'صندوق الوارد' + (total ? ' — ' + total + ' جديد' : ''));

    // tabs
    S.el.tabs.forEach(function (t) {
      var isNews = t.dataset.tab === 'news', n = t.querySelector('.n'), cnt = isNews ? un : inv.length;
      t.setAttribute('aria-selected', String(t.dataset.tab === S.tab));
      n.textContent = cnt; n.style.display = cnt ? '' : 'none'; n.classList.toggle('hot', cnt > 0);
    });
    S.el.sub.textContent = total ? (total === 1 ? 'لديك عنصر جديد واحد' : 'لديك ' + arDigits(total) + ' عناصر جديدة') : 'كل شيء مقروء';

    // toolbar
    S.el.markall.style.display = (S.tab === 'news' && un) ? '' : 'none';
    S.el.count.textContent = S.tab === 'news'
      ? (news.length ? arDigits(news.length) + (news.length === 1 ? ' خبر' : ' أخبار') : '')
      : (inv.length ? arDigits(inv.length) + (inv.length === 1 ? ' دعوة' : ' دعوات') : '');

    // list
    var prev = S.el.list.scrollTop;
    S.el.list.innerHTML = items.length ? items.map(function (i) { return S.tab === 'news' ? newsRow(i, selId) : inviteRow(i, selId); }).join('') : '';
    if (keepScroll) S.el.list.scrollTop = prev;
    if (!items.length) {
      S.el.list.innerHTML = '<div class="ej-empty">' + (S.tab === 'news' ? ICON.news : ICON.room) +
        '<b>' + (S.tab === 'news' ? 'لا توجد أخبار بعد' : 'لا توجد دعوات') + '</b><p>' +
        (S.tab === 'news' ? 'ستظهر هنا تحديثات اللعبة وإعلانات الإدارة فور نشرها.' : 'عندما يدعوك صديق إلى غرفة ستجد الدعوة هنا.') + '</p></div>';
    }

    // detail
    var cur = items.filter(function (i) { return i.id === selId; })[0];
    S.el.detail.innerHTML = cur ? (S.tab === 'news' ? newsDetail(cur) : inviteDetail(cur)) : detailEmpty();
    tickCountdown();
  }

  function newsRow(n, selId) {
    var sideChip = n.tag ? '<span class="ej-chip tag c-tag">' + esc(n.tag) + '</span>' : chipFor(n);
    return '<button type="button" class="ej-item' + (isUnread(n) ? ' unread' : '') + '" role="option" data-id="' + esc(n.id) + '" aria-selected="' + (n.id === selId) + '">' +
      '<span class="ej-dot"></span>' +
      '<span><span class="ej-item-title">' + esc(n.title) + (n.pinned ? ICON.pin : '') + '</span><span class="ej-item-prev">' + esc(plain(n.body)) + '</span></span>' +
      '<span class="ej-item-side">' + sideChip + '<time>' + esc(ago(n.ts)) + '</time></span></button>';
  }
  function inviteRow(v, selId) {
    return '<button type="button" class="ej-item unread" role="option" data-id="' + esc(v.id) + '" aria-selected="' + (v.id === selId) + '">' +
      '<span class="ej-dot"></span>' +
      '<span><span class="ej-item-title">دعوة من ' + esc(v.from) + '</span><span class="ej-item-prev">الغرفة ' + esc(v.roomCode) + '</span></span>' +
      '<span class="ej-item-side"><span class="ej-chip c-update" data-left="' + v.expiresAt + '">' + (v.expiresAt ? mmss(v.expiresAt - Date.now()) : '') + '</span><time>' + esc(ago(v.ts)) + '</time></span></button>';
  }
  function newsDetail(n) {
    var btn = (n.actionUrl && n.actionLabel)
      ? '<a class="ej-btn primary" href="' + esc(n.actionUrl) + '"' + (/^https:/i.test(n.actionUrl) ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + esc(n.actionLabel) + '</a>' : '<span></span>';
    return '<div class="ej-meta">' + chipFor(n) + (n.tag ? '<span class="ej-chip tag c-tag">' + esc(n.tag) + '</span>' : '') +
        (n.pinned ? '<span class="ej-chip c-tag">مثبّت</span>' : '') + '<span class="d">' + esc(longDate(n.ts)) + '</span></div>' +
      '<h3>' + esc(n.title) + '</h3>' +
      '<div class="ej-prose">' + formatBody(n.body) + '</div>' +
      '<div class="ej-foot"><span class="by">' + (n.author ? 'نُشر بواسطة ' + esc(n.author) : 'من إدارة اللعبة') + '</span>' + btn +
        '<button type="button" class="ej-btn ghost" data-act="unread" data-id="' + esc(n.id) + '" style="padding:7px 14px;font-size:12px">تعليم كغير مقروء</button></div>';
  }
  function inviteDetail(v) {
    return '<div class="ej-invite"><div class="from">دعوة للعب</div><div class="who">' + esc(v.from) + '</div>' +
      '<div class="ej-code"><span>كود الغرفة</span><b>' + esc(v.roomCode) + '</b></div>' +
      '<div class="ej-left"><div class="row"><span>الوقت المتبقي</span><b data-left-text="' + v.expiresAt + '">' + (v.expiresAt ? mmss(v.expiresAt - Date.now()) : '') + '</b></div>' +
        '<div class="ej-bar"><i data-left-bar="' + v.expiresAt + '" data-total="' + (v.expiresAt && v.ts ? v.expiresAt - v.ts : 300000) + '" style="width:100%"></i></div></div>' +
      '<div class="ej-actions"><button type="button" class="ej-btn primary" data-act="accept" data-key="' + esc(v.key) + '">قبول والانضمام</button>' +
      '<button type="button" class="ej-btn ghost" data-act="decline" data-key="' + esc(v.key) + '">رفض</button></div></div>';
  }
  function detailEmpty() {
    return '<div class="ej-empty">' + (S.tab === 'news' ? ICON.news : ICON.room) +
      '<b>' + (S.tab === 'news' ? 'اختر خبراً لقراءته' : 'اختر دعوة') + '</b><p>' +
      (S.tab === 'news' ? 'تفاصيل الخبر الكاملة ستظهر هنا.' : 'تفاصيل الدعوة وأزرار القبول والرفض ستظهر هنا.') + '</p></div>';
  }

  function tickCountdown() {
    if (!S || !S.el.root) return;
    var now = Date.now(), expiredAny = false;
    S.el.root.querySelectorAll('[data-left]').forEach(function (n) { var e = +n.dataset.left; if (e) { n.textContent = mmss(e - now); if (e <= now) expiredAny = true; } });
    S.el.root.querySelectorAll('[data-left-text]').forEach(function (n) { var e = +n.dataset.leftText; if (e) n.textContent = mmss(e - now); });
    S.el.root.querySelectorAll('[data-left-bar]').forEach(function (n) { var e = +n.dataset.leftBar, t = +n.dataset.total || 300000; n.style.width = clamp((e - now) / t * 100, 0, 100) + '%'; });
    if (expiredAny) renderAll(true);
  }

  /* ─────────── invite actions ─────────── */
  async function removeInvite(key, statusIfDenied) {
    var a = S.api, r = a.ref(S.db, 'invites/' + S.uid + '/' + key);
    try { await a.remove(r); }
    catch (e) { try { await a.update(r, { status: statusIfDenied }); } catch (e2) {} }
    delete S.invites[key];
  }
  async function acceptInvite(key) {
    var v = S.invites[key];
    if (!v) return;
    if (v.expiresAt && v.expiresAt <= Date.now()) { toast('انتهت صلاحية الدعوة', 'اطلب من صديقك إرسال دعوة جديدة', 'invite'); await removeInvite(key, 'expired'); renderAll(); return; }
    var code = String(v.roomCode).toUpperCase();
    await removeInvite(key, 'accepted');
    close();
    if (S.opts.onJoin) S.opts.onJoin(code);
    else { try { localStorage.setItem('currentRoom', code); localStorage.setItem('isHost', 'false'); } catch (e) {} window.location.href = 'room.html?room=' + encodeURIComponent(code); }
  }
  async function declineInvite(key) {
    await removeInvite(key, 'declined');
    S.sel.invites = null; S.mobileDetail = false; S.el.win.classList.remove('m-detail');
    renderAll();
  }

  /* ─────────── toasts ─────────── */
  function toast(title, sub, kind, onClick) {
    var t = document.createElement('button');
    t.type = 'button'; t.className = 'ej-toast ' + (kind === 'news' ? 'news' : 'invite');
    t.innerHTML = '<span class="ic">' + (kind === 'news' ? ICON.news : ICON.mail) + '</span><span class="t"><b>' + esc(title) + '</b><span>' + esc(sub) + '</span></span>';
    t.addEventListener('click', function () { t.remove(); if (onClick) onClick(); });
    S.el.toasts.appendChild(t);
    while (S.el.toasts.children.length > 3) S.el.toasts.firstChild.remove();
    positionToasts();
    setTimeout(function () { if (t.parentNode) t.remove(); }, 8000);
    if (kind !== 'news') { try { if (window.SND && SND.play) SND.play('achievement'); } catch (e) {} }
  }

  /* ─────────── live listeners ─────────── */
  function listen(path, key, onData, q) {
    var a = S.api;
    try {
      var un = a.onValue(q || a.ref(S.db, path), function (snap) {
        var v = snap.val();
        onData(v);
        S.ready[key] = true;
        renderAll(true);
      }, function (err) {
        // permission errors are expected until the database rules include this path
        if (window.console) console.warn('[EJInbox] cannot read "' + path + '":', err && err.message);
        S.ready[key] = true;
      });
      S.unsubs.push(un);
    } catch (e) { if (window.console) console.warn('[EJInbox] listener failed for', path, e); }
  }
  function watchNew(prefix, before, after) {
    // toast for genuinely new (post-initial-load) unread items
    Object.keys(after).forEach(function (id) {
      if (before[id]) return;
      var n = normalize(id, after[id], prefix);
      if (!n || !isUnread(n) || n.ts < Date.now() - 10 * 60000 || S.seen[n.id]) return;
      S.seen[n.id] = 1;
      toast(n.title, CATS[n.category].label + (n.tag ? ' ' + n.tag : ''), 'news', function () { open('news', n.id); select(n.id, true); });
    });
  }

  async function init(db, user, opts) {
    if (!user || !user.uid) return;
    if (S && S.uid === user.uid) return;
    if (S) destroy();
    var api = (opts && opts.dbApi) || await import(DB_MODULE);
    S = newState(db, user, opts, api);
    build();

    listen('news', 'news', function (v) {
      v = v || {};
      if (S.ready.news) watchNew('news', S.news, v); else Object.keys(v).forEach(function (k) { S.seen['news:' + k] = 1; });
      S.news = v;
    }, api.query && api.limitToLast ? api.query(api.ref(db, 'news'), api.limitToLast(60)) : null);

    listen('userNews/' + S.uid, 'userNews', function (v) {
      v = v || {};
      if (S.ready.userNews) watchNew('user', S.userNews, v); else Object.keys(v).forEach(function (k) { S.seen['user:' + k] = 1; });
      S.userNews = v;
    });

    listen('announcements/current', 'banner', function (v) { S.banner = v || null; });

    listen('invites/' + S.uid, 'invites', function (v) {
      v = v || {};
      var before = S.invites;
      S.invites = v;
      if (S.ready.invites) {
        Object.keys(v).forEach(function (k) {
          if (before[k]) return;
          var it = inviteItems().filter(function (i) { return i.key === k; })[0];
          if (!it) return;
          toast('دعوة من ' + it.from, 'الغرفة ' + it.roomCode, 'invite', function () { open('invites', it.id); select(it.id, true); });
        });
      }
    });

    S.timers.push(setInterval(function () { if (S.open || inviteItems().length) tickCountdown(); }, 1000));
    S.timers.push(setInterval(function () { renderAll(true); }, 60000));   // refresh relative times + expiry
    renderAll();
  }

  function destroy() {
    if (!S) return;
    S.unsubs.forEach(function (u) { try { u && u(); } catch (e) {} });
    S.timers.forEach(clearInterval);
    document.removeEventListener('keydown', S.onKey);
    window.removeEventListener('resize', S.onResize);
    document.documentElement.style.overflow = '';
    if (S.el.root) S.el.root.remove();
    S = null;
  }

  window.EJInbox = { init: init, open: function (t, id) { open(t, id); if (id) select(id, true); }, close: close, toggle: function () { if (S) toggle(); }, destroy: destroy };
})();