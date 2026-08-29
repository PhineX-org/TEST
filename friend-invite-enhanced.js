// ============================================================
// EL JASUS — ENHANCED FRIEND INVITE SYSTEM v3.0
// - Game invites (room member -> friend, "come join me")
// - Join requests (friend -> room member, "let me join you",
//   only sent when that friend is in a waiting-stage room —
//   PUBG-style, requires their explicit accept)
// - A persistent inbox (mailbox icon + unread badge) so a
//   missed 5-second prompt is never actually lost
// Applies inviter's theme to notifications. Works on every
// page that loads this file (home.html, room.html, friends.html).
// ============================================================

(function () {
  'use strict';

  const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyDnd-pmKEatI3DaFz6xHWB5ucurtHXt9tk',
    authDomain: 'el-jasus.firebaseapp.com',
    databaseURL: 'https://el-jasus-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'el-jasus',
    storageBucket: 'el-jasus.firebasestorage.app',
    messagingSenderId: '415659587906',
    appId: '1:415659587906:web:782f7940176ea4097eb0db',
  };

  const INVITE_TTL   = 5 * 60 * 1000; // 5 minutes — how long an item stays valid / sits in the inbox
  const SHRINK_DELAY = 5000;          // 5 seconds — the quick-decision window before a toast shrinks

  // ── CSS injection ──────────────────────────────────────────
  const css = `
    /* ═══ GLOBAL INVITE TOASTS (bottom-center) ═══ */
    #fi-container {
      position: fixed; bottom: calc(84px + env(safe-area-inset-bottom)); left: 50%;
      transform: translateX(-50%);
      z-index: 10500;
      display: flex; flex-direction: column; gap: 10px;
      align-items: center; pointer-events: none;
      width: min(420px, 94vw);
    }
    
    /* ═══ HOME.HTML NOTIFICATION PANEL (top-right) ═══ */
    #fi-home-panel {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10500;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 380px;
      pointer-events: none;
    }
    
    @media (max-width: 640px) {
      #fi-home-panel {
        top: 10px;
        right: 10px;
        max-width: calc(100vw - 20px);
      }
    }
    
    /* ═══ TOAST CARD STYLES ═══ */
    .fi-toast {
      width: 100%;
      background: linear-gradient(135deg, rgba(10,14,26,.97), rgba(20,25,45,.97));
      border: 2px solid rgba(0,242,255,.45);
      border-radius: 20px;
      padding: 16px 18px;
      font-family: 'Cairo', sans-serif;
      box-shadow: 0 8px 32px rgba(0,0,0,.55), 0 0 24px rgba(0,242,255,.15);
      backdrop-filter: blur(20px);
      pointer-events: all;
      animation: fi-slideIn .35s cubic-bezier(.4,0,.2,1);
      direction: rtl;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .fi-toast.fi-shrunk {
      padding: 10px 12px;
      border-radius: 50px;
      max-width: 80px;
      overflow: hidden;
      cursor: pointer;
    }
    
    .fi-toast.fi-shrunk .fi-expandable {
      display: none;
    }
    
    .fi-toast.fi-shrunk .fi-mini-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    
    .fi-mini-icon {
      display: none;
    }
    
    .fi-toast.fi-leaving {
      animation: fi-slideOut .3s ease forwards;
    }

    /* Join-request toasts get their own accent (still cyan family, just
       a second border tone) so they read as visually distinct from a
       regular "come join me" invite at a glance. */
    .fi-toast.fi-join-request {
      border-color: rgba(163,230,53,.5);
      box-shadow: 0 8px 32px rgba(0,0,0,.55), 0 0 24px rgba(163,230,53,.18);
    }
    
    /* ═══ THEMED INVITES ═══ */
    .fi-toast.themed-fire {
      background: linear-gradient(135deg, rgba(139,0,0,.97), rgba(255,69,0,.95));
      border-color: rgba(255,140,0,.6);
      box-shadow: 0 8px 32px rgba(255,69,0,.4), 0 0 30px rgba(255,140,0,.3);
    }
    
    .fi-toast.themed-ice {
      background: linear-gradient(135deg, rgba(0,50,100,.97), rgba(100,150,200,.95));
      border-color: rgba(136,221,255,.6);
      box-shadow: 0 8px 32px rgba(100,180,255,.4), 0 0 30px rgba(136,221,255,.3);
    }
    
    .fi-toast.themed-neon {
      background: linear-gradient(135deg, rgba(20,0,40,.97), rgba(80,20,120,.95));
      border-color: rgba(124,48,255,.6);
      box-shadow: 0 8px 32px rgba(124,48,255,.5), 0 0 30px rgba(124,48,255,.4);
    }
    
    .fi-toast.themed-gold {
      background: linear-gradient(135deg, rgba(50,40,0,.97), rgba(100,80,0,.95));
      border-color: rgba(255,215,0,.6);
      box-shadow: 0 8px 32px rgba(255,215,0,.4), 0 0 30px rgba(255,215,0,.3);
    }
    
    .fi-toast.themed-emerald {
      background: linear-gradient(135deg, rgba(0,50,40,.97), rgba(0,100,60,.95));
      border-color: rgba(0,255,136,.6);
      box-shadow: 0 8px 32px rgba(0,200,100,.4), 0 0 30px rgba(0,255,136,.3);
    }
    
    /* ═══ ANIMATIONS ═══ */
    @keyframes fi-slideIn {
      from { opacity:0; transform:translateY(18px) scale(.96); }
      to   { opacity:1; transform:translateY(0)   scale(1); }
    }
    
    @keyframes fi-slideOut {
      to   { opacity:0; transform:translateY(18px) scale(.95); }
    }
    
    @keyframes fi-pulse {
      0%, 100% { opacity:1; }
      50% { opacity:.45; }
    }
    
    /* ═══ CARD CONTENTS ═══ */
    .fi-header {
      display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
    }
    
    .fi-avatar {
      width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg,#00f2ff,#7c30ff);
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; color: white;
    }
    
    .fi-info { flex: 1; }
    .fi-title { font-size: 13px; font-weight: 900; color: #fff; }
    .fi-sub   { font-size: 11px; color: rgba(255,255,255,.55); margin-top: 1px; }
    
    .fi-timer-bar {
      height: 3px; border-radius: 2px;
      background: rgba(255,255,255,.1);
      overflow: hidden; margin-bottom: 12px;
    }
    
    .fi-timer-fill {
      height: 100%; border-radius: 2px;
      background: linear-gradient(90deg,#00f2ff,#7c30ff);
      transition: width .5s linear;
    }
    
    .fi-timer-fill.fi-urgent {
      background: linear-gradient(90deg,#f97316,#ef4444);
    }
    
    .fi-timer-label {
      font-size: 10px; color: rgba(255,255,255,.4);
      text-align: left; direction: ltr;
      margin-bottom: 10px; font-family: 'Orbitron', monospace;
    }
    
    .fi-btns { display: flex; gap: 10px; }
    
    .fi-btn {
      flex: 1; padding: 10px; border-radius: 12px;
      font-family: 'Cairo', sans-serif; font-weight: 900; font-size: 13px;
      cursor: pointer; border: 2px solid; transition: all .2s;
    }
    
    .fi-btn-accept {
      background: rgba(34,197,94,.15); border-color: rgba(34,197,94,.5); color: #22c55e;
    }
    
    .fi-btn-accept:hover { background: rgba(34,197,94,.3); }
    
    .fi-btn-decline {
      background: rgba(239,68,68,.12); border-color: rgba(239,68,68,.4); color: #ef4444;
    }
    
    .fi-btn-decline:hover { background: rgba(239,68,68,.25); }
    
    .fi-btn:disabled { opacity: .5; cursor: not-allowed; }
    
    .fi-waiting-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700;
      background: rgba(251,191,36,.12); border: 1px solid rgba(251,191,36,.35); color: #fbbf24;
      margin-bottom: 10px;
    }
    
    .fi-pulse { animation: fi-pulse 1.4s ease-in-out infinite; }
    
    .fi-close-btn {
      position: absolute;
      top: 8px;
      left: 8px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(239,68,68,.15);
      border: 1px solid rgba(239,68,68,.3);
      color: #ef4444;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 12px;
      font-weight: 900;
      transition: all 0.2s;
      z-index: 10;
    }
    
    .fi-close-btn:hover {
      background: rgba(239,68,68,.25);
      transform: scale(1.1);
    }

    /* ═══ INBOX TRIGGER (top-right on every page) ═══ */
    #fi-inbox-btn {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 10450;
      width: 44px; height: 44px;
      border-radius: 14px;
      background: rgba(0,0,0,.55);
      border: 1.5px solid rgba(0,242,255,.35);
      backdrop-filter: blur(14px);
      display: flex; align-items: center; justify-content: center;
      color: rgba(0,242,255,1);
      font-size: 18px;
      cursor: pointer;
      transition: all .2s ease;
    }
    #fi-inbox-btn:hover {
      background: rgba(0,242,255,.12);
      border-color: rgba(0,242,255,.6);
      transform: scale(1.06);
    }
    #fi-inbox-badge {
      position: absolute;
      top: -6px; left: -6px;
      min-width: 18px; height: 18px;
      padding: 0 4px;
      border-radius: 9px;
      background: rgba(163,230,53,1);
      color: rgba(0,0,0,.9);
      font-size: 10px; font-weight: 900;
      display: none;
      align-items: center; justify-content: center;
      font-family: 'Cairo', sans-serif;
      box-shadow: 0 0 8px rgba(163,230,53,.6);
    }
    #fi-inbox-badge.fi-show { display: flex; }

    /* ═══ INBOX PANEL ═══ */
    #fi-inbox-backdrop {
      position: fixed; inset: 0; z-index: 10600;
      background: rgba(0,0,0,.75);
      backdrop-filter: blur(6px);
      display: none;
      align-items: center; justify-content: center;
      padding: 16px;
    }
    #fi-inbox-backdrop.fi-open { display: flex; }
    #fi-inbox-panel {
      width: 100%; max-width: 400px; max-height: 82dvh;
      background: rgba(10,14,26,.98);
      border: 1px solid rgba(0,242,255,.3);
      border-radius: 22px;
      display: flex; flex-direction: column;
      overflow: hidden;
      direction: rtl;
      font-family: 'Cairo', sans-serif;
      box-shadow: 0 20px 60px rgba(0,0,0,.6);
    }
    #fi-inbox-head {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 18px;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }
    #fi-inbox-head h3 {
      font-size: 14px; font-weight: 900; color: #fff; margin: 0;
      font-family: 'Orbitron', sans-serif; letter-spacing: .04em;
    }
    #fi-inbox-close {
      width: 30px; height: 30px; border-radius: 9px;
      background: rgba(255,255,255,.06); border: none; color: rgba(255,255,255,.6);
      cursor: pointer; font-size: 13px;
    }
    #fi-inbox-list {
      flex: 1; overflow-y: auto;
      padding: 10px 14px 16px;
      display: flex; flex-direction: column; gap: 10px;
    }
    #fi-inbox-empty {
      text-align: center; padding: 40px 10px; color: rgba(255,255,255,.35); font-size: 13px;
    }
    .fi-inbox-item {
      background: rgba(255,255,255,.03);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 14px;
      padding: 12px 14px;
    }
    .fi-inbox-item.fi-inbox-jr { border-color: rgba(163,230,53,.25); }
    .fi-inbox-row {
      display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px;
    }
    .fi-inbox-kind {
      font-size: 10px; font-weight: 800; color: rgba(0,242,255,.9);
      background: rgba(0,242,255,.1); border-radius: 8px; padding: 2px 8px;
    }
    .fi-inbox-jr .fi-inbox-kind { color: rgba(163,230,53,.95); background: rgba(163,230,53,.12); }
    .fi-inbox-time { font-size: 10px; color: rgba(255,255,255,.35); }
  `;
  
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Containers ─────────────────────────────────────────────
  const globalContainer = document.createElement('div');
  globalContainer.id = 'fi-container';
  document.body.appendChild(globalContainer);

  const homeContainer = document.createElement('div');
  homeContainer.id = 'fi-home-panel';
  document.body.appendChild(homeContainer);

  // Inbox trigger + panel (universal on every page that loads this file)
  const inboxBtn = document.createElement('button');
  inboxBtn.id = 'fi-inbox-btn';
  inboxBtn.setAttribute('aria-label', 'صندوق الدعوات');
  inboxBtn.innerHTML = '<i class="fas fa-envelope"></i><span id="fi-inbox-badge">0</span>';
  document.body.appendChild(inboxBtn);

  const inboxBackdrop = document.createElement('div');
  inboxBackdrop.id = 'fi-inbox-backdrop';
  inboxBackdrop.innerHTML = `
    <div id="fi-inbox-panel">
      <div id="fi-inbox-head">
        <h3>📬 صندوق الدعوات</h3>
        <button id="fi-inbox-close">✕</button>
      </div>
      <div id="fi-inbox-list"></div>
    </div>
  `;
  document.body.appendChild(inboxBackdrop);

  inboxBtn.addEventListener('click', () => { inboxBackdrop.classList.add('fi-open'); renderInbox(); });
  inboxBackdrop.addEventListener('click', (e) => { if (e.target === inboxBackdrop) inboxBackdrop.classList.remove('fi-open'); });
  inboxBackdrop.querySelector('#fi-inbox-close').addEventListener('click', () => inboxBackdrop.classList.remove('fi-open'));

  // ── Active toasts + inbox model ─────────────────────────────
  const active = {};       // key -> { el, interval, shrinkTimeout }  (live toast elements)
  const pending = {};      // key -> { kind:'invite'|'join-request', data }  (drives the inbox + badge)

  function upsertPending(kind, key, data) {
    pending[key] = { kind, data };
    updateBadge();
  }
  function removePending(key) {
    delete pending[key];
    updateBadge();
  }
  function updateBadge() {
    const count = Object.keys(pending).length;
    const badge = document.getElementById('fi-inbox-badge');
    if (!badge) return;
    badge.textContent = count > 9 ? '9+' : String(count);
    badge.classList.toggle('fi-show', count > 0);
    if (inboxBackdrop.classList.contains('fi-open')) renderInbox();
  }

  function relTime(ts) {
    const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (s < 60) return 'الآن';
    const m = Math.floor(s / 60);
    if (m < 60) return `منذ ${m} د`;
    return `منذ ${Math.floor(m / 60)} س`;
  }

  function renderInbox() {
    const list = document.getElementById('fi-inbox-list');
    if (!list) return;
    const items = Object.entries(pending).sort((a, b) => (b[1].data.timestamp || 0) - (a[1].data.timestamp || 0));
    if (!items.length) {
      list.innerHTML = '<div id="fi-inbox-empty">لا توجد دعوات في الوقت الحالي</div>';
      return;
    }
    list.innerHTML = items.map(([key, item]) => {
      const isJR = item.kind === 'join-request';
      const label = isJR ? '🤝 طلب انضمام' : '🎮 دعوة لعب';
      const text  = isJR
        ? `<strong>${item.data.fromName}</strong> يريد الانضمام إلى غرفتك`
        : `دعوة من <strong>${item.data.fromName}</strong> — كود: ${item.data.roomCode}`;
      return `
        <div class="fi-inbox-item ${isJR ? 'fi-inbox-jr' : ''}">
          <div class="fi-inbox-row">
            <span class="fi-inbox-kind">${label}</span>
            <span class="fi-inbox-time">${relTime(item.data.timestamp || Date.now())}</span>
          </div>
          <p style="font-size:13px;color:#fff;margin:0 0 10px;">${text}</p>
          <div class="fi-btns">
            <button class="fi-btn fi-btn-accept" data-ibx-acc="${key}">✅ قبول</button>
            <button class="fi-btn fi-btn-decline" data-ibx-dec="${key}">❌ رفض</button>
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('[data-ibx-acc]').forEach(btn => {
      btn.onclick = () => {
        const key = btn.getAttribute('data-ibx-acc');
        const item = pending[key];
        if (!item) return;
        if (item.kind === 'invite') acceptInvite(currentUser.uid, key, item.data);
        else acceptJoinRequest(currentUser.uid, key, item.data);
      };
    });
    list.querySelectorAll('[data-ibx-dec]').forEach(btn => {
      btn.onclick = () => {
        const key = btn.getAttribute('data-ibx-dec');
        const item = pending[key];
        if (!item) return;
        if (item.kind === 'invite') dismiss(currentUser.uid, key, 'declined');
        else declineJoinRequest(currentUser.uid, key);
      };
    });
  }

  // ── Firebase bootstrap ─────────────────────────────────────
  let db, auth, currentUser;
  let _ref, _update, _remove, _get, _onChildAdded, _onChildRemoved, _onValue, _set, _push, _serverTimestamp;

  async function init() {
    const { initializeApp, getApps } = await import(
      'https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js'
    );
    const authMod = await import(
      'https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js'
    );
    const dbMod = await import(
      'https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js'
    );

    const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
    auth = authMod.getAuth(app);
    db   = dbMod.getDatabase(app);

    _ref             = dbMod.ref;
    _update          = dbMod.update;
    _remove          = dbMod.remove;
    _get             = dbMod.get;
    _onChildAdded    = dbMod.onChildAdded;
    _onChildRemoved  = dbMod.onChildRemoved;
    _onValue         = dbMod.onValue;
    _set             = dbMod.set;
    _push            = dbMod.push;
    _serverTimestamp = dbMod.serverTimestamp;

    authMod.onAuthStateChanged(auth, user => {
      currentUser = user;
      if (user) {
        listenInvites(user.uid);
        listenJoinRequests(user.uid);
      }
    });
  }

  // ── Determine theme from inviter's nameTheme ───────────────
  function getInviteThemeClass(nameTheme) {
    if (!nameTheme || nameTheme === 'default') return '';
    
    const themeMap = {
      fireGold: 'themed-fire',
      fireFlicker: 'themed-fire',
      bloodRed: 'themed-fire',
      iceBlue: 'themed-ice',
      snowfall: 'themed-ice',
      neonPurple: 'themed-neon',
      pulseGlow: 'themed-neon',
      neonCyan: 'themed-neon',
      emeraldGreen: 'themed-emerald',
      starField: 'themed-gold',
      sparkles: 'themed-gold'
    };
    
    return themeMap[nameTheme] || '';
  }

  // ── Fetch inviter's name theme ─────────────────────────────
  async function fetchInviterTheme(fromUid) {
    try {
      const snapshot = await _get(_ref(db, `players/${fromUid}/nameTheme`));
      return snapshot.val() || 'default';
    } catch (e) {
      console.error('Error fetching inviter theme:', e);
      return 'default';
    }
  }

  // ── Listen for incoming game invites ───────────────────────
  function listenInvites(uid) {
    const invRef = _ref(db, `invites/${uid}`);
    _onChildAdded(invRef, snap => {
      const key  = snap.key;
      const data = snap.val();
      if (!data || data.status !== 'pending') return;
      if (data.expiresAt < Date.now()) { 
        _remove(_ref(db, `invites/${uid}/${key}`)); 
        return; 
      }
      upsertPending('invite', key, data);

      // Fetch inviter theme
      fetchInviterTheme(data.fromUid).then(theme => {
        if (!active[key]) showInvite(uid, key, data, theme);
      });
    });
    _onChildRemoved(invRef, snap => removePending(snap.key));
  }

  // ── Listen for incoming join requests ("ask to join") ──────
  function listenJoinRequests(uid) {
    const jrRef = _ref(db, `joinRequests/${uid}`);
    _onChildAdded(jrRef, snap => {
      const key  = snap.key;
      const data = snap.val();
      if (!data || data.status !== 'pending') return;
      if (data.expiresAt < Date.now()) {
        _remove(_ref(db, `joinRequests/${uid}/${key}`));
        return;
      }
      upsertPending('join-request', key, data);
      if (!active[key]) showJoinRequest(uid, key, data);
    });
    _onChildRemoved(jrRef, snap => removePending(snap.key));
  }

  // ── Shared toast shell ──────────────────────────────────────
  // kind: 'invite' | 'join-request' — only the copy/handlers differ
  function buildToast(key, kind, data) {
    const isJR = kind === 'join-request';
    const toast = document.createElement('div');
    toast.className = `fi-toast${isJR ? ' fi-join-request' : ''}`;
    const title = isJR
      ? `<strong>${data.fromName}</strong> يريد الانضمام`
      : `دعوة من <strong>${data.fromName}</strong>`;
    const sub = isJR
      ? 'يطلب الانضمام إلى غرفتك الحالية'
      : 'دعوة للانضمام إلى غرفة اللعب';
    const badge = isJR
      ? `<span>طلب انضمام لغرفتك</span>`
      : `<span>كود الغرفة: <strong>${data.roomCode}</strong></span>`;
    const miniIcon = isJR ? '🤝' : '🎮';

    toast.innerHTML = `
      <button class="fi-close-btn" id="fi-close-${key}">✕</button>
      <div class="fi-mini-icon">${miniIcon}</div>
      <div class="fi-expandable">
        <div class="fi-header">
          <div class="fi-avatar"><i class="fas fa-user-friends"></i></div>
          <div class="fi-info">
            <div class="fi-title">${title}</div>
            <div class="fi-sub">${sub}</div>
          </div>
        </div>
        <div class="fi-waiting-badge">
          <span class="fi-pulse">●</span>
          ${badge}
        </div>
        <div class="fi-timer-bar">
          <div class="fi-timer-fill" id="fi-fill-${key}" style="width:100%;"></div>
        </div>
        <div class="fi-timer-label" id="fi-label-${key}">5:00</div>
        <div class="fi-btns">
          <button class="fi-btn fi-btn-accept"  id="fi-acc-${key}">✅ قبول</button>
          <button class="fi-btn fi-btn-decline" id="fi-dec-${key}">❌ رفض</button>
        </div>
      </div>
    `;
    return toast;
  }

  function mountToast(key, toast) {
    const isHomePage = window.location.pathname.includes('home.html') || window.location.pathname === '/';
    const container = isHomePage ? homeContainer : globalContainer;
    container.appendChild(toast);

    // Quick-decision window: the full card shows for SHRINK_DELAY (5s), then
    // shrinks to a small icon — the item itself stays valid/actionable via
    // the inbox for the rest of INVITE_TTL, it isn't lost when it shrinks.
    const shrinkTimeout = setTimeout(() => {
      toast.classList.add('fi-shrunk');
    }, SHRINK_DELAY);

    toast.addEventListener('click', () => {
      if (toast.classList.contains('fi-shrunk')) {
        toast.classList.remove('fi-shrunk');
        clearTimeout(shrinkTimeout);
      }
    });

    return shrinkTimeout;
  }

  // ── Show game-invite toast ──────────────────────────────────
  function showInvite(myUid, key, data, nameTheme) {
    const themeClass = getInviteThemeClass(nameTheme);
    const toast = buildToast(key, 'invite', data);
    if (themeClass) toast.classList.add(themeClass);

    const shrinkTimeout = mountToast(key, toast);

    const fill  = toast.querySelector(`#fi-fill-${key}`);
    const label = toast.querySelector(`#fi-label-${key}`);
    const interval = setInterval(() => {
      const remaining = data.expiresAt - Date.now();
      if (remaining <= 0) { dismiss(myUid, key, 'expired'); return; }
      const pct = (remaining / INVITE_TTL) * 100;
      fill.style.width = pct + '%';
      if (pct < 33) fill.classList.add('fi-urgent');
      const m = Math.floor(remaining / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      label.textContent = `${m}:${s.toString().padStart(2,'0')}`;
    }, 500);

    toast.querySelector(`#fi-acc-${key}`).onclick = (e) => { e.stopPropagation(); acceptInvite(myUid, key, data); };
    toast.querySelector(`#fi-dec-${key}`).onclick  = (e) => { e.stopPropagation(); dismiss(myUid, key, 'declined'); };
    toast.querySelector(`#fi-close-${key}`).onclick = (e) => { e.stopPropagation(); dismiss(myUid, key, 'declined'); };

    active[key] = { el: toast, interval, shrinkTimeout };
  }

  // ── Show join-request toast ("X wants to join you") ────────
  function showJoinRequest(myUid, key, data) {
    const toast = buildToast(key, 'join-request', data);
    const shrinkTimeout = mountToast(key, toast);

    const fill  = toast.querySelector(`#fi-fill-${key}`);
    const label = toast.querySelector(`#fi-label-${key}`);
    const interval = setInterval(() => {
      const remaining = data.expiresAt - Date.now();
      if (remaining <= 0) { dismiss(myUid, key, 'expired', false, true); return; }
      const pct = (remaining / INVITE_TTL) * 100;
      fill.style.width = pct + '%';
      if (pct < 33) fill.classList.add('fi-urgent');
      const m = Math.floor(remaining / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      label.textContent = `${m}:${s.toString().padStart(2,'0')}`;
    }, 500);

    toast.querySelector(`#fi-acc-${key}`).onclick = (e) => { e.stopPropagation(); acceptJoinRequest(myUid, key, data); };
    toast.querySelector(`#fi-dec-${key}`).onclick  = (e) => { e.stopPropagation(); declineJoinRequest(myUid, key); };
    toast.querySelector(`#fi-close-${key}`).onclick = (e) => { e.stopPropagation(); declineJoinRequest(myUid, key); };

    active[key] = { el: toast, interval, shrinkTimeout };
  }

  // ── Accept a game invite ────────────────────────────────────
  // FIX: this used to hand-write `room.players` as an array of name
  // strings ([...players, myName]), which doesn't match the real schema
  // (players is an object keyed by uid, written by room.html's own
  // joinRoom()). Rather than duplicate that write logic here (and get it
  // out of sync again), we just record the target room and redirect —
  // room.html's own joinRoom() does the actual, correct Firebase write
  // when it loads.
  async function acceptInvite(myUid, key, data) {
    const accBtn = document.getElementById(`fi-acc-${key}`);
    const decBtn = document.getElementById(`fi-dec-${key}`);
    if (accBtn) { accBtn.disabled = true; accBtn.textContent = '...'; }
    if (decBtn) decBtn.disabled = true;

    try {
      const roomSnap = await _get(_ref(db, `rooms/${data.roomCode}`));
      if (!roomSnap.exists()) {
        showBanner('❌ الغرفة لم تعد موجودة', 'error');
        dismiss(myUid, key, 'expired');
        return;
      }

      const room = roomSnap.val();
      const playerCount = Object.keys(room.players || {}).length;

      if (room.status === 'waiting') {
        if (playerCount >= 10) {
          showBanner('❌ الغرفة ممتلئة', 'error');
          dismiss(myUid, key, 'expired');
          return;
        }
        localStorage.setItem('currentRoom', data.roomCode);
        localStorage.setItem('isHost', 'false');
        await _update(_ref(db, `invites/${myUid}/${key}`), { status: 'accepted' });
        dismiss(myUid, key, null, true);
        window.location.href = `room.html?room=${data.roomCode}`;
      } else {
        // Game in progress — notify and wait for the round to end
        const phaseLabel = {
          playing:    'جارٍ تقديم الأدوار',
          discussion: 'مرحلة النقاش',
          voting:     'مرحلة التصويت',
          reveal:     'مرحلة الكشف',
        }[room.status] || room.status;
        showBanner(`⏳ الغرفة الآن في مرحلة "${phaseLabel}" — ستنضم تلقائياً عند انتهاء الجولة`, 'warning', 6000);
        localStorage.setItem('fi_pending_room', data.roomCode);
        localStorage.setItem('fi_pending_name', data.fromName);
        await _update(_ref(db, `invites/${myUid}/${key}`), { status: 'accepted' });
        dismiss(myUid, key, null, true);
        watchRoomForWaiting(data.roomCode);
      }
    } catch (e) {
      showBanner('❌ خطأ: ' + e.message, 'error');
      if (accBtn) { accBtn.disabled = false; accBtn.textContent = '✅ قبول'; }
      if (decBtn) decBtn.disabled = false;
    }
  }

  // ── Accept a join request ("let them into my room") ────────
  // Reuses the exact same invite pipeline to notify the requester —
  // approving a join request just becomes a normal invite sent back to
  // them, so they get the same toast/inbox/accept experience either way.
  async function acceptJoinRequest(myUid, key, data) {
    const accBtn = document.getElementById(`fi-acc-${key}`);
    const decBtn = document.getElementById(`fi-dec-${key}`);
    if (accBtn) { accBtn.disabled = true; accBtn.textContent = '...'; }
    if (decBtn) decBtn.disabled = true;

    try {
      const presSnap = await _get(_ref(db, `players/${myUid}/presence`));
      const presence = presSnap.val() || {};
      if (!presence.inGame || presence.phase !== 'waiting' || !presence.room) {
        showBanner('❌ لم تعد في غرفة انتظار — لا يمكن قبول الطلب', 'error');
        await _update(_ref(db, `joinRequests/${myUid}/${key}`), { status: 'declined' });
        dismiss(myUid, key, null, true);
        return;
      }

      const myName = currentUser.displayName || localStorage.getItem('eljasus_user_name') || 'لاعب';
      await FIApi.sendInvite(data.fromUid, data.fromName, presence.room, myName);
      await _update(_ref(db, `joinRequests/${myUid}/${key}`), { status: 'accepted' });
      showBanner(`✅ تم قبول ${data.fromName} — بانتظار انضمامه`, 'success');
      dismiss(myUid, key, null, true);
    } catch (e) {
      showBanner('❌ خطأ: ' + e.message, 'error');
      if (accBtn) { accBtn.disabled = false; accBtn.textContent = '✅ قبول'; }
      if (decBtn) decBtn.disabled = false;
    }
  }

  function declineJoinRequest(myUid, key) {
    _update(_ref(db, `joinRequests/${myUid}/${key}`), { status: 'declined' }).catch(() => {});
    dismiss(myUid, key, null, true);
  }

  // ── Watch room until 'waiting' ─────────────────────────────
  function watchRoomForWaiting(roomCode) {
    let unsubscribe;
    const unsub = _onValue(_ref(db, `rooms/${roomCode}/status`), snap => {
      if (snap.val() === 'waiting') {
        showBanner(`✅ انتهت الجولة في غرفة ${roomCode} — يمكنك الانضمام الآن!`, 'success', 8000);
        localStorage.setItem('currentRoom', roomCode);
        localStorage.setItem('isHost', 'false');
        setTimeout(() => { window.location.href = `room.html?room=${roomCode}`; }, 2500);
        if (unsubscribe) unsubscribe();
      }
    });
    unsubscribe = unsub;
  }

  // ── Dismiss a toast (and, unless skipDb, write a status) ────
  function dismiss(myUid, key, status, skipDb = false, isJoinRequest = false) {
    const entry = active[key];
    if (entry) {
      clearInterval(entry.interval);
      if (entry.shrinkTimeout) clearTimeout(entry.shrinkTimeout);
      entry.el.classList.add('fi-leaving');
      setTimeout(() => { entry.el.remove(); delete active[key]; }, 310);
    }
    removePending(key);

    if (!skipDb && status) {
      const path = isJoinRequest ? `joinRequests/${myUid}/${key}` : `invites/${myUid}/${key}`;
      _update(_ref(db, path), { status }).catch(() => {});
    }
  }

  // ── Banner notification ────────────────────────────────────
  function showBanner(msg, type = 'info', duration = 4500) {
    const colors = {
      success: 'rgba(34,197,94,.18);border-color:rgba(34,197,94,.5);color:#22c55e',
      warning: 'rgba(251,191,36,.14);border-color:rgba(251,191,36,.5);color:#fbbf24',
      error:   'rgba(239,68,68,.15);border-color:rgba(239,68,68,.5);color:#ef4444',
      info:    'rgba(0,242,255,.1);border-color:rgba(0,242,255,.4);color:#00f2ff',
    };
    const b = document.createElement('div');
    b.style.cssText = `position:fixed;top:12px;left:50%;transform:translateX(-50%);
      z-index:10600;padding:13px 28px;border-radius:16px;font-family:'Cairo',sans-serif;
      font-weight:700;font-size:13px;text-align:center;backdrop-filter:blur(14px);
      background:${colors[type] || colors.info};border:2px solid;
      box-shadow:0 8px 28px rgba(0,0,0,.45);direction:rtl;min-width:280px;`;
    b.textContent = msg;
    document.body.appendChild(b);
    setTimeout(() => { 
      b.style.opacity='0'; 
      b.style.transition='opacity .4s'; 
      setTimeout(()=>b.remove(),420); 
    }, duration);
  }

  // ── Public API ─────────────────────────────────────────────
  const FIApi = {
    async sendInvite(friendUid, friendName, roomCode, fromName) {
      if (!db || !currentUser) throw new Error('Firebase not ready');
      const invRef = _ref(db, `invites/${friendUid}`);
      await _push(invRef, {
        fromUid:   currentUser.uid,
        fromName:  fromName || currentUser.displayName || 'لاعب',
        roomCode,
        timestamp: Date.now(),
        expiresAt: Date.now() + INVITE_TTL,
        status:    'pending',
      });
    },

    // "Ask to join" — only meaningful (and only shown in the UI) when the
    // target friend is currently in a waiting-stage room. Verifies that
    // fresh from their presence record rather than trusting stale caller
    // data, and requires their explicit accept before any room write happens.
    async sendJoinRequest(targetUid, targetName) {
      if (!db || !currentUser) throw new Error('Firebase not ready');
      const presSnap = await _get(_ref(db, `players/${targetUid}/presence`));
      const presence = presSnap.val() || {};
      if (!presence.inGame || presence.phase !== 'waiting' || !presence.room) {
        throw new Error('هذا الصديق ليس في غرفة انتظار حالياً');
      }
      const myName = currentUser.displayName || localStorage.getItem('eljasus_user_name') || 'لاعب';
      await _push(_ref(db, `joinRequests/${targetUid}`), {
        fromUid:   currentUser.uid,
        fromName:  myName,
        roomCode:  presence.room,
        timestamp: Date.now(),
        expiresAt: Date.now() + INVITE_TTL,
        status:    'pending',
      });
    },

    showBanner,
  };
  window.FI = FIApi;

  init().catch(console.error);
})();
