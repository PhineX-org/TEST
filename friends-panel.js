// ============================================================
// EL JASUS — FRIENDS PANEL  v2.1  (RIGHT-SIDE NAVBAR)

// ============================================================

(function () {
  'use strict';

  const css = `
    /* ── Pull-tab on right edge ── */
    #fp-tab {
      position: fixed;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 8300;
      width: 28px;
      height: 80px;
      border-radius: 12px 0 0 12px;
      background: linear-gradient(180deg, rgba(0,242,255,.18), rgba(124,48,255,.18));
      border: 2px solid rgba(0,242,255,.4);
      border-right: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      backdrop-filter: blur(12px);
      transition: all .3s;
      box-shadow: -4px 0 20px rgba(0,242,255,.15);
    }
    #fp-tab:hover {
      width: 34px;
      background: linear-gradient(180deg, rgba(0,242,255,.28), rgba(124,48,255,.28));
      box-shadow: -6px 0 24px rgba(0,242,255,.35);
    }
    #fp-tab i { color: #00f2ff; font-size: 14px; pointer-events: none; }
    #fp-tab .fp-notif-dot {
      position: absolute;
      top: 7px; right: 7px;
      width: 9px; height: 9px;
      border-radius: 50%;
      background: #ef4444;
      border: 2px solid #0a0e1a;
      display: none;
      animation: fp-pulse 1.5s infinite;
    }
    #fp-tab.fp-has-notif .fp-notif-dot { display: block; }

    /* ── Panel (slides from RIGHT) ── */
    #rp-friends-panel {
      position: fixed;
      right: 0; top: 0; bottom: 0;
      z-index: 8299;
      width: 0;
      overflow: hidden;
      background: linear-gradient(160deg, rgba(8,11,22,.98), rgba(18,12,40,.98));
      border-left: 1px solid rgba(0,242,255,.18);
      box-shadow: -6px 0 40px rgba(0,0,0,.6);
      transition: width .35s cubic-bezier(.4,0,.2,1);
      display: flex;
      flex-direction: column;
      font-family: 'Cairo', sans-serif;
      direction: rtl;
    }
    #rp-friends-panel.fp-open { width: 300px; }
    @media(max-width:600px){ #rp-friends-panel.fp-open { width: 100vw; } }

    /* ── Resize handle (left edge of the panel) ── */
    #fp-resize {
      position: absolute; left: 0; top: 0; bottom: 0; width: 5px;
      cursor: ew-resize; z-index: 1;
      background: rgba(0,242,255,.05); transition: background .2s;
    }
    #fp-resize:hover { background: rgba(0,242,255,.22); }

    .fp-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 16px 14px;
      border-bottom: 1px solid rgba(0,242,255,.1);
      flex-shrink: 0;
    }
    .fp-title {
      font-family: 'Orbitron', sans-serif;
      font-size: 12px; font-weight: 900;
      color: #00f2ff; letter-spacing: .1em;
    }
    .fp-close {
      width: 28px; height: 28px; border-radius: 8px;
      background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.09);
      color: #555; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; transition: all .2s;
    }
    .fp-close:hover { background: rgba(0,242,255,.12); color: #00f2ff; border-color: rgba(0,242,255,.3); }

    .fp-search { padding: 10px 14px 4px; flex-shrink: 0; }
    .fp-search input {
      width: 100%; padding: 8px 12px; border-radius: 10px;
      background: rgba(255,255,255,.05); border: 1px solid rgba(0,242,255,.2);
      color: #fff; font-family: 'Cairo', sans-serif; font-size: 12px;
      outline: none; transition: border .2s; box-sizing: border-box;
    }
    .fp-search input:focus { border-color: rgba(0,242,255,.5); }

    .fp-list { flex: 1; overflow-y: auto; padding: 6px 10px; }
    .fp-list::-webkit-scrollbar { width: 3px; }
    .fp-list::-webkit-scrollbar-thumb { background: rgba(0,242,255,.2); border-radius: 2px; }

    .fp-sect {
      font-size: 9px; font-weight: 900; text-transform: uppercase;
      letter-spacing: .22em; color: rgba(255,255,255,.18);
      padding: 8px 4px 4px; font-family: 'Orbitron', sans-serif;
    }
    .fp-card {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 10px; border-radius: 12px; margin-bottom: 3px;
      border: 1px solid transparent; transition: all .2s;
    }
    .fp-card:hover { background: rgba(255,255,255,.04); border-color: rgba(0,242,255,.1); }
    .fp-av {
      width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg,#00f2ff,#7c30ff);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; color: #fff; position: relative;
    }
    .fp-dot {
      position: absolute; bottom: 1px; right: 1px;
      width: 9px; height: 9px; border-radius: 50%; border: 2px solid #0a0e1a;
    }
    .fp-d-on  { background: #22c55e; box-shadow: 0 0 5px #22c55e; }
    .fp-d-pl  { background: #f59e0b; box-shadow: 0 0 5px #f59e0b; animation: fp-pulse 1.5s infinite; }
    .fp-d-off { background: #444; }
    .fp-info  { flex: 1; min-width: 0; }
    .fp-name  {
      font-size: 12px; font-weight: 700; color: #e2e8f0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .fp-sub   { font-size: 10px; color: rgba(255,255,255,.4); margin-top: 1px; }
    .fp-sub.on  { color: #22c55e; }
    .fp-sub.pl  { color: #f59e0b; }

    .fp-btn {
      padding: 5px 9px; border-radius: 8px;
      font-family: 'Cairo', sans-serif; font-weight: 900; font-size: 10px;
      cursor: pointer; border: 1px solid; transition: all .2s;
      white-space: nowrap; flex-shrink: 0;
    }
    .fp-btn-inv  { background: rgba(0,242,255,.1);  border-color: rgba(0,242,255,.35);  color: #00f2ff; }
    .fp-btn-inv:hover  { background: rgba(0,242,255,.22); }
    .fp-btn-join { background: rgba(34,197,94,.12); border-color: rgba(34,197,94,.4);   color: #22c55e; }
    .fp-btn-join:hover { background: rgba(34,197,94,.25); }
    .fp-btn-add  { background: rgba(124,48,255,.12);border-color: rgba(124,48,255,.4);  color: #a78bfa; }
    .fp-btn-add:hover  { background: rgba(124,48,255,.25); }
    .fp-btn:disabled { opacity:.5; cursor:not-allowed; }

    .fp-empty {
      text-align: center; padding: 28px 12px;
      font-size: 12px; color: rgba(255,255,255,.25); line-height: 1.8;
    }
    .fp-empty i { font-size: 26px; display: block; margin-bottom: 8px; opacity: .35; }

    @keyframes fp-pulse {
      0%,100%{ opacity:1; transform:scale(1); }
      50%    { opacity:.45; transform:scale(1.35); }
    }
  `;
  const st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  // ── Inject HTML ───────────────────────────────────────────
  document.body.insertAdjacentHTML('beforeend', `
    <button id="fp-tab" title="الأصدقاء واللاعبون" aria-label="لوحة الأصدقاء">
      <i class="fas fa-users"></i>
      <div class="fp-notif-dot"></div>
    </button>
    <div id="rp-friends-panel" role="complementary">
      <div id="fp-resize"></div>
      <div class="fp-header">
        <span class="fp-title">👥 الأصدقاء والغرفة</span>
        <button class="fp-close" id="fp-close-btn" aria-label="إغلاق">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="fp-search">
        <input type="text" id="fp-search-input" placeholder="ابحث عن لاعب أو صديق..." autocomplete="off">
      </div>
      <div class="fp-list" id="fp-list">
        <div class="fp-empty"><i class="fas fa-users"></i>جاري التحميل...</div>
      </div>
    </div>
  `);

  // ── State ─────────────────────────────────────────────────
  let _db, _auth, _myUid, _myName, _roomCode;
  let _roomPlayers = [];
  let _friends     = {};
  let _open        = false;
  let _q           = '';

  const panel = document.getElementById('rp-friends-panel');
  const tab   = document.getElementById('fp-tab');

  // ── Toggle ────────────────────────────────────────────────
  function setOpen(val) {
    _open = val;
    panel.classList.toggle('fp-open', val);
    tab.style.right = val ? '300px' : '0';
  }

  tab.addEventListener('click', () => setOpen(!_open));
  document.getElementById('fp-close-btn').addEventListener('click', () => setOpen(false));

  // ── Resize ────────────────────────────────────────────────
  const handle = document.getElementById('fp-resize');
  let _rx = false, _sx = 0, _sw = 0;
  handle.addEventListener('mousedown', e => {
    _rx = true; _sx = e.clientX; _sw = panel.offsetWidth;
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', e => {
    if (!_rx) return;
    const nw = Math.max(240, Math.min(520, _sw + (_sx - e.clientX)));
    panel.style.width = nw + 'px';
    if (_open) tab.style.right = nw + 'px';
  });
  document.addEventListener('mouseup', () => { _rx = false; document.body.style.userSelect = ''; });

  // ── Search ────────────────────────────────────────────────
  document.getElementById('fp-search-input').addEventListener('input', e => {
    _q = e.target.value.trim().toLowerCase();
    render();
  });

  // ── Render ────────────────────────────────────────────────
  function render() {
    const PHASE = { waiting:'انتظار', discussion:'نقاش', voting:'تصويت', playing:'يلعب', result:'النتائج' };
    const curRoom = _roomCode || localStorage.getItem('currentRoom') || '';
    let html = '';

    // ── Room Players ──
    const rp = _roomPlayers.filter(n => !_q || n.toLowerCase().includes(_q));
    if (rp.length) {
      html += `<div class="fp-sect">لاعبو الغرفة (${rp.length})</div>`;
      html += rp.map(name => {
        const clean  = name.replace(' (خامل)','').trim();
        const isMe   = clean === _myName;
        const isIdle = name.includes('(خامل)');
        const addBtn = (!isMe && _myUid)
          ? `<button class="fp-btn fp-btn-add" data-a="add" data-name="${clean}" title="طلب صداقة">+ صديق</button>`
          : '';
        return `
          <div class="fp-card">
            <div class="fp-av">
              <i class="fas fa-user"></i>
              <span class="fp-dot ${isIdle ? 'fp-d-off' : 'fp-d-on'}"></span>
            </div>
            <div class="fp-info">
              <div class="fp-name">${clean}${isMe ? ' <span style="color:#00f2ff;font-size:9px;">(أنت)</span>' : ''}</div>
              <div class="fp-sub ${isIdle ? '' : 'on'}">${isIdle ? '💤 خامل' : '✅ في الغرفة'}</div>
            </div>
            ${addBtn}
          </div>`;
      }).join('');
    }

    // ── Friends ──
    const flist = Object.entries(_friends).filter(([, f]) => {
      const n = f.displayName || f.username || '';
      return !_q || n.toLowerCase().includes(_q);
    });

    const online  = flist.filter(([,f]) =>  f.presence?.online && !f.presence?.inGame);
    const playing = flist.filter(([,f]) =>  f.presence?.inGame);
    const offline = flist.filter(([,f]) => !f.presence?.online);

    if (online.length) {
      html += `<div class="fp-sect">أصدقاء متصلون (${online.length})</div>`;
      html += online.map(([uid, f]) => {
        const n = f.displayName || f.username || 'مجهول';
        const invBtn = curRoom
          ? `<button class="fp-btn fp-btn-inv" data-a="invite" data-uid="${uid}" data-room="${curRoom}" data-name="${n}">دعوة</button>`
          : '';
        return `
          <div class="fp-card">
            <div class="fp-av"><i class="fas fa-user"></i><span class="fp-dot fp-d-on"></span></div>
            <div class="fp-info">
              <div class="fp-name">${n}</div>
              <div class="fp-sub on">متصل</div>
            </div>
            ${invBtn}
          </div>`;
      }).join('');
    }

    if (playing.length) {
      html += `<div class="fp-sect">يلعبون الآن (${playing.length})</div>`;
      html += playing.map(([uid, f]) => {
        const n     = f.displayName || f.username || 'مجهول';
        const phase = PHASE[f.presence?.phase] || 'يلعب';
        const r     = f.presence?.room || '';
        const actionBtn = (r && f.presence?.phase === 'waiting')
          ? `<button class="fp-btn fp-btn-join" data-a="join" data-uid="${uid}" data-room="${r}" data-name="${n.replace(/"/g, '&quot;')}">▶ اطلب الانضمام</button>`
          : `<span style="font-size:10px;color:#f59e0b;font-weight:700;">⏳ ${phase}</span>`;
        return `
          <div class="fp-card">
            <div class="fp-av"><i class="fas fa-user"></i><span class="fp-dot fp-d-pl"></span></div>
            <div class="fp-info">
              <div class="fp-name">${n}</div>
              <div class="fp-sub pl">${phase}</div>
            </div>
            ${actionBtn}
          </div>`;
      }).join('');
    }

    if (offline.length) {
      html += `<div class="fp-sect">غير متصل (${offline.length})</div>`;
      html += offline.map(([, f]) => {
        const n  = f.displayName || f.username || 'مجهول';
        const ls = f.lastSeen ? new Date(f.lastSeen).toLocaleDateString('ar-EG') : '';
        return `
          <div class="fp-card" style="opacity:.5;">
            <div class="fp-av"><i class="fas fa-user"></i><span class="fp-dot fp-d-off"></span></div>
            <div class="fp-info">
              <div class="fp-name">${n}</div>
              <div class="fp-sub">${ls ? 'آخر ظهور: ' + ls : 'غير متصل'}</div>
            </div>
          </div>`;
      }).join('');
    }

    if (!html) {
      html = `<div class="fp-empty"><i class="fas fa-user-friends"></i>
        لا يوجد أصدقاء بعد<br>
        <a href="friends.html" style="color:#00f2ff;font-size:11px;text-decoration:none;">+ إضافة أصدقاء</a>
      </div>`;
    }

    document.getElementById('fp-list').innerHTML = html;

    // Wire buttons
    document.getElementById('fp-list').querySelectorAll('[data-a]').forEach(btn => {
      btn.addEventListener('click', () => _action(btn));
    });
  }

  // ── Actions ───────────────────────────────────────────────
  async function _action(btn) {
    const a    = btn.dataset.a;
    const uid  = btn.dataset.uid  || '';
    const room = btn.dataset.room || '';
    const name = btn.dataset.name || '';

    if (a === 'invite') {
      if (!window.FI) { _toast('نظام الدعوة غير متاح'); return; }
      const from = _myName || localStorage.getItem('eljasus_user_name') || 'لاعب';
      FI.sendInvite(uid, name, room, from)
        .then(() => { btn.textContent = '✓ أُرسلت'; btn.disabled = true; })
        .catch(e => _toast('خطأ: ' + e.message));

    } else if (a === 'join') {
      // FIX: this used to write straight into rooms/{room}/players as an
      // array of name strings (incompatible with the real schema — an
      // object keyed by uid, written by room.html's own joinRoom()) AND
      // it skipped consent entirely, adding the clicking player directly.
      // "Ask to join" now sends a request the target must accept, the same
      // way a game invite works.
      if (!window.FI) { _toast('نظام الدعوة غير متاح'); return; }
      btn.disabled = true;
      const originalText = btn.textContent;
      btn.textContent = '...';
      FI.sendJoinRequest(uid, name)
        .then(() => { btn.textContent = '✓ أُرسل الطلب'; })
        .catch(e => { _toast(e.message || 'تعذر إرسال الطلب'); btn.disabled = false; btn.textContent = originalText; });

    } else if (a === 'add') {
      if (!_db || !_myUid) return;
      try {
        const m   = await import('https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js');
        const all = await m.get(m.ref(_db, 'players'));
        let tid   = '';
        if (all.exists()) all.forEach(child => {
          const p = child.val();
          if ((p.displayName || p.username) === name) tid = child.key;
        });
        if (!tid) { _toast('لم يُعثر على اللاعب'); return; }
        await m.set(m.ref(_db, `players/${tid}/friendRequests/${_myUid}`), {
          from: { uid: _myUid, username: _myName }, timestamp: Date.now()
        });
        btn.textContent = '✓ طلب أُرسل'; btn.disabled = true;
        _toast('✅ تم إرسال طلب الصداقة');
      } catch(e) { _toast('خطأ: ' + e.message); }
    }
  }

  function _toast(msg) {
    if (window.showToast) { showToast(msg); return; }
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
      z-index:99999;background:rgba(0,0,0,.8);border:1px solid rgba(0,242,255,.4);
      border-radius:12px;padding:10px 20px;font-family:'Cairo',sans-serif;
      font-size:13px;font-weight:700;color:#fff;white-space:nowrap;`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  // ── Firebase subscription ─────────────────────────────────
  async function _subscribe() {
    if (!_db || !_myUid) return;
    const m = await import('https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js');

    // Friends list
    m.onValue(m.ref(_db, `players/${_myUid}/friends`), async snap => {
      const map = snap.val() || {};
      // Remove unfriended
      Object.keys(_friends).forEach(uid => { if (!map[uid]) delete _friends[uid]; });
      // Subscribe to each friend's profile
      for (const fuid of Object.keys(map)) {
        if (_friends[fuid]) continue;
        m.onValue(m.ref(_db, `players/${fuid}`), ps => {
          if (ps.exists()) { _friends[fuid] = ps.val(); render(); }
        });
      }
      render();
    });

    // Friend requests → notification dot
    m.onValue(m.ref(_db, `players/${_myUid}/friendRequests`), snap => {
      const count = snap.exists() ? Object.keys(snap.val()).length : 0;
      tab.classList.toggle('fp-has-notif', count > 0);
    });
  }

  // ══════════════════════════════════════════════════════════
  // PUBLIC API
  // ══════════════════════════════════════════════════════════
  // ── Room players section (populated by updateRoomPlayers) ─────
  let _roomPlayersList = [];

  window.FriendsPanel = {
    // ── Original init — accepts BOTH signatures: ──────────────────
    //   (db, uid, name)      ← original
    //   (db, authObject)     ← how home.html calls it
    init(db, uidOrAuth, name) {
      let resolvedUid  = uidOrAuth;
      let resolvedName = name;

      // Detect if second arg is an Auth object
      if (uidOrAuth && typeof uidOrAuth === 'object' &&
          (uidOrAuth.currentUser !== undefined || typeof uidOrAuth.onAuthStateChanged === 'function')) {
        // It's an auth object
        const authObj = uidOrAuth;
        if (authObj.currentUser) {
          resolvedUid  = authObj.currentUser.uid;
          resolvedName = authObj.currentUser.displayName || localStorage.getItem('eljasus_user_name') || 'لاعب';
        } else {
          // Wait for auth state
          import('https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js').then(m => {
            m.onAuthStateChanged(authObj, user => {
              if (user) window.FriendsPanel.init(db, user.uid, user.displayName || localStorage.getItem('eljasus_user_name') || 'لاعب');
            });
          });
          return;
        }
      }

      _db = db; _myUid = resolvedUid; _myName = resolvedName || localStorage.getItem('eljasus_user_name') || 'لاعب';

      // FIX: this used to duplicate _subscribe()'s job inline, but referenced
      // an undeclared `friends` object (never declared anywhere in this file —
      // only `_friends` is) instead of the real `_friends` state. That threw a
      // ReferenceError on the first friend processed, so the friends list here
      // never actually loaded. _subscribe() already does this correctly.
      _subscribe();
    },

    // ── Called by room.html when player list changes ───────────────
    updateRoomPlayers(players) {
      _roomPlayersList = Array.isArray(players) ? players : [];
      render();
    },

    // ── Called by room.html initRoomPanels() ──────────────────────
    initRoom(db, auth, uid, roomCode, players) {
      // Store room players for display
      _roomPlayersList = Array.isArray(players) ? players : [];
      // Delegate to init with resolved uid
      const resolvedUid  = uid || (auth && auth.currentUser && auth.currentUser.uid) || '';
      const resolvedName = localStorage.getItem('eljasus_user_name') || 'لاعب';
      if (resolvedUid) this.init(db, resolvedUid, resolvedName);
      else             this.init(db, auth);
    },

    setOpen,
  };

  // Expose instance reference for game-layout.js patcher
  window._fp_instance = window.FriendsPanel;

})();