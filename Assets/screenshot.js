// ============================================
// EL JASUS — POST-GAME SCREENSHOT SYSTEM
// Generates a shareable image of game results
// ============================================

class ScreenshotSystem {
    constructor() {
        this.canvas  = null;
        this.ctx     = null;
        this.W       = 800;
        this.H       = 480;
    }

    // ── MAIN: generate + show ─────────────────
    async capture(data) {
         data = {
              winner:    'spy' | 'innocent',
              word:       string,
              category:   string,
              players:    [{ name, role, voted }],
              myName:     string,
              myRole:     'spy' | 'innocent',
              myWon:      bool,
              spyWins:    number,
              innocentWins: number,
              totalGames: number,
              streak:     number,
              rank:       string,
              duration:   number   // seconds
            }
        

        this.canvas = document.createElement('canvas');
        this.canvas.width  = this.W;
        this.canvas.height = this.H;
        this.ctx = this.canvas.getContext('2d');

        await this.drawBackground(data);
        this.drawBranding();
        this.drawResult(data);
        this.drawStats(data);
        this.drawPlayers(data);
        this.drawFooter(data);

        this.showModal(this.canvas.toDataURL('image/png'), data);
    }

    // ── BACKGROUND ────────────────────────────
    async drawBackground(data) {
        const c   = this.ctx;
        const spy = data.winner === 'spy';

        // Base gradient
        const bg = c.createLinearGradient(0, 0, this.W, this.H);
        if (spy) {
            bg.addColorStop(0, '#1a0000');
            bg.addColorStop(0.5, '#0d0000');
            bg.addColorStop(1, '#200010');
        } else {
            bg.addColorStop(0, '#000d1a');
            bg.addColorStop(0.5, '#00091a');
            bg.addColorStop(1, '#00001a');
        }
        c.fillStyle = bg;
        c.fillRect(0, 0, this.W, this.H);

        // Grid pattern
        c.strokeStyle = spy ? 'rgba(255,0,0,.06)' : 'rgba(0,242,255,.06)';
        c.lineWidth = 1;
        for (let x = 0; x < this.W; x += 40) {
            c.beginPath(); c.moveTo(x, 0); c.lineTo(x, this.H); c.stroke();
        }
        for (let y = 0; y < this.H; y += 40) {
            c.beginPath(); c.moveTo(0, y); c.lineTo(this.W, y); c.stroke();
        }

        // Glow circle
        const glow = c.createRadialGradient(this.W/2, this.H/2, 0, this.W/2, this.H/2, 300);
        glow.addColorStop(0, spy ? 'rgba(255,0,0,.15)' : 'rgba(0,242,255,.12)');
        glow.addColorStop(1, 'transparent');
        c.fillStyle = glow;
        c.fillRect(0, 0, this.W, this.H);
    }

    // ── BRANDING ──────────────────────────────
    drawBranding() {
        const c = this.ctx;
        c.font = 'bold 13px "Courier New"';
        c.fillStyle = 'rgba(0,242,255,.5)';
        c.textAlign = 'left';
        c.fillText('EL-JASUS · ULTIMATE EDITION', 24, 24);

        c.font = '11px "Courier New"';
        c.fillStyle = 'rgba(255,255,255,.3)';
        c.textAlign = 'right';
        c.fillText(new Date().toLocaleDateString('ar-SA'), this.W - 24, 24);
    }

    // ── RESULT HEADER ─────────────────────────
    drawResult(data) {
        const c    = this.ctx;
        const spy  = data.winner === 'spy';
        const icon = spy ? '🕵️' : '🛡️';
        const text = spy ? 'الجاسوس انتصر' : 'الأبرياء انتصروا';
        const color = spy ? '#ff4444' : '#00f2ff';

        // Big icon
        c.font = '64px serif';
        c.textAlign = 'center';
        c.fillText(icon, this.W / 2, 100);

        // Result text with glow
        c.shadowColor = color;
        c.shadowBlur  = 20;
        c.font        = 'bold 32px Arial';
        c.fillStyle   = color;
        c.fillText(text, this.W / 2, 148);
        c.shadowBlur  = 0;

        // Word and category
        c.font      = '14px Arial';
        c.fillStyle = 'rgba(255,255,255,.6)';
        c.fillText(`الكلمة: ${data.word || '—'}  ·  الفئة: ${data.category || '—'}`, this.W / 2, 172);

        // Duration
        const mins = Math.floor((data.duration||0) / 60);
        const secs = (data.duration||0) % 60;
        c.font      = '12px Arial';
        c.fillStyle = 'rgba(255,255,255,.3)';
        c.fillText(`مدة اللعبة: ${mins}:${String(secs).padStart(2,'0')}`, this.W / 2, 192);
    }

    // ── PERSONAL STATS ────────────────────────
    drawStats(data) {
        const c     = this.ctx;
        const won   = data.myWon;
        const color = won ? '#00ff88' : '#ff4444';

        // Personal result badge
        c.fillStyle = won ? 'rgba(0,255,136,.15)' : 'rgba(255,68,68,.15)';
        this.roundRect(24, 210, 200, 70, 12);
        c.fill();
        c.strokeStyle = won ? 'rgba(0,255,136,.5)' : 'rgba(255,68,68,.5)';
        c.lineWidth   = 2;
        this.roundRect(24, 210, 200, 70, 12);
        c.stroke();

        c.font      = 'bold 11px Arial';
        c.fillStyle = 'rgba(255,255,255,.6)';
        c.textAlign = 'left';
        c.fillText('نتيجتك', 40, 230);

        c.font      = 'bold 20px Arial';
        c.fillStyle = color;
        c.fillText(won ? '✓ فوز' : '✗ خسارة', 40, 255);

        c.font      = '11px Arial';
        c.fillStyle = 'rgba(255,255,255,.4)';
        c.fillText(`دورك: ${data.myRole === 'spy' ? 'جاسوس' : 'بريء'}`, 40, 272);

        // Mini stats row
        const stats = [
            { label:'انتصارات جاسوس', val: data.spyWins     || 0, color:'#ff4444' },
            { label:'انتصارات بريء',  val: data.innocentWins || 0, color:'#22c55e' },
            { label:'سلسلة الفوز',    val: data.streak       || 0, color:'#ffd700' },
        ];

        stats.forEach((s, i) => {
            const x = 250 + i * 180;
            const y = 210;

            c.fillStyle = 'rgba(255,255,255,.06)';
            this.roundRect(x, y, 160, 70, 12);
            c.fill();
            c.strokeStyle = 'rgba(255,255,255,.1)';
            this.roundRect(x, y, 160, 70, 12);
            c.stroke();

            c.font      = `bold 28px "Courier New"`;
            c.fillStyle = s.color;
            c.textAlign = 'center';
            c.shadowColor = s.color;
            c.shadowBlur  = 10;
            c.fillText(s.val, x + 80, y + 42);
            c.shadowBlur  = 0;

            c.font      = '10px Arial';
            c.fillStyle = 'rgba(255,255,255,.5)';
            c.fillText(s.label, x + 80, y + 60);
        });
    }

    // ── PLAYERS LIST ──────────────────────────
    drawPlayers(data) {
        const c = this.ctx;
        const players = (data.players || []).slice(0, 8);

        c.textAlign = 'left';
        c.font      = 'bold 11px Arial';
        c.fillStyle = 'rgba(255,255,255,.4)';
        c.fillText('اللاعبون', 24, 310);

        players.forEach((p, i) => {
            const col  = i % 4;
            const row  = Math.floor(i / 4);
            const x    = 24 + col * 190;
            const y    = 322 + row * 44;
            const isSpy = p.role === 'spy';

            c.fillStyle = isSpy ? 'rgba(255,0,0,.12)' : 'rgba(0,242,255,.07)';
            this.roundRect(x, y, 175, 34, 8);
            c.fill();

            c.fillStyle = isSpy ? '#ff6666' : '#aaa';
            c.font      = 'bold 12px Arial';
            c.fillText(isSpy ? '🕵️' : '🛡️', x + 10, y + 22);

            c.fillStyle = p.name === data.myName ? '#00f2ff' : '#ffffff';
            c.font      = (p.name === data.myName ? 'bold ' : '') + '12px Arial';
            c.fillText(p.name, x + 36, y + 22);
        });
    }

    // ── FOOTER ────────────────────────────────
    drawFooter(data) {
        const c = this.ctx;
        c.textAlign = 'center';
        c.font      = '11px Arial';
        c.fillStyle = 'rgba(255,255,255,.2)';
        c.fillText('مشاركة على وسائل التواصل الاجتماعي | #ElJasus', this.W / 2, this.H - 14);

        // Rank
        c.textAlign = 'right';
        c.fillStyle = 'rgba(0,242,255,.5)';
        c.fillText(data.rank || 'Bronze', this.W - 24, this.H - 14);
    }

    // ── HELPER: rounded rect path ─────────────
    roundRect(x, y, w, h, r) {
        const c = this.ctx;
        c.beginPath();
        c.moveTo(x + r, y);
        c.lineTo(x + w - r, y);
        c.quadraticCurveTo(x + w, y, x + w, y + r);
        c.lineTo(x + w, y + h - r);
        c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        c.lineTo(x + r, y + h);
        c.quadraticCurveTo(x, y + h, x, y + h - r);
        c.lineTo(x, y + r);
        c.quadraticCurveTo(x, y, x + r, y);
        c.closePath();
    }

    // ── MODAL ─────────────────────────────────
    showModal(dataURL, data) {
        // Remove old modal
        document.getElementById('screenshot-modal')?.remove();

        const modal = document.createElement('div');
        modal.id    = 'screenshot-modal';
        modal.style.cssText = `
            position:fixed;inset:0;z-index:9999;
            background:rgba(0,0,0,.9);backdrop-filter:blur(12px);
            display:flex;align-items:center;justify-content:center;padding:20px;
            flex-direction:column;gap:16px;font-family:'Cairo',sans-serif;`;

        modal.innerHTML = `
            <h3 style="color:#00f2ff;font-size:18px;font-weight:900;margin:0;
                font-family:'Orbitron',sans-serif;letter-spacing:2px;">📸 نتائج المباراة</h3>
            <img src="${dataURL}" style="max-width:100%;max-height:60vh;border-radius:16px;
                border:2px solid rgba(0,242,255,.3);box-shadow:0 0 40px rgba(0,242,255,.2);">
            <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
                <a href="${dataURL}" download="eljasus-result.png" style="
                    padding:12px 28px;border-radius:14px;font-weight:900;font-size:14px;
                    background:linear-gradient(135deg,#00f2ff,#7c30ff);color:white;
                    text-decoration:none;display:flex;align-items:center;gap:8px;">
                    ⬇️ تحميل الصورة
                </a>
                <button onclick="SS.share('${dataURL}')" style="
                    padding:12px 28px;border-radius:14px;font-weight:900;font-size:14px;
                    background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.2);
                    color:white;cursor:pointer;">
                    📤 مشاركة
                </button>
                <button onclick="document.getElementById('screenshot-modal').remove()" style="
                    padding:12px 28px;border-radius:14px;font-weight:900;font-size:14px;
                    background:rgba(255,255,255,.06);border:2px solid rgba(255,255,255,.1);
                    color:#888;cursor:pointer;">
                    إغلاق
                </button>
            </div>`;

        document.body.appendChild(modal);
        modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    }

    // ── SHARE ─────────────────────────────────
    async share(dataURL) {
        if (!navigator.share) {
            if (window.showToast) showToast('انسخ الصورة وشاركها يدوياً');
            return;
        }
        try {
            const blob = await (await fetch(dataURL)).blob();
            const file = new File([blob], 'eljasus-result.png', { type: 'image/png' });
            await navigator.share({ title: 'نتائج El Jasus', files: [file] });
        } catch (e) {
            console.error('Share failed:', e);
        }
    }
}

window.SS = new ScreenshotSystem();
