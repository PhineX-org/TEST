// ============================================================
// EL JASUS — ENHANCED FRIEND INVITE SYSTEM v2.0
// Shows invites on home.html + global toasts
// Applies inviter's theme to notifications
// Includes shrink/expand behavior after 5 seconds
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

  const INVITE_TTL = 5 * 60 * 1000; // 5 minutes
  const SHRINK_DELAY = 5000; // 5 seconds

  // ── CSS injection ──────────────────────────────────────────
  const css = `
    /* ═══ GLOBAL INVITE TOASTS (bottom-left) ═══ */
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

  // ── Active toasts map ──────────────────────────────────────
  const active = {};

  // ── Firebase bootstrap ─────────────────────────────────────
  let db, auth, currentUser;
  let _ref, _update, _remove, _get, _onChildAdded, _onValue, _set, _push;

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

    _ref          = dbMod.ref;
    _update       = dbMod.update;
    _remove       = dbMod.remove;
    _get          = dbMod.get;
    _onChildAdded = dbMod.onChildAdded;
    _onValue      = dbMod.onValue;
    _set          = dbMod.set;
    _push         = dbMod.push;

    authMod.onAuthStateChanged(auth, user => {
      currentUser = user;
      if (user) listenInvites(user.uid);
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

  // ── Listen for incoming invites ────────────────────────────
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
      
      // Fetch inviter theme
      fetchInviterTheme(data.fromUid).then(theme => {
        if (!active[key]) showInvite(uid, key, data, theme);
      });
    });
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

  // ── Show invite toast ──────────────────────────────────────
  function showInvite(myUid, key, data, nameTheme) {
    const isHomePage = window.location.pathname.includes('home.html') || window.location.pathname === '/';
    const container = isHomePage ? homeContainer : globalContainer;
    const themeClass = getInviteThemeClass(nameTheme);
    
    const toast = document.createElement('div');
    toast.className = `fi-toast ${themeClass}`;
    toast.innerHTML = `
      <button class="fi-close-btn" id="fi-close-${key}">✕</button>
      <div class="fi-mini-icon">🎮</div>
      <div class="fi-expandable">
        <div class="fi-header">
          <div class="fi-avatar"><i class="fas fa-user-friends"></i></div>
          <div class="fi-info">
            <div class="fi-title">دعوة من <strong>${data.fromName}</strong></div>
            <div class="fi-sub">دعوة للانضمام إلى غرفة اللعب</div>
          </div>
        </div>
        <div class="fi-waiting-badge">
          <span class="fi-pulse">●</span>
          <span>كود الغرفة: <strong>${data.roomCode}</strong></span>
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
    container.appendChild(toast);

    const total = data.expiresAt - Date.now();
    const fill  = toast.querySelector(`#fi-fill-${key}`);
    const label = toast.querySelector(`#fi-label-${key}`);

    // Countdown interval
    const interval = setInterval(() => {
      const remaining = data.expiresAt - Date.now();
      if (remaining <= 0) { 
        dismiss(myUid, key, 'expired'); 
        return; 
      }
      const pct = (remaining / INVITE_TTL) * 100;
      fill.style.width = pct + '%';
      if (pct < 33) fill.classList.add('fi-urgent');
      const m = Math.floor(remaining / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      label.textContent = `${m}:${s.toString().padStart(2,'0')}`;
    }, 500);

    // Shrink after 5 seconds (only on home page)
    let shrinkTimeout;
    if (isHomePage) {
      shrinkTimeout = setTimeout(() => {
        toast.classList.add('fi-shrunk');
      }, SHRINK_DELAY);
      
      // Expand on click when shrunk
      toast.addEventListener('click', () => {
        if (toast.classList.contains('fi-shrunk')) {
          toast.classList.remove('fi-shrunk');
          clearTimeout(shrinkTimeout);
        }
      });
    }

    // Buttons
    toast.querySelector(`#fi-acc-${key}`).onclick = (e) => {
      e.stopPropagation();
      acceptInvite(myUid, key, data);
    };
    
    toast.querySelector(`#fi-dec-${key}`).onclick = (e) => {
      e.stopPropagation();
      dismiss(myUid, key, 'declined');
    };
    
    toast.querySelector(`#fi-close-${key}`).onclick = (e) => {
      e.stopPropagation();
      dismiss(myUid, key, 'declined');
    };

    active[key] = { el: toast, interval, shrinkTimeout };
  }

  // ── Accept invite ──────────────────────────────────────────
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

      if (room.status === 'waiting') {
        // Join directly
        const players = Array.isArray(room.players) ? room.players : Object.values(room.players || {});
        const myName  = currentUser.displayName || localStorage.getItem('eljasus_user_name') || 'لاعب';
        if (!players.includes(myName)) {
          if (players.length >= 10) { 
            showBanner('❌ الغرفة ممتلئة', 'error'); 
            dismiss(myUid, key, 'expired'); 
            return; 
          }
          await _update(_ref(db, `rooms/${data.roomCode}`), { players: [...players, myName] });
        }
        localStorage.setItem('currentRoom', data.roomCode);
        localStorage.setItem('isHost', 'false');
        await _update(_ref(db, `invites/${myUid}/${key}`), { status: 'accepted' });
        dismiss(myUid, key, null, true);
        window.location.href = 'room.html';
      } else {
        // Game in progress — notify and wait
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

  // ── Watch room until 'waiting' ─────────────────────────────
  function watchRoomForWaiting(roomCode) {
    let unsubscribe;
    const unsub = _onValue(_ref(db, `rooms/${roomCode}/status`), snap => {
      if (snap.val() === 'waiting') {
        showBanner(`✅ انتهت الجولة في غرفة ${roomCode} — يمكنك الانضمام الآن!`, 'success', 8000);
        localStorage.setItem('currentRoom', roomCode);
        localStorage.setItem('isHost', 'false');
        setTimeout(() => { window.location.href = 'room.html'; }, 2500);
        if (unsubscribe) unsubscribe();
      }
    });
    unsubscribe = unsub;
  }

  // ── Dismiss toast ──────────────────────────────────────────
  function dismiss(myUid, key, status, skipDb = false) {
    const entry = active[key];
    if (!entry) return;
    
    clearInterval(entry.interval);
    if (entry.shrinkTimeout) clearTimeout(entry.shrinkTimeout);
    
    entry.el.classList.add('fi-leaving');
    setTimeout(() => { 
      entry.el.remove(); 
      delete active[key]; 
    }, 310);
    
    if (!skipDb && status) {
      _update(_ref(db, `invites/${myUid}/${key}`), { status }).catch(() => {});
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
  window.FI = {
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
    showBanner,
  };

  init().catch(console.error);
})();
