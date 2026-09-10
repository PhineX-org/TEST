/**
 * admin-reports-patch.js
**/
// ── REASON LABELS (enhanced) ────────────────────────────────────────────
function reasonArFull(r) {
    const m = {
        cheating:       '🃏 غش أو تحايل',
        spam:           '📢 سبام / رسائل مزعجة',
        harassment:     '😡 تحرش أو إهانة',
        offensive:      '🤬 ألفاظ بذيئة',
        hate_speech:    '☣️ خطاب كراهية',
        collusion:      '🤝 تنسيق خارجي',
        rage_quit:      '🚪 Rage Quit متكرر',
        sexual_content: '🔞 محتوى جنسي',
        threats:        '⚠️ تهديدات شخصية',
        impersonation:  '🎭 انتحال شخصية',
        exploit:        '💻 استغلال ثغرات',
        other:          '📝 أخرى'
    };
    return m[r] || r || '—';
}

function standardLabel(s) {
    const m = {
        respect:     'م.١ — الاحترام',
        fair_play:   'م.٢ — النزاهة',
        inclusivity: 'م.٣ — الشمولية',
        chat_rules:  'م.٤ — قواعد الشات',
        escalation:  'م.٥ — تكرار'
    };
    return m[s] || s || null;
}

// ── OVERRIDE renderReports ───────────────────────────────────────────────
function renderReports() {
    const tbody = document.getElementById('reports-table');
    let reports = Object.entries(allReports);
    if (currentReportFilter !== 'all') reports = reports.filter(([,r]) => r.status === currentReportFilter);
    reports.sort((a,b) => (b[1].timestamp||0) - (a[1].timestamp||0));

    if (!reports.length) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:30px;color:#555;">لا توجد بلاغات</td></tr>';
        return;
    }

    tbody.innerHTML = reports.map(([id,r]) => {
        const hasPhoto = !!r.photo;
        const hasDesc  = !!r.description;
        const std      = r.standard ? standardLabel(r.standard) : null;

        return `<tr>
            <td>
                <div style="font-weight:700;">${r.reportedUsername || '—'}</div>
                ${std ? `<div style="font-size:9px;color:#a78bfa;font-weight:700;margin-top:2px;">${std}</div>` : ''}
            </td>
            <td>
                <div style="font-size:12px;font-weight:700;">${reasonArFull(r.reason)}</div>
            </td>
            <td style="color:#888;font-size:11px;">${r.reportedByUsername||'—'}</td>
            <td style="font-family:'Orbitron',sans-serif;font-size:11px;color:#555;">${r.roomCode||'—'}</td>
            <td style="font-size:11px;color:#555;">${r.timestamp ? new Date(r.timestamp).toLocaleDateString('ar-SA') : '—'}</td>
            <td>
                ${hasDesc ? `<div style="max-width:160px;font-size:11px;color:#aaa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${(r.description||'').replace(/"/g,"'")}">
                    ${(r.description||'').substring(0,60)}${r.description?.length>60?'...':''}
                </div>` : '<span style="color:#555;font-size:11px;">—</span>'}
            </td>
            <td>
                ${hasPhoto ? `<button class="btn-sm" onclick="adminViewPhoto('${id}')"
                    style="padding:4px 10px;font-size:10px;background:rgba(0,242,255,.1);border-color:rgba(0,242,255,.3);color:#00f2ff;">
                    <i class="fas fa-image ml-1"></i>صورة
                </button>` : '<span style="color:#555;font-size:10px;">—</span>'}
            </td>
            <td><span class="badge ${r.status==='pending'?'badge-pending':'badge-resolved'}">${r.status==='pending'?'معلق':'محلول'}</span></td>
            <td>
                <div style="display:flex;gap:4px;flex-wrap:wrap;">
                    <button class="btn-sm" onclick="adminViewReport('${id}')"
                        style="font-size:10px;padding:5px 10px;background:rgba(59,130,246,.1);border-color:rgba(59,130,246,.3);color:#60a5fa;">
                        <i class="fas fa-eye ml-1"></i>تفاصيل
                    </button>
                    <button class="btn-success" onclick="resolveReport('${id}')" style="font-size:10px;padding:5px 10px;">حل</button>
                    <button class="btn-sm" onclick="warnPlayerFromReport('${r.reportedUsername}')" 
                        style="font-size:10px;padding:5px 10px;background:rgba(251,191,36,.1);border-color:rgba(251,191,36,.3);color:#fbbf24;">
                        ⚠️ تحذير
                    </button>
                    <button class="btn-danger" onclick="banFromReport('${r.reportedUsername}')" style="font-size:10px;padding:5px 10px;">حظر</button>
                </div>
            </td>
        </tr>`;
    }).join('');
}

// ── VIEW FULL REPORT DETAILS ─────────────────────────────────────────────
window.adminViewReport = async function(id) {
    const r = allReports[id];
    if (!r) return;
    const std = r.standard ? standardLabel(r.standard) : null;

    const modal = document.createElement('div');
    modal.style.cssText = `position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.85);
        display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(12px);`;

    modal.innerHTML = `
        <div style="background:linear-gradient(135deg,rgba(12,16,30,.99),rgba(20,24,44,.99));
            border:2px solid rgba(0,242,255,.3);border-radius:24px;padding:30px;
            max-width:520px;width:100%;max-height:85vh;overflow-y:auto;direction:rtl;
            font-family:'Cairo',sans-serif;box-shadow:0 20px 64px rgba(0,0,0,.7);">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px;">
                <i class="fas fa-flag" style="font-size:24px;color:#ef4444;"></i>
                <div>
                    <h2 style="font-family:'Orbitron',sans-serif;font-size:16px;font-weight:900;color:#ef4444;">
                        تفاصيل البلاغ
                    </h2>
                    <p style="font-size:11px;color:#555;">${new Date(r.timestamp||0).toLocaleString('ar-SA')}</p>
                </div>
                <button onclick="this.closest('[style*=fixed]').remove()"
                    style="margin-right:auto;padding:8px 14px;border-radius:10px;
                    background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);
                    color:#888;cursor:pointer;font-family:'Cairo',sans-serif;font-size:13px;">✕ إغلاق</button>
            </div>

            ${buildDetailRow('المُبلَّغ عنه', r.reportedUsername || '—', '#ef4444')}
            ${buildDetailRow('من', r.reportedByUsername || '—', '#888')}
            ${buildDetailRow('الغرفة', r.roomCode || '—', '#00f2ff')}
            ${buildDetailRow('السبب', reasonArFull(r.reason), '#fff')}
            ${std ? buildDetailRow('المعيار المنتَهَك', std, '#a78bfa') : ''}
            ${buildDetailRow('الحالة', r.status === 'pending' ? '🟡 معلق' : '🟢 محلول', r.status==='pending'?'#fbbf24':'#22c55e')}

            ${r.description ? `
            <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
                border-radius:12px;padding:14px;margin-bottom:14px;">
                <div style="font-size:10px;color:#555;font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:.1em;">
                    📝 الوصف
                </div>
                <p style="font-size:13px;color:#ccc;line-height:1.7;">${r.description.replace(/\n/g,'<br>')}</p>
            </div>` : ''}

            ${r.photo ? `
            <div style="margin-bottom:14px;">
                <div style="font-size:10px;color:#555;font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:.1em;">📸 لقطة الشاشة</div>
                <img src="${r.photo}" style="max-width:100%;border-radius:12px;border:2px solid rgba(0,242,255,.15);"
                    onerror="this.parentElement.innerHTML='<p style=color:#555;font-size:11px>تعذّر تحميل الصورة</p>'"
                    onclick="window.open(this.src,'_blank')" style="cursor:pointer;">
                <p style="font-size:10px;color:#555;margin-top:4px;">انقر على الصورة لفتحها بالحجم الكامل</p>
            </div>` : ''}

            <div style="display:flex;gap:10px;margin-top:6px;flex-wrap:wrap;">
                <button onclick="warnPlayerFromReport('${r.reportedUsername}');this.closest('[style*=fixed]').remove();"
                    style="flex:1;min-width:100px;padding:11px;border-radius:12px;cursor:pointer;
                    background:rgba(251,191,36,.15);border:2px solid rgba(251,191,36,.35);color:#fbbf24;
                    font-weight:900;font-size:12px;font-family:'Cairo',sans-serif;">
                    ⚠️ تحذير للاعب
                </button>
                <button onclick="banFromReport('${r.reportedUsername}');this.closest('[style*=fixed]').remove();"
                    style="flex:1;min-width:100px;padding:11px;border-radius:12px;cursor:pointer;
                    background:rgba(239,68,68,.15);border:2px solid rgba(239,68,68,.35);color:#ef4444;
                    font-weight:900;font-size:12px;font-family:'Cairo',sans-serif;">
                    🚫 حظر اللاعب
                </button>
                <button onclick="resolveReport('${id}');this.closest('[style*=fixed]').remove();"
                    style="flex:1;min-width:100px;padding:11px;border-radius:12px;cursor:pointer;
                    background:rgba(34,197,94,.12);border:2px solid rgba(34,197,94,.3);color:#22c55e;
                    font-weight:900;font-size:12px;font-family:'Cairo',sans-serif;">
                    ✅ تم الحل
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
};

function buildDetailRow(label, value, color='#ccc') {
    return `<div style="display:flex;justify-content:space-between;align-items:center;
        padding:8px 12px;background:rgba(255,255,255,.03);border-radius:8px;margin-bottom:6px;">
        <span style="font-size:11px;color:#555;font-weight:700;">${label}</span>
        <span style="font-size:13px;font-weight:700;color:${color};">${value}</span>
    </div>`;
}

// ── VIEW PHOTO ────────────────────────────────────────────────────────────
window.adminViewPhoto = function(id) {
    const r = allReports[id];
    if (!r?.photo) return;
    const modal = document.createElement('div');
    modal.style.cssText = `position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.92);
        display:flex;align-items:center;justify-content:center;padding:20px;cursor:zoom-out;`;
    modal.innerHTML = `<img src="${r.photo}" style="max-width:90vw;max-height:85vh;border-radius:12px;
        border:2px solid rgba(0,242,255,.3);box-shadow:0 12px 48px rgba(0,0,0,.8);">`;
    modal.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
};

// ── WARN PLAYER ───────────────────────────────────────────────────────────
window.warnPlayerFromReport = async function(username) {
    if (!username) { await UIAlert('لم يُحدَّد اسم اللاعب', { title: 'خطأ', type: 'error' }); return; }

    // Find player UID
    const snap = await get(ref(db, 'players'));
    if (!snap.exists()) return;
    const players = snap.val();
    let targetUid = null, targetData = null;
    for (const uid in players) {
        if (players[uid].username === username) { targetUid = uid; targetData = players[uid]; break; }
    }

    if (!targetUid) { await UIAlert(`لا يوجد لاعب باسم "${username}"`, { title: 'غير موجود', type: 'warning' }); return; }

    const currentWarnings = (targetData.moderationWarnings || 0) + 1;
    const reason = await UIPrompt('سبب التحذير:', { defaultValue: 'مخالفة معايير المجتمع' });
    if (!reason) return;

    await update(ref(db, `players/${targetUid}`), {
        moderationWarnings: currentWarnings,
        lastWarningReason: reason,
        lastWarningAt: Date.now(),
        lastWarningBy: auth.currentUser?.uid || 'Admin'
    });

    await push(ref(db, `players/${targetUid}/warningHistory`), {
        reason, timestamp: Date.now(), by: auth.currentUser?.uid || 'Admin', count: currentWarnings
    });

    await UIAlert(
        `تم إرسال تحذير للاعب <b>${username}</b><br>إجمالي التحذيرات: ${currentWarnings}${currentWarnings >= 3 ? '<br><span style="color:#ef4444;">⚠️ تحذير: اللاعب تجاوز 3 تحذيرات — قد يستوجب حظراً</span>' : ''}`,
        { title: '⚠️ تم التحذير', type: currentWarnings >= 3 ? 'error' : 'warning', icon: '' }
    );
};

// Update table header for reports to include new columns
window.initEnhancedReports = function() {
    const thead = document.querySelector('#section-reports table thead tr');
    if (!thead) return;
    thead.innerHTML = `
        <th>المُبلَّغ عنه</th>
        <th>السبب</th>
        <th>من</th>
        <th>الغرفة</th>
        <th>التاريخ</th>
        <th>الوصف</th>
        <th>صورة</th>
        <th>الحالة</th>
        <th>إجراء</th>
    `;
};
