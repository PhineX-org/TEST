// ============================================
// EL JASUS — QR CODE + PUSH NOTIFICATIONS
// ============================================

// ── QR CODE SYSTEM ────────────────────────

class QRSystem {
    constructor() {
        this.buildModal();
    }

    // Load QR library dynamically
    async loadLib() {
        if (window.QRCode) return;
        return new Promise((res, rej) => {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
            s.onload = res; s.onerror = rej;
            document.head.appendChild(s);
        });
    }

    // Generate QR for a room code
    async generate(roomCode) {
        await this.loadLib();

        const modal = document.getElementById('qr-modal');
        const canvas = document.getElementById('qr-canvas');
        const label  = document.getElementById('qr-code-label');

        // Clear old QR
        canvas.innerHTML = '';

        const url = `${location.origin}${location.pathname.replace(/\/[^/]*$/, '')}/room.html?join=${roomCode}`;

        new QRCode(canvas, {
            text: url,
            width: 220, height: 220,
            colorDark: '#00f2ff',
            colorLight: '#0a0e1a',
            correctLevel: QRCode.CorrectLevel.H
        });

        label.textContent = roomCode;
        modal.classList.add('open');

        // Sound effect
        if (window.SND) SND.play('click');
    }

    buildModal() {
        if (document.getElementById('qr-modal')) return;

        document.body.insertAdjacentHTML('beforeend', `
        <div id="qr-modal">
            <div id="qr-box">
                <div style="font-family:'Orbitron',sans-serif;color:#00f2ff;font-size:12px;
                    letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;">
                    انضم للغرفة
                </div>
                <div id="qr-canvas" style="background:#0a0e1a;border-radius:12px;
                    padding:16px;display:inline-block;border:2px solid rgba(0,242,255,.3);"></div>
                <div style="margin-top:14px;font-family:'Cairo',sans-serif;">
                    <p style="color:#888;font-size:12px;margin-bottom:4px;">كود الغرفة</p>
                    <p id="qr-code-label" style="color:#00f2ff;font-size:28px;font-weight:900;
                        font-family:'Orbitron',sans-serif;letter-spacing:4px;"></p>
                </div>
                <p style="color:#555;font-size:11px;margin-top:8px;font-family:'Cairo',sans-serif;">
                    امسح الرمز أو شارك الكود
                </p>
                <div style="display:flex;gap:10px;margin-top:16px;justify-content:center;">
                    <button onclick="QR.share()" style="flex:1;padding:10px;background:linear-gradient(135deg,#00f2ff,#7c30ff);
                        border:none;border-radius:12px;color:white;font-weight:900;cursor:pointer;
                        font-family:'Cairo',sans-serif;font-size:13px;">
                        <i class="fas fa-share-alt"></i> مشاركة
                    </button>
                    <button onclick="document.getElementById('qr-modal').classList.remove('open')"
                        style="flex:1;padding:10px;background:rgba(255,255,255,.08);
                        border:2px solid rgba(255,255,255,.1);border-radius:12px;color:white;
                        font-weight:900;cursor:pointer;font-family:'Cairo',sans-serif;font-size:13px;">
                        إغلاق
                    </button>
                </div>
            </div>
        </div>`);
    }

    share() {
        const code = document.getElementById('qr-code-label').textContent;
        const url  = `${location.origin}${location.pathname.replace(/\/[^/]*$/, '')}/room.html?join=${code}`;
        if (navigator.share) {
            navigator.share({ title: 'انضم للعبة El Jasus', text: `كود الغرفة: ${code}`, url });
        } else {
            navigator.clipboard.writeText(url).then(() => showToast('تم نسخ الرابط'));
        }
    }

    // Auto-join from URL param
    checkJoinParam() {
        const params = new URLSearchParams(location.search);
        const code = params.get('join');
        if (code) return code;
        return null;
    }
}

// ── PUSH NOTIFICATIONS ────────────────────

class PushNotifications {
    constructor() {
        this.permission = Notification.permission;
        this.swRegistration = null;
    }

    async requestPermission() {
        if (!('Notification' in window)) return false;
        if (this.permission === 'granted') return true;

        const result = await Notification.requestPermission();
        this.permission = result;
        return result === 'granted';
    }

    // In-app notification (works without SW)
    notify(title, body, options = {}) {
        // Always show in-app toast
        showToast(`🔔 ${title}: ${body}`);

        // Native notification if permitted
        if (this.permission !== 'granted') return;

        const n = new Notification(title, {
            body,
            icon: 'ElJasus.jpg',
            badge: 'ElJasus.jpg',
            tag: options.tag || 'eljasus',
            ...options
        });

        n.onclick = () => {
            window.focus();
            if (options.url) window.location.href = options.url;
            n.close();
        };

        setTimeout(() => n.close(), 5000);
    }

    // Predefined notifications
    friendRequest(from) {
        this.notify('طلب صداقة جديد', `${from} أرسل لك طلب صداقة`, { tag: 'friend-req' });
    }

    friendOnline(name) {
        this.notify('صديق متصل', `${name} أصبح متاحاً`, { tag: 'friend-online' });
    }

    gameInvite(from, roomCode) {
        this.notify('دعوة للعب', `${from} يدعوك للعب في الغرفة ${roomCode}`, {
            tag: 'game-invite',
            url: `room.html?join=${roomCode}`
        });
    }

    achievement(name) {
        this.notify('إنجاز جديد! 🏆', name, { tag: 'achievement' });
    }

    rankUp(newRank) {
        this.notify('ترقية! 🎉', `أصبحت الآن ${newRank}`, { tag: 'rank-up' });
    }
}

// ── TOAST UTILITY ─────────────────────────
window.showToast = function(msg, duration = 3000) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
};

// ── EXPORTS ───────────────────────────────
window.QR   = new QRSystem();
window.PUSH = new PushNotifications();

// Auto-check URL for join param when on room pages
document.addEventListener('DOMContentLoaded', () => {
    const code = QR.checkJoinParam();
    if (code && typeof joinRoomByCode === 'function') {
        joinRoomByCode(code);
    }
});
