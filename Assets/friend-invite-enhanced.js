// ============================================================
// EL JASUS — SOCIAL CORE  (friend-invite-enhanced.js)  v4.0
//
// Logic only — it draws NO inbox / toast UI of its own. All visible
// notification UI lives in Assets/inbox.js (window.EJInbox), which this
// file loads automatically if the page forgot the <script> tag, wires up
// and starts for the signed-in player. Works on every page that loads it.
//
//   window.FI
//     .ready                      Promise -> { db, auth }   (Firebase is up)
//     .sendInvite / .sendJoinRequest / .showBanner      (room invites)
//     .friends  : getMyCode, regenerateCode, watchMyCode, lookup, sendRequest,
//                 sendRequestToUid, accept, decline, cancel, remove, relation
//     .chat     : chatId, send, markRead, history, listen
//     .proposeRoom(friendUid, friendName, category)     (room is created only
//                                                        when the friend accepts)
//
// Data written (see the rules block in the delivery notes):
//   friendCodes/{CODE}                 {uid, createdAt, usedBy?, usedAt?}
//   emailIndex/{email with . -> ,}     uid
//   players/{uid}/friendCode           current one-use code
//   players/{uid}/friendRequests/{from}  incoming requests (existing path)
//   players/{uid}/sentRequests/{to}      outgoing requests
//   notifications/{uid}/{id}           small personal notices
//   chats/{a_b}/messages/{id}          chat messages
//   userChats/{uid}/{friend}           per-friend unread counter + last message
//   invites/{uid}/{key}                room invites  (type:'proposal' = no room yet)
//   inviteReplies/{uid}/{key}          answer to a room proposal
// ============================================================
(function () {
  'use strict';
  if (window.FI && window.FI.__v >= 4) return;

  const FB = 'https://www.gstatic.com/firebasejs/12.7.0/';
  const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyDnd-pmKEatI3DaFz6xHWB5ucurtHXt9tk',
    authDomain: 'el-jasus.firebaseapp.com',
    databaseURL: 'https://el-jasus-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'el-jasus',
    storageBucket: 'el-jasus.firebasestorage.app',
    messagingSenderId: '415659587906',
    appId: '1:415659587906:web:782f7940176ea4097eb0db',
  };
  const INVITE_TTL = 5 * 60 * 1000;
  const MAX_ROOM_PLAYERS = 10;

  // ── where things live (works under /TEST2/Files/… on GitHub Pages and at the site root) ──
  const SCRIPT_URL = (document.currentScript && document.currentScript.src) || '';
  const ASSETS_BASE = SCRIPT_URL ? new URL('.', SCRIPT_URL).href : '';
  const FILES_BASE = ASSETS_BASE ? new URL('../Files/', ASSETS_BASE).href : '';
  const pageUrl = (name) => (FILES_BASE || '') + name;
  const roomUrl = (code) => pageUrl('room.html?room=' + encodeURIComponent(code));
  const chatUrl = (uid) => pageUrl('chat.html?with=' + encodeURIComponent(uid));

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const fail = (msg, code) => Object.assign(new Error(msg), { code: code || 'fi' });

  // ── Firebase bootstrap ─────────────────────────────────────
  // IMPORTANT: this file never creates the default app while the page is
  // still starting up. Pages call initializeApp(theirOwnConfig) themselves;
  // if we won that race the page's call threw "duplicate-app" and the
  // whole page script died. So we wait for the page's app and only create
  // our own when the page has none.
  let db, auth, currentUser, M = {};
  let resolveReady, rejectReady;
  const ready = new Promise((res, rej) => { resolveReady = res; rejectReady = rej; });
  ready.catch(() => {});

  async function waitForApp(appMod, ms) {
    const t0 = Date.now();
    while (!appMod.getApps().length && Date.now() - t0 < ms) await sleep(60);
    if (appMod.getApps().length) return appMod.getApps()[0];
    try { return appMod.initializeApp(FIREBASE_CONFIG); } catch (e) { return appMod.getApp(); }
  }

  async function boot() {
    const appMod = await import(FB + 'firebase-app.js');
    const authMod = await import(FB + 'firebase-auth.js');
    const dbMod = await import(FB + 'firebase-database.js');
    const app = await waitForApp(appMod, 6000);
    auth = authMod.getAuth(app);
    db = dbMod.getDatabase(app);
    M = dbMod;
    API.db = db; API.auth = auth; API.fb = dbMod;
    resolveReady({ db, auth });
    authMod.onAuthStateChanged(auth, onUser);
  }

  // ── Inbox loader ───────────────────────────────────────────
  function ensureInbox() {
    if (window.EJInbox) return Promise.resolve(true);
    if (!ASSETS_BASE) return Promise.resolve(false);
    return new Promise((res) => {
      const s = document.createElement('script');
      s.src = ASSETS_BASE + 'inbox.js';
      s.onload = () => res(!!window.EJInbox);
      s.onerror = () => { console.warn('[FI] could not load inbox.js'); res(false); };
      document.head.appendChild(s);
    });
  }

  // ── small helpers ──────────────────────────────────────────
  const val = async (path) => (await M.get(M.ref(db, path))).val();
  const exists = async (path) => (await M.get(M.ref(db, path))).exists();
  const myUid = () => (currentUser && currentUser.uid) || '';
  function need() { if (!db || !currentUser) throw fail('سجّل الدخول أولاً', 'auth'); }
  async function myName() {
    try { const n = await val(`players/${myUid()}/username`); if (n) return n; } catch (e) {}
    return currentUser.displayName || localStorage.getItem('eljasus_user_name') || 'لاعب';
  }
  const emailKey = (email) => String(email || '').trim().toLowerCase().replace(/[.#$\[\]\/]/g, ',');
  const chatIdOf = (a, b) => [a, b].sort().join('_');
  const newKey = () => M.push(M.ref(db, 'tmp')).key; // push-id generator (no write happens)

  // ═══════════════════════════════════════════════════════════
  // FRIENDS
  // ═══════════════════════════════════════════════════════════
  const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O/1/I/L — easy to read out loud
  const CODE_LEN = 8;
  function randomCode() {
    const a = new Uint32Array(CODE_LEN); crypto.getRandomValues(a);
    return Array.from(a, (x) => CODE_ALPHABET[x % CODE_ALPHABET.length]).join('');
  }
  const normCode = (s) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const fmtCode = (c) => (c && c.length === CODE_LEN ? c.slice(0, 4) + '-' + c.slice(4) : c || '');

  // Claims a code nobody holds. The transaction makes the claim atomic, so two
  // players can never end up with the same code even if they draw it at once.
  async function claimCode(uid) {
    for (let i = 0; i < 20; i++) {
      const code = randomCode();
      const r = await M.runTransaction(M.ref(db, 'friendCodes/' + code), (cur) => (cur === null ? { uid, createdAt: Date.now() } : undefined));
      if (r.committed) return code;
    }
    throw fail('تعذر إنشاء كود جديد، حاول مرة أخرى');
  }

  async function rotateCode() {
    const uid = myUid();
    const old = await val(`players/${uid}/friendCode`);
    const code = await claimCode(uid);
    await M.set(M.ref(db, `players/${uid}/friendCode`), code);
    if (old && old !== code) {
      try { const e = await val('friendCodes/' + old); if (e && e.uid === uid) await M.remove(M.ref(db, 'friendCodes/' + old)); } catch (e) {}
    }
    return code;
  }

  async function getMyCode() {
    need();
    const uid = myUid();
    const cur = await val(`players/${uid}/friendCode`);
    if (cur) {
      const e = await val('friendCodes/' + cur);
      if (e && e.uid === uid && !e.usedBy) return cur; // still valid
    }
    return rotateCode(); // none yet, or it was used / lost -> new one
  }

  // Calls cb(code, info) now and whenever the code changes. When somebody uses
  // the code a fresh one is generated automatically (one use per code).
  function watchMyCode(cb) {
    let stop = false, offs = [];
    ready.then(async () => {
      try { await whenUser(); } catch (e) { return; }
      if (stop) return;
      const uid = myUid();
      let busy = false, last = null;
      const check = async (info) => {
        if (busy || stop) return; busy = true;
        try { const c = await getMyCode(); if (c !== last) { last = c; cb(c, info || {}); } } catch (e) { cb(null, { error: e.message }); }
        busy = false;
      };
      offs.push(M.onValue(M.ref(db, `players/${uid}/friendCode`), () => check()));
      let codeOff = null, watching = null;
      offs.push(M.onValue(M.ref(db, `players/${uid}/friendCode`), (s) => {
        const c = s.val(); if (!c || c === watching) return; watching = c; if (codeOff) codeOff();
        codeOff = M.onValue(M.ref(db, 'friendCodes/' + c), (cs) => { const v = cs.val(); if (v && v.usedBy) check({ usedBy: v.usedBy }); });
      }));
      offs.push(() => { if (codeOff) codeOff(); });
    });
    return () => { stop = true; offs.forEach((f) => { try { f(); } catch (e) {} }); };
  }

  async function regenerateCode() { need(); return rotateCode(); }

  // Finds a player by friend code OR e-mail. Resolves {uid, username, via, code?}.
  async function lookup(input) {
    need();
    const q = String(input || '').trim();
    if (!q) throw fail('اكتب كود الصديق أو بريده الإلكتروني');
    let uid = null, via, code = null;
    if (q.includes('@')) {
      via = 'email';
      const email = q.toLowerCase();
      uid = await val('emailIndex/' + emailKey(email)).catch(() => null);
      if (!uid) { // players that never opened the new friends page are not indexed yet — ask the database instead
        for (const candidate of [...new Set([q, email])]) {
          try {
            const s = await M.get(M.query(M.ref(db, 'players'), M.orderByChild('email'), M.equalTo(candidate)));
            if (s.exists()) { uid = Object.keys(s.val())[0]; break; }
          } catch (e) { /* no permission / no index — ignore */ }
        }
      }
      if (!uid) throw fail('لا يوجد حساب بهذا البريد الإلكتروني', 'notfound');
    } else {
      via = 'code'; code = normCode(q);
      if (code.length !== CODE_LEN) throw fail('الكود يتكون من 8 أحرف وأرقام (مثال: K7QM-4TXR)', 'badcode');
      const e = await val('friendCodes/' + code);
      if (!e) throw fail('هذا الكود غير موجود أو تم استخدامه', 'notfound');
      if (e.usedBy) throw fail('هذا الكود تم استخدامه بالفعل', 'used');
      uid = e.uid;
    }
    if (uid === myUid()) throw fail('هذا هو كودك أنت 😅 — أرسله لصديقك', 'self');
    const username = (await val(`players/${uid}/username`)) || 'لاعب';
    return { uid, username, via, code };
  }

  // 'self' | 'friend' | 'sent' | 'received' | 'none'
  async function relation(uid) {
    need();
    if (uid === myUid()) return 'self';
    if (await exists(`players/${myUid()}/friends/${uid}`)) return 'friend';
    if (await exists(`players/${myUid()}/friendRequests/${uid}`)) return 'received';
    if (await exists(`players/${uid}/friendRequests/${myUid()}`)) return 'sent';
    return 'none';
  }

  // Sends a friend REQUEST. Nobody becomes a friend until the other player accepts.
  async function sendRequest(target) {
    need();
    const me = myUid(), uid = target.uid;
    if (!uid) throw fail('لاعب غير معروف');
    if (uid === me) throw fail('لا يمكنك إضافة نفسك');
    const rel = await relation(uid);
    if (rel === 'friend') throw fail('أنتما أصدقاء بالفعل', 'friend');
    if (rel === 'sent') throw fail('أرسلت له طلباً بالفعل — بانتظار رده', 'sent');
    if (rel === 'received') { await accept(uid); return { autoAccepted: true, username: target.username }; } // they already asked us
    if (target.via === 'code' && target.code) { // one use: mark the code as used (fails if somebody got there first)
      const r = await M.runTransaction(M.ref(db, 'friendCodes/' + target.code), (cur) => (cur && !cur.usedBy && cur.uid === uid ? Object.assign({}, cur, { usedBy: me, usedAt: Date.now() }) : undefined));
      if (!r.committed) throw fail('هذا الكود تم استخدامه بالفعل', 'used');
    }
    const name = await myName();
    await M.set(M.ref(db, `players/${uid}/friendRequests/${me}`), { from: { uid: me, username: name }, timestamp: Date.now(), via: target.via || 'room', status: 'pending' });
    await M.set(M.ref(db, `players/${me}/sentRequests/${uid}`), { to: { uid, username: target.username || '' }, timestamp: Date.now() }).catch(() => {});
    return { sent: true, username: target.username };
  }
  async function sendRequestToUid(uid, username) { return sendRequest({ uid, username, via: 'room' }); }

  async function accept(fromUid) {
    need();
    const me = myUid();
    const req = await val(`players/${me}/friendRequests/${fromUid}`);
    if (!req) throw fail('الطلب لم يعد موجوداً');
    const fromName = (req.from && req.from.username) || (await val(`players/${fromUid}/username`)) || 'صديق';
    const name = await myName();
    const now = Date.now();
    const upd = {
      [`players/${me}/friends/${fromUid}`]: { username: fromName, addedAt: now },
      [`players/${fromUid}/friends/${me}`]: { username: name, addedAt: now },
      [`players/${me}/friendRequests/${fromUid}`]: null,
      [`players/${fromUid}/sentRequests/${me}`]: null,
    };
    try { await M.update(M.ref(db), upd); }
    catch (e) { // fall back to one write at a time if the rules reject the combined one
      await M.set(M.ref(db, `players/${me}/friends/${fromUid}`), upd[`players/${me}/friends/${fromUid}`]);
      await M.set(M.ref(db, `players/${fromUid}/friends/${me}`), upd[`players/${fromUid}/friends/${me}`]);
      await M.remove(M.ref(db, `players/${me}/friendRequests/${fromUid}`));
      await M.remove(M.ref(db, `players/${fromUid}/sentRequests/${me}`)).catch(() => {});
    }
    notify(fromUid, { type: 'friend_accepted', text: `${name} قبل طلب صداقتك 🎉` });
    return { uid: fromUid, username: fromName };
  }

  async function decline(fromUid) {
    need();
    const me = myUid();
    await M.remove(M.ref(db, `players/${me}/friendRequests/${fromUid}`));
    await M.remove(M.ref(db, `players/${fromUid}/sentRequests/${me}`)).catch(() => {});
    notify(fromUid, { type: 'friend_declined', text: `${await myName()} رفض طلب الصداقة` });
  }

  async function cancel(toUid) {
    need();
    await M.remove(M.ref(db, `players/${toUid}/friendRequests/${myUid()}`));
    await M.remove(M.ref(db, `players/${myUid()}/sentRequests/${toUid}`)).catch(() => {});
  }

  async function removeFriend(uid) {
    need();
    const me = myUid();
    const upd = { [`players/${me}/friends/${uid}`]: null, [`players/${uid}/friends/${me}`]: null };
    try { await M.update(M.ref(db), upd); }
    catch (e) { await M.remove(M.ref(db, `players/${me}/friends/${uid}`)); await M.remove(M.ref(db, `players/${uid}/friends/${me}`)); }
  }

  // small personal notice shown in the inbox's notifications tab
  async function notify(uid, data) {
    try {
      await M.push(M.ref(db, `notifications/${uid}`), Object.assign({ fromUid: myUid(), fromName: await myName(), ts: Date.now() }, data));
    } catch (e) { /* best effort */ }
  }

  // lets the emailed-lookup work: emailIndex/{email} -> uid (own entry only)
  async function ensureIdentity(user) {
    try {
      if (!user.email) return;
      const k = 'emailIndex/' + emailKey(user.email);
      const cur = await val(k);
      if (cur !== user.uid) await M.set(M.ref(db, k), user.uid);
    } catch (e) { /* rules may not be deployed yet */ }
  }

  // ═══════════════════════════════════════════════════════════
  // CHAT
  // ═══════════════════════════════════════════════════════════
  const MAX_MSG = 500;
  async function chatSend(friendUid, text, friendName) {
    need();
    text = String(text || '').trim().slice(0, MAX_MSG);
    if (!text) throw fail('الرسالة فارغة');
    const me = myUid();
    if (!(await exists(`players/${me}/friends/${friendUid}`))) throw fail('يمكنك مراسلة أصدقائك فقط', 'notfriend');
    if (window.MOD && typeof window.MOD.scan === 'function') {
      try { if (await window.MOD.scan(text)) return null; } catch (e) { /* fail open */ }
    }
    const cid = chatIdOf(me, friendUid), ts = Date.now(), mid = newKey(), mine = await myName();
    if (!friendName) friendName = (await val(`players/${me}/friends/${friendUid}/username`)) || 'صديق';
    const preview = text.slice(0, 120);
    await M.update(M.ref(db), {
      [`chats/${cid}/messages/${mid}`]: { from: me, text, ts },
      [`userChats/${me}/${friendUid}`]: { with: friendUid, name: friendName, lastText: preview, lastFrom: me, lastTs: ts, unread: 0 },
      [`userChats/${friendUid}/${me}/with`]: me,
      [`userChats/${friendUid}/${me}/name`]: mine,
      [`userChats/${friendUid}/${me}/lastText`]: preview,
      [`userChats/${friendUid}/${me}/lastFrom`]: me,
      [`userChats/${friendUid}/${me}/lastTs`]: ts,
      [`userChats/${friendUid}/${me}/unread`]: M.increment(1),
    });
    return { id: mid, from: me, text, ts };
  }
  async function chatMarkRead(friendUid) {
    if (!db || !currentUser) return;
    try {
      const p = `userChats/${myUid()}/${friendUid}/unread`;
      if ((await val(p)) > 0) await M.set(M.ref(db, p), 0);
    } catch (e) {}
  }
  async function chatHistory(friendUid, n) {
    need();
    const s = await M.get(M.query(M.ref(db, `chats/${chatIdOf(myUid(), friendUid)}/messages`), M.limitToLast(n || 30)));
    const o = s.val() || {};
    return Object.keys(o).map((id) => Object.assign({ id }, o[id])).sort((a, b) => a.ts - b.ts);
  }
  function chatListen(friendUid, cb, n) {
    need();
    return M.onChildAdded(M.query(M.ref(db, `chats/${chatIdOf(myUid(), friendUid)}/messages`), M.limitToLast(n || 60)), (s) => cb(Object.assign({ id: s.key }, s.val())));
  }

  // ═══════════════════════════════════════════════════════════
  // ROOM INVITES  (a room that already exists)
  // ═══════════════════════════════════════════════════════════
  async function sendInvite(friendUid, friendName, roomCode, fromName) {
    need();
    await M.push(M.ref(db, `invites/${friendUid}`), {
      fromUid: myUid(), fromName: fromName || (await myName()), roomCode,
      timestamp: Date.now(), expiresAt: Date.now() + INVITE_TTL, status: 'pending',
    });
  }

  // "Ask to join" — only when the target friend is in a waiting-stage room.
  async function sendJoinRequest(targetUid) {
    need();
    const presence = (await val(`players/${targetUid}/presence`)) || {};
    if (!presence.inGame || presence.phase !== 'waiting' || !presence.room) throw fail('هذا الصديق ليس في غرفة انتظار حالياً');
    await M.push(M.ref(db, `joinRequests/${targetUid}`), {
      fromUid: myUid(), fromName: await myName(), roomCode: presence.room,
      timestamp: Date.now(), expiresAt: Date.now() + INVITE_TTL, status: 'pending',
    });
  }

  // ── room proposal: the room is created ONLY when the friend accepts ──
  async function proposeRoom(friendUid, friendName, category) {
    need();
    const me = myUid();
    if (!(await exists(`players/${me}/friends/${friendUid}`))) throw fail('يمكنك دعوة أصدقائك فقط');
    const key = newKey();
    await M.set(M.ref(db, `invites/${friendUid}/${key}`), {
      type: 'proposal', fromUid: me, fromName: await myName(), category: category || 'places',
      timestamp: Date.now(), expiresAt: Date.now() + INVITE_TTL, status: 'pending',
    });
    return key;
  }

  async function acceptProposal(myUidV, key, data) {
    // the inviter must still be around — otherwise we would create an empty room
    const pres = (await val(`players/${data.fromUid}/presence`)) || {};
    if (!pres.online) { showBanner('❌ صاحب الدعوة غير متصل الآن', 'error'); await dismiss(myUidV, key, 'expired'); return false; }
    const name = await myName();
    let code = '';
    for (let i = 0; i < 8; i++) {
      const c = Math.random().toString(36).substring(2, 6).toUpperCase();
      if (c.length === 4 && !(await exists('rooms/' + c))) { code = c; break; }
    }
    if (!code) throw fail('تعذر إنشاء غرفة، حاول مرة أخرى');
    await M.set(M.ref(db, 'rooms/' + code), {
      hostId: myUidV, status: 'waiting', category: data.category || 'places', visibility: 'private', createdAt: M.serverTimestamp(),
      players: { [myUidV]: { username: name, uid: myUidV, joinedAt: M.serverTimestamp(), connected: true, status: 'online', isHost: true } },
    });
    await M.update(M.ref(db, `invites/${myUidV}/${key}`), { status: 'accepted', roomCode: code }).catch(() => {});
    await M.push(M.ref(db, `inviteReplies/${data.fromUid}`), { status: 'accepted', roomCode: code, fromUid: myUidV, fromName: name, ts: Date.now(), proposalKey: key });
    await M.remove(M.ref(db, `invites/${myUidV}/${key}`)).catch(() => {});
    localStorage.setItem('currentRoom', code); localStorage.setItem('isHost', 'true'); localStorage.setItem('eljasus_user_name', name);
    window.location.href = roomUrl(code);
    return true;
  }

  async function declineProposal(myUidV, key, data) {
    await M.remove(M.ref(db, `invites/${myUidV}/${key}`)).catch(() => {});
    await M.push(M.ref(db, `inviteReplies/${data.fromUid}`), { status: 'declined', fromUid: myUidV, fromName: await myName(), ts: Date.now(), proposalKey: key }).catch(() => {});
  }

  // the inviter hears the answer (on any page) and is taken to the room
  function listenInviteReplies(uid) {
    M.onChildAdded(M.ref(db, `inviteReplies/${uid}`), async (snap) => {
      const r = snap.val(); if (!r) return;
      M.remove(M.ref(db, `inviteReplies/${uid}/${snap.key}`)).catch(() => {});
      if (Date.now() - (r.ts || 0) > 3 * 60 * 1000) return; // stale
      if (r.status === 'accepted' && r.roomCode) {
        const inRoom = /room\.html/i.test(location.pathname);
        showBanner(`✅ ${r.fromName || 'صديقك'} قبل دعوتك — ${inRoom ? 'غرفته: ' + r.roomCode : 'جارٍ الانتقال للغرفة…'}`, 'success', 6000);
        if (!inRoom) {
          localStorage.setItem('currentRoom', r.roomCode); localStorage.setItem('isHost', 'false');
          setTimeout(() => { window.location.href = roomUrl(r.roomCode); }, 1300);
        }
      } else if (r.status === 'declined') {
        showBanner(`${r.fromName || 'صديقك'} رفض دعوة الغرفة`, 'warning');
      }
    });
  }

  // ── accept / dismiss (used by the inbox handlers) ───────────
  // Resolves true when the player is joining; false keeps the inbox open.
  async function acceptInvite(myUidV, key, data) {
    try {
      if (data.type === 'proposal') return await acceptProposal(myUidV, key, data);
      const room = await val(`rooms/${data.roomCode}`);
      if (!room) { showBanner('❌ الغرفة لم تعد موجودة', 'error'); dismiss(myUidV, key, 'expired'); return false; }
      const count = Object.keys(room.players || {}).length;
      if (room.status === 'waiting') {
        if (count >= MAX_ROOM_PLAYERS) { showBanner('❌ الغرفة ممتلئة', 'error'); dismiss(myUidV, key, 'expired'); return false; }
        localStorage.setItem('currentRoom', data.roomCode); localStorage.setItem('isHost', 'false');
        await M.update(M.ref(db, `invites/${myUidV}/${key}`), { status: 'accepted' });
        window.location.href = roomUrl(data.roomCode);
        return true;
      }
      const phaseLabel = { playing: 'جارٍ تقديم الأدوار', discussion: 'مرحلة النقاش', voting: 'مرحلة التصويت', reveal: 'مرحلة الكشف' }[room.status] || room.status;
      showBanner(`⏳ الغرفة الآن في مرحلة "${phaseLabel}" — ستنضم تلقائياً عند انتهاء الجولة`, 'warning', 6000);
      localStorage.setItem('fi_pending_room', data.roomCode); localStorage.setItem('fi_pending_name', data.fromName || '');
      await M.update(M.ref(db, `invites/${myUidV}/${key}`), { status: 'accepted' });
      watchRoomForWaiting(data.roomCode);
      return true;
    } catch (e) {
      showBanner('❌ خطأ: ' + (e.message || e), 'error');
      return false;
    }
  }

  async function declineInvite(myUidV, key, data) {
    if (data && data.type === 'proposal') return declineProposal(myUidV, key, data);
    return dismiss(myUidV, key, 'declined');
  }

  // "let them into my room": turns the request into a normal invite back to them
  async function acceptJoinRequest(myUidV, key, data) {
    try {
      const presence = (await val(`players/${myUidV}/presence`)) || {};
      if (!presence.inGame || presence.phase !== 'waiting' || !presence.room) {
        showBanner('❌ لم تعد في غرفة انتظار — لا يمكن قبول الطلب', 'error');
        await M.update(M.ref(db, `joinRequests/${myUidV}/${key}`), { status: 'declined' });
        return false;
      }
      await sendInvite(data.fromUid, data.fromName, presence.room, await myName());
      await M.update(M.ref(db, `joinRequests/${myUidV}/${key}`), { status: 'accepted' });
      showBanner(`✅ تم قبول ${data.fromName} — بانتظار انضمامه`, 'success');
      return true;
    } catch (e) { showBanner('❌ خطأ: ' + (e.message || e), 'error'); return false; }
  }
  function declineJoinRequest(myUidV, key) { return M.update(M.ref(db, `joinRequests/${myUidV}/${key}`), { status: 'declined' }).catch(() => {}); }

  function watchRoomForWaiting(roomCode) {
    let off = null;
    off = M.onValue(M.ref(db, `rooms/${roomCode}/status`), (snap) => {
      if (snap.val() === 'waiting') {
        showBanner(`✅ انتهت الجولة في غرفة ${roomCode} — يمكنك الانضمام الآن!`, 'success', 8000);
        localStorage.setItem('currentRoom', roomCode); localStorage.setItem('isHost', 'false');
        setTimeout(() => { window.location.href = roomUrl(roomCode); }, 2500);
        if (off) off();
      }
    });
  }

  function dismiss(myUidV, key, status) {
    return M.update(M.ref(db, `invites/${myUidV}/${key}`), { status: status || 'declined' }).catch(() => {});
  }

  // expired invites / requests are swept away so they never pile up
  async function sweepExpired(uid) {
    for (const node of ['invites', 'joinRequests']) {
      try {
        const o = (await val(`${node}/${uid}`)) || {};
        for (const k of Object.keys(o)) { const v = o[k]; if (v && v.expiresAt && v.expiresAt < Date.now()) M.remove(M.ref(db, `${node}/${uid}/${k}`)).catch(() => {}); }
      } catch (e) {}
    }
  }

  // ── inviter's name-theme -> accent colour in the inbox ─────
  function getInviteThemeClass(nameTheme) {
    if (!nameTheme || nameTheme === 'default') return '';
    const map = { fireGold: 'themed-fire', fireFlicker: 'themed-fire', bloodRed: 'themed-fire', iceBlue: 'themed-ice', snowfall: 'themed-ice', neonPurple: 'themed-neon', pulseGlow: 'themed-neon', neonCyan: 'themed-neon', emeraldGreen: 'themed-emerald', starField: 'themed-gold', sparkles: 'themed-gold' };
    return map[nameTheme] || '';
  }
  async function fetchInviterTheme(fromUid) {
    try { return (await val(`players/${fromUid}/nameTheme`)) || 'default'; } catch (e) { return 'default'; }
  }

  // ═══════════════════════════════════════════════════════════
  // presence + user lifecycle
  // ═══════════════════════════════════════════════════════════
  function keepOnline(uid) {
    try {
      const pr = M.ref(db, `players/${uid}/presence`);
      M.onValue(M.ref(db, '.info/connected'), (s) => {
        if (s.val() !== true) return;
        M.onDisconnect(pr).update({ online: false, lastSeen: Date.now() });
        M.update(pr, { online: true, lastSeen: Date.now() }).catch(() => {});
      });
    } catch (e) {}
  }

  let userWaiters = [];
  function whenUser() { return currentUser ? Promise.resolve(currentUser) : new Promise((res) => userWaiters.push(res)); }

  async function startInbox(user) {
    const uid = user.uid;
    if (!(await ensureInbox())) return;
    window.EJInbox.setHandlers({
      acceptInvite: (inv) => acceptInvite(uid, inv.key, inv),
      declineInvite: (inv) => declineInvite(uid, inv.key, inv),
      acceptRequest: (req) => acceptJoinRequest(uid, req.key, req),
      declineRequest: (req) => declineJoinRequest(uid, req.key),
      getTheme: async (fromUid) => getInviteThemeClass(await fetchInviterTheme(fromUid)),
      acceptFriend: (fromUid) => accept(fromUid),
      declineFriend: (fromUid) => decline(fromUid),
      sendReply: (friendUid, text, name) => chatSend(friendUid, text, name),
      loadMessages: (friendUid, n) => chatHistory(friendUid, n || 6),
      markChatRead: (friendUid) => chatMarkRead(friendUid),
      dismissNotice: (id) => M.remove(M.ref(db, `notifications/${uid}/${id}`)),
      chatUrl,
    });
    window.EJInbox.init(db, user, {
      onJoin: (code) => { localStorage.setItem('currentRoom', code); localStorage.setItem('isHost', 'false'); window.location.href = roomUrl(code); },
    });
  }

  function onUser(user) {
    currentUser = user;
    if (!user) return;
    userWaiters.splice(0).forEach((f) => f(user));
    sweepExpired(user.uid);
    listenInviteReplies(user.uid);
    ensureIdentity(user);
    keepOnline(user.uid);
    startInbox(user).catch((e) => console.warn('[FI] inbox failed to start', e));
  }

  // ── Banner (small, classic palette) ────────────────────────
  function showBanner(msg, type, duration) {
    type = type || 'info'; duration = duration || 4500;
    const colors = {
      success: 'border-color:#a3e635;color:#a3e635;box-shadow:0 0 24px rgba(163,230,53,.3)',
      warning: 'border-color:#00f2ff;color:#00f2ff;box-shadow:0 0 24px rgba(0,242,255,.25)',
      error: 'border-color:#ff5d5d;color:#ff9a9a;box-shadow:0 0 24px rgba(255,93,93,.25)',
      info: 'border-color:#00f2ff;color:#e8fff4;box-shadow:0 0 24px rgba(0,242,255,.2)',
    };
    const b = document.createElement('div');
    b.setAttribute('role', 'status');
    b.style.cssText = `position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:10600;padding:12px 22px;border-radius:14px;
      font-family:'Cairo',sans-serif;font-weight:800;font-size:13px;text-align:center;background:#000;border:1.5px solid;
      direction:rtl;width:max-content;max-width:min(92vw,460px);${colors[type] || colors.info}`;
    b.textContent = msg;
    document.body.appendChild(b);
    setTimeout(() => { b.style.opacity = '0'; b.style.transition = 'opacity .4s'; setTimeout(() => b.remove(), 420); }, duration);
  }

  // ── Public API ─────────────────────────────────────────────
  const API = {
    __v: 4, ready, whenUser,
    sendInvite, sendJoinRequest, proposeRoom, showBanner,
    roomUrl, chatUrl, pageUrl,
    friends: {
      getMyCode, regenerateCode, watchMyCode, lookup, relation,
      sendRequest, sendRequestToUid, accept, decline, cancel, remove: removeFriend,
      fmtCode, normCode, emailKey,
    },
    chat: { chatId: chatIdOf, send: chatSend, markRead: chatMarkRead, history: chatHistory, listen: chatListen },
    get user() { return currentUser; },
  };
  window.FI = API;

  boot().catch((e) => { console.error('[FI] Firebase failed to start', e); rejectReady(e); });
})();