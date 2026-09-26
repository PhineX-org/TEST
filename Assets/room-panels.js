// ============================================================
// EL JASUS — ROOM PANELS  v1.0
// ============================================================

(function () {
  'use strict';

  const css = `
    .rp-fab {
      position:fixed; z-index:8300; width:46px; height:46px; border-radius:50%;
      background:linear-gradient(135deg,rgba(0,242,255,.13),rgba(124,48,255,.13));
      border:2px solid rgba(0,242,255,.38); cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      backdrop-filter:blur(12px); color:#00f2ff; font-size:17px;
      transition:all .3s; box-shadow:0 4px 14px rgba(0,242,255,.18);
    }
    .rp-fab:hover { transform:scale(1.08); box-shadow:0 0 24px rgba(0,242,255,.35); }
    #rp-friends-fab { bottom:136px; left:20px; }
    #rp-report-fab  { bottom:84px; left:20px;
      border-color:rgba(239,68,68,.4); color:#ef4444;
      background:linear-gradient(135deg,rgba(239,68,68,.1),rgba(200,0,50,.08)); }
    #rp-report-fab:hover { box-shadow:0 0 24px rgba(239,68,68,.35); }
    .rp-panel {
      position:fixed; left:0; top:0; bottom:0; z-index:8299;
      width:0; overflow:hidden;
      background:linear-gradient(160deg,rgba(8,11,22,.98),rgba(18,12,40,.98));
      border-right:1px solid rgba(0,242,255,.18);
      box-shadow:6px 0 40px rgba(0,0,0,.6);
      transition:width .35s cubic-bezier(.4,0,.2,1);
      display:flex; flex-direction:column; font-family:'Cairo',sans-serif;
    }
    #rp-report-panel { border-color:rgba(239,68,68,.2); }
    .rp-panel.rp-open { width:300px; }
    @media(max-width:600px){ .rp-panel.rp-open{width:100vw;} }
    .rp-resize-handle {
      position:absolute; right:0; top:0; bottom:0; width:5px;
      cursor:ew-resize; background:rgba(0,242,255,.05); z-index:1; transition:background .2s;
    }
    .rp-resize-handle:hover { background:rgba(0,242,255,.22); }
    .rp-header {
      display:flex; align-items:center; justify-content:space-between;
      padding:16px 16px 12px; border-bottom:1px solid rgba(0,242,255,.1); flex-shrink:0;
    }
    #rp-report-panel .rp-header { border-color:rgba(239,68,68,.15); }
    .rp-title { font-family:'Orbitron',sans-serif; font-size:12px; font-weight:900; color:#00f2ff; letter-spacing:.1em; }
    #rp-report-panel .rp-title { color:#ef4444; }
    .rp-close {
      width:28px; height:28px; border-radius:8px;
      background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.09);
      color:#666; cursor:pointer; display:flex; align-items:center;
      justify-content:center; font-size:13px; transition:all .2s;
    }
    .rp-close:hover { background:rgba(0,242,255,.12); color:#00f2ff; }
    .rp-body { flex:1; overflow-y:auto; padding:12px; }
    .rp-body::-webkit-scrollbar{width:3px;}
    .rp-body::-webkit-scrollbar-thumb{background:rgba(0,242,255,.2);border-radius:2px;}
    .rp-section-label {
      font-size:9px; font-weight:900; text-transform:uppercase;
      letter-spacing:.2em; color:rgba(255,255,255,.2); font-family:'Orbitron',sans-serif;
      padding:8px 2px 4px;
    }
    .rp-player-row {
      display:flex; align-items:center; gap:9px; padding:8px 10px;
      border-radius:11px; border:1px solid transparent; margin-bottom:3px; transition:all .2s;
    }
    .rp-player-row:hover { background:rgba(255,255,255,.04); border-color:rgba(0,242,255,.1); }
    .rp-avatar {
      width:34px; height:34px; border-radius:50%; flex-shrink:0;
      background:linear-gradient(135deg,#00f2ff,#7c30ff);
      display:flex; align-items:center; justify-content:center;
      font-size:13px; color:#fff; position:relative;
    }
    .rp-status-dot {
      position:absolute; bottom:1px; right:1px; width:9px; height:9px;
      border-radius:50%; border:2px solid #0a0e1a;
    }
    .rp-player-name { flex:1; font-size:12px; font-weight:700; color:#ccc; }
    .rp-mini-btn {
      padding:4px 9px; border-radius:8px; font-family:'Cairo',sans-serif;
      font-weight:900; font-size:10px; cursor:pointer; border:1px solid;
      transition:all .2s; flex-shrink:0;
    }
    .rp-btn-invite { background:rgba(0,242,255,.1); border-color:rgba(0,242,255,.35); color:#00f2ff; }
    .rp-btn-invite:hover { background:rgba(0,242,255,.22); }
    .rp-btn-add    { background:rgba(34,197,94,.1); border-color:rgba(34,197,94,.4); color:#22c55e; }
    .rp-btn-add:hover { background:rgba(34,197,94,.25); }
    .rp-btn-accept { background:rgba(34,197,94,.1); border-color:rgba(34,197,94,.4); color:#22c55e; }
    .rp-btn-accept:hover { background:rgba(34,197,94,.3); }
    .rp-btn-reject { background:rgba(239,68,68,.08); border-color:rgba(239,68,68,.3); color:#ef4444; }
    .rp-empty-note { font-size:11px; color:rgba(255,255,255,.3); text-align:center; padding:12px 0; }
    .rp-field-label {
      font-size:10px; font-weight:900; color:#888; text-transform:uppercase;
      letter-spacing:.1em; margin-bottom:5px; display:block;
    }
    .rp-input {
      width:100%; padding:10px 12px; border-radius:10px;
      background:rgba(255,255,255,.05); border:1px solid rgba(239,68,68,.25);
      color:#fff; font-family:'Cairo',sans-serif; font-size:12px;
      outline:none; margin-bottom:12px; transition:border .2s; box-sizing:border-box;
    }
    .rp-input:focus { border-color:rgba(239,68,68,.6); }
    textarea.rp-input { resize:vertical; min-height:70px; }
    select.rp-input { cursor:pointer; }
    .rp-rule-check {
      display:flex; align-items:center; gap:8px; padding:6px 0;
      border-bottom:1px solid rgba(255,255,255,.04); cursor:pointer;
    }
    .rp-rule-check:last-child { border-bottom:none; }
    .rp-rule-check input[type=checkbox] { accent-color:#ef4444; cursor:pointer; }
    .rp-rule-check label { font-size:11px; color:#aaa; cursor:pointer; flex:1; }
    .rp-photo-area {
      border:2px dashed rgba(239,68,68,.3); border-radius:12px; padding:16px;
      text-align:center; cursor:pointer; margin-bottom:12px; transition:all .2s;
    }
    .rp-photo-area:hover { border-color:rgba(239,68,68,.6); background:rgba(239,68,68,.05); }
    .rp-photo-area p { font-size:11px; color:#666; margin-top:4px; }
    .rp-photo-preview { width:100%; max-height:120px; object-fit:cover; border-radius:8px; margin-bottom:12px; }
    .rp-submit-btn {
      width:100%; padding:12px; border-radius:12px; font-family:'Cairo',sans-serif;
      font-weight:900; font-size:13px; cursor:pointer; border:none;
      background:linear-gradient(135deg,#ef4444,#b91c1c); color:#fff; transition:opacity .2s;
    }
    .rp-submit-btn:hover { opacity:.87; }
    .rp-submit-btn:disabled { opacity:.5; cursor:not-allowed; }
    .rp-success-msg { text-align:center; padding:24px 16px; font-size:13px; color:#22c55e; font-weight:700; }
    .rp-again-btn {
      margin-top:14px; padding:10px 20px; border-radius:10px;
      background:rgba(34,197,94,.12); border:1px solid rgba(34,197,94,.4);
      color:#22c55e; cursor:pointer; font-family:'Cairo',sans-serif; font-weight:700;
    }
  `;
  const st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  const wrap = document.createElement('div');
  wrap.id = 'rp-root';
  wrap.innerHTML = `
    <button class="rp-fab" id="rp-friends-fab" title="اللاعبون والأصدقاء"><i class="fas fa-user-friends"></i></button>
    <button class="rp-fab" id="rp-report-fab"  title="الإبلاغ عن لاعب"><i class="fas fa-flag"></i></button>

    <!-- FRIENDS PANEL -->
    <div class="rp-panel" id="rp-friends-panel">
      <div class="rp-resize-handle" id="rp-fh"></div>
      <div class="rp-header">
        <span class="rp-title">👥 اللاعبون والأصدقاء</span>
        <button class="rp-close" id="rp-friends-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="rp-body" id="rp-friends-body"><div class="rp-empty-note">جاري التحميل...</div></div>
    </div>

    <!-- REPORT PANEL -->
    <div class="rp-panel" id="rp-report-panel">
      <div class="rp-resize-handle" id="rp-rh"></div>
      <div class="rp-header">
        <span class="rp-title">🚩 الإبلاغ عن لاعب</span>
        <button class="rp-close" id="rp-report-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="rp-body" id="rp-report-body"></div>
    </div>
  `;
  document.body.appendChild(wrap);

  let _db, _auth, _myUid, _myName, _roomCode;
  let _roomPlayers = [];
  let friendsOpen = false, reportOpen = false;
  let _photoBase64 = null;

  function setFriendsOpen(v) {
    friendsOpen = v;
    document.getElementById('rp-friends-panel').classList.toggle('rp-open', v);
    document.getElementById('rp-friends-fab').style.left = v ? '310px' : '20px';
    if (v && reportOpen) setReportOpen(false);
  }
  function setReportOpen(v) {
    reportOpen = v;
    document.getElementById('rp-report-panel').classList.toggle('rp-open', v);
    document.getElementById('rp-report-fab').style.left = v ? '310px' : '20px';
    if (v && friendsOpen) setFriendsOpen(false);
    if (v) buildReportForm();
  }

  document.getElementById('rp-friends-fab').onclick   = () => setFriendsOpen(!friendsOpen);
  document.getElementById('rp-friends-close').onclick = () => setFriendsOpen(false);
  document.getElementById('rp-report-fab').onclick    = () => setReportOpen(!reportOpen);
  document.getElementById('rp-report-close').onclick  = () => setReportOpen(false);

  // Resize
  function makeResizable(hid, pid) {
    const h=document.getElementById(hid), p=document.getElementById(pid);
    let r=false,sx,sw;
    h.addEventListener('mousedown',e=>{r=true;sx=e.clientX;sw=p.offsetWidth;document.body.style.userSelect='none';});
    document.addEventListener('mousemove',e=>{if(!r)return;const nw=Math.max(240,Math.min(500,sw+(e.clientX-sx)));p.style.width=nw+'px';});
    document.addEventListener('mouseup',()=>{r=false;document.body.style.userSelect='';});
  }
  makeResizable('rp-fh','rp-friends-panel');
  makeResizable('rp-rh','rp-report-panel');

  // ── Build report form ─────────────────────────────────────
  function buildReportForm() {
    _photoBase64 = null;
    document.getElementById('rp-report-body').innerHTML = `
      <label class="rp-field-label">اللاعب المُبلَّغ عنه</label>
      <select class="rp-input" id="rp-rp-player">
        <option value="">— اختر لاعباً —</option>
        ${_roomPlayers.filter(n=>n!==_myName).map(n=>`<option value="${n}">${n}</option>`).join('')}
      </select>

      <label class="rp-field-label">سبب البلاغ</label>
      <select class="rp-input" id="rp-rp-reason">
        <option value="">— اختر —</option>
        <option value="cheating">🎭 غش / تلاعب</option>
        <option value="harassment">😠 تحرش / تنمر</option>
        <option value="offensive">🤬 ألفاظ بذيئة</option>
        <option value="spam">📢 سبام / إزعاج</option>
        <option value="ragequit">🚪 Rage quit متكرر</option>
        <option value="hate">💢 خطاب كراهية</option>
        <option value="sexual">🔞 محتوى جنسي</option>
        <option value="exploit">💻 استغلال ثغرات</option>
        <option value="other">❓ أخرى</option>
      </select>

      <label class="rp-field-label">وصف ما حدث</label>
      <textarea class="rp-input" id="rp-rp-desc" placeholder="اشرح ما حدث..."></textarea>

      <label class="rp-field-label">مخالفات معايير المجتمع</label>
      <div style="background:rgba(255,255,255,.03);border-radius:10px;padding:8px 12px;margin-bottom:12px;">
        ${[
          ['r_respect',     'خرق قاعدة الاحترام المتبادل'],
          ['r_fairplay',    'خرق قاعدة النزاهة في اللعب'],
          ['r_inclusion',   'خرق قاعدة الشمولية'],
          ['r_chat',        'خرق قواعد الشات'],
          ['r_escalation',  'مخالفة متكررة'],
        ].map(([v,l])=>`<label class="rp-rule-check"><input type="checkbox" value="${v}" class="rp-rc"><label>${l}</label></label>`).join('')}
      </div>

      <label class="rp-field-label">صورة إثبات (اختياري)</label>
      <div class="rp-photo-area" id="rp-pa" onclick="document.getElementById('rp-pf').click()">
        <i class="fas fa-camera" style="font-size:22px;color:#555;"></i>
        <p>انقر لرفع صورة</p>
      </div>
      <img id="rp-pp" class="rp-photo-preview" style="display:none" alt="">
      <input type="file" id="rp-pf" accept="image/*" style="display:none">

      <button class="rp-submit-btn" id="rp-rp-submit">
        <i class="fas fa-paper-plane"></i> إرسال البلاغ
      </button>
    `;

    document.getElementById('rp-pf').onchange = function() {
      const file=this.files[0]; if(!file) return;
      if(file.size>2*1024*1024){alert('الصورة كبيرة جداً (الحد الأقصى 2MB)');return;}
      const reader=new FileReader();
      reader.onload=e=>{
        _photoBase64=e.target.result;
        document.getElementById('rp-pp').src=_photoBase64;
        document.getElementById('rp-pp').style.display='block';
        document.getElementById('rp-pa').style.display='none';
      };
      reader.readAsDataURL(file);
    };

    document.getElementById('rp-rp-submit').onclick = submitReport;
  }

  async function submitReport() {
    const player = document.getElementById('rp-rp-player').value;
    const reason = document.getElementById('rp-rp-reason').value;
    const desc   = document.getElementById('rp-rp-desc').value.trim();
    if (!player) { alert('الرجاء اختيار اللاعب'); return; }
    if (!reason) { alert('الرجاء اختيار السبب'); return; }
    if (!desc)   { alert('الرجاء كتابة وصف'); return; }

    const rules = Array.from(document.querySelectorAll('.rp-rc:checked')).map(c=>c.value);
    const btn = document.getElementById('rp-rp-submit');
    btn.disabled=true; btn.textContent='جاري الإرسال...';

    try {
      const m = await import('https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js');

      // Resolve reported player UID
      let reportedUid='';
      const snap=await m.get(m.ref(_db,'players'));
      if (snap.exists()) {
        const ps=snap.val();
        for (const u in ps) { if(ps[u].username===player){reportedUid=u;break;} }
      }

      await m.push(m.ref(_db,'reports'), {
        reportedUid,
        reportedUsername:   player,
        reportedByUid:      _myUid||'',
        reportedByUsername: _myName||'مجهول',
        roomCode:           _roomCode||'',
        reason,
        description:        desc,
        rulesViolated:      rules,
        photoBase64:        _photoBase64||null,
        timestamp:          Date.now(),
        status:             'pending',
      });

      document.getElementById('rp-report-body').innerHTML = `
        <div class="rp-success-msg">
          <i class="fas fa-check-circle" style="font-size:38px;display:block;margin-bottom:10px;"></i>
          تم إرسال البلاغ بنجاح!<br>
          <span style="font-size:11px;color:#888;font-weight:400;display:block;margin-top:6px;">
            سيراجعه فريق الإدارة خلال 48–72 ساعة
          </span>
          <button class="rp-again-btn" onclick="window.RoomPanels._rebuildReport()">إرسال بلاغ آخر</button>
        </div>`;
    } catch(e) {
      btn.disabled=false; btn.textContent='إرسال البلاغ';
      alert('خطأ: '+e.message);
    }
  }

  // ── Render friends body ────────────────────────────────────
  function renderFriendsBody(roomPlayers, friendsData, reqData) {
    const body=document.getElementById('rp-friends-body');
    if (!body) return;
    let html='';

    html+=`<div class="rp-section-label">لاعبو الغرفة (${roomPlayers.length})</div>`;
    html+=roomPlayers.length
      ? roomPlayers.map(n=>`
          <div class="rp-player-row">
            <div class="rp-avatar"><i class="fas fa-user"></i><span class="rp-status-dot" style="background:#22c55e;box-shadow:0 0 5px #22c55e;"></span></div>
            <span class="rp-player-name">${n}${n===_myName?'<span style="color:#00f2ff;font-size:9px;margin-right:4px;">(أنت)</span>':''}</span>
            ${n!==_myName?`<button class="rp-mini-btn rp-btn-add" data-rpa="add" data-rpn="${n}">+ صديق</button>`:''}
          </div>`).join('')
      : `<div class="rp-empty-note">لا يوجد لاعبون</div>`;

    const reqIds=Object.keys(reqData||{});
    if (reqIds.length) {
      html+=`<div class="rp-section-label">طلبات صداقة (${reqIds.length})</div>`;
      html+=reqIds.map(rid=>{
        const r=reqData[rid]; const fn=r?.from?.username||'مستخدم';
        return `<div class="rp-player-row">
          <div class="rp-avatar" style="background:linear-gradient(135deg,#f59e0b,#d97706);"><i class="fas fa-user-clock"></i></div>
          <span class="rp-player-name">${fn}</span>
          <button class="rp-mini-btn rp-btn-accept" data-rpa="acc" data-rpu="${rid}">قبول</button>
          <button class="rp-mini-btn rp-btn-reject" data-rpa="rej" data-rpu="${rid}" style="margin-right:4px;">رفض</button>
        </div>`;
      }).join('');
    }

    const notInRoom=(friendsData||[]).filter(f=>!roomPlayers.includes(f.username)&&f.presence?.online);
    if (notInRoom.length) {
      html+=`<div class="rp-section-label">أصدقاء متصلون</div>`;
      const cur=localStorage.getItem('currentRoom')||'';
      html+=notInRoom.map(f=>`
        <div class="rp-player-row">
          <div class="rp-avatar"><i class="fas fa-user"></i><span class="rp-status-dot" style="background:#22c55e;box-shadow:0 0 5px #22c55e;"></span></div>
          <span class="rp-player-name">${f.username||'مجهول'}</span>
          ${cur&&window.FI?`<button class="rp-mini-btn rp-btn-invite" data-rpa="inv" data-rpu="${f.uid}" data-rpr="${cur}">دعوة</button>`:''}
        </div>`).join('');
    }

    body.innerHTML=html;

    body.querySelectorAll('[data-rpa]').forEach(btn=>btn.onclick=()=>handleFriendsAction(btn));
  }

  async function handleFriendsAction(btn) {
    const act=btn.dataset.rpa, uid=btn.dataset.rpu, room=btn.dataset.rpr, name=btn.dataset.rpn;
    if (!_db) return;
    const m=await import('https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js');

    if (act==='inv' && window.FI) {
      const from=_myName||localStorage.getItem('eljasus_user_name')||'لاعب';
      FI.sendInvite(uid,'',room,from)
        .then(()=>{btn.textContent='✓ أُرسلت';btn.disabled=true;})
        .catch(e=>alert('خطأ: '+e.message));
    } else if (act==='add') {
      const snap=await m.get(m.ref(_db,'players')); if(!snap.exists()) return;
      const ps=snap.val(); let tid='';
      for(const u in ps){if(ps[u].username===name){tid=u;break;}}
      if(!tid){alert('لم يُعثر على اللاعب');return;}
      const ms=await m.get(m.ref(_db,`players/${_myUid}/username`));
      await m.set(m.ref(_db,`players/${tid}/friendRequests/${_myUid}`),{
        from:{uid:_myUid,username:ms.val()||_myName},timestamp:Date.now()
      });
      btn.textContent='✓ أُرسل'; btn.disabled=true;
    } else if (act==='acc') {
      await m.set(m.ref(_db,`players/${_myUid}/friends/${uid}`),true);
      await m.set(m.ref(_db,`players/${uid}/friends/${_myUid}`),true);
      await m.remove(m.ref(_db,`players/${_myUid}/friendRequests/${uid}`));
      btn.closest('.rp-player-row').remove();
    } else if (act==='rej') {
      await m.remove(m.ref(_db,`players/${_myUid}/friendRequests/${uid}`));
      btn.closest('.rp-player-row').remove();
    }
  }

  // ── Public API ─────────────────────────────────────────────
  window.RoomPanels = {
    _rebuildReport: buildReportForm,

    async init(db, auth, roomCode, myName) {
      _db=db; _auth=auth; _roomCode=roomCode; _myName=myName;
      _myUid=auth.currentUser?.uid||'';

      const m=await import('https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js');

      // Watch room players
      m.onValue(m.ref(db,`rooms/${roomCode}/players`), snap=>{
        _roomPlayers=Array.isArray(snap.val())?snap.val():Object.values(snap.val()||{});
        refreshFriends();
      });

      // Watch friend requests
      if (_myUid) {
        m.onValue(m.ref(db,`players/${_myUid}/friendRequests`), ()=>refreshFriends());
      }

      async function refreshFriends() {
        if (!_myUid){renderFriendsBody(_roomPlayers,[],{});return;}
        const fSnap=await m.get(m.ref(db,`players/${_myUid}/friends`));
        const rSnap=await m.get(m.ref(db,`players/${_myUid}/friendRequests`));
        const fm=fSnap.val()||{}, reqs=rSnap.val()||{};
        const fd=[];
        for(const fu of Object.keys(fm)){
          const ps=await m.get(m.ref(db,`players/${fu}`));
          if(ps.exists()) fd.push({uid:fu,...ps.val()});
        }
        renderFriendsBody(_roomPlayers,fd,reqs);
      }
    },
  };
})();
