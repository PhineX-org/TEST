// ============================================================
// EL JASUS — PROFILE VIEWER v2.0  (Classic Edition)
// A full player card: rank + progress, live status, stats, role
// performance, favourite categories, recent games, achievements,
// inventory, mutual friends — and actions (chat, invite, add, remove).
//
// API (unchanged):  ProfileViewer.open(uid, username) / close() / init()
//
// IMPORTANT: this file never creates the default Firebase app while a
// page is still starting up (that used to make the page's own
// initializeApp() throw "duplicate-app"). It waits for the page's app
// and only creates one if the page never does.
// ============================================================
(function () {
  'use strict';
  if (window.ProfileViewer && window.ProfileViewer.__v >= 2) return;

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

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (v) => { v = Number(v); return isFinite(v) ? v : 0; };

  const CAT_NAMES = {
    places: '🌍 أماكن سياحية', food: '🍕 أكلات مصرية', jobs: '🛠️ مهن ووظائف',
    companies: '🏢 شركات عالمية', football_teams: '⚽ أندية ومنتخبات', animals: '🐾 حيوانات',
  };
  const catName = (k) => CAT_NAMES[k] || k;

  const ACHIEVEMENTS = {
    firstWin: { name: 'الفوز الأول', icon: '🎉', desc: 'فز بأول مباراة' },
    masterDeceiver: { name: 'خبير الخداع', icon: '🕵️', desc: 'افز 10 مباريات كجاسوس' },
    eagleEye: { name: 'عين الصقر', icon: '🦅', desc: 'اكشف الجاسوس 5 مرات' },
    perfectGame: { name: 'مباراة مثالية', icon: '🎯', desc: 'خمن الكلمة كجاسوس' },
    centuryClub: { name: 'نادي المئة', icon: '💯', desc: 'العب 100 مباراة' },
    hotStreak: { name: 'سلسلة نارية', icon: '🔥', desc: 'افز 5 مباريات متتالية' },
    diamondPlayer: { name: 'لاعب ألماسي', icon: '💎', desc: 'وصل لرتبة الألماس' },
  };

  // ── Firebase (late-bound) ──────────────────────────────────
  let db = null, M = null, auth = null, dbPromise = null;
  function getDb() {
    if (dbPromise) return dbPromise;
    dbPromise = (async () => {
      const appMod = await import(FB + 'firebase-app.js');
      M = await import(FB + 'firebase-database.js');
      const authMod = await import(FB + 'firebase-auth.js');
      const t0 = Date.now();
      while (!appMod.getApps().length && Date.now() - t0 < 6000) await sleep(60);
      let app;
      if (appMod.getApps().length) app = appMod.getApps()[0];
      else { try { app = appMod.initializeApp(FIREBASE_CONFIG); } catch (e) { app = appMod.getApp(); } }
      db = M.getDatabase(app);
      auth = authMod.getAuth(app);
      return db;
    })();
    dbPromise.catch(() => { dbPromise = null; });
    return dbPromise;
  }
  async function myUid() {
    if (window.FI && window.FI.user) return window.FI.user.uid;
    await getDb();
    if (auth.currentUser) return auth.currentUser.uid;
    if (window.FI) { try { await Promise.race([window.FI.whenUser(), sleep(2500)]); } catch (e) {} if (window.FI.user) return window.FI.user.uid; }
    return auth.currentUser ? auth.currentUser.uid : null;
  }
  async function getVal(path) { await getDb(); const s = await M.get(M.ref(db, path)); return s.val(); }

  // ── Styles (Classic palette: black / lime / cyan) ──────────
  function injectStyles() {
    if (document.getElementById('pv2-styles')) return;
    const s = document.createElement('style');
    s.id = 'pv2-styles';
    s.textContent = `
#pv2-overlay{position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.82);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);font-family:'Cairo',system-ui,sans-serif;direction:rtl}
#pv2-overlay.open{display:flex;animation:pv2f .2s ease}
@keyframes pv2f{from{opacity:0}to{opacity:1}}
@keyframes pv2u{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
#pv2{position:relative;width:100%;max-width:640px;max-height:min(92vh,880px);max-height:min(92dvh,880px);display:flex;flex-direction:column;background:#000;color:#fff;border:2px solid rgba(0,242,255,.45);border-radius:22px;box-shadow:0 0 0 1px rgba(163,230,53,.12),0 20px 60px rgba(0,0,0,.8),0 0 40px rgba(0,242,255,.12);overflow:hidden;animation:pv2u .28s cubic-bezier(.2,.8,.2,1)}
.pv2-x{position:absolute;top:12px;left:12px;z-index:3;width:36px;height:36px;border-radius:12px;border:2px solid rgba(255,107,125,.5);background:rgba(0,0,0,.6);color:#ff6b7d;font-size:16px;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:inherit}
.pv2-x:hover{background:rgba(255,107,125,.18)}
.pv2-scroll{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
.pv2-head{position:relative;padding:26px 20px 16px;text-align:center;background:radial-gradient(ellipse 90% 120% at 50% -20%,rgba(0,242,255,.16),transparent 70%),radial-gradient(ellipse 70% 90% at 100% 120%,rgba(163,230,53,.10),transparent 70%);border-bottom:1px solid rgba(0,242,255,.18)}
.pv2-rank{display:inline-flex;margin-bottom:6px;filter:drop-shadow(0 0 18px rgba(0,242,255,.35))}
.pv2-name{font-size:24px;font-weight:900;line-height:1.3;word-break:break-word}
.pv2-sub{margin-top:2px;font-size:12px;color:rgba(255,255,255,.6);font-family:'Orbitron','Cairo',sans-serif;letter-spacing:.03em}
.pv2-chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:12px}
.pv2-chip{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;border:1px solid rgba(0,242,255,.3);background:rgba(0,242,255,.07);color:#00f2ff}
.pv2-chip.lime{border-color:rgba(163,230,53,.4);background:rgba(163,230,53,.08);color:#a3e635}
.pv2-chip.dim{border-color:rgba(255,255,255,.15);background:rgba(255,255,255,.04);color:rgba(255,255,255,.65)}
.pv2-dot{width:8px;height:8px;border-radius:50%;background:#555;display:inline-block}
.pv2-dot.on{background:#a3e635;box-shadow:0 0 8px #a3e635}
.pv2-prog{margin:14px auto 0;max-width:360px;text-align:right}
.pv2-prog-row{display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,.55);margin-bottom:4px}
.pv2-bar{height:8px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}
.pv2-bar>i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#00f2ff,#a3e635);transition:width .6s ease}
.pv2-body{padding:16px 18px 20px;display:flex;flex-direction:column;gap:18px}
.pv2-h{font-size:12px;font-weight:900;color:#00f2ff;letter-spacing:.06em;margin:0 0 10px;font-family:'Orbitron','Cairo',sans-serif;display:flex;align-items:center;gap:6px}
.pv2-h::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(0,242,255,.3),transparent)}
.pv2-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.pv2-stat{background:rgba(0,242,255,.05);border:1px solid rgba(0,242,255,.2);border-radius:14px;padding:10px 6px;text-align:center}
.pv2-stat b{display:block;font-size:20px;font-weight:900;color:#00f2ff;font-family:'Orbitron',sans-serif;line-height:1.2}
.pv2-stat.lime b{color:#a3e635}.pv2-stat.lime{border-color:rgba(163,230,53,.25);background:rgba(163,230,53,.05)}
.pv2-stat small{display:block;margin-top:3px;font-size:10px;color:rgba(255,255,255,.55)}
.pv2-rows{display:flex;flex-direction:column;gap:10px}
.pv2-row .top{display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px}
.pv2-row .top span:last-child{font-family:'Orbitron',sans-serif;color:#a3e635;font-size:11px}
.pv2-row .pv2-bar.cy>i{background:#00f2ff}
.pv2-games{display:flex;flex-direction:column;gap:6px}
.pv2-game{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);font-size:12px}
.pv2-game .ic{font-size:18px}.pv2-game .nm{flex:1;min-width:0;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pv2-game .dt{color:rgba(255,255,255,.45);font-size:10px}
.pv2-res{padding:2px 10px;border-radius:99px;font-weight:900;font-size:11px}
.pv2-res.w{background:rgba(163,230,53,.15);color:#a3e635;border:1px solid rgba(163,230,53,.4)}
.pv2-res.l{background:rgba(255,107,125,.12);color:#ff6b7d;border:1px solid rgba(255,107,125,.35)}
.pv2-ach{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
.pv2-a{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03)}
.pv2-a.on{border-color:rgba(163,230,53,.45);background:rgba(163,230,53,.08)}
.pv2-a:not(.on){opacity:.38;filter:grayscale(.8)}
.pv2-a .ic{font-size:22px}.pv2-a b{display:block;font-size:12px}.pv2-a small{display:block;font-size:9px;color:rgba(255,255,255,.5);line-height:1.3}
.pv2-inv{display:flex;flex-wrap:wrap;gap:8px}
.pv2-item{padding:6px 11px;border-radius:12px;border:1px solid rgba(0,242,255,.25);background:rgba(0,242,255,.05);font-size:12px;font-weight:700;display:inline-flex;gap:6px;align-items:center}
.pv2-item small{color:rgba(255,255,255,.45);font-weight:400;font-size:10px}
.pv2-mut{display:flex;flex-wrap:wrap;gap:6px}
.pv2-empty{color:rgba(255,255,255,.4);font-size:12px;padding:6px 2px}
.pv2-load{padding:50px 20px;text-align:center;color:rgba(255,255,255,.55);font-size:14px}
.pv2-spin{width:38px;height:38px;border-radius:50%;margin:0 auto 14px;border:3px solid rgba(0,242,255,.12);border-top-color:#00f2ff;animation:pv2s 1s linear infinite}
@keyframes pv2s{to{transform:rotate(360deg)}}
.pv2-actions{display:flex;flex-wrap:wrap;gap:8px;padding:12px 14px calc(12px + env(safe-area-inset-bottom));border-top:1px solid rgba(0,242,255,.2);background:rgba(0,0,0,.92);flex-shrink:0}
.pv2-btn{flex:1 1 auto;min-width:96px;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 12px;border-radius:12px;border:2px solid rgba(0,242,255,.4);background:rgba(0,242,255,.08);color:#00f2ff;font:inherit;font-weight:900;font-size:13px;cursor:pointer;text-decoration:none;white-space:nowrap}
.pv2-btn:hover{background:rgba(0,242,255,.18)}
.pv2-btn.lime{border-color:rgba(163,230,53,.55);background:rgba(163,230,53,.12);color:#a3e635}.pv2-btn.lime:hover{background:rgba(163,230,53,.22)}
.pv2-btn.red{flex:0 0 auto;min-width:0;border-color:rgba(255,107,125,.45);background:rgba(255,107,125,.08);color:#ff6b7d}
.pv2-btn:disabled{opacity:.5;cursor:default}
.pv2-toast{position:absolute;bottom:76px;left:50%;transform:translateX(-50%);max-width:90%;padding:8px 14px;border-radius:12px;background:#000;border:2px solid rgba(163,230,53,.6);color:#a3e635;font-size:12px;font-weight:700;z-index:5;text-align:center}
.pv2-toast.err{border-color:rgba(255,107,125,.6);color:#ff6b7d}
@media (max-width:640px){
  #pv2-overlay{padding:0;align-items:flex-end}
  #pv2{max-width:none;max-height:94vh;max-height:94dvh;border-radius:22px 22px 0 0;border-bottom:none}
  .pv2-name{font-size:21px}
  .pv2-body{padding:14px 14px 18px}
  .pv2-grid{grid-template-columns:repeat(3,1fr);gap:8px}
  .pv2-stat b{font-size:17px}
  .pv2-ach{grid-template-columns:1fr}
  .pv2-btn{flex:1 1 110px;min-width:0;padding:11px 8px}.pv2-btn.red{flex:0 0 auto}
}`;
    document.head.appendChild(s);
  }

  // ── Modal shell ────────────────────────────────────────────
  let openToken = 0;
  function createModal() {
    if (document.getElementById('pv2-overlay')) return;
    const o = document.createElement('div');
    o.id = 'pv2-overlay';
    o.innerHTML = `<div id="pv2" role="dialog" aria-modal="true"><button class="pv2-x" id="pv2-x" type="button" aria-label="إغلاق">✕</button><div class="pv2-scroll" id="pv2-scroll"></div><div class="pv2-actions" id="pv2-actions" style="display:none"></div></div>`;
    document.body.appendChild(o);
    o.addEventListener('click', (e) => { if (e.target === o) closeModal(); });
    document.getElementById('pv2-x').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }
  function closeModal() {
    openToken++;
    const o = document.getElementById('pv2-overlay');
    if (o) o.classList.remove('open');
  }

  function toast(msg, err) {
    const box = document.getElementById('pv2'); if (!box) return;
    const old = box.querySelector('.pv2-toast'); if (old) old.remove();
    const t = document.createElement('div'); t.className = 'pv2-toast' + (err ? ' err' : ''); t.textContent = msg;
    box.appendChild(t); setTimeout(() => t.remove(), 3200);
  }

  // ── Data ───────────────────────────────────────────────────
  async function loadProfile(uid) {
    const d = await getVal('players/' + uid);
    if (!d) return null;
    let hist = d.gameHistory || [];
    if (!Array.isArray(hist)) hist = Object.values(hist);
    hist = hist.filter(Boolean).sort((a, b) => num(a.timestamp) - num(b.timestamp));
    const inv = d.inventory || {};
    return {
      uid,
      username: d.username || 'لاعب',
      rankPoints: num(d.rankPoints),
      stats: d.stats || {},
      achievements: d.achievements || {},
      inventory: { nameThemes: Object.values(inv.nameThemes || {}), nameTags: Object.values(inv.nameTags || {}) },
      nameTheme: d.nameTheme || 'default',
      nameTag: d.nameTag || null,
      presence: d.presence || {},
      categoryStats: d.categoryStats || {},
      history: hist,
      createdAt: d.createdAt || null,
      friendIds: Object.keys(d.friends || {}),
      friendCount: Object.keys(d.friends || {}).length,
    };
  }

  function fmtDate(ts) { try { return new Date(ts).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) { return ''; } }
  function fmtShort(ts) { try { return new Date(ts).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' }); } catch (e) { return ''; } }
  function ago(ts) {
    ts = num(ts); if (!ts) return '';
    const d = Date.now() - ts;
    if (d < 120000) return 'قبل لحظات';
    if (d < 3600000) return 'قبل ' + Math.floor(d / 60000) + ' دقيقة';
    if (d < 86400000) return 'قبل ' + Math.floor(d / 3600000) + ' ساعة';
    if (d < 30 * 86400000) return 'قبل ' + Math.floor(d / 86400000) + ' يوم';
    return fmtDate(ts);
  }
  const pct = (a, b) => (b > 0 ? Math.round((a / b) * 100) : 0);

  // ── Render ─────────────────────────────────────────────────
  function statusChip(p) {
    const pr = p.presence || {};
    if (pr.online && pr.inGame) return `<span class="pv2-chip lime"><span class="pv2-dot on"></span>🎮 يلعب الآن${pr.phase === 'waiting' ? ' (غرفة انتظار)' : ''}</span>`;
    if (pr.online) return `<span class="pv2-chip lime"><span class="pv2-dot on"></span>متصل الآن</span>`;
    return `<span class="pv2-chip dim"><span class="pv2-dot"></span>${pr.lastSeen ? 'آخر ظهور ' + esc(ago(pr.lastSeen)) : 'غير متصل'}</span>`;
  }

  function render(p, ctx) {
    const sc = document.getElementById('pv2-scroll');
    const st = p.stats;
    const spyGames = num(st.spyGames), innGames = num(st.innocentGames);
    const spyWins = num(st.spyWins), innWins = num(st.innocentWins);
    const wins = spyWins + innWins;
    const games = num(st.totalGames) || (spyGames + innGames);
    const losses = Math.max(0, games - wins);
    const detect = num(st.spyDetectionRate);

    // categories
    const cats = Object.keys(p.categoryStats).map((k) => [k, num(p.categoryStats[k])]).filter((x) => x[1] > 0).sort((a, b) => b[1] - a[1]).slice(0, 4);
    // recent games
    const recent = p.history.slice(-5).reverse();
    // inventory (resolve names via NameThemes when present)
    const NT = window.NameThemes || {};
    const items = [];
    p.inventory.nameThemes.forEach((k) => { const t = NT.themes && NT.themes[k]; if (t) items.push({ n: t.name || k, t: 'ثيم اسم', i: '✨' }); });
    p.inventory.nameTags.forEach((k) => { const t = NT.tags && NT.tags[k]; if (t) items.push({ n: t.name || k, t: 'وسم', i: t.icon || '🏷️' }); });

    const chips = [statusChip(p)];
    if (ctx.relation === 'friend') chips.push(`<span class="pv2-chip">🤝 صديقك${ctx.since ? ' منذ ' + esc(fmtDate(ctx.since)) : ''}</span>`);
    if (ctx.relation === 'sent') chips.push('<span class="pv2-chip dim">⏳ طلب الصداقة مُرسل</span>');
    if (ctx.relation === 'received') chips.push('<span class="pv2-chip lime">📩 أرسل لك طلب صداقة</span>');
    if (p.createdAt) chips.push(`<span class="pv2-chip dim">📅 عضو منذ ${esc(fmtDate(p.createdAt))}</span>`);
    chips.push(`<span class="pv2-chip dim">👥 ${p.friendCount} صديق</span>`);

    sc.innerHTML = `
      <div class="pv2-head">
        <div class="pv2-rank" id="pv2-rankicon"></div>
        <div class="pv2-name" id="pv2-name">${esc(p.username)}</div>
        <div class="pv2-sub" id="pv2-sub"></div>
        <div class="pv2-chips">${chips.join('')}</div>
        <div class="pv2-prog" id="pv2-prog"></div>
      </div>
      <div class="pv2-body">
        <section><h4 class="pv2-h">📊 الإحصائيات</h4>
          <div class="pv2-grid">
            <div class="pv2-stat lime"><b>${wins}</b><small>انتصارات</small></div>
            <div class="pv2-stat"><b>${losses}</b><small>خسائر</small></div>
            <div class="pv2-stat lime"><b>${pct(wins, games)}%</b><small>نسبة الفوز</small></div>
            <div class="pv2-stat"><b>${games}</b><small>المباريات</small></div>
            <div class="pv2-stat"><b>${num(st.currentStreak)}</b><small>سلسلة حالية</small></div>
            <div class="pv2-stat lime"><b>${num(st.longestWinStreak)}</b><small>أطول سلسلة</small></div>
          </div>
        </section>
        <section><h4 class="pv2-h">🎭 الأداء حسب الدور</h4>
          <div class="pv2-rows">
            <div class="pv2-row"><div class="top"><span>🕵️ جاسوس — ${spyWins}/${spyGames} فوز</span><span>${pct(spyWins, spyGames)}%</span></div><div class="pv2-bar"><i style="width:${pct(spyWins, spyGames)}%"></i></div></div>
            <div class="pv2-row"><div class="top"><span>🛡️ بريء — ${innWins}/${innGames} فوز</span><span>${pct(innWins, innGames)}%</span></div><div class="pv2-bar cy"><i style="width:${pct(innWins, innGames)}%"></i></div></div>
            <div class="pv2-row"><div class="top"><span>🔎 اكتشاف الجاسوس</span><span>${Math.round(detect)}%</span></div><div class="pv2-bar cy"><i style="width:${Math.min(100, Math.max(0, detect))}%"></i></div></div>
            ${num(st.timesCaughtAsSpy) ? `<div class="pv2-empty">انكشف كجاسوس ${num(st.timesCaughtAsSpy)} مرة</div>` : ''}
          </div>
        </section>
        <section><h4 class="pv2-h">🗂️ الفئات المفضلة</h4>
          ${cats.length ? `<div class="pv2-rows">${cats.map((c) => `<div class="pv2-row"><div class="top"><span>${esc(catName(c[0]))}</span><span>${c[1]}</span></div><div class="pv2-bar"><i style="width:${Math.round((c[1] / cats[0][1]) * 100)}%"></i></div></div>`).join('')}</div>` : '<div class="pv2-empty">لا توجد بيانات بعد</div>'}
        </section>
        <section><h4 class="pv2-h">🕒 آخر المباريات</h4>
          ${recent.length ? `<div class="pv2-games">${recent.map((g) => `<div class="pv2-game"><span class="ic">${g.role === 'spy' ? '🕵️' : '🛡️'}</span><span class="nm">${esc(catName(g.category || 'عام'))}</span><span class="dt">${esc(fmtShort(g.timestamp))}</span><span class="pv2-res ${g.won ? 'w' : 'l'}">${g.won ? 'فوز' : 'خسارة'}</span></div>`).join('')}</div>` : '<div class="pv2-empty">لا توجد مباريات مسجلة</div>'}
        </section>
        <section><h4 class="pv2-h">🏆 الإنجازات (${Object.keys(ACHIEVEMENTS).filter((k) => p.achievements[k]).length}/${Object.keys(ACHIEVEMENTS).length})</h4>
          <div class="pv2-ach">${Object.keys(ACHIEVEMENTS).map((k) => { const a = ACHIEVEMENTS[k]; return `<div class="pv2-a${p.achievements[k] ? ' on' : ''}"><span class="ic">${a.icon}</span><div><b>${a.name}</b><small>${a.desc}</small></div></div>`; }).join('')}</div>
        </section>
        <section><h4 class="pv2-h">🎒 المخزون</h4>
          ${items.length ? `<div class="pv2-inv">${items.map((i) => `<span class="pv2-item">${esc(i.i)} ${esc(i.n)} <small>${esc(i.t)}</small></span>`).join('')}</div>` : '<div class="pv2-empty">لا توجد عناصر في المخزون</div>'}
        </section>
        ${ctx.mutual && ctx.mutual.length ? `<section><h4 class="pv2-h">👥 أصدقاء مشتركون (${ctx.mutual.length})</h4><div class="pv2-mut">${ctx.mutual.slice(0, 12).map((n) => `<span class="pv2-chip">${esc(n)}</span>`).join('')}${ctx.mutual.length > 12 ? `<span class="pv2-chip dim">+${ctx.mutual.length - 12}</span>` : ''}</div></section>` : ''}
      </div>`;

    // rank (uses the existing rank system as-is)
    try {
      if (NT.getRank) {
        const rank = NT.getRank(p.rankPoints);
        document.getElementById('pv2-sub').textContent = `${rank.nameAr || ''} ${rank.division ? '· ' + rank.division : ''} · ${p.rankPoints} نقطة`;
        if (NT.createRankIcon) document.getElementById('pv2-rankicon').appendChild(NT.createRankIcon(p.rankPoints, 84));
        if (NT.getProgress) {
          const pr = NT.getProgress(p.rankPoints);
          document.getElementById('pv2-prog').innerHTML = pr.next
            ? `<div class="pv2-prog-row"><span>${esc(pr.rank.nameAr || '')}</span><span>${pr.pointsForNextTier} نقطة للـ ${esc(pr.next.nameAr || '')}</span></div><div class="pv2-bar"><i style="width:${Math.round(pr.progressPercent)}%"></i></div>`
            : `<div class="pv2-prog-row"><span>🏅 أعلى رتبة</span><span></span></div><div class="pv2-bar"><i style="width:100%"></i></div>`;
        }
      } else document.getElementById('pv2-sub').textContent = p.rankPoints + ' نقطة';
      if (NT.applyPlayerStyle) NT.applyPlayerStyle(document.getElementById('pv2-name'), { username: p.username, nameTheme: p.nameTheme, nameTag: p.nameTag, rankPoints: p.rankPoints });
    } catch (e) { /* decoration only */ }

    renderActions(p, ctx);
  }

  // ── Actions ────────────────────────────────────────────────
  function chatHref(uid) {
    if (window.FI && window.FI.chatUrl) return window.FI.chatUrl(uid);
    return 'chat.html?with=' + encodeURIComponent(uid);
  }
  function renderActions(p, ctx) {
    const bar = document.getElementById('pv2-actions');
    if (ctx.relation === 'self') { bar.style.display = 'none'; return; }
    const pr = p.presence || {};
    const b = [];
    if (ctx.relation === 'friend') {
      b.push(`<a class="pv2-btn lime" href="${esc(chatHref(p.uid))}"><i class="fas fa-comment"></i> دردشة</a>`);
      if (pr.online && !pr.inGame) b.push('<button class="pv2-btn" data-pv="invite" type="button">🎮 دعوة للعب</button>');
      if (pr.inGame && pr.phase === 'waiting' && pr.room) b.push('<button class="pv2-btn" data-pv="join" type="button">🚪 اطلب الانضمام</button>');
      b.push('<button class="pv2-btn red" data-pv="remove" type="button" title="إزالة من الأصدقاء">🗑️</button>');
    } else if (ctx.relation === 'received') {
      b.push('<button class="pv2-btn lime" data-pv="accept" type="button">✔ قبول الطلب</button>');
      b.push('<button class="pv2-btn red" data-pv="decline" type="button">✖ رفض</button>');
    } else if (ctx.relation === 'sent') {
      b.push('<button class="pv2-btn" data-pv="cancel" type="button">إلغاء الطلب</button>');
    } else {
      b.push('<button class="pv2-btn lime" data-pv="add" type="button">➕ إرسال طلب صداقة</button>');
    }
    bar.innerHTML = b.join('');
    bar.style.display = 'flex';
    bar.onclick = async (e) => {
      const btn = e.target.closest('[data-pv]'); if (!btn) return;
      const act = btn.dataset.pv;
      const F = window.FI;
      if (!F) { toast('نظام الأصدقاء لم يُحمّل بعد', true); return; }
      btn.disabled = true;
      try {
        await F.ready; await F.whenUser();
        if (act === 'add') { const r = await F.friends.sendRequestToUid(p.uid, p.username); toast(r && r.autoAccepted ? '🎉 أصبحتما أصدقاء' : '✅ تم إرسال طلب الصداقة'); ctx.relation = r && r.autoAccepted ? 'friend' : 'sent'; render(p, ctx); }
        else if (act === 'accept') { await F.friends.accept(p.uid); ctx.relation = 'friend'; ctx.since = Date.now(); toast('🎉 أصبحتما أصدقاء'); render(p, ctx); }
        else if (act === 'decline') { await F.friends.decline(p.uid); ctx.relation = 'none'; toast('تم رفض الطلب'); render(p, ctx); }
        else if (act === 'cancel') { await F.friends.cancel(p.uid); ctx.relation = 'none'; toast('تم إلغاء الطلب'); render(p, ctx); }
        else if (act === 'remove') {
          const ok = window.UIConfirm ? await window.UIConfirm('إزالة ' + p.username + ' من أصدقائك؟', { title: 'إزالة صديق', type: 'warning', confirmText: 'إزالة', icon: '⚠️' }) : true;
          if (ok) { await F.friends.remove(p.uid); ctx.relation = 'none'; toast('تمت إزالة الصديق'); render(p, ctx); } else btn.disabled = false;
        }
        else if (act === 'join') { await F.sendJoinRequest(p.uid); toast('✅ تم إرسال طلب الانضمام'); btn.disabled = false; }
        else if (act === 'invite') {
          const cat = await pickCategory(p.username);
          if (!cat) { btn.disabled = false; return; }
          await F.proposeRoom(p.uid, p.username, cat);
          toast('✅ تم إرسال الدعوة — ستنتقلان للغرفة فور قبوله'); btn.disabled = false;
        }
      } catch (err) { toast(err.message || 'حدث خطأ', true); btn.disabled = false; }
    };
  }

  function pickCategory(name) {
    return new Promise((resolve) => {
      const box = document.getElementById('pv2');
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:absolute;inset:0;z-index:6;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:18px;';
      wrap.innerHTML = `<div style="width:100%;max-width:320px;border:2px solid rgba(163,230,53,.5);border-radius:18px;padding:18px;background:#000;text-align:center">
        <div style="font-weight:900;color:#a3e635;margin-bottom:4px">🎮 دعوة ${esc(name)}</div>
        <div style="font-size:12px;color:rgba(255,255,255,.6);margin-bottom:12px;line-height:1.5">تُنشأ الغرفة فقط عندما يقبل</div>
        <select id="pv2-cat" style="width:100%;padding:10px;border-radius:12px;background:#0b0b0b;color:#fff;border:2px solid rgba(0,242,255,.3);font:inherit;margin-bottom:12px">
          ${Object.keys(CAT_NAMES).filter((k) => k !== 'animals').map((k) => `<option value="${k}">${CAT_NAMES[k]}</option>`).join('')}
        </select>
        <div style="display:flex;gap:8px"><button class="pv2-btn lime" id="pv2-go" type="button">إرسال</button><button class="pv2-btn" id="pv2-no" type="button">إلغاء</button></div></div>`;
      box.appendChild(wrap);
      wrap.querySelector('#pv2-go').onclick = () => { const v = wrap.querySelector('#pv2-cat').value; wrap.remove(); resolve(v); };
      wrap.querySelector('#pv2-no').onclick = () => { wrap.remove(); resolve(null); };
    });
  }

  // ── Public API ─────────────────────────────────────────────
  async function openProfile(uid, username) {
    if (!uid) return;
    injectStyles(); createModal();
    const token = ++openToken;
    const o = document.getElementById('pv2-overlay');
    o.classList.add('open');
    document.getElementById('pv2-actions').style.display = 'none';
    document.getElementById('pv2-scroll').innerHTML = `<div class="pv2-load"><div class="pv2-spin"></div><div>${username ? 'جاري تحميل ملف ' + esc(username) : 'جاري التحميل...'}</div></div>`;
    try {
      const [p, me] = await Promise.all([loadProfile(uid), myUid().catch(() => null)]);
      if (token !== openToken) return; // closed or another profile opened meanwhile
      if (!p) { document.getElementById('pv2-scroll').innerHTML = '<div class="pv2-load">تعذر العثور على هذا اللاعب</div>'; return; }
      const ctx = { relation: 'none', since: null, mutual: [] };
      if (me) {
        if (me === uid) ctx.relation = 'self';
        else {
          const [fr, recv, sent, myFriends] = await Promise.all([
            getVal(`players/${me}/friends/${uid}`).catch(() => null),
            getVal(`players/${me}/friendRequests/${uid}`).catch(() => null),
            getVal(`players/${uid}/friendRequests/${me}`).catch(() => null),
            getVal(`players/${me}/friends`).catch(() => null),
          ]);
          ctx.relation = fr ? 'friend' : recv ? 'received' : sent ? 'sent' : 'none';
          ctx.since = fr && fr.addedAt || null;
          const mine = myFriends || {};
          ctx.mutual = p.friendIds.filter((id) => mine[id]).map((id) => (mine[id] && mine[id].username) || 'لاعب');
        }
      }
      if (token !== openToken) return;
      render(p, ctx);
    } catch (e) {
      console.error('[ProfileViewer]', e);
      if (token === openToken) document.getElementById('pv2-scroll').innerHTML = '<div class="pv2-load">تعذر تحميل البيانات</div>';
    }
  }

  window.ProfileViewer = {
    __v: 2,
    open: openProfile,
    close: closeModal,
    init() { injectStyles(); createModal(); },
  };

  // Build the (hidden) shell as soon as the DOM exists. Firebase is NOT touched until a profile is opened.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => window.ProfileViewer.init());
  else window.ProfileViewer.init();
})();