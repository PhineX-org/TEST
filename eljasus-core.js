/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║           EL JASUS — CORE SHARED MODULE                  ║
 * ║  Single source of truth for auth, Firebase, tutorial     ║
 * ║  Include this on EVERY page: <script src="eljasus-core.js"></script>
 * ╚═══════════════════════════════════════════════════════════╝
 *
 * Exposes: window.EJ  (ElJasus namespace)
 *
 * EJ.getUID()         — current player UID (guest or real)
 * EJ.getUsername()    — display name from localStorage
 * EJ.isGuest()        — true if playing as guest
 * EJ.isLoggedIn()     — true if Firebase-authenticated
 * EJ.getFirebaseConfig() — the config object (for module imports)
 * EJ.showAuthModal()  — open the login/register modal manually
 * EJ.showTutorial()   — open the how-to-play tutorial
 * EJ.onAuthReady(cb)  — fire cb when auth state is known
 * EJ.logout()         — sign out
 */

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // FIREBASE CONFIG  (single source of truth — update here only)
  // ─────────────────────────────────────────────────────────────
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDnd-pmKEatI3DaFz6xHWB5ucurtHXt9tk",
    authDomain: "el-jasus.firebaseapp.com",
    databaseURL: "https://el-jasus-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "el-jasus",
    storageBucket: "el-jasus.firebasestorage.app",
    messagingSenderId: "415659587906",
    appId: "1:415659587906:web:782f7940176ea4097eb0db",
    measurementId: "G-N4K79FP56N"
  };

  // ─────────────────────────────────────────────────────────────
  // LOCAL STORAGE KEYS
  // ─────────────────────────────────────────────────────────────
  const LS = {
    GUEST_UID:      'eljasus_guest_uid',
    USERNAME:       'eljasus_user_name',
    GUEST_MODE:     'guestMode',
    TUTORIAL_DONE:  'eljasus_tutorial_done',
    CURRENT_ROOM:   'currentRoom',
    IS_HOST:        'isHost',
    BAN:            'eljasus_ban_v3',
    DAILY_REWARD:   'eljasus_daily_reward',
    WELCOME:        'eljasus_welcome',
  };

  // ─────────────────────────────────────────────────────────────
  // INTERNAL STATE
  // ─────────────────────────────────────────────────────────────
  let _firebaseUser   = null;   // Firebase Auth user object or null
  let _guestUID       = null;   // guest_xxxxx
  let _authReadyCbs   = [];     // queued onAuthReady callbacks
  let _authResolved   = false;

  // ─────────────────────────────────────────────────────────────
  // GUEST UID MANAGEMENT
  // ─────────────────────────────────────────────────────────────
  function _generateGuestUID() {
    const existing = localStorage.getItem(LS.GUEST_UID);
    if (existing) return existing;
    const uid = 'guest_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem(LS.GUEST_UID, uid);
    return uid;
  }

  // ─────────────────────────────────────────────────────────────
  // PUBLIC API
  // ─────────────────────────────────────────────────────────────
  const EJ = {
    getFirebaseConfig() { return FIREBASE_CONFIG; },

    getUID() {
      if (_firebaseUser) return _firebaseUser.uid;
      if (localStorage.getItem(LS.GUEST_MODE) === 'true') {
        return localStorage.getItem(LS.GUEST_UID) || _generateGuestUID();
      }
      return null;
    },

    getUsername() {
      return localStorage.getItem(LS.USERNAME) || (_firebaseUser?.displayName) || 'لاعب';
    },

    isGuest() {
      return !_firebaseUser && localStorage.getItem(LS.GUEST_MODE) === 'true';
    },

    isLoggedIn() {
      return !!_firebaseUser;
    },

    /** fire cb when auth state is first known */
    onAuthReady(cb) {
      if (_authResolved) { cb(); return; }
      _authReadyCbs.push(cb);
    },

    /** Set user from auth - called by module scripts after initializeApp */
    _setFirebaseUser(user) {
      _firebaseUser = user;
      if (!_authResolved) {
        _authResolved = true;
        _authReadyCbs.forEach(cb => cb());
        _authReadyCbs = [];
      }
    },

    showAuthModal,
    showTutorial,
    logout,

    /** Persist player name to localStorage */
    setUsername(name) {
      localStorage.setItem(LS.USERNAME, name);
    },

    /** Enter guest mode with an optional chosen name */
    enterGuestMode(name) {
      _guestUID = _generateGuestUID();
      localStorage.setItem(LS.GUEST_MODE, 'true');
      if (name) localStorage.setItem(LS.USERNAME, name);
      _authResolved = true;
      _authReadyCbs.forEach(cb => cb());
      _authReadyCbs = [];
    },

    /** Clear guest mode flag (used after real login) */
    clearGuestMode() {
      localStorage.removeItem(LS.GUEST_MODE);
    },

    LS, // expose keys
  };

  // ─────────────────────────────────────────────────────────────
  // AUTH MODAL  (login / register tabs + X = continue as guest)
  // ─────────────────────────────────────────────────────────────
  function showAuthModal(opts = {}) {
    if (document.getElementById('_ej_auth_modal')) return;
    const { onSuccess, allowGuest = true } = opts;

    const overlay = document.createElement('div');
    overlay.id = '_ej_auth_modal';
    overlay.innerHTML = `
<style>
#_ej_auth_modal {
  position:fixed;inset:0;z-index:99999;
  display:flex;align-items:center;justify-content:center;
  background:rgba(0,0,0,.82);backdrop-filter:blur(8px);
  animation:_ej_fadeIn .25s ease;
}
@keyframes _ej_fadeIn{from{opacity:0}to{opacity:1}}
#_ej_auth_box {
  position:relative;width:92%;max-width:420px;
  background:linear-gradient(145deg,#0b0f1e,#111628);
  border:1.5px solid rgba(0,242,255,.25);
  border-radius:24px;padding:32px 28px 28px;
  box-shadow:0 0 60px rgba(0,242,255,.1),0 30px 80px rgba(0,0,0,.6);
  animation:_ej_slideUp .3s cubic-bezier(.34,1.56,.64,1);
}
@keyframes _ej_slideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
#_ej_auth_close {
  position:absolute;top:14px;left:14px;
  width:32px;height:32px;border-radius:50%;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  color:#888;font-size:16px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;
}
#_ej_auth_close:hover{background:rgba(255,80,80,.15);border-color:rgba(255,80,80,.4);color:#ff5555;}
._ej_logo_row{text-align:center;margin-bottom:22px;}
._ej_logo_row img{width:64px;height:64px;border-radius:50%;border:2px solid #00f2ff;box-shadow:0 0 20px rgba(0,242,255,.4);}
._ej_logo_row h2{font-family:'Orbitron',sans-serif;font-size:1.1rem;font-weight:900;color:#fff;margin-top:10px;letter-spacing:.05em;}
._ej_logo_row p{font-size:.7rem;color:#4a9eff;font-weight:700;margin-top:2px;}
._ej_tabs{display:flex;background:rgba(255,255,255,.04);border-radius:12px;padding:4px;margin-bottom:22px;gap:4px;}
._ej_tab{flex:1;padding:9px;border-radius:9px;border:none;background:transparent;
  color:#666;font-family:'Cairo',sans-serif;font-size:.8rem;font-weight:700;
  cursor:pointer;transition:all .2s;}
._ej_tab.active{background:rgba(0,242,255,.12);color:#00f2ff;box-shadow:0 0 15px rgba(0,242,255,.1);}
._ej_field{margin-bottom:14px;}
._ej_field label{display:block;font-size:.7rem;font-weight:700;color:#888;margin-bottom:6px;text-transform:uppercase;letter-spacing:.08em;}
._ej_field input{
  width:100%;padding:12px 16px;
  background:rgba(255,255,255,.05);
  border:1.5px solid rgba(255,255,255,.1);
  border-radius:11px;color:#fff;font-size:.9rem;font-family:'Cairo',sans-serif;
  outline:none;transition:border .2s,box-shadow .2s;
}
._ej_field input:focus{border-color:#00f2ff;box-shadow:0 0 16px rgba(0,242,255,.15);}
._ej_btn{
  width:100%;padding:13px;border-radius:12px;border:none;
  background:linear-gradient(135deg,#00c6ff,#0072ff);
  color:#fff;font-family:'Cairo',sans-serif;font-size:.9rem;font-weight:900;
  cursor:pointer;letter-spacing:.03em;transition:all .25s;
  box-shadow:0 4px 20px rgba(0,114,255,.35);
}
._ej_btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,114,255,.5);}
._ej_btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
._ej_err{font-size:.75rem;color:#ff6b6b;text-align:center;margin-top:10px;min-height:20px;font-family:'Cairo',sans-serif;}
._ej_or{display:flex;align-items:center;gap:10px;margin:16px 0;}
._ej_or span{flex:1;height:1px;background:rgba(255,255,255,.08);}
._ej_or p{font-size:.65rem;color:#555;font-weight:700;white-space:nowrap;}
._ej_guest_btn{
  width:100%;padding:11px;border-radius:12px;
  background:rgba(255,255,255,.04);border:1.5px dashed rgba(255,255,255,.12);
  color:#888;font-family:'Cairo',sans-serif;font-size:.8rem;font-weight:700;
  cursor:pointer;transition:all .25s;
}
._ej_guest_btn:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.22);color:#bbb;}
._ej_success{text-align:center;padding:12px 0;}
._ej_success i{font-size:3rem;color:#00f2ff;margin-bottom:12px;display:block;}
._ej_success p{color:#fff;font-size:.9rem;font-weight:700;font-family:'Cairo',sans-serif;}
</style>
<div id="_ej_auth_box">
  ${allowGuest ? `<button id="_ej_auth_close" title="متابعة كضيف"><i class="fas fa-times"></i></button>` : ''}
  <div class="_ej_logo_row">
    <img src="ElJasus.jpg" alt="El Jasus" onerror="this.style.display='none'">
    <h2>El Jasus</h2>
    <p>سجل دخولك للاستمتاع بكل المزايا</p>
  </div>
  <div class="_ej_tabs">
    <button class="_ej_tab active" id="_ej_tab_login" onclick="_EJ_switchTab('login')">تسجيل الدخول</button>
    <button class="_ej_tab" id="_ej_tab_register" onclick="_EJ_switchTab('register')">إنشاء حساب</button>
  </div>

  <!-- LOGIN FORM -->
  <div id="_ej_form_login">
    <div class="_ej_field"><label>البريد الإلكتروني</label><input id="_ej_email_l" type="email" placeholder="example@email.com" dir="ltr"></div>
    <div class="_ej_field"><label>كلمة المرور</label><input id="_ej_pass_l" type="password" placeholder="••••••••" dir="ltr"></div>
    <div id="_ej_err_l" class="_ej_err"></div>
    <button class="_ej_btn" id="_ej_login_btn" onclick="_EJ_login()">دخول ⚡</button>
  </div>

  <!-- REGISTER FORM -->
  <div id="_ej_form_register" style="display:none">
    <div class="_ej_field"><label>اسم اللاعب</label><input id="_ej_uname_r" type="text" placeholder="اسمك في اللعبة" maxlength="20"></div>
    <div class="_ej_field"><label>البريد الإلكتروني</label><input id="_ej_email_r" type="email" placeholder="example@email.com" dir="ltr"></div>
    <div class="_ej_field"><label>كلمة المرور</label><input id="_ej_pass_r" type="password" placeholder="6 أحرف على الأقل" dir="ltr"></div>
    <div id="_ej_err_r" class="_ej_err"></div>
    <button class="_ej_btn" id="_ej_reg_btn" onclick="_EJ_register()">إنشاء الحساب 🚀</button>
  </div>

  ${allowGuest ? `
  <div class="_ej_or"><span></span><p>أو</p><span></span></div>
  <button class="_ej_guest_btn" onclick="_EJ_continueAsGuest()">
    <i class="fas fa-user-secret" style="margin-left:6px;color:#666;"></i>
    متابعة كضيف (بدون تسجيل)
  </button>` : ''}
</div>`;

    document.body.appendChild(overlay);

    // wire close button
    const closeBtn = document.getElementById('_ej_auth_close');
    if (closeBtn) closeBtn.onclick = () => _EJ_continueAsGuest();

    // expose tab switching globally (needed for onclick attrs)
    window._EJ_switchTab = (tab) => {
      document.getElementById('_ej_form_login').style.display     = tab === 'login'    ? '' : 'none';
      document.getElementById('_ej_form_register').style.display  = tab === 'register' ? '' : 'none';
      document.getElementById('_ej_tab_login').classList.toggle('active',    tab === 'login');
      document.getElementById('_ej_tab_register').classList.toggle('active', tab === 'register');
    };

    window._EJ_continueAsGuest = () => {
      EJ.enterGuestMode();
      _closeModal();
      if (onSuccess) onSuccess({ isGuest: true });
      // Show tutorial if first time
      if (!localStorage.getItem(LS.TUTORIAL_DONE)) {
        setTimeout(() => EJ.showTutorial(), 400);
      }
    };

    window._EJ_login = async () => {
      const email = document.getElementById('_ej_email_l').value.trim();
      const pass  = document.getElementById('_ej_pass_l').value;
      const err   = document.getElementById('_ej_err_l');
      const btn   = document.getElementById('_ej_login_btn');
      err.textContent = '';
      if (!email || !pass) { err.textContent = 'يرجى ملء جميع الحقول'; return; }
      btn.disabled = true; btn.textContent = 'جاري الدخول...';
      try {
        const { getAuth, signInWithEmailAndPassword } = await _loadAuth();
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, pass);
        EJ.clearGuestMode();
        _showSuccess('تم تسجيل الدخول بنجاح! 🎉');
        setTimeout(() => {
          _closeModal();
          if (onSuccess) onSuccess({ isGuest: false });
          if (!localStorage.getItem(LS.TUTORIAL_DONE)) {
            setTimeout(() => EJ.showTutorial(), 400);
          }
        }, 1000);
      } catch (e) {
        btn.disabled = false; btn.textContent = 'دخول ⚡';
        err.textContent = _friendlyError(e.code);
      }
    };

    window._EJ_register = async () => {
      const uname = document.getElementById('_ej_uname_r').value.trim();
      const email = document.getElementById('_ej_email_r').value.trim();
      const pass  = document.getElementById('_ej_pass_r').value;
      const err   = document.getElementById('_ej_err_r');
      const btn   = document.getElementById('_ej_reg_btn');
      err.textContent = '';
      if (!uname || !email || !pass) { err.textContent = 'يرجى ملء جميع الحقول'; return; }
      if (pass.length < 6) { err.textContent = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'; return; }
      if (uname.length < 2) { err.textContent = 'الاسم قصير جداً'; return; }
      btn.disabled = true; btn.textContent = 'جاري الإنشاء...';
      try {
        const { getAuth, createUserWithEmailAndPassword, updateProfile } = await _loadAuth();
        const auth = getAuth();
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(cred.user, { displayName: uname });
        // Save to Realtime DB
        await _saveNewPlayer(cred.user.uid, uname, email);
        localStorage.setItem(LS.USERNAME, uname);
        EJ.clearGuestMode();
        _showSuccess('تم إنشاء الحساب بنجاح! 🎉');
        setTimeout(() => {
          _closeModal();
          if (onSuccess) onSuccess({ isGuest: false });
          setTimeout(() => EJ.showTutorial(), 400);
        }, 1200);
      } catch (e) {
        btn.disabled = false; btn.textContent = 'إنشاء الحساب 🚀';
        err.textContent = _friendlyError(e.code);
      }
    };
  }

  async function _loadAuth() {
    return await import('https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js');
  }

  async function _saveNewPlayer(uid, username, email) {
    try {
      const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js');
      const { getDatabase, ref, set } = await import('https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js');
      const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
      const db  = getDatabase(app);
      await set(ref(db, `players/${uid}`), {
        username, email, uid,
        coins: 0, rankPoints: 0,
        createdAt: Date.now(),
        stats: { wins: 0, losses: 0, gamesPlayed: 0 },
        inventory: { nameThemes: ['default'], nameTags: [] },
        activeTheme: 'default', activeTitle: null,
      });
    } catch (e) {
      console.warn('Could not save player data:', e);
    }
  }

  function _showSuccess(msg) {
    const box = document.getElementById('_ej_auth_box');
    if (!box) return;
    const tabs = box.querySelector('._ej_tabs');
    const forms = box.querySelectorAll('[id^="_ej_form_"]');
    const or = box.querySelector('._ej_or');
    const guest = box.querySelector('._ej_guest_btn');
    [tabs, or, guest].forEach(el => el && (el.style.display = 'none'));
    forms.forEach(f => f.style.display = 'none');
    const el = document.createElement('div');
    el.className = '_ej_success';
    el.innerHTML = `<i class="fas fa-check-circle"></i><p>${msg}</p>`;
    box.appendChild(el);
  }

  function _closeModal() {
    const m = document.getElementById('_ej_auth_modal');
    if (m) m.remove();
  }

  function _friendlyError(code) {
    const map = {
      'auth/user-not-found':    'البريد الإلكتروني غير مسجل',
      'auth/wrong-password':    'كلمة المرور غير صحيحة',
      'auth/invalid-email':     'البريد الإلكتروني غير صالح',
      'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
      'auth/weak-password':     'كلمة المرور ضعيفة جداً',
      'auth/too-many-requests': 'محاولات كثيرة، حاول لاحقاً',
      'auth/network-request-failed': 'تحقق من اتصالك بالإنترنت',
      'auth/invalid-credential': 'البيانات غير صحيحة',
    };
    return map[code] || 'حدث خطأ، حاول مرة أخرى';
  }

  // ─────────────────────────────────────────────────────────────
  // TUTORIAL OVERLAY
  // ─────────────────────────────────────────────────────────────
  function showTutorial() {
    if (document.getElementById('_ej_tutorial')) return;

    const steps = [
      {
        icon: '🕵️',
        title: 'أهلاً في El Jasus!',
        body: 'لعبة اجتماعية ممتعة للمجموعات. الهدف هو اكتشاف من بينكم هو الجاسوس — أو إذا كنت الجاسوس، اكتشف المكان السري قبل أن يكشفوك!',
      },
      {
        icon: '🃏',
        title: 'توزيع الأدوار',
        body: 'كل لاعب يرى دوره سراً:\n• اللاعبون العاديون: يرون اسم المكان/الكلمة السرية\n• الجاسوس: لا يعرف الكلمة — يحاول يخمّنها من الأسئلة',
      },
      {
        icon: '💬',
        title: 'جولة الأسئلة',
        body: 'كل لاعب يسأل لاعباً آخر سؤالاً عن الكلمة السرية. يجب أن تكون إجاباتك صادقة بما يكفي لإقناع الآخرين — لكن غامضة بما يكفي لإخفائها عن الجاسوس!',
      },
      {
        icon: '🗳️',
        title: 'التصويت',
        body: 'بعد جولة الأسئلة، الكل يصوّت على من يظن أنه الجاسوس. اللاعب الذي يحصل على أكثر الأصوات يُكشف دوره.\nالجاسوس يمكنه الفوز إذا صوّتوا على الشخص الخطأ!',
      },
      {
        icon: '🏆',
        title: 'شروط الفوز',
        body: '✅ اللاعبون يفوزون: إذا كشفوا الجاسوس\n🕵️ الجاسوس يفوز: إذا لم يُكشف، أو إذا صوّتوا على شخص آخر، أو إذا خمّن الكلمة السرية في آخر لحظة!',
      },
      {
        icon: '🎮',
        title: 'أنواع اللعب',
        body: '📱 محلي: الجهاز ينتقل بين اللاعبين — مثالي للتجمعات!\n🌐 أونلاين: كل لاعب من هاتفه — أنشئ غرفة وشارك الكود مع أصدقائك',
      },
    ];

    let currentStep = 0;

    const overlay = document.createElement('div');
    overlay.id = '_ej_tutorial';
    overlay.innerHTML = `
<style>
#_ej_tutorial {
  position:fixed;inset:0;z-index:999999;
  display:flex;align-items:center;justify-content:center;
  background:rgba(0,0,0,.88);backdrop-filter:blur(10px);
  animation:_ej_fadeIn .3s ease;
}
#_ej_tbox {
  width:92%;max-width:400px;
  background:linear-gradient(145deg,#0c1020,#131928);
  border:1.5px solid rgba(0,242,255,.2);
  border-radius:28px;padding:36px 28px 28px;
  text-align:center;
  box-shadow:0 0 80px rgba(0,242,255,.08),0 40px 100px rgba(0,0,0,.7);
  animation:_ej_slideUp .35s cubic-bezier(.34,1.56,.64,1);
  position:relative;
}
#_ej_ticon {font-size:3.5rem;margin-bottom:16px;display:block;animation:_ej_bounce .6s ease;}
@keyframes _ej_bounce{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
#_ej_ttitle {
  font-family:'Orbitron',sans-serif;font-size:1.1rem;font-weight:900;
  color:#fff;margin-bottom:12px;letter-spacing:.03em;
}
#_ej_tbody {
  font-family:'Cairo',sans-serif;font-size:.88rem;color:#aab;
  line-height:1.7;white-space:pre-line;margin-bottom:24px;
}
._ej_tdots {display:flex;justify-content:center;gap:8px;margin-bottom:22px;}
._ej_tdot {width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.15);transition:all .3s;}
._ej_tdot.active {background:#00f2ff;box-shadow:0 0 10px #00f2ff;width:20px;border-radius:4px;}
._ej_tnav {display:flex;gap:10px;}
._ej_tbtn {
  flex:1;padding:12px;border-radius:12px;border:none;
  font-family:'Cairo',sans-serif;font-size:.88rem;font-weight:900;
  cursor:pointer;transition:all .25s;
}
._ej_tbtn.prev {background:rgba(255,255,255,.06);color:#888;}
._ej_tbtn.prev:hover {background:rgba(255,255,255,.1);color:#fff;}
._ej_tbtn.next {background:linear-gradient(135deg,#00c6ff,#0072ff);color:#fff;box-shadow:0 4px 20px rgba(0,114,255,.3);}
._ej_tbtn.next:hover {transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,114,255,.5);}
._ej_tbtn.done {background:linear-gradient(135deg,#00ff88,#00b4d8);color:#000;}
#_ej_tskip {
  position:absolute;top:14px;left:14px;
  font-family:'Cairo',sans-serif;font-size:.7rem;color:#444;
  background:none;border:none;cursor:pointer;padding:6px;transition:color .2s;
}
#_ej_tskip:hover{color:#888;}
._ej_progress_bar {
  position:absolute;top:0;left:0;right:0;height:3px;
  background:rgba(255,255,255,.05);border-radius:28px 28px 0 0;overflow:hidden;
}
._ej_progress_fill {
  height:100%;background:linear-gradient(90deg,#00c6ff,#00f2ff);
  transition:width .4s ease;
}
</style>
<div id="_ej_tbox">
  <div class="_ej_progress_bar"><div class="_ej_progress_fill" id="_ej_tprog"></div></div>
  <button id="_ej_tskip" onclick="_EJ_closeTutorial()">تخطي</button>
  <span id="_ej_ticon"></span>
  <div id="_ej_ttitle"></div>
  <div id="_ej_tbody"></div>
  <div class="_ej_tdots" id="_ej_tdots"></div>
  <div class="_ej_tnav">
    <button class="_ej_tbtn prev" id="_ej_tprev" onclick="_EJ_tutorialPrev()">السابق</button>
    <button class="_ej_tbtn next" id="_ej_tnext" onclick="_EJ_tutorialNext()">التالي</button>
  </div>
</div>`;

    document.body.appendChild(overlay);

    function renderStep() {
      const s = steps[currentStep];
      document.getElementById('_ej_ticon').textContent = s.icon;
      document.getElementById('_ej_ttitle').textContent = s.title;
      document.getElementById('_ej_tbody').textContent  = s.body;
      document.getElementById('_ej_tprog').style.width  = ((currentStep + 1) / steps.length * 100) + '%';

      const prevBtn = document.getElementById('_ej_tprev');
      const nextBtn = document.getElementById('_ej_tnext');
      prevBtn.style.display = currentStep === 0 ? 'none' : '';
      if (currentStep === steps.length - 1) {
        nextBtn.textContent = 'ابدأ اللعب! 🎮';
        nextBtn.className = '_ej_tbtn done';
      } else {
        nextBtn.textContent = 'التالي';
        nextBtn.className = '_ej_tbtn next';
      }

      const dotsEl = document.getElementById('_ej_tdots');
      dotsEl.innerHTML = steps.map((_, i) =>
        `<div class="_ej_tdot ${i === currentStep ? 'active' : ''}"></div>`
      ).join('');

      // re-trigger icon animation
      const icon = document.getElementById('_ej_ticon');
      icon.style.animation = 'none';
      requestAnimationFrame(() => { icon.style.animation = '_ej_bounce .6s ease'; });
    }

    window._EJ_tutorialPrev = () => { if (currentStep > 0) { currentStep--; renderStep(); } };
    window._EJ_tutorialNext = () => {
      if (currentStep < steps.length - 1) { currentStep++; renderStep(); }
      else _EJ_closeTutorial();
    };
    window._EJ_closeTutorial = () => {
      localStorage.setItem(LS.TUTORIAL_DONE, '1');
      const el = document.getElementById('_ej_tutorial');
      if (el) { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }
    };

    renderStep();
  }

  // ─────────────────────────────────────────────────────────────
  // LOGOUT
  // ─────────────────────────────────────────────────────────────
  async function logout() {
    try {
      const { getAuth, signOut } = await _loadAuth();
      await signOut(getAuth());
    } catch (e) { console.warn('logout error:', e); }
    localStorage.removeItem(LS.GUEST_MODE);
    _firebaseUser = null;
    window.location.href = 'home.html';
  }

  // ─────────────────────────────────────────────────────────────
  // EXPOSE GLOBALLY
  // ─────────────────────────────────────────────────────────────
  window.EJ = EJ;

})();
